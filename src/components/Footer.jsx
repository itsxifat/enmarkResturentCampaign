import { Link } from 'react-router-dom'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import Button from './ui/Button'
import { WHATSAPP_URL } from '../lib/contact'

const PAGES = [
  { label: 'About', to: '/about' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Contact', to: '/contact' },
]

const SOCIAL = [
  { label: 'WhatsApp', href: WHATSAPP_URL },
  { label: 'Instagram', href: 'https://www.instagram.com/wr.enmark/' },
  { label: 'Facebook', href: 'https://www.facebook.com/wr.enmark' },
]

export default function Footer({ onApply }) {
  return (
    <footer className="bg-black text-white/70">
      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Closing call to action */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-10 border-b border-white/10">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-medium text-white tracking-tight">
              Ready to fill more tables?
            </h3>
            <p className="text-sm text-white/50 mt-1">
              Apply in two minutes — production can start this week.
            </p>
          </div>
          <Button variant="primary" onClick={onApply} className="self-start">
            Apply now
            <ArrowUpRight size={14} strokeWidth={2} />
          </Button>
        </div>

        {/* Brand + social links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-10">
          <div className="max-w-xs">
            <Logo onDark className="h-6" />
            <p className="text-xs text-white/40 mt-3">
              Your dedicated restaurant marketing partner. Content, ads, and PR,
              handled every month.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIAL.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-brand-green transition-colors inline-flex items-center"
              >
                {l.label}
                <ExternalLink size={11} className="inline ml-0.5" />
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright + page links */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} enmark. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {PAGES.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-xs text-white/50 hover:text-brand-green transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
