import es from './locales/es.json';
import fr from './locales/fr.json';
import en from './locales/en.json';
import pt from './locales/pt.json';

// Idiomas disponibles con sus nombres nativos
export const languages = {
  es: 'Español',
  fr: 'Français',
  en: 'English',
  pt: 'Português'
} as const;

// Idioma por defecto
export const defaultLang = 'es';

// Tipos de locales soportados
export type Locale = keyof typeof languages;

// Diccionario de traducciones UI
export const ui = {
  es,
  fr,
  en,
  pt
} as const;

/**
 * Obtiene el idioma actual desde la URL
 * @param url URL object from Astro.url
 * @returns El código de idioma (es, fr, en, pt)
 */
export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Locale;
  return defaultLang;
}

/**
 * Hook para usar traducciones
 * @param lang Idioma actual
 * @returns Función t() para traducir claves
 */
export function useTranslations(lang: Locale) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = ui[lang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };
}

/**
 * Genera path localizado según el idioma
 * @param path Ruta sin localizar (ej: /noticias)
 * @param lang Idioma destino
 * @returns Ruta localizada (ej: /fr/actualites o /noticias)
 */
export function getLocalizedPath(path: string, lang: Locale): string {
  // Si es español (default), no agregar prefijo
  if (lang === defaultLang) return path;

  // Para otros idiomas, agregar prefijo
  return `/${lang}${path}`;
}

/**
 * Remueve el prefijo de idioma de una ruta
 * @param pathname Pathname completo
 * @returns Path sin prefijo de idioma
 */
export function removeLocalePrefix(pathname: string): string {
  const [, maybeLang, ...rest] = pathname.split('/');

  if (maybeLang in ui) {
    const cleanPath = rest.join('/');
    return cleanPath ? `/${cleanPath}` : '/';
  }

  return pathname;
}

/**
 * Traduce nombres de rutas según el idioma
 * Usado para SEO y URLs amigables
 */
export const routeTranslations: Record<Locale, Record<string, string>> = {
  es: {
    '/': '/',
    '/noticias': '/noticias',
    '/contacto': '/contacto',
    '/sobre_nosotros': '/sobre_nosotros',
    '/descarga_formularios': '/descarga_formularios',
    '/condiciones_adhesion': '/condiciones_adhesion',
    '/nuestras_agencias': '/nuestras_agencias',
    '/afiliacionee_trabajadores': '/afiliacionee_trabajadores',
    '/afiliacionee_empresas': '/afiliacionee_empresas',
    '/afiliacionee_autonomo': '/afiliacionee_autonomo',
    '/solicitud_de_carne': '/solicitud_de_carne',
    '/empleadores/penas-sanciones': '/empleadores/penas-sanciones',
    '/Prestaciones_Sociales': '/Prestaciones_Sociales'
  },
  fr: {
    '/': '/',
    '/noticias': '/noticias',
    '/contacto': '/contacto',
    '/sobre_nosotros': '/sobre_nosotros',
    '/descarga_formularios': '/descarga_formularios',
    '/condiciones_adhesion': '/condiciones_adhesion',
    '/nuestras_agencias': '/nuestras_agencias',
    '/afiliacionee_trabajadores': '/afiliacionee_trabajadores',
    '/afiliacionee_empresas': '/afiliacionee_empresas',
    '/afiliacionee_autonomo': '/afiliacionee_autonomo',
    '/solicitud_de_carne': '/solicitud_de_carne',
    '/empleadores/penas-sanciones': '/empleadores/penas-sanciones',
    '/Prestaciones_Sociales': '/Prestaciones_Sociales'
  },
  en: {
    '/': '/',
    '/noticias': '/noticias',
    '/contacto': '/contacto',
    '/sobre_nosotros': '/sobre_nosotros',
    '/descarga_formularios': '/descarga_formularios',
    '/condiciones_adhesion': '/condiciones_adhesion',
    '/nuestras_agencias': '/nuestras_agencias',
    '/afiliacionee_trabajadores': '/afiliacionee_trabajadores',
    '/afiliacionee_empresas': '/afiliacionee_empresas',
    '/afiliacionee_autonomo': '/afiliacionee_autonomo',
    '/solicitud_de_carne': '/solicitud_de_carne',
    '/empleadores/penas-sanciones': '/empleadores/penas-sanciones',
    '/Prestaciones_Sociales': '/Prestaciones_Sociales'
  },
  pt: {
    '/': '/',
    '/noticias': '/noticias',
    '/contacto': '/contacto',
    '/sobre_nosotros': '/sobre_nosotros',
    '/descarga_formularios': '/descarga_formularios',
    '/condiciones_adhesion': '/condiciones_adhesion',
    '/nuestras_agencias': '/nuestras_agencias',
    '/afiliacionee_trabajadores': '/afiliacionee_trabajadores',
    '/afiliacionee_empresas': '/afiliacionee_empresas',
    '/afiliacionee_autonomo': '/afiliacionee_autonomo',
    '/solicitud_de_carne': '/solicitud_de_carne',
    '/empleadores/penas-sanciones': '/empleadores/penas-sanciones',
    '/Prestaciones_Sociales': '/Prestaciones_Sociales'
  }
};

/**
 * Obtiene la ruta traducida según el idioma
 * @param route Ruta base en español
 * @param lang Idioma destino
 * @returns Ruta traducida
 */
export function getTranslatedRoute(route: string, lang: Locale): string {
  const translations = routeTranslations[lang];
  return translations[route] || route;
}

/**
 * Genera todas las URLs alternativas para hreflang
 * @param currentPath Ruta actual sin prefijo de idioma
 * @param baseUrl URL base del sitio
 * @returns Objeto con todos los idiomas y sus URLs
 */
export function getAlternateUrls(currentPath: string, baseUrl: string): Record<Locale, string> {
  const alternates: Record<Locale, string> = {} as Record<Locale, string>;

  for (const lang of Object.keys(languages) as Locale[]) {
    const translatedRoute = getTranslatedRoute(currentPath, lang);
    const localizedPath = getLocalizedPath(translatedRoute, lang);
    alternates[lang] = `${baseUrl}${localizedPath}`;
  }

  return alternates;
}

/**
 * Formatea una fecha según el idioma
 * @param date Fecha a formatear
 * @param lang Idioma
 * @returns Fecha formateada
 */
export function formatDate(date: string | Date, lang: Locale): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  const localeMap: Record<Locale, string> = {
    es: 'es-GQ',
    fr: 'fr-FR',
    en: 'en-US',
    pt: 'pt-PT'
  };

  return new Intl.DateTimeFormat(localeMap[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}
