import { Route } from 'lucide-react'
import SectionBanner from './SectionBanner'

const STEPS = [
  {
    n: 1,
    title: 'pick a marketing plan',
    body: 'choose the package that fits your restaurant and budget.',
  },
  {
    n: 2,
    title: 'we shoot your content — free',
    body: 'our team produces your photos, reels, and posts at no extra cost.',
  },
  {
    n: 3,
    title: 'we market you every month',
    body: 'social, ads, and pr run on schedule while you focus on the food.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 text-center">
        <SectionBanner icon={Route}>how it works</SectionBanner>
        <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
          three steps. one flat plan. zero production bills.
        </h2>
        <p className="text-sm text-brand-muted mb-8 md:mb-10">
          from application to your first free shoot in under a week.
        </p>

        <div className="max-w-sm mx-auto bg-white border border-brand-border rounded-card p-6 mt-8 text-left">
          <ol className="relative">
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative flex gap-4 pb-6 last:pb-0">
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-9 bottom-0 border-l-2 border-dashed border-brand-border"
                  />
                )}
                <span className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-brand-ink flex items-center justify-center text-sm font-medium">
                  {s.n}
                </span>
                <div className="pt-1">
                  <h3 className="text-sm font-medium text-brand-ink">
                    {s.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
