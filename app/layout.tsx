import LoginModal from '@/components/modals/login-modal'
import RegisterModal from '@/components/modals/register-modal'
import RentModal from '@/components/modals/rent-modal'
import Navbar from '@/components/navbar/navbar'
import { ToasterProvider } from '@/providers/toaster-provider'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import getCurrentUser from '@/actions/get-current-user'
import ClientOnly from '@/components/client-only'
import SearchModal from '@/components/modals/search-modal'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb-Clone',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
