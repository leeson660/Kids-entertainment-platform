import { Metadata } from "next"
import { siteConfig } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Privacy Policy | [Creator Name]",
  description: "How [Creator Name]'s Hub handles your data — plain English, no jargon.",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display font-black text-brand-dark text-4xl mb-2">Privacy Policy 🔒</h1>
      <p className="font-body text-brand-dark/60 mb-8">Plain-English privacy information — no jargon.</p>

      <div className="space-y-6">
        {[
          {
            title: "What data do we store?",
            content: `This site stores your progress — videos watched, resources downloaded, stars earned, and badges — only on this device, in your browser's local storage. This data never leaves your device and is never sent to any server.`,
          },
          {
            title: "Your name",
            content: `If you enter your name in the Progress or Activity sections, it is stored on this device only and never sent anywhere. It is used purely to personalise the on-screen experience for you.`,
          },
          {
            title: "AI Activity Generator",
            content: `When you use the AI Activity Generator, only your selected level and topic are sent to our AI partner to generate the activity. Your name is never sent — it is added to the result on your device after the activity has been generated.`,
          },
          {
            title: "YouTube videos",
            content: `Videos are loaded from YouTube's public API. When you watch a video, YouTube's standard privacy policies apply. We recommend checking YouTube's Privacy Policy for full details.`,
          },
          {
            title: "No tracking or advertising",
            content: `This site does not use advertising trackers, analytics cookies, or any third-party tracking scripts. There are no adverts on this platform.`,
          },
          {
            title: "Affiliate links",
            content: `Some links in the Shop section are affiliate links. ${siteConfig.creatorName} only recommends products they personally use and love. These links help support the channel at no extra cost to you.`,
          },
          {
            title: "Contact",
            content: `If you have any privacy questions, please email us at ${siteConfig.contactEmail}.`,
          },
        ].map((section) => (
          <div key={section.title} className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-display font-bold text-brand-dark text-xl mb-3">{section.title}</h2>
            <p className="font-body text-brand-dark/70 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-brand-primary/10 rounded-2xl p-6 text-center">
        <p className="font-body text-brand-dark/60 text-sm">
          Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}. {siteConfig.companyName}.
        </p>
      </div>
    </div>
  )
}
