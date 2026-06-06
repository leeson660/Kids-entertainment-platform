"use client"

import { useEffect, useState } from "react"
import { getLocalProgress } from "@/lib/rewards"

export function StarCounter() {
  const [stars, setStars] = useState(0)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    // Initial load
    setStars(getLocalProgress().stars)

    // Listen for storage changes (other tabs / same tab updates)
    const onStorage = () => {
      const s = getLocalProgress().stars
      setStars((prev) => {
        if (s > prev) {
          setFlash(true)
          setTimeout(() => setFlash(false), 800)
        }
        return s
      })
    }
    window.addEventListener("storage", onStorage)

    // Also poll every 2 seconds for same-tab updates
    const interval = setInterval(() => {
      const s = getLocalProgress().stars
      setStars((prev) => {
        if (s > prev) {
          setFlash(true)
          setTimeout(() => setFlash(false), 800)
        }
        return s
      })
    }, 2000)

    return () => {
      window.removeEventListener("storage", onStorage)
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      className={`flex items-center gap-1 bg-brand-yellow rounded-full px-3 py-1 font-display font-bold text-brand-dark text-sm transition-transform ${
        flash ? "scale-125" : "scale-100"
      }`}
    >
      <span>⭐</span>
      <span>{stars}</span>
    </div>
  )
}
