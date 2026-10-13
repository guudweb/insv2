// Exporta el objeto de configuración para que Strapi pueda utilizarlo.
export default {

  // Configuración de la API REST de Strapi.
  rest: {

    // Número de registros que la API devuelve por defecto
    // cuando la petición no especifica ningún límite.
    //
    // Por ejemplo, una petición como:
    // GET /api/noticias
    //
    // devolverá como máximo 25 noticias.
    defaultLimit: 25,

    // Número máximo de registros que un cliente puede solicitar
    // en una sola petición.
    //
    // Aunque se soliciten más de 100 registros, Strapi
    // limitará la respuesta a un máximo de 100.
    maxLimit: 100,

    // Indica que Strapi debe incluir en la respuesta el número
    // total de registros disponibles.
    //
    // Esta información se utiliza principalmente para crear
    // sistemas de paginación en el frontend.
    withCount: true,
  },
};