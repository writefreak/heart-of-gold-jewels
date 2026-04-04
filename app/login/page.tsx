'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Crown, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type View = 'login' | 'forgot' | 'reset'

export default function LoginPage() {
  const router = useRouter()
  const [view, setView] = useState<View>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('type=recovery')) setView('reset')
  }, [])

  const handleLogin = async () => {
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setError(error.message); return }
    router.push('/admin')
  }

  const handleForgotPassword = async () => {
    if (!email) { setError('Please enter your email address.'); return }
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setMessage('Check your email for a password reset link.')
  }

  const handleResetPassword = async () => {
    if (!newPassword) { setError('Please enter a new password.'); return }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setLoading(false)
    if (error) { setError(error.message); return }
    setMessage('Password updated successfully.')
    setTimeout(() => router.push('/admin'), 1500)
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

          {/* Login */}
          {view === 'login' && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Welcome back</h2>
              <p className="text-sm text-gray-400 mb-6">Sign in to manage your store</p>

              {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  className="form-input w-full"
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
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

              <div className="flex justify-end mt-2 mb-6">
                <button
                  onClick={() => { setView('forgot'); setError(null); setMessage(null) }}
                  className="text-xs text-purple-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-medium transition disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-purple-600 hover:underline">Create one</Link>
              </p>
            </>
          )}

          {/* Forgot Password */}
          {view === 'forgot' && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Reset your password</h2>
              <p className="text-sm text-gray-400 mb-6">Enter your email and we&apos;ll send you a reset link</p>

              {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
              {message && <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{message}</p>}

              {!message && (
                <>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleForgotPassword()}
                    className="form-input w-full mb-4"
                  />
                  <button
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-medium transition disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </>
              )}

              <button
                onClick={() => { setView('login'); setError(null); setMessage(null) }}
                className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition"
              >
                Back to sign in
              </button>
            </>
          )}

          {/* Reset Password */}
          {view === 'reset' && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Set new password</h2>
              <p className="text-sm text-gray-400 mb-6">Choose a strong password for your account</p>

              {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
              {message && <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{message}</p>}

              {!message && (
                <>
                  <div className="relative mb-4">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="New password (min. 6 characters)"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleResetPassword()}
                      className="form-input w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    onClick={handleResetPassword}
                    disabled={loading}
                    className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-medium transition disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  )
}