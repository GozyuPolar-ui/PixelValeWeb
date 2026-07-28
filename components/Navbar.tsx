"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, User, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase";
import NotificationBell from "@/components/notifications/NotificationBell";
import SearchOverlay from "@/components/SearchOverlay";

const links = ["Store", "Library", "News", "Community", "Support"];

type NavbarProps = {
  active?: string;
  showLauncher?: boolean;
};

export default function Navbar({ active = "Store", showLauncher = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const supabase = createClient();
  const [showSearch, setShowSearch] = useState(false);

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
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b-4 border-surface-variant transition-all duration-300 ${
        scrolled ? "py-1 shadow-md" : "py-0"
      }`}
    >
      <div className="flex justify-between items-center h-16 px-6 md:px-16 max-w-container-max mx-auto">
<div className="flex items-center gap-3">
  <div className="relative h-9 w-9 rounded overflow-hidden shrink-0">
    <Image src="/PixelVale.jpeg" alt="Pixelvale" fill className="object-cover" />
  </div>
  <span className="text-xl font-display font-bold text-primary">
    Pixelvale Store
  </span>
</div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={
                link === "Store"
                  ? "/"
                  : link === "Library"
                  ? "/library"
                  : link === "News"
                  ? "/news"
                  : link === "Community"
                  ? "/community"
                  : link === "Support"
                  ? "/support"
                  : "#"
              }
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                link === active
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
<button
            onClick={() => setShowSearch(true)}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors"
          >
            <Search size={20} />
          </button>
          <NotificationBell />

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
                className="absolute right-0 top-12 bg-white border border-outline-variant rounded-lg shadow-lg py-2 w-40 z-50"
              >
                <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-surface-container-low">
                  Profile
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
              className="bg-primary text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              Get Launcher
            </motion.button>
          )}
        </div>
      </div>
      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
    </motion.nav>
  );
}