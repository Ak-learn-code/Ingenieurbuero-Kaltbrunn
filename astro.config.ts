import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL || 'https://ak-learn-code.github.io';
const base = process.env.BASE_PATH || '/Ingenieurbuero-Kaltbrunn';

export default defineConfig({
  site,
  base,
  devToolbar: {
    enabled: false,
  },
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
