// Admin page — scaffold only, never linked in MVP frontend
// Stage 2: add password protection and video upload UI

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-display font-black text-brand-dark text-4xl mb-4">
        Admin Panel 🔧
      </h1>
      <p className="font-body text-brand-dark/60 mb-8">
        Video management and content admin — Stage 2 feature.
      </p>
      <div className="bg-brand-yellow/20 rounded-2xl p-6">
        <p className="font-body text-brand-dark/70 text-sm">
          This panel will be activated in Stage 2 with password protection,
          premium video upload, and subscription management.
        </p>
      </div>
    </div>
  )
}
