"use client";

import { useState } from "react";
import VoiceButton from "@/components/VoiceButton";
import { speak } from "@/lib/speak";

export default function Page() {
  const [chat, setChat] = useState<{ user: string; ai: string }[]>([]);

  const handleAI = async (message: string) => {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    const reply = data.reply;

    // 💾 store conversation
    setChat((prev) => [...prev, { user: message, ai: reply }]);

    // 🔊 optional voice (can keep ON/OFF later)
    speak(reply);
  };

  return (
    <div className="h-screen bg-black text-green-400 p-6 flex flex-col items-center">
      
      <h1 className="text-3xl mb-6">JARVIS ASSISTANT</h1>

      <VoiceButton onResult={(text) => handleAI(text)} />

      {/* 💬 CHAT DISPLAY */}
      <div className="mt-6 w-full max-w-2xl space-y-4">
        {chat.map((c, i) => (
          <div key={i} className="border border-green-500/30 p-3 rounded">
            
            <p className="text-blue-400">
              👤 You: {c.user}
            </p>

            <p className="text-green-300 mt-1">
              🤖 Jarvis: {c.ai}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}