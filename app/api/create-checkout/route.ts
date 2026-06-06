// Stripe checkout — scaffold only, not activated in MVP
// Stage 2: set STRIPE_SECRET_KEY and STRIPE_PREMIUM_PRICE_ID in Vercel

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_SUBSCRIPTION_ENABLED !== "true") {
    return NextResponse.json({ error: "Subscriptions not enabled" }, { status: 403 })
  }

  try {
    const { stripe } = await import("@/lib/stripe")
    if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })

    const { userId } = await req.json()
    const { PLANS } = await import("@/lib/stripe")

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: PLANS.premium.stripePriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: { userId },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("create-checkout error:", err)
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 })
  }
}
