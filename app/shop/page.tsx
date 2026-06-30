import { Metadata } from "next"
import { shopData } from "@/lib/shopData"
import { ProductCard } from "@/components/ProductCard"
import { siteConfig } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "[Creator Name] Recommends | Shop",
  description:
    "Products, merchandise, and affiliate picks recommended by [Creator Name].",
}

function ComingSoonCard({ label = "More picks coming soon!" }: { label?: string }) {
  return (
    <div className="bg-brand-yellow/10 border-2 border-dashed border-brand-yellow rounded-2xl flex flex-col items-center justify-center gap-3 p-8 min-h-[280px]">
      <span className="text-5xl">✨</span>
      <p className="font-display font-bold text-brand-dark text-center text-base leading-snug">
        {label}
      </p>
      <p className="font-body text-brand-dark/50 text-sm text-center">
        {siteConfig.creatorName} is busy handpicking the best — check back soon!
      </p>
    </div>
  )
}

export default function ShopPage() {
  const ownProducts = shopData.filter((p) => p.category === "own")
  const recommended = shopData.filter((p) => p.category !== "own")

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="font-display font-black text-brand-dark text-4xl mb-2">
          {siteConfig.creatorName} Recommends 🌟
        </h1>
        <p className="font-body text-brand-dark/60 text-lg">
          Products, merch, and handpicked recommendations from {siteConfig.creatorName}.
        </p>
      </div>

      {/* Own Products */}
      <section className="mb-12">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">
          🎬 {siteConfig.creatorName}&apos;s Own Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ownProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
          <ComingSoonCard label={`More from ${siteConfig.creatorName} coming soon!`} />
        </div>
      </section>

      {/* Recommended */}
      {recommended.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">
            ⭐ Also Recommended
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommended.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
            <ComingSoonCard label={`${siteConfig.creatorName}'s picks — coming soon!`} />
            <ComingSoonCard label="More picks on the way!" />
          </div>
        </section>
      )}

      {/* Affiliate disclaimer */}
      <div className="bg-gray-100 rounded-2xl p-6 text-center">
        <p className="font-body text-brand-dark/50 text-sm">
          Some links are affiliate links. {siteConfig.creatorName} only recommends products they personally love.
        </p>
      </div>
    </div>
  )
}
