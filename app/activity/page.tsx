"use client"

import { useState } from "react"
import { canGenerateActivity, recordActivityGeneration, updateProgress, getActivityGenerationsLeft } from "@/lib/rewards"

interface Activity {
  title: string
  whatYouNeed: string[]
  steps: string[]
  tip: string
  suggestedVideo: string
}

const ageOptions = ["6 months", "12 months", "18 months", "2 years", "3 years", "4 years"]
const topicOptions = ["Animals", "First Words", "Songs", "Colours", "Numbers"]

export default function ActivityPage() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [activity, setActivity] = useState<Activity | null>(null)
  const [error, setError] = useState("")
  const [rateLimited, setRateLimited] = useState(false)

  const handleGenerate = async () => {
    if (!age || !topic) { setError("Please select an age and topic."); return }
    if (!canGenerateActivity()) { setRateLimited(true); return }

    setLoading(true)
    setError("")
    setActivity(null)

    try {
      const res = await fetch("/api/generate-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // IMPORTANT: only age + topic sent to API — never the child's name
        body: JSON.stringify({ age, topic }),
      })
      if (!res.ok) throw new Error("API error")
      const data = await res.json()

      // Insert child's name client-side only
      const personalised: Activity = {
        ...data,
        title: name ? data.title.replace(/your child|the child/gi, name) || `${name}'s ${data.title}` : data.title,
      }

      recordActivityGeneration()
      updateProgress("generate_activity")
      setActivity(personalised)
    } catch {
      setError("Miss Katie's helper is taking a little nap! Please try again in a moment. 😴")
    } finally {
      setLoading(false)
    }
  }

  const generationsLeft = getActivityGenerationsLeft()

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display font-black text-brand-dark text-4xl mb-2">
          Personalised Learning Activities ✨
        </h1>
        <p className="font-body text-brand-dark/60 text-lg">
          Get a free 5-minute home learning activity tailored to your little one.
          No special equipment needed — just household items!
        </p>
      </div>

      {rateLimited ? (
        <div className="bg-brand-yellow/20 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">⭐</div>
          <h2 className="font-display font-bold text-brand-dark text-2xl mb-2">
            You&apos;ve made 3 lovely activities today!
          </h2>
          <p className="font-body text-brand-dark/60">
            Come back tomorrow for more activities. In the meantime, why not play a game or watch a video?
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
          <div>
            <label className="font-body font-semibold text-brand-dark text-sm block mb-2">
              Child&apos;s Name (optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Lily"
              className="w-full border-2 border-gray-200 focus:border-brand-primary rounded-xl px-4 py-3 font-body text-brand-dark outline-none transition-colors"
            />
            <p className="text-xs text-brand-dark/40 mt-1">Name stays on your device only — never sent anywhere.</p>
          </div>

          <div>
            <label className="font-body font-semibold text-brand-dark text-sm block mb-2">Age *</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border-2 border-gray-200 focus:border-brand-primary rounded-xl px-4 py-3 font-body text-brand-dark outline-none transition-colors bg-white"
            >
              <option value="">Select age...</option>
              {ageOptions.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div>
            <label className="font-body font-semibold text-brand-dark text-sm block mb-2">Topic *</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full border-2 border-gray-200 focus:border-brand-primary rounded-xl px-4 py-3 font-body text-brand-dark outline-none transition-colors bg-white"
            >
              <option value="">Select topic...</option>
              {topicOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {error && (
            <p className="bg-red-50 text-red-700 font-body text-sm rounded-xl px-4 py-3">{error}</p>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-brand-primary text-white font-display font-black text-lg py-4 rounded-2xl hover:bg-brand-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⭐</span>
                <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>✨</span>
                <span className="animate-spin" style={{ animationDelay: "0.2s" }}>⭐</span>
                <span className="ml-2">Creating your activity...</span>
              </span>
            ) : (
              "✨ Generate Activity"
            )}
          </button>

          <p className="text-center font-body text-xs text-brand-dark/40">
            {generationsLeft} free activit{generationsLeft === 1 ? "y" : "ies"} left today
          </p>
        </div>
      )}

      {activity && (
        <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden animate-fadeIn">
          <div className="bg-brand-primary p-6">
            <h2 className="font-display font-black text-white text-2xl">{activity.title}</h2>
            <p className="font-body text-white/80 text-sm mt-1">+2 stars earned! ⭐</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-display font-bold text-brand-dark text-lg mb-3">🛒 What You Need</h3>
              <ul className="space-y-2">
                {activity.whatYouNeed.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-body text-brand-dark/70 text-sm">
                    <span className="text-brand-green font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-brand-dark text-lg mb-3">📋 What To Do</h3>
              <ol className="space-y-3">
                {activity.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-7 h-7 bg-brand-primary text-white rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0">
                      {i + 1}
                    </span>
                    <p className="font-body text-brand-dark/70 text-sm leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-brand-yellow/20 rounded-xl p-4">
              <h3 className="font-display font-bold text-brand-dark text-base mb-2">💡 Parent Tip</h3>
              <p className="font-body text-brand-dark/70 text-sm">{activity.tip}</p>
            </div>
            <div className="bg-brand-primary/10 rounded-xl p-4">
              <h3 className="font-display font-bold text-brand-dark text-base mb-2">📺 Suggested Miss Katie Video</h3>
              <p className="font-body text-brand-dark/70 text-sm">{activity.suggestedVideo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
