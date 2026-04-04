import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        }
      }
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isAuthPage = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup'

  // Not logged in and trying to access admin — redirect to login
  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Already logged in and visiting login or signup — redirect to admin
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/signup']
}