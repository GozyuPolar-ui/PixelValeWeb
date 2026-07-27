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
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="fixed top-0 w-full z-50 h-16 flex items-center justify-center bg-surface/80 backdrop-blur-md border-b-4 border-surface-variant">
        <span className="text-xl font-display text-primary">Pixelvale</span>
      </header>

      <main className="flex-grow flex pt-16">
        <div className="w-full flex">
          <AuthHero />

          <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 bg-surface-container-low">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md bg-white p-8 rounded-lg border border-surface-variant shadow-pixel"
            >
              <div className="flex border-b border-surface-variant mb-8">
                <button
                  onClick={() => setTab("login")}
                  className={`flex-1 py-4 font-display transition-colors ${
                    tab === "login"
                      ? "text-primary border-b-2 border-primary"
                      : "text-ink-muted hover:text-primary"
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setTab("register")}
                  className={`flex-1 py-4 font-display transition-colors ${
                    tab === "register"
                      ? "text-primary border-b-2 border-primary"
                      : "text-ink-muted hover:text-primary"
                  }`}
                >
                  Register
                </button>
              </div>

              {tab === "login" ? <LoginForm /> : <RegisterForm />}

              <div className="mt-8 pt-6 border-t border-surface-variant flex items-center justify-center gap-4">
                <Sprout size={20} className="text-primary" />
                <p className="text-xs text-ink-muted italic">
                  &quot;A small seed today, a forest tomorrow.&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}