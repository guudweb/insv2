# 🌍 Estrategia de Internacionalización (i18n) para INSESO

## 📊 Análisis del Proyecto Actual

### Estado Actual
- **Framework**: Astro 5.15.9 con SSR (output: 'server')
- **CMS**: Strapi v5 con 9 content types
- **Páginas totales**: ~35 páginas .astro
- **Idioma actual**: Español (con algunas páginas en francés mezclado)
- **Contenido dinámico**: 100% desde Strapi
- **Paquetes i18n**: Ninguno instalado

### Content Types en Strapi
1. noticia
2. categoria
3. prestacion
4. formulario
5. categoria-formulario
6. hero-slide
7. slide-afiliacion
8. socio
9. configuracion-inicio

---

## 🎯 Idiomas Objetivo Recomendados

Para Guinea Ecuatorial, los idiomas prioritarios son:

1. **Español** (idioma oficial, actual) - `es`
2. **Francés** (idioma oficial) - `fr`
3. **Portugués** (idioma oficial desde 2014) - `pt`
4. **Inglés** (opcional, internacional) - `en`

---

## 🏗️ Estrategia Recomendada: **Astro i18n + Strapi i18n Plugin**

### Por qué esta estrategia:

✅ **Ventajas:**
- Gestión de traducciones directamente desde Strapi (editores no técnicos)
- SEO optimizado con URLs localizadas (`/es/noticias`, `/fr/actualites`)
- Contenido dinámico traducido automáticamente
- Sin duplicación de contenido
- Escalable a nuevos idiomas
- Compatible con SSR de Astro

✅ **Mejor para INSESO porque:**
- Todo el contenido está en Strapi (noticias, prestaciones, formularios)
- Los editores pueden traducir desde el panel de Strapi
- No requiere modificar 35 páginas manualmente
- Soporta rich text multiidioma
- Permite traducción progresiva

---

## 📐 Arquitectura Propuesta

### 1. Estructura de URLs

```
Español (default):
https://inseso.org/
https://inseso.org/noticias
https://inseso.org/noticias/titulo-noticia
https://inseso.org/prestacion/pension-vejez

Francés:
https://inseso.org/fr/
https://inseso.org/fr/actualites
https://inseso.org/fr/actualites/titre-actualite
https://inseso.org/fr/prestation/pension-vieillesse

Portugués:
https://inseso.org/pt/
https://inseso.org/pt/noticias
https://inseso.org/pt/noticias/titulo-noticia
https://inseso.org/pt/prestacao/pensao-velhice
```

### 2. Estructura de Archivos

```
src/
├── i18n/
│   ├── ui.ts                    # Traducciones UI (navbar, footer, botones)
│   ├── utils.ts                 # Funciones helper i18n
│   └── locales/
│       ├── es.json              # Español (UI estático)
│       ├── fr.json              # Francés (UI estático)
│       ├── pt.json              # Portugués (UI estático)
│       └── en.json              # Inglés (opcional)
├── pages/
│   ├── index.astro              # Español (default)
│   ├── noticias.astro
│   ├── contacto.astro
│   ├── [lang]/                  # Rutas localizadas
│   │   ├── index.astro          # Homepage traducida
│   │   ├── noticias.astro
│   │   ├── noticias/[slug].astro
│   │   ├── contacto.astro
│   │   └── ...
│   └── ...
├── lib/
│   └── strapi.ts                # Actualizado con soporte i18n
└── components/
    ├── LanguageSwitcher.astro   # Selector de idioma
    ├── Navbar.astro             # Con traducciones
    └── Footer.astro             # Con traducciones
```

---

## 🔧 Implementación Paso a Paso

### FASE 1: Configurar Astro i18n (1-2 días)

#### 1.1. Actualizar `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'fr', 'pt', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false
    }
  },
  // ... resto de configuración
});
```

#### 1.2. Instalar dependencias

```bash
npm install astro-i18next i18next
# O alternativa más ligera:
npm install @astrojs/i18n
```

#### 1.3. Crear archivos de traducción UI

**src/i18n/locales/es.json**
```json
{
  "nav": {
    "home": "INICIO",
    "news": "NOTICIAS",
    "about": "SOBRE NOSOTROS",
    "insured": "ASEGURADOS",
    "employers": "EMPLEADORES",
    "contact": "CONTACTO"
  },
  "footer": {
    "allRightsReserved": "Todos los derechos reservados",
    "usefulLinks": "Enlaces Útiles",
    "contact": "Contacto"
  },
  "common": {
    "readMore": "Seguir leyendo",
    "download": "Descargar",
    "search": "Buscar",
    "filter": "Filtrar",
    "viewAll": "Ver todo"
  }
}
```

**src/i18n/locales/fr.json**
```json
{
  "nav": {
    "home": "ACCUEIL",
    "news": "ACTUALITÉS",
    "about": "À PROPOS",
    "insured": "ASSURÉS",
    "employers": "EMPLOYEURS",
    "contact": "CONTACT"
  },
  "footer": {
    "allRightsReserved": "Tous droits réservés",
    "usefulLinks": "Liens Utiles",
    "contact": "Contact"
  },
  "common": {
    "readMore": "Lire la suite",
    "download": "Télécharger",
    "search": "Rechercher",
    "filter": "Filtrer",
    "viewAll": "Voir tout"
  }
}
```

**src/i18n/locales/pt.json**
```json
{
  "nav": {
    "home": "INÍCIO",
    "news": "NOTÍCIAS",
    "about": "SOBRE NÓS",
    "insured": "SEGURADOS",
    "employers": "EMPREGADORES",
    "contact": "CONTATO"
  },
  "footer": {
    "allRightsReserved": "Todos os direitos reservados",
    "usefulLinks": "Links Úteis",
    "contact": "Contato"
  },
  "common": {
    "readMore": "Continuar lendo",
    "download": "Baixar",
    "search": "Pesquisar",
    "filter": "Filtrar",
    "viewAll": "Ver tudo"
  }
}
```

#### 1.4. Crear utilidades i18n

**src/i18n/utils.ts**
```typescript
import es from './locales/es.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import en from './locales/en.json';

export const languages = {
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  en: 'English'
};

export const defaultLang = 'es';

export const ui = {
  es,
  fr,
  pt,
  en
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = ui[lang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };
}

export function getLocalizedPath(path: string, lang: string) {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}
```

#### 1.5. Actualizar Navbar con traducciones

**src/components/Navbar.astro**
```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const { currentPath = '/' } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<nav class="navbar navbar-expand-lg navbar-dark bg-light top-nav">
  <div class="container">
    <a class="navbar-brand" href="/">
      <img src="/images/logo.png" alt="logo" />
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive">
      <span class="fas fa-bars"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class={`nav-link ${currentPath === '/' ? 'active' : ''}`} href="/">{t('nav.home')}</a>
        </li>
        <li class="nav-item">
          <a class={`nav-link ${currentPath === '/noticias' ? 'active' : ''}`} href="/noticias">{t('nav.news')}</a>
        </li>
        <!-- más items... -->
      </ul>

      <!-- Selector de idioma -->
      <LanguageSwitcher currentLang={lang} currentPath={currentPath} />
    </div>
  </div>
</nav>
```

#### 1.6. Crear selector de idioma

**src/components/LanguageSwitcher.astro**
```astro
---
import { languages, getLocalizedPath } from '../i18n/utils';

const { currentLang, currentPath } = Astro.props;
---

<div class="language-switcher dropdown">
  <button class="btn btn-link dropdown-toggle" type="button" id="langDropdown" data-bs-toggle="dropdown">
    <i class="fas fa-globe"></i> {languages[currentLang]}
  </button>
  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="langDropdown">
    {Object.entries(languages).map(([code, name]) => (
      <li>
        <a
          class={`dropdown-item ${currentLang === code ? 'active' : ''}`}
          href={getLocalizedPath(currentPath, code)}
        >
          {name}
        </a>
      </li>
    ))}
  </ul>
</div>

<style>
  .language-switcher {
    margin-left: 1rem;
  }
  .language-switcher .btn-link {
    color: #fff;
    text-decoration: none;
  }
  .language-switcher .btn-link:hover {
    color: #8c1b12;
  }
</style>
```

---

### FASE 2: Configurar Strapi i18n (2-3 días)

#### 2.1. Instalar plugin i18n en Strapi

```bash
cd cms
npm install @strapi/plugin-i18n
```

#### 2.2. Habilitar i18n en Strapi

1. Ir a **Settings → Internationalization**
2. Agregar locales: `es`, `fr`, `pt`, `en`
3. Configurar español como default

#### 2.3. Habilitar i18n en Content Types

Para cada content type (noticia, prestacion, formulario, etc.):

1. Editar Content-Type Builder
2. En **Advanced Settings**, marcar **"Enable localization for this Content-Type"**
3. Guardar y reiniciar Strapi

Ejemplo para **noticia**:

```json
// cms/src/api/noticia/content-types/noticia/schema.json
{
  "kind": "collectionType",
  "collectionName": "noticias",
  "info": {
    "singularName": "noticia",
    "pluralName": "noticias",
    "displayName": "Noticia"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true  // <-- AGREGAR ESTO
    }
  },
  "attributes": {
    "titulo": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": true  // <-- Campo traducible
        }
      }
    },
    "slug": {
      "type": "uid",
      "targetField": "titulo",
      "pluginOptions": {
        "i18n": {
          "localized": true  // <-- Slug diferente por idioma
        }
      }
    },
    "contenido": {
      "type": "richtext",
      "pluginOptions": {
        "i18n": {
          "localized": true  // <-- Contenido traducible
        }
      }
    },
    "imagen": {
      "type": "media",
      "pluginOptions": {
        "i18n": {
          "localized": false  // <-- Imagen compartida entre idiomas
        }
      }
    }
  }
}
```

#### 2.4. Actualizar cliente Strapi en frontend

**src/lib/strapi.ts**
```typescript
// Agregar parámetro locale a todas las funciones

export async function getNoticias(locale: string = 'es', limit: number = 100): Promise<Noticia[]> {
  const query = qs.stringify(
    {
      locale: locale,  // <-- NUEVO
      populate: ['categoria', 'imagen', 'videoArchivo'],
      sort: ['orden:asc', 'createdAt:desc'],
      pagination: {
        pageSize: limit,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const response = await fetch(`${STRAPI_URL}/api/noticias?${query}`);
    // ... resto del código
  }
}

// Función helper para obtener locale desde URL
export function getLocaleFromPath(pathname: string): string {
  const [, lang] = pathname.split('/');
  const supportedLocales = ['es', 'fr', 'pt', 'en'];
  return supportedLocales.includes(lang) ? lang : 'es';
}
```

---

### FASE 3: Actualizar Páginas (3-5 días)

#### 3.1. Crear estructura de rutas localizadas

```bash
mkdir -p src/pages/[lang]
```

#### 3.2. Migrar páginas a rutas dinámicas

**src/pages/[lang]/index.astro** (Homepage localizada)
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getLangFromUrl, useTranslations } from '../../i18n/utils';
import {
  getConfiguracionInicio,
  getHeroSlides,
  getNoticias,
  getPrestaciones
} from '../../lib/strapi';

export const prerender = false;

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

// Obtener datos en el idioma actual
const config = await getConfiguracionInicio(lang);
const heroSlides = await getHeroSlides(lang);
const noticias = await getNoticias(lang, 10);
const prestaciones = await getPrestaciones(lang);
---

<BaseLayout title={`INSESO - ${t('nav.home')}`} currentPath="/">
  <!-- Contenido traducido -->
</BaseLayout>
```

**src/pages/[lang]/noticias/[slug].astro** (Detalle de noticia localizada)
```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import { getNoticiaBySlug } from '../../../lib/strapi';
import { getLangFromUrl } from '../../../i18n/utils';

export const prerender = false;

const { slug } = Astro.params;
const lang = getLangFromUrl(Astro.url);

const noticia = await getNoticiaBySlug(slug!, lang);

if (!noticia) {
  return Astro.redirect('/404');
}
---

<BaseLayout title={noticia.titulo}>
  <!-- Contenido de noticia traducido -->
</BaseLayout>
```

#### 3.3. Mantener rutas por defecto (español)

Las rutas sin prefijo seguirán siendo español:
- `/` → Español
- `/noticias` → Español
- `/fr/` → Francés
- `/fr/actualites` → Francés

---

### FASE 4: SEO y Metadatos (1-2 días)

#### 4.1. Agregar hreflang tags

**src/layouts/BaseLayout.astro**
```astro
---
import { languages } from '../i18n/utils';

const { title, currentPath = '/', lang = 'es' } = Astro.props;
const currentUrl = Astro.url.href;
---

<html lang={lang}>
<head>
  <meta charset="UTF-8">
  <title>{title}</title>

  <!-- Canonical -->
  <link rel="canonical" href={currentUrl} />

  <!-- hreflang tags para SEO -->
  {Object.keys(languages).map(locale => (
    <link
      rel="alternate"
      hreflang={locale}
      href={`${Astro.site}${locale === 'es' ? '' : locale}${currentPath}`}
    />
  ))}
  <link rel="alternate" hreflang="x-default" href={`${Astro.site}${currentPath}`} />

  <!-- Open Graph -->
  <meta property="og:locale" content={lang === 'es' ? 'es_GQ' : `${lang}_GQ`} />
  <meta property="og:url" content={currentUrl} />
  <meta property="og:title" content={title} />
</head>
<body>
  <slot />
</body>
</html>
```

#### 4.2. Generar sitemap multiidioma

Instalar:
```bash
npm install @astrojs/sitemap
```

Actualizar `astro.config.mjs`:
```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.inseso.org',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-GQ',
          fr: 'fr-GQ',
          pt: 'pt-GQ',
          en: 'en'
        }
      }
    })
  ],
  // ... resto
});
```

---

## 📊 Plan de Implementación Completo

### Cronograma Estimado: 2-3 semanas

| Fase | Duración | Tareas | Responsable |
|------|----------|--------|-------------|
| **Fase 1: Setup Astro** | 2 días | Configurar i18n, crear archivos de traducción UI, actualizar componentes | Desarrollador |
| **Fase 2: Setup Strapi** | 3 días | Instalar plugin, habilitar i18n en content types, actualizar schemas | Desarrollador |
| **Fase 3: Migración Páginas** | 5 días | Crear rutas [lang], migrar 35 páginas, actualizar links | Desarrollador |
| **Fase 4: SEO** | 2 días | Hreflang, sitemap, Open Graph | Desarrollador |
| **Fase 5: Traducción Contenido** | 3 días | Traducir noticias, prestaciones, formularios en Strapi | Editor de contenido |
| **Fase 6: Testing** | 2 días | Pruebas en todos los idiomas, corrección de bugs | QA |
| **Fase 7: Deploy** | 1 día | Deploy a producción, verificación | DevOps |

**Total: 18 días hábiles (3-4 semanas)**

---

## 💰 Estimación de Costos

### Opción 1: Desarrollo Interno
- **Desarrollador Full Stack**: 18 días × $300/día = **$5,400**
- **Editor de Contenido**: 3 días × $150/día = **$450**
- **Total**: **$5,850**

### Opción 2: Agencia Externa
- **Implementación Técnica**: $8,000 - $12,000
- **Traducción Profesional**: $2,000 - $3,000 (según volumen)
- **Total**: **$10,000 - $15,000**

---

## 🎯 Alternativas Evaluadas

### ❌ Alternativa 1: Duplicar sitio completo por idioma
**Rechazada porque:**
- Mantener 4 sitios separados (multiplicar trabajo por 4)
- Sin sincronización de contenido
- SEO fragmentado
- Costos de hosting multiplicados

### ❌ Alternativa 2: Traducción del lado del cliente (Google Translate Widget)
**Rechazada porque:**
- Mala calidad de traducción
- Lento y depende de Google
- Pobre SEO (Google no indexa traducciones automáticas)
- Mala experiencia de usuario

### ⚠️ Alternativa 3: Solo traducir UI, mantener contenido en español
**Viable pero limitada:**
- Más rápida (1 semana)
- Solo traduce navegación y botones
- Contenido dinámico sigue en español
- No cumple con requerimientos multiidioma completos

---

## ✅ Recomendación Final

**Implementar: Astro i18n + Strapi i18n Plugin**

### Por qué es la mejor opción:

1. ✅ **Escalable**: Fácil agregar nuevos idiomas
2. ✅ **Mantenible**: Editores manejan traducciones desde Strapi
3. ✅ **SEO-friendly**: URLs localizadas, hreflang tags
4. ✅ **Costo-efectivo**: Inversión única, no costos recurrentes
5. ✅ **Profesional**: Experiencia nativa en cada idioma
6. ✅ **Performance**: Sin impacto en velocidad de carga

### Idiomas Recomendados (Prioridad):

1. **Español** (actual) ✅
2. **Francés** (prioritario - idioma oficial)
3. **Portugués** (medio - idioma oficial desde 2014)
4. **Inglés** (bajo - internacional, opcional)

---

## 📝 Próximos Pasos

### Inmediatos (Esta semana):
1. ✅ Aprobar estrategia con stakeholders
2. ✅ Definir idiomas definitivos (2, 3 o 4 idiomas)
3. ✅ Asignar recursos (desarrollador + editor)
4. ✅ Configurar entorno de desarrollo

### Corto plazo (Semana 1-2):
1. Implementar Fase 1 y 2 (Setup)
2. Crear páginas de prueba en FR y PT
3. Revisar con stakeholders

### Mediano plazo (Semana 3-4):
1. Completar migración de páginas
2. Traducir contenido prioritario
3. Testing exhaustivo
4. Deploy a producción

---

## 🔗 Referencias y Recursos

### Documentación Oficial:
- [Astro i18n Guide](https://docs.astro.build/en/guides/internationalization/)
- [Strapi i18n Plugin](https://docs.strapi.io/dev-docs/plugins/i18n)
- [astro-i18next](https://github.com/yassinedoghri/astro-i18next)

### Herramientas Útiles:
- **Traducción**: DeepL API (mejor que Google Translate)
- **QA**: i18n Ally (VS Code extension)
- **Testing**: Playwright con multi-locale

### Ejemplos de Implementación:
- https://github.com/withastro/astro/tree/main/examples/with-i18n
- https://github.com/strapi/strapi/tree/main/examples/i18n

---

**Documento preparado por**: OMNITECH SL
**Fecha**: Noviembre 2025
**Versión**: 1.0
