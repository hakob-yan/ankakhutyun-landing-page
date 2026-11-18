/**
 * Dev only: POST /__refresh-articles reloads the articles collection from the Django API, so
 * publishing/unpublishing in the admin shows up without restarting `astro dev`.
 * Django calls it automatically (LANDING_REFRESH_HOOK_URLS). In production the site is static,
 * so Django calls the host's build hook instead and the site is rebuilt.
 *
 * If ARTICLES_REFRESH_TOKEN is set, requests must send it as X-Refresh-Token.
 */
import { loadEnv } from 'vite';

/** @returns {import('astro').AstroIntegration} */
export default function articlesRefresh() {
  return {
    name: 'articles-refresh',
    hooks: {
      'astro:server:setup': ({ server, refreshContent, logger }) => {
        const token = loadEnv('development', process.cwd(), '').ARTICLES_REFRESH_TOKEN || '';

        server.middlewares.use('/__refresh-articles', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            return res.end('POST only');
          }
          if (token && req.headers['x-refresh-token'] !== token) {
            res.statusCode = 401;
            return res.end('Bad token');
          }
          try {
            await refreshContent?.({ context: { reason: 'admin change' } });
            // Reload open pages so they show the fresh list.
            server.ws.send({ type: 'full-reload' });
            logger.info('articles refreshed from the API');
            res.statusCode = 204;
            res.end();
          } catch (err) {
            logger.error(`article refresh failed: ${/** @type {Error} */ (err).message}`);
            res.statusCode = 502;
            res.end('Refresh failed');
          }
        });
      },
    },
  };
}
