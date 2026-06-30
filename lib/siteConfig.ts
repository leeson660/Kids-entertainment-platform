// =============================================================================
// SITE CONFIG — update every value in this file for each new creator deployment
// The entire site is driven from here; no other files need touching for basic setup.
// =============================================================================

export const siteConfig = {
  // ── Creator identity ──────────────────────────────────────────────────────
  creatorName: "[Creator Name]",            // e.g. "Marques Brownlee"
  siteName: "[Creator Name]'s Hub",         // Site display name
  tagline: "Watch, Learn & Explore with [Creator Name]",
  subTagline: "[Short description of your content and audience]",
  companyName: "[Creator Name] Media",
  contactEmail: "hello@[your-domain].com",

  // ── YouTube channel ───────────────────────────────────────────────────────
  // Channel ID must also be set in .env.local as YOUTUBE_CHANNEL_ID
  channelHandle: "@[your-channel-handle]",
  channelUrl: "https://www.youtube.com/@[your-channel-handle]",

  // ── Social links ──────────────────────────────────────────────────────────
  socials: {
    youtube: "https://www.youtube.com/@[your-channel-handle]",
    instagram: "https://www.instagram.com/[instagramHandle]",
    tiktok: "https://www.tiktok.com/@[tiktokHandle]",
    facebook: "https://www.facebook.com/[facebookPage]",
  },

  // ── About page ────────────────────────────────────────────────────────────
  about: {
    headline: "Hi, I'm [Creator Name]!",
    subheadline: "[Describe what you do and who your content is for in one sentence]",
    bio: "[Write a short bio — your story, your niche, and what makes your channel unique.]",
    stats: {
      subscribers: "[XXX]k+",
      videos: "[XXX]+",
      families: "[Your key audience metric, e.g. '1M+ Reached']",
    },
  },

  // ── Exclusive / personalised content ─────────────────────────────────────
  // Replaces the "personalised video" concept — could be bespoke videos,
  // 1-to-1 coaching, shout-outs, commissioned work, etc.
  exclusiveContent: {
    heading: "Get Exclusive Content from [Creator Name]",
    description: "A personalised, bespoke piece of content made just for you",
    orderUrl: "https://[your-order-page-url]",
    features: [
      {
        emoji: "⭐",
        title: "Made for you",
        desc: "[Creator Name] creates something personal and unique for you — not a template.",
      },
      {
        emoji: "🎬",
        title: "Premium quality",
        desc: "The same care and production quality as their main channel content.",
      },
      {
        emoji: "❤️",
        title: "Made with care",
        desc: "Every order is handled personally by [Creator Name] themselves.",
      },
      {
        emoji: "📱",
        title: "Digital delivery",
        desc: "Delivered digitally — access instantly on any device.",
      },
    ],
    howItWorks: [
      "Visit the order page and fill in your details and any special requests.",
      "[Creator Name] personally creates your bespoke content.",
      "You receive your content digitally, ready to use straight away.",
      "Enjoy your exclusive, one-of-a-kind piece of content! 🌟",
    ],
  },

  // ── Subscription config — backend only, never referenced in UI ─────────────
  subscription: {
    currency: "£",
    monthlyPrice: "4.99",
    trialDays: 7,
  },
}
