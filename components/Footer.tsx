import { MessageCircle, MessageSquare, Video } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: ["Download Launcher", "Store Policy", "Gift Cards", "Career Opportunities"],
  },
  {
    title: "Support",
    links: ["Help Center", "Refund Policy", "Server Status", "Contact Us"],
  },
  {
    title: "Developers",
    links: ["Developer Portal", "Publish Your Game", "API Documentation", "Brand Assets"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t-4 border-surface-variant py-16">
      <div className="px-6 md:px-16 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center font-display text-primary text-xs">
                PV
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
              <ul className="space-y-3 text-xs text-on-surface-variant">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-surface-variant flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-on-surface-variant">
            © 2024 Pixelvale Indie Games Platform. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-secondary opacity-80 hover:opacity-100 hover:text-primary flex items-center gap-2 transition-all">
              <MessageCircle size={18} />
              <span className="text-xs">Discord</span>
            </a>
            <a href="#" className="text-secondary opacity-80 hover:opacity-100 hover:text-primary flex items-center gap-2 transition-all">
              <MessageSquare size={18} />
              <span className="text-xs">Twitter</span>
            </a>
            <a href="#" className="text-secondary opacity-80 hover:opacity-100 hover:text-primary flex items-center gap-2 transition-all">
              <Video size={18} />
              <span className="text-xs">YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}