import { useEffect, useRef, useState } from 'react'
import { ImagePlus, Check, Send, ChevronDown, CheckCircle2, X } from 'lucide-react'
import SectionBanner from './SectionBanner'
import Button from './ui/Button'
import TermsModal from './TermsModal'
import { PACKAGES } from '../lib/packages'
import { inputClass } from '../lib/ui'
import { CONTACT_EMAIL } from '../lib/contact'

const EMPTY = { name: '', restaurant: '', email: '', phone: '', city: '', notes: '' }

const REASSURANCE = [
  'We reply within a few hours',
  'No obligation — just a conversation',
  'Free content production with every plan',
]

// Custom dropdown replacing the native <select> for the package picker.
function PackageSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = PACKAGES.find((p) => p.id === value)

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${inputClass} flex items-center justify-between text-left ${
          open ? '!border-brand-ink' : ''
        }`}
      >
        <span className={selected ? 'text-brand-ink' : 'text-brand-muted/60'}>
          {selected ? `${selected.name} · ${selected.price}` : 'Choose a package'}
        </span>
        <ChevronDown
          size={16}
          className={`text-brand-muted flex-shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul className="absolute z-20 left-0 right-0 mt-1.5 bg-white border border-brand-border rounded-xl shadow-lg shadow-brand-ink/5 overflow-hidden py-1">
          {PACKAGES.map((p) => {
            const active = p.id === value
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(p.id)
                    setOpen(false)
                  }}
                  className={`w-full text-left flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm transition-colors ${
                    active
                      ? 'bg-brand-green-soft text-brand-ink'
                      : 'text-brand-ink hover:bg-brand-cream'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className={`text-brand-green-dark flex-shrink-0 ${
                        active ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <span className={active ? 'font-medium' : ''}>{p.name}</span>
                  </span>
                  <span className="text-xs text-brand-muted">{p.price}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default function ApplicationForm({
  selectedPackage,
  onSelectPackage,
  onSubmit,
}) {
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!agreed || sending) return
    setSending(true)
    setError('')

    // multipart/form-data so the actual photo file is attached, not just its name
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    data.append('package', selectedPackage || '')
    if (file) data.append('photo', file)

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: data })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || !body.ok) throw new Error('send_failed')
      // Only show the success screen once the mail actually went out.
      onSubmit({ ...form, package: selectedPackage, photo: fileName })
    } catch {
      setError(
        `We couldn't send your application. Please try again, or email us at ${CONTACT_EMAIL}.`,
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="apply" className="bg-brand-cream border-t border-brand-border">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left — pitch & reassurance */}
          <div className="lg:sticky lg:top-24">
            <SectionBanner>apply</SectionBanner>
            <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
              Tell us about your restaurant
            </h2>
            <p className="text-sm text-brand-muted">
              Two minutes. We reply within a few hours.
            </p>

            <ul className="mt-6 space-y-3">
              {REASSURANCE.map((r) => (
                <li
                  key={r}
                  className="flex items-center gap-2.5 text-sm text-brand-ink"
                >
                  <span className="w-5 h-5 rounded-full bg-brand-green-soft flex items-center justify-center flex-shrink-0">
                    <Check
                      size={12}
                      className="text-brand-green-dark"
                      strokeWidth={2.5}
                    />
                  </span>
                  {r}
                </li>
              ))}
            </ul>

            {selectedPackage && (
              <div className="flex items-center gap-2 mt-6">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <p className="text-xs text-brand-muted">
                  Applying for:{' '}
                  <span className="font-medium text-brand-ink capitalize">
                    {selectedPackage}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Right — the form */}
          <form
            onSubmit={submit}
            className="bg-white border border-brand-border rounded-card p-6 md:p-8 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-brand-ink mb-1.5">
                  Your name
                </label>
                <input
                  required
                  className={inputClass}
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={set('name')}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-ink mb-1.5">
                  Restaurant name
                </label>
                <input
                  required
                  className={inputClass}
                  placeholder="Spice Garden"
                  value={form.restaurant}
                  onChange={set('restaurant')}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-ink mb-1.5">
                  Email
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
                  Phone
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
                  City
                </label>
                <input
                  className={inputClass}
                  placeholder="Dhaka"
                  value={form.city}
                  onChange={set('city')}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-ink mb-1.5">
                  Package
                </label>
                <PackageSelect
                  value={selectedPackage || ''}
                  onChange={onSelectPackage}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-ink mb-1.5">
                Anything we should know?
              </label>
              <textarea
                rows={3}
                className={inputClass}
                placeholder="Tell us about your goals..."
                value={form.notes}
                onChange={set('notes')}
              />
            </div>

            {fileName ? (
              <div className="flex items-center gap-3 border-2 border-brand-green bg-brand-green-soft/40 rounded-xl p-3.5">
                <span className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                  <CheckCircle2
                    size={18}
                    className="text-brand-green-dark"
                    strokeWidth={2}
                  />
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-xs font-medium text-brand-ink truncate">
                    {fileName}
                  </p>
                  <p className="text-[11px] text-brand-green-dark mt-0.5">
                    Photo attached
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null)
                    setFileName('')
                    if (fileRef.current) fileRef.current.value = ''
                  }}
                  aria-label="Remove photo"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-brand-muted hover:bg-white hover:text-brand-ink transition-colors flex-shrink-0"
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>
            ) : (
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
                  Click to upload a restaurant photo
                </p>
                <p className="text-[11px] text-brand-muted/60 mt-1">
                  Optional · JPG, PNG, WEBP
                </p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] || null
                setFile(f)
                setFileName(f ? f.name : '')
              }}
            />

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
                I agree to the{' '}
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

            {error && (
              <p className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                <X size={14} strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={!agreed || sending}
              className={`w-full justify-center ${
                !agreed || sending ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              {sending ? 'Submitting…' : 'Submit application'}
              <Send size={14} strokeWidth={2} />
            </Button>
          </form>
        </div>
      </div>

      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
    </section>
  )
}
