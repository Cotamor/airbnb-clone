import Navbar from '@/components/navbar/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Modal from '@/components/modals/modal'
import RegisterModal from '@/components/modals/register-modal'
import { ToastProvider } from '@/providers/toast-provider'
import LoginModal from '@/components/modals/login-modal'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edabnb',
  description: 'Airbnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const onClose = ()=> {
    console.log('close')
  }
  const onSubmit = ()=> {
    console.log('submit')
  }
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {children}
        </body>
    </html>
  )
}
