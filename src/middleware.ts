import { defineMiddleware } from 'astro:middleware';
import { getLanguage } from '@/data/site';

export const onRequest = defineMiddleware((context, next) => {
  context.locals.language = getLanguage(context.url.pathname);
  return next();
});
