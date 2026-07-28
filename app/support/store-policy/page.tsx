import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StorePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-display text-ink-rich mb-8">Store Policy</h1>
        <div className="prose prose-neutral max-w-none prose-headings:font-display">
          <p>
            Welcome to Pixelvale Store. These Terms and Store Policies govern your
            access to and use of our digital distribution platform, applications,
            and services. By purchasing, downloading, or accessing any software
            through Pixelvale Store, you agree to be bound by these terms.
          </p>

          <h2>1. Game Distribution &amp; Intellectual Property</h2>
          <p>
            Pixelvale Store acts as an authorized distribution platform for
            independent video game developers and publishers. All games, content,
            trademarks, and associated intellectual property offered on the platform
            remain the sole property of their respective owners. Pixelvale Store does
            not claim ownership over any developer-submitted content.
          </p>

          <h2>2. Pricing, Taxes &amp; Transaction Terms</h2>
          <p>
            All prices displayed on the platform are subject to change at any time
            prior to payment confirmation. Prices are inclusive of applicable sales
            taxes unless explicitly stated otherwise. Pixelvale Store reserves the
            right to adjust pricing, correct errors, or modify promotional offers
            at its sole discretion without prior notice.
          </p>

          <h2>3. Digital License Agreement</h2>
          <p>
            When you acquire digital content on Pixelvale Store, you are granted a
            limited, revocable, personal, non-exclusive, and non-transferable license
            to access and play the software for personal, non-commercial use. This
            transaction represents a license grant, not a transfer of title or ownership
            of the underlying software.
          </p>

          <h2>4. Updates to Terms</h2>
          <p className="text-sm text-ink-muted">
            Pixelvale Store reserves the right to revise or modify these policies at
            any time. Continued use of our platform following any changes constitutes
             acceptance of the updated terms.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}