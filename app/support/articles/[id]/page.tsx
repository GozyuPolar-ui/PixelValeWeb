import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function HelpArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServerSupabaseClient();

  const { data: article } = await supabase
    .from("help_articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar active="Support" />
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <Link
          href="/support"
          className="flex w-fit items-center gap-2 text-sm text-ink-muted hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Help Center
        </Link>

        <span className="inline-block px-3 py-1 bg-secondary-fixed text-secondary text-[10px] font-bold tracking-widest uppercase mb-4 rounded">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-display text-ink-rich mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-xs text-ink-muted mb-10">
          Diperbarui{" "}
          {new Date(article.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <div className="prose prose-neutral max-w-none prose-headings:font-display whitespace-pre-wrap">
          {article.content}
        </div>
      </main>
      <Footer />
    </>
  );
}