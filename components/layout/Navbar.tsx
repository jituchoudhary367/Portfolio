"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "HOME", num: "01." },
  { id: "about", label: "ABOUT", num: "02." },
  { id: "projects", label: "WORK", num: "03." },
  { id: "skills", label: "SKILLS", num: "04." },
  { id: "github", label: "CODE", num: "05." },
  { id: "contact", label: "CONTACT", num: "06." },
] as const;

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    const wrap = linksRef.current;
    if (!nav || !wrap) return;
    gsap.fromTo(nav, { y: -100 }, { y: 0, duration: 0.8, ease: "power3.out" });
    const links = wrap.querySelectorAll<HTMLElement>("[data-nav-link]");
    gsap.fromTo(
      links,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        delay: 0.4,
        duration: 0.5,
        ease: "power2.out",
      },
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 z-50 h-16 w-full border-b-2 border-[var(--border)] bg-[var(--bg-primary)] transition-shadow",
          scrolled && "shadow-sm backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 md:px-8">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="font-display text-2xl tracking-tight"
            data-cursor-hover
          >
            A<span className="text-[var(--accent)]">.</span>
          </button>

          <nav
            ref={linksRef}
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {SECTIONS.map(({ id, label, num }) => (
              <button
                key={id}
                type="button"
                data-nav-link
                onClick={() => scrollTo(id)}
                className={cn(
                  "font-mono-label text-xs tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                  active === id
                    ? "border-b-2 border-[var(--accent)] text-[var(--text-primary)]"
                    : "text-[var(--text-primary)] hover:text-[var(--text-primary)]",
                )}
              >
                <span className="text-[var(--text-muted)]">{num}</span> {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="hidden items-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--bg-dark)] px-4 py-2 font-mono-label text-xs text-white transition hover:bg-[var(--text-primary)] md:flex"
              data-cursor-hover
            >
              LET&apos;S CONNECT
              <ArrowUpRight className="h-4 w-4 text-[var(--accent)]" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border-2 border-[var(--border)] bg-white lg:hidden"
              aria-label="Menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--accent)] selection:bg-[var(--bg-dark)] selection:text-[var(--accent)] lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex justify-end p-4">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center border-2 border-[var(--border)] bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-6 px-8 pb-24">
              {SECTIONS.map(({ id, label, num }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className={cn(
                    "text-left font-display text-5xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bg-dark)]",
                    active === id
                      ? "bg-[var(--bg-dark)] px-4 py-2 text-[var(--text-primary)]"
                      : "text-[var(--bg-dark)]",
                  )}
                >
                  <span className="font-mono-label text-lg">{num}</span>{" "}
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
