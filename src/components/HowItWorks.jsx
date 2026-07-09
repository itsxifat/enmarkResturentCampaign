import { useEffect, useRef, useState } from 'react'
import { Route } from 'lucide-react'
import SectionBanner from './SectionBanner'

const STEPS = [
  {
    n: 1,
    title: 'Pick a marketing plan',
    body: 'Choose the package that fits your restaurant and budget.',
  },
  {
    n: 2,
    title: 'We shoot your content — free',
    body: 'Our team produces your photos, reels, and posts at no extra cost.',
  },
  {
    n: 3,
    title: 'We market you every month',
    body: 'Social, ads, and PR run on schedule while you focus on the food.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect users who prefer reduced motion — show everything immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 text-center">
        <SectionBanner icon={Route}>how it works</SectionBanner>
        <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
          Three steps. One flat plan. Zero production bills.
        </h2>
        <p className="text-sm text-brand-muted mb-8 md:mb-10">
          From application to your first free shoot in under a week.
        </p>

        <div className="mt-12 md:mt-16">
          {/* Mobile: vertical stacked steps (as before) */}
          <div className="md:hidden max-w-sm mx-auto bg-white border border-brand-border rounded-card p-6 text-left">
            <ol className="relative">
              {STEPS.map((s, i) => (
                <li key={s.n} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-4 top-9 bottom-0 border-l-2 border-dashed border-brand-border"
                    />
                  )}
                  <span className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-brand-ink flex items-center justify-center text-sm font-medium">
                    {s.n}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-sm font-medium text-brand-ink">
                      {s.title}
                    </h3>
                    <p className="text-xs text-brand-muted mt-1">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Desktop: horizontal flow with scroll reveal */}
          <div ref={ref} className="hidden md:block relative max-w-5xl mx-auto">
            {/* Dashed connector — grows left-to-right as the section reveals */}
            <div
              aria-hidden="true"
              className={`absolute top-7 left-[16.666%] right-[16.666%] border-t-2 border-dashed border-brand-border origin-left transition-transform duration-700 ease-out delay-200 ${
                inView ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
            <ol className="grid grid-cols-3 gap-8">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  style={{ transitionDelay: `${i * 150}ms` }}
                  className={`relative flex flex-col items-center text-center transition-all duration-500 ease-out ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  <span className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-brand-green text-brand-ink flex items-center justify-center font-display text-xl font-medium ring-8 ring-white">
                    {s.n}
                  </span>
                  <h3 className="text-base font-medium text-brand-ink mt-5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-brand-muted mt-2 max-w-xs">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
