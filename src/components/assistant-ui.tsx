"use client";

import { useState } from "react";

export default function AssistantUI() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔊 TEXT TO SPEECH
  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  // 🎤 VOICE START (FIXED)
  const startVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      handleSend(text);
    };

    recognition.onerror = (e: any) => {
      console.log("Voice Error:", e.error);
    };

    recognition.start();
  };

  // 🤖 SEND MESSAGE
  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setHistory((prev) => [...prev, "You: " + text]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const reply = data.reply || "No response";

      setHistory((prev) => [...prev, "JARVIS: " + reply]);

      speak(reply);
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        "JARVIS: ERROR CONNECTING TO AI",
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center p-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">
        🤖 JARVIS AI ASSISTANT
      </h1>

      {/* CHAT BOX */}
      <div className="w-full max-w-xl h-80 border border-green-500 p-3 overflow-y-auto mb-4">
        {history.map((msg, i) => (
          <p key={i} className="mb-2">
            {msg}
          </p>
        ))}

        {loading && (
          <p className="text-yellow-400 animate-pulse">
            Thinking...
          </p>
        )}
      </div>

      {/* INPUT */}
      <div className="flex gap-2 w-full max-w-xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 bg-black border border-green-500 text-green-400"
          placeholder="Type message..."
        />

        <button
          onClick={() => {
            handleSend(input);
            setInput("");
          }}
          className="bg-green-600 text-black px-4 py-2 font-bold"
        >
          Send
        </button>
      </div>

      {/* 🎤 VOICE BUTTON (FIXED & ALWAYS VISIBLE) */}
      <button
        onClick={startVoice}
        className="bg-green-500 text-black px-4 py-2 rounded font-bold mt-4"
      >
        🎤 Speak
      </button>

    </div>
  );
}