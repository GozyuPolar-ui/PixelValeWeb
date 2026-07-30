import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityHeader from "@/components/community/CommunityHeader";
import StatsBar from "@/components/community/StatsBar";
import CommunityTabs from "@/components/community/CommunityTabs";
import CommunityFeed from "@/components/community/CommunityFeed";
import TopContributors, { Contributor } from "@/components/community/TopContributors";
import ValeWisdom from "@/components/community/ValeWisdom";
import SocialLinks from "@/components/community/SocialLinks";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Thread } from "@/components/community/ThreadCard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Join discussions, share wisdom, and connect with fellow explorers in the Vale.",
};

function getBadge(total: number, rank: number) {
  if (rank === 0) return { badge: "Sage", badgeColor: "bg-primary/10 text-primary", highlighted: true };
  if (total >= 10) return { badge: "Guide", badgeColor: "bg-secondary-fixed text-secondary", highlighted: false };
  if (total >= 5) return { badge: "Artist", badgeColor: "bg-surface-container-highest text-on-surface-variant", highlighted: false };
  return { badge: "Traveler", badgeColor: "bg-surface-container text-ink-muted", highlighted: false };
}

export default async function CommunityPage() {
  const supabase = await createServerSupabaseClient();

  
  // Hitung timestamp 5 menit yang lalu dari waktu server saat ini
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

  // Fetch count paralel untuk Members, Discussions, dan Online Users (last_seen >= 5 min ago)
  const [
    { count: memberCount },
    { count: discussionCount },
    { count: onlineCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("community_threads").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("last_seen", fiveMinAgo),
  ]);

  const stats = [
    {
      icon: "Users" as const,
      value: (memberCount ?? 0).toLocaleString(),
      label: "Members",
    },
    {
      icon: "MessageSquare" as const,
      value: (discussionCount ?? 0).toLocaleString(),
      label: "Discussions",
    },
    {
      icon: "Circle" as const,
      value: (onlineCount ?? 0).toLocaleString(),
      label: "Online Now",
    },
  ];

  // Fetch threads (Defensive + Error Logging)
  const { data: rows, error: threadsError } = await supabase
    .from("community_threads")
    .select(`
      id,
      title,
      content,
      tag,
      pinned,
      reply_count,
      likes_count,
      created_at,
      cover_url,
      author:profiles!community_threads_author_id_fkey (
        username,
        avatar_url
      )
    `)
    .order("created_at", { ascending: false });

  if (threadsError) {
    console.error("THREADS ERROR:", threadsError);
  }

  const threads: Thread[] = (rows as any[]) ?? [];
  console.log("THREADS COUNT:", threads.length, threads);

  const pinnedThreads = threads.filter((t) => t.pinned === true);
  const regularThreads = threads.filter((t) => t.pinned !== true);

  // --- Top Contributors ---
  const { data: profiles } = await supabase
    .from("profiles")
    .select(`
      id,
      username,
      avatar_url,
      community_threads(count),
      community_replies(count)
    `);

  const contributors: Contributor[] = ((profiles as any[]) ?? [])
    .map((p) => {
      const threadCount = p.community_threads?.[0]?.count ?? 0;
      const replyCount = p.community_replies?.[0]?.count ?? 0;
      const total = threadCount + replyCount;
      return {
        username: p.username || "Unknown",
        avatar_url: p.avatar_url,
        total,
      };
    })
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map((c, i) => ({
      ...c,
      ...getBadge(c.total, i),
    }));

  return (
    <>
      <Navbar active="Community" />
      <main className="pt-32 pb-16 max-w-container-max mx-auto px-6 md:px-16">
        <CommunityHeader />
        <StatsBar stats={stats} />
        <CommunityTabs />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            <CommunityFeed pinnedThreads={pinnedThreads} regularThreads={regularThreads} />
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              <TopContributors contributors={contributors} />
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