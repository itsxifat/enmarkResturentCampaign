const STATS = [
  { value: '4–12', label: 'reels every month' },
  { value: '6 mo', label: 'partnership minimum' },
  { value: '24h', label: 'creative turnaround' },
]

export default function TrustStrip() {
  return (
    <section className="bg-brand-cream border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 divide-x divide-brand-border">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 text-center">
              <div className="font-display text-3xl font-medium text-brand-ink">
                {s.value}
              </div>
              <div className="text-[11px] text-brand-muted uppercase tracking-widest mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
