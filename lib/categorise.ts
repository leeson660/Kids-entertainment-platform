export type VideoCategory =
  | "animals"
  | "first-words"
  | "songs"
  | "sign-language"
  | "emotions"
  | "abc-numbers"

const categoryKeywords: Record<VideoCategory, string[]> = {
  animals: [
    "animal",
    "dog",
    "cat",
    "duck",
    "cow",
    "horse",
    "pig",
    "lion",
    "elephant",
    "bird",
    "fish",
    "frog",
    "bear",
    "rabbit",
    "sheep",
    "monkey",
    "tiger",
    "giraffe",
    "snake",
    "turtle",
    "penguin",
    "whale",
    "farm",
    "jungle",
    "zoo",
  ],
  "first-words": [
    "first word",
    "words",
    "speech",
    "talk",
    "say",
    "sentence",
    "vocabulary",
    "language",
    "speaking",
    "toddler talk",
  ],
  songs: [
    "song",
    "nursery rhyme",
    "rhyme",
    "sing",
    "music",
    "melody",
    "tune",
    "itsy bitsy",
    "wheels on the bus",
    "twinkle",
    "baa baa",
    "humpty",
    "incy wincy",
    "heads shoulders",
    "old macdonald",
  ],
  "sign-language": [
    "sign",
    "bsl",
    "gesture",
    "british sign",
    "makaton",
    "signing",
  ],
  emotions: [
    "emotion",
    "feeling",
    "happy",
    "sad",
    "angry",
    "scared",
    "kindness",
    "love",
    "excited",
    "worried",
    "upset",
    "calm",
  ],
  "abc-numbers": [
    "abc",
    "alphabet",
    "letter",
    "number",
    "count",
    "counting",
    "shape",
    "colour",
    "color",
    "one two",
    "1 2 3",
    "phonics",
  ],
}

export const categoryMeta: Record<
  VideoCategory,
  { label: string; emoji: string; description: string }
> = {
  animals: {
    label: "Animals",
    emoji: "🐾",
    description: "Learn about dogs, cats, farm animals and more",
  },
  "first-words": {
    label: "First Words",
    emoji: "🗣️",
    description: "Build vocabulary and speech with fun videos",
  },
  songs: {
    label: "Songs & Nursery Rhymes",
    emoji: "🎵",
    description: "Sing along to classic and original songs",
  },
  "sign-language": {
    label: "Sign Language",
    emoji: "✋",
    description: "Learn British Sign Language (BSL) basics",
  },
  emotions: {
    label: "Emotions & Feelings",
    emoji: "😊",
    description: "Explore feelings and emotional development",
  },
  "abc-numbers": {
    label: "ABC & Numbers",
    emoji: "🔤",
    description: "Letters, numbers, shapes and colours",
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
