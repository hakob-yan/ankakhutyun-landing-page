import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Articles live as Markdown files in src/content/articles/<lang>/<slug>.md (lang = hy | en | ru).
 * The file name becomes the URL: /articles/<slug>, /en/articles/<slug>, /ru/articles/<slug>.
 * Keep the same file name in every language folder so the language switcher links translations together.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['history', 'education', 'culture', 'society']),
    image: z.string(),
    author: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
