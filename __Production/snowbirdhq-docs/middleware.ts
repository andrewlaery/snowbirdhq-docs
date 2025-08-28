import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl
  
  console.log(`[Middleware] Checking path: ${pathname}`)
  
  // Define protected routes - only admin and debug pages need authentication
  const protectedPaths = ['/admin', '/debug', '/debug-auth']
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  
  if (isProtectedPath) {
    // Get authentication tokens from cookies
    const authToken = request.cookies.get('supabase-auth-token')
    console.log(`[Middleware] Auth token present: ${!!authToken}`)
    
    if (!authToken) {
      console.log(`[Middleware] Redirecting to login from ${pathname}`)
      // Redirect to login
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // If authenticated user tries to access login page, redirect to admin
  if (pathname === '/auth/login') {
    const authToken = request.cookies.get('supabase-auth-token')
    if (authToken) {
      console.log(`[Middleware] Authenticated user accessing login, redirecting to admin`)
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}