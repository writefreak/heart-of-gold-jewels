import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import InfoSwiper from '@/components/InfoSwiper'
import ServicesSection from '@/components/ServicesSection'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Why Choose Us strip */}
      <div className="md:pt-0 pt-14">
         <section className="py-10 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { label: '✦ 100% Authentic Gold', },
              { label: '✦ Free Consultation', },
              { label: '✦ Custom Orders Welcome', },
              { label: '✦ Fast Delivery', },
            ].map((item, i) => (
              <span key={i} className="font-sans text-sm font-500 text-amber-300 tracking-wide">
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>
     </div>

      <FeaturedProducts />
      <InfoSwiper />
      <ServicesSection />

      {/* CTA Banner */}
      <section className="md:py-18 py-9 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/30 rounded-full translate-y-12 -translate-x-12" />
            <div className="relative">
              <div className="text-5xl mb-4">✨</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Find Your<br />
                <span className="gold-shimmer">Perfect Piece?</span>
              </h2>
              <p className="font-body text-lg text-purple-200 mb-8 max-w-md mx-auto">
                Place a custom order today or browse our collection to find something that speaks to your heart.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/order" className="btn-gold flex items-center gap-2 px-8 py-3.5 rounded-full font-sans text-sm font-600">
                  Place an Order
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/products" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full font-sans text-sm font-600 transition-all">
                  Browse Collection
                  <Sparkles className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
