import { useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import SectionBanner from './SectionBanner'
import Button from './ui/Button'
import { QUIZ_QUESTIONS, recommendPackage } from '../lib/quiz'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

// Where each card sits based on its distance from the active question.
function cardStyle(offset) {
  if (offset < 0) {
    // Answered — drops away and fades, staying on top as it exits.
    return {
      transform: 'translateY(120px) scale(0.9) rotate(-3deg)',
      opacity: 0,
      zIndex: 40,
      pointerEvents: 'none',
    }
  }
  if (offset === 0) {
    // Active card, front and centre.
    return {
      transform: 'translateY(0px) scale(1) rotate(0deg)',
      opacity: 1,
      zIndex: 30,
      pointerEvents: 'auto',
    }
  }
  // Upcoming — peeking behind, slightly smaller and pushed down.
  const c = Math.min(offset, 3)
  return {
    transform: `translateY(${c * 12}px) scale(${1 - c * 0.045}) rotate(0deg)`,
    opacity: c <= 2 ? 1 : 0,
    zIndex: 30 - c,
    pointerEvents: 'none',
  }
}

export default function Quiz({ onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const total = QUIZ_QUESTIONS.length
  const progress = ((step + 1) / total) * 100

  const choose = (id, value) => setAnswers((a) => ({ ...a, [id]: value }))

  const advance = (i) => {
    if (i === total - 1) {
      onComplete(recommendPackage(answers))
      requestAnimationFrame(() =>
        document
          .getElementById('recommendation')
          ?.scrollIntoView({ behavior: 'smooth' }),
      )
    } else {
      setStep(i + 1)
    }
  }

  return (
    <section id="quiz" className="bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center">
          <SectionBanner icon={Sparkles}>find your fit</SectionBanner>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
            Not sure which package?
          </h2>
          <p className="text-sm text-brand-muted mb-8 md:mb-10">
            Answer four quick questions and we'll point you to the right one.
          </p>
        </div>

        <div className="max-w-md mx-auto mt-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-brand-muted">
              Question {step + 1} of {total}
            </span>
          </div>
          <div className="h-1 w-full bg-brand-border rounded-pill overflow-hidden">
            <div
              className="h-full bg-brand-green transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Card stack — each question is a card that rises to the front */}
          <div className="relative mt-4 min-h-[360px]">
            {QUIZ_QUESTIONS.map((question, i) => {
              const offset = i - step
              const isActive = offset === 0
              const selected = answers[question.id]
              return (
                <div
                  key={question.id}
                  aria-hidden={!isActive}
                  style={{
                    ...cardStyle(offset),
                    transition: `transform 0.55s ${EASE}, opacity 0.45s ease`,
                  }}
                  className="absolute inset-x-0 top-0 bg-white border border-brand-border rounded-card p-6 min-h-[340px] flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <p className="text-base font-medium text-brand-ink mb-5">
                      {question.question}
                    </p>
                    <div className="space-y-2.5">
                      {question.options.map((opt) => {
                        const active = selected === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => choose(question.id, opt.value)}
                            className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors duration-150 ${
                              active
                                ? 'border-brand-ink bg-brand-cream text-brand-ink'
                                : 'border-brand-border text-brand-ink hover:border-brand-ink/30'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                                active ? 'border-brand-ink' : 'border-brand-border'
                              }`}
                            >
                              {active && (
                                <span className="w-2 h-2 rounded-full bg-brand-green" />
                              )}
                            </span>
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div
                    className={`mt-6 flex justify-end transition-all duration-200 ${
                      selected
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-1 pointer-events-none'
                    }`}
                  >
                    <Button
                      variant="dark"
                      onClick={() => advance(i)}
                      tabIndex={isActive ? 0 : -1}
                    >
                      {i === total - 1 ? 'See my result' : 'Next'}
                      <ArrowRight size={14} strokeWidth={2} />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
