import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LibraryHeader from "@/components/LibraryHeader";
import LibraryContent from "@/components/LibraryContent";
import DiscoveryPrompt from "@/components/DiscoveryPrompt";
import { createServerSupabaseClient } from "@/lib/supabase-server";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Library",
  description: "Your collection of games in the Vale.",
};
export default async function LibraryPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: libraryEntries } = await supabase
    .from("user_library")
    .select(
      "id, hours_played, acquired_at, games(id, slug, title, genre, image_url, download_windows, download_mac, download_android)"
    )
    .eq("user_id", user.id)
    .order("acquired_at", { ascending: false });

  const games = libraryEntries || [];

  return (
    <>
      <Navbar active="Library" />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-24">
        <LibraryHeader count={games.length} />
        <LibraryContent games={games} />
        <div className="mt-16 max-w-sm mx-auto">
          <DiscoveryPrompt />
        </div>
      </main>
      <Footer />
    </>
  );
}