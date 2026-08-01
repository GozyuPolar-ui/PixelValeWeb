import { MetadataRoute } from "next";
import { createPublicSupabaseClient } from "@/lib/supabase-public";

const BASE_URL = "https://pixelvale.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicSupabaseClient();

  const [{ data: games }, { data: articles }, { data: helpArticles }] = await Promise.all([
    supabase.from("games").select("slug, created_at"),
    supabase.from("articles").select("id, created_at"),
    supabase.from("help_articles").select("id, created_at"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/community`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/news`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/support`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/support/store-policy`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/support/refund-policy`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/login`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const gameRoutes: MetadataRoute.Sitemap = (games ?? []).map((g) => ({
    url: `${BASE_URL}/games/${g.slug}`,
    lastModified: g.created_at ? new Date(g.created_at) : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = (articles ?? []).map((a) => ({
    url: `${BASE_URL}/news/${a.id}`,
    lastModified: a.created_at ? new Date(a.created_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const helpRoutes: MetadataRoute.Sitemap = (helpArticles ?? []).map((h) => ({
    url: `${BASE_URL}/support/articles/${h.id}`,
    lastModified: h.created_at ? new Date(h.created_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...gameRoutes, ...articleRoutes, ...helpRoutes];
}