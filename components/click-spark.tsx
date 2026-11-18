"use client";

import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkOpacity?: number;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  extraScale?: number;
}

// Draws short radiating lines from the cursor on every click.
export default function ClickSpark({
  sparkColor = "currentColor",
  sparkOpacity = 0.3,
  sparkSize = 6,
  sparkRadius = 12,
  sparkCount = 6,
  duration = 300,
  extraScale = 1,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const easeOut = (t: number) => t * (2 - t);
    let frame = 0;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalAlpha = sparkOpacity;
      const color =
        sparkColor === "currentColor" ? getComputedStyle(canvas).color : sparkColor;

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed >= duration) return false;
        const progress = easeOut(elapsed / duration);
        const distance = progress * sparkRadius * extraScale;
        const length = sparkSize * (1 - progress);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + length) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + length) * Math.sin(spark.angle);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });

      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    const onClick = (e: MouseEvent) => {
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now,
        });
      }
    };
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
    };
  }, [sparkColor, sparkOpacity, sparkSize, sparkRadius, sparkCount, duration, extraScale]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="text-foreground"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
