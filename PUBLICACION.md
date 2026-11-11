# INSESO · Entrega final

Esta carpeta contiene el proyecto Astro completo y el código del CMS existente. Los cambios de esta entrega están marcados con comentarios `CAMBIO INSESO FINAL` y se resumen en `docs/ENTREGA_FINAL.md`.

## Antes de activar las citas

La agenda está implementada, pero se entrega **cerrada al público** hasta que el INSESO valide sus oficinas y configure el correo. No se han supuesto servicios disponibles ni se han enviado mensajes reales desde el entorno de desarrollo.

1. Configure SMTP con una cuenta institucional autorizada.
2. Valide `src/data/appointments.json`: oficinas, trámites de cada oficina, horarios, duración de citas, festivos y período de reserva.
3. Active `enabled: true` únicamente en las oficinas confirmadas. Las asignaciones de Malabo central y Bata son ejemplos de configuración y están desactivadas. Las demás oficinas tienen sus trámites vacíos hasta su confirmación. La futura sede de Malabo II no se ofrece para reservar.
4. Configure una ruta persistente para SQLite y programe el trabajador de correo cada minuto.
5. Compruebe el envío y la recepción real de los dos mensajes antes de abrir la agenda.
6. Cambie `APPOINTMENTS_ENABLED=true` cuando esos puntos estén comprobados.

## Preparación

Probado con Node.js 24.19.0. La agenda necesita Node.js 22.13.0 o superior, con `node:sqlite`. No funciona en un alojamiento exclusivamente estático: necesita el servidor Node de Astro.

Conserve su `.env` y la base de datos del CMS al integrar la entrega. No sustituya datos del servidor por los de una carpeta de desarrollo.

```sh
npm ci
```

En Windows PowerShell, para crear la configuración por primera vez:

```powershell
Copy-Item .env.example .env
```

En Linux:

```sh
cp .env.example .env
```

Edite `.env` en el servidor, sin subir contraseñas a GitHub. Campos necesarios:

```dotenv
STRAPI_URL=http://localhost:1337
SITE_ORIGIN=https://www.inseso.org
HOST=127.0.0.1
PORT=4321
SMTP_HOST=servidor-smtp-institucional
SMTP_PORT=587
SMTP_USER=cuenta-autorizada
SMTP_PASS=contraseña-configurada-en-el-servidor
SMTP_FROM="INSESO <info@inseso.org>"
APPOINTMENTS_DB_PATH=/ruta/persistente/inseso/appointments.sqlite
APPOINTMENTS_ENABLED=false
TRUST_PROXY_IP=false
```

Los valores anteriores describen los campos, no son credenciales. En desarrollo local utilice `SITE_ORIGIN=http://localhost:4321`. En producción debe coincidir exactamente con el origen HTTPS publicado, incluido `www` si se utiliza. Ajuste también `site` en `astro.config.mjs` al dominio canónico real.

El remitente debe estar autorizado por el proveedor SMTP. Se utiliza TLS: 465 implícito o STARTTLS obligatorio en 587/2525. El servidor de correo debe tener configurados sus mecanismos de autenticación y entrega de dominio.

## Compilar y comprobar

```sh
npm run build
npm run test:agenda
npm run test:entrega
node scripts/test-benefit-faq.mjs
```

Estas pruebas **no envían correo real**: la agenda utiliza una base temporal y transporte simulado; la prueba web deshabilita SMTP en su propio proceso. La prueba de rutas utiliza los contenidos de reserva locales cuando el CMS no está disponible.

```sh
npm run smtp:verificar
```

Este comando comprueba conexión, TLS y autenticación sin mandar mensajes. Para solicitar expresamente un mensaje real de prueba:

```sh
npm run smtp:verificar -- --enviar-prueba=info@inseso.org
```

Confirme la recepción en el buzón: la aceptación por SMTP no garantiza por sí sola la entrega en bandeja de entrada. Haga después una reserva controlada con un correo de prueba del operador y verifique tanto el aviso institucional como el justificante recibido por el ciudadano. No se ha realizado esta prueba contra el SMTP real del INSESO porque no se facilitaron credenciales.

## Ejecutar

Desarrollo:

```sh
npm run dev
```

Producción:

```sh
npm run start:production
```

Para gestionar el proceso con PM2, instalado por el administrador:

```sh
pm2 start ecosystem.config.cjs
pm2 save
```

El archivo inicia un proceso web y un trabajador continuo de correo que revisa la cola aproximadamente cada minuto, sin solapar sus propios ciclos. El CMS no se reinicia con este archivo: mantenga su proceso y configuración existentes. Si no usa PM2, programe `npm run citas:correos` cada minuto mediante cron o el Programador de tareas de Windows, con esta carpeta como directorio de trabajo y sin permitir ejecuciones solapadas.

El trabajador es necesario para reintentar mensajes tras caídas y ejecutar la eliminación de citas antiguas. Debe ejecutarse con el mismo usuario, `.env` y base persistente que la web. No guarde la base en una carpeta que se borre al desplegar una nueva versión. Restrinja sus permisos y sus copias de seguridad al personal autorizado.

`docs/nginx-fragment.conf` muestra la integración con un proxy HTTPS existente. Active `TRUST_PROXY_IP=true` solo si Node escucha en la interfaz local y el proxy sobrescribe `X-Real-IP`. En caso contrario, manténgalo en `false`.

## Funcionamiento de la cita

- El ciudadano elige trámite, delegación autorizada, requisitos, fecha y hueco disponible; facilita nombre y correo, y confirma.
- Para solicitudes de prestación selecciona cuál de las once prestaciones necesita. Consulta la documentación específica antes de reservar. No adjunta archivos ni informes médicos.
- Una restricción única de SQLite impide dos citas para el mismo hueco de una oficina, incluso si se eligen trámites distintos o llegan peticiones simultáneas.
- La reserva y sus dos trabajos de correo se guardan juntos. El aviso se dirige exclusivamente a `info@inseso.org`; después se envía el justificante al correo introducido.
- El justificante incluye referencia, nombre, trámite, oficina, dirección, fecha y hora local, requisitos y aclaración de que el expediente se tramita presencialmente.
- Si falla SMTP, se conserva la cita y se muestra que los correos están pendientes. Se reintentan con espera progresiva. Si ya se avisó al INSESO, no se repite intencionadamente ese aviso al reintentar solo el justificante.
- Hay un límite de tres citas futuras activas por correo y límites de peticiones por IP. Los intervalos de 30 minutos, lunes a viernes de 08:00 a 16:00, antelación de un día y horizonte de 30 días son valores iniciales configurables; deben validarse por la institución.

No existe un panel administrativo público. El personal recibe las solicitudes por correo. Para comprobar un envío o liberar una cita anulada, el operador del servidor puede utilizar:

```sh
node --env-file=.env scripts/appointments-admin.mjs status INSESO-REFERENCIA
node --env-file=.env scripts/appointments-admin.mjs cancel INSESO-REFERENCIA
```

Los correos utilizan una cola persistente con reintentos, no una transacción distribuida con el proveedor SMTP. En una interrupción exactamente después de aceptar el mensaje y antes de guardar ese resultado, puede repetirse un envío; se mantiene el mismo identificador de mensaje para ayudar a su reconocimiento.

## Privacidad, cookies e idiomas

Las páginas `/privacidad`, `/cookies` y `/aviso-legal` están visibles y enlazadas desde el pie en los cuatro idiomas. El formulario de contacto muestra información de tratamiento y exige confirmar su lectura. La política describe los datos tratados y el borrado operativo de citas a los 90 días mediante el trabajador; los correos siguen la gestión documental del INSESO. El responsable institucional debe validar estos textos y su política de conservación antes de publicarlos.

`docs/AUDITORIA_COOKIES.md` documenta las herramientas identificadas en el código y el alcance de la comprobación. No se ha añadido un banner de publicidad inexistente. Los vídeos se cargan solo tras pulsar el botón correspondiente; los mapas son enlaces externos. Revise también el dominio publicado y cualquier herramienta añadida por el alojamiento o por el CMS.

La interfaz nueva y los textos de privacidad, contacto, citas, navegación y organigrama están en `src/i18n/locales/es.json`, `en.json`, `fr.json` y `pt.json`. El contenido administrativo de las prestaciones sigue la referencia española facilitada en `src/data/benefits.json`; las interfaces de otros idiomas lo indican. Los textos y medios gestionados desde el CMS conservan su propia configuración multilingüe.

## Límite de la comprobación realizada

Se han probado compilación, renderizado, navegación, APIs y lógica de reservas. Se han revisado visualmente las imágenes editadas. No se ha ejecutado un navegador de pruebas ni se ha validado el CMS o el SMTP de producción. La publicación debe cerrarse con una revisión visual en móvil y escritorio, validación institucional de oficinas y recepción de los correos reales.
