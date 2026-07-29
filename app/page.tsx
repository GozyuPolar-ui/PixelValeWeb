import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewReleases from "@/components/NewReleases";
import GenreGrid from "@/components/GenreGrid";
import CommunityFavorites from "@/components/CommunityFavorites";
import PlatformNews from "@/components/PlatformNews";
import Footer from "@/components/Footer";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { GameSummary } from "@/lib/types";

export default async function Home() {
  const supabase = await createServerSupabaseClient();

const { data: rows } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let ownedIds = new Set<string>();
  if (user) {
    const { data: libraryRows } = await supabase
      .from("user_library")
      .select("game_id")
      .eq("user_id", user.id);
    ownedIds = new Set((libraryRows ?? []).map((r) => r.game_id));
  }

  const games: GameSummary[] = (rows ?? []).map((g) => ({
    id: g.id,
    slug: g.slug,
    title: g.title,
    genre: g.genre ?? "",
    price: g.is_free ? 0 : Number(g.price ?? 0),
    isFree: g.is_free ?? false,
    image: g.image_url || "",
    rating: g.rating ?? 0,
    reviewCount: g.review_count ?? 0,
    tagline: g.description ? String(g.description).split(/\n/)[0].trim() : "",
    owned: ownedIds.has(g.id),
  }));

  const { data: articleRows } = await supabase
    .from("articles")
    .select("id, title, excerpt, category, image_url, created_at")
    .order("created_at", { ascending: false })
    .limit(2);

  return (
    <>
      <Navbar />
      <Hero games={games} />
      <main className="py-12 space-y-24">
        <NewReleases games={games} />
        <GenreGrid />
        <CommunityFavorites games={games} />
      </main>
      <PlatformNews articles={articleRows || []} />
      <Footer />
    </>
  );
}