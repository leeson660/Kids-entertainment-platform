import { Metadata } from "next"
import Link from "next/link"
import { getChannelVideos } from "@/lib/youtube"
import { categoryMeta } from "@/lib/categorise"
import { shopData } from "@/lib/shopData"
import { siteConfig } from "@/lib/siteConfig"
import { Hero } from "@/components/Hero"
import { ProductCard } from "@/components/ProductCard"
import { CategoryCard } from "@/components/CategoryCard"
import { VideoGridClient } from "./VideoGridClient"

export const metadata: Metadata = {
  title: "[Creator Name] | Official Content Hub — Videos, Resources & More",
  description:
    "Watch, learn and explore with [Creator Name]. Free videos, downloadable resources, an AI-powered activity generator, and exclusive content — all in one place.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://[your-domain].com",
  },
}

// Organisation schema — replace with real entity data on deployment
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "[Creator Name]",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://[your-domain].com",
  sameAs: [siteConfig.socials.youtube, siteConfig.socials.instagram],
}

// FAQ schema — demonstrates AEO-structured content architecture
// Replace questions and answers with real creator-specific copy on deployment
const faqs = [
  {
    question: "What kind of content does [Creator Name] make?",
    answer:
      "[Creator Name] makes [describe your niche] videos covering [list main topics]. New content is published regularly — subscribe on YouTube and enable notifications to never miss an upload.",
  },
  {
    question: "How often is new content uploaded?",
    answer:
      "[Creator Name] uploads new videos on a [weekly/fortnightly/monthly] schedule. You can also browse the full archive on the Videos page.",
  },
  {
    question: "Are the resources and tools on this site free?",
    answer:
      "Yes — all videos, downloadable resources, and the AI activity generator on this site are completely free to use.",
  },
  {
    question: "How do I get exclusive content from [Creator Name]?",
    answer:
      "You can order exclusive, personalised content directly through this site. Visit the Exclusive Content page to see what's available and how to order.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
}

export default async function HomePage() {
  let allVideos: Awaited<ReturnType<typeof getChannelVideos>> = []
  try {
    allVideos = await getChannelVideos()
  } catch {
    // Error handled by empty state below
  }
  const latestVideos = allVideos.slice(0, 6)
  const featuredShop = shopData.filter((p) => p.featured).slice(0, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Hero />

      {/* Latest Videos */}
      <section id="videos" className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl">
            Latest from [Creator Name] 🎬
          </h2>
          <Link href="/videos" className="font-body font-semibold text-brand-primary hover:underline">
            See all →
          </Link>
        </div>
        {latestVideos.length > 0 ? (
          <VideoGridClient videos={latestVideos} />
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="font-body text-brand-dark/50 text-lg">
              🎬 Videos will appear here once your YouTube API key is configured.
            </p>
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl mb-3 text-center">
            What would you like to explore? 📚
          </h2>
          <p className="font-body text-brand-dark/60 text-center mb-8">
            Browse content by category
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(categoryMeta).map(([slug, meta]) => (
              <CategoryCard key={slug} slug={slug} label={meta.label} emoji={meta.emoji} description={meta.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Content Hub teaser */}
      <section className="bg-brand-yellow py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl mb-4">
            Explore the Content Hub 🗂️
          </h2>
          <p className="font-body text-brand-dark/70 text-lg mb-8">
            Featured videos, curated playlists, and top picks from [Creator Name] — all in one place.
          </p>
          <Link
            href="/play"
            className="inline-block bg-brand-dark text-white font-display font-black text-xl px-10 py-5 rounded-2xl shadow-lg hover:bg-brand-dark/90 transition-all duration-200 hover:scale-105 w-full sm:w-auto"
          >
            🗂️ Open Content Hub
          </Link>
        </div>
      </section>

      {/* Free Resources teaser */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl">
              Free Downloadable Resources 📥
            </h2>
            <p className="font-body text-brand-dark/60 mt-2">
              Guides, cheat sheets, templates and more — completely free
            </p>
          </div>
          <Link href="/worksheets" className="hidden sm:block font-body font-semibold text-brand-primary hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { emoji: "📖", title: "Starter Guide", desc: "Everything you need to get going" },
            { emoji: "📋", title: "Cheat Sheet", desc: "Key reference — print and keep handy" },
            { emoji: "🛠️", title: "Resource Toolkit", desc: "Curated tools and recommendations" },
          ].map((w) => (
            <Link
              key={w.title}
              href="/worksheets"
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all text-center hover:-translate-y-1"
            >
              <span className="text-5xl block mb-3 group-hover:scale-110 transition-transform duration-200">
                {w.emoji}
              </span>
              <h3 className="font-display font-bold text-brand-dark text-lg">{w.title}</h3>
              <p className="font-body text-brand-dark/50 text-sm mt-1">{w.desc}</p>
              <span className="inline-block mt-4 bg-brand-primary text-white font-body font-bold text-sm px-4 py-2 rounded-xl">
                Download Free
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Creator Recommends */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl">
              [Creator Name] Recommends 🌟
            </h2>
            <Link href="/shop" className="font-body font-semibold text-brand-primary hover:underline">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredShop.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Content CTA */}
      <section className="bg-gradient-to-r from-brand-red to-pink-600 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-black text-white text-3xl md:text-4xl mb-4">
            {siteConfig.exclusiveContent.heading} 🎬
          </h2>
          <p className="font-body text-white/90 text-lg mb-8">
            {siteConfig.exclusiveContent.description}
          </p>
          <a
            href={siteConfig.exclusiveContent.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-red font-display font-black text-xl px-10 py-5 rounded-2xl shadow-lg hover:bg-brand-yellow hover:text-brand-dark transition-all duration-200 hover:scale-105"
          >
            Order Now ✨
          </a>
        </div>
      </section>

      {/* FAQ — AEO structured content */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <h2 className="font-display font-black text-brand-dark text-3xl mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="bg-white rounded-2xl shadow-sm p-5 group">
              <summary className="font-body font-semibold text-brand-dark cursor-pointer list-none flex items-center justify-between">
                {faq.question}
                <span className="text-brand-primary text-xl font-bold">+</span>
              </summary>
              <p className="font-body text-brand-dark/70 mt-3 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12 no-print">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <h4 className="font-display font-bold text-brand-yellow mb-3">Watch</h4>
              <nav className="space-y-2">
                {[
                  { href: "/videos", label: "All Videos" },
                  { href: "/category/getting-started", label: "Getting Started" },
                  { href: "/category/tutorials", label: "Tutorials" },
                  { href: "/category/tips-and-tricks", label: "Tips & Tricks" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block font-body text-sm text-white/70 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-yellow mb-3">Explore</h4>
              <nav className="space-y-2">
                {[
                  { href: "/play", label: "Content Hub" },
                  { href: "/worksheets", label: "Free Resources" },
                  { href: "/activity", label: "AI Activity Generator" },
                  { href: "/progress", label: "My Progress" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block font-body text-sm text-white/70 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-yellow mb-3">[Creator Name]</h4>
              <nav className="space-y-2">
                {[
                  { href: "/about", label: "About" },
                  { href: "/shop", label: "Shop" },
                  { href: "/personalised", label: "Exclusive Content" },
                  { href: "/privacy", label: "Privacy" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block font-body text-sm text-white/70 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-yellow mb-3">Follow</h4>
              <nav className="space-y-2">
                {[
                  { href: siteConfig.socials.youtube, label: "▶ YouTube" },
                  { href: siteConfig.socials.instagram, label: "📸 Instagram" },
                  { href: siteConfig.socials.tiktok, label: "🎵 TikTok" },
                  { href: siteConfig.socials.facebook, label: "👍 Facebook" },
                ].map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="block font-body text-sm text-white/70 hover:text-white transition-colors">{l.label}</a>
                ))}
              </nav>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="font-body text-white/40 text-sm">
              © {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
