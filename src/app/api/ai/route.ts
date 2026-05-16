import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are JARVIS AI assistant.\nUser: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    console.log("GEMINI RAW:", data);

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.error?.message ||
      "No response from Gemini";

    return NextResponse.json({ reply });

  } catch (error: any) {
    return NextResponse.json({
      reply: "Server Error: " + error.message,
    });
  }
}