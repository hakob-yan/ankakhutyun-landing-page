// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // TODO: set to the real domain before deploying (used for canonical/hreflang/share URLs)
  site: 'http://localhost:4321',
  // Every page is rendered by the Node server on each request (pages and the footer show articles from
  // the Django API), so publishing/unpublishing in the admin shows up on the next page load.
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  env: {
    schema: {
      // Django base URL. Read at runtime (server only, never sent to the browser).
      ARTICLES_API_URL: envField.string({ context: 'server', access: 'secret', default: 'http://127.0.0.1:8000' }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
