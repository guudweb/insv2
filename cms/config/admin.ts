// CAMBIO INSESO 2026-10-13: identidad verde y correcciones previas; detalles en docs/CAMBIOS_REVISION_2.md.
// Exporta una función de configuración como valor principal del archivo.
// Strapi ejecuta esta función automáticamente al iniciar.
//
// La función recibe un objeto que contiene "env".
// "env" permite leer las variables definidas en el archivo .env.
export default ({ env }) => ({

  // Configuración de autenticación del panel de administración de Strapi.
  auth: {

    // Obtiene de las variables de entorno la clave secreta utilizada
    // para crear y verificar los tokens JWT de los administradores.
    //
    // Ejemplo en el archivo .env:
    // ADMIN_JWT_SECRET=mi_clave_secreta
    secret: env('ADMIN_JWT_SECRET'),
  },

  // Configuración de los tokens de la API.
  apiToken: {

    // Obtiene la "salt" utilizada para generar tokens API más seguros.
    //
    // Una salt es un valor adicional que dificulta que los tokens
    // puedan ser descubiertos mediante ataques.
    salt: env('API_TOKEN_SALT'),
  },

  // Configuración relacionada con la transferencia de datos en Strapi.
  transfer: {

    // Configuración del token empleado durante una transferencia de datos.
    token: {

      // Obtiene la salt utilizada para proteger los tokens de transferencia.
      //
      // Estos tokens pueden utilizarse cuando se transfieren datos
      // entre diferentes instalaciones o entornos de Strapi.
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },

  // Configuración de claves secretas adicionales.
  secrets: {

    // Obtiene la clave utilizada para cifrar información sensible.
    //
    // El valor debe estar definido en el archivo .env:
    // ENCRYPTION_KEY=mi_clave_de_cifrado
    encryptionKey: env('ENCRYPTION_KEY'),
  },

  // Configuración de funciones opcionales o experimentales de Strapi.
  flags: {

    // Lee la variable de entorno FLAG_NPS como un valor booleano.
    //
    // Si la variable no existe, utiliza "true" como valor predeterminado.
    // NPS está relacionado con encuestas o mediciones de satisfacción.
    nps: env.bool('FLAG_NPS', true),

    // Lee FLAG_PROMOTE_EE como un valor booleano.
    //
    // Si la variable no existe, utiliza "true".
    // Esta opción permite mostrar promociones de la edición Enterprise
    // dentro del panel de administración de Strapi.
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },

  // Configuración de la vista previa del contenido.
  //
  // Esta función permite abrir en el frontend una noticia, prestación,
  // diapositiva u otro contenido antes de publicarlo definitivamente.
  preview: {

    // Activa la función de vista previa.
    enabled: true,

    // Contiene las opciones específicas de la vista previa.
    config: {

      // Define las direcciones web que tienen permiso para utilizar
      // la función de vista previa.
      //
      // Primero intenta obtener PREVIEW_URL desde el archivo .env.
      // Si no existe, utiliza http://localhost:4321.
      //
      // En este caso, localhost:4321 probablemente corresponde
      // al servidor del frontend, por ejemplo, una aplicación Astro.
      allowedOrigins: [
        env('PREVIEW_URL', 'http://localhost:4321'),
      ],

      // Función asíncrona encargada de construir la URL de vista previa.
      //
      // Parámetros:
      // - uid: identificador interno del tipo de contenido en Strapi.
      // - documentId: identificador del documento.
      // - locale: idioma o localización del contenido.
      // - status: estado del contenido, por ejemplo "draft" o "published".
      //
      // Aunque "locale" se recibe, actualmente no se utiliza
      // para construir la URL.
      async handler(uid, { documentId, locale, status }) {

        // Obtiene la dirección principal del frontend.
        //
        // Si PREVIEW_URL no está definida, se utiliza localhost:4321.
        const baseUrl = env(
          'PREVIEW_URL',
          'http://localhost:4321'
        );

        // Crea un objeto que relaciona los identificadores internos
        // de Strapi con nombres más sencillos para el frontend.
        const typeMap = {

          // Cuando el contenido es una noticia,
          // el valor enviado al frontend será "noticia".
          'api::noticia.noticia': 'noticia',

          // Cuando el contenido es una prestación,
          // el valor enviado será "prestacion".
          'api::prestacion.prestacion': 'prestacion',

          // Cuando el contenido es una diapositiva principal,
          // el valor enviado será "hero-slide".
          'api::hero-slide.hero-slide': 'hero-slide',

          // Cuando el contenido es una diapositiva de afiliación,
          // el valor enviado será "slide-afiliacion".
          'api::slide-afiliacion.slide-afiliacion':
            'slide-afiliacion',

          // Cuando el contenido es un socio,
          // el valor enviado será "socio".
          'api::socio.socio': 'socio',
        };

        // Busca el UID recibido dentro de typeMap.
        //
        // Si encuentra una coincidencia, guarda el nombre correspondiente.
        // Si no la encuentra, utiliza "noticia" como valor predeterminado.
        const type = typeMap[uid] || 'noticia';

        // Construye la dirección completa de vista previa.
        //
        // La URL incluye varios parámetros:
        // - type: tipo de contenido.
        // - documentId: identificador del documento.
        // - status: estado del contenido.
        //
        // Ejemplo del resultado:
        // http://localhost:4321/api/preview
        // ?type=noticia
        // &documentId=abc123
        // &status=draft
        const previewURL =
          `${baseUrl}/api/preview` +
          `?type=${type}` +
          `&documentId=${documentId}` +
          `&status=${status}` +
          `&secret=${encodeURIComponent(env('PREVIEW_SECRET', ''))}`;

        // Devuelve la URL construida a Strapi.
        //
        // Strapi utilizará esta dirección para abrir la página
        // correspondiente en el frontend.
        return previewURL;
      },
    },
  },
});