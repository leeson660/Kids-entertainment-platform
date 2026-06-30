import { siteConfig } from "@/lib/siteConfig"

export function Wordmark({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const textSize =
    size === "small" ? "text-xl" : size === "large" ? "text-4xl" : "text-2xl"
  const subSize =
    size === "small" ? "text-xs" : size === "large" ? "text-xl" : "text-sm"

  return (
    <span className={`font-display font-black ${textSize} leading-none select-none`}>
      <span className="text-brand-red">{siteConfig.creatorName.charAt(0)}</span>
      <span className="text-brand-yellow">{siteConfig.creatorName.slice(1, 2)}</span>
      <span className="text-brand-green">{siteConfig.creatorName.slice(2, 3)}</span>
      <span className="text-brand-primary">{siteConfig.creatorName.slice(3, 4)}</span>
      <span className="text-purple-500">{siteConfig.creatorName.slice(4, 5)}</span>
      <span className="text-pink-400">{siteConfig.creatorName.slice(5)}</span>
      <span className={`text-brand-dark ${subSize} font-bold tracking-widest block`}>
        HUB
      </span>
    </span>
  )
}
