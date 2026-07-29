import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import ThreadDetail from "@/components/community/ThreadDetail";

export default async function ThreadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServerSupabaseClient();

  const { data: thread } = await supabase
    .from("community_threads")
    .select("*, author:profiles(username, avatar_url)")
    .eq("id", params.id)
    .single();

  if (!thread) {
    notFound();
  }

  const { data: replies } = await supabase
    .from("community_replies")
    .select("*, author:profiles(username, avatar_url)")
    .eq("thread_id", params.id)
    .order("created_at", { ascending: true });

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  let initialLiked = false;
  if (currentUser) {
    const { data: likeRow } = await supabase
      .from("community_thread_likes")
      .select("thread_id")
      .eq("thread_id", params.id)
      .eq("user_id", currentUser.id)
      .maybeSingle();
    initialLiked = !!likeRow;
  }

  return (
    <>
      <Navbar active="Community" />
      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <ThreadDetail
          thread={thread as any}
          replies={(replies as any[]) ?? []}
          initialLiked={initialLiked}
          isLoggedIn={!!currentUser}
        />
      </main>
      <Footer />
    </>
  );
}