"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  Braces,
  Cloud,
  Code2,
  Plus,
  Server,
} from "lucide-react";
import DotGrid from "@/components/ui/DotGrid";
import MagneticButton from "@/components/ui/MagneticButton";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

function ZigzagBottom() {
  const d = Array.from({ length: 24 })
    .map((_, i) => {
      const x = i * 12;
      const y = i % 2 === 0 ? 0 : 10;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      className="absolute bottom-0 left-0 w-full text-[var(--border)]"
      viewBox="0 0 288 12"
      preserveAspectRatio="none"
      height="12"
      aria-hidden
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ZigzagRightEdge() {
  const d = Array.from({ length: 14 })
    .map((_, i) => {
      const y = i * 10;
      const x = i % 2 === 0 ? 0 : 8;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      className="pointer-events-none absolute right-0 top-1/4 hidden h-48 w-3 text-[var(--border)] lg:block"
      viewBox="0 0 10 140"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function HalftoneBottomLeft() {
  return (
    <svg
      className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 opacity-40"
      viewBox="0 0 120 120"
      aria-hidden
    >
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 6 }).map((__, c) => {
          const size = 3 + (r + c) * 0.35;
          return (
            <circle
              key={`${r}-${c}`}
              cx={10 + c * 18}
              cy={100 - r * 16}
              r={size}
              fill="rgba(0,0,0,0.12)"
            />
          );
        }),
      )}
    </svg>
  );
}

/** Stippled half-arch on the right edge (reference decoration). */
function HalftoneArchRight() {
  return (
    <svg
      className="pointer-events-none absolute -right-8 bottom-0 top-24 hidden w-32 opacity-[0.35] md:block"
      viewBox="0 0 80 200"
      aria-hidden
    >
      {Array.from({ length: 12 }).map((_, r) =>
        Array.from({ length: 5 }).map((__, c) => {
          const cx = 70 - c * 12;
          const cy = 20 + r * 14;
          const rDot = 1.2 + (c + r) * 0.15;
          return (
            <circle
              key={`a-${r}-${c}`}
              cx={cx}
              cy={cy}
              r={rDot}
              fill="rgba(0,0,0,0.14)"
            />
          );
        }),
      )}
    </svg>
  );
}

function TypewriterWord({ word }: { word: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={word}
        className="inline-flex"
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.03 } },
        }}
      >
        {word.split("").map((ch, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.2 }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}

const ROLE_WORDS = ["BUILDER", "THINKER", "SHIPPER"] as const;

function RoleStepLabels({ activeWord }: { activeWord: string }) {
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--border-light)] pt-3 font-mono-label text-[10px] tracking-wide">
      {ROLE_WORDS.map((role, i) => (
        <span
          key={role}
          className={cn(
            activeWord === role
              ? "text-[var(--accent)]"
              : "text-[var(--text-muted)]",
          )}
        >
          {String(i + 1).padStart(2, "0")} {role}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const { word } = useTypewriter(2200);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          ".hero-word",
          { opacity: 0, y: 80, skewY: 5 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.2",
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1 },
          "-=0.2",
        )
        .fromTo(
          ".hero-card",
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.2)",
          },
          "-=0.5",
        );
    },
    { scope: root },
  );

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  const techItems = [
    { icon: Code2, name: "REACT" },
    { icon: Server, name: "NODE.JS" },
    { icon: Braces, name: "PYTHON" },
    { icon: Cloud, name: "AWS" },
  ] as const;

  return (
    <section
      id="hero"
      ref={root}
      className="relative overflow-hidden border-b-2 border-[var(--border)] pt-24 pb-24 md:pt-28 md:pb-32"
    >
      {/* Base dot texture */}
      <DotGrid className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45]" />
      {/* Top-center dot cluster */}
      <div className="pointer-events-none absolute left-1/2 top-16 -z-10 h-40 w-[min(100%,28rem)] -translate-x-1/2 opacity-60 md:top-20">
        <DotGrid className="h-full w-full" />
      </div>
      {/* Bottom-left dot cluster */}
      <div className="pointer-events-none absolute bottom-28 left-0 -z-10 h-48 w-56 opacity-50">
        <DotGrid className="h-full w-full" />
      </div>

      {/* Large wireframe circle — left (reference) */}
      <svg
        className="pointer-events-none absolute -left-8 top-28 -z-10 hidden h-[min(100vw,220px)] w-[min(100vw,220px)] text-[var(--border)] md:block"
        viewBox="0 0 120 120"
        aria-hidden
      >
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <HalftoneBottomLeft />
      <HalftoneArchRight />
      <ZigzagRightEdge />

      <div className="relative z-10 mx-auto grid max-w-[1280px] gap-12 px-4 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:px-8">
        <div>
          <p className="hero-label font-mono-label mb-4 text-xs text-[var(--accent)] cursor-blink">
            AVAILABLE FOR WORK →
          </p>
          <h1 className="font-display text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--text-primary)]">
            <span className="hero-word block">BUILDING</span>
            <span className="hero-word block">DIGITAL</span>
            <span className="hero-word inline-flex items-end gap-2 md:gap-3">
              <span>SYSTEMS</span>
              <span
                className="mb-[0.15em] inline-block h-[0.28em] min-h-[10px] w-[0.28em] min-w-[10px] bg-[var(--accent)] shadow-[2px_2px_0_#0d0d0d]"
                aria-hidden
              />
            </span>
          </h1>
          <p className="hero-sub font-mono-label mt-6 max-w-xl border-2 border-[var(--border)] bg-white px-4 py-3 text-[11px] leading-relaxed tracking-wide text-[var(--text-secondary)]">
            FULL-STACK DEVELOPER. SYSTEMS THINKER. CODE THAT SHIPS.
          </p>
          <div className="hero-cta mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              type="button"
              onClick={scrollToProjects}
              className="flex items-center gap-2 border-2 border-[var(--border)] bg-[var(--bg-dark)] px-6 py-3 font-mono-label text-xs text-white shadow-[4px_4px_0_#0d0d0d] transition hover:-translate-y-0.5"
            >
              VIEW WORK
              <ArrowDownRight className="h-4 w-4 text-[var(--accent)]" />
            </MagneticButton>
            <button
              type="button"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="flex h-12 w-12 items-center justify-center border-2 border-[var(--border)] bg-white shadow-[4px_4px_0_#0d0d0d]"
              aria-label="Go to contact"
            >
              <span className="h-3 w-3 rounded-full bg-[var(--accent)] ring-2 ring-[var(--accent)]/30" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* STATUS */}
          <div className="hero-card brutal-card relative overflow-hidden p-5 md:p-6">
            <span
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border border-[var(--border)] bg-white font-mono-label text-sm leading-none text-[var(--text-primary)]"
              aria-hidden
            >
              <Plus className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <p className="mb-4 font-mono-label text-[10px] font-bold tracking-[0.2em] text-[var(--text-primary)]">
              STATUS
            </p>
            <div className="flex items-center gap-4 pr-8">
              <div
                className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--accent)]/15 md:h-[4.5rem] md:w-[4.5rem]"
                aria-hidden
              >
                <span className="absolute inline-flex h-10 w-10 animate-ping rounded-full bg-[var(--accent)]/35" />
                <span className="relative h-10 w-10 rounded-full bg-[var(--accent)] ring-4 ring-[var(--accent)]/25" />
              </div>
              <p className="font-display text-left text-[clamp(1.25rem,3.5vw,2rem)] leading-[1.05] tracking-wide">
                CURRENTLY: OPEN TO ROLES
              </p>
            </div>
          </div>

          {/* TECH STACK */}
          <div className="hero-card brutal-card relative overflow-hidden p-5 md:p-6">
            <span
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border border-[var(--border)] bg-white font-mono-label text-sm leading-none text-[var(--text-primary)]"
              aria-hidden
            >
              <Plus className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <p className="mb-4 font-mono-label text-[10px] font-bold tracking-[0.2em] text-[var(--text-primary)]">
              TECH STACK
            </p>
            <div className="flex items-stretch justify-between gap-1 pr-6 sm:gap-2">
              {techItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="flex min-w-0 flex-1 items-stretch">
                    <div className="flex flex-1 flex-col items-center gap-2 py-1">
                      <Icon
                        className="h-5 w-5 text-[var(--accent)] sm:h-6 sm:w-6"
                        strokeWidth={1.5}
                      />
                      <span className="text-center font-mono-label text-[9px] tracking-wide text-[var(--text-secondary)] sm:text-[10px]">
                        {item.name}
                      </span>
                    </div>
                    {idx < techItems.length - 1 && (
                      <div
                        className="mx-0.5 w-px shrink-0 bg-[var(--border)] opacity-60 sm:mx-1"
                        aria-hidden
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* I AM A */}
          <div className="hero-card brutal-card relative min-h-[200px] overflow-hidden p-5 md:min-h-[220px] md:p-6">
            <span
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border border-[var(--border)] bg-white font-mono-label text-sm leading-none text-[var(--text-primary)]"
              aria-hidden
            >
              <Plus className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <p className="mb-3 font-mono-label text-[10px] font-bold tracking-[0.2em] text-[var(--text-primary)]">
              I AM A
            </p>
            <div className="font-display text-5xl leading-none md:text-6xl">
              <TypewriterWord word={word} />
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden bg-[var(--border-light)]">
              <motion.div
                key={word}
                className="h-full bg-[var(--accent)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
              />
            </div>
            <RoleStepLabels activeWord={word} />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-6 rounded-full border-2 border-[var(--border)] bg-white/80">
            <div className="scroll-wheel-dot mx-auto mt-2 h-2 w-1 rounded-full bg-[var(--accent)]" />
          </div>
          <span className="max-w-[14rem] text-center font-mono-label text-[9px] leading-tight tracking-[0.18em] text-[var(--text-muted)]">
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>
      <ZigzagBottom />
    </section>
  );
}
