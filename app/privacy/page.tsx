import { Metadata } from "next"
import { siteConfig } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Privacy & Child Safety | Miss Katie's Class",
  description: "How Miss Katie's Class keeps your child's data safe.",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display font-black text-brand-dark text-4xl mb-2">Privacy & Child Safety 🔒</h1>
      <p className="font-body text-brand-dark/60 mb-8">Plain-English privacy information for parents.</p>

      <div className="space-y-6">
        {[
          {
            title: "What data do we store?",
            content: `Miss Katie's Class stores your child's progress — videos watched, games played, stars earned, and badges — only on this device, in your browser. This data never leaves your phone or computer and is never sent to any server.`,
          },
          {
            title: "Child's name",
            content: `If you enter your child's name, it is stored on this device only and never sent anywhere. It is used purely to personalise the on-screen experience for you.`,
          },
          {
            title: "AI Activity Generator",
            content: `When you use the activity generator, only your selected age and topic are sent to our AI partner to create the activity. Your child's name is never sent. It is added to the result on your device after the activity is generated.`,
          },
          {
            title: "YouTube videos",
            content: `Videos are loaded from YouTube's public API. When you watch a video, YouTube's standard privacy policies apply. We recommend checking YouTube's Privacy Policy for details.`,
          },
          {
            title: "No tracking or advertising",
            content: `Miss Katie's Class does not use advertising trackers, analytics cookies, or any third-party tracking. There are no adverts on this platform.`,
          },
          {
            title: "Affiliate links",
            content: `Some links in our Shop section are affiliate links. Miss Katie only recommends products she loves, and these links help support the channel at no extra cost to you.`,
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
          Last updated: June 2026. {siteConfig.companyName}.
        </p>
      </div>
    </div>
  )
}
