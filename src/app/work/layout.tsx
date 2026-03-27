import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Work — Corbin Moffitt',
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
