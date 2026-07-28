import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default async function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServerSupabaseClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar active="News" />
      <main className="max-w-3xl mx-auto px-6 md:px-0 pt-32 pb-24">
        <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold tracking-widest uppercase mb-4 rounded">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-display text-ink-rich mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-xs text-ink-muted mb-8">
          {new Date(article.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        {article.image_url && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-10 border border-outline-variant">
            <Image src={article.image_url} alt={article.title} fill className="object-cover" />
          </div>
        )}

        <div className="prose prose-neutral max-w-none prose-headings:font-display prose-img:rounded-xl prose-img:border prose-img:border-outline-variant">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </main>
      <Footer />
    </>
  );
}