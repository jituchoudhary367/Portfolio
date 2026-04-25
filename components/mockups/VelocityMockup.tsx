"use client";

export default function VelocityMockup() {
  return (
    <div className="relative h-44 w-full overflow-hidden border-b-2 border-[#1a1a1a] bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="h-2 w-20 rounded-full bg-[var(--accent)]/80" />
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[40, 65, 48, 72, 55, 80].map((h, i) => (
          <div
            key={i}
            className="rounded-sm bg-white/10"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-3 h-10 rounded border border-white/10 bg-black/40 backdrop-blur-sm" />
    </div>
  );
}
