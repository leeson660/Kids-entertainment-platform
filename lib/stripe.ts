// Stripe — scaffold only, invisible in MVP
// Stage 2: set STRIPE_SECRET_KEY in Vercel to activate

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
      "All YouTube videos",
      "All 3 games",
      "2 worksheets",
      "3 activities/day",
    ],
  },
  premium: {
    name: "Premium",
    price: 499,
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    features: [
      "Everything free",
      "Exclusive videos",
      "All worksheets",
      "Unlimited activities",
      "Early access",
    ],
  },
}
