import { X } from 'lucide-react'
import Button from './ui/Button'
import { TERMS } from '../lib/comparison'

export default function TermsModal({ open, onClose }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="terms and conditions"
    >
      <div className="absolute inset-0 bg-brand-ink/60" onClick={onClose} />
      <div className="relative bg-white rounded-card border border-brand-border max-w-lg w-full max-h-[80vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-medium text-brand-ink">
            Terms &amp; conditions
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="w-8 h-8 rounded-pill flex items-center justify-center hover:bg-brand-cream transition-colors"
          >
            <X size={16} className="text-brand-muted" strokeWidth={1.5} />
          </button>
        </div>

        <ul className="space-y-2.5 text-xs text-brand-muted leading-relaxed">
          {TERMS.map((term) => (
            <li key={term} className="flex gap-2">
              <span className="text-brand-green-dark">•</span>
              <span>{term}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-end">
          <Button variant="dark" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  )
}
