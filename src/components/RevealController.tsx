"use client";

import { useEffect } from "react";

export default function RevealController() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selector = ".reveal, .reveal-from-left, .reveal-from-right, .reveal-from-bottom, .stagger, .parallax";

    const nodes = Array.from(document.querySelectorAll(selector));

    if (prefersReduced) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            try {
              observer.unobserve(entry.target);
            } catch (e) {}
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((n) => observer.observe(n));

    const safety = window.setTimeout(() => {
      nodes.forEach((n) => {
        if (!n.classList.contains("is-visible")) n.classList.add("is-visible");
      });
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return null;
}
