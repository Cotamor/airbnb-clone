import LoginModal from '@/components/modals/login-modal'
import RegisterModal from '@/components/modals/register-modal'
import Navbar from '@/components/navbar/navbar'
import { ToasterProvider } from '@/providers/toaster-provider'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import getCurrentUser from '@/actions/get-current-user'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edabnb',
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
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
        </body>
    </html>
  )
}
