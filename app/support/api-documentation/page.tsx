import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocsSidebar from "@/components/docs/DocsSidebar";
import { Gauge, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ApiDocumentationPage() {
  return (
    <>
      <Navbar active="Support" />
      <main className="pt-20 max-w-container-max mx-auto px-6 md:px-16 flex gap-8 min-h-screen">
        <DocsSidebar />

        <div className="flex-1 py-12 pb-32">
          <section className="mb-16 scroll-mt-24" id="introduction">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-display text-ink-rich">API Documentation</h1>
              <span className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Beta
              </span>
            </div>
            <p className="text-lg text-ink-muted mb-6 max-w-2xl leading-relaxed">
              Welcome to the Pixelvale Public API. This is a small, <strong>read-only</strong> API
              for fetching public game data. It's early days — expect more endpoints as the
              platform grows.
            </p>
            <div className="h-1 bg-outline-variant/30 rounded-full" />
          </section>

          <section className="mb-16 scroll-mt-24" id="authentication">
            <h2 className="text-xl font-display text-ink-rich mb-4">Authentication</h2>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 mb-6">
              <p className="mb-4 text-ink-rich text-sm">
                Public GET endpoints currently require no authentication or API key.
              </p>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-ink-muted uppercase tracking-widest">
                  Base URL
                </label>
                <code className="bg-ink-rich text-secondary-fixed text-sm p-4 rounded-lg font-mono block overflow-x-auto">
                  https://your-domain.com/api/v1
                </code>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-xl font-display text-ink-rich mb-8">Endpoints</h2>

            <div className="mb-12 scroll-mt-24" id="get-all-games">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-secondary text-white px-3 py-1 rounded font-bold text-xs">GET</span>
                <code className="text-primary font-bold text-sm">/api/v1/games</code>
                <span className="text-ink-muted text-xs">Retrieve a list of all games.</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-ink-muted uppercase">Request</span>
                  <pre className="bg-ink-rich text-secondary-fixed p-4 rounded-xl text-xs font-mono overflow-x-auto">
{`fetch("/api/v1/games?limit=10")`}
                  </pre>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-ink-muted uppercase">Response</span>
                  <pre className="bg-ink-rich text-secondary-fixed p-4 rounded-xl text-xs font-mono overflow-x-auto h-40">
{`{
  "count": 2,
  "results": [
    {
      "id": "...",
      "slug": "bunnyflock",
      "title": "BunnyFlock",
      "price": 2000,
      "is_free": false
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="mb-12 scroll-mt-24" id="get-single-game">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-secondary text-white px-3 py-1 rounded font-bold text-xs">GET</span>
                <code className="text-primary font-bold text-sm">/api/v1/games/:slug</code>
                <span className="text-ink-muted text-xs">Get detailed data for one game.</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-ink-muted uppercase">Request</span>
                  <pre className="bg-ink-rich text-secondary-fixed p-4 rounded-xl text-xs font-mono overflow-x-auto">
{`fetch("/api/v1/games/bunnyflock")`}
                  </pre>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-ink-muted uppercase">Response</span>
                  <pre className="bg-ink-rich text-secondary-fixed p-4 rounded-xl text-xs font-mono overflow-x-auto h-40">
{`{
  "slug": "bunnyflock",
  "title": "BunnyFlock",
  "genre": "3D Platformer",
  "developer": "ExceedOG",
  "price": 2000
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 scroll-mt-24" id="rate-limits">
            <h2 className="text-xl font-display text-ink-rich mb-4">Rate Limits</h2>
            <div className="bg-paper-dark border-2 border-outline-variant p-8 rounded-2xl flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Gauge size={28} className="text-primary" />
              </div>
              <div>
                <p className="text-lg font-display text-ink-rich">No hard limit yet</p>
                <p className="text-ink-muted text-sm">
                  We're small right now please be reasonable. Formal limits will be introduced
                  as usage grows.
                </p>
              </div>
            </div>
          </section>

          <section id="help">
            <div className="border-2 border-dashed border-outline-variant p-10 rounded-2xl text-center bg-surface-container-low/30">
              <div className="inline-flex p-4 bg-moss-light rounded-full mb-6">
                <HelpCircle size={28} className="text-secondary" />
              </div>
              <h3 className="text-xl font-display text-ink-rich mb-2">Need Help?</h3>
              <p className="text-ink-muted mb-8 max-w-md mx-auto text-sm">
                Having trouble with an integration? Reach out via Support or join our Discord.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/support"
                  className="border border-secondary text-secondary font-bold py-2 px-8 rounded-lg hover:bg-secondary/5 transition-colors"
                >
                  Support Docs
                </Link>
                <a
                  href="https://discord.gg/QG8yNNrKm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white font-bold py-2 px-8 rounded-lg hover:brightness-110 transition-all"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}