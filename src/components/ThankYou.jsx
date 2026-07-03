import { useEffect, useState } from 'react'
import { CheckCheck } from 'lucide-react'
import Button from './ui/Button'

export default function ThankYou({ packageId, onReset }) {
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="apply" className="bg-brand-ink text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 text-center">
        <div className="h-0.5 w-12 bg-brand-green mx-auto mb-8 rounded-full" />

        <div
          className={`w-16 h-16 rounded-full bg-brand-green mx-auto flex items-center justify-center ${
            pulse ? 'animate-pulse' : ''
          }`}
        >
          <CheckCheck size={28} className="text-brand-ink" strokeWidth={2} />
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mt-6">
          application received
        </h2>
        <p className="text-sm text-white/60 mt-3 max-w-sm mx-auto">
          thanks
          {packageId ? (
            <>
              {' '}
              for choosing{' '}
              <span className="capitalize text-white">{packageId}</span>
            </>
          ) : (
            ''
          )}
          . we'll review your restaurant and reach out on whatsapp or email
          within one business day.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button variant="primary" onClick={onReset}>
            back to top
          </Button>
        </div>
      </div>
    </section>
  )
}
