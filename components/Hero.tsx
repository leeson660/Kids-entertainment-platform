import Link from "next/link"
import { siteConfig } from "@/lib/siteConfig"
import { Wordmark } from "./Wordmark"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-dark via-slate-800 to-slate-900 overflow-hidden py-20 md:py-32 px-4">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Wordmark */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/10">
            <Wordmark size="large" />
          </div>
        </div>

        {/* Tagline */}
        <h1 className="font-display font-black text-white text-4xl md:text-6xl leading-tight mb-4">
          {siteConfig.tagline}
        </h1>
        <p className="font-body text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          {siteConfig.subTagline}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl px-5 py-2.5 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-yellow inline-block" />
            <span className="font-display font-bold text-white text-base">131M+</span>
            <span className="font-body text-white/50 text-sm">Views</span>
          </div>
          <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl px-5 py-2.5 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-green inline-block" />
            <span className="font-body text-white/70 text-sm">[XXX]k+ Subscribers</span>
          </div>
          <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl px-5 py-2.5 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-primary inline-block" />
            <span className="font-body text-white/70 text-sm">Worldwide Audience</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#videos"
            className="bg-brand-primary text-white font-display font-bold text-base px-8 py-3.5 rounded-xl hover:bg-brand-primary/90 transition-all duration-200 hover:scale-105 shadow-lg shadow-brand-primary/25"
          >
            Watch Videos
          </a>
          <Link
            href="/personalised"
            className="bg-white/10 border border-white/20 text-white font-display font-bold text-base px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all duration-200"
          >
            Exclusive Content
          </Link>
        </div>
      </div>
    </section>
  )
}
