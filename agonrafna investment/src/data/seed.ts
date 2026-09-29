import type { Product } from '../types'

/**
 * Initial demo catalog. Mirrors the Supabase `products` table shape so that
 * switching from local fallback to live Supabase is seamless.
 */export const seedProducts: Product[] = [
  {
    id: 'seed-mattress-1',
    title: 'Orthopaedic Spring Mattress — Double',
    category: 'Orthopaedic Mattresses',
    price: 18500,
    description:
      'Premium bonnell spring core wrapped in high-density foam comfort layers. Engineered for proper spinal alignment and pressure-point relief so you wake up refreshed. Available in all standard sizes.',
    image: '/images/mattress-spring.jpg',
    created_at: '2025-01-10T08:00:00.000Z',
  },
  {
    id: 'seed-mattress-2',
    title: 'Memory Foam Comfort Mattress',
    category: 'Orthopaedic Mattresses',
    price: 22900,
    description:
      'Body-contouring memory foam that adapts to your shape, cuts motion transfer and eases back pain. Medium-firm orthopaedic feel beneath a breathable, quilted cover.',
    image: '/images/mattress-foam.jpg',
    created_at: '2025-01-11T08:00:00.000Z',
  },
  {
    id: 'seed-mattress-3',
    title: 'Orthopaedic Firm Mattress (Roll-Packed)',
    category: 'Orthopaedic Mattresses',
    price: 25400,
    description:
      'Vacuum roll-packed firm orthopaedic mattress with high-resilience foam and reinforced edge support. Ideal for back-sleepers who want maximum lumbar support. Effortless transport and setup.',
    image: '/images/mattress-rolled.jpg',
    created_at: '2025-01-12T08:00:00.000Z',
  },
  {
    id: 'seed-mattress-4',
    title: 'Luxury Pillow-Top Mattress',
    category: 'Orthopaedic Mattresses',
    price: 32900,
    description:
      'Plush pillow-top combining pocket springs and latex for a cloud-soft yet supportive surface. Hotel-grade luxury, finished with a premium knit fabric.',
    image: '/images/hero-bedroom.jpg',
    created_at: '2025-01-13T08:00:00.000Z',
  },
  {
    id: 'seed-bedding-1',
    title: 'Premium Cotton Bedsheet Set',
    category: 'Beddings',
    price: 3500,
    description:
      '100% combed cotton bedsheet set with a soft, breathable finish. Includes a flat sheet, fitted sheet and two pillowcases. Easy-care and built to last.',
    image: '/images/bedding-sheets.jpg',
    created_at: '2025-01-14T08:00:00.000Z',
  },
  {
    id: 'seed-bedding-2',
    title: 'Luxury Duvet Cover Set',
    category: 'Beddings',
    price: 6500,
    description:
      'Elegant duvet cover set with hidden zipper closure and inner corner ties. Wrinkle- and fade-resistant microfiber weave, complete with matching pillow shams.',
    image: '/images/bedding-duvet.jpg',
    created_at: '2025-01-15T08:00:00.000Z',
  },
  {
    id: 'seed-bedding-3',
    title: 'Memory Comfort Pillows (Pair)',
    category: 'Beddings',
    price: 2800,
    description:
      'Set of two memory-foam pillows with cooling knit covers. Contours to the neck and shoulders for orthopaedic comfort. Hypoallergenic and machine washable.',
    image: '/images/bedding-pillows.jpg',
    created_at: '2025-01-16T08:00:00.000Z',
  },
  {
    id: 'seed-bedding-4',
    title: 'All-Season Quilted Comforter',
    category: 'Beddings',
    price: 4900,
    description:
      'All-season quilted comforter with hypoallergenic fill and box-stitch construction that prevents shifting. Lightweight warmth under a silky-soft shell.',
    image: '/images/bedding-comforter.jpg',
    created_at: '2025-01-17T08:00:00.000Z',
  },
  {
    id: 'seed-house-1',
    title: 'Plush Bath Towel Set (6 pcs)',
    category: 'Households',
    price: 2500,
    description:
      'Six-piece plush bath towel set woven from ultra-absorbent cotton. Thick, soft and quick-drying — generous sizing for the whole family.',
    image: '/images/household-towels.jpg',
    created_at: '2025-01-18T08:00:00.000Z',
  },
  {
    id: 'seed-house-2',
    title: 'Cozy Fleece Blanket',
    category: 'Households',
    price: 3200,
    description:
      'Ultra-soft fleece blanket that traps warmth without the weight. Anti-pill finish with neatly bound edges — perfect for cool Nairobi evenings.',
    image: '/images/household-blanket.jpg',
    created_at: '2025-01-19T08:00:00.000Z',
  },
  {
    id: 'seed-house-3',
    title: 'Elegant Blackout Curtains (Pair)',
    category: 'Households',
    price: 4500,
    description:
      'Blackout window curtain pair with a weighted hem and an elegant drape. Blocks light and dampens noise for deeper sleep. Easy to hang on any rod.',
    image: '/images/household-curtains.jpg',
    created_at: '2025-01-20T08:00:00.000Z',
  },
  {
    id: 'seed-house-4',
    title: 'Decorative Bed Throw',
    category: 'Households',
    price: 2000,
    description:
      'Quilted decorative bed throw that adds texture and warmth to any bedroom. Reversible design with a premium hand-feel and reinforced stitching.',
    image: '/images/household-throw.jpg',
    created_at: '2025-01-21T08:00:00.000Z',
  },
]
