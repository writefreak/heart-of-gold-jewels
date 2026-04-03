import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServicesSection from '@/components/ServicesSection'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

const process = [
  { step: '01', title: 'Contact Us', desc: 'Reach out via our order form or WhatsApp to discuss your requirements.' },
  { step: '02', title: 'Design & Quote', desc: 'We discuss design options, materials, and provide a transparent quote.' },
  { step: '03', title: 'Crafting', desc: 'Our artisans begin crafting your piece with care and precision.' },
  { step: '04', title: 'Delivery', desc: 'Your finished jewelry is delivered safely to your nearest bus stop or address.' },
]

const guarantees = [
  'Authenticity certificate on all gold pieces',
  '30-day repair warranty',
  'Secure packaging for every order',
  'Confidential customer information',
  'No hidden charges or fees',
  'Satisfaction guarantee',
]

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-950 to-purple-800 py-16 px-4 text-center">
          <span className="section-tag text-amber-400">What We Do</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">
            Our <span className="gold-shimmer">Services</span>
          </h1>
          <p className="font-body text-lg text-purple-200 mt-3 max-w-xl mx-auto">
            Beyond selling beautiful jewelry, we offer a full suite of services to make your experience exceptional.
          </p>
        </div>

        <ServicesSection />

        {/* Process */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="section-tag">How It Works</span>
              <h2 className="font-display text-4xl font-bold text-purple-950 mt-2">
                Our <span className="gold-shimmer">Process</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {process.map((p, i) => (
                <div key={i} className="relative text-center">
                  {/* Connector */}
                  {i < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-300 to-amber-300" />
                  )}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-200">
                      <span className="font-display text-xl font-bold text-amber-400">{p.step}</span>
                    </div>
                    <h3 className="font-display text-lg font-600 text-purple-950 mb-2">{p.title}</h3>
                    <p className="font-body text-sm text-gray-500">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-16 bg-purple-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="section-tag">Our Commitment</span>
              <h2 className="font-display text-3xl font-bold text-purple-950 mt-2">
                Our <span className="gold-shimmer">Guarantees</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guarantees.map((g, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="font-sans text-sm text-gray-700">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white text-center">
          <h2 className="font-display text-3xl font-bold text-purple-950 mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-body text-gray-500 mb-6">Place your order today and experience the Heart of Gold difference.</p>
          <Link href="/order" className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans text-sm font-600">
            Place an Order <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  )
}
