import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Sign in to Pixelvale Store and continue your adventure.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}