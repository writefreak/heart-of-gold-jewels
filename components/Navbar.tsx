'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Crown, ShoppingBag } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Collections' },
    { href: '/services', label: 'Services' },
    { href: '/order', label: 'Order Now' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center shadow-md group-hover:shadow-purple-300 transition-shadow">
              <Crown className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-purple-900 leading-none block">Heart of Gold</span>
              <span className="font-sans text-[10px] tracking-[0.25em] text-amber-600 uppercase font-medium">Jewels</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-500 text-gray-700 hover:text-purple-700 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-700 to-amber-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link href="/order" className="hidden md:flex items-center gap-2 btn-gold px-5 py-2.5 rounded-full text-sm">
              <ShoppingBag className="w-4 h-4" />
              Place Order
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-purple-800 hover:bg-purple-50"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-purple-100 px-4 py-6 flex flex-col gap-4 shadow-lg">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-sans text-base text-gray-700 hover:text-purple-700 transition-colors py-1 border-b border-gray-50"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/order" onClick={() => setOpen(false)} className="btn-gold px-5 py-3 rounded-full text-sm text-center mt-2">
            Place Order
          </Link>
        </div>
      )}
    </nav>
  )
}
