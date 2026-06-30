import { Metadata } from "next"
import { siteConfig } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Exclusive Content | [Creator Name]",
  description:
    "Get exclusive, personalised content from [Creator Name] — made just for you.",
}

export default function ExclusiveContentPage() {
  const { exclusiveContent } = siteConfig

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="text-7xl mb-6">🎬</div>
        <h1 className="font-display font-black text-brand-dark text-4xl md:text-5xl mb-4">
          {exclusiveContent.heading}
        </h1>
        <p className="font-body text-brand-dark/60 text-xl max-w-xl mx-auto">
          {exclusiveContent.description}
        </p>
      </div>

      {/* What's included */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">What&apos;s included? ✨</h2>
        <div className="space-y-4">
          {exclusiveContent.features.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <h3 className="font-body font-bold text-brand-dark">{item.title}</h3>
                <p className="font-body text-brand-dark/60 text-sm mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">How it works 📋</h2>
        <ol className="space-y-4">
          {exclusiveContent.howItWorks.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0">
                {i + 1}
              </span>
              <p className="font-body text-brand-dark/70 pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="text-center">
        <a
          href={exclusiveContent.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-red text-white font-display font-black text-xl px-12 py-5 rounded-2xl shadow-lg hover:bg-brand-red/90 transition-all duration-200 hover:scale-105"
        >
          Order Now ✨
        </a>
        <p className="font-body text-brand-dark/40 text-sm mt-4">
          Opens {siteConfig.creatorName}&apos;s secure order page
        </p>
      </div>
    </div>
  )
}
