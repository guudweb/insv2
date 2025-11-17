// Librería para conectar con Strapi
import qs from 'qs';

const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

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

interface Noticia {
  id: number;
  documentId: string;
  titulo: string;
  slug: string | null;
  contenido: any;
  resumen: string;
  fechaPublicacion: string;
  autor: string | null;
  imagen: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Obtener todas las noticias
export async function getNoticias(): Promise<Noticia[]> {
  const query = qs.stringify(
    {
      populate: ['imagen'],
      sort: ['fechaPublicacion:desc'],
      pagination: {
        pageSize: 100,
      },
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
    console.error('Error al obtener noticias:', error);
    return [];
  }
}

// Obtener una noticia por slug
export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  try {
    // Primero intentar buscar por slug exacto
    const queryBySlug = qs.stringify(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: ['imagen'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const responseBySlug = await fetch(`${STRAPI_URL}/api/noticias?${queryBySlug}`);

    if (responseBySlug.ok) {
      const jsonBySlug: StrapiResponse<Noticia[]> = await responseBySlug.json();
      if (jsonBySlug.data.length > 0) {
        return jsonBySlug.data[0];
      }
    }

    // Si no se encuentra, buscar todas las noticias y comparar con slug generado
    const allNoticias = await getNoticias();
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
