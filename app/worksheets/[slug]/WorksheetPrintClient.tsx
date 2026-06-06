"use client"

import { useEffect } from "react"
import { updateProgress } from "@/lib/rewards"

export function WorksheetPrintClient({ slug }: { slug: string }) {
  useEffect(() => {
    updateProgress("print_worksheet", { slug })
  }, [slug])

  return (
    <button
      onClick={() => window.print()}
      className="bg-brand-primary text-white font-body font-bold px-6 py-3 rounded-xl hover:bg-brand-primary/90 transition-colors"
    >
      🖨️ Print This Sheet
    </button>
  )
}
