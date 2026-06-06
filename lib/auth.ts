// Auth helpers — scaffold only, invisible in MVP
// Stage 2: set NEXT_PUBLIC_AUTH_ENABLED=true in Vercel to activate

import { supabase } from "./supabase"

export async function signInWithGoogle() {
  if (!supabase) throw new Error("Supabase not configured")
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })
  if (error) throw error
}

export async function signInWithEmail(email: string, password: string) {
  if (!supabase) throw new Error("Supabase not configured")
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signUpWithEmail(
  email: string,
  password: string,
  childName: string,
  childAge: string
) {
  if (!supabase) throw new Error("Supabase not configured")
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { child_name: childName, child_age: childAge },
    },
  })
  if (error) throw error
  return data
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}

export async function getUser() {
  if (!supabase) return null
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function checkSubscription(
  userId: string
): Promise<"free" | "premium"> {
  if (!supabase) return "free"
  const { data } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", userId)
    .single()
  return (data?.subscription_status as "free" | "premium") || "free"
}
