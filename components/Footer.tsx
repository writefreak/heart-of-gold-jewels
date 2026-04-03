import Link from 'next/link'
import { Crown, Phone, MapPin, Mail, Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-purple-950 text-white">
      {/* Gold divider */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white leading-none block">Heart of Gold</span>
                <span className="font-sans text-[10px] tracking-[0.25em] text-amber-400 uppercase font-medium">Jewels</span>
              </div>
            </div>
            <p className="font-body text-purple-200 text-sm leading-relaxed mt-3">
              Crafting timeless elegance for every moment that matters. Your trusted jewelry partner.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-purple-800 hover:bg-amber-500 transition-colors flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans font-600 text-amber-400 text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Collections', 'Services', 'Place Order', 'New Arrivals'].map(link => (
                <li key={link}>
                  <Link href={link === 'Collections' ? '/products' : link === 'Services' ? '/services' : link === 'Place Order' ? '/order' : '/'} className="font-sans text-sm text-purple-200 hover:text-amber-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans font-600 text-amber-400 text-sm uppercase tracking-widest mb-5">Collections</h4>
            <ul className="space-y-3">
              {['Engagement Rings', 'Wedding Bands', 'Necklaces & Pendants', 'Bracelets', 'Earrings', 'Custom Orders'].map(item => (
                <li key={item}>
                  <a href="/products" className="font-sans text-sm text-purple-200 hover:text-amber-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-600 text-amber-400 text-sm uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="font-sans text-sm text-purple-200">+234 800 123 4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="font-sans text-sm text-purple-200">hello@heartofgoldjewels.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="font-sans text-sm text-purple-200">Port Harcourt, Rivers State, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="gold-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-purple-400">
            © {new Date().getFullYear()} Heart of Gold Jewels. All rights reserved.
          </p>
          <p className="font-sans text-xs text-purple-400">
            Crafted with <span className="text-amber-400">♥</span> in Port Harcourt
          </p>
        </div>
      </div>
    </footer>
  )
}
