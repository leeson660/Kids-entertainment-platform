export function VideoSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="aspect-video bg-brand-primary/20" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded-full w-full" />
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/3 mt-1" />
      </div>
    </div>
  )
}

export function VideoGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <VideoSkeleton key={i} />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md animate-pulse">
      <div className="h-12 w-12 bg-gray-200 rounded-full mb-4" />
      <div className="h-5 bg-gray-200 rounded-full w-3/4 mb-2" />
      <div className="h-4 bg-gray-100 rounded-full w-full" />
    </div>
  )
}
