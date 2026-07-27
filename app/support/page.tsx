import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportHero from "@/components/support/SupportHero";
import HelpCategories from "@/components/support/HelpCategories";
import PopularArticles from "@/components/support/PopularArticles";
import ContactSection from "@/components/support/ContactSection";
import FaqAccordion from "@/components/support/FaqAccordion";

export default function SupportPage() {
  return (
    <>
      <Navbar active="Support" />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-16">
        <SupportHero />
        <HelpCategories />
        <PopularArticles />
        <ContactSection />
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}