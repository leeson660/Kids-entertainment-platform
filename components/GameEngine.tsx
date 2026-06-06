"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { gameData, AnimalItem, ColourItem, ShapeItem } from "@/lib/gameData"
import { updateProgress } from "@/lib/rewards"

type GameType = keyof typeof gameData

interface Props {
  gameType: GameType
  onBack: () => void
}

// --- Shape renderer ---
function ShapeRenderer({ shape, size = 80 }: { shape: string; size?: number }) {
  const s = size
  const c = s / 2
  switch (shape) {
    case "circle":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <circle cx={c} cy={c} r={c - 4} fill="currentColor" />
        </svg>
      )
    case "square":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <rect x={4} y={4} width={s - 8} height={s - 8} rx={4} fill="currentColor" />
        </svg>
      )
    case "triangle":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon points={`${c},4 ${s - 4},${s - 4} 4,${s - 4}`} fill="currentColor" />
        </svg>
      )
    case "star":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <polygon
            points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
            fill="currentColor"
          />
        </svg>
      )
    case "heart":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <path
            d="M50 85 C10 60 5 35 20 20 C30 10 45 15 50 25 C55 15 70 10 80 20 C95 35 90 60 50 85Z"
            fill="currentColor"
          />
        </svg>
      )
    case "rectangle":
      return (
        <svg width={s} height={s * 0.65} viewBox={`0 0 ${s} ${s * 0.65}`}>
          <rect x={4} y={4} width={s - 8} height={s * 0.65 - 8} rx={4} fill="currentColor" />
        </svg>
      )
    case "oval":
      return (
        <svg width={s} height={s * 0.65} viewBox={`0 0 ${s} ${s * 0.65}`}>
          <ellipse cx={c} cy={s * 0.325} rx={c - 4} ry={s * 0.325 - 4} fill="currentColor" />
        </svg>
      )
    case "diamond":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon points={`${c},4 ${s - 4},${c} ${c},${s - 4} 4,${c}`} fill="currentColor" />
        </svg>
      )
    default:
      return <div className="w-16 h-16 bg-current rounded-full" />
  }
}

// --- Confetti ---
function Confetti() {
  const colours = [
    "#3BB8F0", "#CF0000", "#FFD700", "#4CAF50",
    "#FF69B4", "#800080", "#FF6B00", "#FFFFFF",
  ]
  const pieces = Array.from({ length: 60 })
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 0.5
        const color = colours[Math.floor(Math.random() * colours.length)]
        const size = 8 + Math.random() * 10
        return (
          <div
            key={i}
            className="absolute animate-confetti rounded-sm"
            style={{
              left: `${left}%`,
              top: "-20px",
              width: size,
              height: size,
              backgroundColor: color,
              animationDelay: `${delay}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        )
      })}
    </div>
  )
}

// Shuffle array helper
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Pick 4 items including target
function pick4<T>(items: T[], target: T): T[] {
  const others = shuffle(items.filter((x) => x !== target)).slice(0, 3)
  return shuffle([target, ...others])
}

export function GameEngine({ gameType, onBack }: Props) {
  const data = gameData[gameType]
  const items = data.items

  const [correct, setCorrect] = useState(0)
  const [round, setRound] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showEnd, setShowEnd] = useState(false)
  const [wobble, setWobble] = useState<string | null>(null)
  const [currentItems, setCurrentItems] = useState<typeof items>([])
  const [target, setTarget] = useState<(typeof items)[0] | null>(null)
  const wonRef = useRef(false)

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.85
    u.pitch = 1.1

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      // Prefer UK English female, then any English female, then any female
      const voice =
        voices.find((v) => /female/i.test(v.name) && /en[-_]GB/i.test(v.lang)) ||
        voices.find((v) => /female/i.test(v.name) && /en/i.test(v.lang)) ||
        voices.find((v) => /female/i.test(v.name)) ||
        voices.find((v) => /samantha|karen|zira|moira|tessa/i.test(v.name))
      if (voice) u.voice = voice
      window.speechSynthesis.speak(u)
    }

    // Voices may load asynchronously on first call
    if (window.speechSynthesis.getVoices().length > 0) {
      pickVoice()
    } else {
      window.speechSynthesis.onvoiceschanged = pickVoice
    }
  }, [])

  const newRound = useCallback(() => {
    const t = items[Math.floor(Math.random() * items.length)]
    const choices = pick4(items, t)
    setTarget(t)
    setCurrentItems(choices)
    setShowCelebration(false)

    const prompt = data.promptTemplate.replace("{item}", t.label)
    setTimeout(() => speak(prompt), 300)
  }, [items, data.promptTemplate, speak])

  useEffect(() => {
    newRound()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  const handleChoice = (item: (typeof items)[0]) => {
    if (showCelebration || showEnd) return
    if (item.label === target?.label) {
      const newCorrect = correct + 1
      setCorrect(newCorrect)
      setShowCelebration(true)
      if (newCorrect >= 5) {
        speak("You did it! You are a superstar!")
        if (!wonRef.current) {
          wonRef.current = true
          updateProgress("complete_game", { gameType })
        }
        setTimeout(() => {
          setShowCelebration(false)
          setShowEnd(true)
        }, 2000)
      } else {
        speak("Amazing! Well done!")
        setTimeout(() => {
          setRound((r) => r + 1)
        }, 2000)
      }
    } else {
      setWobble(item.label)
      setTimeout(() => setWobble(null), 600)
    }
  }

  const playAgain = () => {
    setCorrect(0)
    wonRef.current = false
    setShowEnd(false)
    setRound((r) => r + 1)
  }

  const renderItem = (item: (typeof items)[0]) => {
    if (gameType === "animals") {
      return (
        <span className="text-6xl">{(item as AnimalItem).emoji}</span>
      )
    }
    if (gameType === "colours") {
      const ci = item as ColourItem
      return (
        <div
          className="w-20 h-20 rounded-full shadow-inner"
          style={{
            backgroundColor: ci.color,
            border: ci.border ? "3px solid #ccc" : "none",
          }}
        />
      )
    }
    if (gameType === "shapes") {
      const shapeColors = [
        "#3BB8F0", "#CF0000", "#FFD700", "#4CAF50",
        "#FF69B4", "#800080", "#FF6B00",
      ]
      const colorIdx = currentItems.indexOf(item) % shapeColors.length
      return (
        <div style={{ color: shapeColors[colorIdx] }}>
          <ShapeRenderer shape={(item as ShapeItem).shape} size={72} />
        </div>
      )
    }
  }

  if (showEnd) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-primary to-brand-primary/60 flex flex-col items-center justify-center gap-8 p-6 text-center">
        <div className="text-8xl animate-bounce">🏆</div>
        <h1 className="font-display font-black text-white text-4xl leading-tight">
          Amazing!<br />You&apos;re a Star! ⭐
        </h1>
        <p className="font-body text-white/90 text-xl">
          You got {correct} correct!<br />+3 stars earned!
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={playAgain}
            className="bg-brand-yellow text-brand-dark font-display font-black text-xl py-4 rounded-2xl shadow-lg hover:bg-brand-yellow/90 transition-colors"
          >
            Play Again 🎮
          </button>
          <button
            onClick={onBack}
            className="bg-white/20 text-white font-body font-bold py-3 rounded-2xl hover:bg-white/30 transition-colors"
          >
            Choose a Different Game
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-primary to-white flex flex-col">
      {showCelebration && <Confetti />}

      {/* Back button */}
      <div className="p-4">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center font-bold text-brand-dark shadow hover:bg-white transition-colors text-xl"
          aria-label="Back to games"
        >
          ←
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-3 pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all ${
              i < correct ? "bg-brand-yellow scale-110" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Prompt */}
      <div className="text-center px-4 py-4">
        <p className="font-display font-black text-white text-3xl md:text-4xl leading-tight drop-shadow">
          {target ? data.promptTemplate.replace("{item}", target.label) : ""}
        </p>
      </div>

      {/* Celebration overlay */}
      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div className="text-center animate-bounce">
            <div className="text-8xl">⭐</div>
            <div className="mt-3 bg-brand-yellow rounded-2xl px-6 py-3 shadow-xl border-4 border-white">
              <p className="font-display font-black text-brand-dark text-3xl">
                Well Done! 🎉
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Game grid */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {currentItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleChoice(item)}
              className={`min-h-[140px] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 p-4 transition-all active:scale-95 ${
                wobble === item.label
                  ? "animate-wobble border-2 border-brand-red"
                  : "hover:shadow-xl hover:-translate-y-1 border-2 border-transparent"
              }`}
            >
              {renderItem(item)}
              <span className="font-display font-bold text-brand-dark text-xl">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
