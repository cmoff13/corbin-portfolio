import type { Metadata } from 'next'
import './globals.css'
import SegmentSwitcher from '@/components/SegmentSwitcher'
import SiteFooter from '@/components/SiteFooter'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import CustomCursor from '@/components/CustomCursor'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Corbin Moffitt — Designer',
  description: 'Seven years across brand identity, web, and UX. Based in Hawaii.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Corbin Moffitt — Designer',
    description: 'Seven years across brand identity, web, and UX. Based in Hawaii.',
    url: 'https://www.cmoffitt.com',
    siteName: 'Corbin Moffitt',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corbin Moffitt — Designer',
    description: 'Seven years across brand identity, web, and UX. Based in Hawaii.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" style={{ cursor: 'none' }}>
      <body>
        <div style={{ cursor: 'none', minHeight: '100vh' }}>
          <GoogleAnalytics />
          <Analytics />
          <CustomCursor />
          <SegmentSwitcher />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}