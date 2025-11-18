import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'hybrid', // Permite mezclar páginas estáticas y dinámicas
  build: {
    assets: 'assets'
  }
});
