import Image from "next/image";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function RecommendedGames({
  excludeGameId,
}: {
  excludeGameId?: string;
}) {
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from("games")
    .select("id, slug, title, price, image_url")
    .eq("is_free", false)
    .order("created_at", { ascending: false })
    .limit(3);

  if (excludeGameId) {
    query = query.neq("id", excludeGameId);
  }

  const { data: games } = await query;

  if (!games || games.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-display">You might also like</h2>
        <div className="h-1 bg-surface-container-highest flex-grow ml-6" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.slug}`}>
            <div className="rounded-xl p-4 flex flex-col cursor-pointer border border-transparent hover:border-outline hover:bg-paper-dark transition-all">
              <div className="relative aspect-square bg-surface-container-highest rounded-lg overflow-hidden mb-4">
                {game.image_url && (
                  <Image src={game.image_url} alt={game.title} fill className="object-cover" />
                )}
              </div>
              <h4 className="font-display text-sm text-ink-rich">{game.title}</h4>
              <span className="text-xs text-primary mt-1 font-bold">
                Rp{Number(game.price).toLocaleString("id-ID")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}