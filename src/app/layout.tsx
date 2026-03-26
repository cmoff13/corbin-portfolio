import type { Metadata } from 'next'
import './globals.css'
import SegmentSwitcher from '@/components/SegmentSwitcher'

export const metadata: Metadata = {
  title: 'Corbin Moffitt — Designer',
  description: 'Brand, web, and product design — case studies and selected work.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <SegmentSwitcher />
        {children}
      </body>
    </html>
  )
}