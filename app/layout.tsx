import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Heart of Gold Jewels | Luxury Jewelry',
  description: 'Exquisite handcrafted jewelry for every occasion. Rings, necklaces, bracelets and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
