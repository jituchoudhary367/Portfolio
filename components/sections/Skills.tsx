"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
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
  Star,
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

type MetricDef = { label: string; value: string; Icon: typeof Gauge; desc?: string };

const metricsBySkill: Record<string, MetricDef[]> = {
  "01": [
    { label: "Scalability", value: "10X", Icon: Gauge, desc: "Systems designed to handle 10x growth without re-architecture." },
    { label: "Uptime", value: "99.9%", Icon: Clock, desc: "High availability systems with resilient infrastructure." },
    { label: "Cost reduction", value: "40%", Icon: DollarSign, desc: "Optimized cloud usage and efficient resource allocation." },
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

        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="shrink-0">
              <p className="font-mono-label mb-2 flex items-center gap-2 text-xs text-[var(--accent)]">
                <span>MY CAPABILITIES</span>
                <span className="h-1.5 w-1.5 bg-[var(--accent)]" aria-hidden />
              </p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.85] text-[var(--text-primary)]">
                CAPABILITIES<br />THAT DRIVE IMPACT<span className="text-[var(--accent)]">.</span>
              </h2>
            </div>
            <div className="relative flex-1 lg:pt-10">
              <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-secondary)]">
                I combine technical depth with systems thinking to build scalable,
                efficient, and user-focused solutions.
              </p>
              <div className="absolute -right-4 top-0 hidden lg:block">
                <svg className="h-20 w-20 text-[var(--border)] opacity-20" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
                <div className="absolute left-full top-1/2 ml-4 -translate-y-1/2">
                   <Zigzag />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 items-stretch lg:grid-cols-[420px_1fr]">
          <div className="flex flex-col justify-between h-full">
            {SKILLS.map((s) => {
              const Icon = s.Icon;
              const isOpen = active.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s)}
                  className={cn(
                    "brutal-card group relative flex w-full items-center gap-5 p-5 text-left transition-all",
                    isOpen
                      ? "!bg-[var(--bg-dark)] text-white ring-2 ring-[var(--accent)]"
                      : "bg-white hover:bg-[var(--bg-primary)]",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[var(--border)] transition-colors",
                      isOpen
                        ? "border-white/20 bg-white/5 text-[var(--accent)]"
                        : "bg-transparent text-[var(--text-primary)] group-hover:border-[var(--accent)]",
                    )}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn(
                      "font-mono-label text-[10px] tracking-widest",
                      isOpen ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                    )}>
                      {s.id}
                    </span>
                    <span className={cn(
                      "block font-display text-xl tracking-tight",
                      isOpen ? "text-white" : "text-[var(--text-primary)]"
                    )}>
                      {s.title}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block line-clamp-1 text-[11px]",
                        isOpen ? "text-white/60" : "text-[var(--text-secondary)]",
                      )}
                    >
                      {s.desc}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 transition-colors",
                      isOpen ? "text-[var(--accent)]" : "text-[var(--border)]",
                    )}
                  >
                    {isOpen ? <Minus className="h-5 w-5" strokeWidth={3} /> : <Plus className="h-5 w-5" strokeWidth={2} />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex flex-col">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="brutal-card relative flex h-full flex-col bg-[var(--bg-card)] p-8 lg:p-10 pr-12"
              >
                <div className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center bg-[var(--bg-dark)] text-white">
                  <X className="h-5 w-5" strokeWidth={2.5} />
                </div>

                <div className="mb-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-4">
                    <p className="font-mono-label text-xs tracking-widest text-[var(--accent)]">
                      {active.id}
                    </p>
                    <h3 className="font-display text-4xl tracking-tight text-[var(--text-primary)]">
                      {active.title}
                    </h3>
                    <p className="max-w-xl text-[15px] leading-relaxed text-[var(--text-secondary)]">
                      {SKILL_LONG[active.id] ?? active.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-center border-b-2 border-[var(--border)] pb-8">
                    <Diagram id={active.id} />
                  </div>
                </div>

                <div className="relative grid gap-12 border-t-2 border-[var(--border)] pt-10 lg:grid-cols-[1fr_0.8fr]">
                  {/* Vertical Divider */}
                  <div className="absolute bottom-0 left-[55%] top-10 hidden w-px bg-[var(--border)] opacity-20 lg:block" />

                  <div className="pr-4">
                    <p className="font-mono-label mb-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[var(--text-primary)]">
                      <BarChart3 className="h-3.5 w-3.5" />
                      USED IN
                    </p>
                    <div className="space-y-6">
                      {miniProjects.map((p) => (
                        <a
                          key={p.id}
                          href={p.href}
                          className="group flex gap-4 transition-transform hover:-translate-y-0.5"
                        >
                          <div className="h-16 w-24 shrink-0 border-2 border-[var(--border)] bg-[var(--bg-primary)] overflow-hidden">
                             {/* Placeholder for project thumbnail */}
                             <div className="h-full w-full bg-gradient-to-br from-zinc-100 to-zinc-300 opacity-50 transition-opacity group-hover:opacity-80" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="font-display text-base text-[var(--text-primary)]">
                              {p.title}
                            </p>
                            <p className="mb-1 text-[11px] leading-tight text-[var(--text-secondary)]">
                              {p.subtitle}
                            </p>
                            <span className="flex items-center gap-1 font-mono-label text-[10px] font-bold text-[var(--accent)]">
                              View Project <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="pl-4">
                    <p className="font-mono-label mb-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[var(--text-primary)]">
                      <Gauge className="h-3.5 w-3.5" />
                      RESULTS
                    </p>
                    <div className="divide-y divide-[var(--border)] divide-opacity-10">
                      {(metricsBySkill[active.id] ?? metricsBySkill["01"]).map(
                        (m) => {
                          const MIcon = m.Icon;
                          return (
                            <div
                              key={m.label}
                              className="flex items-center gap-6 py-4 first:pt-0 last:pb-0"
                            >
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--bg-dark)] text-white shadow-[3px_3px_0_var(--accent)]">
                                <MIcon className="h-5 w-5" />
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="font-display text-2xl leading-none text-[var(--accent)]">
                                    {m.value}
                                  </span>
                                  <span className="font-mono-label text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)]">
                                    {m.label}
                                  </span>
                                </div>
                                {m.desc && (
                                  <p className="mt-1 max-w-[200px] text-[10px] leading-tight text-[var(--text-secondary)]">
                                    {m.desc}
                                  </p>
                                )}
                              </div>
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

        <div className="mt-8">
           <div className="brutal-card flex min-h-[80px] items-center bg-white">
             <div className="flex h-full items-center gap-4 border-r-2 border-[var(--border)] px-8 py-6">
               <Star className="h-5 w-5 text-[var(--accent)]" />
               <span className="font-mono-label text-[11px] font-bold tracking-[0.2em] text-[var(--text-primary)] uppercase">APPROACH</span>
             </div>
             
             <div className="flex flex-1 flex-nowrap items-center justify-between gap-2 px-4 overflow-x-auto md:px-12 scrollbar-hide">
                {[
                  "Understand Problem",
                  "Define Requirements",
                  "Design Architecture",
                  "Build & Integrate",
                  "Optimize & Iterate",
                ].map((step, i, arr) => (
                  <div key={step} className="flex shrink-0 items-center gap-4 lg:gap-12">
                    <span className="font-mono-label text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)] whitespace-nowrap">{step}</span>
                    {i < arr.length - 1 && (
                      <ArrowRight className="approach-arrow h-4 w-4 shrink-0 text-[var(--accent)]" />
                    )}
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
