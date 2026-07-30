import Link from "next/link";
import { FaDiscord, FaYoutube, FaGithub } from "react-icons/fa";
import Image from "next/image";

type FooterLink = {
  label: string;
  href: string | null; // null = Coming Soon
};

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Download Launcher", href: "/library" },
      { label: "Store Policy", href: "/support/store-policy" },
      { label: "Gift Cards", href: null },
      { label: "Become a Developer", href: "/developers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Refund Policy", href: "/support/refund-policy" },
      { label: "Server Status", href: "/support/server-status" },
      { label: "Contact Us", href: "/support/contact" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Developer Portal", href: null },
      { label: "Publish Your Game", href: "/developers" },
      { label: "API Documentation", href: "/support/api-documentation" },
      { label: "Brand Assets", href: "/support/brand-assets" },
    ],
  },
];

const socials = [
  { label: "Discord", href: "https://discord.gg/QG8yNNrKm", icon: FaDiscord },
  { label: "YouTube", href: "http://www.youtube.com/@ZaiaUltra", icon: FaYoutube },
  { label: "GitHub", href: "https://github.com/GozyuPolar-ui", icon: FaGithub },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t-4 border-surface-variant py-16">
      <div className="px-6 md:px-16 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
<div className="flex items-center gap-2">
  <div className="relative h-8 w-8 rounded overflow-hidden shrink-0">
    <Image src="/PixelVale.jpeg" alt="Pixelvale" fill className="object-cover" />
  </div>
  <span className="font-display text-primary">Pixelvale Games</span>
</div>
            <p className="text-xs text-on-surface-variant max-w-xs">
              Connecting players with handcrafted worlds. The premiere home for
              independent game creators.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm text-ink-rich mb-6 uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-3 text-xs">
                {col.links.map((link) =>
                  link.href ? (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <span className="text-on-surface-variant/40 cursor-not-allowed flex items-center gap-2">
                        {link.label}
                        <span className="text-[9px] bg-surface-variant text-on-surface-variant/70 px-1.5 py-0.5 rounded uppercase tracking-wide">
                          Soon
                        </span>
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-surface-variant flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-on-surface-variant">
            © 2024 Pixelvale Indie Games Platform. All rights reserved.
          </p>
          <div className="flex gap-8">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary opacity-80 hover:opacity-100 hover:text-primary flex items-center gap-2 transition-all"
              >
                <Icon size={18} />
                <span className="text-xs">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}