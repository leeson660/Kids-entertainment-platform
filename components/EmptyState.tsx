import Link from "next/link"

interface EmptyStateProps {
  message?: string
  showPlayLink?: boolean
}

export function EmptyState({
  message = "No videos here yet — check back soon!",
  showPlayLink = true,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 px-4 text-center">
      <div className="text-6xl">🔍</div>
      <div>
        <p className="font-display font-bold text-brand-dark text-xl mb-2">
          Nothing found
        </p>
        <p className="font-body text-brand-dark/60 max-w-sm">{message}</p>
      </div>
      {showPlayLink && (
        <Link
          href="/play"
          className="bg-brand-yellow text-brand-dark font-body font-bold px-8 py-3 rounded-2xl hover:bg-brand-yellow/90 transition-colors"
        >
          🎮 Play a Game Instead!
        </Link>
      )}
    </div>
  )
}
