export interface Worksheet {
  slug: string
  title: string
  emoji: string
  description: string
  category: string
  activities: string[]
}

export const worksheets: Worksheet[] = [
  {
    slug: "animals",
    title: "Animal Match",
    emoji: "🐾",
    category: "Animals",
    description: "Match the animal to its name by drawing a line",
    activities: [
      "Draw a line from the animal to its name",
      "Colour in your favourite animal",
      "Can you make the animal's sound?",
    ],
  },
  {
    slug: "first-words",
    title: "First Words Trace",
    emoji: "🗣️",
    category: "First Words",
    description: "Trace the word and draw the object",
    activities: [
      "Trace each word with your finger or pencil",
      "Draw a picture of each word",
      "Say the word out loud as you trace it",
    ],
  },
  {
    slug: "songs",
    title: "Nursery Rhyme Fun",
    emoji: "🎵",
    category: "Songs",
    description: "Fill in the missing word from a nursery rhyme",
    activities: [
      "Fill in the missing words",
      "Colour the pictures",
      "Sing the rhyme with a grown-up",
    ],
  },
  {
    slug: "sign-language",
    title: "BSL Signs",
    emoji: "✋",
    category: "Sign Language",
    description: "Illustrated BSL hand signs to colour in and learn",
    activities: [
      "Colour in the hand signs",
      "Try to copy each sign",
      "Show a grown-up what you learned",
    ],
  },
  {
    slug: "emotions",
    title: "How Do You Feel?",
    emoji: "😊",
    category: "Emotions",
    description: "Circle the face that shows the emotion",
    activities: [
      "Look at each face and circle the right emotion",
      "Draw your own happy face",
      "Talk about a time you felt each emotion",
    ],
  },
  {
    slug: "abc",
    title: "Trace the Letters",
    emoji: "🔤",
    category: "ABC & Numbers",
    description: "Trace the letters A–F with dotted lines",
    activities: [
      "Trace each letter with a pencil",
      "Colour in the pictures next to each letter",
      "Can you think of a word starting with each letter?",
    ],
  },
]
