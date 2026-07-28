import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-display text-ink-rich mb-4">Contact Us</h1>
        <p className="text-on-surface-variant mb-12">
          Have questions, a bug report, or want to chat about a game you're
          developing? Reach out to us through any of the channels below.
        </p>

        <div className="space-y-4">
          <a
            href="https://discord.gg/QG8yNNrKm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-colors"
          >
            <FaDiscord size={28} className="text-primary shrink-0" />
            <div>
              <p className="font-display text-ink-rich">Discord</p>
              <p className="text-xs text-on-surface-variant">
                The fastest way to get a response — join our community server
              </p>
            </div>
          </a>

          <a
            href="https://github.com/GozyuPolar-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-colors"
          >
            <FaGithub size={28} className="text-primary shrink-0" />
            <div>
              <p className="font-display text-ink-rich">GitHub</p>
              <p className="text-xs text-on-surface-variant">
                Technical bug reports or code contributions
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4 p-5 rounded-xl border border-outline-variant">
            <Mail size={28} className="text-primary shrink-0" />
            <div>
              <p className="font-display text-ink-rich">Email</p>
              <p className="text-xs text-on-surface-variant">
                Coming soon — please use Discord for now
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}