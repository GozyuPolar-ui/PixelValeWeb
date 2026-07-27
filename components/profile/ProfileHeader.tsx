"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type Props = {
  username: string;
  avatar: string;
  banner: string;
  bio: string;
  memberSince: string;
  isOwnProfile?: boolean;
};

export default function ProfileHeader({
  username,
  avatar,
  banner,
  bio,
  memberSince,
  isOwnProfile = true,
}: Props) {
  return (
    <div className="relative mb-24">
      <div className="h-[200px] w-full rounded-lg overflow-hidden border border-outline-variant relative bg-surface-container-highest">
<Image src={banner} alt="Banner" fill className="object-cover" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-16 left-8 flex items-end gap-6"
      >
        <div className="relative">
          <div className="relative w-32 h-32 rounded-full border-4 border-surface overflow-hidden shadow-sm bg-paper-dark">
            <Image src={avatar} alt={username} fill className="object-cover" />
          </div>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-secondary border-4 border-surface rounded-full" />
        </div>

          <div className="mb-2 bg-surface/95 backdrop-blur-sm px-4 py-2 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold font-display text-ink-rich leading-none mb-1">
            {username}
          </h1>
          <p className="text-xs text-ink-muted mb-2">Member since {memberSince}</p>
          {bio && <p className="text-sm text-ink-rich max-w-md">{bio}</p>}
        </div>

        {isOwnProfile && (
          <div className="mb-2 ml-auto">
            <Link href="/profile/edit">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
              >
                Edit Profile
              </motion.button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}