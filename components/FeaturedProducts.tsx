'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, ArrowRight, Gem, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Product = {
  id: number
  name: string
  category: string
  price: string
  emoji: string
  description: string
  colors: string[]
  badge: string | null
  is_new: boolean
  is_featured: boolean
  image_url: string | null
}

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        setProducts(data)
        const cats = ['All', ...Array.from(new Set(data.map((p: Product) => p.category)))]
        setCategories(cats)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filtered = activeCategory === 'All'
    ? products.slice(0, 6)
    : products.filter(p => p.category === activeCategory).slice(0, 6)

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-tag">Our Pieces</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-purple-950 mt-2">
              Our Latest <span className="gold-shimmer">Collections</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="btn-outline-gold flex items-center gap-2 px-6 py-2.5 rounded-full text-sm self-start md:self-auto"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category filter — only show when we have products */}
        {!loading && products.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'btn-purple text-white shadow-md'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="sm:max-w-7xl sm:mx-auto sm:px-4 md:px-6 lg:px-8">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 px-4">
            <Loader2 className="w-6 h-6 text-purple-300 animate-spin" />
            <p className="text-sm text-gray-400">Loading collection...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 px-8 text-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-100 to-amber-50 flex items-center justify-center">
                <Gem className="w-10 h-10 text-purple-200" />
              </div>
              <span className="absolute -top-2 -right-2 text-2xl">✨</span>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-purple-950 mb-2">
                Something beautiful is coming
              </h3>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                Our curated collection is being prepared. Check back soon — every piece is worth the wait.
              </p>
            </div>
            <Link
              href="/order"
              className="btn-purple flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              Place a custom order
            </Link>
          </div>
        )}

        {/* Products grid */}
        {!loading && filtered.length > 0 && (
          <div className="
            flex gap-4 overflow-x-auto pb-3 px-4
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            snap-x snap-mandatory
            sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:px-0
            lg:grid-cols-3 sm:gap-6
          ">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="
                  card-hover group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm
                  w-[300px] flex-shrink-0 snap-start
                  sm:w-auto sm:flex-shrink
                "
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Image area */}
                <div className="relative bg-gradient-to-br from-purple-50 to-amber-50 h-56 flex items-center justify-center overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                      {product.emoji}
                    </span>
                  )}
                  {product.badge && (
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.badge === 'New'        ? 'bg-purple-600 text-white' :
                      product.badge === 'Bestseller' ? 'bg-amber-500 text-white'  :
                      product.badge === 'Custom'     ? 'bg-purple-800 text-white' :
                                                       'bg-amber-600 text-white'
                    }`}>
                      {product.badge}
                    </div>
                  )}
                  {product.is_new && !product.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-600 text-white">
                      New
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display text-lg font-semibold text-purple-950">{product.name}</h3>
                    <span className="font-bold text-amber-600 text-sm flex-shrink-0">{product.price}</span>
                  </div>
                  <span className="text-xs text-purple-400 uppercase tracking-wider">{product.category}</span>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Colors */}
                  {product.colors?.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      {product.colors.map(c => (
                        <span key={c} className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href="/order"
                    className="mt-4 w-full btn-purple flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Order This Piece
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}