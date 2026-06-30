"use client"

import { useEffect, useState, useMemo } from "react"
import { YouTubeVideo } from "@/lib/youtube"
import { VideoCard } from "@/components/VideoCard"
import { VideoModal } from "@/components/VideoModal"
import { EmptyState } from "@/components/EmptyState"
import { VideoGridSkeleton } from "@/components/LoadingSkeleton"
import { ErrorState } from "@/components/ErrorState"
import { VideoCategory, categoryMeta, getVideosByCategory } from "@/lib/categorise"

const filterCategories: { id: "all" | VideoCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "🎬" },
  ...Object.entries(categoryMeta).map(([id, meta]) => ({
    id: id as VideoCategory,
    label: meta.label,
    emoji: meta.emoji,
  })),
]

export default function VideosPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selected, setSelected] = useState<YouTubeVideo | null>(null)
  const [activeCategory, setActiveCategory] = useState<"all" | VideoCategory>("all")
  const [search, setSearch] = useState("")

  const loadVideos = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch("/api/videos")
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setVideos(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadVideos() }, [])

  const filtered = useMemo(() => {
    let list = videos
    if (activeCategory !== "all") {
      list = getVideosByCategory(list, activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((v) => v.title.toLowerCase().includes(q))
    }
    return list
  }, [videos, activeCategory, search])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display font-black text-brand-dark text-4xl mb-2">
          All Videos 🎬
        </h1>
        <p className="font-body text-brand-dark/60">
          Browse the full video library — search, filter by category, and discover new content.
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search videos..."
          className="w-full max-w-sm bg-white border-2 border-gray-200 focus:border-brand-primary rounded-2xl px-4 py-3 font-body text-brand-dark outline-none transition-colors"
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap mb-8">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full font-body font-semibold text-sm transition-colors ${
              activeCategory === cat.id
                ? "bg-brand-primary text-white"
                : "bg-white text-brand-dark border-2 border-gray-200 hover:border-brand-primary"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {loading && <VideoGridSkeleton count={12} />}
      {error && <ErrorState onRetry={loadVideos} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          message={
            search
              ? `No videos found matching "${search}". Try a different search term.`
              : "No videos in this category yet — check back soon!"
          }
        />
      )}
      {!loading && !error && filtered.length > 0 && (
        <>
          <p className="font-body text-sm text-brand-dark/50 mb-4">
            {filtered.length} video{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((video) => (
              <VideoCard key={video.id} video={video} onClick={setSelected} />
            ))}
          </div>
        </>
      )}
      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
