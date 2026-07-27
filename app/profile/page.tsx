import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabContent from "@/components/profile/ProfileTabContent";
import AchievementsGrid from "@/components/profile/AchievementsGrid";
import FriendsSection from "@/components/profile/FriendsSection";
import FavoriteGenreCard from "@/components/profile/FavoriteGenreCard";
import PromoCard from "@/components/profile/PromoCard";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [
    { data: profile },
    { data: libraryGames },
    { data: wishlistGames },
    { data: reviews },
    { data: achievements },
    { data: friendshipsRaw },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("user_library")
      .select("id, hours_played, games(title, genre, image_url)")
      .eq("user_id", user.id),
    supabase
      .from("user_wishlist")
      .select("id, game_id, games(title, genre, price, is_free, image_url)")
      .eq("user_id", user.id),
    supabase
      .from("reviews")
      .select("id, rating, review_text, created_at, games(title, image_url)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase.from("achievements").select("*"),
    supabase
      .from("friendships")
      .select("id, status, requester_id, addressee_id")
      .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`),
  ]);

  const memberDays = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );

  const otherUserIds =
    friendshipsRaw?.map((f) => (f.requester_id === user.id ? f.addressee_id : f.requester_id)) || [];

  const { data: otherProfiles } = otherUserIds.length
    ? await supabase.from("profiles").select("id, username, avatar_url").in("id", otherUserIds)
    : { data: [] };

  const profileMap = new Map((otherProfiles || []).map((p) => [p.id, p]));

  const friends = (friendshipsRaw || [])
    .filter((f) => f.status === "accepted")
    .map((f) => {
      const otherId = f.requester_id === user.id ? f.addressee_id : f.requester_id;
      const p = profileMap.get(otherId);
      return {
        friendshipId: f.id,
        userId: otherId,
        username: p?.username || "Unknown",
        avatarUrl: p?.avatar_url || "",
      };
    });

  const pendingRequests = (friendshipsRaw || [])
    .filter((f) => f.status === "pending" && f.addressee_id === user.id)
    .map((f) => {
      const p = profileMap.get(f.requester_id);
      return {
        friendshipId: f.id,
        userId: f.requester_id,
        username: p?.username || "Unknown",
        avatarUrl: p?.avatar_url || "",
      };
    });

  const username = profile?.username || user.user_metadata?.full_name || user.email?.split("@")[0] || "Traveler";
  const avatar = profile?.avatar_url || user.user_metadata?.avatar_url || "/default-avatar.png";
  const banner =
    profile?.banner_url || "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1400&h=400&fit=crop";
  const bio = profile?.bio || "";
  const favoriteGenre = profile?.favorite_genre || "Not set";
  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <Navbar showLauncher={false} />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-24 pb-8">
        <ProfileHeader username={username} avatar={avatar} banner={banner} bio={bio} memberSince={memberSince} />
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
          <div className="md:col-span-7 space-y-16">
            <AchievementsGrid
              achievements={(achievements as any) || []}
              libraryCount={libraryGames?.length || 0}
              wishlistCount={wishlistGames?.length || 0}
              reviewCount={reviews?.length || 0}
              friendCount={friends.length}
              memberDays={memberDays}
            />
            <ProfileTabContent
              libraryGames={(libraryGames as any) || []}
              wishlistGames={(wishlistGames as any) || []}
              reviews={(reviews as any) || []}
              achievements={(achievements as any) || []}
              friendCount={friends.length}
              memberDays={memberDays}
            />
          </div>
          <div className="md:col-span-3 space-y-8">
            <FriendsSection friends={friends} pendingRequests={pendingRequests} userId={user.id} />
            <FavoriteGenreCard genre={favoriteGenre} />
            <PromoCard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}