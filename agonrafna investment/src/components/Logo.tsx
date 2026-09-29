interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  /** Wordmark colour scheme: "light" for dark backgrounds, "dark" for light. */
  variant?: 'light' | 'dark'
  subtitle?: string
  className?: string
}

const sizeMap = {
  sm: { mark: 'h-9 w-9', mono: 'text-xl', title: 'text-sm' },
  md: { mark: 'h-11 w-11', mono: 'text-2xl', title: 'text-base sm:text-lg' },
  lg: { mark: 'h-14 w-14', mono: 'text-3xl', title: 'text-lg sm:text-xl' },
}

const DEFAULT_SUBTITLE = 'Mattresses · Beddings · Households'

/**
 * Rafna Investment luxury square logo mark — a midnight-navy gradient square
 * with a thin gold inner frame and a serif "R" monogram rendered in a gold
 * gradient. Used site-wide (header, footer, admin login, admin dashboard).
 */
export default function Logo({
  size = 'md',
  showText = true,
  variant = 'light',
  subtitle = DEFAULT_SUBTITLE,
  className = '',
}: LogoProps) {
  const s = sizeMap[size]
  const titleColor = variant === 'light' ? 'text-cream' : 'text-ink'
  const subColor = variant === 'light' ? 'text-gold-400/80' : 'text-gold-600'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl ${s.mark}`}
        style={{
          background:
            'linear-gradient(145deg,#0b1b35 0%,#16294c 55%,#0e1f3f 100%)',
          boxShadow:
            '0 2px 8px rgba(0,0,0,0.28), inset 0 1px 1px rgba(236,217,163,0.22)',
        }}
      >
        {/* thin gold inner frame */}
        <span className="pointer-events-none absolute inset-[2px] rounded-[10px] border border-gold-400/45" />
        {/* serif R monogram in gold gradient */}
        <span
          className={`relative font-display font-bold leading-none ${s.mono}`}
          style={{
            backgroundImage:
              'linear-gradient(180deg,#f2e6bf 0%,#dcbf77 38%,#c9a04e 72%,#a87f35 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}
          aria-hidden="true"
        >
          R
        </span>
      </span>

      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display font-bold tracking-wide ${titleColor} ${s.title}`}
          >
            Rafna Investment
          </span>
          <span
            className={`mt-1 hidden text-[10px] uppercase tracking-[0.22em] sm:block ${subColor}`}
          >
            {subtitle}
          </span>
        </span>
      )}
    </span>
  )
}
