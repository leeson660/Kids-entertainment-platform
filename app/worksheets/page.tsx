import { Metadata } from "next"
import Link from "next/link"
import { worksheets } from "@/lib/worksheetData"

export const metadata: Metadata = {
  title: "Free Printable Toddler Activities | Miss Katie's Class",
  description: "Download and print free toddler activity worksheets. Animals, letters, emotions, BSL signs and more.",
}

export default function WorksheetsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="font-display font-black text-brand-dark text-4xl mb-2">
          Free Printable Activities 🖨️
        </h1>
        <p className="font-body text-brand-dark/60 text-lg">
          Print and play alongside Miss Katie&apos;s videos. All completely free — just hit print!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {worksheets.map((ws) => (
          <Link
            key={ws.slug}
            href={`/worksheets/${ws.slug}`}
            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <div className="bg-gradient-to-br from-brand-primary/20 to-brand-yellow/20 p-8 flex items-center justify-center">
              <span className="text-7xl group-hover:scale-110 transition-transform duration-200">
                {ws.emoji}
              </span>
            </div>
            <div className="p-5">
              <span className="text-xs font-body font-semibold text-brand-primary uppercase tracking-wide">
                {ws.category}
              </span>
              <h2 className="font-display font-bold text-brand-dark text-xl mt-1 mb-2">
                {ws.title}
              </h2>
              <p className="font-body text-brand-dark/60 text-sm mb-4">{ws.description}</p>
              <span className="inline-block bg-brand-primary text-white font-body font-bold text-sm px-5 py-2 rounded-xl group-hover:bg-brand-primary/90 transition-colors">
                🖨️ Print This Sheet
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-brand-yellow/20 rounded-2xl p-6 text-center">
        <p className="font-body text-brand-dark/70">
          📺 Each worksheet pairs perfectly with a Miss Katie video.{" "}
          <Link href="/videos" className="text-brand-primary font-semibold hover:underline">
            Find the matching video →
          </Link>
        </p>
      </div>
    </div>
  )
}
