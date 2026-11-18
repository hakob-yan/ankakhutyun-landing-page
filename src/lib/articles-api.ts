/**
 * Build-time client for the Django public articles API (/api/public/articles).
 * Used only by the content collection loader (src/content.config.ts), so the API is called
 * once per build and every article page is pre-rendered to static HTML (SSG).
 */

// Django base URL, from .env / the environment at build time (server-only, never sent to the browser).
const API_URL = (import.meta.env.ARTICLES_API_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');

const PAGE_SIZE = 100; // the API's max `limit`
const CONCURRENCY = 6;

export type ApiArticle = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  content: string;
};

type ApiListItem = Omit<ApiArticle, 'content'>;
type ApiPage = { count: number; page: number; limit: number; totalPages: number; results: ApiListItem[] };

async function getJson<T>(path: string, attempt = 1): Promise<T> {
  const url = `${API_URL}${path}`;
  let res: Response;
  try {
    res = await fetch(url, { headers: { Accept: 'application/json' } });
  } catch (err) {
    throw new Error(`Articles API unreachable at ${API_URL} (set ARTICLES_API_URL). ${(err as Error).message}`);
  }
  // The public API is rate-limited per IP; wait as long as it asks and try again.
  if (res.status === 429 && attempt <= 5) {
    const wait = Number(res.headers.get('Retry-After')) || 5;
    console.warn(`[articles] rate-limited, retrying in ${wait}s…`);
    await new Promise((r) => setTimeout(r, wait * 1000));
    return getJson<T>(path, attempt + 1);
  }
  if (!res.ok) throw new Error(`Articles API ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

/** Every published article, with content. Fails the build if the API is down (better than publishing an empty blog). */
export async function fetchAllArticles(): Promise<ApiArticle[]> {
  const items: ApiListItem[] = [];
  for (let page = 1, totalPages = 1; page <= totalPages; page++) {
    const data = await getJson<ApiPage>(`/api/public/articles?page=${page}&limit=${PAGE_SIZE}`);
    items.push(...data.results);
    totalPages = data.totalPages;
  }

  const articles: ApiArticle[] = [];
  for (let i = 0; i < items.length; i += CONCURRENCY) {
    const batch = items.slice(i, i + CONCURRENCY);
    articles.push(
      ...(await Promise.all(batch.map((a) => getJson<ApiArticle>(`/api/public/articles/${encodeURIComponent(a.slug)}`)))),
    );
  }
  console.info(`[articles] loaded ${articles.length} published articles from ${API_URL}`);
  return articles;
}
