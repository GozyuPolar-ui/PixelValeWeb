"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, User, LogOut, Menu, X, Heart } from "lucide-react";
import { createClient } from "@/lib/supabase";
import NotificationBell from "@/components/notifications/NotificationBell";
import SearchOverlay from "@/components/SearchOverlay";
import { useToast } from "@/components/Toast";

const links = [
  { label: "Store", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "News", href: "/news" },
  { label: "Community", href: "/community" },
  { label: "Support", href: "/support" },
];

type NavbarProps = {
  active?: string;
  showLauncher?: boolean;
};

export default function Navbar({ active = "Store", showLauncher = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();

        setUserAvatar(profile?.avatar_url || user.user_metadata?.avatar_url || null);
      }
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", session.user.id)
          .single();

        setUserAvatar(profile?.avatar_url || session.user.user_metadata?.avatar_url || null);
      } else {
        setUserAvatar(null);
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const beat = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from("profiles")
        .update({ last_seen: new Date().toISOString() })
        .eq("id", user.id);
    };

    beat();
    const id = setInterval(beat, 60_000);
    return () => clearInterval(id);
  }, [supabase]);

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast("Logged out successfully", "info");
    window.location.href = "/";
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b-4 border-surface-variant transition-all duration-300 ${
          scrolled ? "py-1 shadow-md" : "py-0"
        }`}
      >
        <div className="flex justify-between items-center h-16 px-6 md:px-16 max-w-container-max mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={closeMobile}>
            <div className="relative h-9 w-9 rounded overflow-hidden shrink-0">
              <Image src="/PixelVale.jpeg" alt="Pixelvale" fill className="object-cover" />
            </div>
            <span className="text-xl font-display font-bold text-primary hidden sm:block">
              Pixelvale Store
            </span>
            <span className="text-xl font-display font-bold text-primary sm:hidden">
              Pixelvale
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                  link.label === active
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <div className="hidden sm:block">
              <NotificationBell />
            </div>

            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  userAvatar ? setShowDropdown(!showDropdown) : (window.location.href = "/login")
                }
                className="w-9 h-9 rounded-full border-2 border-primary overflow-hidden flex items-center justify-center bg-surface-container-high text-on-surface-variant cursor-pointer relative"
              >
                {userAvatar ? (
                  <Image src={userAvatar} alt="Profile" fill className="object-cover" />
                ) : (
                  <User size={18} />
                )}
              </motion.div>

              {showDropdown && userAvatar && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-12 bg-white border border-outline-variant rounded-lg shadow-lg py-2 w-44 z-50"
                >
                  <Link
                    href="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-surface-container-low"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-surface-container-low flex items-center gap-2"
                  >
                    <Heart size={14} className="text-primary" /> Wishlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-surface-container-low flex items-center gap-2"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </motion.div>
              )}
            </div>

            {showLauncher && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="hidden lg:block bg-primary text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
              >
                Get Launcher
              </motion.button>
            )}

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-surface z-50 md:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between h-16 px-6 border-b-4 border-surface-variant">
                <span className="font-display font-bold text-primary">Menu</span>
                <button
                  onClick={closeMobile}
                  className="p-2 text-on-surface-variant hover:text-primary"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMobile}
                    className={`block px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                      link.label === active
                        ? "text-primary bg-primary/5 border-r-4 border-primary"
                        : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mx-6 my-4 border-t border-surface-variant" />

                {userAvatar ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={closeMobile}
                      className="block px-6 py-4 text-sm font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={closeMobile}
                      className="block px-6 py-4 text-sm font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={() => {
                        closeMobile();
                        handleLogout();
                      }}
                      className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-wider text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMobile}
                    className="block px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary/5"
                  >
                    Log In / Register
                  </Link>
                )}
              </nav>

              {showLauncher && (
                <div className="p-6 border-t border-surface-variant">
                  <button className="w-full bg-primary text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
                    Get Launcher
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
    </>
  );
}