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
import { createPublicSupabaseClient } from "@/lib/supabase-public";
import { GameDetailData, GameSummary } from "@/lib/types";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createPublicSupabaseClient();
  const { data: game } = await supabase
    .from("games")
    .select("title, description, image_url, genre")
    .ilike("slug", params.slug)
    .single();

  if (!game) {
    return { title: "Game not found" };
  }

  const description = game.description
    ? String(game.description).split(/\n/)[0].trim().slice(0, 160)
    : `Play ${game.title} on Pixelvale Store`;

  return {
    title: game.title,
    description,
    openGraph: {
      title: game.title,
      description,
      images: game.image_url ? [{ url: game.image_url }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: game.title,
      description,
      images: game.image_url ? [game.image_url] : [],
    },
  };
}
// Data publik (game info, reviews+profiles, related games) — sama buat semua orang, di-cache 60 detik
const getPublicGameData = unstable_cache(
  async (slug: string) => {
    const supabase = createPublicSupabaseClient();

    const { data: game } = await supabase
      .from("games")
      .select("*")
      .ilike("slug", slug)
      .single();

    if (!game) return { game: null, reviewsWithProfiles: [], relatedRaw: [] };

    const [{ data: reviews }, { data: relatedRaw }] = await Promise.all([
      supabase
        .from("reviews")
        .select("id, rating, review_text, user_id")
        .eq("game_id", game.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("games")
        .select("id, slug, title, genre, price, is_free, image_url")
        .neq("id", game.id)
        .limit(4),
    ]);

    let reviewsWithProfiles: any[] = [];
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

    return { game, reviewsWithProfiles, relatedRaw: relatedRaw || [] };
  },
  ["game-detail"],
  { revalidate: 60 }
);

export default async function GameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createServerSupabaseClient();

  const [{ game, reviewsWithProfiles, relatedRaw }, { data: { user: currentUser } }] =
    await Promise.all([getPublicGameData(params.slug), supabase.auth.getUser()]);

  if (!game) {
    notFound();
  }

  // Owned check — personal per user, nggak di-cache
  let ownedIds = new Set<string>();
  if (currentUser) {
    const { data: libraryRows } = await supabase
      .from("user_library")
      .select("game_id")
      .eq("user_id", currentUser.id);
    ownedIds = new Set((libraryRows ?? []).map((r) => r.game_id));
  }

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
    price: game.is_free ? 0 : Number(game.price ?? 0),
    isFree: !!game.is_free,
    owned: ownedIds.has(game.id),
    heroImage: game.image_url ?? gallery[0]?.image ?? "",
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
    requirements: game.requirements ?? {},
  };

  const relatedGames: GameSummary[] = relatedRaw.map((g: any) => ({
    id: g.id,
    slug: g.slug,
    title: g.title,
    genre: g.genre ?? "",
    price: g.is_free ? 0 : Number(g.price ?? 0),
    isFree: !!g.is_free,
    image: g.image_url ?? "",
    rating: 0,
    reviewCount: 0,
    tagline: "",
    owned: ownedIds.has(g.id),
  }));

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
        <RelatedGames games={relatedGames} />
      </main>
      <Footer />
    </>
  );
}