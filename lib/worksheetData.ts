// =============================================================================
// DOWNLOADABLE RESOURCES
// Populate these with the creator's actual downloadable files.
// Each resource maps to a /worksheets/[slug] detail page.
// =============================================================================

export interface Worksheet {
  slug: string
  title: string
  emoji: string
  description: string
  category: string
  activities: string[]   // "What's included" bullet points
}

export const worksheets: Worksheet[] = [
  {
    slug: "starter-guide",
    title: "[Creator Name]'s Starter Guide",
    emoji: "📖",
    category: "Guides",
    description:
      "Everything you need to get started — a handy reference covering the essential foundations.",
    activities: [
      "Core concepts explained in plain language",
      "Recommended resources and tools to get going",
      "A step-by-step checklist for beginners",
    ],
  },
  {
    slug: "quick-reference",
    title: "Quick Reference Cheat Sheet",
    emoji: "📋",
    category: "Reference",
    description:
      "A single-page cheat sheet you can print and keep at your desk — key facts, formulas, or frameworks at a glance.",
    activities: [
      "Key terminology and definitions",
      "The most-used shortcuts and techniques",
      "A handy 'when stuck, try this' troubleshooting list",
    ],
  },
  {
    slug: "action-plan",
    title: "30-Day Action Plan",
    emoji: "🗓️",
    category: "Planning",
    description:
      "A structured 30-day plan to help your audience build momentum and make real progress in [niche].",
    activities: [
      "Daily and weekly focus areas",
      "Progress tracking checkboxes",
      "Space for notes and personal wins",
    ],
  },
  {
    slug: "resource-toolkit",
    title: "Recommended Tools & Resources",
    emoji: "🛠️",
    category: "Toolkits",
    description:
      "A curated list of everything [Creator Name] personally uses and recommends — with links and notes.",
    activities: [
      "Tools broken down by category and budget",
      "[Creator Name]'s personal notes on each pick",
      "Beginner vs advanced recommendations",
    ],
  },
  {
    slug: "community-challenge",
    title: "Community Challenge Workbook",
    emoji: "🏆",
    category: "Community",
    description:
      "A structured workbook to accompany the latest community challenge — track your progress and share your results.",
    activities: [
      "Challenge rules and weekly goals",
      "A daily log to track progress",
      "Reflection prompts to share with the community",
    ],
  },
  {
    slug: "deep-dive-notes",
    title: "Deep Dive Companion Notes",
    emoji: "🔍",
    category: "Guides",
    description:
      "Companion notes for [Creator Name]'s most in-depth videos — fill in as you watch for maximum retention.",
    activities: [
      "Key points summary for each section",
      "Fill-in-the-blank note-taking prompts",
      "Action items to implement immediately after watching",
    ],
  },
]
