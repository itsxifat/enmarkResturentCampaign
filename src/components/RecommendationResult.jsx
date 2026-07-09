import { Sprout, TrendingUp, Crown, Check, ArrowRight, Star } from 'lucide-react'
import SectionBanner from './SectionBanner'
import Button from './ui/Button'
import { PACKAGES } from '../lib/packages'

const ICONS = { Sprout, TrendingUp, Crown }

export default function RecommendationResult({ recommendationId, onApply }) {
  const recommended = PACKAGES.find((p) => p.id === recommendationId)
  if (!recommended) return null

  const others = PACKAGES.filter((p) => p.id !== recommendationId)
  const RecIcon = ICONS[recommended.icon]

  return (
    <section
      id="recommendation"
      className="bg-brand-cream border-t border-brand-border"
    >
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center">
          <SectionBanner icon={Star}>your match</SectionBanner>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
            We'd start you on {recommended.name}
          </h2>
          <p className="text-sm text-brand-muted mb-8 md:mb-10">
            Based on your answers, this gives you the most room to grow without
            overpaying.
          </p>
        </div>

        {/* Recommended card — the one place a shadow ring is intentional. */}
        <div className="max-w-md mx-auto bg-white rounded-card p-6 shadow-[0_0_0_2px_#9FE870,0_4px_24px_rgba(159,232,112,0.12)]">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-brand-green-soft flex items-center justify-center flex-shrink-0">
              <RecIcon
                size={20}
                className="text-brand-green-dark"
                strokeWidth={1.5}
              />
            </span>
            <div>
              <h3 className="font-display text-lg font-medium text-brand-ink">
                {recommended.name}
              </h3>
              <p className="text-xs text-brand-muted">
                {recommended.bestFor} · {recommended.seating}
              </p>
            </div>
          </div>

          <ul className="space-y-2.5 mt-5">
            {recommended.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm text-brand-ink"
              >
                <Check
                  size={12}
                  className="text-brand-green-dark flex-shrink-0 mt-1"
                  strokeWidth={2.5}
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-baseline gap-1 mt-6 pt-5 border-t border-brand-border">
            <span className="font-display text-2xl font-medium text-brand-ink">
              {recommended.price}
            </span>
            <span className="text-xs text-brand-muted">
              {recommended.period} ·{' '}
              <span className="font-semibold text-brand-green-dark">
                6-month minimum
              </span>
            </span>
          </div>

          <Button
            variant="primary"
            onClick={() => onApply(recommended.id)}
            className="w-full justify-center mt-4"
          >
            Apply with {recommended.name}
            <ArrowRight size={14} strokeWidth={2} />
          </Button>
        </div>

        <p className="text-center text-xs text-brand-muted mt-10 mb-4">
          Or consider
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {others.map((p) => {
            const Icon = ICONS[p.icon]
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onApply(p.id)}
                className="group text-left w-full bg-white border border-brand-border rounded-card p-5 hover:border-brand-ink/30 transition-colors duration-150"
              >
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-brand-green-soft flex items-center justify-center flex-shrink-0">
                    <Icon
                      size={18}
                      className="text-brand-green-dark"
                      strokeWidth={1.5}
                    />
                  </span>
                  <h3 className="font-display text-base font-medium text-brand-ink">
                    {p.name}
                  </h3>
                  <span className="ml-auto text-sm font-medium text-brand-ink">
                    {p.price}
                  </span>
                </div>
                <p className="text-xs text-brand-muted mt-2">{p.bestFor}</p>
                <span className="text-xs font-medium text-brand-green-dark inline-flex items-center gap-1 mt-3 group-hover:gap-2 transition-all">
                  Apply with {p.name}
                  <ArrowRight size={12} strokeWidth={2} />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
