// Premium page — scaffold only, never linked in MVP frontend
// Stage 2: activate when NEXT_PUBLIC_SUBSCRIPTION_ENABLED=true

import { AuthGate } from "@/components/AuthGate"

export default function PremiumPage() {
  return (
    <AuthGate>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="font-display font-black text-brand-dark text-4xl mb-4">
          Premium Content 🌟
        </h1>
        <p className="font-body text-brand-dark/60">
          Exclusive videos and content — coming soon.
        </p>
      </div>
    </AuthGate>
  )
}
