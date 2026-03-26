import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lane picker — Corbin Moffitt',
  description: 'Choose brand, web, or UX to tailor how you see the work.',
}

export default function GateLayout({ children }: { children: React.ReactNode }) {
  return children
}
