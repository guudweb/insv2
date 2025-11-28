import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://inseso.org',
  output: 'server', // SSR por defecto (en Astro 5, 'hybrid' se cambió a 'server')
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-GQ',
          fr: 'fr-GQ',
          en: 'en-GQ',
          pt: 'pt-GQ'
        }
      },
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/api') &&
        !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ],
  adapter: node({
    mode: 'standalone'
  }),
  // Configuración de internacionalización
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'fr', 'en', 'pt'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false
    }
  },
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      rollupOptions: {
        external: [
          'jquery',
          'ev-emitter',
          'desandro-matches-selector',
          'get-size',
          'fizzy-ui-utils',
          'outlayer',
          'masonry-layout',
          'isotope-layout/js/item',
          'isotope-layout/js/layout-mode',
          'isotope-layout/js/layout-modes/masonry',
          'isotope-layout/js/layout-modes/fit-rows',
          'isotope-layout/js/layout-modes/vertical'
        ]
      }
    }
  }
});