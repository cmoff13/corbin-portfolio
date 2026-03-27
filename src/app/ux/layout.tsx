import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UX & Product — Corbin Moffitt',
}

export default function UxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
