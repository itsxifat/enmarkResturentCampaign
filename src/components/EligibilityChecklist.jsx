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
  { id: 'licensed', label: 'you run a licensed restaurant, café, or cloud kitchen', tag: 'required' },
  { id: 'commit', label: 'you can commit to a 6-month partnership', tag: 'required' },
  { id: 'decision', label: 'you are the owner or an authorised decision-maker', tag: 'required' },
  { id: 'seating', label: 'your restaurant seats 40 or more guests', tag: 'preferred' },
  { id: 'budget', label: 'you have a monthly budget of BDT 20,000 or more', tag: 'preferred' },
]

const HIGHLIGHTS = [
  'a dedicated manager, not just a dashboard',
  'creative turnaround as fast as 24 hours',
  'reels, photography, ads & pr in one plan',
]

const RESULTS = {
  eligible: {
    Icon: CheckCircle2,
    cls: 'text-brand-green-dark',
    title: "you're a great fit",
    body: 'everything checks out. pick a package below and apply — we can likely start this week.',
  },
  review: {
    Icon: Clock,
    cls: 'text-amber-600',
    title: 'worth a closer look',
    body: "you're close. apply anyway and we'll review the details together before committing.",
  },
  'not-eligible': {
    Icon: XCircle,
    cls: 'text-red-500',
    title: 'not quite yet',
    body: 'a couple of essentials are missing. reach out and we can talk about getting you ready.',
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
      <div className="max-w-2xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center">
          <SectionBanner icon={ClipboardCheck}>eligibility</SectionBanner>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
            are we a match?
          </h2>
          <p className="text-sm text-brand-muted mb-8 md:mb-10">
            tick what applies. it takes ten seconds and tells you where you
            stand.
          </p>
        </div>

        <div className="bg-white rounded-card border border-brand-border p-2 mt-6">
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
                className={`text-[10px] px-2 py-0.5 rounded-pill flex-shrink-0 ${
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

        <div className="flex justify-center mt-6">
          <Button variant="dark" onClick={evaluate}>
            check my eligibility
          </Button>
        </div>

        {result &&
          (() => {
            const R = RESULTS[result]
            return (
              <div className="flex items-start gap-3 bg-white border border-brand-border rounded-card p-4 mt-4">
                <R.Icon size={16} className={`${R.cls} flex-shrink-0 mt-0.5`} />
                <div>
                  <p className="text-sm font-medium text-brand-ink">{R.title}</p>
                  <p className="text-xs text-brand-muted mt-1">{R.body}</p>
                </div>
              </div>
            )
          })()}

        <ul className="mt-8 space-y-2">
          {HIGHLIGHTS.map((h) => (
            <li
              key={h}
              className="flex items-center gap-2 justify-center text-xs text-brand-muted"
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
