export function startListening(onResult: (text: string) => void) {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event: any) => {
    const text = event.results[0][0].transcript;
    onResult(text);
  };
}