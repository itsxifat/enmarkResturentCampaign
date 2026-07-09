import { useNavigate } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

// Shared frame for the standalone info/legal pages: nav, a page header,
// the content, and the footer. Keeps every page visually consistent.
export default function PageShell({ kicker, title, subtitle, children }) {
  const navigate = useNavigate()
  const goApply = () => navigate('/#apply')

  return (
    <div className="min-h-screen bg-white font-sans text-brand-ink antialiased flex flex-col">
      <Nav onApply={goApply} />

      <main className="flex-1">
        <header className="bg-brand-cream border-b border-brand-border">
          <div className="max-w-3xl mx-auto px-4 py-16 md:py-20 text-center">
            {kicker && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green-dark mb-3">
                {kicker}
              </p>
            )}
            <h1 className="font-display text-3xl md:text-4xl font-medium text-brand-ink tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-brand-muted mt-3 max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </header>

        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-4 py-14 md:py-16">{children}</div>
        </section>
      </main>

      <Footer onApply={goApply} />
    </div>
  )
}
