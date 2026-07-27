import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewReleases from "@/components/NewReleases";
import GenreGrid from "@/components/GenreGrid";
import CommunityFavorites from "@/components/CommunityFavorites";
import PlatformNews from "@/components/PlatformNews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="py-12 space-y-24">
        <NewReleases />
        <GenreGrid />
        <CommunityFavorites />
      </main>
      <PlatformNews />
      <Footer />
    </>
  );
}