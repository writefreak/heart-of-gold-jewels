'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Star } from 'lucide-react'

const heroSlides = [
  {
    badge: 'New Collection 2024',
    headline: 'Where Love Meets',
    highlight: 'Eternal Gold',
    sub: 'Handcrafted jewelry that tells your story — from engagement rings to everyday elegance.',
    cta: 'Shop Collection',
    href: '/products',
    accent: 'Rings',
  },
  {
    badge: 'Custom Orders Open',
    headline: 'Designed Just',
    highlight: 'For You',
    sub: 'Place a custom order and we\'ll craft the perfect piece tailored to your exact vision.',
    cta: 'Order Now',
    href: '/order',
    accent: 'Custom',
  },
  {
    badge: 'Premium Quality',
    headline: 'Luxury You Can',
    highlight: 'Treasure Forever',
    sub: 'Every piece is crafted with precision, passion, and the finest materials for lasting beauty.',
    cta: 'Our Services',
    href: '/services',
    accent: 'Quality',
  },
]

const floatingItems = [
  { top: '15%', left: '6%', delay: '0s', label: '💍 Rings' },
  { top: '60%', left: '4%', delay: '1s', label: '📿 Chains' },
  { top: '20%', right: '5%', delay: '0.5s', label: '✨ Custom' },
  { top: '65%', right: '4%', delay: '1.5s', label: '💛 Bracelets' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % heroSlides.length)
        setAnimating(false)
      }, 300)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[current]

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20">
      {/* Decorative BG elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large circles */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-purple-50 opacity-60" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-amber-50 opacity-70" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #7e22ce 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Diagonal accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-purple-50/80 via-transparent to-transparent" />
        {/* Gold line accents */}
        <div className="absolute top-32 left-0 w-48 h-[1px] bg-gradient-to-r from-amber-400/60 to-transparent" />
        <div className="absolute bottom-32 right-0 w-48 h-[1px] bg-gradient-to-l from-amber-400/60 to-transparent" />
      </div>

      {/* Floating category tags */}
      {floatingItems.map((item, i) => (
        <div
          key={i}
          className="hidden xl:flex absolute items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-purple-100 shadow-md rounded-full px-3 py-1.5 text-xs font-sans font-500 text-purple-800"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            animation: `float 3s ease-in-out infinite`,
            animationDelay: item.delay,
          }}
        >
          {item.label}
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Text */}
          <div
            className="flex flex-col gap-6"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(20px)' : 'translateY(0)',
              transition: 'all 0.4s ease',
            }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 w-fit">
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-sans text-xs font-600 text-amber-700 tracking-wide">{slide.badge}</span>
              </div>
            </div>

            {/* Heading */}
            <div>
              <h1 className="font-display text-5xl lg:text-7xl font-bold text-purple-950 leading-[1.05]">
                {slide.headline}
                <br />
                <span className="gold-shimmer">{slide.highlight}</span>
              </h1>
            </div>

            {/* Sub */}
            <p className="font-body text-lg text-gray-600 leading-relaxed max-w-md">
              {slide.sub}
            </p>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-sans text-sm text-gray-500">Trusted by 500+ happy clients</span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link href={slide.href} className="btn-gold flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-600">
                {slide.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/order" className="btn-outline-gold flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-600">
                Place Custom Order
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
              {[
                { val: '500+', label: 'Happy Clients' },
                { val: '1200+', label: 'Pieces Sold' },
                { val: '5★', label: 'Avg Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-purple-800">{stat.val}</div>
                  <div className="font-sans text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual showcase */}
          <div className="relative flex items-center justify-center">
            {/* Main card */}
            <div className="relative w-full max-w-sm mx-auto">
              {/* Background card */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-gradient-to-br from-purple-100 to-purple-200" />
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl bg-gradient-to-br from-amber-100 to-amber-200" />

              {/* Main content card */}
              <div className="relative rounded-3xl bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 p-8 shadow-2xl overflow-hidden">
                {/* Decorative circles inside card */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full -translate-y-10 translate-x-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/30 rounded-full translate-y-8 -translate-x-8" />

                {/* Jewelry emoji showcase */}
                <div className="relative text-center">
                  <div className="text-8xl mb-4 animate-float inline-block">💍</div>
                  <div className="font-display text-2xl font-bold text-white mb-1">
                    {slide.accent} Collection
                  </div>
                  <div className="font-sans text-sm text-purple-200 mb-6">
                    Handcrafted with love
                  </div>

                  {/* Mini grid of emoji items */}
                  <div className="grid grid-cols-3 gap-3">
                    {['💍', '📿', '💎', '⭐', '✨', '🏅'].map((emoji, i) => (
                      <div
                        key={i}
                        className="bg-white/10 rounded-xl p-2.5 flex items-center justify-center text-xl backdrop-blur-sm"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>

                  {/* Price tag */}
                  <div className="mt-6 bg-amber-400 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2">
                    <span className="font-sans text-xs font-600 text-amber-900">Starting from</span>
                    <span className="font-display text-lg font-bold text-amber-900">₦1,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating review card */}
            <div className="md:flex hidden absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-purple-100 p-4 items-center gap-3 max-w-[200px]">
              <div className="text-3xl">💛</div>
              <div>
                <div className="font-sans text-xs font-600 text-purple-900">Latest Review</div>
                <div className="font-body text-xs text-gray-500 italic">"Absolutely stunning!"</div>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute -bottom-0 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2 bg-amber-500' : 'w-2 h-2 bg-purple-200 hover:bg-purple-400'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
