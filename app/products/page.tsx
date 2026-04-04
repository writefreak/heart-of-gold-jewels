'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ShoppingBag, Search, SlidersHorizontal, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Product = {
  id: string
  name: string
  category: string
  price: string
  badge: string | null
  emoji: string
  description: string
  colors: string[]
  is_new: boolean
  is_featured: boolean
  created_at: string
  image_url: string | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const fetched = (data ?? []).map(p => ({ ...p, id: String(p.id) }))
      setProducts(fetched)

      // Derive unique categories
      const unique = ['All', ...Array.from(new Set(fetched.map(p => p.category)))]
      setCategories(unique)
    } catch (err: any) {
      setError(err.message ?? 'Failed to load products.')
    } finally {
      setLoading(false)
    }
  }

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    const matchNew = showNew ? p.is_new : true
    return matchCat && matchSearch && matchNew
  })

  return (
    <main>
      <Navbar />
      <div className="pt-20 min-h-screen bg-white">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-purple-950 to-purple-800 py-16 px-4 text-center">
          <span className="section-tag text-amber-400">Our Jewelry</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">
            Explore Our <span className="gold-shimmer">Collections</span>
          </h1>
          <p className="font-body text-lg text-purple-200 mt-3 max-w-lg mx-auto">
            Handcrafted jewelry for every occasion, every person, every story.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filters bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jewelry..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="form-input pl-10"
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setShowNew(!showNew)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-500 border transition-all ${
                  showNew ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-600 border-gray-200 hover:border-amber-400'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                New Arrivals
              </button>

              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-sans font-500 transition-all border ${
                    activeCategory === cat
                      ? 'btn-purple text-white border-purple-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-32 text-purple-400">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span className="text-sm">Loading collections...</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-5 py-4 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={fetchProducts} className="underline text-xs ml-4 hover:text-red-800">Retry</button>
            </div>
          )}

          {/* Results count */}
          {!loading && !error && (
            <p className="font-sans text-sm text-gray-400 mb-6">
              Showing <span className="text-purple-700 font-600">{filtered.length}</span> pieces
            </p>
          )}

          {/* Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(product => (
                <div
                  key={product.id}
                  className="card-hover group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="relative bg-gradient-to-br from-purple-50 to-amber-50 h-52 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
  <img
    src={product.image_url}
    alt={product.name}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  />
) : (
  <span className="text-6xl group-hover:scale-110 transition-transform duration-500">
    {product.emoji}
  </span>
)}
                    {product.badge && (
                      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-sans font-600 ${
                        product.badge === 'New' ? 'bg-purple-600 text-white' :
                        product.badge === 'Bestseller' ? 'bg-amber-500 text-white' :
                        'bg-amber-600 text-white'
                      }`}>
                        {product.badge}
                      </div>
                    )}
                    {product.is_new && !product.badge && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-sans font-600 bg-purple-600 text-white">
                        New
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <h3 className="font-display text-base font-600 text-purple-950">{product.name}</h3>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans text-xs text-purple-400 uppercase tracking-wider">{product.category}</span>
                      <span className="font-sans font-700 text-amber-600 text-sm">{product.price}</span>
                    </div>
                    <p className="font-body text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="flex gap-1 mb-3 flex-wrap">
                      {product.colors.map(c => (
                        <span key={c} className="text-xs font-sans text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">{c}</span>
                      ))}
                    </div>
                    <Link href="/order" className="w-full btn-purple flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-sans text-white">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Order Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">💎</div>
              <p className="font-display text-2xl text-purple-950">No pieces found</p>
              <p className="font-body text-gray-400 mt-2">Try a different filter or search term</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}