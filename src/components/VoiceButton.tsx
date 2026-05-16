"use client";

type Props = {
  onResult: (text: string) => void;
};

export default function VoiceButton({ onResult }: Props) {
  const startVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text); // send to AI
    };
  };

  return (
    <button
      onClick={startVoice}
      className="px-4 py-2 bg-green-500 text-black rounded"
    >
      🎤 Speak
    </button>
  );
}