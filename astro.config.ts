import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ak-learn-code.github.io',
  base: '/Ingenieurbuero-Kaltbrunn',
  devToolbar: {
    enabled: false,
  },
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
