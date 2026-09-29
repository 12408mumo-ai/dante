import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  MessageCircle,
  Truck,
  Banknote,
  MapPin,
  ShieldCheck,
  BedDouble,
  Sparkles,
  Moon,
  Leaf,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { generalWhatsAppUrl } from '../lib/whatsapp'
import { BRAND } from '../lib/brand'
import ProductCard from '../components/ProductCard'

const categories = [
  {
    name: 'Orthopaedic Mattresses',
    blurb: 'Foam, fiber & spring support for healthy sleep posture.',
    image: '/images/mattress-foam.jpg',
    dot: 'bg-sky-500',
  },
  {
    name: 'Beddings',
    blurb: 'Sheets, duvets, pillows & comforters in premium fabrics.',
    image: '/images/bedding-set.jpg',
    dot: 'bg-rose-400',
  },
  {
    name: 'Households',
    blurb: 'Towels, blankets, curtains & throws for every home.',
    image: '/images/household-towels.jpg',
    dot: 'bg-emerald-500',
  },
]

const trust = [
  { icon: Truck, title: 'Free Nairobi Delivery', text: 'Within Nairobi & surroundings' },
  { icon: Banknote, title: 'Pay on Delivery', text: 'Available within Nairobi & surroundings' },
  { icon: MapPin, title: 'Country-wide Shipping', text: 'At affordable prices' },
  { icon: ShieldCheck, title: 'Quality Guaranteed', text: 'Built to last, sleep after sleep' },
]

const features = [
  { icon: Moon, title: 'Orthopaedic Support', text: 'Foam, fiber and spring cores engineered for proper spinal alignment.' },
  { icon: Sparkles, title: 'Premium Materials', text: 'High-density foam, combed cotton and durable, easy-care fabrics.' },
  { icon: Truck, title: 'Free Nairobi Delivery', text: 'We bring your order to your door within Nairobi & surroundings.' },
  { icon: Banknote, title: 'Pay on Delivery', text: 'Inspect and pay on delivery — no risky online prepayment.' },
  { icon: Leaf, title: 'Hypoallergenic Options', text: 'Breathable, skin-friendly fills and covers for sensitive sleepers.' },
  { icon: MessageCircle, title: 'WhatsApp Ordering', text: 'Order in seconds via WhatsApp and get a quick response.' },
]

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  const { products, loading } = useStore()
  const featured = products.slice(0, 8)

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/hero-bedroom.jpg"
            alt="Luxury bedroom with a premium Rafna Investment mattress"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-36">
          <motion.div
            className="max-w-2xl text-cream"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.span
              variants={fade}
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-300"
            >
              <MapPin className="h-3.5 w-3.5" />
              {BRAND.location}
            </motion.span>

            <motion.h1
              variants={fade}
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Sleep in Comfort.
              <span className="block text-gold-400">Wake Up to Quality.</span>
            </motion.h1>

            <motion.p
              variants={fade}
              className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg"
            >
              Premium foam, fiber &amp; spring orthopaedic mattresses, bedding and
              household essentials — crafted for restful nights and lasting
              value, delivered across Kenya.
            </motion.p>

            <motion.div variants={fade} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-gold-500/30 transition hover:bg-gold-400 hover:scale-[1.02]"
              >
                Shop Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={generalWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-cream/30 bg-cream/5 px-6 py-3.5 text-sm font-semibold text-cream backdrop-blur transition hover:bg-cream/15"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </motion.div>

            <motion.div
              variants={fade}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-cream/60"
            >
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-gold-400" />
                {BRAND.policies.nairobiDelivery}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Banknote className="h-3.5 w-3.5 text-gold-400" />
                {BRAND.policies.payOnDelivery}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-b border-cream-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="flex items-center gap-3 px-5 py-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600">
                <t.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{t.title}</p>
                <p className="text-xs text-ink/55">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.span
            variants={fade}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600"
          >
            What we offer
          </motion.span>
          <motion.h2
            variants={fade}
            className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl"
          >
            Comfort for every corner of your home
          </motion.h2>
          <motion.p variants={fade} className="mt-3 text-ink/60">
            From orthopaedic mattresses to fresh beddings and household
            essentials — explore our curated collections.
          </motion.p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fade}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to="/shop"
                className="group relative block overflow-hidden rounded-2xl shadow-sm transition hover:shadow-xl hover:shadow-ink/10"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <span className="inline-flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                    <span className="text-xs uppercase tracking-wider text-gold-300">
                      Collection
                    </span>
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-cream/70">{c.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold-300 transition group-hover:gap-2.5">
                    Browse <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-cream-100/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
                Best sellers
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
                Featured products
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-gold-500 hover:text-gold-600"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] animate-pulse rounded-2xl bg-cream-200"
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-ink-700"
            >
              Explore the full shop
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fade}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl shadow-xl shadow-ink/10">
              <img
                src="/images/about-craft.jpg"
                alt="A beautifully made bed showcasing Rafna Investment quality"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl bg-ink p-5 text-cream shadow-lg sm:block">
              <p className="font-display text-3xl font-bold text-gold-400">100%</p>
              <p className="text-xs text-cream/70">Quality you can feel</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fade}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
              About {BRAND.name}
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
              Built on comfort, trust &amp; value
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              {BRAND.name} is a Kamkunji, Nairobi-based home of quality foam,
              fiber and spring orthopaedic mattresses, beddings and household
              goods. We believe a great day starts with a great night's sleep —
              so we combine durable materials, honest pricing and personal
              service on every order.
            </p>
            <p className="mt-3 leading-relaxed text-ink/70">
              Whether you need a firm orthopaedic mattress, fresh sheets or
              household essentials, our team is ready to help you choose — and
              we deliver free within Nairobi &amp; surroundings, with affordable
              country-wide shipping and pay-on-delivery options.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-cream-200 bg-white p-4">
                <BedDouble className="h-6 w-6 text-gold-500" />
                <p className="mt-2 font-display text-lg font-bold text-ink">
                  Orthopaedic-first
                </p>
                <p className="text-xs text-ink/55">Foam, fiber &amp; spring support</p>
              </div>
              <div className="rounded-2xl border border-cream-200 bg-white p-4">
                <Truck className="h-6 w-6 text-gold-500" />
                <p className="mt-2 font-display text-lg font-bold text-ink">
                  Free Nairobi delivery
                </p>
                <p className="text-xs text-ink/55">&amp; affordable country-wide</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-ink py-16 text-cream sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              Why choose us
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              The Rafna difference
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fade}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-cream/10 bg-cream/5 p-6 transition hover:border-gold-500/40 hover:bg-cream/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/30">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/65">
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-ink-700 px-6 py-14 text-center text-cream sm:px-12">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-gold-500/10 blur-3xl" />
          <h2 className="relative font-display text-3xl font-bold sm:text-4xl">
            Ready for a better night's sleep?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-cream/70">
            Order in seconds via WhatsApp. Free delivery within Nairobi &amp;
            surroundings, with pay-on-delivery available.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-gold-400"
            >
              Shop now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={generalWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
