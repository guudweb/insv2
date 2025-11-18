import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'hybrid', // Permite mezclar páginas estáticas y dinámicas
  adapter: node({
    mode: 'standalone'
  }),
  build: {
    assets: 'assets'
  }
});
