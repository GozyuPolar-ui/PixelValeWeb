import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LibraryHeader from "@/components/LibraryHeader";
import LibraryFilters from "@/components/LibraryFilters";
import LibraryGameCard from "@/components/LibraryGameCard";
import DownloadWidget from "@/components/DownloadWidget";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import DiscoveryPrompt from "@/components/DiscoveryPrompt";
import { libraryGames } from "@/lib/data";

export default function LibraryPage() {
  return (
    <>
      <Navbar active="Library" />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-24">
        <LibraryHeader />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <LibraryFilters />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {libraryGames.map((game, i) => (
                <LibraryGameCard
                  key={game.id}
                  title={game.title}
                  genre={game.genre}
                  installed={game.installed}
                  image={game.image}
                  index={i}
                />
              ))}
            </div>
          </div>
          <aside className="w-full lg:w-80 flex flex-col gap-8">
            <DownloadWidget />
            <RecentlyPlayed />
            <DiscoveryPrompt />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}