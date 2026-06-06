// Stripe webhook — scaffold only, not activated in MVP
// Stage 2: register this endpoint in your Stripe dashboard

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_SUBSCRIPTION_ENABLED !== "true") {
    return NextResponse.json({ received: true })
  }

  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  try {
    const { stripe } = await import("@/lib/stripe")
    if (!stripe || !sig) return NextResponse.json({ error: "Not configured" }, { status: 400 })

    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    const { supabase } = await import("@/lib/supabase")

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as { metadata?: { userId?: string }; subscription?: string }
        const userId = session.metadata?.userId
        if (userId && supabase) {
          await supabase
            .from("profiles")
            .update({ subscription_status: "premium", subscription_id: session.subscription })
            .eq("id", userId)
        }
        break
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as { metadata?: { userId?: string } }
        const userId = sub.metadata?.userId
        if (userId && supabase) {
          await supabase
            .from("profiles")
            .update({ subscription_status: "free" })
            .eq("id", userId)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("Stripe webhook error:", err)
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 })
  }
}
