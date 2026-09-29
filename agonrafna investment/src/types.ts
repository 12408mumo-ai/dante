export type Category = 'Orthopaedic Mattresses' | 'Beddings' | 'Households'

export interface Product {
  id: string
  title: string
  category: Category
  price: number
  description: string
  image: string
  created_at?: string
}

export type FulfillmentType = 'Delivery' | 'Shop Pick Up'

export const CATEGORIES: Category[] = [
  'Orthopaedic Mattresses',
  'Beddings',
  'Households',
]
