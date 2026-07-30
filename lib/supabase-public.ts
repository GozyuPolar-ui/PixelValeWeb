import { createClient } from "@supabase/supabase-js";

// Client tanpa cookies — khusus dipakai di dalam unstable_cache()
// buat query data publik (yang sama buat semua orang, nggak butuh info user login).
export function createPublicSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}