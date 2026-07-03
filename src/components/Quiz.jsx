import { useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import SectionBanner from './SectionBanner'
import Button from './ui/Button'
import { QUIZ_QUESTIONS, recommendPackage } from '../lib/quiz'

export default function Quiz({ onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const q = QUIZ_QUESTIONS[step]
  const selected = answers[q.id]
  const isLast = step === QUIZ_QUESTIONS.length - 1
  const progress = ((step + 1) / QUIZ_QUESTIONS.length) * 100

  const choose = (value) => setAnswers((a) => ({ ...a, [q.id]: value }))

  const next = () => {
    if (isLast) {
      onComplete(recommendPackage(answers))
      requestAnimationFrame(() =>
        document
          .getElementById('recommendation')
          ?.scrollIntoView({ behavior: 'smooth' }),
      )
    } else {
      setStep((s) => s + 1)
    }
  }

  return (
    <section id="quiz" className="bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center">
          <SectionBanner icon={Sparkles}>find your fit</SectionBanner>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-ink tracking-tight mt-3 mb-2">
            not sure which package?
          </h2>
          <p className="text-sm text-brand-muted mb-8 md:mb-10">
            answer four quick questions and we'll point you to the right one.
          </p>
        </div>

        <div className="max-w-md mx-auto mt-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-brand-muted">
              question {step + 1} of {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <div className="h-1 w-full bg-brand-border rounded-pill overflow-hidden">
            <div
              className="h-full bg-brand-green transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="bg-white border border-brand-border rounded-card p-6 mt-4 min-h-[320px] flex flex-col justify-between">
            <div>
              <p className="text-base font-medium text-brand-ink mb-5">
                {q.question}
              </p>
              <div className="space-y-2.5">
                {q.options.map((opt) => {
                  const active = selected === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => choose(opt.value)}
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
              <Button variant="dark" onClick={next}>
                {isLast ? 'see my result' : 'next'}
                <ArrowRight size={14} strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
