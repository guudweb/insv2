// CAMBIO INSESO 2026-10-13: identidad verde y correcciones previas; detalles en docs/CAMBIOS_REVISION_2.md.
import type { APIRoute } from 'astro';

/**
 * Exit Preview API Route
 * Desactiva el modo preview y limpia las cookies
 */
export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('preview-signature', {path:'/'});
  // Eliminar la cookie de preview
  cookies.delete('preview', {
    path: '/'
  });

  // Redirigir a la home
  return redirect('/', 307);
};

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete('preview-signature', {path:'/'});
  // Eliminar la cookie de preview
  cookies.delete('preview', {
    path: '/'
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
