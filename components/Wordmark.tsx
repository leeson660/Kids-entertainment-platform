export function Wordmark({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const textSize =
    size === "small" ? "text-xl" : size === "large" ? "text-4xl" : "text-2xl"
  const subSize =
    size === "small" ? "text-xs" : size === "large" ? "text-xl" : "text-sm"

  return (
    <span className={`font-display font-black ${textSize} leading-none select-none`}>
      <span className="text-brand-red">K</span>
      <span className="text-brand-yellow">a</span>
      <span className="text-brand-green">t</span>
      <span className="text-brand-primary">i</span>
      <span className="text-purple-500">e</span>
      <span className="text-pink-400">&apos;s</span>
      <span className={`text-brand-dark ${subSize} font-bold tracking-widest block`}>
        CLASS
      </span>
    </span>
  )
}
