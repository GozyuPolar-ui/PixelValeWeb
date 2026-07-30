import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-display text-ink-rich mb-2">Terms of Service</h1>
        <p className="text-xs text-ink-muted mb-10">Last updated: 2026</p>

        <div className="prose prose-neutral max-w-none prose-headings:font-display">
          <p>
            Welcome to Pixelvale Store. By creating an account or using our platform, you agree
            to the following terms.
          </p>

          <h2>1. Your Account</h2>
          <p>
            You are responsible for keeping your account credentials secure. You must provide
            accurate information when registering and are responsible for all activity under
            your account.
          </p>

          <h2>2. Acceptable Use</h2>
          <p>
            You agree not to use Pixelvale Store to distribute harmful content, impersonate
            others, harass members of the community, or attempt to disrupt the platform's
            normal operation.
          </p>

          <h2>3. Purchases &amp; Content</h2>
          <p>
            Games sold on Pixelvale Store are distributed with permission from their respective
            developers. Purchasing a game grants you a personal license to use it, as described
            in our{" "}
            <a href="/support/store-policy" className="text-primary hover:underline">
              Store Policy
            </a>
            .
          </p>

          <h2>4. Community Content</h2>
          <p>
            Threads, replies, reviews, and articles you post remain yours, but by posting them
            you grant Pixelvale Store a license to display them on the platform. We may remove
            content that violates these terms.
          </p>

          <h2>5. Termination</h2>
          <p>
            We may suspend or terminate accounts that violate these terms. You may also stop
            using the platform and request account deletion at any time via{" "}
            <a href="/support/contact" className="text-primary hover:underline">
              Contact Us
            </a>
            .
          </p>

          <h2>6. Changes to These Terms</h2>
          <p>
            We may update these terms as the platform evolves. Continued use of Pixelvale Store
            after changes means you accept the updated terms.
          </p>

          <p className="text-sm text-ink-muted">
            This page is still a work in progress and will be updated as the platform grows.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}