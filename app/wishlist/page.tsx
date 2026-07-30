import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import EmptyState from "@/components/EmptyState";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { GameSummary } from "@/lib/types";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Games you've saved for later on Pixelvale Store.",
};

export default async function WishlistPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: rows } = await supabase
    .from("user_wishlist")
    .select(
      "id, created_at, games(id, slug, title, genre, price, is_free, image_url, rating, review_count, description)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Cek owned juga biar badge "Owned" muncul
  const { data: libraryRows } = await supabase
    .from("user_library")
    .select("game_id")
    .eq("user_id", user.id);
  const ownedIds = new Set((libraryRows ?? []).map((r) => r.game_id));

  const games: GameSummary[] = (rows ?? [])
    .map((row: any) => {
      const g = row.games;
      if (!g) return null;
      return {
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
      };
    })
    .filter(Boolean) as GameSummary[];

  return (
    <>
      <Navbar active="Wishlist" />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-24">
        <header className="mb-12">
          <h1 className="text-4xl font-display text-primary mb-2">Wishlist</h1>
          <p className="text-lg text-ink-muted">
            {games.length} {games.length === 1 ? "game" : "games"} saved for later
          </p>
        </header>

        {games.length === 0 ? (
          <EmptyState
            icon="heart"
            title="Your wishlist is still empty."
            description="Save the games that interest you so they're easy to find later."
            actionLabel="Explore the Store"
            actionHref="/"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {games.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}