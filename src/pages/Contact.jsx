import { Link } from 'react-router-dom'
import { Mail, Clock, MessageCircle, ArrowUpRight } from 'lucide-react'
import PageShell from '../components/PageShell'
import {
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
  CONTACT_EMAIL,
  CONTACT_EMAIL_URL,
} from '../lib/contact'

const CHANNELS = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: CONTACT_EMAIL_URL,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Within one business day',
  },
]

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/wr.enmark/' },
  { label: 'Facebook', href: 'https://www.facebook.com/wr.enmark' },
]

export default function Contact() {
  return (
    <PageShell
      kicker="contact"
      title="Let's talk"
      subtitle="Questions about a plan, or ready to get started? We're quick to reply."
    >
      <div className="grid sm:grid-cols-3 gap-4">
        {CHANNELS.map(({ icon: Icon, label, value, href, external }) => {
          const inner = (
            <>
              <span className="w-9 h-9 rounded-xl bg-brand-green-soft flex items-center justify-center">
                <Icon size={18} className="text-brand-green-dark" strokeWidth={1.5} />
              </span>
              <p className="text-xs text-brand-muted mt-4">{label}</p>
              <p className="text-sm font-medium text-brand-ink mt-0.5">{value}</p>
            </>
          )
          return href ? (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="block bg-white border border-brand-border rounded-card p-5 hover:border-brand-ink/30 transition-colors"
            >
              {inner}
            </a>
          ) : (
            <div
              key={label}
              className="bg-white border border-brand-border rounded-card p-5"
            >
              {inner}
            </div>
          )
        })}
      </div>

      <div className="bg-brand-cream border border-brand-border rounded-card p-6 md:p-8 mt-8">
        <h2 className="font-display text-xl font-medium text-brand-ink">
          Applying for a plan?
        </h2>
        <p className="text-sm text-brand-muted mt-2 mb-5">
          The fastest way to start is the application form — tell us about your
          restaurant and we'll come back within one business day.
        </p>
        <Link
          to="/#apply"
          className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium bg-brand-ink text-brand-green hover:opacity-80 transition-opacity"
        >
          Start your application
          <ArrowUpRight size={14} strokeWidth={2} />
        </Link>
      </div>

      <div className="mt-8">
        <p className="text-xs text-brand-muted mb-3">Follow along</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-ink hover:text-brand-green-dark transition-colors inline-flex items-center gap-1"
            >
              {s.label}
              <ArrowUpRight size={12} strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
