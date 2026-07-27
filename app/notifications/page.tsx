import { redirect } from "next/navigation";
import { Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotificationItem from "@/components/notifications/NotificationItem";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function NotificationsPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar showLauncher={false} />
      <main className="max-w-2xl mx-auto px-6 md:px-16 pt-32 pb-24">
        <div className="flex items-center gap-3 mb-8">
          <Bell size={24} className="text-primary" />
          <h1 className="text-3xl font-display text-ink-rich">Notifications</h1>
        </div>

        {!notifications || notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={32} className="mx-auto text-ink-muted mb-3" />
            <p className="text-ink-muted">Belum ada notifikasi.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                id={notif.id}
                type={notif.type}
                actorUsername={notif.actor_username}
                isRead={notif.is_read}
                createdAt={notif.created_at}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}