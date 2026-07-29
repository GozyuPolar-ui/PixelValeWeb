import { redirect } from "next/navigation";
import ConfirmationNav from "@/components/confirmation/ConfirmationNav";
import SuccessHeader from "@/components/confirmation/SuccessHeader";
import OrderCard from "@/components/confirmation/OrderCard";
import NextSteps from "@/components/confirmation/NextSteps";
import RecommendedGames from "@/components/confirmation/RecommendedGames";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: { order_id?: string };
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  if (!searchParams.order_id) {
    redirect("/library");
  }

  const { data: order } = await supabase
    .from("orders")
    .select(
      `
      order_id,
      amount,
      status,
      created_at,
      games ( id, title, image_url )
    `
    )
    .eq("order_id", searchParams.order_id)
    .eq("user_id", user.id)
    .single();

  if (!order) {
    redirect("/library");
  }

  const game = Array.isArray(order.games) ? order.games[0] : order.games;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <ConfirmationNav />

      <main className="flex-grow pt-12 pb-24 px-6 md:px-16 max-w-container-max mx-auto w-full">
        <SuccessHeader status={order.status} />
        <OrderCard
          gameTitle={game?.title || "Game"}
          platform="PC / Mac"
          orderNumber={order.order_id}
          date={new Date(order.created_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          price={order.amount}
          image={game?.image_url || ""}
          status={order.status}
        />
<NextSteps />
<RecommendedGames excludeGameId={game?.id} />
      </main>

      <footer className="bg-surface-container-low border-t-4 border-surface-container-highest mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-6 max-w-container-max mx-auto w-full gap-4">
          <p className="text-xs text-ink-muted">
            © 2024 Pixelvale Indie Games. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="text-ink-muted hover:text-secondary underline transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-ink-muted hover:text-secondary underline transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-ink-muted hover:text-secondary underline transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}