const WHATSAPP_NUMBER = '919311088577'
const DEFAULT_MESSAGE = 'Hi! I’d like to know more about Relationship Guide.'

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 hover:scale-105 sm:right-6 lg:bottom-6"
    >
      <WhatsAppIcon />
      <span className="sr-only">Chat with us on WhatsApp</span>
    </a>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C9.377 3 4 8.373 4 14.996c0 2.19.588 4.32 1.703 6.187L3.86 29l7.98-2.09a12.96 12.96 0 0 0 4.163.687h.001c6.627 0 12.004-5.373 12.004-11.996C28.008 8.373 22.63 3 16.004 3Zm0 21.6h-.001a10.55 10.55 0 0 1-5.37-1.472l-.386-.229-4.735 1.24 1.264-4.615-.251-.474a10.573 10.573 0 0 1-1.617-5.653c0-5.847 4.756-10.6 10.6-10.6 2.831 0 5.492 1.104 7.494 3.108a10.525 10.525 0 0 1 3.101 7.5c0 5.847-4.757 10.6-10.599 10.6Zm5.804-7.936c-.318-.159-1.884-.929-2.176-1.035-.292-.106-.505-.159-.718.16-.213.318-.823 1.034-1.009 1.247-.186.212-.372.239-.69.08-.318-.16-1.343-.494-2.558-1.575-.945-.842-1.583-1.882-1.769-2.2-.186-.318-.02-.49.14-.649.144-.143.318-.372.478-.558.16-.186.212-.318.318-.531.106-.212.053-.398-.026-.557-.08-.16-.718-1.727-.984-2.365-.259-.622-.522-.538-.718-.548-.186-.009-.398-.011-.611-.011-.213 0-.558.08-.85.398-.292.318-1.114 1.089-1.114 2.656 0 1.566 1.14 3.08 1.3 3.293.16.212 2.245 3.428 5.44 4.807.76.328 1.354.524 1.816.671.763.243 1.457.209 2.006.127.612-.091 1.884-.771 2.15-1.514.266-.744.266-1.381.186-1.514-.08-.133-.292-.212-.61-.371Z" />
    </svg>
  )
}
