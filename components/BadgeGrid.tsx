"use client"

import { useState } from "react"
import { allBadges } from "@/lib/rewards"

interface BadgeGridProps {
  earned: string[]
}

export function BadgeGrid({ earned }: BadgeGridProps) {
  const [tooltip, setTooltip] = useState<string | null>(null)

  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
        {allBadges.map((badge) => {
          const isEarned = earned.includes(badge.id)
          return (
            <button
              key={badge.id}
              onClick={() => setTooltip(tooltip === badge.id ? null : badge.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${
                isEarned
                  ? "border-brand-yellow bg-brand-yellow/20 hover:bg-brand-yellow/30"
                  : "border-gray-200 bg-gray-50 opacity-40 hover:opacity-60 grayscale"
              }`}
              title={badge.howToEarn}
            >
              <span className="text-3xl">{badge.emoji}</span>
              <span className="font-body text-xs font-semibold text-brand-dark text-center leading-tight">
                {badge.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="mt-4 p-4 bg-brand-primary/10 rounded-2xl text-center">
          {(() => {
            const b = allBadges.find((x) => x.id === tooltip)!
            const isEarned = earned.includes(b.id)
            return (
              <p className="font-body text-brand-dark text-sm">
                {isEarned ? (
                  <>
                    <span className="font-bold">🎉 {b.name} earned!</span>{" "}
                    {b.description}
                  </>
                ) : (
                  <>
                    <span className="font-bold">How to earn {b.name}:</span>{" "}
                    {b.howToEarn}
                  </>
                )}
              </p>
            )
          })()}
        </div>
      )}
    </div>
  )
}
