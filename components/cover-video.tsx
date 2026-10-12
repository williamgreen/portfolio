"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const VIDEO_TYPES: Record<string, string> = {
  mp4: "video/mp4",
  webm: "video/webm",
}

interface CoverVideoProps {
  sources: string[]
  poster?: string
  label: string
  className?: string
}

// Muted looping cover animation. Sources are tried in order, so list the
// H.264 MP4 first and a VP9 WebM after it for browsers without H.264. It only
// plays while on screen, and with reduced motion it stays on the poster frame.
export default function CoverVideo({ sources, poster, label, className }: CoverVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let onScreen = false

    const update = () => {
      if (onScreen && !reducedMotion.matches) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      update()
    })
    observer.observe(video)
    reducedMotion.addEventListener("change", update)

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener("change", update)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="auto"
      className={cn("absolute inset-0 h-full w-full object-contain object-right-bottom", className)}
    >
      {sources.map((src) => (
        <source key={src} src={src} type={VIDEO_TYPES[src.split(".").pop() ?? ""]} />
      ))}
    </video>
  )
}
