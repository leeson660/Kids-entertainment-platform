import { siteConfig } from "@/lib/siteConfig"

export function Wordmark({
  size = "default",
  dark = false,
}: {
  size?: "small" | "default" | "large"
  dark?: boolean
}) {
  const textSize =
    size === "small" ? "text-lg" : size === "large" ? "text-3xl" : "text-xl"
  const subSize =
    size === "small" ? "text-[9px]" : size === "large" ? "text-base" : "text-xs"

  return (
    <span className={`font-display font-black ${textSize} leading-none select-none`}>
      <span className={dark ? "text-brand-dark" : "text-white"}>
        {siteConfig.creatorName}
      </span>
      <span
        className={`${subSize} font-semibold tracking-[0.2em] block mt-0.5 ${
          dark ? "text-brand-dark/40" : "text-white/40"
        }`}
      >
        CONTENT HUB
      </span>
    </span>
  )
}
