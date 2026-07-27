import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameHero from "@/components/GameHero";
import MediaGallery from "@/components/MediaGallery";
import AboutDetails from "@/components/AboutDetails";
import DownloadPanel from "@/components/DownloadPanel";
import SystemRequirements from "@/components/SystemRequirements";
import CommunityReviews from "@/components/CommunityReviews";
import RelatedGames from "@/components/RelatedGames";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function GameDetailPage() {
  const supabase = await createServerSupabaseClient();

  const { data: game } = await supabase
    .from("games")
    .select("id")
    .eq("title", "Pixelvale: Origins")
    .single();

  let reviewsWithProfiles: any[] = [];

  if (game) {
    const { data: reviews } = await supabase
      .from("reviews")
      .select("id, rating, review_text, user_id")
      .eq("game_id", game.id)
      .order("created_at", { ascending: false });

    if (reviews && reviews.length > 0) {
      const userIds = reviews.map((r) => r.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .in("id", userIds);

      const profileMap = new Map((profiles || []).map((p) => [p.id, p]));

      reviewsWithProfiles = reviews.map((r) => ({
        ...r,
        profiles: profileMap.get(r.user_id) || null,
      }));
    }
  }

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const hasReviewed = currentUser
    ? reviewsWithProfiles.some((r) => r.user_id === currentUser.id)
    : false;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <GameHero />
        <MediaGallery />
        <AboutDetails />
        <DownloadPanel />
        <SystemRequirements />
        <CommunityReviews gameId={game?.id || ""} reviews={reviewsWithProfiles} hasReviewed={hasReviewed} />
        <RelatedGames />
      </main>
      <Footer />
    </>
  );
}