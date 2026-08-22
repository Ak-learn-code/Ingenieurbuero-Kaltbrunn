import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
