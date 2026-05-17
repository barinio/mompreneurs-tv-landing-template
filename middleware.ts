import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE } from '@/lib/auth'

const PROTECTED = ['/admin/editor', '/admin/sites', '/api/content', '/api/upload', '/api/sites']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  const session = req.cookies.get(SESSION_COOKIE)?.value
  if (session === '1') return NextResponse.next()

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.redirect(new URL('/admin', req.url))
}

export const config = {
  matcher: ['/admin/editor', '/admin/sites', '/api/content/:path*', '/api/upload', '/api/sites/:path*'],
}
