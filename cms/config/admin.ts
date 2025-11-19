export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  // Preview configuration
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('PREVIEW_URL', 'http://localhost:4321')],
      async handler(uid, { documentId, locale, status }) {
        const baseUrl = env('PREVIEW_URL', 'http://localhost:4321');

        // Map Strapi UID to content type names
        const typeMap = {
          'api::noticia.noticia': 'noticia',
          'api::prestacion.prestacion': 'prestacion',
          'api::hero-slide.hero-slide': 'hero-slide',
          'api::slide-afiliacion.slide-afiliacion': 'slide-afiliacion',
          'api::socio.socio': 'socio',
        };

        const type = typeMap[uid] || 'noticia';

        // Build preview URL with parameters
        const previewURL = `${baseUrl}/api/preview?type=${type}&documentId=${documentId}&status=${status}`;

        return previewURL;
      },
    },
  },
});
