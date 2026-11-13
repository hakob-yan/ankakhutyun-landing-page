import { getCollection, type CollectionEntry } from 'astro:content';
import { categoryLabel } from '@/data/site';

export type Article = CollectionEntry<'articles'>;

/** All published articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const dateFmt = new Intl.DateTimeFormat('hy-AM', { day: 'numeric', month: 'long', year: 'numeric' });
export const formatDate = (d: Date) => dateFmt.format(d);

export const articleUrl = (a: Article) => `/articles/${a.id}`;

/** Plain object shape used by React islands (e.g. the carousel). */
export const toCard = (a: Article) => ({
  href: articleUrl(a),
  title: a.data.title,
  date: formatDate(a.data.date),
  category: categoryLabel(a.data.category),
  image: a.data.image,
});

/** Rough reading time for Armenian/Latin text (~200 words per minute). */
export const readingMinutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 200));
