"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NumberCounter({
  target,
  suffix = "",
  prefix = "",
  className,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const obj = useRef({ val: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    obj.current.val = 0;
    const tween = gsap.to(obj.current, {
      val: target,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => setDisplay(Math.round(obj.current.val)),
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
