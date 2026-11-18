"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { tick } from "@/lib/feedback";
import type { ContributionDay } from "@/lib/contributions";

function levelClass(count: number, max: number) {
  if (count === 0) return "bg-neutral-200 dark:bg-neutral-800";
  const ratio = count / max;
  if (ratio <= 0.25) return "bg-green-300 dark:bg-green-900";
  if (ratio <= 0.5) return "bg-green-500 dark:bg-green-700";
  if (ratio <= 0.75) return "bg-green-600 dark:bg-green-500";
  return "bg-green-800 dark:bg-green-400";
}

export default function CommitGraph({ days }: { days: ContributionDay[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [offsets, setOffsets] = useState<number[]>([]);
  const max = Math.max(...days.map((d) => d.count), 1);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Keep tooltips at the edges inside the container on narrow screens.
  useLayoutEffect(() => {
    if (!mounted) return;
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      if (window.innerWidth >= 860) {
        setOffsets((prev) => (prev.length === 0 ? prev : []));
        return;
      }
      const width = container.getBoundingClientRect().width;
      setOffsets(
        days.map((_, i) => {
          const tip = tooltipRefs.current[i];
          const cell = container.children[i] as HTMLElement | undefined;
          if (!tip || !cell) return 0;
          const center = cell.offsetLeft + cell.offsetWidth / 2;
          const left = center - tip.offsetWidth / 2;
          const right = center + tip.offsetWidth / 2;
          return left < 0 ? -left : right > width ? width - right : 0;
        })
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mounted, days]);

  const onEnter = useCallback((i: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(i);
    tick();
  }, []);

  const onLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setHovered(null), 80);
  }, []);

  return (
    <div ref={containerRef} className="relative flex gap-[3px]">
      {days.map((day, i) => {
        const isActive = hovered === i;
        const isNeighbour = hovered !== null && (hovered === i - 1 || hovered === i + 1);
        const offset = offsets[i] ?? 0;
        return (
          <div
            key={day.date}
            className="relative flex-1 group h-5 flex items-center"
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={onLeave}
          >
            <div
              className={`w-full rounded-[3px] ${levelClass(day.count, max)}`}
              style={{
                height: isActive ? 12 : isNeighbour ? 16 : 20,
                transform: mounted ? "scaleY(1)" : "scaleY(0)",
                opacity: mounted ? 1 : 0,
                transition: mounted
                  ? `transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1) ${20 * i}ms, opacity 300ms ease ${20 * i}ms, height ${
                      isActive || isNeighbour
                        ? "150ms cubic-bezier(0.215, 0.61, 0.355, 1)"
                        : "100ms ease"
                    }`
                  : "none",
                transformOrigin: "bottom",
              }}
            />
            <div
              ref={(el) => {
                tooltipRefs.current[i] = el;
              }}
              className="absolute bottom-full left-1/2 mb-2 z-50 pointer-events-none"
              style={{
                transform: `translateX(calc(-50% + ${offset}px)) translateY(${isActive ? "0px" : "4px"})`,
                opacity: isActive ? 1 : 0,
                transition: isActive
                  ? "opacity 150ms cubic-bezier(0.215, 0.61, 0.355, 1), transform 150ms cubic-bezier(0.215, 0.61, 0.355, 1)"
                  : "opacity 100ms ease, transform 100ms ease",
              }}
            >
              <div className="bg-neutral-900 text-white text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg">
                <p>
                  {new Date(day.date + "T12:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                {day.count > 0 ? (
                  <p className="text-neutral-300">
                    {day.count} contribution{day.count !== 1 ? "s" : ""}
                  </p>
                ) : (
                  <p className="text-neutral-400">No contributions</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
