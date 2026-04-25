"use client";

export default function Footer() {
  return (
    <footer className="border-t-2 border-[var(--border)] bg-[var(--bg-primary)] py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 text-sm text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-mono-label text-xs">
          © {new Date().getFullYear()} — BUILT WITH NEXT.JS
        </p>
        <p className="max-w-md text-right font-mono-label text-xs leading-relaxed md:text-left">
          BRUTALIST / EDITORIAL — NEON ACCENT — SHIPPED WITH CARE.
        </p>
      </div>
    </footer>
  );
}
