import { NextResponse } from "next/server";
import { snap } from "@/lib/midtrans";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Kamu harus login dulu." }, { status: 401 });
  }

  const { gameId } = await request.json();

  const { data: game } = await supabase
    .from("games")
    .select("id, title, price, is_free")
    .eq("id", gameId)
    .single();

  if (!game) {
    return NextResponse.json({ error: "Game tidak ditemukan." }, { status: 404 });
  }

  if (game.is_free) {
    return NextResponse.json({ error: "Game ini gratis, tidak perlu checkout." }, { status: 400 });
  }

  // Cek apakah user udah punya game ini
  const { data: existing } = await supabase
    .from("user_library")
    .select("id")
    .eq("user_id", user.id)
    .eq("game_id", gameId)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "Kamu sudah memiliki game ini." }, { status: 400 });
  }

  const orderId = `PXV-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const amount = Math.round(Number(game.price));

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const transactionParams = {
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
    customer_details: {
      first_name: profile?.username || "Player",
      email: user.email,
    },
    item_details: [
      {
        id: game.id,
        price: amount,
        quantity: 1,
        name: game.title,
      },
    ],
  };

  try {
    const transaction = await snap.createTransaction(transactionParams);

    await supabase.from("orders").insert({
      user_id: user.id,
      game_id: game.id,
      order_id: orderId,
      amount,
      status: "pending",
    });

    return NextResponse.json({ token: transaction.token, orderId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal membuat transaksi." }, { status: 500 });
  }
}