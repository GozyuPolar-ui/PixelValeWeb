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
import { GameDetailData } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function GameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createServerSupabaseClient();

  const { data: game } = await supabase
    .from("games")
    .select("*")
    .ilike("slug", params.slug)
    .single();

  if (!game) {
    notFound();
  }

  let reviewsWithProfiles: any[] = [];

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

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const hasReviewed = currentUser
    ? reviewsWithProfiles.some((r) => r.user_id === currentUser.id)
    : false;

  const avgRating =
    reviewsWithProfiles.length > 0
      ? reviewsWithProfiles.reduce((sum, r) => sum + (r.rating || 0), 0) /
        reviewsWithProfiles.length
      : 0;

  const galleryUrls: string[] = Array.isArray(game.gallery) ? game.gallery : [];
  const gallery = galleryUrls.map((url) => ({ type: "image" as const, image: url }));

  const descriptionParagraphs: string[] = game.description
    ? String(game.description)
        .split(/\n\s*\n/)
        .map((p: string) => p.trim())
        .filter(Boolean)
    : [];

  const gameDetail: GameDetailData = {
    id: game.id,
    title: game.title,
    tags: game.tags ?? [],
    rating: Number(avgRating.toFixed(1)),
    reviewCount: reviewsWithProfiles.length,
    price: game.price ?? "Free",
    heroImage: game.banner_image ?? game.cover_image ?? gallery[0]?.image ?? "",
    gallery,
    description: descriptionParagraphs,
    details: {
      developer: game.developer ?? "",
      publisher: game.publisher ?? "",
      releaseDate: game.release_date ?? "",
    },
    download: {
      size: game.download_size ?? "",
      version: game.download_version ?? "",
    },
    downloadLinks: {
      windows: game.download_windows ?? null,
      mac: game.download_mac ?? null,
      android: game.download_android ?? null,
    },
    requirements: {
      minimum: game.min_requirements ?? {},
      recommended: game.rec_requirements ?? {},
    },
  };

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <GameHero game={gameDetail} />
        <MediaGallery game={gameDetail} />
        <AboutDetails game={gameDetail} />
        <DownloadPanel game={gameDetail} />
        <SystemRequirements game={gameDetail} />
        <CommunityReviews gameId={game.id} reviews={reviewsWithProfiles} hasReviewed={hasReviewed} />
        <RelatedGames />
      </main>
      <Footer />
    </>
  );
}