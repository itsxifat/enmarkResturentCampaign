// Section kicker — an uppercase, letter-spaced label above section headings.
// Mirrors the hero eyebrow so labels read consistently across the whole site.
export default function SectionBanner({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      {Icon && (
        <Icon size={14} className="text-brand-green-dark" strokeWidth={2} />
      )}
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green-dark">
        {children}
      </span>
    </div>
  )
}
