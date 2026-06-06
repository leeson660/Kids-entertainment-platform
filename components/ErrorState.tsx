"use client"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = "Oops! We're having trouble loading the videos right now. Please try again in a moment. 🌟",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 px-4 text-center">
      <div className="text-6xl">😅</div>
      <div>
        <p className="font-display font-bold text-brand-dark text-xl mb-2">
          Oops, something went wrong!
        </p>
        <p className="font-body text-brand-dark/60 max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-brand-primary text-white font-body font-bold px-8 py-3 rounded-2xl hover:bg-brand-primary/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
