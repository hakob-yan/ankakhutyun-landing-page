// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // TODO: set to the real domain before deploying (used for canonical/hreflang/share URLs)
  site: 'http://localhost:4321',
  output: 'static', // every page is pre-rendered to plain HTML at build time — no Node server needed
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
