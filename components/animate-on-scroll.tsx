"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  riseDuration?: number;
  className?: string;
  loadOnMount?: boolean;
}

// Matches nelson.co's homepage: everything fades and unblurs together,
// while each block rises in turn, 80ms after the previous one.
const STAGGER_MS = 80;
let mountIndex = 0;
let resetScheduled = false;

function nextMountIndex() {
  const index = mountIndex++;
  if (!resetScheduled) {
    resetScheduled = true;
    requestAnimationFrame(() => {
      mountIndex = 0;
      resetScheduled = false;
    });
  }
  return index;
}

export default function AnimateOnScroll({
  children,
  delay = 0,
  duration = 700,
  riseDuration = 1400,
  className = "",
  loadOnMount = false,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [riseDelay, setRiseDelay] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadOnMount) {
      // Load on mount, with each element's rise staggered by mount order
      setRiseDelay(nextMountIndex() * STAGGER_MS);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50); // Small delay to ensure smooth animation
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 100); // Small delay to ensure smooth animation
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [loadOnMount]);

  return (
    <div
      ref={elementRef}
      className={`[overflow-anchor:none] ${
        isVisible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-4 blur-[8px]"
      } ${className}`}
      style={{
        transitionProperty: "opacity, filter, transform",
        transitionDuration: `${duration}ms, ${duration}ms, ${riseDuration}ms`,
        transitionTimingFunction: "ease-out, ease-out, cubic-bezier(0.25, 1, 0.5, 1)",
        transitionDelay: `0ms, 0ms, ${riseDelay}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}
