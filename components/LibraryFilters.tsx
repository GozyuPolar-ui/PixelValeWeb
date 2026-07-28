"use client";

const tabs = ["All Games", "Recently Added"];

type Props = {
  active: string;
  onChange: (tab: string) => void;
};

export default function LibraryFilters({ active, onChange }: Props) {
  return (
    <div className="flex gap-8 border-b-2 border-surface-container mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`pb-4 text-xs font-bold uppercase tracking-wide transition-all ${
            active === tab
              ? "text-primary border-b-4 border-primary"
              : "text-ink-muted hover:text-primary"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}