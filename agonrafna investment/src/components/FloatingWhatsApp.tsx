import { MessageCircle } from 'lucide-react'
import { generalWhatsAppUrl } from '../lib/whatsapp'

export default function FloatingWhatsApp() {
  return (
    <a
      href={generalWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rafna Investment on WhatsApp"
      className="animate-wa-pulse fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition hover:scale-110 sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  )
}
