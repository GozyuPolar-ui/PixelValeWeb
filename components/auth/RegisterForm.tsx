"use client";

import { motion } from "framer-motion";
import { User, Mail, UserPlus, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTos, setAgreedToTos] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreedToTos) {
      setError("You must agree to the Terms of Service.");
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

    if (data.user && !data.session) {
      setNeedsVerification(true);
      return;
    }

    router.push("/");
    router.refresh();
  };

  if (needsVerification) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 space-y-4"
      >
        <CheckCircle2 size={48} className="text-primary mx-auto" />
        <h3 className="text-lg font-display text-ink-rich">Check your inbox</h3>
        <p className="text-sm text-ink-muted max-w-xs mx-auto">
          We sent a confirmation link to <span className="font-bold">{email}</span>. Verify your
          email to finish creating your account.
        </p>
      </motion.div>
    );
  }

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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-paper-dark border-none rounded-lg p-3 pr-10 focus:ring-2 focus:ring-primary/50 outline-none mt-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-ink-muted uppercase tracking-wider font-bold">Confirm</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-paper-dark border-none rounded-lg p-3 pr-10 focus:ring-2 focus:ring-primary/50 outline-none mt-1"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-primary transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
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
          I agree to the{" "}
          <a href="/support/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/support/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </label>
      </div>

      {error && <p className="text-red-600 text-xs bg-red-50 p-3 rounded-lg">{error}</p>}

      <motion.button
        whileTap={{ scale: agreedToTos ? 0.97 : 1 }}
        disabled={loading || !agreedToTos}
        title={!agreedToTos ? "You must agree to the Terms of Service first" : undefined}
        className="w-full bg-primary text-white font-display py-4 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <UserPlus size={20} /> {loading ? "Creating account..." : "Create Account"}
      </motion.button>
    </motion.form>
  );
}