# Revisión 3 — 13 de octubre de 2026

Las ocho prestaciones presentan preguntas desplegables con controles para abrir o cerrar todas. Se distinguen las contingencias y tablas de invalidez, cotización, modalidades públicas y privadas, viudedad por reversión y documentación por hijo. Las respuestas proceden del documento facilitado; los datos ausentes se señalan expresamente.

El encabezado y el pie incluyen un icono SVG de TikTok. El pie usa verde institucional #17522A y acentos #258444. La URL de TikTok permanece vacía en src/config/contact.ts; el icono indica que falta confirmar la cuenta. No apunta a una cuenta supuesta.

Se incorpora una fotografía histórica del acto de enero de 2025 en Santa María 2, con atribución y enlace en la tarjeta. No es una fotografía exterior actual sin asistentes. Fuente de la imagen: La Gaceta de Guinea Ecuatorial, artículo del primer consejo de administración de INSESO. La ubicación del acto se contrastó con Guinea Ecuatorial Press:
https://www.guineaecuatorialpress.com/noticias/inseso_presenta_seis_acciones_de_urgencia_en_su_primer_consejo_de_administracion

Pendiente: fotografías verificadas de Avenida de la Independencia, Bata, Annobón, Luba y Oyala; tampoco se dispone de foto confirmada de Ebebiyín. La búsqueda encontró imágenes con ubicaciones ambiguas y hospitales que no acreditan ser las oficinas solicitadas. Se mantienen los espacios identificados como pendientes. Para activar TikTok hace falta el enlace oficial.

Validación: compilación Astro completada; 60 comprobaciones SSR, 9 de datos y 9 de interacción DOM superadas. Se probaron apertura individual, cierre, apertura/cierre global, inicialización repetida y enlaces a preguntas. La validación SSR utiliza las alternativas locales cuando el CMS no está disponible. No se realizó revisión visual en navegador: la descarga del navegador de pruebas falló.

Cambios identificados mediante comentarios CAMBIO INSESO R3. Las revisiones anteriores siguen documentadas en CAMBIOS_REVISION_2.md.

Para reproducir: npm ci; npm run build; node scripts/test-render.mjs; node scripts/test-benefit-faq.mjs. La prueba DOM necesita jsdom (dependencia de comprobación, no del sitio): npm install --no-save --package-lock=false jsdom; node scripts/test-benefit-accordion.mjs. Ejecutar primero la prueba SSR, que genera el HTML de prueba en /tmp/benefit-faq-render.html; puede cambiarse mediante INSESO_QA_HTML.
