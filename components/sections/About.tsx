"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Clock,
  Quote,
  User,
  Wrench,
} from "lucide-react";
import DotGrid from "@/components/ui/DotGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Tailwind CSS",
  "TypeScript",
  "Git",
  "Figma",
  "Vercel",
];

function Zigzag() {
  const d = Array.from({ length: 20 })
    .map((_, i) => `${i === 0 ? "M" : "L"}${i * 10},${i % 2 ? 10 : 0}`)
    .join(" ");
  return (
    <svg
      className="h-8 w-40 text-[var(--border)]"
      viewBox="0 0 200 12"
      aria-hidden
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** Large halftone-style circle on the left (reference). */
function HalftoneCircleLeft() {
  return (
    <svg
      className="pointer-events-none absolute -left-16 top-32 -z-10 hidden h-[min(90vw,320px)] w-[min(90vw,320px)] opacity-[0.35] md:block"
      viewBox="0 0 200 200"
      aria-hidden
    >
      <defs>
        <pattern
          id="about-halftone"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="rgba(0,0,0,0.12)" />
        </pattern>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#about-halftone)" />
      <circle
        cx="100"
        cy="100"
        r="98"
        fill="none"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="1"
      />
    </svg>
  );
}

function CardCornerIcon({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <span
      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border-2 border-[var(--border)] bg-[var(--bg-dark)] text-white"
      aria-hidden
      title={label}
    >
      {children}
    </span>
  );
}

const milestones = [
  {
    year: "2020",
    title: "STARTED EXPLORING",
    desc: "Writing first lines of code, learning fundamentals, and discovering how software shapes the world.",
  },
  {
    year: "2021",
    title: "LEVELING UP",
    desc: "Going deeper into full-stack development, APIs, databases, and shipping small projects end to end.",
  },
  {
    year: "2022",
    title: "SHIPPING IMPACT",
    desc: "Joining teams, owning features, and building systems that real users rely on every day.",
  },
  {
    year: "2024+",
    title: "BUILDING & BEYOND",
    desc: "Designing scalable platforms, mentoring where I can, and pushing toward what’s next.",
  },
];

export default function About() {
  const gridRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const line = lineRef.current;
    const dots = dotsRef.current;
    const tags = tagsRef.current;
    if (!grid || !line || !dots) return;

    gsap.fromTo(
      grid.querySelectorAll(".about-card"),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 80%", once: true },
      },
    );

    gsap.fromTo(
      line,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".journey-card", start: "top 70%", once: true },
      },
    );

    gsap.fromTo(
      dots.querySelectorAll(".journey-dot"),
      { scale: 0 },
      {
        scale: 1,
        stagger: 0.2,
        duration: 0.4,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".journey-card", start: "top 70%", once: true },
      },
    );

    if (tags) {
      gsap.fromTo(
        tags.querySelectorAll(".tool-tag"),
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: { trigger: tags, start: "top 85%", once: true },
        },
      );
    }
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b-2 border-[var(--border)] py-20 md:py-24"
    >
      <DotGrid className="pointer-events-none absolute right-0 top-0 -z-10 h-64 w-64 opacity-50" />
      <DotGrid className="pointer-events-none absolute bottom-20 left-1/4 -z-10 h-40 w-72 opacity-40" />
      <HalftoneCircleLeft />

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-label mb-2 flex items-center gap-2 text-xs text-[var(--text-primary)]">
              <span>ABOUT ME</span>
              <span
                className="inline-block h-2 w-2 bg-[var(--text-primary)] shadow-[1px_1px_0_#0d0d0d]"
                aria-hidden
              />
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight text-[var(--text-primary)]">
              <span className="inline-flex flex-wrap items-end gap-2 md:gap-3">
                <span>
                  THE STORY BEHIND
                  <br />
                  THE SYSTEM
                </span>
                <span
                  className="mb-[0.12em] inline-block h-[0.22em] min-h-[8px] w-[0.22em] min-w-[8px] bg-[var(--accent)] shadow-[2px_2px_0_#0d0d0d]"
                  aria-hidden
                />
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <svg
              className="h-[100px] w-[100px] shrink-0 text-[var(--border)]"
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
            <Zigzag />
          </div>
        </div>

        <div
          ref={gridRef}
          className="about-grid grid gap-6 md:grid-cols-3"
        >
          <article className="about-card brutal-card relative flex flex-col p-6 pr-14">
            <CardCornerIcon label="Bio">
              <User className="h-4 w-4" strokeWidth={1.5} />
            </CardCornerIcon>
            <p className="font-mono-label mb-3 text-xs text-[var(--text-primary)]">
              01. BIO
            </p>
            <p className="font-display mb-4 text-xl uppercase leading-snug tracking-wide">
              I WENT FROM CURIOSITY → NOW I BUILD SYSTEMS THAT SCALE.
            </p>
            <p className="mb-6 flex-1 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              I design and ship full-stack products with a bias for clarity,
              observability, and maintainability. From APIs to interfaces, I
              care about the whole system—not just the happy path.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 self-start border-2 border-[var(--border)] bg-[var(--bg-dark)] px-4 py-2 font-mono-label text-[10px] text-white"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
                aria-hidden
              />
              MORE ABOUT ME
            </button>
          </article>

          <article className="about-card brutal-card relative p-6 pr-14">
            <CardCornerIcon label="Philosophy">
              <Quote className="h-4 w-4" strokeWidth={1.5} />
            </CardCornerIcon>
            <p className="font-mono-label mb-3 text-xs text-[var(--text-primary)]">
              02. PHILOSOPHY
            </p>
            <div className="border-l-4 border-[var(--accent)] pl-4">
              <p className="font-display mb-3 text-base uppercase leading-snug tracking-wide text-[var(--text-primary)] md:text-lg">
                BUILD WITH INTENT. SOLVE REAL PROBLEMS. KEEP IT SIMPLE, MAKE IT
                POWERFUL.
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Code is not just logic. It&apos;s communication, creativity, and
                craft.
              </p>
            </div>
          </article>

          <article className="about-card brutal-card relative p-6 pr-14">
            <CardCornerIcon label="Tools">
              <Wrench className="h-4 w-4" strokeWidth={1.5} />
            </CardCornerIcon>
            <p className="font-mono-label mb-3 text-xs text-[var(--text-primary)]">
              03. TOOLS
            </p>
            <div ref={tagsRef} className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span
                  key={t}
                  className="tool-tag border-2 border-[var(--border)] bg-[var(--bg-dark)] px-2 py-1 font-mono-label text-[10px] text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        </div>

        <ScrollReveal className="mt-8">
          <div className="journey-card brutal-card relative overflow-hidden bg-[var(--bg-card)] p-6 text-[var(--text-primary)] shadow-[4px_4px_0_#0d0d0d] md:p-8">
            <Clock
              className="absolute right-5 top-5 h-5 w-5 text-[var(--text-primary)]"
              strokeWidth={1.5}
            />
            <p className="font-mono-label mb-8 text-xs text-[var(--text-primary)]">
              04. JOURNEY
            </p>

            <div ref={dotsRef} className="relative mt-2">
              <div
                ref={lineRef}
                className="journey-line pointer-events-none absolute left-[20px] right-[20px] top-[7px] z-0 h-0 border-t-2 border-dashed border-[var(--border)] opacity-30 hidden md:block"
              />
              
              <div className="relative z-10 grid gap-12 md:grid-cols-4 md:gap-6">
                {milestones.map((m) => (
                  <div key={m.year} className="flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="journey-dot mb-6 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--bg-card)] shadow-[0_0_10px_rgba(var(--accent-rgb),0.2)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-display text-2xl leading-none text-[var(--text-primary)] md:text-3xl">
                        {m.year}
                      </p>
                      <p className="font-display text-[10px] uppercase tracking-wider text-[var(--accent)] md:text-xs">
                        {m.title}
                      </p>
                      <p className="mt-2 text-[11px] leading-relaxed text-[var(--text-secondary)] md:text-xs">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
