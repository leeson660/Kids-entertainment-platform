"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Wordmark } from "./Wordmark"
import { StarCounter } from "./StarCounter"
import { siteConfig } from "@/lib/siteConfig"

const navLinks = [
  { href: "/videos", label: "Videos" },
  { href: "/play", label: "Content Hub" },
  { href: "/worksheets", label: "Resources" },
  { href: "/activity", label: "Activities" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Wordmark size="small" dark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-xl font-body text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? "bg-brand-primary text-white"
                  : "text-brand-dark hover:bg-brand-primary/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/personalised"
            className="ml-2 px-4 py-2 rounded-xl bg-brand-red text-white font-body text-sm font-bold hover:bg-brand-red/90 transition-colors"
          >
            Exclusive Content
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <StarCounter />
          <Link
            href="/progress"
            className="hidden md:block text-xs font-body text-brand-dark/60 hover:text-brand-dark transition-colors"
          >
            Progress
          </Link>
        </div>
      </div>

      {/* Channel link bar — desktop only */}
      <div className="hidden md:block bg-brand-primary/10 border-t border-brand-primary/20">
        <div className="max-w-6xl mx-auto px-4 py-1 flex justify-end">
          <a
            href={siteConfig.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-body text-brand-dark/60 hover:text-brand-dark transition-colors flex items-center gap-1"
          >
            <span>▶</span>
            <span>{siteConfig.channelHandle} on YouTube</span>
          </a>
        </div>
      </div>
    </header>
  )
}
