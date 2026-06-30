import { Metadata } from "next"
import Link from "next/link"
import { PLANS } from "@/lib/stripe"
import { siteConfig } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Pricing | [Creator Name]",
  description:
    "Free access to all videos and resources. Go Premium for exclusive content, unlimited AI tools, and direct access to [Creator Name].",
}

const freeFeatures = PLANS.free.features
const premiumFeatures = PLANS.premium.features

export default function PricingPage() {
  const monthlyPrice = (PLANS.premium.price / 100).toFixed(2)

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="font-display font-black text-brand-dark text-4xl md:text-5xl mb-4">
          Simple, transparent pricing
        </h1>
        <p className="font-body text-brand-dark/50 text-lg max-w-xl mx-auto">
          Everything is free to start. Upgrade to Premium when you want more.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">

        {/* Free */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
          <div className="mb-6">
            <p className="font-display font-bold text-brand-dark/50 text-sm uppercase tracking-widest mb-1">Free</p>
            <p className="font-display font-black text-brand-dark text-5xl">£0</p>
            <p className="font-body text-brand-dark/40 text-sm mt-1">Forever free — no card needed</p>
          </div>
          <ul className="space-y-3 flex-1 mb-8">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 font-body text-brand-dark/70 text-sm">
                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-brand-dark/50 text-xs">✓</span>
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/videos"
            className="block text-center border-2 border-gray-200 text-brand-dark font-display font-bold py-3 rounded-xl hover:border-brand-primary hover:text-brand-primary transition-colors"
          >
            Get Started Free
          </Link>
        </div>

        {/* Premium */}
        <div className="bg-brand-dark rounded-2xl p-8 flex flex-col relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative mb-6">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-display font-bold text-brand-primary text-sm uppercase tracking-widest">Premium</p>
              <span className="bg-brand-yellow text-brand-dark font-display font-bold text-xs px-2 py-0.5 rounded-full">
                {siteConfig.subscription.trialDays}-day free trial
              </span>
            </div>
            <p className="font-display font-black text-white text-5xl">
              {siteConfig.subscription.currency}{monthlyPrice}
            </p>
            <p className="font-body text-white/40 text-sm mt-1">per month · cancel anytime</p>
          </div>

          <ul className="space-y-3 flex-1 mb-8 relative">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 font-body text-white/80 text-sm">
                <span className="w-5 h-5 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-brand-primary text-xs">✓</span>
                </span>
                {f}
              </li>
            ))}
          </ul>

          <button
            className="relative block w-full text-center bg-brand-primary text-white font-display font-bold py-3.5 rounded-xl hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/30"
            disabled
            title="Connect Stripe to activate — see .env.local.example"
          >
            Start Free Trial
          </button>
          <p className="font-body text-white/30 text-xs text-center mt-3">
            Requires Stripe — set STRIPE_SECRET_KEY to activate
          </p>
        </div>
      </div>

      {/* Feature comparison table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-14">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-display font-bold text-brand-dark text-lg">Full comparison</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left font-body font-semibold text-brand-dark/50 px-6 py-3 w-1/2">Feature</th>
              <th className="font-body font-semibold text-brand-dark/50 px-6 py-3 text-center">Free</th>
              <th className="font-body font-semibold text-brand-primary px-6 py-3 text-center">Premium</th>
            </tr>
          </thead>
          <tbody>
            {[
              { feature: "Full video library", free: true, premium: true },
              { feature: "Downloadable resources", free: true, premium: true },
              { feature: "AI activity generator", free: "3/day", premium: "Unlimited" },
              { feature: "Progress tracking & badges", free: true, premium: true },
              { feature: "Exclusive members-only videos", free: false, premium: true },
              { feature: "Early access to new content", free: false, premium: true },
              { feature: "Members-only community", free: false, premium: true },
              { feature: "Monthly live Q&A", free: false, premium: true },
            ].map((row, i) => (
              <tr key={row.feature} className={i % 2 === 0 ? "bg-gray-50/50" : ""}>
                <td className="font-body text-brand-dark/70 px-6 py-3">{row.feature}</td>
                <td className="text-center px-6 py-3">
                  {row.free === true
                    ? <span className="text-brand-green font-bold">✓</span>
                    : row.free === false
                    ? <span className="text-brand-dark/20">—</span>
                    : <span className="font-body text-brand-dark/60 text-xs">{row.free}</span>
                  }
                </td>
                <td className="text-center px-6 py-3">
                  {row.premium === true
                    ? <span className="text-brand-primary font-bold">✓</span>
                    : row.premium === false
                    ? <span className="text-brand-dark/20">—</span>
                    : <span className="font-body text-brand-primary font-semibold text-xs">{row.premium}</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">Common questions</h2>
        <div className="space-y-3">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes — cancel in one click, no questions asked. You keep Premium access until the end of your billing period.",
            },
            {
              q: "What happens after the free trial?",
              a: `You'll be charged ${siteConfig.subscription.currency}${monthlyPrice}/month after the ${siteConfig.subscription.trialDays}-day trial ends. You can cancel before the trial expires and you won't be charged.`,
            },
            {
              q: "Is the free plan really free forever?",
              a: "Yes. The free plan never expires and includes full access to all videos, resources, and the AI generator.",
            },
            {
              q: "How do I access Premium content?",
              a: "Once subscribed, Premium content is unlocked automatically when you sign in to your account.",
            },
          ].map((item) => (
            <details key={item.q} className="bg-white rounded-xl border border-gray-100 p-5">
              <summary className="font-body font-semibold text-brand-dark cursor-pointer list-none flex items-center justify-between text-sm">
                {item.q}
                <span className="text-brand-primary font-bold ml-4 shrink-0">+</span>
              </summary>
              <p className="font-body text-brand-dark/60 mt-3 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
