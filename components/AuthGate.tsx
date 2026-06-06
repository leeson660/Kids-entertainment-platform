// AuthGate — MVP: completely transparent, renders children unconditionally
// Stage 2: set NEXT_PUBLIC_SUBSCRIPTION_ENABLED=true and NEXT_PUBLIC_AUTH_ENABLED=true

import { ReactNode } from "react"

interface AuthGateProps {
  children: ReactNode
}

export function AuthGate({ children }: AuthGateProps) {
  if (process.env.NEXT_PUBLIC_SUBSCRIPTION_ENABLED !== "true") {
    return <>{children}</>
  }
  // Stage 2: check auth + subscription status here
  return <>{children}</>
}
