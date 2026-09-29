import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { RouteMeta } from '@/components/layout/RouteMeta'
import { ConsentBanner } from '@/components/layout/ConsentBanner'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <RouteMeta />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ConsentBanner />
    </div>
  )
}
