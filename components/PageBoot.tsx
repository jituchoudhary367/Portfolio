"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function PageBoot() {
  useLayoutEffect(() => {
    gsap.fromTo(
      "body",
      { backgroundColor: "#0d0d0d" },
      { backgroundColor: "#f5f4ef", duration: 0.6, ease: "power2.out" },
    );
  }, []);
  return null;
}
