import { Fragment, useEffect, useRef, useState } from 'react'
import { Check, Minus, ChevronDown } from 'lucide-react'
import { COMPARISON } from '../lib/comparison'
import { PACKAGES } from '../lib/packages'

// This category is always expanded — it's the core of the offer.
const ALWAYS_OPEN = 'Creative production'

function DeskMark({ value }) {
  if (value === true)
    return <Check size={14} className="text-brand-green-dark" strokeWidth={2.5} />
  if (value === false)
    return <Minus size={14} className="text-brand-muted/40" strokeWidth={1.5} />
  return <span className="text-xs text-brand-ink">{value}</span>
}

export default function PlanComparison() {
  // Mobile: which plan column to show. Default to the featured one.
  const [active, setActive] = useState(PACKAGES.findIndex((p) => p.featured))
  // Which collapsible categories are currently expanded.
  const [expanded, setExpanded] = useState({})
  const ref = useRef(null)

  const toggle = (category) =>
    setExpanded((e) => ({ ...e, [category]: !e[category] }))

  const isOpen = (category) =>
    category === ALWAYS_OPEN || !!expanded[category]

  // Re-collapse the optional categories once the section scrolls out of view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setExpanded({})
      },
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mt-14">
      <div className="text-center mb-6">
        <h3 className="font-display text-xl md:text-2xl font-medium text-brand-ink tracking-tight">
          Compare every feature
        </h3>
        <p className="text-sm text-brand-muted mt-1">
          Everything in each plan, side by side.
        </p>
      </div>

      {/* Desktop: full comparison table */}
      <div className="hidden md:block overflow-x-auto rounded-card border border-brand-border">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="p-4 align-bottom w-[34%]">
                <span className="text-xs font-medium text-brand-muted">
                  What's included
                </span>
              </th>
              {PACKAGES.map((p) => (
                <th
                  key={p.id}
                  className={`p-4 text-center align-bottom ${
                    p.featured ? 'bg-brand-green-soft/50' : ''
                  }`}
                >
                  {p.featured && (
                    <div className="text-[10px] font-medium text-brand-green-dark mb-1">
                      Most popular
                    </div>
                  )}
                  <div className="font-display text-base font-medium text-brand-ink">
                    {p.name}
                  </div>
                  <div className="text-xs text-brand-muted mt-0.5">
                    {p.price}
                    <span className="text-brand-muted/70">{p.period}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((cat) => {
              const alwaysOpen = cat.category === ALWAYS_OPEN
              const open = isOpen(cat.category)
              return (
                <Fragment key={cat.category}>
                  <tr className="bg-brand-cream/70 border-b border-brand-border/60">
                    <td colSpan={4} className="p-0">
                      {alwaysOpen ? (
                        <div className="px-4 py-2.5 text-[11px] font-medium text-brand-muted">
                          {cat.category}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggle(cat.category)}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-left text-[11px] font-medium text-brand-muted hover:text-brand-ink transition-colors"
                        >
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${
                              open ? 'rotate-180' : ''
                            }`}
                          />
                          {cat.category}
                          <span className="ml-auto text-[10px] text-brand-muted/60">
                            {open ? 'Hide' : `${cat.rows.length} features`}
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                  {open &&
                    cat.rows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-brand-border/60 last:border-b-0"
                      >
                        <td className="px-4 py-3 text-sm text-brand-ink">
                          {row.label}
                        </td>
                        {row.values.map((v, i) => (
                          <td
                            key={i}
                            className={`px-4 py-3 text-center ${
                              PACKAGES[i].featured ? 'bg-brand-green-soft/30' : ''
                            }`}
                          >
                            <span className="inline-flex justify-center">
                              <DeskMark value={v} />
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: pick a plan, then read its full feature list */}
      <div className="md:hidden">
        <div className="grid grid-cols-3 gap-1 bg-white border border-brand-border rounded-pill p-1 sticky top-16 z-10">
          {PACKAGES.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-pill py-2 text-xs font-medium transition-colors ${
                active === i
                  ? 'bg-brand-ink text-brand-green'
                  : 'text-brand-ink'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="text-center mt-4">
          <span className="font-display text-2xl font-medium text-brand-ink">
            {PACKAGES[active].price}
          </span>
          <span className="text-xs text-brand-muted">
            {PACKAGES[active].period} ·{' '}
            <span className="font-semibold text-brand-green-dark">
              6-month minimum
            </span>
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {COMPARISON.map((cat) => {
            const alwaysOpen = cat.category === ALWAYS_OPEN
            const open = isOpen(cat.category)
            return (
              <div key={cat.category}>
                {alwaysOpen ? (
                  <h4 className="text-[11px] font-medium text-brand-muted mb-2">
                    {cat.category}
                  </h4>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggle(cat.category)}
                    className="flex items-center justify-between w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm font-medium text-brand-ink"
                  >
                    <span>{cat.category}</span>
                    <ChevronDown
                      size={16}
                      className={`text-brand-muted transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
                {open && (
                  <ul className="bg-white border border-brand-border rounded-card divide-y divide-brand-border/60 mt-2">
                    {cat.rows.map((row) => {
                      const v = row.values[active]
                      return (
                        <li
                          key={row.label}
                          className="flex items-center justify-between gap-3 px-4 py-3"
                        >
                          <span
                            className={`text-sm ${
                              v === false
                                ? 'text-brand-muted/50'
                                : 'text-brand-ink'
                            }`}
                          >
                            {row.label}
                          </span>
                          <span className="flex-shrink-0 text-right">
                            {v === true ? (
                              <Check
                                size={14}
                                className="text-brand-green-dark"
                                strokeWidth={2.5}
                              />
                            ) : v === false ? (
                              <Minus
                                size={14}
                                className="text-brand-muted/40"
                                strokeWidth={1.5}
                              />
                            ) : (
                              <span className="text-xs font-medium text-brand-ink">
                                {v}
                              </span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
