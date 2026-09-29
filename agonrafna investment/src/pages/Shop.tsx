import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PackageSearch, Truck, Banknote, MapPin } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { CATEGORIES, type Category } from '../types'
import { BRAND } from '../lib/brand'
import ProductCard from '../components/ProductCard'

type Filter = 'All' | Category

export default function Shop() {
  const { products, loading, error } = useStore()
  const [filter, setFilter] = useState<Filter>('All')

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: products.length }
    for (const c of CATEGORIES) {
      map[c] = products.filter((p) => p.category === c).length
    }
    return map
  }, [products])

  const visible = useMemo(
    () =>
      filter === 'All' ? products : products.filter((p) => p.category === filter),
    [products, filter],
  )

  const tabs: Filter[] = ['All', ...CATEGORIES]

  return (
    <div>
      {/* Banner */}
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <div className="absolute inset-0 -z-10 opacity-25">
          <img
            src="/images/bedding-set.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {BRAND.name} Shop
          </span>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Our full collection
          </h1>
          <p className="mt-3 max-w-xl text-cream/70">
            Orthopaedic mattresses, premium beddings and household essentials —
            all just one WhatsApp message away.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream/65">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-gold-400" />
              {BRAND.policies.nairobiDelivery}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Banknote className="h-3.5 w-3.5 text-gold-400" />
              {BRAND.policies.payOnDelivery}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gold-400" />
              {BRAND.policies.nationwide}
            </span>
          </div>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === t
                  ? 'bg-ink text-cream shadow'
                  : 'border border-cream-200 bg-white text-ink/70 hover:border-gold-500 hover:text-ink'
              }`}
            >
              {t}
              <span
                className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] ${
                  filter === t
                    ? 'bg-gold-500 text-ink'
                    : 'bg-cream-200 text-ink/60'
                }`}
              >
                {counts[t] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {error ? (
          <div className="mt-10 rounded-2xl border border-rose-300 bg-rose-50 p-6 text-center text-rose-700">
            Couldn't load products: {error}
          </div>
        ) : loading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] animate-pulse rounded-2xl bg-cream-200"
              />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="mt-12 flex flex-col items-center text-center text-ink/50">
            <PackageSearch className="h-10 w-10" />
            <p className="mt-3 font-medium">No products in this category yet.</p>
            <p className="text-sm">Please check back soon.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visible.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  )
}
