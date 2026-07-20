export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.04)_1px,transparent_1px)] bg-[size:55px_55px]" />

      <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full bg-violet-600/10 blur-[130px]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070b]/40 to-[#05070b]" />
    </div>
  );
}