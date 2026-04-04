'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Crown, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSignup = async () => {
    if (!email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) { setError(error.message); setLoading(false); return }

    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email: data.user.email
      })
    }

    setLoading(false)
    setMessage('Account created! Redirecting to sign in...')
    setTimeout(() => router.push('/login'), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-purple-950 flex items-center justify-center mb-3 shadow-lg">
            <Crown className="w-6 h-6 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-purple-950">Heart of Gold</h1>
          <p className="text-xs tracking-widest text-amber-500 uppercase mt-1">Admin Panel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Create your account</h2>
          <p className="text-sm text-gray-400 mb-6">Set up your admin access</p>

          {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
          {message && <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{message}</p>}

          {!message && (
            <>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSignup()}
                  className="form-input w-full"
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password (min. 6 characters)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSignup()}
                    className="form-input w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full mt-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-medium transition disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </>
          )}

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 hover:underline">Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  )
}