"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const VIDEO_TYPES: Record<string, string> = {
  mp4: "video/mp4",
  webm: "video/webm",
}

interface CoverVideoProps {
  sources: string[]
  poster?: string
  still?: string
  label: string
  className?: string
}

const fill = "absolute inset-0 h-full w-full object-contain object-right-bottom"

// Muted looping cover animation. Sources are tried in order, so list the
// H.264 MP4 first and a VP9 WebM after it for browsers without H.264. It only
// plays while on screen. The poster is the video's first frame; when that
// isn't a finished state (e.g. graphs that draw in), pass `still` and it's
// shown instead with reduced motion or when the video can't play.
export default function CoverVideo({ sources, poster, still, label, className }: CoverVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  // When the still shows, the video is hidden rather than left under it: a
  // transparent still over the poster would draw its shadows twice.
  const hasStill = Boolean(still && still !== poster)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let onScreen = false

    const update = () => {
      if (onScreen && !reducedMotion.matches) {
        video.play().catch(() => setFailed(true))
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
    <div className={cn("absolute inset-0", className)}>
      <video
        ref={videoRef}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload="auto"
        className={cn(fill, hasStill && "motion-reduce:invisible", hasStill && failed && "invisible")}
      >
        {sources.map((src) => (
          <source key={src} src={src} type={VIDEO_TYPES[src.split(".").pop() ?? ""]} />
        ))}
      </video>
      {hasStill && (
        <Image
          src={still!}
          alt=""
          aria-hidden
          fill
          className={cn("object-contain object-right-bottom motion-reduce:block", failed ? "block" : "hidden")}
        />
      )}
    </div>
  )
}
