'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, ShoppingBag, User, Phone, MapPin, Palette, Hash, Loader2, Sparkles, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const colorOptions = ['Gold', 'Rose Gold', 'White Gold', 'Silver', 'Yellow Gold', 'Mixed']
const jewelryTypes = ['Ring', 'Necklace', 'Bracelet', 'Earrings', 'Anklet', 'Brooch', 'Custom']

const emptyForm = {
  fullName: '',
  phone: '',
  jewelryType: '',
  quantity: '1',
  colors: [] as string[],
  busStop: '',
  notes: '',
}

export default function OrderPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)

  const toggleColor = (c: string) => {
    setForm(prev => ({
      ...prev,
      colors: prev.colors.includes(c)
        ? prev.colors.filter(x => x !== c)
        : [...prev.colors, c],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.jewelryType) { setError('Please select a jewelry type.'); return }
    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase.from('orders').insert({
      customer_name: form.fullName,
      customer_phone: form.phone,
      number_of_items: parseInt(form.quantity),
      preferred_colors: form.colors,
      nearest_bus_stop: form.busStop,
      status: 'pending',
    })

    setLoading(false)
    if (insertError) { setError('Something went wrong. Please try again.'); return }
    setSubmitted(true)
  }

  // ── Success screen ──
  if (submitted) return (
  <main>
    <Navbar />

    <div className="min-h-screen bg-white flex items-center justify-center px-5 pt-24 pb-16">
      <div className="w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-purple-50 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-purple-800" strokeWidth={1.5} />
            </div>
            <span className="absolute -top-1 -right-1 text-lg">✨</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
            Order Confirmed
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            You're all set,<br />
            <span className="text-purple-900">{form.fullName.split(' ')[0]}.</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
            We'll reach out to{' '}
            <span className="text-gray-700 font-medium">{form.phone}</span>{' '}
            within 24 hours to confirm your order.
          </p>
        </div>

        {/* Summary */}
        <div className="border border-gray-100 rounded-2xl divide-y divide-gray-100 mb-8">
          {[
            { label: 'Jewelry Type', value: form.jewelryType },
            { label: 'Quantity',     value: form.quantity },
            { label: 'Colors',       value: form.colors.join(', ') || 'Not specified' },
            { label: 'Location',     value: form.busStop },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between px-5 py-4">
              <span className="text-gray-400 text-sm">{row.label}</span>
              <span className="text-gray-900 text-sm font-medium text-right max-w-[55%] truncate">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => { setSubmitted(false); setForm(emptyForm); }}
            className="w-full bg-purple-900 hover:bg-purple-800 active:bg-purple-950 text-white font-medium text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Place Another Order
          </button>

          <a
            href="/"
            className="w-full py-4 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2 transition-colors"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>

    <Footer />
  </main>
)

  // ── Order form ──
  return (
    <main>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">

        {/* Purple hero band */}
        <div className="bg-gradient-to-br from-purple-950 to-purple-800 py-16 px-4 text-center relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-purple-700/20 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-amber-500/10 translate-y-1/2 pointer-events-none" />

          <span className="section-tag text-amber-400 relative">Custom Orders</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 relative">
            Place Your <span className="gold-shimmer">Order</span>
          </h1>
          <p className="text-lg text-purple-200 mt-3 max-w-lg mx-auto relative">
            Fill in the details and we'll craft your perfect piece and deliver it to you.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* LEFT — sidebar info */}
            <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-28">

              {/* Why order card */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-display text-lg font-bold text-purple-950 mb-4">Why order with us?</h3>
                <div className="space-y-4">
                  {[
                    { icon: '💍', title: 'Handcrafted Quality', desc: 'Every piece is carefully made to order, just for you.' },
                    { icon: '🚚', title: 'Local Delivery', desc: 'We deliver directly to your nearest bus stop in Port Harcourt.' },
                    { icon: '💬', title: 'Personal Touch', desc: 'We call you to confirm every detail before crafting begins.' },
                    { icon: '✨', title: 'Premium Finish', desc: 'Gold, silver, and mixed metals — all at honest prices.' },
                  ].map(item => (
                    <div key={item.title} className="flex gap-3">
                      <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promise badge */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 rounded-3xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Our Promise</p>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                      We'll contact you within 24 hours. No hidden charges — pricing is discussed and agreed before any work begins.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 md:p-10">

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-purple-950">Order Details</h2>
                    <p className="text-xs text-gray-400">All fields marked * are required</p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name + Phone side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-500" /> Full Name *
                      </label>
                      <input required type="text" placeholder="e.g. Adaeze Okafor"
                        className="form-input" value={form.fullName}
                        onChange={e => setForm({ ...form, fullName: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-500" /> Phone Number *
                      </label>
                      <input required type="tel" placeholder="e.g. 0812 345 6789"
                        className="form-input" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>

                  {/* Jewelry type */}
                  <div>
                    <label className="form-label flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-500" /> Type of Jewelry *
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {jewelryTypes.map(type => (
                        <button type="button" key={type}
                          onClick={() => setForm({ ...form, jewelryType: type })}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            form.jewelryType === type
                              ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                          }`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="max-w-xs">
                    <label className="form-label flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-amber-500" /> Number of Items *
                    </label>
                    <input required type="number" min="1" max="100" placeholder="1"
                      className="form-input" value={form.quantity}
                      onChange={e => setForm({ ...form, quantity: e.target.value })} />
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="form-label flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-amber-500" /> Preferred Colors
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {colorOptions.map(c => (
                        <button type="button" key={c} onClick={() => toggleColor(c)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            form.colors.includes(c)
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                          }`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bus stop */}
                  <div>
                    <label className="form-label flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" /> Nearest Bus Stop / Delivery Location *
                    </label>
                    <input required type="text"
                      placeholder="e.g. Rumuola Bus Stop, Port Harcourt"
                      className="form-input" value={form.busStop}
                      onChange={e => setForm({ ...form, busStop: e.target.value })} />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="form-label">Additional Notes / Special Requests</label>
                    <textarea rows={4} placeholder="Any special design instructions, size requirements, or custom messages..."
                      className="form-input resize-none" value={form.notes}
                      onChange={e => setForm({ ...form, notes: e.target.value })} />
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    className="btn-gold w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading
                      ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                      : <><ShoppingBag className="w-5 h-5" /> Submit Order</>
                    }
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    We will contact you within 24 hours to confirm your order and discuss pricing.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}