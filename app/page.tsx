import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewReleases from "@/components/NewReleases";
import GenreGrid from "@/components/GenreGrid";
import CommunityFavorites from "@/components/CommunityFavorites";
import PlatformNews from "@/components/PlatformNews";
import Footer from "@/components/Footer";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createPublicSupabaseClient } from "@/lib/supabase-public";
import { GameSummary } from "@/lib/types";
import { unstable_cache } from "next/cache";

const getPublicHomeData = unstable_cache(
  async () => {
    const supabase = createPublicSupabaseClient();
    const [{ data: rows }, { data: articleRows }] = await Promise.all([
      supabase.from("games").select("*").order("created_at", { ascending: false }),
      supabase
        .from("articles")
        .select("id, title, excerpt, category, image_url, created_at")
        .order("created_at", { ascending: false })
        .limit(2),
    ]);
    return { rows, articleRows };
  },
  ["home-public-data"],
  { revalidate: 60 } // cache 60 detik — cukup fresh, tapi ngirit query berulang
);

export default async function Home() {
  const supabase = await createServerSupabaseClient();

  // Data publik (sama buat semua orang) diambil dari cache 60 detik
  const [{ rows, articleRows }, { data: { user } }] = await Promise.all([
    getPublicHomeData(),
    supabase.auth.getUser(),
  ]);

  // Step 2: owned check baru bisa jalan setelah tau user-nya siapa
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