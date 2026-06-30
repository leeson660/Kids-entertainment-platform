"use client"

import { useState, useMemo } from "react"
import { VideoCategory, categoryMeta } from "@/lib/categorise"

// Placeholder video data — replace with real YouTube API data once channel is connected
// To connect: set YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID in .env.local, then restore the API fetch
const placeholderVideos = [
  { id: "1", title: "Getting Started: Everything You Need to Know", views: "124K", duration: "12:34", category: "getting-started" as VideoCategory, publishedAt: "2 days ago" },
  { id: "2", title: "The Complete Beginner's Guide", views: "98K", duration: "18:02", category: "tutorials" as VideoCategory, publishedAt: "1 week ago" },
  { id: "3", title: "5 Tips That Changed Everything", views: "201K", duration: "8:47", category: "tips-and-tricks" as VideoCategory, publishedAt: "2 weeks ago" },
  { id: "4", title: "Deep Dive: The Full Breakdown", views: "76K", duration: "34:21", category: "deep-dives" as VideoCategory, publishedAt: "3 weeks ago" },
  { id: "5", title: "My Honest Review — Is It Worth It?", views: "143K", duration: "15:09", category: "reviews" as VideoCategory, publishedAt: "1 month ago" },
  { id: "6", title: "Answering Your Questions — Q&A", views: "89K", duration: "22:56", category: "community" as VideoCategory, publishedAt: "1 month ago" },
  { id: "7", title: "Advanced Techniques for Next-Level Results", views: "62K", duration: "27:14", category: "tutorials" as VideoCategory, publishedAt: "2 months ago" },
  { id: "8", title: "Quick Tips: 10 Minutes, Big Impact", views: "177K", duration: "10:03", category: "tips-and-tricks" as VideoCategory, publishedAt: "2 months ago" },
  { id: "9", title: "Behind the Scenes — How I Create Content", views: "54K", duration: "19:42", category: "community" as VideoCategory, publishedAt: "3 months ago" },
  { id: "10", title: "The Ultimate Resource Guide", views: "131K", duration: "23:18", category: "getting-started" as VideoCategory, publishedAt: "3 months ago" },
  { id: "11", title: "Everything I Wish I Knew at the Start", views: "209K", duration: "16:55", category: "getting-started" as VideoCategory, publishedAt: "4 months ago" },
  { id: "12", title: "Comparing the Top Options — Full Review", views: "88K", duration: "31:07", category: "reviews" as VideoCategory, publishedAt: "4 months ago" },
]

const filterCategories: { id: "all" | VideoCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "🎬" },
  ...Object.entries(categoryMeta).map(([id, meta]) => ({
    id: id as VideoCategory,
    label: meta.label,
    emoji: meta.emoji,
  })),
]

function PlaceholderCard({ video }: { video: typeof placeholderVideos[0] }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-md transition-shadow duration-200">
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center relative">
        <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
          <span className="text-brand-primary text-xl">▶</span>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-body px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      <div className="p-3">
        <span className="text-xs font-body text-brand-primary font-semibold">
          {categoryMeta[video.category]?.label ?? video.category}
        </span>
        <p className="font-display font-semibold text-brand-dark text-sm leading-snug mt-0.5 line-clamp-2">
          {video.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <p className="font-body text-brand-dark/40 text-xs">{video.views} views</p>
          <span className="text-brand-dark/20 text-xs">·</span>
          <p className="font-body text-brand-dark/40 text-xs">{video.publishedAt}</p>
        </div>
      </div>
    </div>
  )
}

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | VideoCategory>("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    let list = placeholderVideos
    if (activeCategory !== "all") {
      list = list.filter((v) => v.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((v) => v.title.toLowerCase().includes(q))
    }
    return list
  }, [activeCategory, search])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display font-black text-brand-dark text-4xl mb-2">
          All Videos
        </h1>
        <p className="font-body text-brand-dark/60">
          Browse the full video library — search, filter by category, and discover new content.
        </p>
        <p className="font-body text-brand-dark/30 text-xs mt-1">
          Connect your YouTube channel to display real videos (set YOUTUBE_API_KEY + YOUTUBE_CHANNEL_ID)
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

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-body text-brand-dark/40 text-base">
            {search
              ? `No videos found matching "${search}"`
              : "No videos in this category yet — check back soon!"}
          </p>
        </div>
      ) : (
        <>
          <p className="font-body text-sm text-brand-dark/50 mb-4">
            {filtered.length} video{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((video) => (
              <PlaceholderCard key={video.id} video={video} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
