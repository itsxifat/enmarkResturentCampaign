import { ArrowRight, Camera, Film, Megaphone, Star } from 'lucide-react'
import Button from './ui/Button'

const CHIPS = [
  { icon: Film, label: 'Reels' },
  { icon: Camera, label: 'Photography' },
  { icon: Megaphone, label: 'Ads' },
  { icon: Star, label: 'PR' },
]

const STATS = [
  { value: 'Free', label: 'content production' },
  { value: '4–12', label: 'reels every month' },
  { value: '24h', label: 'creative turnaround' },
]

export default function Hero({ onPrimary, onSecondary }) {
  return (
    <section
      id="top"
      className="relative bg-black text-white overflow-hidden"
    >
      {/* Brand mark — bleeds off the bottom-right corner as a design accent */}
      <img
        src="/enmark-icon.png"
        alt=""
        aria-hidden="true"
        draggable="false"
        className="pointer-events-none select-none absolute -bottom-20 -right-16 md:-bottom-24 md:-right-20 w-[380px] md:w-[520px] max-w-none rotate-[14deg] opacity-[0.08] hidden sm:block"
      />

      <div className="relative max-w-6xl mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col">
        {/* The pitch — vertically centered in the viewport */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              free content production
              <span className="mx-2.5 text-white/20">/</span>
              <span className="text-brand-green">
                only 6 slots left this month
              </span>
            </p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08]">
              Market your restaurant with us.{' '}
              <span className="text-brand-green">
                The content production is free.
              </span>
            </h1>

            <p className="text-sm md:text-base text-white/60 mt-6 max-w-xl mx-auto">
              You pay one monthly marketing plan — we shoot your food, produce
              your reels, and run your ads &amp; PR. The photography and video
              shoots are included, so you never see a separate production bill.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
              <Button variant="primary" onClick={onPrimary}>
                See packages
                <ArrowRight size={14} strokeWidth={2} />
              </Button>
              <Button
                variant="outline"
                onClick={onSecondary}
                className="!border-white/20 !text-white hover:!border-white"
              >
                Find my fit
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 mt-10">
              {CHIPS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <Icon
                    size={15}
                    className="text-brand-green"
                    strokeWidth={1.75}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stat strip — anchors the lower area with proof points */}
        <div className="pb-10">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto border-t border-white/10 pt-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-medium text-white">
                  {s.value}
                </div>
                <div className="text-[10px] md:text-[11px] text-white/50 uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
