'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, ShoppingBag, User, Phone, MapPin, Palette, Hash } from 'lucide-react'

const colorOptions = ['Gold', 'Rose Gold', 'White Gold', 'Silver', 'Yellow Gold', 'Mixed']
const jewelryTypes = ['Ring', 'Necklace', 'Bracelet', 'Earrings', 'Anklet', 'Brooch', 'Custom']

export default function OrderPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    jewelryType: '',
    quantity: '1',
    colors: [] as string[],
    busStop: '',
    notes: '',
  })

  const toggleColor = (c: string) => {
    setForm(prev => ({
      ...prev,
      colors: prev.colors.includes(c) ? prev.colors.filter(x => x !== c) : [...prev.colors, c],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white pt-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-200">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-3xl font-bold text-purple-950 mb-3">Order Received!</h2>
            <p className="font-body text-gray-500 mb-6">
              Thank you, <strong className="text-purple-800">{form.fullName}</strong>! We've received your order and will contact you on <strong className="text-purple-800">{form.phone}</strong> shortly.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-left">
              <h4 className="font-sans font-600 text-amber-800 text-sm mb-3">Order Summary</h4>
              <div className="space-y-1 text-sm font-sans">
                <div className="flex justify-between"><span className="text-gray-500">Type:</span> <span className="text-gray-800">{form.jewelryType}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Quantity:</span> <span className="text-gray-800">{form.quantity}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Colors:</span> <span className="text-gray-800">{form.colors.join(', ') || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Nearest Bus Stop:</span> <span className="text-gray-800">{form.busStop}</span></div>
              </div>
            </div>
            <button
              onClick={() => { setSubmitted(false); setForm({ fullName: '', phone: '', jewelryType: '', quantity: '1', colors: [], busStop: '', notes: '' }) }}
              className="btn-purple px-8 py-3 rounded-full font-sans text-sm text-white"
            >
              Place Another Order
            </button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <div className="pt-20 min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-950 to-purple-800 py-16 px-4 text-center">
          <span className="section-tag text-amber-400">Custom Orders</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">
            Place Your <span className="gold-shimmer">Order</span>
          </h1>
          <p className="font-body text-lg text-purple-200 mt-3 max-w-lg mx-auto">
            Fill in the details below and we'll craft your perfect piece and deliver it to you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <form onSubmit={handleSubmit} className="bg-white border border-purple-100 rounded-3xl shadow-xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="font-display text-2xl font-bold text-purple-950">Order Form</h2>
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="form-label flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Adaeze Okafor"
                  className="form-input"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="form-label flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="e.g. 0812 345 6789"
                  className="form-input"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              {/* Jewelry Type */}
              <div>
                <label className="form-label flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                  Type of Jewelry *
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {jewelryTypes.map(type => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setForm({ ...form, jewelryType: type })}
                      className={`px-4 py-2 rounded-full text-sm font-sans font-500 border transition-all ${
                        form.jewelryType === type
                          ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="form-label flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5 text-amber-500" />
                  Number of Orders *
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  max="100"
                  placeholder="1"
                  className="form-input"
                  value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })}
                />
              </div>

              {/* Colors */}
              <div>
                <label className="form-label flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 text-amber-500" />
                  Preferred Colors (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {colorOptions.map(c => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => toggleColor(c)}
                      className={`px-4 py-2 rounded-full text-sm font-sans font-500 border transition-all ${
                        form.colors.includes(c)
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bus Stop */}
              <div>
                <label className="form-label flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  Nearest Bus Stop / Delivery Location *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rumuola Bus Stop, Port Harcourt"
                  className="form-input"
                  value={form.busStop}
                  onChange={e => setForm({ ...form, busStop: e.target.value })}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="form-label">Additional Notes / Special Requests</label>
                <textarea
                  rows={4}
                  placeholder="Any special design instructions, size requirements, or custom messages..."
                  className="form-input resize-none"
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-gold w-full py-4 rounded-2xl font-sans font-600 text-base flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Submit Order
              </button>

              <p className="text-center font-sans text-xs text-gray-400">
                We will contact you within 24 hours to confirm your order and discuss pricing.
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  )
}
