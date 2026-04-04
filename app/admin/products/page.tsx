'use client'
import { useState, useEffect } from 'react'
import { Edit, Trash2, PlusCircle, Gem, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type Product = {
  id: number
  name: string
  category: string
  price: string
  emoji: string
  image_url: string | null
  is_new: boolean
  is_featured: boolean
  badge: string | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
  setLoading(true)
  setError(null)
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) setError(error.message)
  else setProducts(data || [])
  setLoading(false)
}

const deleteProduct = async (id: number) => {
  if (!window.confirm('Delete this product?')) return
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) { alert('Failed to delete product.'); return }
  setProducts(prev => prev.filter(p => p.id !== id))
}

  // ── Loading ──
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
      </div>
      <p className="text-sm text-gray-400">Loading products...</p>
    </div>
  )

  // ── Error ──
  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-xl">⚠️</div>
      <p className="text-sm font-medium text-gray-700">Something went wrong</p>
      <p className="text-xs text-gray-400 max-w-xs text-center">{error}</p>
      <button onClick={fetchProducts}
        className="mt-2 px-4 py-2 rounded-xl bg-purple-700 text-white text-sm font-medium hover:bg-purple-800 transition-colors">
        Try again
      </button>
    </div>
  )

  // ── Empty ──
  if (products.length === 0) return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">0 products in catalog</p>
        <Link href="/admin/add-product"
          className="btn-gold flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium">
          <PlusCircle className="w-4 h-4" /> Add New
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center gap-5">
          {/* Decorative gem icon */}
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-100 to-amber-50 flex items-center justify-center">
              <Gem className="w-8 h-8 text-purple-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs">✨</div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 text-base mb-1">No products yet</h3>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Your catalog is empty. Add your first piece and it'll appear here.
            </p>
          </div>

          <Link href="/admin/add-product"
            className="btn-gold flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium">
            <PlusCircle className="w-4 h-4" />
            Add your first product
          </Link>
        </div>
      </div>
    </div>
  )

  // ── Products table ──
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{products.length} product{products.length !== 1 ? 's' : ''} in catalog</p>
        <Link href="/admin/add-product"
          className="btn-gold flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium">
          <PlusCircle className="w-4 h-4" /> Add New
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs">
                <th className="text-left px-5 py-3 font-medium">Product</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-medium">Price</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Badges</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name}
                          className="w-9 h-9 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-lg flex-shrink-0">
                          {p.emoji}
                        </div>
                      )}
                      <span className="font-medium text-gray-800 text-xs sm:text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500 hidden sm:table-cell text-xs">{p.category}</td>
                  <td className="px-5 py-3 font-medium text-amber-600 text-xs">{p.price}</td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {p.badge && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">{p.badge}</span>
                      )}
                      {p.is_featured && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Featured</span>
                      )}
                      {!p.badge && !p.is_featured && (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {p.is_new
                      ? <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">New</span>
                      : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Regular</span>
                    }
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}