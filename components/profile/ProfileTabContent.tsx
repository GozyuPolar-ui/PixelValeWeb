"use client";

import { useState } from "react";
import ProfileTabs from "./ProfileTabs";
import RecentlyPlayedProfile from "./RecentlyPlayedProfile";
import LibraryTab from "./LibraryTab";
import WishlistTab from "./WishlistTab";
import ReviewsTab from "./ReviewsTab";
import AchievementsList from "./AchievementsList";

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