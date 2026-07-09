import { useState } from 'react'
import {
  ClipboardCheck,
  Check,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react'
import SectionBanner from './SectionBanner'
import Button from './ui/Button'

const CRITERIA = [
  { id: 'licensed', label: 'You run a licensed restaurant, café, or cloud kitchen', tag: 'required' },
  { id: 'commit', label: 'You can commit to a 6-month partnership', tag: 'required' },
  { id: 'decision', label: 'You are the owner or an authorised decision-maker', tag: 'required' },
  { id: 'active', label: 'Your restaurant is currently open and serving', tag: 'required' },
  { id: 'seating', label: 'Your restaurant seats 40 or more guests', tag: 'preferred' },
  { id: 'budget', label: 'You have a monthly budget of BDT 20,000 or more', tag: 'preferred' },
  { id: 'menu', label: 'You have a set menu ready to photograph', tag: 'preferred' },
  { id: 'social', label: 'You have active social profiles to grow', tag: 'preferred' },
]

const HIGHLIGHTS = [
  'A dedicated manager, not just a dashboard',
  'Creative turnaround as fast as 24 hours',
  'Reels, photography, ads & PR in one plan',
]

const RESULTS = {
  eligible: {
    Icon: CheckCircle2,
    cls: 'text-brand-green-dark',
    title: "You're a great fit",
    body: 'Everything checks out. Pick a package below and apply — we can likely start this week.',
  },
  review: {
    Icon: Clock,
    cls: 'text-amber-600',
    title: 'Worth a closer look',
    body: "You're close. Apply anyway and we'll review the details together before committing.",
  },
  'not-eligible': {
    Icon: XCircle,
    cls: 'text-red-500',
    title: 'Not quite yet',
    body: 'A couple of essentials are missing. Reach out and we can talk about getting you ready.',
  },
}

export default function EligibilityChecklist() {
  const [checked, setChecked] = useState({})
  const [result, setResult] = useState(null)

  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }))

  const evaluate = () => {
    const missing = CRITERIA.filter(
      (c) => c.tag === 'required' && !checked[c.id],
    ).length
    if (missing === 0) setResult('eligible')
    else if (missing === 1) setResult('review')
    else setResult('not-eligible')
  }

  return (
    <section id="eligibility" className="bg-brand-cream">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center">
          <SectionBanner icon={ClipboardCheck}>eligibility</SectionBanner>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
            Are we a match?
          </h2>
          <p className="text-sm text-brand-muted mb-8 md:mb-10">
            Tick what applies. It takes ten seconds and tells you where you
            stand.
          </p>
        </div>

        {/* Mobile: simple stacked list (as before) */}
        <div className="sm:hidden bg-white rounded-card border border-brand-border p-2">
          {CRITERIA.map((c) => (
            <label
              key={c.id}
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer rounded-xl hover:bg-brand-cream/60 transition-colors"
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  checked[c.id]
                    ? 'bg-brand-green border-brand-green'
                    : 'border-brand-border bg-white'
                }`}
              >
                {checked[c.id] && (
                  <Check size={12} className="text-brand-ink" strokeWidth={2.5} />
                )}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={!!checked[c.id]}
                onChange={() => toggle(c.id)}
              />
              <span className="text-sm text-brand-ink flex-1">{c.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-pill flex-shrink-0 capitalize ${
                  c.tag === 'required'
                    ? 'bg-brand-ink/8 text-brand-ink'
                    : 'bg-brand-green-soft text-brand-green-dark'
                }`}
              >
                {c.tag}
              </span>
            </label>
          ))}
        </div>

        {/* sm and up: card grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3">
          {CRITERIA.map((c) => (
            <label
              key={c.id}
              className={`flex flex-col gap-3 h-full p-4 rounded-xl border cursor-pointer text-left transition-colors ${
                checked[c.id]
                  ? 'border-brand-green bg-brand-green-soft/40'
                  : 'border-brand-border bg-white hover:border-brand-ink/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    checked[c.id]
                      ? 'bg-brand-green border-brand-green'
                      : 'border-brand-border bg-white'
                  }`}
                >
                  {checked[c.id] && (
                    <Check
                      size={12}
                      className="text-brand-ink"
                      strokeWidth={2.5}
                    />
                  )}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-pill flex-shrink-0 capitalize ${
                    c.tag === 'required'
                      ? 'bg-brand-ink/8 text-brand-ink'
                      : 'bg-brand-green-soft text-brand-green-dark'
                  }`}
                >
                  {c.tag}
                </span>
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={!!checked[c.id]}
                onChange={() => toggle(c.id)}
              />
              <span className="text-sm text-brand-ink">{c.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="dark" onClick={evaluate}>
            Check my eligibility
          </Button>
        </div>

        {result &&
          (() => {
            const R = RESULTS[result]
            return (
              <div className="flex items-start gap-3 bg-white border border-brand-border rounded-card p-4 mt-4 max-w-2xl mx-auto">
                <R.Icon size={16} className={`${R.cls} flex-shrink-0 mt-0.5`} />
                <div>
                  <p className="text-sm font-medium text-brand-ink">{R.title}</p>
                  <p className="text-xs text-brand-muted mt-1">{R.body}</p>
                </div>
              </div>
            )
          })()}

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {HIGHLIGHTS.map((h) => (
            <li
              key={h}
              className="flex items-center gap-2 text-xs text-brand-muted"
            >
              <Check
                size={12}
                className="text-brand-green-dark flex-shrink-0"
                strokeWidth={2.5}
              />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
