export async function askAI(message: string) {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_GROK_API_KEY`,
    },
    body: JSON.stringify({
      model: "grok-beta",
      messages: [
        { role: "system", content: "You are JARVIS AI assistant." },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await res.json();
  return data.choices[0].message.content;
}