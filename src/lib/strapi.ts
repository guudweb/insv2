// Librería para conectar con Strapi
import qs from 'qs';

const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

// Preview context para mantener el estado de preview
interface PreviewContext {
  enabled: boolean;
  status?: string;
}

let previewContext: PreviewContext = {
  enabled: false
};

// Función para establecer el contexto de preview
export function setPreviewContext(enabled: boolean, status?: string) {
  previewContext = { enabled, status };
}

// Función para obtener el contexto de preview
export function getPreviewContext(): PreviewContext {
  return previewContext;
}

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi v5 estructura - datos directos sin "attributes"
interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  name: string;
  width: number;
  height: number;
}

// Interfaz para Categorias de Noticias
export interface Categoria {
  id: number;
  documentId: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  color: string;
  icono: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Interfaz para Categorías de Contacto (estáticas)
export interface CategoriaContacto {
  value: string;
  label: string;
  email: string;
}

// Interfaz para Noticias (mejorada)
export interface Noticia {
  id: number;
  documentId: string;
  titulo: string;
  slug: string | null;
  contenido: any;
  resumen: string | null;
  fechaPublicacion: string;
  autor: string | null;
  imagen: StrapiImage | null;
  video: string | null; // URL externa (YouTube, Vimeo, etc.)
  videoArchivo: StrapiImage | null; // Video subido a Strapi
  tipoMedia: 'imagen' | 'video';
  categoria: Categoria | null;
  posicion: 'principal' | 'lateral' | 'ultima-hora' | 'novedad';
  orden: number;
  destacado: boolean;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Interfaz para HeroSlides
export interface HeroSlide {
  id: number;
  documentId: string;
  titulo: string | null;
  subtitulo: string | null;
  imagen: StrapiImage;
  enlace: string | null;
  textoBoton: string | null;
  orden: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Interfaz para SlideAfiliacion
export interface SlideAfiliacion {
  id: number;
  documentId: string;
  titulo: string;
  imagen: StrapiImage;
  enlace: string;
  descripcion: string | null;
  orden: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Interfaz para ConfiguracionInicio (Single Type)
export interface ConfiguracionInicio {
  id: number;
  documentId: string;
  tituloHero: string | null;
  afiliacionTitulo: string | null;
  afiliacionImagen: StrapiImage | null;
  afiliacionTexto: string | null;
  afiliacionEnlace: string | null;
  sidebarImagenBanner: StrapiImage | null;
  sidebarCardTitulo: string | null;
  sidebarCardTexto: string | null;
  videoUrl: string | null;
  videoTitulo: string | null;
  videoFecha: string | null;
  videoDescripcion: string | null;
  tipoMediaPrincipal: 'video' | 'imagen' | null;
  videoArchivoPrincipal: StrapiImage | null;
  imagenPrincipal: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Interfaz para Prestaciones
export interface Prestacion {
  id: number;
  documentId: string;
  titulo: string;
  slug: string;
  descripcion: string;
  resumen: string | null;
  imagen: StrapiImage | null;
  imagenDetalle: StrapiImage | null;
  requisitos: string | null;
  destacado: boolean;
  orden: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Interfaz para Socios
export interface Socio {
  id: number;
  documentId: string;
  nombre: string;
  logo: StrapiImage;
  enlace: string | null;
  orden: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Obtener todas las noticias
export async function getNoticias(locale: string = 'es'): Promise<Noticia[]> {
  const queryParams: any = {
    populate: ['imagen', 'videoArchivo', 'categoria'],
    sort: ['fechaPublicacion:desc'],
    pagination: {
      pageSize: 100,
    },
    locale: locale,
  };

  // Añadir publicationState=preview si estamos en modo preview
  if (previewContext.enabled) {
    queryParams.publicationState = 'preview';
  }

  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });

  try {
    const headers: HeadersInit = {};

    // Habilitar content source maps en modo preview
    if (previewContext.enabled) {
      headers['strapi-encode-source-maps'] = 'true';
    }

    const response = await fetch(`${STRAPI_URL}/api/noticias?${query}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching noticias: ${response.status}`);
    }

    const json: StrapiResponse<Noticia[]> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    return [];
  }
}

// Obtener una noticia por documentId (para preview)
export async function getNoticiaByDocumentId(documentId: string, locale: string = 'es'): Promise<Noticia | null> {
  const queryParams: any = {
    populate: ['imagen', 'videoArchivo', 'categoria'],
    locale: locale,
  };

  // Añadir publicationState=preview si estamos en modo preview
  if (previewContext.enabled) {
    queryParams.publicationState = 'preview';
  }

  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });

  try {
    const headers: HeadersInit = {};

    // Habilitar content source maps en modo preview
    if (previewContext.enabled) {
      headers['strapi-encode-source-maps'] = 'true';
    }

    const response = await fetch(`${STRAPI_URL}/api/noticias/${documentId}?${query}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching noticia: ${response.status}`);
    }

    const json: StrapiResponse<Noticia> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener noticia:', error);
    return null;
  }
}

// Obtener una noticia por slug
export async function getNoticiaBySlug(slug: string, locale: string = 'es'): Promise<Noticia | null> {
  try {
    // Primero intentar buscar por slug exacto
    const queryParams: any = {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ['imagen', 'videoArchivo', 'categoria'],
      locale: locale,
    };

    // Añadir publicationState=preview si estamos en modo preview
    if (previewContext.enabled) {
      queryParams.publicationState = 'preview';
    }

    const queryBySlug = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });

    const headers: HeadersInit = {};
    if (previewContext.enabled) {
      headers['strapi-encode-source-maps'] = 'true';
    }

    const responseBySlug = await fetch(`${STRAPI_URL}/api/noticias?${queryBySlug}`, {
      headers,
    });

    if (responseBySlug.ok) {
      const jsonBySlug: StrapiResponse<Noticia[]> = await responseBySlug.json();
      if (jsonBySlug.data.length > 0) {
        return jsonBySlug.data[0];
      }
    }

    // Si no se encuentra, buscar todas las noticias y comparar con slug generado
    const allNoticias = await getNoticias(locale);
    const noticia = allNoticias.find(n => getNoticiaSlug(n) === slug);
    return noticia || null;
  } catch (error) {
    console.error('Error al obtener noticia:', error);
    return null;
  }
}

// Helper para obtener URL completa de imagen
export function getStrapiImageUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// Helper para formatear fecha
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Helper para generar slug desde título si no existe
export function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-'); // Eliminar guiones duplicados
}

// Helper para obtener el slug de una noticia
export function getNoticiaSlug(noticia: Noticia): string {
  return noticia.slug || generateSlug(noticia.titulo);
}

// Helper para obtener URL de video (prioriza videoArchivo sobre video)
export function getNoticiaVideoUrl(noticia: Noticia): string | null {
  // Prioridad 1: Video subido a Strapi
  if (noticia.videoArchivo?.url) {
    return getStrapiImageUrl(noticia.videoArchivo.url);
  }
  // Prioridad 2: URL externa
  if (noticia.video) {
    return noticia.video;
  }
  return null;
}

// Helper para convertir Rich Text de Strapi a texto plano
export function richTextToPlainText(richText: any): string {
  if (!richText) return '';
  if (typeof richText === 'string') return richText;

  // Si es un array de bloques (Strapi v5 Rich Text)
  if (Array.isArray(richText)) {
    return richText
      .map((block: any) => {
        if (block.children) {
          return block.children
            .map((child: any) => child.text || '')
            .join('');
        }
        return '';
      })
      .join('\n');
  }

  return '';
}

// ==================== PRESTACIONES ====================

// Obtener todas las prestaciones
export async function getPrestaciones(locale: string = 'es'): Promise<Prestacion[]> {
  const query = qs.stringify(
    {
      populate: ['imagen', 'imagenDetalle'],
      sort: ['orden:asc'],
      pagination: {
        pageSize: 100,
      },
      locale: locale,
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const response = await fetch(`${STRAPI_URL}/api/prestaciones?${query}`);

    if (!response.ok) {
      throw new Error(`Error fetching prestaciones: ${response.status}`);
    }

    const json: StrapiResponse<Prestacion[]> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener prestaciones:', error);
    return [];
  }
}

// Obtener una prestación por documentId (para preview)
export async function getPrestacionByDocumentId(documentId: string, locale: string = 'es'): Promise<Prestacion | null> {
  const queryParams: any = {
    populate: ['imagen', 'imagenDetalle'],
    locale: locale,
  };

  // Añadir publicationState=preview si estamos en modo preview
  if (previewContext.enabled) {
    queryParams.publicationState = 'preview';
  }

  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });

  try {
    const headers: HeadersInit = {};

    // Habilitar content source maps en modo preview
    if (previewContext.enabled) {
      headers['strapi-encode-source-maps'] = 'true';
    }

    const response = await fetch(`${STRAPI_URL}/api/prestaciones/${documentId}?${query}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching prestacion: ${response.status}`);
    }

    const json: StrapiResponse<Prestacion> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener prestación:', error);
    return null;
  }
}

// Obtener una prestación por slug
export async function getPrestacionBySlug(slug: string, locale: string = 'es'): Promise<Prestacion | null> {
  const queryParams: any = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['imagen', 'imagenDetalle'],
    locale: locale,
  };

  // Añadir publicationState=preview si estamos en modo preview
  if (previewContext.enabled) {
    queryParams.publicationState = 'preview';
  }

  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });

  try {
    const headers: HeadersInit = {};
    if (previewContext.enabled) {
      headers['strapi-encode-source-maps'] = 'true';
    }

    const response = await fetch(`${STRAPI_URL}/api/prestaciones?${query}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching prestacion: ${response.status}`);
    }

    const json: StrapiResponse<Prestacion[]> = await response.json();
    return json.data.length > 0 ? json.data[0] : null;
  } catch (error) {
    console.error('Error al obtener prestación:', error);
    return null;
  }
}

// ==================== HERO SLIDES ====================

// Obtener todos los hero slides
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const query = qs.stringify(
    {
      populate: ['imagen'],
      filters: {
        activo: {
          $eq: true,
        },
      },
      sort: ['orden:asc'],
      pagination: {
        pageSize: 100,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const response = await fetch(`${STRAPI_URL}/api/hero-slides?${query}`);

    if (!response.ok) {
      throw new Error(`Error fetching hero slides: ${response.status}`);
    }

    const json: StrapiResponse<HeroSlide[]> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener hero slides:', error);
    return [];
  }
}

// ==================== SLIDES AFILIACIÓN ====================

// Obtener todos los slides de afiliación
export async function getSlidesAfiliacion(): Promise<SlideAfiliacion[]> {
  const query = qs.stringify(
    {
      populate: ['imagen'],
      filters: {
        activo: {
          $eq: true,
        },
      },
      sort: ['orden:asc'],
      pagination: {
        pageSize: 100,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const response = await fetch(`${STRAPI_URL}/api/slide-afiliacions?${query}`);

    if (!response.ok) {
      throw new Error(`Error fetching slides afiliacion: ${response.status}`);
    }

    const json: StrapiResponse<SlideAfiliacion[]> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener slides de afiliación:', error);
    return [];
  }
}

// ==================== NOTICIAS (CON FILTROS) ====================

// Obtener noticias por posición
export async function getNoticiasByPosicion(posicion: string, limit?: number, locale: string = 'es'): Promise<Noticia[]> {
  const query = qs.stringify(
    {
      populate: ['imagen', 'videoArchivo', 'categoria'],
      filters: {
        posicion: {
          $eq: posicion,
        },
        activo: {
          $eq: true,
        },
      },
      sort: ['orden:asc'],
      pagination: {
        pageSize: limit || 100,
      },
      locale: locale,
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const response = await fetch(`${STRAPI_URL}/api/noticias?${query}`);

    if (!response.ok) {
      throw new Error(`Error fetching noticias: ${response.status}`);
    }

    const json: StrapiResponse<Noticia[]> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener noticias por posición:', error);
    return [];
  }
}

// ==================== CONFIGURACIÓN INICIO ====================

// Obtener configuración de inicio (Single Type)
export async function getConfiguracionInicio(locale: string = 'es'): Promise<ConfiguracionInicio | null> {
  const query = qs.stringify(
    {
      populate: ['afiliacionImagen', 'sidebarImagenBanner', 'videoArchivoPrincipal', 'imagenPrincipal'],
      locale: locale,
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const response = await fetch(`${STRAPI_URL}/api/configuracion-inicio?${query}`);

    if (!response.ok) {
      throw new Error(`Error fetching configuracion inicio: ${response.status}`);
    }

    const json: StrapiResponse<ConfiguracionInicio> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener configuración de inicio:', error);
    return null;
  }
}

// ==================== SOCIOS ====================

// Obtener todos los socios
export async function getSocios(): Promise<Socio[]> {
  const query = qs.stringify(
    {
      populate: ['logo'],
      filters: {
        activo: {
          $eq: true,
        },
      },
      sort: ['orden:asc'],
      pagination: {
        pageSize: 100,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const response = await fetch(`${STRAPI_URL}/api/socios?${query}`);

    if (!response.ok) {
      throw new Error(`Error fetching socios: ${response.status}`);
    }

    const json: StrapiResponse<Socio[]> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener socios:', error);
    return [];
  }
}

// Obtener un socio por documentId (para preview)
export async function getSocioByDocumentId(documentId: string): Promise<Socio | null> {
  const queryParams: any = {
    populate: ['logo'],
  };

  // Añadir publicationState=preview si estamos en modo preview
  if (previewContext.enabled) {
    queryParams.publicationState = 'preview';
  }

  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });

  try {
    const headers: HeadersInit = {};

    // Habilitar content source maps en modo preview
    if (previewContext.enabled) {
      headers['strapi-encode-source-maps'] = 'true';
    }

    const response = await fetch(`${STRAPI_URL}/api/socios/${documentId}?${query}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching socio: ${response.status}`);
    }

    const json: StrapiResponse<Socio> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener socio:', error);
    return null;
  }
}

// ==================== FORMULARIOS ====================

// Interfaz para Formularios
export interface Formulario {
  id: number;
  documentId: string;
  nombre: string;
  codigo: string;
  descripcion: string;
  formato: 'PDF' | 'Excel' | 'Word';
  tamano: string | null;
  archivo: StrapiImage | null;
  thumbnail: StrapiImage | null;
  categoria_formulario: CategoriaFormulario | null;
  orden: number;
  activo: boolean;
  requisitos: any;
  instrucciones: any;
  descargas: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Interfaz para Categorías de Formularios
export interface CategoriaFormulario {
  id: number;
  documentId: string;
  titulo: string;
  descripcion: string;
  icono: string;
  color: string;
  orden: number;
  activa: boolean;
  formularios: Formulario[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Obtener todas las categorías de formularios con sus formularios
export async function getCategoriasFormularios(locale: string = 'es'): Promise<CategoriaFormulario[]> {
  const query = qs.stringify(
    {
      populate: {
        formularios: {
          populate: ['archivo', 'thumbnail'],
          filters: {
            activo: {
              $eq: true,
            },
          },
          sort: ['orden:asc'],
        },
      },
      filters: {
        activa: {
          $eq: true,
        },
      },
      sort: ['orden:asc'],
      pagination: {
        pageSize: 100,
      },
      locale: locale,
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const response = await fetch(`${STRAPI_URL}/api/categorias-formularios?${query}`);

    if (!response.ok) {
      throw new Error(`Error fetching categorias formularios: ${response.status}`);
    }

    const json: StrapiResponse<CategoriaFormulario[]> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener categorías de formularios:', error);
    return [];
  }
}

// Obtener todos los formularios
export async function getFormularios(locale: string = 'es'): Promise<Formulario[]> {
  const query = qs.stringify(
    {
      populate: ['archivo', 'thumbnail', 'categoria_formulario'],
      filters: {
        activo: {
          $eq: true,
        },
      },
      sort: ['orden:asc'],
      pagination: {
        pageSize: 100,
      },
      locale: locale,
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const response = await fetch(`${STRAPI_URL}/api/formularios?${query}`);

    if (!response.ok) {
      throw new Error(`Error fetching formularios: ${response.status}`);
    }

    const json: StrapiResponse<Formulario[]> = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error al obtener formularios:', error);
    return [];
  }
}

// Obtener un formulario por código
export async function getFormularioByCodigo(codigo: string, locale: string = 'es'): Promise<Formulario | null> {
  const query = qs.stringify(
    {
      filters: {
        codigo: {
          $eq: codigo,
        },
      },
      populate: ['archivo', 'thumbnail', 'categoria_formulario'],
      locale: locale,
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const response = await fetch(`${STRAPI_URL}/api/formularios?${query}`);

    if (!response.ok) {
      throw new Error(`Error fetching formulario: ${response.status}`);
    }

    const json: StrapiResponse<Formulario[]> = await response.json();
    return json.data.length > 0 ? json.data[0] : null;
  } catch (error) {
    console.error('Error al obtener formulario:', error);
    return null;
  }
}

// Incrementar contador de descargas de un formulario
export async function incrementarDescargasFormulario(_documentId: string): Promise<void> {
  try {
    // Esta función requeriría un endpoint personalizado en Strapi
    // Para implementar: crear un endpoint en Strapi que incremente el contador
    // TODO: Implementar cuando se necesite tracking de descargas
  } catch (error) {
    // Error silencioso - no afecta la funcionalidad principal
  }
}

// ==================== CATEGORÍAS ESTÁTICAS ====================

// Obtener categorías de contacto (estáticas)
export function getCategoriasContacto(): CategoriaContacto[] {
  return [
    {
      value: 'consulta',
      label: 'Consulta General',
      email: 'consultas@inseso.org'
    },
    {
      value: 'afiliacion',
      label: 'Afiliación',
      email: 'afiliacion@inseso.org'
    },
    {
      value: 'prestaciones',
      label: 'Prestaciones Sociales',
      email: 'prestaciones@inseso.org'
    },
    {
      value: 'reclamo',
      label: 'Reclamo',
      email: 'reclamos@inseso.org'
    },
    {
      value: 'seguimiento',
      label: 'Seguimiento de Trámite',
      email: 'seguimiento@inseso.org'
    },
    {
      value: 'sugerencia',
      label: 'Sugerencia',
      email: 'sugerencias@inseso.org'
    },
    {
      value: 'otro',
      label: 'Otro',
      email: 'support@omnitechsl.com'
    }
  ];
}

// Obtener categorías de noticias (estáticas)
export function getCategoriasNoticiasEstaticas(): Omit<Categoria, 'id' | 'documentId' | 'createdAt' | 'updatedAt' | 'publishedAt'>[] {
  return [
    {
      nombre: 'Institucional',
      slug: 'institucional',
      descripcion: 'Noticias institucionales de INSESO',
      color: '#8c1b12',
      icono: 'fa-building',
      activo: true
    },
    {
      nombre: 'Eventos',
      slug: 'eventos',
      descripcion: 'Eventos y actividades de INSESO',
      color: '#1b5e8c',
      icono: 'fa-calendar',
      activo: true
    },
    {
      nombre: 'Prestaciones',
      slug: 'prestaciones',
      descripcion: 'Información sobre prestaciones sociales',
      color: '#2e8c1b',
      icono: 'fa-hand-holding-heart',
      activo: true
    },
    {
      nombre: 'Comunicados',
      slug: 'comunicados',
      descripcion: 'Comunicados oficiales',
      color: '#8c6d1b',
      icono: 'fa-bullhorn',
      activo: true
    },
    {
      nombre: 'Salud',
      slug: 'salud',
      descripcion: 'Noticias relacionadas con salud',
      color: '#8c1b6d',
      icono: 'fa-heartbeat',
      activo: true
    }
  ];
}
