"use client"

export interface Badge {
  id: string
  name: string
  emoji: string
  description: string
  howToEarn: string
}

export interface Progress {
  stars: number
  childName: string
  videosWatched: string[]
  gamesCompleted: Record<string, number>  // kept for data-structure backward compat
  worksheetsPrinted: string[]
  activitiesGenerated: number
  visitDates: string[]
  badgesEarned: string[]
  activityGenerationsToday: number
  lastActivityDate: string
}

export const allBadges: Badge[] = [
  {
    id: "first-star",
    name: "First Star",
    emoji: "⭐",
    description: "You earned your very first star!",
    howToEarn: "Earn your first star",
  },
  {
    id: "video-explorer",
    name: "Video Explorer",
    emoji: "📺",
    description: "You've explored loads of content!",
    howToEarn: "Watch 10 videos",
  },
  {
    id: "resource-collector",
    name: "Resource Collector",
    emoji: "📚",
    description: "You're building a great collection of resources!",
    howToEarn: "Download 3 resources",
  },
  {
    id: "content-creator-fan",
    name: "Superfan",
    emoji: "🎬",
    description: "A true fan of [Creator Name]!",
    howToEarn: "Watch 25 videos",
  },
  {
    id: "idea-generator",
    name: "Idea Generator",
    emoji: "💡",
    description: "You love generating new ideas!",
    howToEarn: "Use the AI Activity Generator 5 times",
  },
  {
    id: "on-a-roll",
    name: "On a Roll",
    emoji: "🔥",
    description: "You keep coming back to learn!",
    howToEarn: "Visit 3 days in a row",
  },
  {
    id: "super-learner",
    name: "Super Learner",
    emoji: "🌟",
    description: "You're amazing at exploring content!",
    howToEarn: "Earn 50 stars total",
  },
  {
    id: "community-champion",
    name: "Community Champion",
    emoji: "🏆",
    description: "You're a true champion of this community!",
    howToEarn: "Earn 100 stars total",
  },
]

const defaultProgress: Progress = {
  stars: 0,
  childName: "",
  videosWatched: [],
  gamesCompleted: {},
  worksheetsPrinted: [],
  activitiesGenerated: 0,
  visitDates: [],
  badgesEarned: [],
  activityGenerationsToday: 0,
  lastActivityDate: "",
}

export function getLocalProgress(): Progress {
  if (typeof window === "undefined") return defaultProgress
  try {
    const stored = localStorage.getItem("mkc_progress")
    if (!stored) return { ...defaultProgress }
    return { ...defaultProgress, ...JSON.parse(stored) }
  } catch {
    return { ...defaultProgress }
  }
}

function saveProgress(p: Progress) {
  if (typeof window === "undefined") return
  localStorage.setItem("mkc_progress", JSON.stringify(p))
}

function checkBadges(p: Progress): string[] {
  const newBadges: string[] = []

  const add = (id: string) => {
    if (!p.badgesEarned.includes(id)) {
      p.badgesEarned.push(id)
      newBadges.push(id)
    }
  }

  if (p.stars >= 1) add("first-star")
  if (p.videosWatched.length >= 10) add("video-explorer")
  if (p.videosWatched.length >= 25) add("content-creator-fan")
  if (p.worksheetsPrinted.length >= 3) add("resource-collector")
  if (p.activitiesGenerated >= 5) add("idea-generator")
  if (p.stars >= 50) add("super-learner")
  if (p.stars >= 100) add("community-champion")

  // streak badge
  const today = new Date().toISOString().split("T")[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
  const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split("T")[0]
  if (
    p.visitDates.includes(today) &&
    p.visitDates.includes(yesterday) &&
    p.visitDates.includes(twoDaysAgo)
  ) {
    add("on-a-roll")
  }

  return newBadges
}

export type ProgressAction =
  | "watch_video"
  | "complete_game"
  | "print_worksheet"
  | "generate_activity"
  | "daily_visit"

export function updateProgress(
  action: ProgressAction,
  meta?: Record<string, string>
): { starsEarned: number; newBadges: string[] } {
  const p = getLocalProgress()
  let starsEarned = 0
  const today = new Date().toISOString().split("T")[0]

  switch (action) {
    case "watch_video":
      if (meta?.videoId && !p.videosWatched.includes(meta.videoId)) {
        p.videosWatched.push(meta.videoId)
        p.stars += 1
        starsEarned = 1
      }
      break

    case "complete_game":
      if (meta?.gameType) {
        p.gamesCompleted[meta.gameType] =
          (p.gamesCompleted[meta.gameType] || 0) + 5
        p.stars += 3
        starsEarned = 3
      }
      break

    case "print_worksheet":
      if (meta?.slug && !p.worksheetsPrinted.includes(meta.slug)) {
        p.worksheetsPrinted.push(meta.slug)
        p.stars += 2
        starsEarned = 2
      }
      break

    case "generate_activity":
      p.activitiesGenerated += 1
      p.stars += 2
      starsEarned = 2
      break

    case "daily_visit":
      if (!p.visitDates.includes(today)) {
        p.visitDates.push(today)
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
        const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split("T")[0]
        if (p.visitDates.includes(yesterday) && p.visitDates.includes(twoDaysAgo)) {
          p.stars += 5
          starsEarned = 5
        }
      }
      break
  }

  const newBadges = checkBadges(p)
  saveProgress(p)
  return { starsEarned, newBadges }
}

export function canGenerateActivity(): boolean {
  const p = getLocalProgress()
  const today = new Date().toISOString().split("T")[0]
  if (p.lastActivityDate !== today) return true
  return p.activityGenerationsToday < 3
}

export function recordActivityGeneration() {
  const p = getLocalProgress()
  const today = new Date().toISOString().split("T")[0]
  if (p.lastActivityDate !== today) {
    p.activityGenerationsToday = 1
    p.lastActivityDate = today
  } else {
    p.activityGenerationsToday += 1
  }
  saveProgress(p)
}

export function setChildName(name: string) {
  const p = getLocalProgress()
  p.childName = name
  saveProgress(p)
}

export function getActivityGenerationsLeft(): number {
  const p = getLocalProgress()
  const today = new Date().toISOString().split("T")[0]
  if (p.lastActivityDate !== today) return 3
  return Math.max(0, 3 - p.activityGenerationsToday)
}

// Sync stub — inactive in MVP
export async function syncProgressToSupabase(_userId: string) {
  if (process.env.NEXT_PUBLIC_AUTH_ENABLED !== "true") return
  // Stage 2: sync localStorage progress to Supabase
}
