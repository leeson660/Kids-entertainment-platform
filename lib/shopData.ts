// =============================================================================
// SHOP / MERCHANDISE DATA
// Add the creator's actual products here. Each item maps to a card on /shop.
// category "own" = creator's own products (button: "Order Now")
// category "toys" | "resources" = affiliate picks (button: "Shop Now")
// =============================================================================

export interface ShopItem {
  id: string
  name: string
  description: string
  price: string
  emoji: string
  imageUrl?: string
  affiliateUrl: string
  category: "own" | "toys" | "resources"
  featured: boolean
}

export const shopData: ShopItem[] = [
  // ── Creator's own products ──────────────────────────────────────────────────
  {
    id: "exclusive-content",
    name: "Exclusive Personalised Content",
    description:
      "A one-of-a-kind piece of content made just for you by [Creator Name] — unique and personal.",
    price: "Visit for pricing",
    emoji: "🎬",
    affiliateUrl: "https://[your-order-page-url]",
    category: "own",
    featured: true,
  },
  {
    id: "branded-merch",
    name: "[Creator Name] Branded Merchandise",
    description:
      "Official branded merchandise — wear your fandom and support [Creator Name] directly.",
    price: "Visit for pricing",
    emoji: "👕",
    affiliateUrl: "https://[your-merch-store-url]",
    category: "own",
    featured: true,
  },
  // ── Affiliate picks ─────────────────────────────────────────────────────────
  {
    id: "affiliate-pick-1",
    name: "[Creator Name]'s Top Pick",
    description:
      "Handpicked and personally recommended by [Creator Name] — a favourite from their curated list.",
    price: "",
    emoji: "⭐",
    affiliateUrl: "https://[affiliate-link-url]",
    category: "toys",
    featured: false,
  },
]
