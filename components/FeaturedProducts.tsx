'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { products, categories } from '@/lib/products'

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = products.filter(p =>
    activeCategory === 'All' ? p.isFeatured : p.category === activeCategory
  ).slice(0, 6)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-tag">Our Pieces</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-purple-950 mt-2">
              Featured <span className="gold-shimmer">Collections</span>
            </h2>
          </div>
          <Link href="/products" className="btn-outline-gold flex items-center gap-2 px-6 py-2.5 rounded-full text-sm self-start md:self-auto">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-sans font-500 transition-all duration-200 ${
                activeCategory === cat
                  ? 'btn-purple text-white shadow-md'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="card-hover group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image area */}
              <div className="relative bg-gradient-to-br from-purple-50 to-amber-50 h-56 flex items-center justify-center overflow-hidden">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                  {product.emoji}
                </span>
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-sans font-600 ${
                    product.badge === 'New' ? 'bg-purple-600 text-white' :
                    product.badge === 'Bestseller' ? 'bg-amber-500 text-white' :
                    product.badge === 'Custom' ? 'bg-purple-800 text-white' :
                    'bg-amber-600 text-white'
                  }`}>
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display text-lg font-600 text-purple-950">{product.name}</h3>
                  <span className="font-sans font-700 text-amber-600 text-sm flex-shrink-0">{product.price}</span>
                </div>
                <span className="font-sans text-xs text-purple-400 uppercase tracking-wider">{product.category}</span>
                <p className="font-body text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Colors */}
                <div className="flex items-center gap-1.5 mt-3">
                  {product.colors.map(c => (
                    <span key={c} className="text-xs font-sans text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">
                      {c}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/order"
                  className="mt-4 w-full btn-purple flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-sans text-white"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Order This Piece
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
