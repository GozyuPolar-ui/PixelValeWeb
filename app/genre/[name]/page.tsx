import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreBrowser from "@/components/StoreBrowser";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createPublicSupabaseClient } from "@/lib/supabase-public";
import { unstable_cache } from "next/cache";
import type { Metadata } from "next";
import { GameSummary } from "@/lib/types";

const getGamesByGenre = unstable_cache(
  async (genreName: string) => {
    const supabase = createPublicSupabaseClient();
    const { data: games } = await supabase
      .from("games")
      .select("id, slug, title, genre, price, is_free, image_url, rating, review_count, description, created_at")
      .ilike("genre", `%${genreName}%`)
      .order("created_at", { ascending: false });
    return games;
  },
  ["games-by-genre"],
  { revalidate: 60 }
);

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const genreName = decodeURIComponent(params.name);
  return {
    title: `${genreName} Games`,
    description: `Browse ${genreName} games on Pixelvale Store.`,
  };
}

export default async function GenrePage({ params }: { params: { name: string } }) {
  const supabase = await createServerSupabaseClient();
  const genreName = decodeURIComponent(params.name);

  const [rawGames, { data: { user } }] = await Promise.all([
    getGamesByGenre(genreName),
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
      <Navbar />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-24">
        <StoreBrowser games={games} title={genreName} />
      </main>
      <Footer />
    </>
  );
}