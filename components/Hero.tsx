import Link from "next/link"
import { siteConfig } from "@/lib/siteConfig"
import { Wordmark } from "./Wordmark"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary to-sky-400 overflow-hidden py-16 md:py-24 px-4">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span className="absolute top-8 left-6 text-4xl opacity-40 animate-float" style={{ animationDelay: "0s" }}>⭐</span>
        <span className="absolute top-16 right-8 text-3xl opacity-30 animate-float" style={{ animationDelay: "0.5s" }}>🎵</span>
        <span className="absolute bottom-12 left-10 text-3xl opacity-30 animate-float" style={{ animationDelay: "1s" }}>🌈</span>
        <span className="absolute top-24 left-1/4 text-2xl opacity-25 animate-float" style={{ animationDelay: "1.5s" }}>✨</span>
        <span className="absolute bottom-8 right-12 text-4xl opacity-30 animate-float" style={{ animationDelay: "0.8s" }}>🎉</span>
        <span className="absolute top-6 right-1/3 text-3xl opacity-25 animate-float" style={{ animationDelay: "0.3s" }}>🐾</span>
        <span className="absolute bottom-16 right-1/4 text-2xl opacity-20 animate-float" style={{ animationDelay: "1.2s" }}>🌟</span>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Wordmark */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-4">
            <Wordmark size="large" />
          </div>
        </div>

        {/* Tagline */}
        <h1 className="font-display font-black text-white text-4xl md:text-6xl leading-tight mb-4 drop-shadow-md">
          {siteConfig.tagline}
        </h1>
        <p className="font-body text-white/90 text-xl md:text-2xl mb-8">
          {siteConfig.subTagline}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-2.5 flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <span className="font-display font-black text-white text-lg leading-none">131M+</span>
            <span className="font-body text-white/80 text-sm">Views</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-2.5 flex items-center gap-2">
            <span className="text-xl">👶</span>
            <span className="font-body text-white/90 text-sm font-semibold">Made for Ages 0–4</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-2.5 flex items-center gap-2">
            <span className="text-xl">💛</span>
            <span className="font-body text-white/90 text-sm font-semibold">Loved by Families Worldwide</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#videos"
            className="bg-white text-brand-primary font-display font-black text-lg px-8 py-4 rounded-2xl shadow-lg hover:bg-brand-yellow hover:text-brand-dark transition-all duration-200 hover:scale-105"
          >
            🎬 Start Watching
          </a>
          <Link
            href="/personalised"
            className="bg-brand-red text-white font-display font-black text-lg px-8 py-4 rounded-2xl shadow-lg hover:bg-brand-red/90 transition-all duration-200 hover:scale-105"
          >
            🌟 Personalised Videos
          </Link>
        </div>
      </div>
    </section>
  )
}
