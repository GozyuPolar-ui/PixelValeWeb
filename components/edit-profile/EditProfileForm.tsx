"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import AvatarBannerCard from "./AvatarBannerCard";
import BasicInfoSection from "./BasicInfoSection";
import AccountSection from "./AccountSection";
import PrivacySection from "./PrivacySection";
import NotificationsSection from "./NotificationsSection";
import FormActions from "./FormActions";

type Props = {
  userId: string;
  initialUsername: string;
  initialBio: string;
  initialGenre: string;
  initialAvatar: string;
  initialBanner: string;
  email: string;
  initialPrivacy: {
    show_public_profile: boolean;
    show_library: boolean;
    show_online_status: boolean;
  };
  initialNotifications: {
    notify_new_releases: boolean;
    notify_sales: boolean;
    notify_friend_activity: boolean;
  };
};

export default function EditProfileForm({
  userId,
  initialUsername,
  initialBio,
  initialGenre,
  initialAvatar,
  initialBanner,
  email,
  initialPrivacy,
  initialNotifications,
}: Props) {
  const [username, setUsername] = useState(initialUsername);
  const [bio, setBio] = useState(initialBio);
  const [genre, setGenre] = useState(initialGenre);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar);
  const [bannerUrl, setBannerUrl] = useState(initialBanner);
  const [settings, setSettings] = useState({ ...initialPrivacy, ...initialNotifications });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const supabase = createClient();
  const router = useRouter();

  const handleSettingChange = (field: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setStatus("saving");
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      username,
      bio,
      favorite_genre: genre,
      avatar_url: avatarUrl,
      banner_url: bannerUrl,
      ...settings,
    });

    if (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-8 items-start">
      <AvatarBannerCard
        userId={userId}
        avatarUrl={avatarUrl}
        bannerUrl={bannerUrl}
        onAvatarChange={setAvatarUrl}
        onBannerChange={setBannerUrl}
      />
      <div className="space-y-8">
        <BasicInfoSection
          username={username}
          bio={bio}
          genre={genre}
          onUsernameChange={setUsername}
          onBioChange={setBio}
          onGenreChange={setGenre}
        />
        <AccountSection email={email} />
        <PrivacySection
          showPublicProfile={settings.show_public_profile}
          showLibrary={settings.show_library}
          showOnlineStatus={settings.show_online_status}
          onChange={handleSettingChange}
        />
        <NotificationsSection
          notifyNewReleases={settings.notify_new_releases}
          notifySales={settings.notify_sales}
          notifyFriendActivity={settings.notify_friend_activity}
          onChange={handleSettingChange}
        />
        <FormActions onSave={handleSave} status={status} />
      </div>
    </div>
  );
}