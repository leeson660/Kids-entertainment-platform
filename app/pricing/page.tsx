// Pricing page — scaffold only, never linked in MVP frontend
// Stage 2: add to nav when NEXT_PUBLIC_SUBSCRIPTION_ENABLED=true

import { PLANS } from "@/lib/stripe"

export default function PricingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display font-black text-brand-dark text-4xl mb-8 text-center">
        Choose Your Plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(PLANS).map((plan) => (
          <div key={plan.name} className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="font-display font-bold text-brand-dark text-2xl mb-2">{plan.name}</h2>
            <p className="font-display font-black text-brand-primary text-3xl mb-6">
              {plan.price === 0 ? "Free" : `£${(plan.price / 100).toFixed(2)}/mo`}
            </p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 font-body text-brand-dark/70 text-sm">
                  <span className="text-brand-green">✓</span> {f}
                </li>
              ))}
            </ul>
            {plan.price > 0 && (
              <button className="w-full bg-brand-primary text-white font-body font-bold py-3 rounded-xl hover:bg-brand-primary/90 transition-colors">
                Get Started
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
