'use client'

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { usePathname } from 'next/navigation'
import SegmentSwitcher from '@/components/SegmentSwitcher'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

function Nav() {
  const pathname = usePathname()
  const isGate = pathname === '/'
  if (isGate) return null

  return (
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
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={geist.className} style={{ backgroundColor: '#ffffff', color: '#0f0f0f' }}>
        <Nav />
        {children}
      </body>
    </html>
  )
}