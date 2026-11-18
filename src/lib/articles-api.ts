/**
 * Server-side client for the Django public articles API (/api/public/articles).
 * Called on every request (all pages are server-rendered), so publishing or unpublishing in the
 * admin shows up on the next page load. Only published articles are returned; drafts are 404.
 */

import { ARTICLES_API_URL } from 'astro:env/server';

const API_URL = ARTICLES_API_URL.replace(/\/+$/, '');

const MAX_LIMIT = 100; // the API's max `limit`

export type ApiArticle = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  content?: string; // detail endpoint only
};

export type ApiPage = { count: number; page: number; limit: number; totalPages: number; results: ApiArticle[] };

/** GET a JSON path; returns null for 404, throws for any other failure. */
async function getJson<T>(path: string): Promise<T | null> {
  const url = `${API_URL}${path}`;
  let res: Response;
  try {
    res = await fetch(url, { headers: { Accept: 'application/json' } });
  } catch (err) {
    throw new Error(`Articles API unreachable at ${API_URL} (set ARTICLES_API_URL). ${(err as Error).message}`);
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Articles API ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

/** One page of published articles (no content), newest first. null if the page is past the end. */
export const fetchArticlePage = (page: number, limit: number) =>
  getJson<ApiPage>(`/api/public/articles?page=${page}&limit=${Math.min(limit, MAX_LIMIT)}`);

/** Every published article (no content), newest first. */
export async function fetchAllArticles(): Promise<ApiArticle[]> {
  const items: ApiArticle[] = [];
  for (let page = 1, totalPages = 1; page <= totalPages; page++) {
    const data = await fetchArticlePage(page, MAX_LIMIT);
    if (!data) break;
    items.push(...data.results);
    totalPages = data.totalPages;
  }
  return items;
}

/** One published article with content, or null if it doesn't exist or is a draft. */
export const fetchArticle = (slug: string) => getJson<ApiArticle>(`/api/public/articles/${encodeURIComponent(slug)}`);
