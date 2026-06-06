import Link from "next/link"

interface CategoryCardProps {
  slug: string
  label: string
  emoji: string
  description: string
}

export function CategoryCard({ slug, label, emoji, description }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className="group flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 border-2 border-transparent hover:border-brand-primary/30 text-center"
    >
      <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
        {emoji}
      </span>
      <div>
        <h3 className="font-display font-bold text-brand-dark text-lg leading-tight">
          {label}
        </h3>
        <p className="font-body text-brand-dark/60 text-sm mt-1">{description}</p>
      </div>
    </Link>
  )
}
