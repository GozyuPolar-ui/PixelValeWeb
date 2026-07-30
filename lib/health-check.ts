import { createClient } from "@supabase/supabase-js";

type ServiceStatus = {
  name: string;
  status: "operational" | "degraded" | "down";
  responseTime: number;
};

async function checkService(
  name: string,
  fn: () => Promise<void>
): Promise<ServiceStatus> {
  const start = Date.now();
  try {
    await Promise.race([
      fn(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
    ]);
    const responseTime = Date.now() - start;
    return {
      name,
      status: responseTime < 800 ? "operational" : "degraded",
      responseTime,
    };
  } catch {
    return { name, status: "down", responseTime: Date.now() - start };
  }
}

export async function runHealthChecks(): Promise<ServiceStatus[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const results = await Promise.all([
    checkService("Website", async () => {
      // Selalu sukses kalau kode ini jalan (server Next.js hidup)
      return;
    }),
    checkService("Database", async () => {
      const { error } = await supabase.from("games").select("id").limit(1);
      if (error) throw error;
    }),
    checkService("Authentication", async () => {
      const { error } = await supabase.auth.getSession();
      if (error) throw error;
    }),
    checkService("File Storage", async () => {
      const { error } = await supabase.storage.from("game-images").list("", { limit: 1 });
      if (error) throw error;
    }),
  ]);

  return results;
}