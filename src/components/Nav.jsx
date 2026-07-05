import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import Button from './ui/Button'

export default function Nav({ onApply }) {
  return (
    <header className="sticky top-0 z-40 bg-brand-ink border-b border-white/10">
      <nav className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
        <Logo />
        <Button variant="primary" onClick={onApply}>
          apply now
          <ArrowUpRight size={14} strokeWidth={2} />
        </Button>
      </nav>
    </header>
  )
}
