import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsHero from "@/components/NewsHero";
import FeaturedArticle from "@/components/FeaturedArticle";
import NewsCard from "@/components/NewsCard";
import NewsSidebar from "@/components/NewsSidebar";
import { newsArticles } from "@/lib/data";

export default function NewsPage() {
  return (
    <>
      <Navbar active="News" />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-24">
        <NewsHero />
        <FeaturedArticle />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsArticles.map((article, i) => (
                <NewsCard key={article.id} index={i} {...article} />
              ))}
            </div>
            <div className="mt-16 text-center">
              <button className="px-12 py-4 bg-surface-container hover:bg-surface-container-high border-2 border-surface-variant text-ink-rich font-bold rounded-lg transition-all inline-flex items-center gap-2">
                Load More Stories <ChevronDown size={18} />
              </button>
            </div>
          </div>
          <NewsSidebar />
        </div>
      </main>
      <Footer />
    </>
  );
}