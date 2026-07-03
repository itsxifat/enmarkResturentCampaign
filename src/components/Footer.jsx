import { ExternalLink, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import Button from './ui/Button'

const LINKS = [
  { label: 'instagram', href: '#', external: true },
  { label: 'tiktok', href: '#', external: true },
  { label: 'facebook', href: '#', external: true },
  { label: 'privacy', href: '#', external: false },
  { label: 'contact', href: 'mailto:hello@enmark.co', external: true },
]

export default function Footer({ onApply }) {
  return (
    <footer className="bg-brand-ink text-white/70">
      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Closing call to action */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-10 border-b border-white/10">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-medium text-white tracking-tight">
              ready to fill more tables?
            </h3>
            <p className="text-sm text-white/50 mt-1">
              apply in two minutes — production can start this week.
            </p>
          </div>
          <Button variant="primary" onClick={onApply} className="self-start">
            apply now
            <ArrowUpRight size={14} strokeWidth={2} />
          </Button>
        </div>

        {/* Brand + links */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mt-10">
          <div className="max-w-xs">
            <Logo onDark className="h-6" />
            <p className="text-xs text-white/40 mt-3">
              your dedicated restaurant marketing partner. content, ads, and pr,
              handled every month.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/60 hover:text-brand-green transition-colors inline-flex items-center"
              >
                {l.label}
                {l.external && (
                  <ExternalLink size={11} className="inline ml-0.5" />
                )}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} enmark. all rights reserved.
        </div>
      </div>
    </footer>
  )
}
