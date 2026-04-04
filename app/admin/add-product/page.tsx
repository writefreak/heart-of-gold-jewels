'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Gem, PlusCircle, CheckCircle, Loader2, ImagePlus, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const emptyForm = {
  name: '',
  category: 'Rings',
  price: '',
  emoji: '💍',
  description: '',
  colors: '',
  badge: '',
  isNew: true,
  isFeatured: false,
  image: null as File | null,
}

const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Custom']
const emojis = ['💍', '📿', '✨', '💎', '💛', '⭐', '👑', '🏅']

export default function AddProductPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setForm(f => ({ ...f, image: file }))
    if (file) setPreview(URL.createObjectURL(file))
    else setPreview(null)
  }

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setForm(f => ({ ...f, image: null }))
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // const uploadImage = async (file: File): Promise<string> => {
  //   const sanitized = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  //   const fileName = `${Date.now()}-${sanitized}`
  //   const { error } = await supabase.storage
  //     .from('product-images')
  //     .upload(fileName, file, { upsert: false })
  //   if (error) throw new Error(`Image upload failed: ${error.message}`)
  //   const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
  //   return data.publicUrl
  // }

  const uploadImage = async (file: File): Promise<string> => {
  const sanitized = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const fileName = `${Date.now()}-${sanitized}`
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, { upsert: false })
  
  console.log('upload data:', data)
  console.log('upload error:', error)
  console.log('upload error message:', error?.message)
  console.log('upload error details:', JSON.stringify(error))

  if (error) throw new Error(`Image upload failed: ${error.message}`)
  const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName)
  return urlData.publicUrl
}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.price) {
      setError('Name and price are required.')
      return
    }
    setLoading(true)
    setError(null)

    let imageUrl: string | null = null
    try {
      if (form.image) imageUrl = await uploadImage(form.image)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('products')
      .insert({
        name: form.name,
        category: form.category,
        price: form.price.startsWith('₦') ? form.price : `₦${form.price}`,
        emoji: form.emoji,
        description: form.description,
        colors: form.colors.split(',').map(c => c.trim()).filter(Boolean),
        is_new: form.isNew,
        is_featured: form.isFeatured,
        badge: form.badge || null,
        image_url: imageUrl,
      })

    setLoading(false)

    if (insertError) {
      setError('Failed to add product. Please try again.')
      return
    }

    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      router.push('/admin/products')
    }, 1800)
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Success banner */}
      {saved && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-800">Product added successfully!</p>
            <p className="text-xs text-green-600">Redirecting to products list...</p>
          </div>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-red-700">{error}</p>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* LEFT — Image + preview panel */}
        <div className="lg:col-span-2 space-y-4">

          {/* Image upload card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-sm font-semibold text-purple-950">Product Image</p>
              <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: 'pointer' }}
              className="relative group"
            >
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Product preview"
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <span className="text-white text-sm font-medium">Change image</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-red-500 transition-colors z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="aspect-square flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-purple-50/40 transition-colors p-8">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                    <ImagePlus className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Click to upload</p>
                    <p className="text-xs text-gray-400 mt-1">or drag & drop</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live preview card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Live Preview</p>
            <div className="rounded-xl border border-gray-100 overflow-hidden">
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-36 object-cover" />
              ) : (
                <div className="h-36 bg-gray-50 flex items-center justify-center text-4xl">
                  {form.emoji}
                </div>
              )}
              <div className="p-3">
                <div className="flex gap-1.5 mb-2 flex-wrap">
                  {form.badge && (
                    <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">{form.badge}</span>
                  )}
                  {form.isNew && (
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">New</span>
                  )}
                  {form.isFeatured && (
                    <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Featured</span>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-800 truncate">{form.name || 'Product name'}</p>
                <p className="text-xs text-amber-600 font-medium mt-0.5">
                  {form.price ? (form.price.startsWith('₦') ? form.price : `₦${form.price}`) : '₦0'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{form.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">

            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-purple-950 text-base">New Arrival</h2>
                <p className="text-xs text-gray-400">Fill in the details below to list a new piece</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="admin-label">Product Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Royal Twisted Band"
                  className="admin-input"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Category *</label>
                  <select
                    required
                    className="admin-input"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="admin-label">Emoji Icon</label>
                  <select
                    className="admin-input"
                    value={form.emoji}
                    onChange={e => setForm({ ...form, emoji: e.target.value })}
                  >
                    {emojis.map(em => <option key={em} value={em}>{em}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Price *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₦</span>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 45,000"
                    className="admin-input pl-8"
                    value={form.price.replace('₦', '')}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the piece..."
                  className="admin-input resize-none"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div>
                <label className="admin-label">Available Colors</label>
                <input
                  type="text"
                  placeholder="e.g. Gold, Rose Gold, Silver"
                  className="admin-input"
                  value={form.colors}
                  onChange={e => setForm({ ...form, colors: e.target.value })}
                />
                <p className="text-xs text-gray-400 mt-1">Separate each color with a comma</p>
              </div>

              <div>
                <label className="admin-label">Badge <span className="text-gray-400 font-normal">(optional)</span></label>
                <input
                  type="text"
                  placeholder="e.g. Bestseller, Limited, Luxury"
                  className="admin-input"
                  value={form.badge}
                  onChange={e => setForm({ ...form, badge: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="admin-label">New Arrival?</label>
                  <div className="flex mt-2 rounded-xl overflow-hidden border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, isNew: true })}
                      className={`flex-1 py-2.5 text-sm font-medium transition-all ${
                        form.isNew ? 'bg-purple-700 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >Yes</button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, isNew: false })}
                      className={`flex-1 py-2.5 text-sm font-medium transition-all border-l border-gray-200 ${
                        !form.isNew ? 'bg-gray-700 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >No</button>
                  </div>
                </div>
                <div>
                  <label className="admin-label">Featured?</label>
                  <div className="flex mt-2 rounded-xl overflow-hidden border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, isFeatured: true })}
                      className={`flex-1 py-2.5 text-sm font-medium transition-all ${
                        form.isFeatured ? 'bg-amber-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >Yes</button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, isFeatured: false })}
                      className={`flex-1 py-2.5 text-sm font-medium transition-all border-l border-gray-200 ${
                        !form.isFeatured ? 'bg-gray-700 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >No</button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-2" />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || saved}
                  className="btn-gold flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
                  ) : saved ? (
                    <><CheckCircle className="w-4 h-4" /> Saved!</>
                  ) : (
                    <><PlusCircle className="w-4 h-4" /> Add to Catalog</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setForm(emptyForm); setPreview(null); setError(null) }}
                  disabled={loading}
                  className="px-5 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium disabled:opacity-50"
                >
                  Reset
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}