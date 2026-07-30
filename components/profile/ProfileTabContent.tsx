"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ProfileTabs from "./ProfileTabs";

const TabSkeleton = () => (
  <div className="py-12 flex justify-center">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const RecentlyPlayedProfile = dynamic(() => import("./RecentlyPlayedProfile"), {
  loading: TabSkeleton,
});
const LibraryTab = dynamic(() => import("./LibraryTab"), { loading: TabSkeleton });
const WishlistTab = dynamic(() => import("./WishlistTab"), { loading: TabSkeleton });
const ReviewsTab = dynamic(() => import("./ReviewsTab"), { loading: TabSkeleton });
const AchievementsList = dynamic(() => import("./AchievementsList"), {
  loading: TabSkeleton,
});

type LibraryGame = { id: string; hours_played: number; games: { title: string; genre: string; image_url: string } };
type WishlistGame = { id: string; game_id: string; games: { title: string; genre: string; price: number; is_free: boolean; image_url: string } };
type ReviewItem = { id: string; rating: number; review_text: string; created_at: string; games: { title: string; image_url: string } };
type Achievement = { id: string; title: string; description: string; icon_name: string; category: string; threshold: number };

type Props = {
  libraryGames: LibraryGame[];
  wishlistGames: WishlistGame[];
  reviews: ReviewItem[];
  achievements: Achievement[];
  friendCount: number;
  memberDays: number;
};

export default function ProfileTabContent({
  libraryGames,
  wishlistGames,
  reviews,
  achievements,
  friendCount,
  memberDays,
}: Props) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      <ProfileTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === "Overview" && <RecentlyPlayedProfile games={libraryGames} />}
      {activeTab === "Library" && <LibraryTab games={libraryGames} />}
      {activeTab === "Wishlist" && <WishlistTab games={wishlistGames} />}
      {activeTab === "Reviews" && <ReviewsTab reviews={reviews} />}
      {activeTab === "Achievements" && (
        <AchievementsList
          achievements={achievements}
          libraryCount={libraryGames.length}
          wishlistCount={wishlistGames.length}
          reviewCount={reviews.length}
          friendCount={friendCount}
          memberDays={memberDays}
        />
      )}
    </>
  );
}