"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
        <AlertTriangle size={36} className="text-red-600" />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">
        Something went wrong
      </p>
      <h1 className="text-3xl md:text-4xl font-display text-ink-rich mb-3">
        The Vale hit a snag
      </h1>
      <p className="text-ink-muted max-w-md mb-8 leading-relaxed">
        an unexpected error occurred. You can try again, or go back to the store and continue exploring.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          Coba lagi
        </button>
        <Link
          href="/"
          className="border border-outline-variant text-ink-rich px-6 py-3 rounded-lg text-sm font-bold hover:bg-surface-container-low transition-colors"
        >
          Kembali ke Store
        </Link>
      </div>
    </div>
  );
}