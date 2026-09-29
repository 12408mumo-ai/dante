import { Link, NavLink } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { BRAND } from '../lib/brand'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold-500/15 bg-ink/95 text-cream shadow-lg shadow-ink/20 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="rounded-xl transition hover:opacity-90"
          aria-label={`${BRAND.name} home`}
        >
          <Logo size="md" variant="light" />
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition sm:text-base ${
                isActive ? 'text-gold-400' : 'text-cream/80 hover:text-gold-300'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition sm:text-base ${
                isActive ? 'text-gold-400' : 'text-cream/80 hover:text-gold-300'
              }`
            }
          >
            Shop
          </NavLink>
          <Link
            to="/admin"
            className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-gold-500 px-3 py-2 text-sm font-semibold text-ink shadow transition hover:bg-gold-400 hover:shadow-gold-500/30 sm:px-4"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}
