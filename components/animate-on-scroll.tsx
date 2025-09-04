"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  loadOnMount?: boolean;
}

export default function AnimateOnScroll({
  children,
  delay = 0,
  duration = 300,
  className = "",
  loadOnMount = false,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadOnMount) {
      // Load immediately on mount - all elements at the same time
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
      className={`transition-all ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: "0ms", // No delay - all elements animate together
        willChange: "opacity, transform", // Optimize for animations
      }}
    >
      {children}
    </div>
  );
}
