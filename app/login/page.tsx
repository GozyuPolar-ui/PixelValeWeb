"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import AuthHero from "@/components/auth/AuthHero";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-bleed background slideshow */}
      <AuthHero />

      {/* Header transparan */}
      <header className="fixed top-0 w-full z-50 h-16 flex items-center justify-center bg-black/20 backdrop-blur-md border-b border-white/10">
        <span className="text-xl font-display text-white drop-shadow-md">Pixelvale</span>
      </header>

{/* Floating glass card di kiri */}
<main className="relative z-10 min-h-screen flex items-center justify-start px-6 md:px-16 lg:px-24 py-20">
  <motion.div
    initial={{ opacity: 0, x: -24, scale: 0.97 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="w-full max-w-md"
  >
    {/* Glassmorphism card */}
    <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-2xl shadow-2xl p-8 text-white">
      {/* Tabs */}
      <div className="flex border-b border-white/20 mb-8">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 py-3.5 font-display transition-colors ${
            tab === "login"
              ? "text-white border-b-2 border-primary"
              : "text-white/60 hover:text-white"
          }`}
        >
          Log In
        </button>
        <button
          onClick={() => setTab("register")}
          className={`flex-1 py-3.5 font-display transition-colors ${
            tab === "register"
              ? "text-white border-b-2 border-primary"
              : "text-white/60 hover:text-white"
          }`}
        >
          Register
        </button>
      </div>

      {tab === "login" ? <LoginForm /> : <RegisterForm />}

      <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-center gap-3">
        <Sprout size={18} className="text-primary" />
        <p className="text-xs text-white/70 italic">
          &quot;"Don't be sorry, be better."&quot;
        </p>
      </div>
    </div>
  </motion.div>
</main>
    </div>
  );
}