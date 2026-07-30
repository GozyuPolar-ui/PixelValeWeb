import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreBrowser from "@/components/StoreBrowser";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createPublicSupabaseClient } from "@/lib/supabase-public";
import { unstable_cache } from "next/cache";
import type { Metadata } from "next";
import { GameSummary } from "@/lib/types";

export const metadata: Metadata = {
  title: "All Games",
  description: "Browse all indie games on Pixelvale Store. Filter, sort, and find your next adventure.",
};

const getAllGames = unstable_cache(
  async () => {
    const supabase = createPublicSupabaseClient();
    const { data } = await supabase
      .from("games")
      .select("id, slug, title, genre, price, is_free, image_url, rating, review_count, description, created_at")
      .order("created_at", { ascending: false });
    return data;
  },
  ["all-games"],
  { revalidate: 60 }
);

export default async function StorePage() {
  const supabase = await createServerSupabaseClient();

  const [rawGames, { data: { user } }] = await Promise.all([
    getAllGames(),
    supabase.auth.getUser(),
  ]);

  let ownedIds = new Set<string>();
  if (user) {
    const { data: libraryRows } = await supabase
      .from("user_library")
      .select("game_id")
      .eq("user_id", user.id);
    ownedIds = new Set((libraryRows ?? []).map((r) => r.game_id));
  }

  const games: GameSummary[] = (rawGames ?? []).map((g) => ({
    id: g.id,
    slug: g.slug,
    title: g.title,
    genre: g.genre ?? "",
    price: g.is_free ? 0 : Number(g.price ?? 0),
    isFree: !!g.is_free,
    image: g.image_url ?? "",
    rating: g.rating ?? 0,
    reviewCount: g.review_count ?? 0,
    tagline: g.description ? String(g.description).split(/\n/)[0].trim() : "",
    owned: ownedIds.has(g.id),
  }));

  return (
    <>
      <Navbar active="Store" />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-24">
        <StoreBrowser games={games} title="All Games" />
      </main>
      <Footer />
    </>
  );
}