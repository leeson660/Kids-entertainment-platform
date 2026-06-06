import { ShopItem } from "@/lib/shopData"

interface ProductCardProps {
  item: ShopItem
}

export function ProductCard({ item }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-200">
      {/* Image / emoji */}
      <div className="aspect-square bg-gradient-to-br from-brand-primary/20 to-brand-yellow/20 flex items-center justify-center">
        <span className="text-7xl">{item.emoji}</span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-display font-bold text-brand-dark text-base leading-snug">
          {item.name}
        </h3>
        <p className="font-body text-brand-dark/60 text-sm leading-relaxed flex-1">
          {item.description}
        </p>
        {item.price && (
          <p className="font-display font-bold text-brand-green text-lg">
            {item.price}
          </p>
        )}
        <a
          href={item.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-brand-primary text-white font-body font-bold py-2.5 rounded-xl hover:bg-brand-primary/90 transition-colors mt-1"
        >
          {item.category === "own" ? "Order Now" : "View on Amazon"}
        </a>
      </div>
    </div>
  )
}
