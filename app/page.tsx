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
  title: "Miss Katie's Class | Toddler Learning Videos, Games & Activities",
  description:
    "Learn, sing and play with Miss Katie. Free educational videos, interactive games and printable activities for babies and toddlers aged 0-4.",
  alternates: { canonical: "https://misskatiesclass.com" },
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Miss Katie's Class",
  url: "https://misskatiesclass.com",
  sameAs: [siteConfig.socials.youtube, siteConfig.socials.instagram],
}

const faqs = [
  {
    question: "What age are Miss Katie's videos suitable for?",
    answer:
      "Miss Katie's videos are designed for babies and toddlers aged 0-4, focusing on first words, speech development, songs, and early learning.",
  },
  {
    question: "Are the games and activities free?",
    answer:
      "Yes — all videos, games, and printable worksheets on Miss Katie's Class are completely free.",
  },
  {
    question: "How do I get a personalised video from Miss Katie?",
    answer:
      "You can order a personalised video from the Personalised Videos page. Miss Katie creates a custom video featuring your child's name.",
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
            Latest from Miss Katie 🎬
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
            What would you like to learn today? 📚
          </h2>
          <p className="font-body text-brand-dark/60 text-center mb-8">
            Tap a category to find videos just for you
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(categoryMeta).map(([slug, meta]) => (
              <CategoryCard key={slug} slug={slug} label={meta.label} emoji={meta.emoji} description={meta.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Games teaser */}
      <section className="bg-brand-yellow py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl mb-4">
            Play &amp; Learn 🎮
          </h2>
          <p className="font-body text-brand-dark/70 text-lg mb-8">
            Interactive learning games for toddlers — tap the animal, match the colour,
            identify shapes. All free, all fun!
          </p>
          <Link
            href="/play"
            className="inline-block bg-brand-dark text-white font-display font-black text-xl px-10 py-5 rounded-2xl shadow-lg hover:bg-brand-dark/90 transition-all duration-200 hover:scale-105 w-full sm:w-auto"
          >
            🎮 Play Now — It&apos;s Free!
          </Link>
        </div>
      </section>

      {/* Free Printables teaser */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl">
              Free Printable Activities 🖨️
            </h2>
            <p className="font-body text-brand-dark/60 mt-2">
              Print and play alongside Miss Katie&apos;s videos
            </p>
          </div>
          <Link href="/worksheets" className="hidden sm:block font-body font-semibold text-brand-primary hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { emoji: "🐾", title: "Animal Match", desc: "Match animals to their names" },
            { emoji: "🔤", title: "Trace the Letters", desc: "Trace A–F with dotted lines" },
            { emoji: "😊", title: "How Do You Feel?", desc: "Explore emotions together" },
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
                Print &amp; Play
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Miss Katie Recommends */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-black text-brand-dark text-3xl md:text-4xl">
              Miss Katie Recommends 🌟
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

      {/* Personalised Video CTA */}
      <section className="bg-gradient-to-r from-brand-red to-pink-600 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-black text-white text-3xl md:text-4xl mb-4">
            {siteConfig.personalisedVideo.heading} 🎬
          </h2>
          <p className="font-body text-white/90 text-lg mb-8">
            {siteConfig.personalisedVideo.description}
          </p>
          <a
            href={siteConfig.personalisedVideo.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-red font-display font-black text-xl px-10 py-5 rounded-2xl shadow-lg hover:bg-brand-yellow hover:text-brand-dark transition-all duration-200 hover:scale-105"
          >
            Order Now ✨
          </a>
        </div>
      </section>

      {/* FAQ */}
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
              <h4 className="font-display font-bold text-brand-yellow mb-3">Learn</h4>
              <nav className="space-y-2">
                {[{ href: "/videos", label: "Videos" }, { href: "/category/animals", label: "Animals" }, { href: "/category/songs", label: "Songs" }, { href: "/category/sign-language", label: "Sign Language" }].map((l) => (
                  <Link key={l.href} href={l.href} className="block font-body text-sm text-white/70 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-yellow mb-3">Play</h4>
              <nav className="space-y-2">
                {[{ href: "/play", label: "Games" }, { href: "/worksheets", label: "Worksheets" }, { href: "/activity", label: "Activities" }, { href: "/progress", label: "Progress" }].map((l) => (
                  <Link key={l.href} href={l.href} className="block font-body text-sm text-white/70 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-yellow mb-3">Miss Katie</h4>
              <nav className="space-y-2">
                {[{ href: "/about", label: "About" }, { href: "/shop", label: "Shop" }, { href: "/personalised", label: "Personalised Videos" }, { href: "/privacy", label: "Privacy" }].map((l) => (
                  <Link key={l.href} href={l.href} className="block font-body text-sm text-white/70 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-yellow mb-3">Follow Us</h4>
              <nav className="space-y-2">
                {[{ href: siteConfig.socials.youtube, label: "▶ YouTube" }, { href: siteConfig.socials.instagram, label: "📸 Instagram" }, { href: siteConfig.socials.tiktok, label: "🎵 TikTok" }, { href: siteConfig.socials.facebook, label: "👍 Facebook" }].map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="block font-body text-sm text-white/70 hover:text-white transition-colors">{l.label}</a>
                ))}
              </nav>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="font-body text-white/40 text-sm">
              © {new Date().getFullYear()} {siteConfig.companyName}. Made with ❤️ for little learners.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
