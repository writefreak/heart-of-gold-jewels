import Link from 'next/link'
import { Sparkles, Gem, Wrench, Truck, Heart, Star } from 'lucide-react'

const services = [
  {
    icon: Gem,
    title: 'Custom Jewelry Design',
    desc: 'Work with our artisans to bring your dream piece to life — from sketch to stunning reality.',
    tag: 'Most Popular',
    color: 'from-purple-700 to-purple-800',
  },
  {
    icon: Heart,
    title: 'Bridal & Wedding Sets',
    desc: 'Complete bridal jewelry packages — rings, earrings, necklaces and bracelets for your big day.',
    tag: 'Special Offer',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Wrench,
    title: 'Jewelry Repair',
    desc: 'Restore your precious pieces to their former glory. We repair rings, chains, clasps and more.',
    tag: '',
    color: 'from-purple-600 to-purple-700',
  },
  {
    icon: Sparkles,
    title: 'Resizing & Engraving',
    desc: 'Perfect fit guaranteed. We resize rings and engrave personal messages on any piece.',
    tag: '',
    color: 'from-amber-600 to-amber-700',
  },
  {
    icon: Star,
    title: 'Bulk / Corporate Orders',
    desc: 'Special pricing for events, gifting campaigns, and corporate jewelry orders of 10+ pieces.',
    tag: 'B2B',
    color: 'from-purple-800 to-purple-900',
  },
  {
    icon: Truck,
    title: 'Delivery Anywhere',
    desc: 'Safe, insured delivery to your nearest bus stop or home across Nigeria.',
    tag: 'Free on large orders',
    color: 'from-amber-500 to-amber-600',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-tag">What We Offer</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-purple-950 mt-2">
            Our <span className="gold-shimmer">Services</span>
          </h2>
          <p className="font-body text-lg text-gray-500 mt-3 max-w-xl mx-auto">
            From custom creations to repairs, we provide end-to-end jewelry services with passion and care.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="card-hover group bg-white border border-purple-50 rounded-2xl p-6 shadow-sm">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Tag */}
                {s.tag && (
                  <span className="inline-block bg-amber-50 border border-amber-200 text-amber-700 text-xs font-sans font-500 px-2.5 py-0.5 rounded-full mb-3">
                    {s.tag}
                  </span>
                )}

                <h3 className="font-display text-xl font-600 text-purple-950 mb-2">{s.title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/order" className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans text-sm font-600">
            Get Started Today
            <Sparkles className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
