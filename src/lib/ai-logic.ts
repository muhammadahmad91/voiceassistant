export function getAIResponse(input: string): string {
  const text = input.toLowerCase();

  if (text.includes("hello")) return "Hello, I am JARVIS 🤖";
  if (text.includes("help")) return "You can ask me anything.";
  if (text.includes("your name")) return "I am JARVIS, your AI assistant.";
  if (text.includes("skills")) return "You are a Full Stack Developer 🚀";
  if (text.includes("projects")) return "You have built amazing UI systems.";
  if (text.includes("clear")) return "SYSTEM RESET ✔";

  return "I did not understand that command.";
}