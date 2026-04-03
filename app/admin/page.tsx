'use client'
import { useState } from 'react'
import {
  LayoutDashboard, ShoppingBag, Package, PlusCircle, Crown,
  TrendingUp, Users, Star, Eye, LogOut, Bell, Menu, X,
  ArrowUpRight, ArrowDownRight, CheckCircle, Clock, Truck,
  Gem, Edit, Trash2, Upload
} from 'lucide-react'

// ─── Mock data ────────────────────────────────────────────────
const mockOrders = [
  { id: '#HOG-001', name: 'Adaeze Nwosu', phone: '0812 345 6789', type: 'Ring', qty: 2, colors: ['Gold'], location: 'Rumuola Bus Stop', status: 'pending', date: '2 Jun 2024' },
  { id: '#HOG-002', name: 'Chidi Okonkwo', phone: '0803 987 6543', type: 'Necklace', qty: 1, colors: ['Rose Gold'], location: 'Garrison Junction', status: 'processing', date: '1 Jun 2024' },
  { id: '#HOG-003', name: 'Blessing Amadi', phone: '0705 111 2233', type: 'Bracelet', qty: 5, colors: ['Silver', 'Gold'], location: 'Mile 1 Market', status: 'delivered', date: '31 May 2024' },
  { id: '#HOG-004', name: 'Emeka Eze', phone: '0901 234 5678', type: 'Earrings', qty: 1, colors: ['White Gold'], location: 'Ada George', status: 'delivered', date: '30 May 2024' },
  { id: '#HOG-005', name: 'Ngozi Obi', phone: '0816 999 0011', type: 'Custom', qty: 3, colors: ['Mixed'], location: 'NTA Road', status: 'pending', date: '30 May 2024' },
  { id: '#HOG-006', name: 'Kemi Badmus', phone: '0703 456 7890', type: 'Ring', qty: 1, colors: ['Gold'], location: 'Woji Bus Stop', status: 'processing', date: '29 May 2024' },
]

const mockProducts = [
  { id: 1, name: 'Royal Solitaire Ring', category: 'Rings', price: '₦85,000', emoji: '💍', stock: 'Available', isNew: false },
  { id: 2, name: 'Eternity Diamond Band', category: 'Rings', price: '₦65,000', emoji: '💍', stock: 'Available', isNew: true },
  { id: 3, name: 'Heart Pendant Necklace', category: 'Necklaces', price: '₦35,000', emoji: '📿', stock: 'Available', isNew: false },
  { id: 4, name: 'Twisted Gold Chain', category: 'Necklaces', price: '₦28,000', emoji: '📿', stock: 'Low', isNew: true },
  { id: 5, name: 'Diamond Stud Earrings', category: 'Earrings', price: '₦45,000', emoji: '✨', stock: 'Available', isNew: false },
]

const analytics = [
  { label: 'Total Orders', value: '248', change: '+18%', up: true, icon: ShoppingBag, color: 'from-purple-700 to-purple-800' },
  { label: 'Revenue (Est.)', value: '₦4.2M', change: '+23%', up: true, icon: TrendingUp, color: 'from-amber-500 to-amber-600' },
  { label: 'Happy Clients', value: '192', change: '+12%', up: true, icon: Users, color: 'from-purple-600 to-purple-700' },
  { label: 'Avg. Rating', value: '4.9★', change: '+0.1', up: true, icon: Star, color: 'from-amber-600 to-amber-700' },
]

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: 2 },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'add-product', label: 'Add New Arrival', icon: PlusCircle },
]

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending:    { label: 'Pending',    color: 'bg-amber-100 text-amber-700 border-amber-200',   icon: Clock },
  processing: { label: 'Processing', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Truck },
  delivered:  { label: 'Delivered',  color: 'bg-green-100 text-green-700 border-green-200',    icon: CheckCircle },
}

// ─── Empty add-product form state ─────────────────────────────
const emptyForm = { name: '', category: 'Rings', price: '', emoji: '💍', description: '', colors: '', badge: '', isNew: true }

// ─── Main Component ───────────────────────────────────────────
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [products, setProducts] = useState(mockProducts)
  const [orders, setOrders] = useState(mockOrders)
  const [form, setForm] = useState(emptyForm)
  const [saved, setSaved] = useState(false)
  const [orderFilter, setOrderFilter] = useState('all')

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct = {
      id: products.length + 10,
      name: form.name,
      category: form.category,
      price: form.price.startsWith('₦') ? form.price : `₦${form.price}`,
      emoji: form.emoji,
      stock: 'Available',
      isNew: form.isNew,
    }
    setProducts([newProduct, ...products])
    setForm(emptyForm)
    setSaved(true)
    setTimeout(() => { setSaved(false); setActiveTab('products') }, 1800)
  }

  const deleteProduct = (id: number) => setProducts(products.filter(p => p.id !== id))

  const updateOrderStatus = (id: string, status: string) =>
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o))

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-purple-950 text-white flex flex-col transition-transform duration-300
        lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-purple-800">
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-display text-base font-bold text-white leading-none">Heart of Gold</div>
            <div className="text-[10px] tracking-widest text-amber-400 uppercase">Admin Panel</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-purple-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon
            const active = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                    : 'text-purple-200 hover:bg-purple-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-purple-800">
          <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-purple-200 hover:bg-purple-800 hover:text-white transition-all">
            <Eye className="w-4 h-4" />
            View Live Site
          </a>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-purple-300 hover:bg-purple-800 hover:text-white transition-all mt-1">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-purple-950 capitalize">
                {activeTab === 'add-product' ? 'Add New Arrival' : activeTab}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">Heart of Gold Jewels — Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">

          {/* ── DASHBOARD ── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Analytics cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {analytics.map((a, i) => {
                  const Icon = a.icon
                  return (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className={`text-xs font-medium flex items-center gap-0.5 ${a.up ? 'text-green-600' : 'text-red-500'}`}>
                          {a.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {a.change}
                        </span>
                      </div>
                      <div className="font-display text-2xl font-bold text-purple-950">{a.value}</div>
                      <div className="text-xs text-gray-400 mt-1">{a.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Orders by status */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-sans font-600 text-purple-950 text-sm mb-4">Orders by Status</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Delivered', count: 142, pct: 57, color: 'bg-green-400' },
                      { label: 'Processing', count: 68, pct: 27, color: 'bg-purple-500' },
                      { label: 'Pending', count: 38, pct: 15, color: 'bg-amber-400' },
                    ].map(s => (
                      <div key={s.label}>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{s.label}</span><span>{s.count}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category breakdown */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-sans font-600 text-purple-950 text-sm mb-4">Orders by Category</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Rings', count: 89, pct: 36, color: 'bg-purple-600' },
                      { label: 'Necklaces', count: 63, pct: 25, color: 'bg-amber-500' },
                      { label: 'Bracelets', count: 54, pct: 22, color: 'bg-purple-400' },
                      { label: 'Earrings', count: 42, pct: 17, color: 'bg-amber-400' },
                    ].map(c => (
                      <div key={c.label}>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{c.label}</span><span>{c.count}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly trend */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-sans font-600 text-purple-950 text-sm mb-4">Monthly Orders</h3>
                  <div className="flex items-end gap-2 h-24">
                    {[18, 32, 27, 45, 38, 56, 42].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className={`w-full rounded-t-md ${i === 5 ? 'bg-gradient-to-t from-amber-500 to-amber-400' : 'bg-purple-100'}`}
                          style={{ height: `${(h / 56) * 100}%` }}
                        />
                        <span className="text-[9px] text-gray-400">
                          {['D', 'J', 'F', 'M', 'A', 'M', 'J'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders preview */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <h3 className="font-sans font-600 text-purple-950 text-sm">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs">
                        <th className="text-left px-5 py-3 font-medium">ID</th>
                        <th className="text-left px-5 py-3 font-medium">Client</th>
                        <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Type</th>
                        <th className="text-left px-5 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.slice(0, 4).map(order => {
                        const st = statusConfig[order.status]
                        const StIcon = st.icon
                        return (
                          <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                            <td className="px-5 py-3 font-mono text-xs text-purple-600">{order.id}</td>
                            <td className="px-5 py-3 text-gray-800">{order.name}</td>
                            <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{order.type}</td>
                            <td className="px-5 py-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs border font-medium ${st.color}`}>
                                <StIcon className="w-3 h-3" />{st.label}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Filter tabs */}
              <div className="flex gap-2 flex-wrap">
                {['all', 'pending', 'processing', 'delivered'].map(f => (
                  <button
                    key={f}
                    onClick={() => setOrderFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all capitalize ${
                      orderFilter === f
                        ? 'bg-purple-700 text-white border-purple-700'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {f}
                    {f !== 'all' && (
                      <span className="ml-1.5 text-xs opacity-70">
                        ({orders.filter(o => o.status === f).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Orders list */}
              <div className="space-y-3">
                {filteredOrders.map(order => {
                  const st = statusConfig[order.status]
                  const StIcon = st.icon
                  return (
                    <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded">{order.id}</span>
                            <span className="text-xs text-gray-400">{order.date}</span>
                          </div>
                          <h4 className="font-medium text-gray-900 text-sm">{order.name}</h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                            <span>📞 {order.phone}</span>
                            <span>💍 {order.type} × {order.qty}</span>
                            <span>🎨 {order.colors.join(', ')}</span>
                            <span>📍 {order.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Status badge */}
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border font-medium ${st.color}`}>
                            <StIcon className="w-3 h-3" />{st.label}
                          </span>
                          {/* Change status */}
                          <select
                            value={order.status}
                            onChange={e => updateOrderStatus(order.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 bg-white focus:outline-none focus:border-purple-400"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{products.length} products in catalog</p>
                <button
                  onClick={() => setActiveTab('add-product')}
                  className="btn-gold flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add New
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs">
                        <th className="text-left px-5 py-3 font-medium">Product</th>
                        <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Category</th>
                        <th className="text-left px-5 py-3 font-medium">Price</th>
                        <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Stock</th>
                        <th className="text-left px-5 py-3 font-medium">Status</th>
                        <th className="text-left px-5 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{p.emoji}</span>
                              <span className="font-medium text-gray-800 text-xs sm:text-sm">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-gray-500 hidden sm:table-cell text-xs">{p.category}</td>
                          <td className="px-5 py-3 font-medium text-amber-600 text-xs">{p.price}</td>
                          <td className="px-5 py-3 hidden md:table-cell">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              p.stock === 'Available' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            {p.isNew
                              ? <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">New</span>
                              : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Regular</span>
                            }
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors">
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                              >
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
          )}

          {/* ── ADD NEW ARRIVAL ── */}
          {activeTab === 'add-product' && (
            <div className="max-w-xl">
              {saved && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Product added successfully!</p>
                    <p className="text-xs text-green-600">Redirecting to products list...</p>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <Gem className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-sans font-bold text-purple-950 text-base">New Arrival</h2>
                    <p className="text-xs text-gray-400">Add a product to your collection</p>
                  </div>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="form-label">Product Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Royal Twisted Band"
                      className="form-input"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  {/* Category & Emoji */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Category *</label>
                      <select
                        required
                        className="form-input"
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                      >
                        {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Custom'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Emoji Icon *</label>
                      <select
                        required
                        className="form-input"
                        value={form.emoji}
                        onChange={e => setForm({ ...form, emoji: e.target.value })}
                      >
                        {['💍', '📿', '✨', '💎', '💛', '⭐', '👑', '🏅'].map(em => (
                          <option key={em} value={em}>{em}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="form-label">Price *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 45,000 or From 25,000"
                      className="form-input"
                      value={form.price}
                      onChange={e => setForm({ ...form, price: e.target.value })}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="form-label">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Brief description of the piece..."
                      className="form-input resize-none"
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                    />
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="form-label">Available Colors (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Gold, Rose Gold, Silver"
                      className="form-input"
                      value={form.colors}
                      onChange={e => setForm({ ...form, colors: e.target.value })}
                    />
                  </div>

                  {/* Badge + Is New */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Badge (optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Bestseller, New, Luxury"
                        className="form-input"
                        value={form.badge}
                        onChange={e => setForm({ ...form, badge: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Mark as New Arrival?</label>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, isNew: true })}
                          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                            form.isNew ? 'bg-purple-700 text-white border-purple-700' : 'bg-white text-gray-500 border-gray-200'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, isNew: false })}
                          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                            !form.isNew ? 'bg-gray-700 text-white border-gray-700' : 'bg-white text-gray-500 border-gray-200'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image upload placeholder */}
                  <div>
                    <label className="form-label">Product Image (optional)</label>
                    <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-300 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="btn-gold flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2">
                      <PlusCircle className="w-4 h-4" />
                      Add to Catalog
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm(emptyForm)}
                      className="px-5 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
