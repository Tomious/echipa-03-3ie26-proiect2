// Strapi v5 service layer
const STRAPI_URL =
  (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, "") ||
  "";

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface Author {
  id: number;
  documentId?: string;
  name: string;
  email?: string;
  avatar?: StrapiImage | null;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
  articles?: Article[];
  publishedAt?: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  slug?: string;
  content?: unknown;
  cover?: StrapiImage | null;
  author?: Author | null;
  category?: Category | null;
  publishedAt?: string;
  createdAt?: string;
  blocks?: Array<Record<string, unknown>>;
}

export interface AboutPage {
  id: number;
  documentId: string;
  title: string;
  blocks?: Array<Record<string, unknown>>;
  cover?: StrapiImage | null;
  content?: unknown;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta?: StrapiMeta;
}

export function strapiImage(img?: StrapiImage | null): string | null {
  if (!img?.url) return null;
  const url = img.formats?.medium?.url || img.formats?.large?.url || img.url;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

async function request<T>(path: string, params?: Record<string, string | number>): Promise<T> {
  if (!STRAPI_URL) throw new Error("VITE_STRAPI_URL is not set");
  const url = new URL(`${STRAPI_URL}/api${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }
  if (!url.searchParams.has("populate")) url.searchParams.set("populate", "*");
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${res.statusText}`);
  return (await res.json()) as T;
}

export const strapi = {
  async getArticles(opts: { page?: number; pageSize?: number; search?: string; categorySlug?: string } = {}) {
    const params: Record<string, string | number> = {
      "pagination[page]": opts.page ?? 1,
      "pagination[pageSize]": opts.pageSize ?? 9,
      "sort[0]": "publishedAt:desc",
      "populate": "*",
    };
    if (opts.search) params["filters[$or][0][title][$containsi]"] = opts.search;
    if (opts.search) params["filters[$or][1][description][$containsi]"] = opts.search;
    if (opts.categorySlug) params["filters[category][slug][$eq]"] = opts.categorySlug;
    return request<StrapiResponse<Article[]>>("/articles", params);
  },
  async getArticle(slugOrId: string) {
    // try by slug first
    const bySlug = await request<StrapiResponse<Article[]>>("/articles", {
      "filters[slug][$eq]": slugOrId,
      populate: "*",
    });
    if (bySlug.data?.length) return bySlug.data[0];
    // fallback by documentId
    const byId = await request<StrapiResponse<Article>>(`/articles/${slugOrId}`);
    return byId.data;
  },
  async getCategories(opts: { search?: string } = {}) {
    const params: Record<string, string | number> = { populate: "*", "sort[0]": "name:asc" };
    if (opts.search) params["filters[name][$containsi]"] = opts.search;
    return request<StrapiResponse<Category[]>>("/categories", params);
  },
  async getCategory(slug: string) {
    const res = await request<StrapiResponse<Category[]>>("/categories", {
      "filters[slug][$eq]": slug,
      "populate[articles][populate]": "*",
    });
    return res.data?.[0];
  },
  async getAbout() {
    return request<StrapiResponse<AboutPage>>("/about", { "populate": "*" });
  },
};
