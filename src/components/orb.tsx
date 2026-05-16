export default function Orb() {
  return (
    <div className="flex justify-center items-center py-10">

      <div className="relative">

        {/* outer waves */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30" />
        <div className="absolute inset-0 rounded-full border border-blue-500 animate-pulse opacity-40" />

        {/* core orb */}
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_60px_#00ffff] animate-pulse flex items-center justify-center">

          <div className="w-10 h-10 bg-white rounded-full opacity-70" />

        </div>

      </div>
    </div>
  );
}