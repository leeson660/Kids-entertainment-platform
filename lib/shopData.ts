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
  // Miss Katie's Own Products
  {
    id: "personalised-video",
    name: "Personalised Video",
    description:
      "A one-of-a-kind video made just for your little one, featuring their name and tailored to them.",
    price: "Visit for pricing",
    emoji: "🎬",
    affiliateUrl: "https://tr.ee/Nmj02InzVY",
    category: "own",
    featured: true,
  },
  {
    id: "baby-tshirt",
    name: "Miss Katie's Class Baby T-Shirt (Unisex)",
    description:
      "Super soft unisex baby t-shirt featuring the Miss Katie's Class branding. Perfect for little fans!",
    price: "Visit for pricing",
    emoji: "👕",
    affiliateUrl: "https://www.tshirtstudio.com/marketplace/miss-katie's-class/basic-tshirt",
    category: "own",
    featured: true,
  },
  // Recommended Products
  {
    id: "amazon-recommended",
    name: "Miss Katie's Amazon Pick",
    description:
      "Handpicked by Miss Katie for little learners — a favourite from her Amazon storefront.",
    price: "",
    emoji: "⭐",
    affiliateUrl: "https://www.amazon.co.uk/dp/B09BG1QQTK/ref=cm_sw_r_as_gl_apa_gl_i_dl_1ZSJCDZ8T6APRSS738CT?linkCode=ml1&tag=misskatieslea-21",
    category: "toys",
    featured: false,
  },
]
