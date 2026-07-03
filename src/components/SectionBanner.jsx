// Compact pill banner used above section headings (not a full-width bar).
export default function SectionBanner({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 bg-brand-ink text-brand-green text-xs font-medium px-4 py-2 rounded-pill mb-2">
      {Icon && <Icon size={13} strokeWidth={1.5} />}
      {children}
    </div>
  )
}
