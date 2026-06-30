"use client"

import { useEffect, useState } from "react"
import { getLocalProgress, setChildName, Progress } from "@/lib/rewards"
import { BadgeGrid } from "@/components/BadgeGrid"
import Link from "next/link"

export default function ProgressPage() {
  const [progress, setProgress] = useState<Progress | null>(null)
  const [nameInput, setNameInput] = useState("")
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const p = getLocalProgress()
    setProgress(p)
    setNameInput(p.childName || "")
    if (!p.childName) setEditing(true)
  }, [])

  const saveName = () => {
    if (nameInput.trim()) {
      setChildName(nameInput.trim())
      setProgress((p) => p ? { ...p, childName: nameInput.trim() } : p)
    }
    setEditing(false)
  }

  if (!progress) return null

  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0]
  const thisWeekVisits = progress.visitDates.filter((d) => d >= weekAgo).length

  // Streak calculation
  let streak = 0
  const sortedDates = [...progress.visitDates].sort().reverse()
  for (let i = 0; i < sortedDates.length; i++) {
    const expected = new Date(Date.now() - i * 86400000).toISOString().split("T")[0]
    if (sortedDates[i] === expected) streak++
    else break
  }

  const viewerLabel = progress.childName || "you"

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        {editing ? (
          <div className="bg-brand-primary/10 rounded-2xl p-6 mb-6">
            <h2 className="font-display font-bold text-brand-dark text-xl mb-3">
              What&apos;s your name?
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveName()}
                placeholder="e.g. Alex"
                className="flex-1 border-2 border-brand-primary/30 focus:border-brand-primary rounded-xl px-4 py-2 font-body outline-none"
              />
              <button onClick={saveName} className="bg-brand-primary text-white font-body font-bold px-5 py-2 rounded-xl">
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-display font-black text-brand-dark text-4xl">
              {viewerLabel === "you" ? "Your progress" : `${viewerLabel}'s progress`} ⭐
            </h1>
            <button onClick={() => setEditing(true)} className="text-sm font-body text-brand-primary hover:underline">
              Edit name
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-5">This Week 📅</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Videos Watched", value: progress.videosWatched.length, emoji: "📺" },
            { label: "Resources Downloaded", value: progress.worksheetsPrinted.length, emoji: "📥" },
            { label: "Day Streak", value: `${streak} day${streak !== 1 ? "s" : ""}`, emoji: "🔥" },
            { label: "Total Stars", value: progress.stars, emoji: "⭐" },
          ].map((stat) => (
            <div key={stat.label} className="bg-brand-primary/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-1">{stat.emoji}</div>
              <div className="font-display font-black text-brand-dark text-2xl">{stat.value}</div>
              <div className="font-body text-brand-dark/60 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        {streak >= 3 && (
          <div className="mt-4 bg-brand-yellow/30 rounded-xl p-3 text-center">
            <p className="font-body font-semibold text-brand-dark text-sm">
              🔥 {streak} days in a row! Keep it up!
            </p>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-2">Badges 🏆</h2>
        <p className="font-body text-brand-dark/50 text-sm mb-5">Tap any badge to see how to earn it</p>
        <BadgeGrid earned={progress.badgesEarned} />
      </div>

      {/* Resources downloaded */}
      {progress.worksheetsPrinted.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="font-display font-bold text-brand-dark text-2xl mb-4">Resources Downloaded 📥</h2>
          <div className="flex flex-wrap gap-2">
            {progress.worksheetsPrinted.map((slug) => (
              <span key={slug} className="bg-brand-green/20 text-brand-dark font-body text-sm px-3 py-1 rounded-full capitalize">
                {slug.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Explore CTA */}
      {progress.videosWatched.length === 0 && (
        <div className="text-center bg-brand-primary/10 rounded-2xl p-8 mb-8">
          <p className="font-body text-brand-dark/60 mb-4">Start watching videos to earn stars and unlock badges!</p>
          <Link href="/videos" className="bg-brand-primary text-white font-body font-bold px-6 py-3 rounded-xl inline-block">
            Browse Videos 🎬
          </Link>
        </div>
      )}

      <div className="text-center py-4">
        <p className="font-body text-brand-dark/40 text-xs">
          Progress is stored on this device only — keep exploring to unlock more badges!
        </p>
      </div>
    </div>
  )
}
