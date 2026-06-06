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
  gamesCompleted: Record<string, number>
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
    id: "animal-expert",
    name: "Animal Expert",
    emoji: "🐾",
    description: "You know all your animals!",
    howToEarn: "Complete the animals game 3 times",
  },
  {
    id: "colour-champion",
    name: "Colour Champion",
    emoji: "🎨",
    description: "You know all your colours!",
    howToEarn: "Complete the colours game 3 times",
  },
  {
    id: "shape-superstar",
    name: "Shape Superstar",
    emoji: "⭐",
    description: "You know all your shapes!",
    howToEarn: "Complete the shapes game 3 times",
  },
  {
    id: "video-explorer",
    name: "Video Explorer",
    emoji: "📺",
    description: "You've watched so many videos!",
    howToEarn: "Watch 10 videos",
  },
  {
    id: "music-lover",
    name: "Music Lover",
    emoji: "🎵",
    description: "You love Miss Katie's songs!",
    howToEarn: "Watch 5 songs videos",
  },
  {
    id: "activity-master",
    name: "Activity Master",
    emoji: "🖨️",
    description: "You love printing activities!",
    howToEarn: "Print 3 worksheets",
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
    description: "You're amazing at learning!",
    howToEarn: "Earn 50 stars total",
  },
  {
    id: "miss-katies-star",
    name: "Miss Katie's Star",
    emoji: "🏆",
    description: "You're Miss Katie's superstar!",
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
  if ((p.gamesCompleted["animals"] || 0) >= 15) add("animal-expert") // 5 correct x 3 rounds
  if ((p.gamesCompleted["colours"] || 0) >= 15) add("colour-champion")
  if ((p.gamesCompleted["shapes"] || 0) >= 15) add("shape-superstar")
  if (p.videosWatched.length >= 10) add("video-explorer")
  if (p.worksheetsPrinted.length >= 3) add("activity-master")
  if (p.stars >= 50) add("super-learner")
  if (p.stars >= 100) add("miss-katies-star")

  // streak badge
  const today = new Date().toISOString().split("T")[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
  const twoDaysAgo = new Date(Date.now() - 172800000)
    .toISOString()
    .split("T")[0]
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
        // check 3-day streak bonus
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split("T")[0]
        const twoDaysAgo = new Date(Date.now() - 172800000)
          .toISOString()
          .split("T")[0]
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
