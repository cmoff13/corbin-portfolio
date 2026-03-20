import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import SegmentSwitcher from '@/components/SegmentSwitcher'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Corbin Moffitt — Designer',
  description: 'Seven years across brand identity, web, and performance marketing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={geist.className}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 32px',
          borderBottom: '1px solid #f0f0f0',
        }}>
          <a href="/" style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#0f0f0f',
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}>
            Corbin Moffitt
          </a>
          <SegmentSwitcher />
        </nav>
        {children}
      </body>
    </html>
  )
}