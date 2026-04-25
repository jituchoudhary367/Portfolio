"use client";

import { useEffect, useState } from "react";

const WORDS = ["BUILDER", "THINKER", "SHIPPER"] as const;

export function useTypewriter(intervalMs = 2000) {
  const [index, setIndex] = useState(0);
  const word = WORDS[index % WORDS.length];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return { word, index };
}
