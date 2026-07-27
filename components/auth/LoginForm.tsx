"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { GoogleIcon, SteamIcon, DiscordIcon } from "./BrandIcons";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleDiscordLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      onSubmit={handleLogin}
    >
      <div className="space-y-1">
        <label className="text-xs text-ink-muted uppercase tracking-wider flex items-center gap-2 font-bold">
          <Mail size={14} /> Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="explorer@pixelvale.com"
          className="w-full bg-paper-dark border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/50 outline-none"
        />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-ink-muted uppercase tracking-wider flex items-center gap-2 font-bold">
            <Lock size={14} /> Password
          </label>
          <a href="#" className="text-xs text-primary hover:underline">
            Forgot?
          </a>
        </div>
        <div className="relative">
            <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-paper-dark border-none rounded-lg p-3 pr-10 focus:ring-2 focus:ring-primary/50 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-ink-muted hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

{error && (
        <p className="text-red-600 text-xs bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className="w-full bg-primary text-white font-display py-4 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-60"
      >
        <LogIn size={20} /> {loading ? "Logging in..." : "Log In"}
      </motion.button>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-variant" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-4 bg-white text-ink-muted">OR CONTINUE WITH</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
<motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center p-3 border border-surface-variant rounded-lg hover:bg-paper-dark transition-colors"
        >
          <GoogleIcon size={22} />
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center justify-center p-3 border border-surface-variant rounded-lg hover:bg-paper-dark transition-colors opacity-50 cursor-not-allowed"
          title="Coming soon"
        >
          <SteamIcon size={22} />
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleDiscordLogin}
          className="flex items-center justify-center p-3 border border-surface-variant rounded-lg hover:bg-paper-dark transition-colors"
        >
          <DiscordIcon size={22} />
        </motion.button>
      </div>
    </motion.form>
  );
}