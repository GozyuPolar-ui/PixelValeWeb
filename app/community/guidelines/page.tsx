import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Community Guidelines | PixelVale",
  description: "Official community guidelines for the PixelVale community.",
};

export default function GuidelinesPage() {
  return (
    <>
      <Navbar active="Community" />
      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-primary mb-10 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Community
        </Link>

        <h1 className="text-3xl md:text-4xl font-display text-ink-rich mb-3">
          Community Guidelines
        </h1>
        <p className="text-ink-muted mb-12">
          Last updated: July 2026 · These rules apply to all discussions, replies, and shared content on PixelVale.
        </p>

        <div className="space-y-10 text-ink-rich leading-relaxed">
          <section>
            <h2 className="text-xl font-display mb-3">1. Be Respectful</h2>
            <p className="text-ink-muted">
              Treat every member with courtesy. Disagreements are welcome; personal attacks,
              harassment, hate speech, and discrimination of any kind are not. Critique ideas,
              not people.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display mb-3">2. Stay On Topic</h2>
            <p className="text-ink-muted">
              Keep threads relevant to games, development, creative work, and the PixelVale
              community. Off-topic posts may be moved or removed to keep discussions useful.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display mb-3">3. No Spam or Self-Promotion Abuse</h2>
            <p className="text-ink-muted">
              Occasional sharing of your own projects is encouraged. Repeated promotional posts,
              unsolicited links, or advertising without context will be removed. Do not mass-DM
              members.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display mb-3">4. Spoiler Policy</h2>
            <p className="text-ink-muted">
              Always tag spoilers clearly in the title or opening line (e.g.{" "}
              <span className="font-mono text-sm bg-surface-container px-1.5 py-0.5 rounded">
                [Spoiler]
              </span>
              ). Do not reveal major plot points, endings, or secrets without warning. Respect
              players who are still discovering the game.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display mb-3">5. Content Standards</h2>
            <p className="text-ink-muted mb-3">The following are not allowed:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-ink-muted">
              <li>Illegal content or links to pirated software</li>
              <li>Explicit sexual content or pornography</li>
              <li>Threats, doxxing, or sharing private information</li>
              <li>Malware, phishing, or scam attempts</li>
              <li>Impersonating staff, developers, or other members</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display mb-3">6. Constructive Feedback</h2>
            <p className="text-ink-muted">
              Bug reports and suggestions help the platform grow. Provide clear steps to
              reproduce issues when possible. Feedback framed with respect is far more likely
              to be acted on.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display mb-3">7. Account Responsibility</h2>
            <p className="text-ink-muted">
              You are responsible for activity under your account. Keep your login secure.
              Ban evasion or creating alternate accounts to avoid moderation will result in a
              permanent ban.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display mb-3">8. Moderation</h2>
            <p className="text-ink-muted">
              Moderators may edit, lock, or remove content that violates these guidelines.
              Decisions are made in good faith to protect the community. Repeated or severe
              violations may lead to temporary or permanent suspension.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display mb-3">9. Reporting</h2>
            <p className="text-ink-muted">
              If you see content that breaks these rules, report it rather than engaging.
              Do not escalate conflicts in public threads. Contact support if you need further
              assistance.
            </p>
          </section>

          <section className="border-t border-surface-variant pt-10">
            <h2 className="text-xl font-display mb-3">Our Commitment</h2>
            <p className="text-ink-muted">
              PixelVale aims to be a welcoming space for players, creators, and indie
              developers. By participating, you agree to follow these guidelines and help
              maintain a healthy community for everyone.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}