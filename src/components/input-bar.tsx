"use client";

import { useState } from "react";

export default function InputBar({ onSend }: any) {
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask JARVIS..."
        className="flex-1 bg-black border border-cyan-500 text-cyan-300 p-2 rounded outline-none"
      />

      <button
        onClick={send}
        className="bg-cyan-500 px-4 py-2 rounded text-black font-bold"
      >
        Send
      </button>
    </div>
  );
}