"use client";

import { motion } from "framer-motion";
import { User, Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTos, setAgreedToTos] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak cocok.");
      return;
    }
    if (!agreedToTos) {
      setError("Kamu harus setuju dengan Terms of Service.");
      return;
    }

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        username,
      });
    }

    setLoading(false);
    router.push("/");
    router.refresh();
  };
  return (
        <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      onSubmit={handleRegister}
    >
      <div className="space-y-1">
        <label className="text-xs text-ink-muted uppercase tracking-wider flex items-center gap-2 font-bold">
          <User size={14} /> Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="AdventurerName"
          className="w-full bg-paper-dark border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/50 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-ink-muted uppercase tracking-wider flex items-center gap-2 font-bold">
          <Mail size={14} /> Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="hello@world.com"
          className="w-full bg-paper-dark border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/50 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-ink-muted uppercase tracking-wider font-bold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-paper-dark border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/50 outline-none mt-1"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-ink-muted uppercase tracking-wider font-bold">Confirm</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-paper-dark border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/50 outline-none mt-1"
          />
        </div>
      </div>

      <div className="flex items-start gap-3 p-1">
        <input
          type="checkbox"
          id="tos"
          checked={agreedToTos}
          onChange={(e) => setAgreedToTos(e.target.checked)}
          className="mt-1 rounded border-outline-variant text-primary"
        />
        <label htmlFor="tos" className="text-xs text-ink-muted leading-relaxed">
          I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </label>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        className="w-full bg-primary text-white font-display py-4 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
      >
        <UserPlus size={20} /> Create Account
      </motion.button>
      {error && (
        <p className="text-red-600 text-xs bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className="w-full bg-primary text-white font-display py-4 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-60"
      >
        <UserPlus size={20} /> {loading ? "Creating account..." : "Create Account"}
      </motion.button>
    </motion.form>
  );
}