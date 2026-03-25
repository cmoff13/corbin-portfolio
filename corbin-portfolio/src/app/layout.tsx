import type { Metadata } from 'next'
import './globals.css'
import SegmentSwitcher from '@/components/SegmentSwitcher'

export const metadata: Metadata = {
  title: 'Corbin Moffitt — Designer',
  description: 'Seven years of design. Three ways to see it.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body style={{ backgroundColor: '#ffffff' }}>
        <SegmentSwitcher />
        {children}
      </body>
    </html>
  )
}