import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function GenrePage({ params }: { params: { name: string } }) {
  const supabase = await createServerSupabaseClient();
  const genreName = decodeURIComponent(params.name);

  const { data: games } = await supabase
    .from("games")
    .select("id, slug, title, genre, price, is_free, image_url")
    .ilike("genre", `%${genreName}%`);

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
                  genre: game.genre,
                  price: game.is_free ? "Free" : `$${game.price}`,
                  isFree: game.is_free,
                  image: game.image_url,
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