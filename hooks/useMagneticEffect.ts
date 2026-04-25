"use client";

import { useCallback, useRef, useState } from "react";

export function useMagneticEffect(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * strength;
      const y = (e.clientY - top - height / 2) * strength;
      setPos({ x, y });
    },
    [strength],
  );

  const onLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  return { ref, pos, onMove, onLeave };
}
