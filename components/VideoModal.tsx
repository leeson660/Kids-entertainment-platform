"use client"

import { useEffect } from "react"
import { YouTubeVideo } from "@/lib/youtube"
import { updateProgress } from "@/lib/rewards"

interface VideoModalProps {
  video: YouTubeVideo | null
  onClose: () => void
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!video) return
    // Award star for watching
    updateProgress("watch_video", { videoId: video.id })
    // Prevent body scroll
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [video])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  if (!video) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-3xl bg-brand-dark rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-white/70 text-xs font-body">+1 ⭐ earned!</p>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors"
            aria-label="Close video"
          >
            ✕
          </button>
        </div>

        {/* Player */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Footer */}
        <div className="px-4 py-3 flex items-start justify-between gap-4">
          <h2 className="text-white font-body font-semibold text-sm line-clamp-2">
            {video.title}
          </h2>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-body text-white/60 hover:text-white transition-colors underline"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
