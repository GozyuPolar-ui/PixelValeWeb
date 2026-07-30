"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const FriendPreviewModal = dynamic(() => import("./FriendPreviewModal"));

type Friend = {
  friendshipId: string;
  userId: string;
  username: string;
  avatarUrl: string;
};

type Props = {
  friends: Friend[];
  pendingRequests: Friend[];
  userId: string;
};

export default function FriendsSection({ friends, pendingRequests, userId }: Props) {
  const [searchUsername, setSearchUsername] = useState("");
  const [message, setMessage] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const [previewData, setPreviewData] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const openPreview = async (username: string) => {
    setShowPreview(true);
    setPreviewLoading(true);
    const res = await fetch(`/api/friend-preview?username=${encodeURIComponent(username)}`);
    const data = await res.json();
    setPreviewData(data);
    setPreviewLoading(false);
  };

  const handleAddFriend = async () => {
    setMessage("");
    if (!searchUsername.trim()) return;

    const { data: targetProfile } = await supabase
      .from("profiles")
      .select("id, username")
      .eq("username", searchUsername.trim())
      .single();

    if (!targetProfile) {
      setMessage("Username tidak ditemukan.");
      return;
    }

    if (targetProfile.id === userId) {
      setMessage("Tidak bisa add diri sendiri.");
      return;
    }

    const { data: newFriendship, error } = await supabase
      .from("friendships")
      .insert({ requester_id: userId, addressee_id: targetProfile.id })
      .select()
      .single();

    if (error) {
      setMessage("Request sudah pernah dikirim atau terjadi kesalahan.");
      return;
    }

    const { data: myProfile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single();

    await supabase.from("notifications").insert({
      user_id: targetProfile.id,
      actor_id: userId,
      actor_username: myProfile?.username || "Someone",
      type: "friend_request",
      related_id: newFriendship.id,
    });

    setMessage("Friend request terkirim!");
    setSearchUsername("");
    router.refresh();
  };

  const handleAccept = async (friendshipId: string, requesterId: string) => {
    await supabase.from("friendships").update({ status: "accepted" }).eq("id", friendshipId);

    const { data: myProfile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single();

    await supabase.from("notifications").insert({
      user_id: requesterId,
      actor_id: userId,
      actor_username: myProfile?.username || "Someone",
      type: "friend_accepted",
      related_id: friendshipId,
    });

    router.refresh();
  };

  const handleDecline = async (friendshipId: string) => {
    await supabase.from("friendships").delete().eq("id", friendshipId);
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-paper-dark border border-outline-variant rounded-lg p-6"
    >
      <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
        <Users size={20} className="text-secondary" /> Friends
      </h3>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          placeholder="Cari username..."
          className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          onClick={handleAddFriend}
          className="bg-primary text-white px-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <UserPlus size={16} />
        </button>
      </div>
      {message && <p className="text-xs text-ink-muted mb-4">{message}</p>}

      {pendingRequests.length > 0 && (
        <div className="mb-6 space-y-3">
          <p className="text-xs font-bold text-primary uppercase tracking-wide">Requests</p>
          {pendingRequests.map((req) => (
            <div key={req.friendshipId} className="flex items-center justify-between">
              <span className="font-semibold text-sm">{req.username}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleAccept(req.friendshipId, req.userId)}
                  className="p-1.5 bg-secondary/10 text-secondary rounded hover:bg-secondary/20"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => handleDecline(req.friendshipId)}
                  className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {friends.length === 0 ? (
          <p className="text-xs text-ink-muted">Belum ada teman. Cari username buat nambah!</p>
        ) : (
            friends.map((friend) => (
            <button
              key={friend.friendshipId}
              onClick={() => openPreview(friend.username)}
              className="flex items-center gap-3 hover:bg-surface-container-low rounded-lg p-1 -m-1 transition-colors w-full text-left"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-secondary-fixed flex items-center justify-center text-xs font-bold text-secondary shrink-0">
                {friend.avatarUrl ? (
                  <Image src={friend.avatarUrl} alt={friend.username} fill className="object-cover" />
                ) : (
                  friend.username.charAt(0).toUpperCase()
                )}
              </div>
              <span className="font-semibold text-sm">{friend.username}</span>
            </button>
          ))
        )}
      </div>
      {showPreview && (
        <FriendPreviewModal
          data={previewData}
          loading={previewLoading}
          onClose={() => setShowPreview(false)}
        />
      )}
    </motion.div>
  );
}