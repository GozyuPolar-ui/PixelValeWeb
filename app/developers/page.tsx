import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeveloperHero from "@/components/developers/DeveloperHero";
import WhyJoinSection from "@/components/developers/WhyJoinSection";
import HowItWorksSection from "@/components/developers/HowItWorksSection";
import ApplicationForm from "@/components/developers/ApplicationForm";

export default function DevelopersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <DeveloperHero />
        <WhyJoinSection />
        <HowItWorksSection />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}