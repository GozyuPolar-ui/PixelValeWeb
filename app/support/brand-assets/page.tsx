"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Info, CheckCircle2, XCircle, ArrowRight, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const swatches = [
  { name: "Terracotta", hex: "#994032" },
  { name: "Forest Green", hex: "#466556" },
  { name: "Background Cream", hex: "#FBF9F5" },
  { name: "Warm Beige", hex: "#DCC0BC" },
  { name: "Dark Ink", hex: "#2D2926" },
];

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <motion.div whileHover={{ y: -6 }} className="group cursor-pointer" onClick={handleCopy}>
      <div
        className="h-28 w-full rounded-xl border border-outline-variant transition-transform"
        style={{ backgroundColor: hex }}
      />
      <div className="mt-3">
        <p className="text-xs font-bold text-ink-rich">{name}</p>
        <code className="text-xs text-ink-muted hover:text-primary">{copied ? "COPIED!" : hex}</code>
      </div>
    </motion.div>
  );
}

export default function BrandAssetsPage() {
  return (
    <>
      <Navbar active="Support" />
      <main className="max-w-container-max mx-auto px-6 md:px-16 pt-32 pb-24 space-y-24">
        <section className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-display text-ink-rich mb-4">Brand Assets</h1>
          <p className="text-lg text-ink-muted">
            Official assets for press, partners, and community members to represent
            Pixelvale accurately.
          </p>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl font-display text-secondary">The Logo</h2>
            <span className="text-xs bg-surface-container px-3 py-1 rounded-full text-on-surface-variant border border-outline-variant">
              Pixel-Cozy Style
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-bright rounded-xl border border-outline-variant p-10 flex flex-col items-center justify-center gap-8 relative">
              <span className="absolute top-4 left-4 text-xs text-ink-muted opacity-60">
                Light Background
              </span>
              <div className="relative h-32 w-32">
                <Image src="/PixelVale.jpeg" alt="Pixelvale Logo" fill className="object-contain rounded-lg" />
              </div>
              <div className="flex gap-3">
                <a
                  href="/PixelVale.jpeg"
                  download
                  className="bg-primary text-white text-xs font-bold px-6 py-2 rounded-lg hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <Download size={14} /> PNG
                </a>
              </div>
            </div>

            <div className="bg-ink-rich rounded-xl border border-ink-muted p-10 flex flex-col items-center justify-center gap-8 relative">
              <span className="absolute top-4 left-4 text-xs text-surface-container opacity-60">
                Dark Background
              </span>
              <div className="relative h-32 w-32">
                <Image src="/PixelVale.jpeg" alt="Pixelvale Logo" fill className="object-contain rounded-lg" />
              </div>
              <div className="flex gap-3">
                <a
                  href="/PixelVale.jpeg"
                  download
                  className="bg-primary text-white text-xs font-bold px-6 py-2 rounded-lg hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <Download size={14} /> PNG
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 bg-paper-dark border border-outline-variant rounded-lg flex items-start gap-4">
            <Info size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-on-surface-variant italic text-sm">
              &quot;Please don&apos;t distort, recolor, or modify the logo.&quot;
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-xl font-display text-secondary">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {swatches.map((s) => (
              <ColorSwatch key={s.hex} name={s.name} hex={s.hex} />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-xl font-display text-secondary">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-10 border border-outline-variant rounded-xl bg-surface-container-low flex flex-col justify-between min-h-[200px]">
              <span className="text-4xl font-display text-ink-rich">Pixelvale</span>
              <p className="mt-8 text-xs text-primary tracking-widest font-bold uppercase">
                Space Mono  Display
              </p>
            </div>
            <div className="p-10 border border-outline-variant rounded-xl bg-surface-container-low flex flex-col justify-between min-h-[200px]">
              <span className="text-lg text-ink-rich leading-relaxed">
                The quick brown fox jumps over the lazy dog. Community, creativity, and calm
                discovery at the heart of gaming.
              </span>
              <p className="mt-8 text-xs text-primary tracking-widest font-bold uppercase">
                Inter  Body
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-xl font-display text-secondary">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-secondary tracking-widest uppercase">Do</h3>
              <ul className="space-y-4">
                {[
                  "Use official colors and palettes provided here.",
                  "Maintain adequate clear space around the logo.",
                  "Always use the original provided files.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-secondary shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-red-600 tracking-widest uppercase">Don&apos;t</h3>
              <ul className="space-y-4">
                {[
                  "Stretch, skew, or distort the proportions of the logo.",
                  "Change the colors or apply gradients to the assets.",
                  "Add drop shadows, glows, or other effects.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="border-2 border-dashed border-outline-variant p-12 rounded-xl text-center space-y-6">
            <h2 className="text-xl font-display text-ink-rich">Need something custom?</h2>
            <p className="max-w-xl mx-auto text-on-surface-variant text-sm">
              If you&apos;re a partner or media outlet and need specific assets or resolutions
              not listed here, we&apos;re happy to help.
            </p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              Contact Support <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}