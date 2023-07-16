import Navbar from '@/components/navbar/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Modal from '@/components/modals/modal'

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
        <Modal isOpen actionLabel='Test' title='Some title for modal' body={<p>Are you really want to do this?</p>} footer={<p>this is footer</p>} secondaryActionLabel='sub action'/>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
