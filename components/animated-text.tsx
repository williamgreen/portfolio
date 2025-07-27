"use client"

import { useState, useEffect } from "react"

const words = ["software", "websites", "brands"]

export default function AnimatedText() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setIsVisible(true)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`inline-block transition-all duration-300 ${
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-2"
      }`}
    >
      {words[currentWordIndex]}
    </span>
  )
}
