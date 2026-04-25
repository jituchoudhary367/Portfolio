"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Animation = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn";

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fromVars: gsap.TweenVars =
      animation === "fadeUp"
        ? { y: 50, opacity: 0 }
        : animation === "fadeLeft"
          ? { x: -50, opacity: 0 }
          : animation === "fadeRight"
            ? { x: 50, opacity: 0 }
            : { scale: 0.8, opacity: 0 };

    const tween = gsap.fromTo(
      el,
      fromVars,
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animation, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
