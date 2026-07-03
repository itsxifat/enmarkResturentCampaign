// The ONLY three button variants allowed across the app.
const VARIANTS = {
  primary:
    'bg-brand-green text-brand-ink hover:bg-brand-green/90 transition-colors duration-150',
  dark: 'bg-brand-ink text-brand-green hover:opacity-80 transition-opacity duration-150',
  outline:
    'border border-brand-border text-brand-ink hover:border-brand-ink transition-colors duration-150',
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
