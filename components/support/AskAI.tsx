"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Loader2 } from "lucide-react";

export default function AskAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setError("");
    setAnswer(null);

    try {
      const res = await fetch("/api/support-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Gagal mendapatkan jawaban.");
      } else {
        setAnswer(data.answer);
      }
    } catch {
      setError("Gagal menghubungi asisten. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-surface-container-low border border-outline-variant rounded-xl p-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles size={22} className="text-primary" />
          <h2 className="text-xl font-display text-ink-rich">Masih bingung? Tanya AI kami</h2>
        </div>
        <p className="text-sm text-on-surface-variant mb-6">
          Gak nemu jawaban di FAQ atau artikel? Coba tanya langsung, dijawab
          otomatis dalam hitungan detik.
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Contoh: Gimana cara download game setelah beli?"
            className="flex-grow bg-surface border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="bg-primary text-white px-5 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>

        {error && <p className="text-red-600 text-xs mt-4">{error}</p>}

        {answer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-surface p-5 rounded-lg border border-primary/20 text-sm text-ink-rich leading-relaxed whitespace-pre-wrap"
          >
            {answer}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}