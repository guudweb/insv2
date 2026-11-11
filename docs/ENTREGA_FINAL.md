# Cambios de la entrega final

- Redes sociales con un componente único: mismo tamaño, alineación, círculo y color blanco, incluido TikTok. Cuenta oficial enlazada con la dirección facilitada.
- Emblemas del pie ampliados de 180 a 240 píxeles de ancho; imagen con transparencia real alrededor de los emblemas, sin fondo blanco externo. Se mantienen los colores y el blanco interior de los símbolos.
- Nombre corregido de la delegada nacional: Monserrat de la Gracia Bonkanka.
- Organigrama con diez servicios. Se añaden Informática y Transformación Digital y Servicio Especial de Discapacitados. Se corrigen Inspección General de Servicios y Auditorías Internas y Servicio de Estudios, Estadísticas y Formación, también en los JSON de idiomas.
- Once prestaciones con fotografías relacionadas: maternidad, invalidez, incapacidad temporal, discapacidad, vejez, familia, asistencia médica, sepelio, viudedad, orfandad y parientes.
- Retirada de la nota de recopilación de fecha en las fichas. Prestaciones familiares: pregunta 2 simplificada, documentos del folleto fotografiado, fila del primer al tercer hijo corregida, punto sobre libretas retirado de incompatibilidades y pago exclusivamente por transferencia bancaria.
- Los documentos familiares se han actualizado con la nueva imagen `image(20261015-141057).png`: documentos comunes y seis grupos (esposa, hijos, abuelos, padres, suegros y hermanos). Se conservan originales/copias, notas para funcionarios y cuenta bancaria. La referencia se incluye en `docs/referencias/familiares-documentos.webp`.
- Selector de idiomas ES / FR / EN / PT siempre visible en el encabezado, incluso sin JavaScript; navegación desplegable operable con teclado.
- Accesos diferentes para condiciones generales, afiliación de trabajadores e inscripción de empresas; corrección del enlace roto de la ruta Empleadores en las migas de penas y sanciones.
- Retirados el bloque de notificaciones en penas y sanciones, el bloque Contactos y el bloque de ayuda de noticias solicitado anteriormente. Imagen de contacto en la paleta verde.
- Banner INSESO Innova corregido a 1066. Eliminada de los recursos públicos la animación antigua no utilizada que aún mostraba 2121.
- Contacto institucional único info@inseso.org; teléfono opcional en el formulario y sin destinatarios adicionales. No se simula el éxito si no hay SMTP.
- Nuevas páginas legales visibles, información sobre datos en formularios y revisión documentada de cookies. Carga de vídeos bajo acción explícita del visitante.
- Atención al asegurado con agenda de servidor, oficinas filtradas por trámite, requisitos antes de reservar, selección de prestación, fechas y huecos disponibles, confirmación, aviso institucional y justificante al ciudadano. Cola persistente con reintentos y protección contra reservas simultáneas.

## Imágenes utilizadas

Las fotografías de prestaciones ya estaban incluidas en el proyecto. No se usan las imágenes de catálogo con marca de agua. Son ilustrativas de la atención o situación protegida; no identifican a beneficiarios concretos del INSESO.

Las ediciones de contacto, pie y banner se realizaron con la herramienta de edición de imágenes integrada. Sus destinos en el proyecto son:

- `public/images/contacto/contacto-verde.png`
- `public/images/footer-transparente.png`
- `public/images/adaptadas/presentation-3.webp`

Instrucciones de edición: sustituir el fondo naranja de contacto por verdes institucionales preservando la persona y el teléfono; eliminar únicamente el fondo blanco externo del sello sin alterar los emblemas; sustituir únicamente 2121 por 1066 en el banner preservando composición y demás textos.

## Comprobaciones

Los resultados actuales se encuentran en `PRUEBAS_ENTREGA_FINAL.json`, `PRUEBAS_AGENDA_FINAL.json` y `PRUEBAS_PREGUNTAS.json`. Los informes de revisiones anteriores se conservan como históricos. Los comandos y límites de la validación están en `PUBLICACION.md`.
