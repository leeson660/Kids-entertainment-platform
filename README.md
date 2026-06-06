# Miss Katie's Class 🌟

A fully-featured, mobile-first Next.js web app for Miss Katie's Class — a children's educational platform focused on toddler speech, language development, and early learning.

**Live at:** [misskatiesclass.com](https://misskatiesclass.com)

---

## 🚀 Quick Start

```bash
# 1. Clone and install
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Fill in YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID, ANTHROPIC_API_KEY

# 3. Run locally
npm run dev

# 4. Open http://localhost:3000
```

---

## 📦 What's Included

| Feature | Status |
|---------|--------|
| 📺 Video library (live from YouTube) | ✅ MVP |
| 🎮 3 learning games (Animals, Colours, Shapes) | ✅ MVP |
| 🖨️ 6 printable worksheets | ✅ MVP |
| ✨ AI activity generator (Claude Haiku) | ✅ MVP |
| ⭐ Stars & badges rewards system | ✅ MVP |
| 📊 Parent progress dashboard | ✅ MVP |
| 🛍️ Miss Katie Recommends shop | ✅ MVP |
| 📱 PWA (installable, offline support) | ✅ MVP |
| 🔒 Auth (Google + email/password) | 🔧 Scaffold |
| 💳 Stripe subscriptions | 🔧 Scaffold |
| 🎬 Premium video library | 🔧 Scaffold |

---

## 🌐 Deploy to Vercel

```bash
# One-command deploy
npx vercel --prod

# Or connect GitHub repo at vercel.com/new
```

**Required Vercel environment variables:**
- `YOUTUBE_API_KEY` — YouTube Data API v3 key
- `YOUTUBE_CHANNEL_ID` — Miss Katie's channel ID (starts with UC)
- `ANTHROPIC_API_KEY` — Anthropic Claude API key

---

## 🎨 Rebranding for a New Creator

This app is fully rebrand-ready. To use it for a different creator:

1. **`lib/siteConfig.ts`** — Update name, bio, socials, contact, product links
2. **`tailwind.config.ts`** — Update brand colours and fonts
3. **`.env.local`** — New YouTube channel ID and API keys
4. **`lib/shopData.ts`** — Creator's products
5. **`lib/gameData.ts`** — Creator-appropriate game content
6. Deploy to new Vercel project

That's it. Every component pulls from these central files.

---

## 🔐 Activating Subscriptions (Stage 2)

When ready to go paid:

1. Set `NEXT_PUBLIC_SUBSCRIPTION_ENABLED=true` in Vercel
2. Set `NEXT_PUBLIC_AUTH_ENABLED=true` in Vercel
3. Add Supabase credentials to Vercel env vars
4. Add Stripe credentials to Vercel env vars
5. Register Stripe webhook at `/api/webhooks/stripe`
6. Add pricing page to nav
7. Upload first premium videos via `/admin`

Estimated activation time: 1–2 days.

---

## 📁 Project Structure

```
app/                    # Next.js App Router pages
  page.tsx              # Homepage
  videos/               # Full video library
  category/[slug]/      # Category pages
  play/                 # Games hub
  activity/             # AI activity generator
  worksheets/           # Printable worksheets
  progress/             # Parent dashboard
  shop/                 # Miss Katie Recommends
  about/                # About page
  personalised/         # Personalised video page
  privacy/              # Privacy policy
  api/                  # API routes
  auth/                 # Auth scaffold (inactive)
  admin/                # Admin scaffold (inactive)
  premium/              # Premium scaffold (inactive)
  pricing/              # Pricing scaffold (inactive)

components/             # Shared UI components
lib/                    # Business logic & data
  siteConfig.ts         # All creator-specific content
  gameData.ts           # Swappable game content
  shopData.ts           # Product data
  youtube.ts            # YouTube API integration
  rewards.ts            # Progress & badges
  categorise.ts         # Video categorisation
  worksheetData.ts      # Worksheet definitions

public/                 # Static assets
  manifest.json         # PWA manifest
  sw.js                 # Service worker
  placeholder-video.svg # Fallback thumbnail
```

---

## 🎯 YouTube API Quota

This app is quota-efficient by design:
- Uses `playlistItems` endpoint (1 unit/call) instead of `search` (100 units/call)
- ~19 quota units for a full 415-video refresh
- Cached hourly — API only called once per hour regardless of traffic
- Daily quota limit: 10,000 units

---

## 👩‍💻 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Data:** YouTube Data API v3
- **AI:** Anthropic Claude Haiku
- **Auth:** Supabase (scaffold)
- **Payments:** Stripe (scaffold)
- **Hosting:** Vercel

---

## 🔒 Privacy & Child Safety

- All progress stored in browser localStorage only — never on a server
- Child's name never sent to any external API
- AI activity generator only receives age + topic
- No tracking cookies, no advertising
- Full privacy policy at `/privacy`

---

*Built with love for Miss Katie's Class*
