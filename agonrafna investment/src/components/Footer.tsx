import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  Truck,
  Banknote,
  MessageCircle,
} from 'lucide-react'
import { BRAND } from '../lib/brand'
import { generalWhatsAppUrl } from '../lib/whatsapp'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo size="md" variant="light" />
          <p className="mt-4 text-sm leading-relaxed text-cream/60">
            {BRAND.tagline}. Comfort, quality and value for every Nairobi home.
          </p>
          <a
            href={generalWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/" className="transition hover:text-gold-300">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="transition hover:text-gold-300">Shop Products</Link>
            </li>
            <li>
              <Link to="/admin" className="transition hover:text-gold-300">Owner Dashboard</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>{BRAND.location}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <a href={`tel:${BRAND.phone}`} className="transition hover:text-gold-300">
                {BRAND.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <a href={`mailto:${BRAND.email}`} className="transition hover:text-gold-300">
                {BRAND.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">
            Our Policies
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>{BRAND.policies.nairobiDelivery}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Banknote className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>{BRAND.policies.payOnDelivery}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>{BRAND.policies.nationwide}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-xs text-cream/50">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved. · {BRAND.location}
        </div>
      </div>
    </footer>
  )
}
