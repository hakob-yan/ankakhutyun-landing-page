import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { fetchAllArticles } from '@/lib/articles-api';

/**
 * Articles come from the admin panel's Django API (published only), fetched once at build time.
 * Every list and article page is pre-rendered (SSG), so publishing a new article needs a rebuild.
 * Articles are written in Armenian; the id is the article's slug.
 */
const articles = defineCollection({
  loader: async () =>
    (await fetchAllArticles()).map(({ slug, ...rest }) => ({ id: slug, ...rest })),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    content: z.string(), // sanitized HTML from the admin editor
    coverImage: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});

export const collections = { articles };
