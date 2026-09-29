import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Truck,
  Store,
  User,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import type { FulfillmentType, Product } from '../types'
import { buildOrderWhatsAppUrl } from '../lib/whatsapp'
import { formatKES } from '../lib/format'
import { BRAND } from '../lib/brand'

interface Props {
  product: Product
  open: boolean
  onClose: () => void
}

export default function OrderModal({ product, open, onClose }: Props) {
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('Delivery')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [orderUrl, setOrderUrl] = useState<string>('')

  // Reset whenever a fresh modal is opened.
  useEffect(() => {
    if (open) {
      setSent(false)
      setSending(false)
      setErrors({})
      setOrderUrl('')
      setFulfillment('Delivery')
      setName('')
      setPhone('')
      setLocation('')
    }
  }, [open])

  // Lock background scroll while open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Please enter your full name'
    if (!phone.trim()) e.phone = 'Please enter your phone number'
    else if (!/^[0-9+][0-9+\s-]{6,}$/.test(phone.trim()))
      e.phone = 'Please enter a valid phone number'
    if (fulfillment === 'Delivery' && !location.trim())
      e.location = 'Delivery location is required for delivery'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    const url = buildOrderWhatsAppUrl({
      product,
      fulfillment,
      location,
      name,
      phone,
    })
    setOrderUrl(url)
    // Open WhatsApp in a new tab with the pre-filled message.
    window.open(url, '_blank', 'noopener,noreferrer')
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 600)
  }

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition focus:ring-2 focus:ring-gold-500/40 ${
      errors[field]
        ? 'border-rose-400 focus:border-rose-400'
        : 'border-cream-200 focus:border-gold-500'
    }`

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start gap-3 border-b border-cream-200 bg-ink p-5 text-cream">
              <img
                src={product.image}
                alt={product.title}
                className="h-16 w-16 shrink-0 rounded-xl object-cover ring-1 ring-gold-500/40"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.18em] text-gold-400">
                  Place your order
                </p>
                <h2 className="font-display text-base font-semibold leading-tight text-cream line-clamp-2">
                  {product.title}
                </h2>
                <p className="mt-0.5 font-display text-lg font-bold text-gold-400">
                  {formatKES(product.price)}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1.5 text-cream/70 transition hover:bg-cream/10 hover:text-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {sent ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-9 w-9" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                    Order ready on WhatsApp!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-ink/60">
                    We've prepared your message with all the order details. Your
                    WhatsApp chat with {BRAND.name} should have opened — just
                    press send to confirm your order.
                  </p>
                  <a
                    href={orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Open WhatsApp again
                  </a>
                  <button
                    onClick={onClose}
                    className="mt-3 text-sm font-medium text-ink/50 underline underline-offset-4 transition hover:text-ink"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Fulfillment type */}
                  <div>
                    <p className="mb-2 text-sm font-semibold text-ink">
                      Fulfillment Type
                    </p>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setFulfillment('Delivery')}
                        className={`flex items-start gap-2.5 rounded-xl border p-3 text-left transition ${
                          fulfillment === 'Delivery'
                            ? 'border-gold-500 bg-gold-500/10 ring-1 ring-gold-500/40'
                            : 'border-cream-200 bg-white hover:border-gold-400'
                        }`}
                      >
                        <Truck
                          className={`mt-0.5 h-5 w-5 shrink-0 ${
                            fulfillment === 'Delivery'
                              ? 'text-gold-600'
                              : 'text-ink/40'
                          }`}
                        />
                        <span>
                          <span className="block text-sm font-semibold text-ink">
                            Delivery
                          </span>
                          <span className="block text-xs text-ink/55">
                            Free within Nairobi
                          </span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFulfillment('Shop Pick Up')}
                        className={`flex items-start gap-2.5 rounded-xl border p-3 text-left transition ${
                          fulfillment === 'Shop Pick Up'
                            ? 'border-gold-500 bg-gold-500/10 ring-1 ring-gold-500/40'
                            : 'border-cream-200 bg-white hover:border-gold-400'
                        }`}
                      >
                        <Store
                          className={`mt-0.5 h-5 w-5 shrink-0 ${
                            fulfillment === 'Shop Pick Up'
                              ? 'text-gold-600'
                              : 'text-ink/40'
                          }`}
                        />
                        <span>
                          <span className="block text-sm font-semibold text-ink">
                            Shop Pick Up
                          </span>
                          <span className="block text-xs text-ink/55">
                            {BRAND.location}
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Customer details */}
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Amina Otieno"
                        className={`${inputClass('name')} pl-10`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0712 345 678"
                        className={`${inputClass('phone')} pl-10`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>
                    )}
                  </div>

                  <div
                    className={
                      fulfillment === 'Delivery'
                        ? 'transition-opacity duration-200'
                        : 'pointer-events-none opacity-40'
                    }
                  >
                    <label className="mb-1.5 block text-sm font-semibold text-ink">
                      Delivery Location
                      {fulfillment === 'Delivery' && (
                        <span className="text-rose-500"> *</span>
                      )}
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        disabled={fulfillment !== 'Delivery'}
                        placeholder={
                          fulfillment === 'Delivery'
                            ? 'Estate, street / building, Nairobi'
                            : 'Kamkunji Pick Up'
                        }
                        className={`${inputClass('location')} pl-10 disabled:cursor-not-allowed`}
                      />
                    </div>
                    {errors.location && (
                      <p className="mt-1 text-xs text-rose-500">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Preparing order…
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-5 w-5" />
                        Send Order via WhatsApp
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-ink/45">
                    Your order details open in WhatsApp — no account or payment
                    needed online. Pay on Delivery is available within Nairobi.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
