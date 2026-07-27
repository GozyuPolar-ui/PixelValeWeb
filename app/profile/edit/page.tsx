import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EditProfileForm from "@/components/edit-profile/EditProfileForm";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function EditProfilePage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const username = profile?.username || user.user_metadata?.full_name || "";
  const bio = profile?.bio || "";
  const genre = profile?.favorite_genre || "Cozy";
  const avatar = profile?.avatar_url || user.user_metadata?.avatar_url || "";
  const banner = profile?.banner_url || "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1400&h=400&fit=crop";
  const initialPrivacy = {
    show_public_profile: profile?.show_public_profile ?? true,
    show_library: profile?.show_library ?? true,
    show_online_status: profile?.show_online_status ?? false,
  };
  const initialNotifications = {
    notify_new_releases: profile?.notify_new_releases ?? true,
    notify_sales: profile?.notify_sales ?? false,
    notify_friend_activity: profile?.notify_friend_activity ?? true,
  };

  return (
    <>
      <Navbar showLauncher={false} />
      <main className="pt-24 pb-24 px-6 md:px-16 max-w-container-max mx-auto">
        <div className="mb-12">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-ink-muted hover:text-primary transition-colors mb-4 group text-sm w-fit"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Profile
          </Link>
          <h1 className="text-3xl md:text-4xl font-display text-ink-rich">Edit Profile</h1>
        </div>

<EditProfileForm
          userId={user.id}
          initialUsername={username}
          initialBio={bio}
          initialGenre={genre}
          initialAvatar={avatar}
          initialBanner={banner}
          email={user.email || ""}
          initialPrivacy={initialPrivacy}
          initialNotifications={initialNotifications}
        />
      </main>
      <Footer />
    </>
  );
}