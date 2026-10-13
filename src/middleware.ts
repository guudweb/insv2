// CAMBIO INSESO 2026-10-13: identidad verde y correcciones previas; detalles en docs/CAMBIOS_REVISION_2.md.
import { defineMiddleware } from 'astro:middleware';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { previewStorage } from './lib/strapi';
export const onRequest = defineMiddleware(async (context, next) => {
 if (context.params.lang && !['es','fr','en','pt'].includes(context.params.lang)) return new Response('Not found',{status:404});
 const isPreview = context.url.pathname.startsWith('/preview/');
 if (isPreview) {
  const secret = process.env.PREVIEW_SECRET || import.meta.env.PREVIEW_SECRET;
  const value = context.cookies.get('preview')?.value || '';
  const signature = context.cookies.get('preview-signature')?.value || '';
  const expected = secret ? createHmac('sha256',secret).update(value).digest('hex') : '';
  if (!expected || signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature),Buffer.from(expected))) return new Response('Acceso no autorizado',{status:401});
 }
 return previewStorage.run({enabled:false},async () => {
  const response = await next();
  response.headers.set('X-Content-Type-Options','nosniff');
  response.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options','SAMEORIGIN');
  if (isPreview) {response.headers.set('Cache-Control','no-store');response.headers.set('X-Robots-Tag','noindex, nofollow');}
  return response;
 });
});
