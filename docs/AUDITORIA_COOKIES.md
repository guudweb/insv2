# Revisión de cookies y contenido externo · entrega final

Alcance: código de Astro, componentes, scripts públicos consumidos por las páginas y rutas de previsualización de esta entrega. No equivale a una inspección del dominio de producción, del proxy ni del administrador del CMS.

| Elemento | Evidencia en código | Tratamiento |
| --- | --- | --- |
| `preview` | `src/pages/api/preview.ts`, `src/middleware.ts` | Cookie técnica para editores: HttpOnly, SameSite=Lax, Secure en producción, 30 minutos. Acceso protegido por secreto y firma. |
| `preview-signature` | Las mismas rutas y `api/exit-preview.ts` | Firma de la previsualización, mismas propiedades y caducidad. Se elimina al salir. |
| Formularios y agenda | Rutas `api/send-email` y `api/atencion/*` | Sin cookies ni almacenamiento del navegador. La agenda se guarda en SQLite en el servidor. La clave de reintento vive en memoria de la página. |
| Google Maps | Contacto | Enlace externo; ya no hay iframe que se cargue al entrar. |
| Vídeos de terceros | `ExternalMedia.astro` | No existe iframe ni conexión al vídeo hasta una pulsación explícita. YouTube se normaliza a youtube-nocookie.com, sin afirmar que ese proveedor nunca trate datos. |
| Redes sociales | `SocialLinks.astro` | Enlaces externos, sin widgets incrustados. |
| Fuentes | Layout y CSS | Retirada Google Fonts; tipografía de sistema y fuentes de iconos locales. |
| Swiper | Componentes de carrusel | JS y CSS locales en `public/vendor/swiper`. |
| Publicidad y analítica | Búsqueda en el código consumido por la web | No se han identificado Google Analytics, Meta Pixel ni herramientas de seguimiento publicitario propias. No se inventa un catálogo de cookies de esas herramientas. |

La comprobación SSR verifica que las páginas públicas probadas no establecen `Set-Cookie` y no incluyen iframes activos. Un proveedor externo puede tratar datos o utilizar cookies después de cargar su contenido. El alojamiento o nuevas integraciones podrían añadir herramientas fuera de este código: deben inspeccionarse en el dominio publicado y actualizar la información y el mecanismo de consentimiento que corresponda antes de activarlas.

No se ha añadido un banner genérico de aceptación de todas las cookies. La información es accesible desde el pie y la carga de vídeos requiere una acción informada del visitante.
