export default function ChatBox({ history }: any) {
  return (
    <div className="h-64 overflow-y-auto p-4 space-y-2 text-sm">

      {history.map((msg: string, i: number) => (
        <div
          key={i}
          className="bg-black/50 border border-cyan-500/20 p-2 rounded text-cyan-300"
        >
          {msg}
        </div>
      ))}

    </div>
  );
}