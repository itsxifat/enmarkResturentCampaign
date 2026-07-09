import { Check } from 'lucide-react'
import PageShell from '../components/PageShell'
import { TERMS } from '../lib/comparison'
import { CONTACT_EMAIL } from '../lib/contact'

export default function Terms() {
  return (
    <PageShell
      kicker="terms"
      title="Terms & Conditions"
      subtitle="The terms that apply to enmark marketing plans and content production."
    >
      <div className="space-y-8">
        <p className="text-sm text-brand-muted leading-relaxed">
          By applying for and using an enmark plan, you agree to the terms
          below. These cover how our plans, payments, and deliverables work.
          They may be updated from time to time; the version in effect when you
          sign up applies to your engagement.
        </p>

        <div>
          <h2 className="font-display text-lg font-medium text-brand-ink mb-3">
            Key terms
          </h2>
          <ul className="bg-white border border-brand-border rounded-card divide-y divide-brand-border/60">
            {TERMS.map((term) => (
              <li key={term} className="flex items-start gap-3 px-4 py-3.5">
                <span className="w-5 h-5 rounded-full bg-brand-green-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check
                    size={12}
                    className="text-brand-green-dark"
                    strokeWidth={2.5}
                  />
                </span>
                <span className="text-sm text-brand-ink leading-relaxed">
                  {term}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-medium text-brand-ink mb-2">
            Questions
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            If anything here is unclear before you sign up, email us at{' '}
            {CONTACT_EMAIL} and we'll walk you through it.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
