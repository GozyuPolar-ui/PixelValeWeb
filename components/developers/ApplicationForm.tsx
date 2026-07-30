"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileEdit, Send, Check, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase";

const genres = ["RPG", "Adventure", "Puzzle", "Cozy", "Strategy", "Indie", "Sim", "World", "Other"];

export default function ApplicationForm() {
  const [form, setForm] = useState({
    developerName: "",
    contactEmail: "",
    gameTitle: "",
    genre: "Cozy",
    description: "",
    portfolioUrl: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const supabase = createClient();

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.developerName || !form.contactEmail || !form.gameTitle || !form.description) return;

    setStatus("submitting");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("developer_applications").insert({
      applicant_id: user?.id || null,
      developer_name: form.developerName,
      contact_email: form.contactEmail,
      game_title: form.gameTitle,
      genre: form.genre,
      description: form.description,
      portfolio_url: form.portfolioUrl || null,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("sent");
  };

  return (
    <section id="apply" className="py-24 bg-moss-light/30 border-t-4 border-surface-container-highest">
      <div className="px-6 md:px-16 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-paper-dark p-8 md:p-12 rounded-2xl border-2 border-outline-variant shadow-pixel"
        >
          <div className="flex items-center gap-4 mb-8">
            <FileEdit size={36} className="text-primary" />
            <div>
              <h2 className="text-2xl font-display text-ink-rich">Developer Application</h2>
              <p className="text-sm text-ink-muted">Join the next wave of indie innovators.</p>
            </div>
          </div>

          {status === "sent" ? (
            <div className="text-center py-8">
              <Check size={40} className="mx-auto text-secondary mb-4" />
              <p className="text-lg font-display text-ink-rich mb-2">Application Sent!</p>
              <p className="text-sm text-ink-muted">We typically respond within a few days. High five!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase">
                    Developer Name
                  </label>
                  <input
                    type="text"
                    value={form.developerName}
                    onChange={(e) => update("developerName", e.target.value)}
                    placeholder="e.g. Studio Pixelheart"
                    className="w-full bg-surface border border-outline-variant rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    placeholder="hello@yourstudio.com"
                    className="w-full bg-surface border border-outline-variant rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase">
                    Game Title
                  </label>
                  <input
                    type="text"
                    value={form.gameTitle}
                    onChange={(e) => update("gameTitle", e.target.value)}
                    placeholder="What's your project called?"
                    className="w-full bg-surface border border-outline-variant rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase">
                    Game Genre
                  </label>
                  <select
                    value={form.genre}
                    onChange={(e) => update("genre", e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {genres.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase">
                  Game Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={4}
                  placeholder="Tell us the heart and soul of your game..."
                  className="w-full bg-surface border border-outline-variant rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase">
                  Portfolio / Trailer Link
                </label>
                <input
                  type="url"
                  value={form.portfolioUrl}
                  onChange={(e) => update("portfolioUrl", e.target.value)}
                  placeholder="https://youtube.com/your-trailer"
                  className="w-full bg-surface border border-outline-variant rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {status === "error" && (
                <p className="text-red-600 text-xs">Gagal mengirim aplikasi. Coba lagi.</p>
              )}

              <div className="pt-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      Apply Now <Send size={18} />
                    </>
                  )}
                </motion.button>
                <p className="text-center text-xs text-ink-muted mt-4">
                  We typically respond within a few days. High five!
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}