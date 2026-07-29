import { redirect } from "next/navigation";
import Script from "next/script";
import CheckoutNav from "@/components/checkout/CheckoutNav";
import ContactSection from "@/components/checkout/ContactSection";
import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { gameId?: string };
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  if (!searchParams.gameId) {
    redirect("/");
  }

  const { data: game } = await supabase
    .from("games")
    .select("id, title, price, is_free, image_url")
    .eq("id", searchParams.gameId)
    .single();

  if (!game || game.is_free) {
    redirect("/");
  }

  const { data: existing } = await supabase
    .from("user_library")
    .select("id")
    .eq("user_id", user.id)
    .eq("game_id", game.id)
    .maybeSingle();

  if (existing) {
    redirect("/library");
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Script
        src={
          process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
            ? "https://app.midtrans.com/snap/snap.js"
            : "https://app.sandbox.midtrans.com/snap/snap.js"
        }
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
      />
      <CheckoutNav />

      <main className="flex-grow max-w-container-max mx-auto w-full px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            <ContactSection />
            <CheckoutButton gameId={game.id} />
          </div>

          <OrderSummary title={game.title} image={game.image_url || ""} price={Number(game.price)} />
        </div>
      </main>

      <footer className="bg-surface-container-low border-t-4 border-surface-container-highest w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-6 max-w-container-max mx-auto gap-6">
          <span className="text-xl font-display text-ink-rich">Pixelvale</span>
          <div className="flex gap-8 text-xs">
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
          <p className="text-ink-muted text-xs text-center md:text-right">
            © 2024 Pixelvale Indie Games. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}