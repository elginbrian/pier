"use client";

import { useEffect, useRef } from "react";

export default function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      node.classList.add("is-visible");
      return;
    }

    const obsOptions = options || { threshold: 0.12, rootMargin: "0px 0px -8% 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          try {
            observer.unobserve(entry.target);
          } catch (e) {}
        }
      });
    }, obsOptions);

    observer.observe(node);

    const safety = window.setTimeout(() => {
      if (node && !node.classList.contains("is-visible")) node.classList.add("is-visible");
    }, 2200);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [ref, options]);

  return ref;
}
