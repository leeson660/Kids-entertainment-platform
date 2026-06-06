"use client"

import { useState } from "react"
import { GameEngine } from "@/components/GameEngine"
import { gameData } from "@/lib/gameData"

type GameType = keyof typeof gameData | null

const gameCards = [
  { id: "animals" as const, emoji: "🐾", title: "Tap the Animal", desc: "Find the right animal! Big, bright buttons for little fingers." },
  { id: "colours" as const, emoji: "🎨", title: "Tap the Colour", desc: "Learn all the colours with fun circle buttons." },
  { id: "shapes" as const, emoji: "⭐", title: "Tap the Shape", desc: "Circles, squares, stars and more — can you find them all?" },
]

export default function PlayPage() {
  const [activeGame, setActiveGame] = useState<GameType>(null)

  if (activeGame) {
    return <GameEngine gameType={activeGame} onBack={() => setActiveGame(null)} />
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="font-display font-black text-brand-dark text-4xl md:text-5xl mb-4">
          Free Learning Games for Toddlers 🎮
        </h1>
        <p className="font-body text-brand-dark/60 text-lg max-w-xl mx-auto">
          Play free interactive learning games for babies and toddlers aged 0-4.
          Tap the animal, match the colour, identify shapes — all with audio prompts
          and big toddler-friendly buttons.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {gameCards.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-2 text-center border-2 border-transparent hover:border-brand-primary/30 flex flex-col items-center gap-4"
          >
            <span className="text-7xl group-hover:scale-110 transition-transform duration-200">
              {game.emoji}
            </span>
            <h2 className="font-display font-black text-brand-dark text-xl">{game.title}</h2>
            <p className="font-body text-brand-dark/60 text-sm">{game.desc}</p>
            <span className="mt-2 bg-brand-primary text-white font-display font-bold px-6 py-3 rounded-2xl group-hover:bg-brand-primary/90 transition-colors">
              Play Now!
            </span>
          </button>
        ))}
      </div>

      <div className="mt-12 bg-brand-yellow/30 rounded-2xl p-6 text-center">
        <p className="font-body text-brand-dark/70 text-sm">
          🎯 Each game awards <strong>+3 stars</strong> when you complete it!
          Collect stars to unlock badges on your Progress page.
        </p>
      </div>
    </div>
  )
}
