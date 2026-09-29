import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '../types'
import { formatKES } from '../lib/format'
import OrderModal from './OrderModal'

const categoryDot: Record<string, string> = {
  'Orthopaedic Mattresses': 'bg-sky-500',
  Beddings: 'bg-rose-400',
  Households: 'bg-emerald-500',
}

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
        <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-medium text-cream backdrop-blur">
            <span className={`h-1.5 w-1.5 rounded-full ${categoryDot[product.category] ?? 'bg-gold-400'}`} />
            {product.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink">
            {product.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
            {product.description}
          </p>

          <div className="mt-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-ink/40">Price</p>
              <p className="font-display text-xl font-bold text-gold-600">
                {formatKES(product.price)}
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-4 py-3 text-sm font-semibold text-ink shadow-sm transition hover:bg-gold-400 hover:shadow-md hover:shadow-gold-500/30 active:scale-[0.98]"
          >
            <ShoppingBag className="h-4 w-4" />
            Order Now
          </button>
        </div>
      </article>

      <OrderModal product={product} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
