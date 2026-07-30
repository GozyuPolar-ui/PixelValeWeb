import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <Compass size={36} className="text-primary" />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
        404 — Path not found
      </p>
      <h1 className="text-3xl md:text-4xl font-display text-ink-rich mb-3">
        You&apos;ve wandered off the map
      </h1>
      <p className="text-ink-muted max-w-md mb-8 leading-relaxed">
        Halaman ini tidak ada di Vale. Mungkin link-nya rusak, atau game-nya sudah pindah.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          Back to Store
        </Link>
        <Link
          href="/support"
          className="border border-outline-variant text-ink-rich px-6 py-3 rounded-lg text-sm font-bold hover:bg-surface-container-low transition-colors"
        >
          Buka Support
        </Link>
      </div>
    </div>
  );
}