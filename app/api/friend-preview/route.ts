import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: libraryGames } = await supabase
    .from("user_library")
    .select("id, hours_played, games(title, image_url)")
    .eq("user_id", profile.id)
    .order("hours_played", { ascending: false })
    .limit(3);

  const { data: achievements } = await supabase.from("achievements").select("*");

  const { count: libraryCount } = await supabase
    .from("user_library")
    .select("*", { count: "exact", head: true })
    .eq("user_id", profile.id);

  const { count: wishlistCount } = await supabase
    .from("user_wishlist")
    .select("*", { count: "exact", head: true })
    .eq("user_id", profile.id);

  const { count: reviewCount } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("user_id", profile.id);

  const { count: friendCount } = await supabase
    .from("friendships")
    .select("*", { count: "exact", head: true })
    .or(`requester_id.eq.${profile.id},addressee_id.eq.${profile.id}`)
    .eq("status", "accepted");

  const memberDays = Math.floor(
    (Date.now() - new Date(profile.created_at || Date.now()).getTime()) / (1000 * 60 * 60 * 24)
  );

  const getProgress = (category: string) => {
    switch (category) {
      case "library": return libraryCount || 0;
      case "wishlist": return wishlistCount || 0;
      case "reviews": return reviewCount || 0;
      case "friends": return friendCount || 0;
      case "membership": return memberDays;
      default: return 0;
    }
  };

  const unlocked = (achievements || []).filter((a) => getProgress(a.category) >= a.threshold);
  const latestAchievement = unlocked[unlocked.length - 1] || null;

  return NextResponse.json({
    username: profile.username,
    avatarUrl: profile.avatar_url,
    bannerUrl: profile.banner_url,
    bio: profile.bio,
    libraryGames: libraryGames || [],
    latestAchievement,
  });
}