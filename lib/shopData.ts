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
    affiliateUrl: "https://misskatiesclass.com/ols/categories/personalised-video",
    category: "own",
    featured: true,
  },
  {
    id: "baby-tshirt",
    name: "Miss Katie's Class Baby T-Shirt",
    description:
      "Super soft baby t-shirt featuring the Miss Katie's Class branding. Perfect for little fans!",
    price: "£12.50",
    emoji: "👕",
    affiliateUrl: "https://misskatiesclass.com",
    category: "own",
    featured: true,
  },
  // Recommended Toys & Resources
  {
    id: "amazon-fire-kids",
    name: "Amazon Fire HD 8 Kids Tablet",
    description:
      "Perfect for toddlers — drop-proof case, parental controls, and great for watching Miss Katie's videos.",
    price: "£84.99",
    emoji: "📱",
    affiliateUrl: "https://www.amazon.co.uk",
    category: "toys",
    featured: false,
  },
  {
    id: "musical-piano-mat",
    name: "Musical Toys 3-in-1 Animal Piano Drum Mat",
    description:
      "Encourages early musical exploration with animal sounds and bright colours.",
    price: "",
    emoji: "🎹",
    affiliateUrl: "https://www.amazon.co.uk",
    category: "toys",
    featured: false,
  },
  {
    id: "musical-bench",
    name: "Musical Bench Wooden Montessori Toy",
    description:
      "Beautifully crafted wooden musical bench. Develops fine motor skills and a love of music.",
    price: "",
    emoji: "🎵",
    affiliateUrl: "https://www.amazon.co.uk",
    category: "toys",
    featured: false,
  },
  {
    id: "sorting-toy",
    name: "Educational Sorting Toy For Children",
    description:
      "Colourful shape sorting toy that develops problem-solving and colour recognition.",
    price: "",
    emoji: "🔵",
    affiliateUrl: "https://www.amazon.co.uk",
    category: "resources",
    featured: false,
  },
]
