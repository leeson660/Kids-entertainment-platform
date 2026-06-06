import { Metadata } from "next"
import Link from "next/link"
import { getChannelInfo } from "@/lib/youtube"
import { siteConfig } from "@/lib/siteConfig"
import { categoryMeta } from "@/lib/categorise"

export const metadata: Metadata = {
  title: "About Miss Katie | Early Years Content Creator",
  description: "Learn about Miss Katie — early years content creator helping babies and toddlers learn through songs, play and stories.",
}

export default async function AboutPage() {
  let channelInfo = null
  try { channelInfo = await getChannelInfo() } catch { /* fallback */ }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          {channelInfo?.thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={channelInfo.thumbnailUrl}
              alt="Miss Katie"
              className="w-32 h-32 rounded-full border-4 border-brand-primary shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-brand-primary flex items-center justify-center shadow-lg">
              <span className="font-display font-black text-4xl text-white">MK</span>
            </div>
          )}
        </div>
        <h1 className="font-display font-black text-brand-dark text-4xl mb-3">
          {siteConfig.about.headline}
        </h1>
        <p className="font-body text-brand-dark/60 text-xl max-w-xl mx-auto">
          {siteConfig.about.subheadline}
        </p>
      </div>

      {/* Bio */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <p className="font-body text-brand-dark/70 text-lg leading-relaxed">{siteConfig.about.bio}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { value: channelInfo ? `${Math.round(parseInt(channelInfo.subscriberCount) / 1000)}k+` : siteConfig.about.stats.subscribers, label: "Subscribers" },
          { value: channelInfo ? `${channelInfo.videoCount}+` : siteConfig.about.stats.videos, label: "Videos" },
          { value: siteConfig.about.stats.families, label: "Families Reached" },
        ].map((stat) => (
          <div key={stat.label} className="bg-brand-primary text-white rounded-2xl p-6 text-center">
            <div className="font-display font-black text-3xl">{stat.value}</div>
            <div className="font-body text-white/80 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* What Miss Katie covers */}
      <div className="mb-12">
        <h2 className="font-display font-black text-brand-dark text-3xl mb-6 text-center">
          What Miss Katie Covers 📚
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
            </Link>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-brand-dark text-white rounded-2xl p-8 text-center">
        <h2 className="font-display font-black text-3xl mb-3">Work With Miss Katie 📩</h2>
        <p className="font-body text-white/70 mb-6">For collaborations, brand partnerships, and enquiries:</p>
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="inline-block bg-brand-primary text-white font-body font-bold px-6 py-3 rounded-xl hover:bg-brand-primary/90 transition-colors mb-6"
        >
          {siteConfig.contactEmail}
        </a>
        <div className="flex justify-center gap-4 flex-wrap">
          {Object.entries(siteConfig.socials).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-white/60 hover:text-white text-sm capitalize transition-colors"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
