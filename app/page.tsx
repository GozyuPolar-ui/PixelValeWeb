import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewReleases from "@/components/NewReleases";
import GenreGrid from "@/components/GenreGrid";
import CommunityFavorites from "@/components/CommunityFavorites";
import PlatformNews from "@/components/PlatformNews";
import Footer from "@/components/Footer";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { GameSummary } from "@/lib/types";

function formatPrice(price: number | null, isFree: boolean) {
  if (isFree || !price) return "Free";
  return `$${Number(price).toFixed(2)}`;
}

export default async function Home() {
  const supabase = await createServerSupabaseClient();

  const { data: rows } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });

const games: GameSummary[] = (rows ?? []).map((g) => ({
    id: g.id,
    slug: g.slug,
    title: g.title,
    genre: g.genre ?? "",
    price: formatPrice(g.price, g.is_free),
    isFree: g.is_free ?? false,
    image: g.image_url || "",
    rating: g.rating ?? 0,
    reviewCount: g.review_count ?? 0,
    tagline: g.description
      ? String(g.description).split(/\n/)[0].trim()
      : "",
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
      <PlatformNews />
      <Footer />
    </>
  );
}