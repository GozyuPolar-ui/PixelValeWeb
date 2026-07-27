import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityHeader from "@/components/community/CommunityHeader";
import StatsBar from "@/components/community/StatsBar";
import CommunityTabs from "@/components/community/CommunityTabs";
import ThreadCard from "@/components/community/ThreadCard";
import TopContributors from "@/components/community/TopContributors";
import ValeWisdom from "@/components/community/ValeWisdom";
import SocialLinks from "@/components/community/SocialLinks";
import { pinnedThreads, regularThreads } from "@/lib/data";

export default function CommunityPage() {
  return (
    <>
      <Navbar active="Community" />
      <main className="pt-32 pb-16 max-w-container-max mx-auto px-6 md:px-16">
        <CommunityHeader />
        <StatsBar />
        <CommunityTabs />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            {pinnedThreads.map((thread, i) => (
              <ThreadCard
                key={thread.id}
                index={i}
                pinned
                avatar={thread.avatar}
                tagLabel={thread.tagLabel}
                title={thread.title}
                excerpt={thread.excerpt}
                replies={thread.replies}
                likes={thread.likes}
                lastActive={thread.lastActive}
              />
            ))}

            <div className="h-1 bg-surface-variant opacity-50 my-8" />

            {regularThreads.map((thread, i) => (
              <ThreadCard
                key={thread.id}
                index={i}
                avatar={thread.avatar}
                author={thread.author}
                badge={thread.badge}
                badgeColor={thread.badgeColor}
                title={thread.title}
                excerpt={thread.excerpt}
                replies={thread.replies}
                likes={thread.likes}
                lastActive={thread.time}
              />
            ))}

            <div className="flex justify-center pt-8">
              <button className="bg-surface border-2 border-primary text-primary px-12 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-all">
                Load More Travelers
              </button>
            </div>
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