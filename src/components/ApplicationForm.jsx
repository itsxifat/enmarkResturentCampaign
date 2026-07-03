import { useRef, useState } from 'react'
import { ImagePlus, Check, Send } from 'lucide-react'
import SectionBanner from './SectionBanner'
import Button from './ui/Button'
import TermsModal from './TermsModal'
import { PACKAGES } from '../lib/packages'
import { inputClass } from '../lib/ui'

const EMPTY = { name: '', restaurant: '', email: '', phone: '', city: '', notes: '' }

export default function ApplicationForm({
  selectedPackage,
  onSelectPackage,
  onSubmit,
}) {
  const fileRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [form, setForm] = useState(EMPTY)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!agreed) return
    onSubmit({ ...form, package: selectedPackage, photo: fileName })
  }

  return (
    <section id="apply" className="bg-brand-cream border-t border-brand-border">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center">
          <SectionBanner>apply</SectionBanner>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
            tell us about your restaurant
          </h2>
          <p className="text-sm text-brand-muted mb-6">
            two minutes. we reply within one business day.
          </p>
        </div>

        {selectedPackage && (
          <div className="flex items-center gap-2 max-w-md mx-auto mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            <p className="text-xs text-brand-muted">
              applying for:{' '}
              <span className="font-medium text-brand-ink capitalize">
                {selectedPackage}
              </span>
            </p>
          </div>
        )}

        <form
          onSubmit={submit}
          className="max-w-md mx-4 md:mx-auto bg-white border border-brand-border rounded-card p-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-brand-ink mb-1.5">
                your name
              </label>
              <input
                required
                className={inputClass}
                placeholder="jane doe"
                value={form.name}
                onChange={set('name')}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brand-ink mb-1.5">
                restaurant name
              </label>
              <input
                required
                className={inputClass}
                placeholder="spice garden"
                value={form.restaurant}
                onChange={set('restaurant')}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brand-ink mb-1.5">
                email
              </label>
              <input
                required
                type="email"
                className={inputClass}
                placeholder="you@restaurant.com"
                value={form.email}
                onChange={set('email')}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brand-ink mb-1.5">
                phone
              </label>
              <input
                className={inputClass}
                placeholder="+880 1XXX-XXXXXX"
                value={form.phone}
                onChange={set('phone')}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brand-ink mb-1.5">
                city
              </label>
              <input
                className={inputClass}
                placeholder="dhaka"
                value={form.city}
                onChange={set('city')}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brand-ink mb-1.5">
                package
              </label>
              <select
                className={inputClass}
                value={selectedPackage || ''}
                onChange={(e) => onSelectPackage(e.target.value)}
              >
                <option value="">choose a package</option>
                {PACKAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-ink mb-1.5">
              anything we should know?
            </label>
            <textarea
              rows={3}
              className={inputClass}
              placeholder="tell us about your goals..."
              value={form.notes}
              onChange={set('notes')}
            />
          </div>

          <div
            className="border-2 border-dashed border-brand-border rounded-xl p-6 text-center cursor-pointer hover:border-brand-ink/30 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            <ImagePlus
              size={20}
              className="text-brand-muted mx-auto mb-2"
              strokeWidth={1.5}
            />
            <p className="text-xs text-brand-muted">
              {fileName || 'click to upload a restaurant photo'}
            </p>
            <p className="text-[11px] text-brand-muted/60 mt-1">
              optional · jpg, png, webp
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <span
              className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                agreed
                  ? 'bg-brand-green border-brand-green'
                  : 'border-brand-border bg-white'
              }`}
            >
              {agreed && (
                <Check size={12} className="text-brand-ink" strokeWidth={2.5} />
              )}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={agreed}
              onChange={() => setAgreed((a) => !a)}
            />
            <span className="text-xs text-brand-muted">
              i agree to the{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowTerms(true)
                }}
                className="underline text-brand-ink hover:text-brand-green-dark"
              >
                terms &amp; conditions
              </button>{' '}
              and privacy policy.
            </span>
          </label>

          <Button
            type="submit"
            variant="primary"
            disabled={!agreed}
            className={`w-full justify-center ${
              !agreed ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            submit application
            <Send size={14} strokeWidth={2} />
          </Button>
        </form>
      </div>

      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
    </section>
  )
}
