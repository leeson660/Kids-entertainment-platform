import { Metadata } from "next"
import { siteConfig } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Personalised Videos | Miss Katie's Class",
  description: "Get a personalised video from Miss Katie for your little one — featuring their very own name!",
}

export default function PersonalisedPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="text-7xl mb-6">🎬</div>
        <h1 className="font-display font-black text-brand-dark text-4xl md:text-5xl mb-4">
          {siteConfig.personalisedVideo.heading}
        </h1>
        <p className="font-body text-brand-dark/60 text-xl max-w-xl mx-auto">
          {siteConfig.personalisedVideo.description}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">What&apos;s included? ✨</h2>
        <div className="space-y-4">
          {[
            { emoji: "⭐", title: "Your child's name", desc: "Miss Katie says your little one's name throughout the video — making it extra special." },
            { emoji: "🎵", title: "Songs & learning", desc: "Packed with songs, activities, and early learning — tailored just for them." },
            { emoji: "❤️", title: "Made with love", desc: "Every personalised video is created by Miss Katie herself with care and warmth." },
            { emoji: "📱", title: "Digital delivery", desc: "Delivered digitally — watch instantly on any device, again and again." },
          ].map((item) => (
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

      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">How it works 📋</h2>
        <ol className="space-y-4">
          {[
            "Visit the order page and fill in your child's name and any special requests.",
            "Miss Katie personally creates your bespoke video.",
            "You receive your video digitally to watch and share with your little one.",
            "Watch their face light up as Miss Katie says their name! 🌟",
          ].map((step, i) => (
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
          href={siteConfig.personalisedVideo.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-red text-white font-display font-black text-xl px-12 py-5 rounded-2xl shadow-lg hover:bg-brand-red/90 transition-all duration-200 hover:scale-105"
        >
          Order Now ✨
        </a>
        <p className="font-body text-brand-dark/40 text-sm mt-4">
          Opens Miss Katie&apos;s secure order page
        </p>
      </div>
    </div>
  )
}
