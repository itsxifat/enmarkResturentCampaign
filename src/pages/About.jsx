import { Link } from 'react-router-dom'
import { Camera, Megaphone, Star, HandHeart } from 'lucide-react'
import PageShell from '../components/PageShell'

const VALUES = [
  {
    icon: HandHeart,
    title: 'Content, on us',
    body: 'Professional food and video shoots are built into every plan — you never see a separate production bill.',
  },
  {
    icon: Camera,
    title: 'Made in-house',
    body: 'Our own team shoots, edits, and produces your reels and photography, so quality stays consistent.',
  },
  {
    icon: Megaphone,
    title: 'Marketing that runs',
    body: 'Social, ads, and PR are managed every month on a clear schedule while you focus on the food.',
  },
  {
    icon: Star,
    title: 'A real partner',
    body: 'A dedicated manager who knows your restaurant — not just a dashboard and a monthly invoice.',
  },
]

export default function About() {
  return (
    <PageShell
      kicker="about us"
      title="Marketing built for restaurants"
      subtitle="enmark helps restaurants grow by bundling professional content production into one simple monthly marketing plan."
    >
      <div className="space-y-5 text-sm text-brand-muted leading-relaxed">
        <p>
          Great restaurants often lose to lesser ones online — not because the
          food is worse, but because the marketing is. Professional photography,
          reels, ads, and PR usually mean juggling multiple vendors and
          unpredictable production bills. Most kitchens simply don't have the
          time.
        </p>
        <p>
          enmark exists to fix that. We fold the content production — the food
          shoots, the reels, the editing — into a single monthly marketing plan.
          You pay for the marketing; the production comes free. One team, one
          plan, one predictable cost.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-10">
        {VALUES.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="bg-white border border-brand-border rounded-card p-5"
          >
            <span className="w-9 h-9 rounded-xl bg-brand-green-soft flex items-center justify-center">
              <Icon size={18} className="text-brand-green-dark" strokeWidth={1.5} />
            </span>
            <h3 className="font-display text-base font-medium text-brand-ink mt-4">
              {title}
            </h3>
            <p className="text-sm text-brand-muted mt-1 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="bg-brand-cream border border-brand-border rounded-card p-6 md:p-8 mt-10 text-center">
        <h2 className="font-display text-xl font-medium text-brand-ink">
          Ready to grow your restaurant?
        </h2>
        <p className="text-sm text-brand-muted mt-2 mb-5">
          See the packages and apply in two minutes — production can start this
          week.
        </p>
        <Link
          to="/#packages"
          className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium bg-brand-green text-brand-ink hover:bg-brand-green/90 transition-colors"
        >
          View packages
        </Link>
      </div>
    </PageShell>
  )
}
