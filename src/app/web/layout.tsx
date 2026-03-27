import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web & Digital — Corbin Moffitt',
}

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
