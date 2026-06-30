import { Metadata } from "next"
import Link from "next/link"
import { categoryMeta } from "@/lib/categorise"
import { shopData } from "@/lib/shopData"
import { siteConfig } from "@/lib/siteConfig"
import { PLANS } from "@/lib/stripe"
import { Hero } from "@/components/Hero"
import { ProductCard } from "@/components/ProductCard"
import { CategoryCard } from "@/components/CategoryCard"

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

// FAQ schema — AEO-structured content; replace with real Q&As on deployment
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

// Placeholder video cards — shown until a real YouTube channel is connected
const placeholderVideos = [
  { id: 1, title: "Getting Started with [Creator Name]", views: "124K", duration: "12:34", category: "Getting Started" },
  { id: 2, title: "The Ultimate Beginner's Guide", views: "98K", duration: "18:02", category: "Tutorials" },
  { id: 3, title: "5 Tips You Need to Know", views: "201K", duration: "8:47", category: "Tips & Tricks" },
  { id: 4, title: "Deep Dive: Everything Explained", views: "76K", duration: "34:21", category: "Deep Dives" },
  { id: 5, title: "My Honest Review — Worth It?", views: "143K", duration: "15:09", category: "Reviews" },
  { id: 6, title: "Q&A — Your Questions Answered", views: "89K", duration: "22:56", category: "Community" },
]

function PlaceholderVideoCard({ video }: { video: typeof placeholderVideos[0] }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-md transition-shadow duration-200">
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-2 relative">
        <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
          <span className="text-brand-primary text-xl">▶</span>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-body px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      <div className="p-3">
        <span className="text-xs font-body text-brand-primary font-semibold">{video.category}</span>
        <p className="font-display font-semibold text-brand-dark text-sm leading-snug mt-0.5 line-clamp-2">
          {video.title}
        </p>
        <p className="font-body text-brand-dark/40 text-xs mt-1">{video.views} views</p>
      </div>
    </div>
  )
}

export default function HomePage() {
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
      <section id="videos" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl">
              Latest Videos
            </h2>
            <p className="font-body text-brand-dark/40 text-sm mt-1">
              Connect your YouTube channel to display real videos
            </p>
          </div>
          <Link href="/videos" className="font-body font-semibold text-brand-primary text-sm hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholderVideos.map((video) => (
            <PlaceholderVideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl">
              Browse by Category
            </h2>
            <p className="font-body text-brand-dark/50 mt-1">
              Find exactly what you&apos;re looking for
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(categoryMeta).map(([slug, meta]) => (
              <CategoryCard key={slug} slug={slug} label={meta.label} emoji={meta.emoji} description={meta.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Content Hub CTA */}
      <section className="bg-brand-dark py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-black text-white text-3xl md:text-4xl mb-3">
            Content Hub
          </h2>
          <p className="font-body text-white/50 text-base mb-8">
            Featured picks, curated playlists, and top-rated content from [Creator Name] — all in one place.
          </p>
          <Link
            href="/play"
            className="inline-block bg-brand-primary text-white font-display font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-brand-primary/30 hover:bg-brand-primary/90 transition-all duration-200 hover:scale-105"
          >
            Open Content Hub
          </Link>
        </div>
      </section>

      {/* Free Resources */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl">
              Free Resources
            </h2>
            <p className="font-body text-brand-dark/50 mt-1">
              Guides, cheat sheets, and templates — no sign-up needed
            </p>
          </div>
          <Link href="/worksheets" className="hidden sm:block font-body font-semibold text-brand-primary text-sm hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { emoji: "📖", title: "Starter Guide", desc: "Everything you need to get going" },
            { emoji: "📋", title: "Cheat Sheet", desc: "Key reference — print and keep handy" },
            { emoji: "🛠️", title: "Resource Toolkit", desc: "Curated tools and recommendations" },
          ].map((w) => (
            <Link
              key={w.title}
              href="/worksheets"
              className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-primary/20 transition-all text-center hover:-translate-y-0.5"
            >
              <span className="text-4xl block mb-3">{w.emoji}</span>
              <h3 className="font-display font-bold text-brand-dark text-base">{w.title}</h3>
              <p className="font-body text-brand-dark/50 text-sm mt-1 mb-4">{w.desc}</p>
              <span className="inline-block bg-brand-primary/10 text-brand-primary font-body font-semibold text-sm px-4 py-1.5 rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                Download Free
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Creator Recommends */}
      {featuredShop.length > 0 && (
        <section className="bg-slate-50 border-y border-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl">
                  Recommended
                </h2>
                <p className="font-body text-brand-dark/50 mt-1">
                  Products and tools [Creator Name] personally recommends
                </p>
              </div>
              <Link href="/shop" className="font-body font-semibold text-brand-primary text-sm hover:underline">
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
      )}

      {/* Exclusive Content CTA */}
      <section className="bg-gradient-to-br from-brand-primary to-indigo-700 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-black text-white text-3xl md:text-4xl mb-3">
            {siteConfig.exclusiveContent.heading}
          </h2>
          <p className="font-body text-white/70 text-base mb-8">
            {siteConfig.exclusiveContent.description}
          </p>
          <a
            href={siteConfig.exclusiveContent.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-primary font-display font-bold text-base px-10 py-3.5 rounded-xl shadow-lg hover:bg-brand-yellow hover:text-brand-dark transition-all duration-200 hover:scale-105"
          >
            Order Now
          </a>
        </div>
      </section>

      {/* Subscribe / Membership */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-primary/10 text-brand-primary font-display font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              Membership
            </span>
            <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl mb-3">
              Start free. Go further with Premium.
            </h2>
            <p className="font-body text-brand-dark/50 text-base max-w-xl mx-auto">
              Everything is free — or unlock the full experience with Premium for {siteConfig.subscription.currency}{(PLANS.premium.price / 100).toFixed(2)}/month.
            </p>
          </div>

          {/* Two-column cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="font-display font-bold text-brand-dark/40 text-xs uppercase tracking-widest">Free</p>
                  <p className="font-display font-black text-brand-dark text-3xl">£0</p>
                </div>
                <span className="text-2xl">🎯</span>
              </div>
              <ul className="space-y-2.5">
                {PLANS.free.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 font-body text-brand-dark/70 text-sm">
                    <span className="text-brand-green font-bold text-base leading-none">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium */}
            <div className="bg-brand-dark rounded-2xl p-7 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/25 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
              <div className="relative flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-display font-bold text-brand-primary text-xs uppercase tracking-widest">Premium</p>
                    <span className="bg-brand-yellow text-brand-dark font-display font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                      {siteConfig.subscription.trialDays}-day free trial
                    </span>
                  </div>
                  <p className="font-display font-black text-white text-3xl">
                    {siteConfig.subscription.currency}{(PLANS.premium.price / 100).toFixed(2)}
                    <span className="text-white/40 text-sm font-body font-normal ml-1">/mo</span>
                  </p>
                </div>
                <span className="text-2xl">⭐</span>
              </div>
              <ul className="relative space-y-2.5">
                {PLANS.premium.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 font-body text-white/80 text-sm">
                    <span className="text-brand-primary font-bold text-base leading-none">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-block bg-brand-primary text-white font-display font-bold text-base px-10 py-3.5 rounded-xl shadow-lg shadow-brand-primary/30 hover:bg-brand-primary/90 transition-all duration-200 hover:scale-105"
            >
              See full pricing
            </Link>
            <Link
              href="/videos"
              className="inline-block border-2 border-gray-200 text-brand-dark font-display font-bold text-base px-10 py-3.5 rounded-xl hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              Start for free
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — AEO structured content */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="font-display font-black text-brand-dark text-3xl mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="bg-white rounded-xl border border-gray-100 p-5 group">
              <summary className="font-body font-semibold text-brand-dark cursor-pointer list-none flex items-center justify-between text-sm">
                {faq.question}
                <span className="text-brand-primary font-bold ml-4 shrink-0">+</span>
              </summary>
              <p className="font-body text-brand-dark/60 mt-3 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-14 no-print">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="font-display font-bold text-brand-yellow text-sm uppercase tracking-widest mb-4">Watch</h4>
              <nav className="space-y-2.5">
                {[
                  { href: "/videos", label: "All Videos" },
                  { href: "/category/getting-started", label: "Getting Started" },
                  { href: "/category/tutorials", label: "Tutorials" },
                  { href: "/category/tips-and-tricks", label: "Tips & Tricks" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block font-body text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-yellow text-sm uppercase tracking-widest mb-4">Explore</h4>
              <nav className="space-y-2.5">
                {[
                  { href: "/play", label: "Content Hub" },
                  { href: "/worksheets", label: "Free Resources" },
                  { href: "/activity", label: "AI Generator" },
                  { href: "/progress", label: "My Progress" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block font-body text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-yellow text-sm uppercase tracking-widest mb-4">Creator</h4>
              <nav className="space-y-2.5">
                {[
                  { href: "/about", label: "About" },
                  { href: "/shop", label: "Shop" },
                  { href: "/personalised", label: "Exclusive Content" },
                  { href: "/privacy", label: "Privacy" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block font-body text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-yellow text-sm uppercase tracking-widest mb-4">Follow</h4>
              <nav className="space-y-2.5">
                {[
                  { href: siteConfig.socials.youtube, label: "YouTube" },
                  { href: siteConfig.socials.instagram, label: "Instagram" },
                  { href: siteConfig.socials.tiktok, label: "TikTok" },
                  { href: siteConfig.socials.facebook, label: "Facebook" },
                ].map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="block font-body text-sm text-white/50 hover:text-white transition-colors">{l.label}</a>
                ))}
              </nav>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-body text-white/30 text-xs">
              © {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
            </p>
            <p className="font-body text-white/20 text-xs">
              Built on the Creator Hub platform
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
