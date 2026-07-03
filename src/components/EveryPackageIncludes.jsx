import { Check } from 'lucide-react'
import { EVERY_PACKAGE_INCLUDES } from '../lib/comparison'

export default function EveryPackageIncludes() {
  return (
    <div className="max-w-4xl mx-auto mt-14 bg-brand-cream rounded-card border border-brand-border p-6 md:p-8">
      <h3 className="font-display text-lg font-medium text-brand-ink">
        every package includes
      </h3>
      <p className="text-xs text-brand-muted mt-1 mb-5">
        no matter which plan you choose.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
        {EVERY_PACKAGE_INCLUDES.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-brand-ink"
          >
            <Check
              size={12}
              className="text-brand-green-dark flex-shrink-0 mt-1"
              strokeWidth={2.5}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
