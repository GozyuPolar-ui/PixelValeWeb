import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsContent from "@/components/news/NewsContent";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function NewsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, excerpt, category, image_url, created_at")
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar active="News" />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-24">
        <NewsContent articles={articles || []} />
      </main>
      <Footer />
    </>
  );
}