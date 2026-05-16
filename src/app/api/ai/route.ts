import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const reply = await askGemini(message);

    return NextResponse.json({ reply });

  } catch (error: any) {
    return NextResponse.json({
      reply: "Server Error: " + error.message,
    });
  }
}