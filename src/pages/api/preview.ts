// CAMBIO INSESO 2026-10-13: identidad verde y correcciones previas; detalles en docs/CAMBIOS_REVISION_2.md.
import { createHmac, timingSafeEqual } from 'node:crypto';
import type { APIRoute } from 'astro';

/**
 * Preview API Route
 * Esta ruta maneja las peticiones de preview desde Strapi
 * Habilita el modo preview y redirige a la página correspondiente
 */
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const secret = process.env.PREVIEW_SECRET || import.meta.env.PREVIEW_SECRET;
  const supplied = url.searchParams.get('secret') || '';
  if (!secret || Buffer.byteLength(supplied) !== Buffer.byteLength(secret) || !timingSafeEqual(Buffer.from(supplied), Buffer.from(secret))) return new Response('Acceso no autorizado',{status:401});
  const type = url.searchParams.get('type');
  const documentId = url.searchParams.get('documentId');
  const status = url.searchParams.get('status');

  // Validar parámetros requeridos
  if (!type || !documentId) {
    return new Response('Missing required parameters: type and documentId', {
      status: 400
    });
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(documentId) || !['noticia','prestacion','hero-slide','slide-afiliacion','socio'].includes(type)) return new Response('Parámetros inválidos',{status:400});

  // Establecer cookie de preview con datos necesarios
  cookies.set('preview', JSON.stringify({
    enabled: true,
    type,
    documentId,
    status,
    timestamp: Date.now()
  }), {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: 60 * 30 // 30 minutos
  });

  const previewValue = cookies.get('preview')!.value;
  cookies.set('preview-signature',createHmac('sha256',secret).update(previewValue).digest('hex'),{path:'/',httpOnly:true,secure:import.meta.env.PROD,sameSite:'lax',maxAge:1800});
  // Redirigir según el tipo de contenido
  let redirectUrl = '/';

  switch (type) {
    case 'noticia':
      // Redirigir a la página de preview de noticia
      redirectUrl = `/preview/noticia/${documentId}`;
      break;

    case 'prestacion':
      // Redirigir a la página de preview de prestación
      redirectUrl = `/preview/prestacion/${documentId}`;
      break;

    case 'hero-slide':
    case 'slide-afiliacion':
    case 'socio':
      // Para estos tipos, redirigir a la home con preview habilitado
      redirectUrl = `/preview/home?type=${type}&documentId=${documentId}`;
      break;

    default:
      // Para otros tipos, redirigir a una página genérica de preview
      redirectUrl = `/preview?type=${type}&documentId=${documentId}`;
      break;
  }

  return redirect(redirectUrl, 307);
};
