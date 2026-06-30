// =============================================================================
// VIDEO CATEGORIES
// Customise the categories and their keyword lists to match the creator's niche.
// Videos are automatically categorised by matching their title against keywords.
// =============================================================================

export type VideoCategory =
  | "getting-started"
  | "tutorials"
  | "tips-and-tricks"
  | "deep-dives"
  | "reviews"
  | "community"

// Keywords used to auto-categorise videos fetched from the YouTube API.
// Update these to match the vocabulary used in the creator's video titles.
const categoryKeywords: Record<VideoCategory, string[]> = {
  "getting-started": [
    "intro",
    "introduction",
    "beginner",
    "start here",
    "getting started",
    "first",
    "welcome",
    "new to",
    "basics",
    "overview",
    "what is",
  ],
  tutorials: [
    "how to",
    "tutorial",
    "guide",
    "step by step",
    "walkthrough",
    "lesson",
    "learn",
    "masterclass",
    "course",
    "workshop",
  ],
  "tips-and-tricks": [
    "tips",
    "tricks",
    "hacks",
    "secrets",
    "shortcut",
    "quick",
    "fast",
    "pro tip",
    "mistakes to avoid",
    "you should know",
  ],
  "deep-dives": [
    "deep dive",
    "full guide",
    "complete",
    "everything you need",
    "ultimate",
    "comprehensive",
    "explained",
    "breakdown",
    "in depth",
    "detailed",
  ],
  reviews: [
    "review",
    "best",
    "top",
    "ranked",
    "comparison",
    " vs ",
    "recommended",
    "worth it",
    "honest",
    "unboxing",
    "tested",
  ],
  community: [
    "q&a",
    "questions answered",
    "subscriber",
    "fan",
    "community",
    "behind the scenes",
    "bts",
    "day in the life",
    "vlog",
    "update",
    "announcement",
  ],
}

export const categoryMeta: Record<
  VideoCategory,
  { label: string; emoji: string; description: string }
> = {
  "getting-started": {
    label: "Getting Started",
    emoji: "🚀",
    description: "New here? Start with these essential videos from [Creator Name].",
  },
  tutorials: {
    label: "Tutorials",
    emoji: "🎓",
    description: "Step-by-step guides and how-to videos for every skill level.",
  },
  "tips-and-tricks": {
    label: "Tips & Tricks",
    emoji: "💡",
    description: "Quick wins, pro tips, and shortcuts shared by [Creator Name].",
  },
  "deep-dives": {
    label: "Deep Dives",
    emoji: "🔍",
    description: "In-depth explorations of the topics that matter most.",
  },
  reviews: {
    label: "Reviews & Picks",
    emoji: "⭐",
    description: "Honest reviews and curated recommendations from [Creator Name].",
  },
  community: {
    label: "Community",
    emoji: "👥",
    description: "Q&As, fan features, behind-the-scenes, and community highlights.",
  },
}

export function categoriseVideo(title: string): VideoCategory | null {
  const lower = title.toLowerCase()
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return category as VideoCategory
    }
  }
  return null
}

export function getVideosByCategory<T extends { title: string }>(
  videos: T[],
  category: VideoCategory
): T[] {
  const keywords = categoryKeywords[category]
  return videos.filter((v) => {
    const lower = v.title.toLowerCase()
    return keywords.some((kw) => lower.includes(kw))
  })
}
