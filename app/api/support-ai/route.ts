import { NextRequest, NextResponse } from "next/server";

const SYSTEM_CONTEXT = `
Kamu adalah asisten dukungan pelanggan untuk Pixelvale Store, sebuah platform
distribusi game indie (mirip Steam/Epic Games tapi khusus game-game buatan
developer independen).

Aturan menjawab:
- Jawab singkat, jelas, dan ramah.
- Gunakan Bahasa Indonesia, kecuali user bertanya dalam bahasa lain.
- Kalau pertanyaan di luar topik platform (akun, pembelian, download,
  refund, masalah teknis game), arahkan user untuk menghubungi tim lewat
  halaman Contact Us atau Discord.
- Jangan mengarang detail kebijakan spesifik yang belum pasti (misal angka
  refund, harga, tanggal). Kalau gak yakin, arahkan ke halaman Store
  Policy / Refund Policy atau Contact Us.
`;

export async function POST(req: NextRequest) {
  let question: string;

  try {
    const body = await req.json();
    question = body.question;
  } catch {
    return NextResponse.json({ error: "Request tidak valid." }, { status: 400 });
  }

  if (!question || typeof question !== "string" || !question.trim()) {
    return NextResponse.json({ error: "Pertanyaan kosong." }, { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "AI assistant belum dikonfigurasi." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: question }] }],
          systemInstruction: { parts: [{ text: SYSTEM_CONTEXT }] },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { error: "Gagal menghubungi AI assistant." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const answer: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({
      answer: answer ?? "Maaf, aku belum bisa jawab itu. Coba hubungi tim lewat Contact Us ya.",
    });
  } catch (err) {
    console.error("Support AI error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan di server." },
      { status: 500 }
    );
  }
}