import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { worksheets } from "@/lib/worksheetData"
import { siteConfig } from "@/lib/siteConfig"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return worksheets.map((ws) => ({ slug: ws.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const resource = worksheets.find((w) => w.slug === slug)
  if (!resource) return {}
  return {
    title: `${resource.title} | [Creator Name]`,
    description: resource.description,
  }
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params
  const resource = worksheets.find((w) => w.slug === slug)
  if (!resource) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 font-body text-sm text-brand-dark/50">
        <Link href="/" className="hover:text-brand-primary">Home</Link>
        <span className="mx-2">→</span>
        <Link href="/worksheets" className="hover:text-brand-primary">Resources</Link>
        <span className="mx-2">→</span>
        <span className="text-brand-dark font-semibold">{resource.title}</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-brand-primary/20 to-brand-yellow/20 rounded-2xl p-10 text-center mb-8">
        <div className="text-8xl mb-4">{resource.emoji}</div>
        <span className="text-xs font-body font-semibold text-brand-primary uppercase tracking-widest">
          {resource.category}
        </span>
        <h1 className="font-display font-black text-brand-dark text-3xl mt-2 mb-3">
          {resource.title}
        </h1>
        <p className="font-body text-brand-dark/60 text-lg max-w-xl mx-auto">
          {resource.description}
        </p>
      </div>

      {/* What's included */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-5">What&apos;s included ✨</h2>
        <ul className="space-y-3">
          {resource.activities.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-brand-green text-white rounded-full flex items-center justify-center font-display font-bold text-xs shrink-0 mt-0.5">
                ✓
              </span>
              <p className="font-body text-brand-dark/70 leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Download CTA */}
      <div className="bg-brand-primary rounded-2xl p-8 text-center mb-8">
        <p className="font-display font-bold text-white text-xl mb-2">Ready to download?</p>
        <p className="font-body text-white/80 text-sm mb-6">
          This resource is completely free — no sign-up required.
        </p>
        <a
          href={siteConfig.exclusiveContent.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-brand-primary font-display font-black text-lg px-8 py-4 rounded-2xl hover:bg-brand-yellow hover:text-brand-dark transition-all duration-200 hover:scale-105"
        >
          📥 Download Free
        </a>
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between">
        <Link href="/worksheets" className="font-body text-sm text-brand-primary hover:underline">
          ← Back to resources
        </Link>
        <Link href="/videos" className="font-body text-sm text-brand-primary hover:underline">
          Browse videos →
        </Link>
      </div>

      {/* Print attribution footer — visible on print only */}
      <div className="hidden print:block mt-8 pt-4 border-t border-gray-200 flex items-center justify-between">
        <p className="font-body text-xs text-gray-400">© {siteConfig.companyName}</p>
        <p className="font-body text-xs text-gray-400">
          {process.env.NEXT_PUBLIC_SITE_URL || "[your-domain].com"}
        </p>
      </div>
    </div>
  )
}
