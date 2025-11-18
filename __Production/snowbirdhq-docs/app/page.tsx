'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if we have authentication tokens in the URL hash
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      const accessToken = params.get('access_token')
      
      if (accessToken) {
        // We have a valid authentication token
        console.log('Authentication successful!')
        console.log('Access token:', accessToken.substring(0, 50) + '...')
        
        // Set auth cookie for middleware to check
        const cookieValue = `supabase-auth-token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`
        console.log('Setting cookie:', cookieValue)
        document.cookie = cookieValue
        
        // Verify cookie was set
        console.log('All cookies after setting:', document.cookie)
        
        // Clear the URL hash to clean up
        window.history.replaceState({}, '', window.location.pathname)
        // Redirect to admin
        router.push('/admin')
      }
    }
  }, [router])

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Welcome to Snowbird HQ
      </h1>
      <p className="text-xl mb-8 text-gray-600">
        Your comprehensive property guide system
      </p>
      <Link
        href="/properties"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Browse Properties
      </Link>
    </div>
  )
}