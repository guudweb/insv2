import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server', // SSR por defecto (en Astro 5, 'hybrid' se cambió a 'server')
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
