import {
  Gift,
  ArrowRight,
  Play,
  Camera,
  Images,
  Clapperboard,
  Film,
  Megaphone,
  Star,
} from 'lucide-react'
import Button from './ui/Button'

const CHIPS = [
  { icon: Film, label: 'reels' },
  { icon: Camera, label: 'photography' },
  { icon: Megaphone, label: 'ads' },
  { icon: Star, label: 'pr' },
]

export default function Hero({ onPrimary, onSecondary }) {
  return (
    <section id="top" className="bg-brand-ink text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — the pitch */}
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-pill px-3 py-1.5 mb-5">
              <Gift size={12} className="text-brand-green" strokeWidth={2} />
              <span className="text-xs font-medium text-white/70">
                free content production · 6 slots left this month
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.08]">
              market your restaurant with us.{' '}
              <span className="text-brand-green">
                the content production is free.
              </span>
            </h1>

            <p className="text-sm md:text-base text-white/60 mt-5 max-w-md">
              you pay one monthly marketing plan — we shoot your food, produce
              your reels, and run your ads &amp; pr. the photography and video
              shoots are included, so you never see a separate production bill.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button variant="primary" onClick={onPrimary}>
                see packages
                <ArrowRight size={14} strokeWidth={2} />
              </Button>
              <Button
                variant="outline"
                onClick={onSecondary}
                className="!border-white/20 !text-white hover:!border-white"
              >
                find my fit
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {CHIPS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-pill px-3 py-1.5 text-xs text-white/70"
                >
                  <Icon size={13} className="text-brand-green" strokeWidth={1.5} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — a peek at the content pipeline we run for you */}
          <div className="relative">
            <img
              src="/enmark-icon.png"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="pointer-events-none select-none absolute -top-12 -right-8 w-44 opacity-[0.07]"
            />

            <div className="relative bg-white/[0.04] border border-white/10 rounded-card p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="ml-2 text-[11px] text-white/40">
                  your content pipeline
                </span>
              </div>

              {/* Reel in production */}
              <div className="relative aspect-[16/10] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                <span className="absolute top-2 left-2 text-[10px] text-white/60 bg-black/30 px-1.5 py-0.5 rounded-pill">
                  reel · 0:15
                </span>
                <span className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center">
                  <Play
                    size={18}
                    className="text-brand-ink fill-brand-ink translate-x-0.5"
                    strokeWidth={0}
                  />
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <span className="block h-full w-2/5 bg-brand-green" />
                </span>
              </div>

              {/* Two deliverable tiles */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <Camera
                    size={18}
                    className="text-brand-green"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm text-white mt-2">photography</p>
                  <p className="text-[11px] text-white/50">menu &amp; ambience</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <Images
                    size={18}
                    className="text-brand-green"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm text-white mt-2">social posts</p>
                  <p className="text-[11px] text-white/50">8–24 / month</p>
                </div>
              </div>

              {/* Production day strip */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 mt-3">
                <span className="flex items-center gap-2 text-xs text-white/70">
                  <Clapperboard
                    size={16}
                    className="text-brand-green"
                    strokeWidth={1.5}
                  />
                  next production day
                </span>
                <span className="text-xs font-medium text-white">
                  every month
                </span>
              </div>
            </div>

            <p className="text-[11px] text-white/40 mt-3 text-center">
              every asset above is produced free with your marketing plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
