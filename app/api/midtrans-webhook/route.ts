import { NextResponse } from "next/server";
import { coreApi } from "@/lib/midtrans";
import { createClient } from "@supabase/supabase-js";

// Pakai service_role key khusus di webhook ini, karena request dari Midtrans
// tidak membawa cookie/session user
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const notification = await request.json();

  try {
    const statusResponse = await coreApi.transaction.notification(notification);
    const { order_id, transaction_status, fraud_status } = statusResponse;

    let newStatus: "paid" | "failed" | "pending" = "pending";

    if (transaction_status === "capture") {
      newStatus = fraud_status === "accept" ? "paid" : "pending";
    } else if (transaction_status === "settlement") {
      newStatus = "paid";
    } else if (["cancel", "deny", "expire"].includes(transaction_status)) {
      newStatus = "failed";
    }

    await supabaseAdmin.from("orders").update({ status: newStatus }).eq("order_id", order_id);

    if (newStatus === "paid") {
      const { data: order } = await supabaseAdmin
        .from("orders")
        .select("user_id, game_id")
        .eq("order_id", order_id)
        .single();

      if (order) {
        await supabaseAdmin
          .from("user_library")
          .upsert(
            { user_id: order.user_id, game_id: order.game_id, hours_played: 0 },
            { onConflict: "user_id,game_id" }
          );
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}