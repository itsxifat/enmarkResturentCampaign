import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import ValueProp from '../components/ValueProp'
import HowItWorks from '../components/HowItWorks'
import EligibilityChecklist from '../components/EligibilityChecklist'
import PackageGrid from '../components/PackageGrid'
import Quiz from '../components/Quiz'
import RecommendationResult from '../components/RecommendationResult'
import ApplicationForm from '../components/ApplicationForm'
import ThankYou from '../components/ThankYou'
import Footer from '../components/Footer'

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Home() {
  const location = useLocation()
  const [recommendation, setRecommendation] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  // When arriving from another page with a hash (e.g. /#apply), scroll to it.
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [location])

  // Selecting a package (from the grid or the quiz result) drops the user
  // into the application form with that package pre-filled.
  const handleSelect = (id) => {
    setSelectedPackage(id)
    setSubmitted(false)
    requestAnimationFrame(() => scrollTo('apply'))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    requestAnimationFrame(() => scrollTo('apply'))
  }

  const handleReset = () => {
    setSubmitted(false)
    scrollTo('top')
  }

  return (
    <div className="min-h-screen bg-white font-sans text-brand-ink antialiased">
      <Nav onApply={() => scrollTo('packages')} />
      <Hero
        onPrimary={() => scrollTo('packages')}
        onSecondary={() => scrollTo('quiz')}
      />
      <ValueProp />
      <HowItWorks />
      <EligibilityChecklist />
      <PackageGrid selectedPackage={selectedPackage} onSelect={handleSelect} />
      <Quiz onComplete={setRecommendation} />
      {recommendation && (
        <RecommendationResult
          recommendationId={recommendation}
          onApply={handleSelect}
        />
      )}
      {submitted ? (
        <ThankYou packageId={selectedPackage} onReset={handleReset} />
      ) : (
        <ApplicationForm
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
          onSubmit={handleSubmit}
        />
      )}
      <Footer onApply={() => scrollTo('packages')} />
    </div>
  )
}
