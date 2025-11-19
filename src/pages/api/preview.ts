import type { APIRoute } from 'astro';

/**
 * Preview API Route
 * Esta ruta maneja las peticiones de preview desde Strapi
 * Habilita el modo preview y redirige a la página correspondiente
 */
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const documentId = url.searchParams.get('documentId');
  const status = url.searchParams.get('status');

  // Validar parámetros requeridos
  if (!type || !documentId) {
    return new Response('Missing required parameters: type and documentId', {
      status: 400
    });
  }

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
