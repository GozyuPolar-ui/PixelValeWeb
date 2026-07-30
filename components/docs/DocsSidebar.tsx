"use client";

import { useState, useEffect } from "react";
import { Info, KeyRound, Gauge, AlertTriangle } from "lucide-react";

const sections = [
  { id: "introduction", label: "Introduction", icon: Info },
  { id: "authentication", label: "Authentication", icon: KeyRound },
  { id: "get-all-games", label: "Get All Games", indent: true },
  { id: "get-single-game", label: "Get Single Game", indent: true },
  { id: "rate-limits", label: "Rate Limits", icon: Gauge },
  { id: "help", label: "Need Help?", icon: AlertTriangle },
];

export default function DocsSidebar() {
  const [active, setActive] = useState("introduction");

  useEffect(() => {
    const onScroll = () => {
      let current = "introduction";
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          current = s.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="hidden md:block w-1/4 py-12 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-lg font-display text-primary mb-1">Developer Docs</h2>
        <p className="text-xs text-ink-muted">v0.1.0-beta</p>
      </div>
      <nav className="flex flex-col gap-1">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
              s.indent ? "pl-12 text-xs" : ""
            } ${
              active === s.id
                ? "border-l-4 border-primary bg-surface-container-low text-primary font-bold"
                : "text-ink-muted hover:text-primary hover:bg-surface-container-low"
            }`}
          >
            {s.icon && <s.icon size={16} />}
            <span>{s.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}