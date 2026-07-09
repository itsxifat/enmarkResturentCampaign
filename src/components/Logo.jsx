import { Link } from 'react-router-dom'

// Real enmark wordmark. `onDark` uses the light variant for ink surfaces.
export default function Logo({ onDark = false, className = 'h-7' }) {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="enmark — home">
      <img
        src={onDark ? '/enmark-logo-light.png' : '/enmark-logo.png'}
        alt="enmark"
        className={`${className} w-auto`}
        draggable="false"
      />
    </Link>
  )
}
