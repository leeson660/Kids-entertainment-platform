export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center bg-brand-primary/10">
      <div className="text-8xl">📵</div>
      <h1 className="font-display font-black text-brand-dark text-3xl">
        Oops, no internet!
      </h1>
      <p className="font-body text-brand-dark/60 max-w-sm text-lg">
        It looks like you&apos;re offline. Check your connection and try again.
        The games still work without internet! 🎮
      </p>
      <a
        href="/play"
        className="bg-brand-primary text-white font-display font-bold px-8 py-4 rounded-2xl hover:bg-brand-primary/90 transition-colors"
      >
        🎮 Play Games Offline
      </a>
    </div>
  )
}
