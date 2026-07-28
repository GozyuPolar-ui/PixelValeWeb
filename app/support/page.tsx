import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HelpCenter from "@/components/support/HelpCenter";
import ContactSection from "@/components/support/ContactSection";
import FaqAccordion from "@/components/support/FaqAccordion";
import AskAI from "@/components/support/AskAI";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function SupportPage() {
  const supabase = await createServerSupabaseClient();

  const { data: articles } = await supabase
    .from("help_articles")
    .select("id, title, summary, category, created_at")
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar active="Support" />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-16">
        <HelpCenter articles={articles ?? []} />
        <ContactSection />
        <FaqAccordion />
        <AskAI />
      </main>
      <Footer />
    </>
  );
}