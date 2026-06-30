import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { categoryMeta, VideoCategory } from "@/lib/categorise"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(categoryMeta).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meta = categoryMeta[slug as VideoCategory]
  if (!meta) return {}
  return {
    title: `${meta.label} Videos | [Creator Name]`,
    description: `${meta.description} Watch all [Creator Name]'s ${meta.label.toLowerCase()} videos.`,
  }
}

// Placeholder videos per category — replace with real YouTube data once channel is connected
const placeholdersByCategory: Record<string, { id: string; title: string; views: string; duration: string; publishedAt: string }[]> = {
  "getting-started": [
    { id: "gs1", title: "Getting Started: Everything You Need to Know", views: "124K", duration: "12:34", publishedAt: "2 weeks ago" },
    { id: "gs2", title: "The Ultimate Resource Guide", views: "131K", duration: "23:18", publishedAt: "3 months ago" },
    { id: "gs3", title: "Everything I Wish I Knew at the Start", views: "209K", duration: "16:55", publishedAt: "4 months ago" },
  ],
  "tutorials": [
    { id: "tu1", title: "The Complete Beginner's Guide", views: "98K", duration: "18:02", publishedAt: "1 week ago" },
    { id: "tu2", title: "Advanced Techniques for Next-Level Results", views: "62K", duration: "27:14", publishedAt: "2 months ago" },
  ],
  "tips-and-tricks": [
    { id: "tt1", title: "5 Tips That Changed Everything", views: "201K", duration: "8:47", publishedAt: "2 weeks ago" },
    { id: "tt2", title: "Quick Tips: 10 Minutes, Big Impact", views: "177K", duration: "10:03", publishedAt: "2 months ago" },
  ],
  "deep-dives": [
    { id: "dd1", title: "Deep Dive: The Full Breakdown", views: "76K", duration: "34:21", publishedAt: "3 weeks ago" },
  ],
  "reviews": [
    { id: "re1", title: "My Honest Review — Is It Worth It?", views: "143K", duration: "15:09", publishedAt: "1 month ago" },
    { id: "re2", title: "Comparing the Top Options — Full Review", views: "88K", duration: "31:07", publishedAt: "4 months ago" },
  ],
  "community": [
    { id: "co1", title: "Answering Your Questions — Q&A", views: "89K", duration: "22:56", publishedAt: "1 month ago" },
    { id: "co2", title: "Behind the Scenes — How I Create Content", views: "54K", duration: "19:42", publishedAt: "3 months ago" },
  ],
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const meta = categoryMeta[slug as VideoCategory]
  if (!meta) notFound()

  const videos = placeholdersByCategory[slug] ?? []

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 font-body text-sm text-brand-dark/50">
        <Link href="/" className="hover:text-brand-primary">Home</Link>
        <span className="mx-2">→</span>
        <Link href="/videos" className="hover:text-brand-primary">Videos</Link>
        <span className="mx-2">→</span>
        <span className="text-brand-dark font-semibold">{meta.label}</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-display font-black text-brand-dark text-4xl mb-2">
          {meta.emoji} {meta.label}
        </h1>
        <p className="font-body text-brand-dark/60">{meta.description}</p>
        <p className="font-body text-brand-dark/30 text-xs mt-1">
          Connect your YouTube channel to display real videos
        </p>
      </div>

      {videos.length > 0 ? (
        <>
          <p className="font-body text-sm text-brand-dark/50 mb-4">
            {videos.length} video{videos.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                    <span className="text-brand-primary text-xl">▶</span>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-body px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-display font-semibold text-brand-dark text-sm leading-snug line-clamp-2">{video.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-body text-brand-dark/40 text-xs">{video.views} views</p>
                    <span className="text-brand-dark/20 text-xs">·</span>
                    <p className="font-body text-brand-dark/40 text-xs">{video.publishedAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="font-body text-brand-dark/40 text-base">
            No {meta.label} videos yet — check back soon!
          </p>
        </div>
      )}
    </div>
  )
}
