import type { Metadata } from 'next'
import './globals.css'
import SegmentSwitcher from '@/components/SegmentSwitcher'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Corbin Moffitt — Designer',
  description: 'Seven years of design. Three ways to see it.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" style={{ cursor: 'none' }}>
      <body>
        <div style={{ cursor: 'none', minHeight: '100vh' }}>
          <GoogleAnalytics />
          <CustomCursor />
          <SegmentSwitcher />
          {children}
        </div>
      </body>
    </html>
  )
}