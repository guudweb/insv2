# Configurar y comprobar el correo en local

Todos los avisos institucionales de consultas, citas previas y formularios PDF se envían a **flora.bula@inseso.org**. El remitente se configura aparte mediante SMTP. Los justificantes del ciudadano llegan a la dirección que introduce en el formulario.

## Restaurar la configuración que ya funcionaba

1. Conserve su archivo `.env` anterior: por seguridad no se incluye en las entregas ZIP. Colóquelo en la carpeta `inseso-web`, junto a `package.json`. Compruebe en Windows que no se llama `.env.txt`.
2. Si no tiene ese archivo, copie `.env.example` como `.env` y complete los datos facilitados por el proveedor o administrador del correo:

```dotenv
SMTP_HOST=servidor_smtp_facilitado_por_el_proveedor
SMTP_PORT=587
SMTP_USER=usuario_smtp_autorizado
SMTP_PASS="contraseña_smtp_real"
SMTP_FROM=remitente_autorizado_por_el_proveedor
SITE_ORIGIN=http://localhost:4321
```

Estos valores son ejemplos de los nombres de las variables, no credenciales funcionales. `SMTP_USER` y `SMTP_FROM` pueden ser flora.bula@inseso.org únicamente si el proveedor autoriza esa cuenta para enviar. El servidor SMTP no tiene por qué llamarse inseso.org: use el nombre exacto indicado por el proveedor. No escriba las credenciales en componentes Astro ni en variables PUBLIC_.

El código utiliza TLS directo para el puerto 465 y STARTTLS obligatorio para 587 o 2525. Seleccione el puerto que admita su proveedor; SMTP_SECURE no decide este comportamiento. No desactive la comprobación de certificados.

`SMTP_TO` no cambia el destinatario en esta entrega. El destino institucional está fijado en `src/config/mail.mjs` para evitar que una configuración antigua lo desvíe. `SMTP_FROM` es el remitente, no el destinatario.

3. Guarde `.env`. Detenga el servidor con Ctrl+C y vuelva a ejecutar `npm start` desde esa carpeta. El comando carga `.env`. Ejecute `npm ci` primero si faltan las dependencias.
4. En otra terminal, desde la misma carpeta, ejecute:

```powershell
npm run smtp:verificar
```

La comprobación no envía correo. Indica las variables que faltan o un código seguro de error. EAUTH significa rechazo de usuario/contraseña; puede requerirse una contraseña de aplicación. EDNS o ENOTFOUND apuntan al nombre de servidor. ETIMEDOUT o ECONNECTION apuntan a conectividad, servidor o puerto. El administrador del correo debe confirmar la configuración si no dispone de esos datos.

5. Si la verificación pasa, solicite un envío de prueba a Flora:

```powershell
npm run smtp:verificar -- --enviar-prueba
```

Este segundo comando envía realmente un correo a flora.bula@inseso.org. Confirme la recepción en entrada y correo no deseado. «Aceptado por SMTP» no garantiza la entrega final; si no llega, solicite al administrador que revise el registro de entrega, el remitente autorizado y las políticas del buzón.

## Probar las tres funciones

- **Atención al asegurado:** complete la consulta, introduzca un correo propio de prueba y confirme la lectura del tratamiento de datos. Flora debe recibir la consulta y el solicitante el justificante con la misma referencia.
- **Formularios digitales:** complete una ficha válida, firme con su nombre y confirme el tratamiento de datos. «Descargar PDF» no envía correo; utilice «Enviar al INSESO». Flora debe recibir el PDF y el solicitante su justificante.
- **Cita previa:** conserve la base de datos y su configuración local probada. Además de SMTP, hacen falta `APPOINTMENTS_ENABLED=true` y una oficina con `enabled:true` y trámites asignados en `src/data/appointments.json`. Reserve un hueco disponible con un correo propio de prueba. Flora debe recibir el aviso y el ciudadano su justificante. La reserva puede quedar guardada aunque el correo quede pendiente. No repita reservas para forzar el envío: ejecute `npm run citas:correos` para reintentar los mensajes pendientes. En publicación debe programarse ese trabajador.

El origen del navegador debe coincidir con SITE_ORIGIN. Si Astro abre otro puerto, actualice ese valor y reinicie. No comparta `.env`, contraseñas ni mensajes con datos de ciudadanos para diagnosticar el problema. Puede compartir únicamente el código de error seguro que muestra el diagnóstico.

## Alcance de las comprobaciones de esta entrega

Se prueban los tres destinos mediante transporte simulado y se verifica que son flora.bula@inseso.org. No se dispone de sus credenciales SMTP y no se ha realizado un envío real. La recepción debe comprobarse con los pasos anteriores en su entorno.
