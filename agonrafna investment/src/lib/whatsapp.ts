import type { Product, FulfillmentType } from '../types'
import { BRAND } from './brand'

interface OrderDetails {
  product: Product
  fulfillment: FulfillmentType
  location: string
  name: string
  phone: string
}

/**
 * Builds the standard WhatsApp click-to-chat URL with the exact pre-filled
 * order message required by Rafna Investment.
 */
export function buildOrderWhatsAppUrl(details: OrderDetails): string {
  const { product, fulfillment, location, name, phone } = details
  const fulfillmentLabel = fulfillment === 'Delivery' ? 'Delivery' : 'Shop Pick Up'
  const locationLabel =
    fulfillment === 'Delivery'
      ? location.trim() || 'N/A'
      : 'Kamkunji Pick Up'
  const price = `KES ${product.price.toLocaleString('en-KE')}`

  const message =
    `Hello Rafna Investment, I would like to order:\n` +
    `- Product: ${product.title}\n` +
    `- Price: ${price}\n` +
    `- Fulfillment: ${fulfillmentLabel}\n` +
    `- Location: ${locationLabel}\n` +
    `- Name: ${name}\n` +
    `- Phone: ${phone}`

  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** General inquiry WhatsApp link. */
export function generalWhatsAppUrl(message?: string): string {
  const text =
    message ??
    'Hello Rafna Investment, I would like to inquire about your mattresses, beddings and household products.'
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`
}
