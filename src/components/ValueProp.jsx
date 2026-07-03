import { Gift, Megaphone, Camera, Check } from 'lucide-react'
import SectionBanner from './SectionBanner'

const MARKETING = [
  'managed social — facebook, instagram & tiktok',
  'meta ads & remarketing',
  'pr & influencer campaigns',
  'strategy, audits & monthly reporting',
]

const PRODUCTION = [
  'food & menu photography',
  'reels & short-form video',
  'on-site production shoots',
  'professional editing & color grading',
]

export default function ValueProp() {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center">
          <SectionBanner icon={Gift}>how the deal works</SectionBanner>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
            you pay for the marketing. the production is on us.
          </h2>
          <p className="text-sm text-brand-muted mb-8 md:mb-10 max-w-xl mx-auto">
            professional food shoots and video normally cost a fortune on their
            own. with enmark they're built into your monthly plan — so you get
            the content for free and only pay for the marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* What you pay for */}
          <div className="bg-white border border-brand-border rounded-card p-6">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-brand-ink/5 flex items-center justify-center flex-shrink-0">
                <Megaphone
                  size={18}
                  className="text-brand-ink"
                  strokeWidth={1.5}
                />
              </span>
              <div>
                <p className="text-xs text-brand-muted">you invest in</p>
                <h3 className="font-display text-lg font-medium text-brand-ink">
                  the marketing
                </h3>
              </div>
            </div>
            <ul className="space-y-2.5 mt-5">
              {MARKETING.map((m) => (
                <li
                  key={m}
                  className="flex items-start gap-2 text-sm text-brand-ink"
                >
                  <Check
                    size={12}
                    className="text-brand-ink/40 flex-shrink-0 mt-1"
                    strokeWidth={2.5}
                  />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-brand-muted mt-5 pt-4 border-t border-brand-border">
              one flat monthly fee, from BDT 20,000
            </p>
          </div>

          {/* What's free */}
          <div className="relative bg-brand-green-soft border border-brand-green rounded-card p-6">
            <span className="absolute top-5 right-5 bg-brand-ink text-brand-green text-[10px] font-medium px-2.5 py-1 rounded-pill">
              free
            </span>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                <Camera
                  size={18}
                  className="text-brand-green-dark"
                  strokeWidth={1.5}
                />
              </span>
              <div>
                <p className="text-xs text-brand-green-dark">
                  you get, included
                </p>
                <h3 className="font-display text-lg font-medium text-brand-ink">
                  the production
                </h3>
              </div>
            </div>
            <ul className="space-y-2.5 mt-5">
              {PRODUCTION.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm text-brand-ink"
                >
                  <Check
                    size={12}
                    className="text-brand-green-dark flex-shrink-0 mt-1"
                    strokeWidth={2.5}
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-brand-green-dark mt-5 pt-4 border-t border-brand-green/40">
              included with every plan — BDT 0 extra
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
