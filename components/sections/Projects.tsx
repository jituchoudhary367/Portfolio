"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import VelocityMockup from "@/components/mockups/VelocityMockup";
import FlowstateMockup from "@/components/mockups/FlowstateMockup";
import PaybridgeMockup from "@/components/mockups/PaybridgeMockup";
import MagneticButton from "@/components/ui/MagneticButton";
import DotGrid from "@/components/ui/DotGrid";
import { IconGithub } from "@/components/icons/BrandIcons";

gsap.registerPlugin(ScrollTrigger);

function Mockup({ id }: { id: string }) {
  if (id === "01") return <VelocityMockup />;
  if (id === "02") return <FlowstateMockup />;
  return <PaybridgeMockup />;
}

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    gsap.fromTo(
      grid.querySelectorAll(".project-card"),
      { y: 80, opacity: 0, rotation: 2 },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 75%", once: true },
      },
    );
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-b-2 border-[var(--border)] py-20 md:py-24"
    >
      <DotGrid className="pointer-events-none absolute -right-8 top-32 -z-10 h-56 w-56 opacity-40" />
      <DotGrid className="pointer-events-none absolute bottom-24 left-0 -z-10 h-48 w-48 opacity-35" />
      <svg
        className="pointer-events-none absolute right-4 top-40 -z-10 hidden h-40 w-40 text-[var(--border)] opacity-50 md:block"
        viewBox="0 0 120 120"
        aria-hidden
      >
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16">
            <div className="min-w-0 shrink-0">
              <p className="font-mono-label mb-2 flex items-center gap-2 text-xs text-[var(--accent)]">
                <span>MY WORK</span>
                <span
                  className="inline-block h-2 w-2 bg-[var(--accent)] shadow-[1px_1px_0_#0d0d0d]"
                  aria-hidden
                />
              </p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-[var(--text-primary)]">
                <span className="inline-flex flex-wrap items-end gap-2 md:gap-3">
                  <span>FEATURED PROJECTS</span>
                  <span
                    className="mb-[0.12em] inline-block h-[0.22em] min-h-[8px] w-[0.22em] min-w-[8px] bg-[var(--accent)] shadow-[2px_2px_0_#0d0d0d]"
                    aria-hidden
                  />
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)] lg:max-w-lg lg:pt-8">
              A selection of projects where I solved real problems with
              end-to-end ownership—from data model to UI polish.
            </p>
          </div>
          <MagneticButton
            type="button"
            onClick={() =>
              document.getElementById("github")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="inline-flex shrink-0 items-center gap-2 self-start border-2 border-[var(--border)] bg-[var(--bg-dark)] px-5 py-2.5 font-mono-label text-xs text-white shadow-[4px_4px_0_#0d0d0d] lg:self-auto"
          >
            ALL PROJECTS
            <ArrowRight className="h-4 w-4 text-white" strokeWidth={2} />
          </MagneticButton>
        </div>

        <div
          ref={gridRef}
          className="projects-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(active?.id === p.id ? null : p)}
              className="project-card group brutal-card relative flex flex-col overflow-hidden text-left transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between border-b-2 border-[var(--border)] p-4">
                <div>
                  <p className="font-mono-label text-xs text-[var(--accent)]">
                    {p.id}
                  </p>
                  <h3 className="font-display text-3xl text-[var(--text-primary)]">
                    {p.title}
                  </h3>
                  <p className="font-mono-label text-[11px] text-[var(--text-primary)]">
                    {p.subtitle}
                  </p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="transition-transform duration-300 group-hover:scale-[1.03]">
                  <Mockup id={p.id} />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 p-4">
                {p.techStack.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="border border-[var(--border)] bg-[var(--bg-dark)] px-2 py-1 font-mono-label text-[9px] text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center border-2 border-[var(--border)] bg-[var(--accent)] text-[var(--bg-dark)]">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              key={active.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-dark)] text-white shadow-[4px_4px_0_#0d0d0d]"
            >
              <div className="relative grid gap-8 p-6 md:grid-cols-3 md:p-8">
                <button
                  type="button"
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center border border-white/30 bg-[var(--bg-dark)] text-white hover:border-[var(--accent)]"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <div>
                  <p className="font-mono-label text-xs text-[var(--accent)]">
                    {active.number}
                  </p>
                  <h3 className="font-display mb-1 text-4xl">{active.title}</h3>
                  <p className="mb-4 font-mono-label text-xs text-white/70">
                    {active.subtitle}
                  </p>
                  <p className="mb-6 text-sm text-white/80">{active.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={active.liveUrl}
                      className="inline-flex items-center gap-2 border-2 border-[var(--border)] bg-[var(--bg-dark)] px-4 py-2 font-mono-label text-[10px] text-white"
                    >
                      LIVE DEMO
                      <ArrowUpRight
                        className="h-4 w-4 text-[var(--accent)]"
                        strokeWidth={2.5}
                      />
                    </a>
                    <a
                      href={active.codeUrl}
                      className="inline-flex items-center gap-2 border-2 border-white bg-white px-4 py-2 font-mono-label text-[10px] text-[var(--bg-dark)] hover:bg-[var(--bg-primary)]"
                    >
                      VIEW CODE
                      <IconGithub className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="overflow-hidden border border-white/10 bg-black/40">
                  <Mockup id={active.id} />
                </div>
                <div className="space-y-4 text-sm text-white/80">
                  <div>
                    <p className="font-mono-label mb-1 text-[10px] text-[var(--accent)]">
                      THE PROBLEM
                    </p>
                    <p>{active.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono-label mb-1 text-[10px] text-[var(--accent)]">
                      THE SOLUTION
                    </p>
                    <p>{active.solution}</p>
                  </div>
                  <div>
                    <p className="font-mono-label mb-1 text-[10px] text-[var(--accent)]">
                      IMPACT
                    </p>
                    <ul className="space-y-1">
                      {active.impact.map((i) => (
                        <li key={i} className="flex gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono-label mb-1 text-[10px] text-white/60">
                      TRADEOFFS
                    </p>
                    <p className="text-white/70">{active.tradeoffs}</p>
                  </div>
                  <div>
                    <p className="font-mono-label mb-1 text-[10px] text-white/60">
                      FAILURES
                    </p>
                    <p className="text-white/70">{active.failures}</p>
                  </div>
                  <div>
                    <p className="font-mono-label mb-1 text-[10px] text-white/60">
                      PERFORMANCE
                    </p>
                    <p className="text-white/90">{active.performance}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.techStack.map((t) => (
                      <span
                        key={t}
                        className="border border-white/20 bg-[var(--bg-dark)] px-2 py-1 font-mono-label text-[9px] text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
