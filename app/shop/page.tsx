import { Metadata } from "next"
import { shopData } from "@/lib/shopData"
import { ProductCard } from "@/components/ProductCard"
import { siteConfig } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Miss Katie Recommends | Shop",
  description: "Toys, resources, and products recommended by Miss Katie for little learners.",
}

export default function ShopPage() {
  const ownProducts = shopData.filter((p) => p.category === "own")
  const toys = shopData.filter((p) => p.category === "toys")
  const resources = shopData.filter((p) => p.category === "resources")

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="font-display font-black text-brand-dark text-4xl mb-2">
          Miss Katie Recommends 🌟
        </h1>
        <p className="font-body text-brand-dark/60 text-lg">
          Everything Miss Katie loves for little learners — handpicked with care.
        </p>
      </div>

      {/* Own Products */}
      <section className="mb-12">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">
          🎬 Miss Katie&apos;s Own Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ownProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Toys */}
      {toys.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">
            🧸 Recommended Toys
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {toys.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Resources */}
      {resources.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">
            📚 Learning Resources
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {resources.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Affiliate disclaimer */}
      <div className="bg-gray-100 rounded-2xl p-6 text-center">
        <p className="font-body text-brand-dark/50 text-sm">
          Some links are affiliate links. {siteConfig.creatorName} only recommends products she loves.
        </p>
      </div>
    </div>
  )
}
