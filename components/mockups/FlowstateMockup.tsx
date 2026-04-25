"use client";

export default function FlowstateMockup() {
  return (
    <div className="relative h-44 w-full overflow-hidden border-b-2 border-[#1a1a1a] bg-[#0d0d0d] p-3">
      <div className="mb-2 flex gap-2">
        <div className="h-8 flex-1 rounded border border-white/10 bg-white/5" />
        <div className="h-8 w-8 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/10" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded border border-dashed border-white/15 bg-white/5"
          />
        ))}
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex gap-2">
        <div className="h-2 flex-1 rounded-full bg-[var(--accent)]/60" />
        <div className="h-2 w-10 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
