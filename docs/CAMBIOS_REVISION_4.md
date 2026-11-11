# Entrega 4 · 15 de octubre de 2026

Aplicada sobre el proyecto Astro de la entrega anterior. Los cambios nuevos se identifican mediante comentarios «CAMBIO INSESO R4».

- Documento de referencia: `Actualizacion_web_INSESO_11_prestaciones(1).docx`. Catálogo con once prestaciones: siete generales y cuatro de la familia de muerte y supervivencia. La familia no añade una duodécima ficha.
- Información completa del documento en `src/data/benefits.json`: beneficiarios, cotización, cuantías, documentos, modalidades y formas de pago. Preguntas desplegables por prestación; invalidez separada por contingencia, viudedad por modalidad, jubilación por sector y orfandad por documentación.
- Se mantienen los porcentajes y condiciones del documento. Incapacidad temporal y sepelio son subsidios de pago único. Discapacidad conserva el pago trimestral por cheque indicado en esta revisión del documento. No se inventan importes reglamentarios que el documento no especifica.
- Presentación: tres tarjetas con las fotografías originales aportadas y los nombres confirmados por la usuaria. Eduardo Orobiyi Lajay, presidente del Consejo de Administración; Maria de la Gracia Bonkanka, delegada nacional; Juana Magdalena Ntutumu, secretaria general.
- Organigrama HTML con Consejo de Administración, Consejo Directivo, Delegación Nacional, Asesoría Jurídica, Gabinete del Delegado, Consejería, Secretaría General y ocho servicios dependientes de esta última. Se han desarrollado las abreviaturas del gráfico facilitado. Textos del organigrama y sus controles disponibles en JSON para español, francés, inglés y portugués.
- Diseño con verdes institucionales, tarjetas, líneas jerárquicas, hovers, animación de entrada y respeto de la preferencia de movimiento reducido. Disposición responsive sin necesidad de desplazar horizontalmente todo el organigrama.
- Encabezado sin teléfono ni 944. Atención al asegurado: 1066 en contacto. Correo unificado info@inseso.org. TikTok oficial activo, blanco y alineado; logo del pie con proporciones conservadas.
- Agencias: datos del documento, guiones donde falta la dirección y horario de la sede futura sin inventar apertura. No se muestra el párrafo de atribución de Santa María solicitado anteriormente.
- Rutas antiguas de prestaciones familiares y médico-farmacéuticas redirigen a las nuevas fichas; muerte y supervivencia enlaza a su familia.

## Validación

Compilación de producción Astro; 61 rutas SSR y 8 pruebas de contenido, modalidades, alias y entradas inexistentes. El CMS no está ejecutándose en el entorno: se comprueban las alternativas locales existentes. No se ha comprobado visualmente en un navegador ni contra la base de datos de producción.

La información de prestaciones es la referencia española del documento; las páginas de otros idiomas avisan de que las respuestas de prestaciones se muestran en español. No se presentan como traducciones oficiales de las condiciones de acceso.

El documento no proporciona un enlace permanente alternativo para Facebook: se conserva el enlace facilitado. La activación de TikTok sí está completada.

## Uso

Conserve su `.env` y la base de datos de Strapi al integrar esta entrega. El ZIP no contiene credenciales, bases de datos, dependencias ni compilaciones previas.

Desde la carpeta del proyecto:

```sh
npm ci
npm run build
npm run dev
```

Para reproducir las comprobaciones tras compilar:

```sh
node scripts/test-revision-4.mjs
node scripts/test-benefit-faq.mjs
```

Los datos completos de las prestaciones proceden del JSON local. Esta entrega no modifica automáticamente los registros existentes del CMS ni despliega cambios en producción.
