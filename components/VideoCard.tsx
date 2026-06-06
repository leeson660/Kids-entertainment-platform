"use client"

import Image from "next/image"
import { YouTubeVideo } from "@/lib/youtube"

interface VideoCardProps {
  video: YouTubeVideo
  onClick: (video: YouTubeVideo) => void
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <button
      onClick={() => onClick(video)}
      className="group text-left bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-primary/40"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-brand-primary/20">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-video.svg"
          }}
        />
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-body font-bold px-2 py-0.5 rounded-md">
            {video.duration}
          </span>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-brand-primary text-xl ml-1">▶</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-body font-semibold text-brand-dark text-sm leading-snug line-clamp-2 mb-1">
          {video.title}
        </h3>
        {video.viewCount && video.viewCount !== "0" && (
          <p className="text-xs font-body text-brand-dark/50">
            {video.viewCount} views
          </p>
        )}
      </div>
    </button>
  )
}
