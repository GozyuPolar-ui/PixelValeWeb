"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff, Send, CheckCircle2, ArrowLeft } from "lucide-react";
import { GoogleIcon, SteamIcon, DiscordIcon } from "./BrandIcons";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";

export default function LoginForm() {
  const [mode, setMode] = useState<"login" | "forgot" | "forgot-sent">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    
    if (error) {
      setError(error.message);
      toast(error.message, "error");
    } else {
      toast("Welcome back, explorer!", "success");
      router.push("/");
      router.refresh();
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      toast(error.message, "error");
      return;
    }

    toast("Reset link sent to your email", "success");
    setMode("forgot-sent");
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

  if (mode === "forgot-sent") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 space-y-4">
        <CheckCircle2 size={48} className="text-primary mx-auto" />
        <h3 className="text-lg font-display text-white">Check your inbox</h3>
        <p className="text-sm text-white/70 max-w-xs mx-auto">
          We sent a password reset link to <span className="font-bold text-white">{email}</span>.
        </p>
        <button
          onClick={() => setMode("login")}
          className="text-xs text-primary hover:underline flex items-center gap-1 mx-auto"
        >
          <ArrowLeft size={14} /> Back to Log In
        </button>
      </motion.div>
    );
  }

  if (mode === "forgot") {
    return (
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
        onSubmit={handleForgotPassword}
      >
        <div>
          <h3 className="text-lg font-display text-white mb-1">Reset your password</h3>
          <p className="text-xs text-white/70">
            Enter the email tied to your account and we'll send you a reset link.
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-white/70 uppercase tracking-wider flex items-center gap-2 font-bold">
            <Mail size={14} /> Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="explorer@pixelvale.com"
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/50 outline-none"
          />
        </div>

        {error && <p className="text-red-200 text-xs bg-red-500/20 p-3 rounded-lg">{error}</p>}

        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full bg-primary text-white font-display py-4 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-60"
        >
          <Send size={18} /> {loading ? "Sending..." : "Send Reset Link"}
        </motion.button>

        <button
          type="button"
          onClick={() => setMode("login")}
          className="text-xs text-white/70 hover:text-primary flex items-center gap-1 mx-auto"
        >
          <ArrowLeft size={14} /> Back to Log In
        </button>
      </motion.form>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      onSubmit={handleLogin}
    >
      <div className="space-y-1">
        <label className="text-xs text-white/70 uppercase tracking-wider flex items-center gap-2 font-bold">
          <Mail size={14} /> Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="explorer@pixelvale.com"
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/50 outline-none"
        />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs text-white/70 uppercase tracking-wider flex items-center gap-2 font-bold">
            <Lock size={14} /> Password
          </label>
          <button
            type="button"
            onClick={() => setMode("forgot")}
            className="text-xs text-primary hover:underline"
          >
            Forgot?
          </button>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pr-10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/50 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-white/70 hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {error && <p className="text-red-200 text-xs bg-red-500/20 p-3 rounded-lg">{error}</p>}

      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className="w-full bg-primary text-white font-display py-4 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-60"
      >
        <LogIn size={20} /> {loading ? "Logging in..." : "Log In"}
      </motion.button>

      <div className="flex items-center my-6 gap-3">
        <div className="flex-1 border-t border-white/20" />
        <span className="text-[11px] font-bold tracking-wider text-white/50 uppercase whitespace-nowrap">
          OR CONTINUE WITH
        </span>
        <div className="flex-1 border-t border-white/20" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center p-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
        >
          <GoogleIcon size={22} />
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center justify-center p-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed"
          title="Coming soon"
        >
          <SteamIcon size={22} />
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleDiscordLogin}
          className="flex items-center justify-center p-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
        >
          <DiscordIcon size={22} />
        </motion.button>
      </div>
    </motion.form>
  );
}