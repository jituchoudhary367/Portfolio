"use client";

export default function PaybridgeMockup() {
  return (
    <div className="relative h-44 w-full overflow-hidden border-b-2 border-[#1a1a1a] bg-gradient-to-b from-[#0b0b0b] to-[#121212] p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-8 flex-1 rounded border border-white/10 bg-white/5 px-2 py-1 font-mono-label text-[8px] text-white/50">
          PAYOUT RUN #8842
        </div>
        <div className="rounded border border-[var(--accent)]/50 bg-[var(--accent)]/15 px-2 py-1 font-mono-label text-[8px] text-[var(--accent)]">
          LIVE
        </div>
      </div>
      <div className="space-y-2">
        {[0.85, 0.55, 0.72].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white/30" />
            <div
              className="h-2 rounded-full bg-white/15"
              style={{ width: `${w * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 right-3 rounded border border-white/10 bg-black/50 px-2 py-1 font-mono-label text-[8px] text-white/60">
        STRIPE · LEDGER
      </div>
    </div>
  );
}
