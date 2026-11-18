"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  loadOnMount?: boolean;
}

// Stagger between sibling elements that mount together (nelson.co uses 60ms).
const STAGGER_MS = 60;
let mountQueue = 0;
let resetScheduled = false;

function nextStaggerIndex() {
  const index = mountQueue++;
  if (!resetScheduled) {
    resetScheduled = true;
    requestAnimationFrame(() => {
      mountQueue = 0;
      resetScheduled = false;
    });
  }
  return index;
}

export default function AnimateOnScroll({
  children,
  delay,
  className = "",
  loadOnMount = false,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [staggerDelay, setStaggerDelay] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadOnMount) {
      setStaggerDelay(delay ?? nextStaggerIndex() * STAGGER_MS);
      const frame = requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsVisible(true))
      );
      return () => cancelAnimationFrame(frame);
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStaggerDelay(delay ?? 0);
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [loadOnMount, delay]);

  return (
    <div
      ref={elementRef}
      className={`fade-up [overflow-anchor:none] ${
        isVisible ? "fade-up-visible" : ""
      } ${className}`}
      style={{ transitionDelay: `${staggerDelay}ms` }}
    >
      {children}
    </div>
  );
}
