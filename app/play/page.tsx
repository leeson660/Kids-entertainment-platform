// Content Hub — replaces the children's games page with a generic
// featured-content showcase suitable for any creator's audience.

import { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/siteConfig"
import { categoryMeta } from "@/lib/categorise"

export const metadata: Metadata = {
  title: "Content Hub | [Creator Name]",
  description:
    "Explore the best of [Creator Name]'s content — featured videos, curated playlists, top picks, and more.",
}

export default function ContentHubPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="font-display font-black text-brand-dark text-4xl md:text-5xl mb-4">
          Content Hub 🗂️
        </h1>
        <p className="font-body text-brand-dark/60 text-lg max-w-xl mx-auto">
          The best of [Creator Name] — curated, categorised, and ready to explore. Start with a
          featured pick or dive into a category below.
        </p>
      </div>

      {/* Featured Picks */}
      <section className="mb-14">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">
          ⭐ Featured Picks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              emoji: "🚀",
              label: "Start Here",
              desc: "New to [Creator Name]? These videos are the perfect place to begin.",
              href: "/category/getting-started",
              colour: "from-brand-primary/20 to-sky-200/40",
            },
            {
              emoji: "🎓",
              label: "Most Popular Tutorials",
              desc: "The step-by-step guides that have helped the most viewers.",
              href: "/category/tutorials",
              colour: "from-brand-yellow/30 to-amber-100/40",
            },
            {
              emoji: "💡",
              label: "Quick Tips",
              desc: "Short, punchy videos — great for a 5-minute learning session.",
              href: "/category/tips-and-tricks",
              colour: "from-brand-green/20 to-emerald-100/40",
            },
            {
              emoji: "🔍",
              label: "Deep Dives",
              desc: "Got time to go all in? These long-form explorations are worth every minute.",
              href: "/category/deep-dives",
              colour: "from-purple-200/40 to-pink-100/40",
            },
          ].map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className={`group bg-gradient-to-br ${card.colour} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 border-2 border-white/60`}
            >
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-200">
                {card.emoji}
              </span>
              <h3 className="font-display font-bold text-brand-dark text-xl mb-1">{card.label}</h3>
              <p className="font-body text-brand-dark/60 text-sm">{card.desc}</p>
              <span className="inline-block mt-4 text-brand-primary font-body font-semibold text-sm group-hover:underline">
                Browse videos →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse All Categories */}
      <section className="mb-14">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">
          📚 Browse All Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(categoryMeta).map(([slug, meta]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-center hover:-translate-y-1"
            >
              <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">{meta.emoji}</span>
              <h3 className="font-body font-semibold text-brand-dark text-sm">{meta.label}</h3>
              <p className="font-body text-brand-dark/40 text-xs mt-1 line-clamp-2">{meta.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* YouTube CTA */}
      <div className="bg-brand-dark rounded-2xl p-8 text-center">
        <p className="font-display font-bold text-white text-xl mb-2">
          Want even more content?
        </p>
        <p className="font-body text-white/70 text-sm mb-6">
          Subscribe on YouTube and never miss a new upload from {siteConfig.creatorName}.
        </p>
        <a
          href={siteConfig.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-red text-white font-display font-black text-lg px-8 py-4 rounded-2xl hover:bg-brand-red/90 transition-colors"
        >
          ▶ Subscribe on YouTube
        </a>
      </div>
    </div>
  )
}
