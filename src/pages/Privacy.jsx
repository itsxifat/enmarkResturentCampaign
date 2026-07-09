import PageShell from '../components/PageShell'
import { CONTACT_EMAIL } from '../lib/contact'

const SECTIONS = [
  {
    heading: 'Information we collect',
    body: [
      'When you submit an application, we collect the details you provide: your name, restaurant name, email, phone number, city, chosen package, any notes, and an optional photo you upload.',
      'We may also collect basic, non-identifying usage data (such as pages viewed) to help us improve the site.',
    ],
  },
  {
    heading: 'How we use your information',
    body: [
      'We use your information to review your application, respond to your enquiry, prepare a proposal, and — if you become a client — deliver and manage your marketing services.',
      'We do not sell your personal information to anyone.',
    ],
  },
  {
    heading: 'Sharing',
    body: [
      'We only share your information with team members and trusted service providers who help us operate (for example, our email and hosting providers), and only to the extent needed to provide our services. We may disclose information where required by law.',
    ],
  },
  {
    heading: 'Data retention',
    body: [
      'We keep application data for as long as needed to evaluate your enquiry and, where relevant, to maintain our client relationship. You can ask us to delete your data at any time.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      `You may request access to, correction of, or deletion of the personal information we hold about you. To make a request, email us at ${CONTACT_EMAIL}.`,
    ],
  },
  {
    heading: 'Contact',
    body: [
      `Questions about this policy? Reach us at ${CONTACT_EMAIL} and we will respond within one business day.`,
    ],
  },
]

export default function Privacy() {
  return (
    <PageShell
      kicker="privacy"
      title="Privacy Policy"
      subtitle="Last updated July 2026"
    >
      <div className="space-y-8">
        <p className="text-sm text-brand-muted leading-relaxed">
          This policy explains what information enmark collects, how we use it,
          and the choices you have. By using this site or submitting an
          application, you agree to the practices described below.
        </p>

        {SECTIONS.map((s) => (
          <div key={s.heading}>
            <h2 className="font-display text-lg font-medium text-brand-ink mb-2">
              {s.heading}
            </h2>
            <div className="space-y-2.5">
              {s.body.map((p, i) => (
                <p key={i} className="text-sm text-brand-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
