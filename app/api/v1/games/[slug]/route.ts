import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { data, error } = await supabase
    .from("games")
    .select("id, slug, title, description, genre, tags, price, is_free, developer, publisher, release_date, image_url")
    .eq("slug", params.slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}