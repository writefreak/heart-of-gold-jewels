import Link from 'next/link'
import { Sparkles, Gem, Wrench, Truck, Heart, Star } from 'lucide-react'

const services = [
  {
    icon: Gem,
    title: 'Custom Jewelry Design',
    desc: 'Work with our artisans to bring your dream piece to life — from sketch to stunning reality.',
   
    color: 'from-purple-700 to-purple-800',
  },
  
  {
    icon: Sparkles,
    title: 'Resizing & Engraving',
    desc: 'Perfect fit guaranteed. We resize rings and engrave personal messages on any piece.',
  
    color: 'from-amber-600 to-amber-700',
  },
  {
    icon: Star,
    title: 'Bulk / Corporate Orders',
    desc: 'Special pricing for events, gifting campaigns, and corporate jewelry orders of 10+ pieces.',
   
    color: 'from-purple-800 to-purple-900',
  },
  {
    icon: Truck,
    title: 'Delivery Anywhere',
    desc: 'Safe, insured delivery to your nearest bus stop or home across Nigeria.',
    
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="card-hover group bg-white border border-purple-50 rounded-2xl p-6 shadow-sm">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

              
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
