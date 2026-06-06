"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const mobileNavItems = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/videos", label: "Videos", emoji: "📺" },
  { href: "/play", label: "Play", emoji: "🎮" },
  { href: "/worksheets", label: "Sheets", emoji: "📄" },
  { href: "/progress", label: "Progress", emoji: "⭐" },
]

export function MobileNav() {
  const pathname = usePathname()

  // Hide on game pages (the play page handles its own back button)
  if (pathname.startsWith("/play/game")) return null

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex items-stretch">
        {mobileNavItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 min-h-[56px] transition-colors ${
                isActive
                  ? "text-brand-primary bg-brand-primary/10"
                  : "text-brand-dark/60"
              }`}
            >
              <span className="text-xl leading-none">{item.emoji}</span>
              <span className="text-[10px] font-body font-semibold">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
