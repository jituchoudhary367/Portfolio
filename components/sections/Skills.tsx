"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Clock,
  Cloud,
  Code2,
  Database,
  DollarSign,
  Gauge,
  Minus,
  Plus,
  Sparkles,
  User,
  X,
} from "lucide-react";
import {
  DiagramCloudDevOps,
  DiagramDataAnalytics,
  DiagramFullStack,
  DiagramProductThinking,
  DiagramSystemDesign,
} from "@/components/skills/SkillDiagrams";
import { projects } from "@/lib/projects";
import DotGrid from "@/components/ui/DotGrid";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function IconStackedCubes({
  className,
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 17 6v5l-5 3-5-3V6l5-3Z" />
      <path d="M7 9 12 6l5 3v5l-5 3-5-3V9Z" opacity="0.85" />
      <path d="M5 13 10 10l5 3v5l-5 3-5-3v-5Z" opacity="0.7" />
    </svg>
  );
}

type SkillRow = {
  id: string;
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const SKILLS: SkillRow[] = [
  {
    id: "01",
    title: "SYSTEM DESIGN",
    desc: "Designing scalable, maintainable systems that grow with demand.",
    Icon: IconStackedCubes,
  },
  {
    id: "02",
    title: "FULL-STACK ENGINEERING",
    desc: "End-to-end development with clean code and modern best practices.",
    Icon: Code2,
  },
  {
    id: "03",
    title: "DATA & ANALYTICS",
    desc: "Turning raw data into actionable insights and business value.",
    Icon: Database,
  },
  {
    id: "04",
    title: "CLOUD & DEVOPS",
    desc: "Building secure, reliable, and automated cloud infrastructure.",
    Icon: Cloud,
  },
  {
    id: "05",
    title: "PRODUCT THINKING",
    desc: "Solving real problems with empathy, iterate fast, and deliver value.",
    Icon: User,
  },
];

const SKILL_LONG: Record<string, string> = {
  "01":
    "I approach architecture as layered contracts: clear boundaries between presentation, application, data, and infrastructure so each tier can scale and fail independently while staying observable end to end.",
  "02":
    "Shipping full-stack means owning the contract from API to UI—typed boundaries, predictable releases, and tests where they buy the most confidence.",
  "03":
    "From warehouse to dashboard, I focus on trustworthy pipelines, sane schemas, and metrics that teams can act on—not vanity charts.",
  "04":
    "Reliability is a feature: CI/CD, least-privilege access, and infrastructure as code so changes are boring in the best way.",
  "05":
    "Great products come from tight feedback loops with users—prototype fast, measure honestly, and cut scope until the core story is undeniable.",
};

function Diagram({ id }: { id: string }) {
  switch (id) {
    case "01":
      return <DiagramSystemDesign />;
    case "02":
      return <DiagramFullStack />;
    case "03":
      return <DiagramDataAnalytics />;
    case "04":
      return <DiagramCloudDevOps />;
    default:
      return <DiagramProductThinking />;
  }
}

type MetricDef = { label: string; value: string; Icon: typeof Gauge };

const metricsBySkill: Record<string, MetricDef[]> = {
  "01": [
    { label: "Scalability", value: "10X", Icon: Gauge },
    { label: "Uptime", value: "99.9%", Icon: Clock },
    { label: "Cost reduction", value: "40%", Icon: DollarSign },
  ],
  "02": [
    { label: "Velocity", value: "2X", Icon: Gauge },
    { label: "Defects", value: "-35%", Icon: Clock },
    { label: "Coverage", value: "85%", Icon: BarChart3 },
  ],
  "03": [
    { label: "Latency", value: "-60%", Icon: Gauge },
    { label: "Insights", value: "+3X", Icon: BarChart3 },
    { label: "Adoption", value: "High", Icon: Clock },
  ],
  "04": [
    { label: "Deploys", value: "Daily", Icon: Clock },
    { label: "MTTR", value: "<30m", Icon: Gauge },
    { label: "Infra", value: "IaC", Icon: BarChart3 },
  ],
  "05": [
    { label: "NPS", value: "+42", Icon: Gauge },
    { label: "Cycle", value: "-25%", Icon: Clock },
    { label: "ROI", value: "Clear", Icon: DollarSign },
  ],
};

const USED_IN_BLURBS: Record<string, string> = {
  "01":
    "Microservices-oriented analytics core with streaming ingestion and resilient workers.",
  "02":
    "Real-time collaboration layer with presence, rooms, and optimistic UI patterns.",
  "03":
    "Fault-tolerant payment routing with idempotent APIs and ledger-backed reconciliation.",
};

export default function Skills() {
  const [active, setActive] = useState(SKILLS[0]!);
  const approachRef = useRef<HTMLDivElement>(null);

  const miniProjects = useMemo(
    () =>
      projects.slice(0, 3).map((p) => ({
        ...p,
        href: p.liveUrl,
        blurb:
          USED_IN_BLURBS[p.id] ??
          p.description.slice(0, 96) + (p.description.length > 96 ? "…" : ""),
      })),
    [],
  );

  useEffect(() => {
    const root = approachRef.current;
    if (!root) return;
    const spans = root.querySelectorAll<HTMLElement>(".approach-arrow");
    const tween = gsap.fromTo(
      spans,
      { color: "#0d0d0d", textShadow: "none" },
      {
        color: "#00ff88",
        textShadow: "0 0 12px rgba(0,255,136,0.65)",
        stagger: 0.12,
        duration: 0.35,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-b-2 border-[var(--border)] py-20 md:py-24"
    >
      <DotGrid className="pointer-events-none absolute inset-0 -z-10 opacity-45" />
      <DotGrid className="pointer-events-none absolute right-0 top-24 -z-10 h-56 w-56 opacity-35" />

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="pointer-events-none absolute right-6 top-8 hidden lg:block">
          <svg
            className="mb-3 h-24 w-24 text-[var(--border)] opacity-60"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            />
          </svg>
          <svg className="h-6 w-28 text-[var(--border)]" viewBox="0 0 160 12" aria-hidden>
            <path
              d="M0,0 L10,10 L20,0 L30,10 L40,0 L50,10 L60,0 L70,10 L80,0 L90,10 L100,0 L110,10 L120,0 L130,10 L140,0 L150,10 L160,0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16">
            <div className="min-w-0 shrink-0">
              <p className="font-mono-label mb-2 flex items-center gap-2 text-xs text-[var(--accent)]">
                <span>MY CAPABILITIES</span>
                <span
                  className="inline-block h-2 w-2 bg-[var(--accent)] shadow-[1px_1px_0_#0d0d0d]"
                  aria-hidden
                />
              </p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-[var(--text-primary)]">
                <span className="inline-flex flex-wrap items-end gap-2 md:gap-3">
                  <span>
                    CAPABILITIES
                    <br />
                    THAT DRIVE IMPACT
                  </span>
                  <span
                    className="mb-[0.12em] inline-block h-[0.22em] min-h-[8px] w-[0.22em] min-w-[8px] bg-[var(--accent)] shadow-[2px_2px_0_#0d0d0d]"
                    aria-hidden
                  />
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)] lg:max-w-lg lg:pt-8">
              I combine technical depth with systems thinking to build scalable,
              efficient, and user-focused solutions.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-2">
            {SKILLS.map((s) => {
              const Icon = s.Icon;
              const isOpen = active.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s)}
                  className={cn(
                    "flex w-full items-start gap-3 border-2 border-[var(--border)] p-4 text-left transition",
                    isOpen
                      ? "border-l-4 border-l-[var(--accent)] bg-[var(--bg-dark)] text-white"
                      : "bg-white hover:bg-[var(--bg-primary)]",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--border)]",
                      isOpen
                        ? "border-white/25 bg-white/5 text-[var(--accent)]"
                        : "bg-white text-[var(--text-primary)]",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-mono-label text-[10px] text-[var(--accent)]">
                      {s.id}
                    </span>
                    <span className="block font-display text-xl tracking-wide">
                      {s.title}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-xs",
                        isOpen ? "text-white/70" : "text-[var(--text-secondary)]",
                      )}
                    >
                      {s.desc}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 font-mono-label text-xl leading-none",
                      isOpen ? "text-[var(--accent)]" : "text-[var(--text-primary)]",
                    )}
                  >
                    {isOpen ? <Minus className="h-5 w-5" strokeWidth={2.5} /> : "+"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="brutal-card relative flex flex-col gap-6 bg-[var(--bg-card)] p-6"
              >
                <span
                  className="pointer-events-none absolute right-4 top-4 text-[var(--accent)]"
                  aria-hidden
                >
                  <X className="h-5 w-5" strokeWidth={2.5} />
                </span>

                <div className="grid gap-6 pr-8 lg:grid-cols-2 lg:items-start">
                  <div>
                    <p className="font-mono-label text-xs text-[var(--accent)]">
                      {active.id} {active.title}
                    </p>
                    <h3 className="font-display mt-1 text-3xl tracking-tight text-[var(--text-primary)]">
                      {active.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {SKILL_LONG[active.id] ?? active.desc}
                    </p>
                  </div>
                  <div className="border-2 border-[var(--border)] bg-[var(--bg-primary)] p-3">
                    <Diagram id={active.id} />
                  </div>
                </div>

                <div className="grid gap-8 border-t-2 border-[var(--border-light)] pt-6 md:grid-cols-2">
                  <div>
                    <p className="font-mono-label mb-3 text-[10px] tracking-wider text-[var(--accent)]">
                      USED IN
                    </p>
                    <div className="space-y-4">
                      {miniProjects.map((p) => (
                        <a
                          key={p.id}
                          href={p.href}
                          className="block border-2 border-[var(--border)] bg-white p-3 transition hover:bg-[var(--bg-primary)]"
                        >
                          <div
                            className={cn(
                              "mb-2 h-14 w-full border border-[var(--border)] bg-gradient-to-br",
                              p.id === "01" && "from-zinc-800 to-zinc-900",
                              p.id === "02" && "from-zinc-700 to-zinc-800",
                              p.id === "03" && "from-zinc-900 to-black",
                            )}
                          />
                          <p className="font-display text-lg text-[var(--text-primary)]">
                            {p.title}
                          </p>
                          <p className="mt-1 font-mono-label text-[9px] leading-relaxed text-[var(--text-muted)]">
                            {p.subtitle}
                          </p>
                          <p className="mt-2 text-[11px] leading-snug text-[var(--text-secondary)]">
                            {p.blurb}
                          </p>
                          <span className="mt-2 inline-block font-mono-label text-[10px] text-[var(--accent)]">
                            View Project -&gt;
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-mono-label mb-3 text-[10px] tracking-wider text-[var(--accent)]">
                      RESULTS
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {(metricsBySkill[active.id] ?? metricsBySkill["01"]).map(
                        (m) => {
                          const MIcon = m.Icon;
                          return (
                            <div
                              key={m.label}
                              className="flex flex-col items-center text-center sm:items-start sm:text-left"
                            >
                              <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--bg-dark)] text-white">
                                <MIcon className="h-5 w-5" strokeWidth={1.5} />
                              </span>
                              <p className="font-display text-2xl text-[var(--accent)]">
                                {m.value}
                              </p>
                              <p className="font-mono-label text-[9px] uppercase tracking-wide text-[var(--text-muted)]">
                                {m.label}
                              </p>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div
          ref={approachRef}
          className="mt-10 border-2 border-[var(--border)] bg-[var(--bg-dark)] px-4 py-6 text-white md:px-8"
        >
          <p className="mb-4 flex items-center gap-2 font-mono-label text-xs text-[var(--accent)]">
            <Sparkles className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            APPROACH
          </p>
          <div className="flex flex-wrap items-center gap-2 font-mono-label text-[10px] md:text-xs">
            {[
              "Understand Problem",
              "Define Requirements",
              "Design Architecture",
              "Build & Integrate",
              "Optimize & Iterate",
            ].map((step, i, arr) => (
              <span key={step} className="flex flex-wrap items-center gap-2">
                <span>{step}</span>
                {i < arr.length - 1 && (
                  <span className="approach-arrow text-[var(--accent)]">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
