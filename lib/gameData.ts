export type AnimalItem = { label: string; emoji: string }
export type ColourItem = { label: string; color: string; border?: boolean }
export type ShapeItem = { label: string; shape: string }
export type GameItem = AnimalItem | ColourItem | ShapeItem

export interface GameCategory {
  title: string
  emoji: string
  promptTemplate: string
  items: GameItem[]
}

export const gameData: Record<string, GameCategory> = {
  animals: {
    title: "Tap the Animal",
    emoji: "🐾",
    promptTemplate: "Where is the {item}?",
    items: [
      { label: "Dog", emoji: "🐶" },
      { label: "Cat", emoji: "🐱" },
      { label: "Duck", emoji: "🦆" },
      { label: "Cow", emoji: "🐮" },
      { label: "Horse", emoji: "🐴" },
      { label: "Pig", emoji: "🐷" },
      { label: "Lion", emoji: "🦁" },
      { label: "Elephant", emoji: "🐘" },
      { label: "Bird", emoji: "🦜" },
      { label: "Fish", emoji: "🐟" },
      { label: "Frog", emoji: "🐸" },
      { label: "Bear", emoji: "🐻" },
    ] as AnimalItem[],
  },
  colours: {
    title: "Tap the Colour",
    emoji: "🎨",
    promptTemplate: "Where is {item}?",
    items: [
      { label: "Red", color: "#FF0000" },
      { label: "Blue", color: "#0000FF" },
      { label: "Yellow", color: "#FFD700" },
      { label: "Green", color: "#4CAF50" },
      { label: "Orange", color: "#FF6B00" },
      { label: "Purple", color: "#800080" },
      { label: "Pink", color: "#FF69B4" },
      { label: "White", color: "#F5F5F5", border: true },
    ] as ColourItem[],
  },
  shapes: {
    title: "Tap the Shape",
    emoji: "⭐",
    promptTemplate: "Where is the {item}?",
    items: [
      { label: "Circle", shape: "circle" },
      { label: "Square", shape: "square" },
      { label: "Triangle", shape: "triangle" },
      { label: "Star", shape: "star" },
      { label: "Heart", shape: "heart" },
      { label: "Rectangle", shape: "rectangle" },
      { label: "Oval", shape: "oval" },
      { label: "Diamond", shape: "diamond" },
    ] as ShapeItem[],
  },
}
