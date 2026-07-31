import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pixelvale.my.id"),
  title: {
    default: "Pixelvale Store | Handcrafted Indie Games",
    template: "%s | Pixelvale Store",
  },
  description: "The premiere home for independent game creators. Discover cozy adventures, indie gems, and join the Vale community.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Pixelvale Store",
    title: "Pixelvale Store | Handcrafted Indie Games",
    description: "The premiere home for independent game creators.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixelvale Store",
    description: "Handcrafted indie games for explorers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="font-body overflow-x-hidden">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}