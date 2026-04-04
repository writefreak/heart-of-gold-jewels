'use client'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, ShoppingBag, Package, PlusCircle,
  Crown, Eye, LogOut, Bell, Menu, X
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const navItems = [
  { href: '/admin',             label: 'Dashboard',       icon: LayoutDashboard },
  { href: '/admin/orders',      label: 'Orders',          icon: ShoppingBag,    badge: 2 },
  { href: '/admin/products',    label: 'Products',        icon: Package },
  { href: '/admin/add-product', label: 'Add New Arrival', icon: PlusCircle },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email ?? null)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
   window.location.href = '/login'
  }

  const pageTitle = () => {
    if (pathname === '/admin') return 'Dashboard'
    if (pathname === '/admin/orders') return 'Orders'
    if (pathname === '/admin/products') return 'Products'
    if (pathname === '/admin/add-product') return 'Add New Arrival'
    return 'Admin'
  }

  const avatarLetter = userEmail ? userEmail[0].toUpperCase() : 'A'

  return (
    <div className="admin-layout flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
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
            <div className="text-base font-bold text-white leading-none">Heart of Gold</div>
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
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
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
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-purple-800">
          {userEmail && (
            <p className="text-[11px] text-purple-400 px-3 mb-2 truncate">{userEmail}</p>
          )}
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-purple-200 hover:bg-purple-800 hover:text-white transition-all"
          >
            <Eye className="w-4 h-4" />
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-purple-300 hover:bg-purple-800 hover:text-white transition-all mt-1"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-purple-950">{pageTitle()}</h1>
              <p className="text-xs text-gray-400 hidden sm:block">Heart of Gold Jewels — Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center text-white text-sm font-bold">
              {avatarLetter}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}