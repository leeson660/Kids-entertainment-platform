// Stripe — scaffold only, invisible in MVP
// Stage 2: set STRIPE_SECRET_KEY in Vercel env vars to activate payments

import Stripe from "stripe"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" as any })
  : null

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    features: [
      "Full video library",
      "Browse all categories",
      "Free downloadable resources",
      "AI activity generator (3/day)",
      "Progress tracking & badges",
    ],
  },
  premium: {
    name: "Premium",
    price: 499, // pence — £4.99/mo
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    features: [
      "Everything in Free",
      "Exclusive members-only videos",
      "Unlimited AI activity generator",
      "Early access to new content",
      "Members-only community access",
      "Monthly live Q&A with [Creator Name]",
    ],
  },
}
