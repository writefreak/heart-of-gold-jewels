'use client'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const slides = [
  {
    type: 'testimonial',
    quote: "Heart of Gold made my proposal unforgettable. The ring was crafted exactly to my vision — she cried happy tears!",
    author: "Chukwuemeka D.",
    role: "Groom, Port Harcourt",
    emoji: "💍",
    bg: "from-purple-900 to-purple-800",
  },
  {
    type: 'fact',
    headline: "Over 1,200 Pieces",
    sub: "Crafted and delivered",
    body: "From custom engagement rings to everyday bracelets, every piece is made with precision and passion for our clients.",
    emoji: "✨",
    bg: "from-amber-600 to-amber-500",
  },
  {
    type: 'testimonial',
    quote: "The bracelet I ordered was so beautiful. I got compliments everywhere I went. Delivery was fast too!",
    author: "Adaeze N.",
    role: "Customer, Lagos",
    emoji: "📿",
    bg: "from-purple-800 to-purple-700",
  },
  {
    type: 'fact',
    headline: "100% Handcrafted",
    sub: "Premium materials only",
    body: "We source only the finest gold, silver and gemstones, ensuring every piece you receive exceeds your expectations.",
    emoji: "💎",
    bg: "from-amber-700 to-amber-600",
  },
  {
    type: 'testimonial',
    quote: "I ordered necklaces for my entire bridal train. They were identical, gorgeous, and arrived on time. 10/10!",
    author: "Blessing O.",
    role: "Bride, Rivers State",
    emoji: "👑",
    bg: "from-purple-900 to-purple-800",
  },
]

export default function InfoSwiper() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const navigate = (dir: 1 | -1) => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(p => (p + dir + slides.length) % slides.length)
      setTransitioning(false)
    }, 300)
  }

  useEffect(() => {
    const t = setInterval(() => navigate(1), 4500)
    return () => clearInterval(t)
  }, [current])

  const slide = slides[current]

  return (
    <section className="md:py-15 py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">What Our Clients Say</span>
          <h2 className="font-display text-4xl font-bold text-purple-950 mt-2">
            Stories & <span className="gold-shimmer">Milestones</span>
          </h2>
        </div>

        {/* Swiper */}
        <div className="relative">
          {/* Main slide card */}
          <div
            className={`relative bg-gradient-to-br ${slide.bg} rounded-3xl p-10 md:p-16 text-white overflow-hidden max-w-4xl mx-auto shadow-2xl`}
            style={{
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? 'scale(0.97)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              {/* Emoji */}
              <div className="text-7xl md:text-8xl flex-shrink-0">{slide.emoji}</div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {slide.type === 'testimonial' ? (
                  <>
                    <Quote className="w-8 h-8 text-white/30 mb-3 mx-auto md:mx-0" />
                    <p className="font-body text-xl md:text-2xl italic leading-relaxed text-white/90 mb-6">
                      "{slide.quote}"
                    </p>
                    <div>
                      <div className="font-sans font-600 text-white">{slide.author}</div>
                      <div className="font-sans text-sm text-white/60">{slide.role}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-display text-4xl md:text-5xl font-bold text-white mb-1">
                      {slide.headline}
                    </div>
                    <div className="font-sans text-sm tracking-widest uppercase text-white/60 mb-4">
                      {slide.sub}
                    </div>
                    <p className="font-body text-lg text-white/80 leading-relaxed">
                      {slide.body}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg border border-purple-100  items-center justify-center hover:bg-purple-50 transition-colors group hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5 text-purple-700" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg border border-purple-100  items-center justify-center hover:bg-purple-50 transition-colors group hidden md:flex"
          >
            <ChevronRight className="w-5 h-5 text-purple-700" />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-8 h-2.5 bg-amber-500' : 'w-2.5 h-2.5 bg-purple-200 hover:bg-purple-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
