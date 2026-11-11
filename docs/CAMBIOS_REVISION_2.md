# INSESO web revisión 2

Esta revisión aplica la solicitud posterior del 13 de octubre de 2026. Sus decisiones de catálogo y navegación sustituyen las de la entrega anterior.

## Cambios solicitados y resultado

1. Información institucional retirada del menú Sobre nosotros. Las rutas antiguas redirigen a Presentación; el modelo CMS se conserva para evitar eliminar datos.
2. Código marcado con comentarios CAMBIO INSESO 2026-10-13. R2 identifica la revisión actual. Los JSON no admiten comentarios: su propósito se documenta aquí y en los módulos que los consumen.
3. Presentación: cuatro banners adaptados al verde, mismo orden y tres segundos por imagen. Se conserva la presentación animada mediante un componente web que admite reducir movimiento. Fotografías sin rojo de marca conservadas y enmarcadas con el estilo verde.
4. Detalle de prestaciones: cabecera con ilustración, contenido amplio, índice de secciones, bloques completos y enlaces de formulario. La lectura no queda comprimida en una columna de requisitos.
5. Médico-farmacéuticas retirada del catálogo. Las rutas dinámicas ajenas al catálogo devuelven 404; páginas antiguas redirigen al catálogo.
6. Formularios en cada ficha lleva al mismo formulario oficial común, con descarga directa y vista previa. PDF incorporado en public/formularios/solicitud-comun-prestaciones.pdf; disponible sin Strapi.
7. Botón Oficinas retirado del panel de detalle de prestaciones.
8. Catálogo cerrado de ocho prestaciones: maternidad, invalidez, incapacidad temporal, discapacidad, vejez/jubilación, sepelio, viudedad y orfandad. Ocho ilustraciones SVG propias y diferentes, ajustadas a cada categoría. CMS no puede añadir una novena tarjeta. Destacados del inicio también se limitan a este catálogo.
9. Condiciones de adhesión: cabecera y bloque principal adaptados al verde. Fotografías del sector privado, autónomo y público conservadas con marco institucional. El antiguo GIF lateral incluía material deportivo ajeno al trámite; se reemplaza por una imagen institucional de afiliación.
10. Agencias: una tarjeta por ubicación con fotografía y datos juntos. Email común info@inseso.org. Horario destacado: lunes a viernes, 08:00–16:00. La próxima sede mantiene indicación de apertura pendiente; no se presenta como operativa.
11. Asegurados: se conserva el contenido de afiliación publicado, con imágenes adaptadas. Menú con Condiciones de adhesión y Descarga de formularios; sin declaración y pago.
12. Empleadores: se conserva el contenido publicado, con imágenes adaptadas. Menú con Condiciones de adhesión y Penas y sanciones; sin descarga de formularios ni declaración y pago.

## Archivos principales

- src/components/Navbar.astro: estructura de menús.
- src/components/PrestacionesGrid.astro y src/data/benefit-catalog.ts: catálogo de ocho.
- src/layouts/PrestacionLayout.astro y src/components/BenefitDetails.astro: detalle y todos sus bloques.
- src/components/CommonBenefitForm.astro y páginas formulario-prestaciones: PDF común.
- src/components/OfficesDirectory.astro y src/data/offices.ts: agencias y datos por oficina.
- src/components/PresentationHero.astro: cuatro imágenes de Presentación.
- public/images/adaptadas: imágenes verdes de presentación, adhesión, asegurados y empleadores.
- public/images/prestaciones/catalogo-1.svg a catalogo-8.svg: ilustraciones editables de las prestaciones.

## Fotografías disponibles y pendientes

Se utilizan las tres fotografías que ya estaban identificadas en el código y en la web: sede de Malabo II, Mongomo y Evinayong. Faltan imágenes identificadas de la sede actual de Avenida de la Independencia, Santa María 2, Bata, Ebebiyín, Annobón, Luba y Oyala. Sus tarjetas tienen un espacio explícito de Fotografía pendiente, con el nombre de la oficina, sin mostrar una foto de otro lugar como si fuera propia.

Para completar una fotografía, asignar su ruta a imagen de la oficina correspondiente en src/data/offices.ts y copiar el archivo a public/images. La siguiente revisión puede hacerlo con las siete fotografías reales.

## Fuentes y contenido

Se compararon /afiliacionee_trabajadores y /afiliacionee_empresas de www.inseso.org. Sus textos ya coinciden con los del proyecto y se conservan. Solo cambian imágenes y accesos de menú solicitados.

Formulario descargado sin modificación del documento oficial:
https://cms.inseso.org/uploads/Ficha_de_solicitud_de_prestaciones_e1fbea45bf.pdf

La ficha oficial contiene varias opciones preexistentes; el catálogo de la web sigue limitado a las ocho solicitadas. Para discapacidad dispone del campo Otros. Ante dudas sobre cumplimentación, consultar al INSESO.

Los textos de las ocho fichas provienen del documento aportado. La fecha de recopilación no se convierte en una aprobación oficial. Las nuevas fichas mantienen el texto español de referencia identificado en las rutas de otros idiomas; todavía requieren traducción institucional aprobada.

## Verificación

Resultado por ruta en docs/PRUEBAS_AUTOMATICAS.json. Se comprueban el catálogo de ocho, todas las rutas de fichas en cuatro idiomas, PDF y enlaces comunes, diez tarjetas de oficinas con correo común, menús retirados, portada, preview protegido y redirecciones de secciones retiradas. Pruebas ejecutadas con el CMS no disponible para comprobar el respaldo local.

Compilación: npm run build. Renderizado: node scripts/test-render.mjs.

## Instalación en una copia de pruebas

1. Extraer en una carpeta nueva, conservando el proyecto y .env anteriores.
2. Usar Node 22 LTS. En la raíz: npm ci; npm run dev.
3. La web puede consultarse localmente con las ocho fichas y el formulario sin iniciar CMS. Noticias y otras funciones dinámicas mantienen su conexión a Strapi.
4. Conservar STRAPI_URL y SMTP reales del entorno de pruebas. No copiar la base de producción para hacer escrituras de prueba.
5. Para CMS: cd cms; npm ci; npm run build; npm run develop, con sus secretos y base de pruebas correctamente configurados.
6. Antes de publicar, completar las fotografías faltantes, traducciones y validación institucional; revisar navegación móvil y SMTP real. Esta entrega no ha desplegado cambios en www.inseso.org.
