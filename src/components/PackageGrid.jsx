import { Sprout, TrendingUp, Crown, Check, Gift, Package as PackageIcon } from 'lucide-react'
import SectionBanner from './SectionBanner'
import Button from './ui/Button'
import PlanComparison from './PlanComparison'
import EveryPackageIncludes from './EveryPackageIncludes'
import { PACKAGES } from '../lib/packages'

const ICONS = { Sprout, TrendingUp, Crown }

export default function PackageGrid({ selectedPackage, onSelect }) {
  return (
    <section id="packages" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center">
          <SectionBanner icon={PackageIcon}>packages</SectionBanner>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
            pick the plan that fits your kitchen
          </h2>
          <p className="text-sm text-brand-muted mb-8 md:mb-10">
            flat monthly pricing in bdt — and every plan includes free content
            production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {PACKAGES.map((pkg) => {
            const Icon = ICONS[pkg.icon]
            const isSelected = selectedPackage === pkg.id
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col bg-white border rounded-card p-6 transition-colors duration-150 ${
                  pkg.featured
                    ? 'border-brand-ink'
                    : 'border-brand-border hover:border-brand-ink/30'
                } ${isSelected ? 'ring-2 ring-brand-green' : ''}`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-green text-brand-ink text-[10px] font-medium px-3 py-1 rounded-pill whitespace-nowrap">
                    most popular
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-xl bg-brand-green-soft flex items-center justify-center flex-shrink-0">
                    <Icon
                      size={20}
                      className="text-brand-green-dark"
                      strokeWidth={1.5}
                    />
                  </span>
                  <h3 className="font-display text-lg font-medium text-brand-ink">
                    {pkg.name}
                  </h3>
                </div>

                <p className="text-xs text-brand-muted mt-3">{pkg.bestFor}</p>
                <span className="inline-flex self-start bg-brand-ink/5 text-brand-muted text-[10px] px-2 py-0.5 rounded-pill mt-2">
                  {pkg.seating}
                </span>

                <div className="flex items-center gap-1.5 bg-brand-green-soft text-brand-green-dark text-[11px] font-medium rounded-lg px-2.5 py-1.5 mt-3">
                  <Gift size={12} strokeWidth={1.5} className="flex-shrink-0" />
                  content production included free
                </div>

                <ul className="flex-1 space-y-2.5 mt-5">
                  {pkg.highlights.map((h) => (
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

                <div className="mt-6 pt-5 border-t border-brand-border">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-2xl font-medium text-brand-ink">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-brand-muted">
                      {pkg.period}
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-muted/70 mt-1">
                    6-month minimum · billed monthly in advance
                  </p>
                  <Button
                    variant={pkg.featured ? 'primary' : 'outline'}
                    onClick={() => onSelect(pkg.id)}
                    className="w-full justify-center mt-4"
                  >
                    {isSelected ? 'selected' : `choose ${pkg.name.toLowerCase()}`}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <PlanComparison />
        <EveryPackageIncludes />

        <p className="text-center text-xs text-brand-muted mt-8">
          6-month minimum · payments in advance · ad spend billed separately
        </p>
      </div>
    </section>
  )
}
