import { createServerSupabase } from '@/lib/supabase-server'
import { ShoppingBag, Package, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createServerSupabase()

  const [
    { count: totalOrders },
    { count: totalProducts },
    { count: pendingOrders },
    { count: deliveredOrders },
    { data: recentOrders },
    { data: ordersByStatus },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'delivered'),
    supabase.from('orders').select('id, customer_name, status, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('orders').select('status'),
  ])

  const statusCounts = { pending: 0, processing: 0, delivered: 0, cancelled: 0 }
  ordersByStatus?.forEach(o => {
    if (o.status in statusCounts) statusCounts[o.status as keyof typeof statusCounts]++
  })
  const total = totalOrders || 1

  const analytics = [
    { label: 'Total Orders',    value: totalOrders ?? 0,    icon: ShoppingBag, color: 'from-purple-700 to-purple-800', sub: 'all time' },
    { label: 'Products Listed', value: totalProducts ?? 0,  icon: Package,     color: 'from-amber-500 to-amber-600',   sub: 'in catalog' },
    { label: 'Pending Orders',  value: pendingOrders ?? 0,  icon: Clock,       color: 'from-purple-600 to-purple-700', sub: 'need attention' },
    { label: 'Delivered',       value: deliveredOrders ?? 0, icon: CheckCircle, color: 'from-green-600 to-green-700',   sub: 'fulfilled orders' },
  ]

  const statusConfig: Record<string, { label: string; color: string; bar: string }> = {
    pending:    { label: 'Pending',    color: 'bg-amber-100 text-amber-700',   bar: 'bg-amber-400' },
    processing: { label: 'Processing', color: 'bg-purple-100 text-purple-700', bar: 'bg-purple-500' },
    delivered:  { label: 'Delivered',  color: 'bg-green-100 text-green-700',   bar: 'bg-green-400' },
    cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-500',       bar: 'bg-red-400' },
  }

  return (
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
              </div>
              <div className="text-2xl font-bold text-purple-950">{a.value}</div>
              <div className="text-xs font-medium text-gray-600 mt-0.5">{a.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{a.sub}</div>
            </div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Orders by status */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-purple-950 text-sm mb-4">Orders by Status</h3>
          {totalOrders === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(statusCounts).map(([status, count]) => {
                const cfg = statusConfig[status]
                const pct = Math.round((count / total) * 100)
                return (
                  <div key={status}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{cfg.label}</span>
                      <span>{count} <span className="text-gray-300">({pct}%)</span></span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${cfg.bar} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick summary */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-purple-950 text-sm mb-4">Quick Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-xs text-gray-500">Fulfillment rate</span>
              <span className="text-xs font-semibold text-green-600">
                {totalOrders ? Math.round((statusCounts.delivered / total) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-xs text-gray-500">Cancellation rate</span>
              <span className="text-xs font-semibold text-red-500">
                {totalOrders ? Math.round((statusCounts.cancelled / total) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-xs text-gray-500">Orders in progress</span>
              <span className="text-xs font-semibold text-purple-600">
                {statusCounts.pending + statusCounts.processing}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-gray-500">Products in catalog</span>
              <span className="text-xs font-semibold text-amber-600">{totalProducts ?? 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-purple-950 text-sm">Recent Orders</h3>
          <Link href="/admin/orders" className="text-xs text-purple-600 hover:text-purple-800 font-medium">
            View All →
          </Link>
        </div>

        {!recentOrders || recentOrders.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400">No orders yet</p>
            <p className="text-xs text-gray-300 mt-1">Orders from your site will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs">
                  <th className="text-left px-5 py-3 font-medium">ID</th>
                  <th className="text-left px-5 py-3 font-medium">Customer</th>
                  <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Date</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => {
                  const cfg = statusConfig[order.status] ?? statusConfig['pending']
                  return (
                    <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                      <td className="px-5 py-3 font-mono text-xs text-purple-600">
                        #{String(order.id).padStart(3, '0')}
                      </td>
                      <td className="px-5 py-3 text-gray-800 text-sm">{order.customer_name}</td>
                      <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">
                        {new Date(order.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${cfg.color}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}