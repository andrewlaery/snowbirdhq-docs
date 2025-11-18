import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next') ?? '/admin'
  
  // Handle errors
  const error = requestUrl.searchParams.get('error')
  if (error) {
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(error)}`, request.url)
    )
  }

  // Handle magic link token
  if (token_hash && type === 'magiclink') {
    // The token will be handled client-side by Supabase
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Redirect to admin dashboard by default
  return NextResponse.redirect(new URL(next, request.url))
}