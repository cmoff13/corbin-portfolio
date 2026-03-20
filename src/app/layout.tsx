'use client'

import { Geist } from 'next/font/google'
import { usePathname } from 'next/navigation'
import SegmentSwitcher from '@/components/SegmentSwitcher'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

function Nav() {
  const pathname = usePathname()
  if (pathname === '/') return null
  return (
    <nav className="nav">
      <a href="/" className="nav-logo">Corbin Moffitt</a>
      <SegmentSwitcher />
    </nav>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className={geist.className} style={{ backgroundColor: '#ffffff', color: '#1a1a1a' }}>
        <Nav />
        {children}
      </body>
    </html>
  )
}