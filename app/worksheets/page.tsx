import { Metadata } from "next"
import Link from "next/link"
import { worksheets } from "@/lib/worksheetData"

export const metadata: Metadata = {
  title: "Free Downloadable Resources | [Creator Name]",
  description:
    "Download free guides, cheat sheets, templates, and toolkits from [Creator Name]. Completely free — no sign-up required.",
}

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="font-display font-black text-brand-dark text-4xl mb-2">
          Free Downloadable Resources 📥
        </h1>
        <p className="font-body text-brand-dark/60 text-lg">
          Guides, cheat sheets, templates, and toolkits from [Creator Name] — completely free, no sign-up needed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {worksheets.map((resource) => (
          <Link
            key={resource.slug}
            href={`/worksheets/${resource.slug}`}
            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <div className="bg-gradient-to-br from-brand-primary/20 to-brand-yellow/20 p-8 flex items-center justify-center">
              <span className="text-7xl group-hover:scale-110 transition-transform duration-200">
                {resource.emoji}
              </span>
            </div>
            <div className="p-5">
              <span className="text-xs font-body font-semibold text-brand-primary uppercase tracking-wide">
                {resource.category}
              </span>
              <h2 className="font-display font-bold text-brand-dark text-xl mt-1 mb-2">
                {resource.title}
              </h2>
              <p className="font-body text-brand-dark/60 text-sm mb-4">{resource.description}</p>
              <span className="inline-block bg-brand-primary text-white font-body font-bold text-sm px-5 py-2 rounded-xl group-hover:bg-brand-primary/90 transition-colors">
                📥 View Resource
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-brand-yellow/20 rounded-2xl p-6 text-center">
        <p className="font-body text-brand-dark/70">
          📺 Each resource pairs with a related video.{" "}
          <Link href="/videos" className="text-brand-primary font-semibold hover:underline">
            Browse all videos →
          </Link>
        </p>
      </div>
    </div>
  )
}
