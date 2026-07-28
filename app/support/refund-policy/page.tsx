import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-display text-ink-rich mb-8">Refund Policy</h1>
        <div className="prose prose-neutral max-w-none prose-headings:font-display">
          <h2>Refund Terms</h2>
          <p>
            You are eligible to request a refund for games purchased on Pixelvale
            Store under the following conditions:
          </p>
          <ul>
            <li>Requested within 14 days from the date of purchase</li>
            <li>Total playtime/download time has not exceeded 2 hours</li>
            <li>The game experiences unfixable technical issues</li>
          </ul>

          <h2>How to Request a Refund</h2>
          <p>
            Contact us via our{" "}
            <a href="/support/contact">Contact Us</a> page and include your proof
            of purchase along with the reason for your refund request.
          </p>

          <p className="text-sm text-ink-muted">
            This page is currently under development and will be updated as the
            platform evolves.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}