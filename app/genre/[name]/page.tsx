import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createPublicSupabaseClient } from "@/lib/supabase-public";
import { unstable_cache } from "next/cache";

const getGamesByGenre = unstable_cache(
  async (genreName: string) => {
    const supabase = createPublicSupabaseClient();
    const { data: games } = await supabase
      .from("games")
      .select("id, slug, title, genre, price, is_free, image_url")
      .ilike("genre", `%${genreName}%`);
    return games;
  },
  ["games-by-genre"],
  { revalidate: 60 }
);

export default async function GenrePage({ params }: { params: { name: string } }) {
  const supabase = await createServerSupabaseClient();
  const genreName = decodeURIComponent(params.name);

  const [games, { data: { user } }] = await Promise.all([
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

  return (
    <>
      <Navbar />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-24">
        <h1 className="text-3xl font-display text-ink-rich mb-2">{genreName}</h1>
        <p className="text-ink-muted mb-12">
          {games?.length || 0} game{games?.length === 1 ? "" : "s"} found
        </p>

        {!games || games.length === 0 ? (
          <p className="text-ink-muted">Belum ada game di genre ini.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {games.map((game, i) => (
              <GameCard
                key={game.id}
                game={{
                  id: game.id,
                  slug: game.slug,
                  title: game.title,
                  genre: game.genre ?? "",
                  price: game.is_free ? 0 : Number(game.price ?? 0),
                  isFree: !!game.is_free,
                  image: game.image_url ?? "",
                  rating: 0,
                  reviewCount: 0,
                  tagline: "",
                  owned: ownedIds.has(game.id),
                }}
                index={i}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}