"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const interactiveCleanup = useRef<Array<() => void>>([]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4 });
    };

    const onEnter = () => {
      gsap.to(ring, {
        scale: 2.5,
        backgroundColor: "rgba(0,255,136,0.15)",
        duration: 0.3,
      });
    };
    const onLeave = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.3,
      });
    };

    const bindInteractive = () => {
      interactiveCleanup.current.forEach((fn) => fn());
      interactiveCleanup.current = [];
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((node) => {
        const el = node as HTMLElement;
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        interactiveCleanup.current.push(() => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    };

    document.addEventListener("mousemove", moveCursor);
    bindInteractive();
    const mo = new MutationObserver(() => bindInteractive());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      mo.disconnect();
      interactiveCleanup.current.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="pointer-events-none hidden md:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] bg-transparent"
      />
    </div>
  );
}
