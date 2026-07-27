"use client";

type Props = {
  active: string;
  onChange: (tab: string) => void;
};

const tabs = ["Overview", "Library", "Wishlist", "Reviews", "Achievements"];

export default function ProfileTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-10 border-b border-outline-variant mb-12 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`pb-4 whitespace-nowrap transition-all ${
            active === tab
              ? "text-primary font-bold border-b-2 border-primary"
              : "text-ink-muted hover:text-primary"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}