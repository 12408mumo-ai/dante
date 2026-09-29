export const BRAND = {
  name: 'Rafna Investment',
  tagline: 'Quality Foam, Fiber & Spring Orthopaedic Mattresses, Beddings & Households',
  location: 'Kamkunji, Nairobi',
  phone: '+254719526649',
  whatsappNumber: '254719526649',
  email: 'rafnainvestment@gmail.com',
  // Client-side gate for the owner dashboard. For production-grade security,
  // rotate this and/or migrate authentication to Supabase Auth.
  adminPassword: 'Rafna2026!',
  policies: {
    nairobiDelivery: 'Free delivery within Nairobi & surroundings',
    nationwide: 'Country-wide delivery at affordable prices',
    payOnDelivery: 'Pay on Delivery available within Nairobi & surroundings',
  },
} as const
