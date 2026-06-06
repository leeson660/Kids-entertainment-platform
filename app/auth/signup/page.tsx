// Auth signup — scaffold only, never linked in MVP frontend
"use client"

import { useState } from "react"
import Link from "next/link"
import { Wordmark } from "@/components/Wordmark"

const ageOptions = ["6 months", "12 months", "18 months", "2 years", "3 years", "4 years"]

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [childName, setChildName] = useState("")
  const [childAge, setChildAge] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { signUpWithEmail } = await import("@/lib/auth")
      await signUpWithEmail(email, password, childName, childAge)
      window.location.href = "/"
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    try {
      const { signInWithGoogle } = await import("@/lib/auth")
      await signInWithGoogle()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google sign in failed")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-primary/10 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <Wordmark />
          <p className="font-body text-brand-dark/60 text-sm mt-2">Create your free account</p>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl py-3 font-body font-semibold text-brand-dark hover:bg-gray-50 transition-colors disabled:opacity-60 mb-4"
        >
          <span className="text-xl">G</span>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="font-body text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full border-2 border-gray-200 focus:border-brand-primary rounded-xl px-4 py-3 font-body outline-none transition-colors" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full border-2 border-gray-200 focus:border-brand-primary rounded-xl px-4 py-3 font-body outline-none transition-colors" />
          <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Child's name (optional)" className="w-full border-2 border-gray-200 focus:border-brand-primary rounded-xl px-4 py-3 font-body outline-none transition-colors" />
          <select value={childAge} onChange={(e) => setChildAge(e.target.value)} className="w-full border-2 border-gray-200 focus:border-brand-primary rounded-xl px-4 py-3 font-body outline-none transition-colors bg-white">
            <option value="">Child&apos;s age (optional)</option>
            {ageOptions.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          {error && <p className="text-red-600 text-sm font-body">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-brand-primary text-white font-body font-bold py-3 rounded-xl hover:bg-brand-primary/90 transition-colors disabled:opacity-60">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center font-body text-sm text-brand-dark/60 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-primary font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
