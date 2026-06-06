// Auth callback — handles Supabase OAuth redirect
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Supabase handles the token from the URL hash automatically
    // Just redirect home after a short delay
    const timer = setTimeout(() => router.replace("/"), 1500)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl animate-spin mb-4">⭐</div>
        <p className="font-body text-brand-dark/60">Signing you in...</p>
      </div>
    </div>
  )
}
