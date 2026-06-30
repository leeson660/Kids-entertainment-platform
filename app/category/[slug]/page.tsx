import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getChannelVideos } from "@/lib/youtube"
import { categoryMeta, VideoCategory, getVideosByCategory } from "@/lib/categorise"
import { VideoGridClient } from "@/app/VideoGridClient"
import { EmptyState } from "@/components/EmptyState"

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

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const meta = categoryMeta[slug as VideoCategory]
  if (!meta) notFound()

  let videos: Awaited<ReturnType<typeof getChannelVideos>> = []
  try {
    const all = await getChannelVideos()
    videos = getVideosByCategory(all, slug as VideoCategory)
  } catch {
    videos = []
  }

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
      </div>

      {videos.length > 0 ? (
        <>
          <p className="font-body text-sm text-brand-dark/50 mb-4">
            {videos.length} video{videos.length !== 1 ? "s" : ""}
          </p>
          <VideoGridClient videos={videos} />
        </>
      ) : (
        <EmptyState message={`No ${meta.label} videos found yet — check back soon!`} />
      )}
    </div>
  )
}
