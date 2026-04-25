"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: "center" },
      {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === el) t.kill();
    });
  }, []);

  return (
    <div className="section-divider-wrap mx-auto max-w-[1280px] px-4 py-6 md:px-8">
      <div
        ref={ref}
        className="section-divider h-[2px] w-full bg-[var(--border)]"
      />
    </div>
  );
}
