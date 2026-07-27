import ConfirmationNav from "@/components/confirmation/ConfirmationNav";
import SuccessHeader from "@/components/confirmation/SuccessHeader";
import OrderCard from "@/components/confirmation/OrderCard";
import NextSteps from "@/components/confirmation/NextSteps";
import RecommendedGames from "@/components/confirmation/RecommendedGames";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <ConfirmationNav />

      <main className="flex-grow pt-12 pb-24 px-6 md:px-16 max-w-container-max mx-auto w-full">
        <SuccessHeader />
        <OrderCard />
        <NextSteps />
        <RecommendedGames />
      </main>

      <footer className="bg-surface-container-low border-t-4 border-surface-container-highest mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-6 max-w-container-max mx-auto w-full gap-4">
          <p className="text-xs text-ink-muted">
            © 2024 Pixelvale Indie Games. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="text-ink-muted hover:text-secondary underline transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-ink-muted hover:text-secondary underline transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-ink-muted hover:text-secondary underline transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}