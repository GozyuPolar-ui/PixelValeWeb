import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityHeader from "@/components/community/CommunityHeader";
import StatsBar from "@/components/community/StatsBar";
import CommunityTabs from "@/components/community/CommunityTabs";
import CommunityFeed from "@/components/community/CommunityFeed";
import TopContributors from "@/components/community/TopContributors";
import ValeWisdom from "@/components/community/ValeWisdom";
import SocialLinks from "@/components/community/SocialLinks";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Thread } from "@/components/community/ThreadCard";

export default async function CommunityPage() {
  const supabase = await createServerSupabaseClient();

  const { data: rows } = await supabase
    .from("community_threads")
    .select("*, author:profiles(username, avatar_url)")
    .order("created_at", { ascending: false });

  const threads: Thread[] = (rows as any[]) ?? [];
  const pinnedThreads = threads.filter((t) => t.pinned);
  const regularThreads = threads.filter((t) => !t.pinned);

  return (
    <>
      <Navbar active="Community" />
      <main className="pt-32 pb-16 max-w-container-max mx-auto px-6 md:px-16">
        <CommunityHeader />
        <StatsBar />
        <CommunityTabs />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            <CommunityFeed pinnedThreads={pinnedThreads} regularThreads={regularThreads} />
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              <TopContributors />
              <ValeWisdom />
              <SocialLinks />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}