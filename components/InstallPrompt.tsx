"use client"

import { useEffect, useState } from "react"

export function InstallPrompt() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Only show after 2+ visits and not already dismissed
    const visits = parseInt(localStorage.getItem("mkc_visits") || "0", 10)
    const dismissed = localStorage.getItem("mkc_install_dismissed") === "true"
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true

    if (visits >= 2 && !dismissed && !isStandalone) {
      setShow(true)
    }

    // Increment visit count
    localStorage.setItem("mkc_visits", String(visits + 1))
  }, [])

  if (!show) return null

  const dismiss = () => {
    localStorage.setItem("mkc_install_dismissed", "true")
    setShow(false)
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40 bg-white rounded-2xl shadow-2xl p-4 border-2 border-brand-primary/30 animate-slideUp">
      <div className="flex items-start gap-3">
        <span className="text-2xl">📱</span>
        <div className="flex-1">
          <p className="font-display font-bold text-brand-dark text-sm">
            Add to Your Home Screen!
          </p>
          <p className="font-body text-brand-dark/60 text-xs mt-1">
            Tap the share button and "Add to Home Screen" for quick access.
          </p>
        </div>
        <button
          onClick={dismiss}
          className="text-brand-dark/40 hover:text-brand-dark text-lg font-bold"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
