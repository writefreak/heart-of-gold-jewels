'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Truck, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const statusOrder = ['pending', 'processing', 'delivered'] as const
type Status = typeof statusOrder[number]

const statusConfig: Record<Status, { label: string; color: string; next: string; icon: any }> = {
  pending:    { label: 'Pending',    color: 'bg-amber-100 text-amber-700 border-amber-200',   next: 'Mark Processing', icon: Clock },
  processing: { label: 'Processing', color: 'bg-purple-100 text-purple-700 border-purple-200', next: 'Mark Delivered',  icon: Truck },
  delivered:  { label: 'Delivered',  color: 'bg-green-100 text-green-700 border-green-200',    next: 'Revert Pending',  icon: CheckCircle },
}

// type Order = {
//   id: string
//   customer_name: string
//   customer_email: string | null
//   customer_phone: string | null
//   status: Status
//   jewelry_type: string | null
//   quantity: number | null
//   colors: string[] | null
//   location: string | null
//   created_at: string
// }
type Order = {
  id: string
  customer_name: string
  customer_email: string | null
  customer_phone: string | null
  status: Status
  jewelry_type: string | null
  number_of_items: number | null
  preferred_colors: string[] | null
  nearest_bus_stop: string | null
  created_at: string
}
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => { fetchOrders() }, [])

  async function fetchOrders() {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setOrders((data ?? []).map(o => ({ ...o, id: String(o.id) })))
    } catch (err: any) {
      setError(err.message ?? 'Failed to load orders.')
    } finally {
      setLoading(false)
    }
  }
async function cycleStatus(id: string, current: Status) {
  const next = statusOrder[(statusOrder.indexOf(current) + 1) % statusOrder.length]
  setUpdatingId(id)
  const { data, error } = await supabase
    .from('orders')
    .update({ status: next })
    .eq('id', id)
    .select()

  console.log('data:', data)
  console.log('error:', error)

  if (!error) {
    setOrders(orders.map(o => o.id === id ? { ...o, status: next } : o))
  }
  setUpdatingId(null)
}
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', ...statusOrder] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all capitalize ${
              filter === f
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

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20 text-purple-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span className="text-sm">Loading orders...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-5 py-4 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchOrders} className="underline text-xs ml-4 hover:text-red-800">Retry</button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400 text-sm">
          No {filter !== 'all' ? filter : ''} orders found.
        </div>
      )}

      {/* Orders */}
      {!loading && !error && (
        <div className="space-y-3">
          {filtered.map(order => {
            const st = statusConfig[order.status] ?? statusConfig['pending']
            const StIcon = st.icon
            const isUpdating = updatingId === order.id
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded">
                        #{order.id.padStart(3, '0')}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(order.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm">{order.customer_name}</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                     {order.customer_phone    && <span>📞 {order.customer_phone}</span>}
{order.customer_email    && <span>✉️ {order.customer_email}</span>}
{order.jewelry_type      && <span>💍 {order.jewelry_type}{order.number_of_items ? ` × ${order.number_of_items}` : ''}</span>}
{order.preferred_colors?.length && <span>🎨 {order.preferred_colors.join(', ')}</span>}
{order.nearest_bus_stop  && <span>📍 {order.nearest_bus_stop}</span>}
                    </div>
                  </div>

                  {/* Status badge + cycle button */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border font-medium ${st.color}`}>
                      <StIcon className="w-3 h-3" />{st.label}
                    </span>
                    <button
                      onClick={() => cycleStatus(order.id, order.status)}
                      disabled={isUpdating}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating
                        ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
                        : st.next
                      }
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}