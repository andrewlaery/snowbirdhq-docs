'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setStatus('Sending magic link...')

    try {
      const response = await fetch('https://sosefomtzqvpyzojlckh.supabase.co/auth/v1/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc2Vmb210enF2cHl6b2psY2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMTg3NDcsImV4cCI6MjA3MVg5NDc0N30.XuTALvh6SAKfySzRO2xNGxeLTOLjjzMyms-cw7-r0Es',
        },
        body: JSON.stringify({
          email: email,
          options: {
            emailRedirectTo: 'https://docs.snowbirdhq.com/'
          }
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setStatus('✅ Magic link sent! Check your email and click the link to sign in.')
      } else {
        setStatus(`❌ Error: ${data.msg || data.error || 'Failed to send magic link'}`)
      }
    } catch (error) {
      console.error('Auth error:', error)
      setStatus('❌ Network error. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Snowbird HQ</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to your account
          </h2>
          <p className="text-sm text-gray-600">
            Property management access
          </p>
        </div>

        <div className="bg-white py-8 px-8 shadow-md rounded-lg">
          <form onSubmit={sendMagicLink} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !email}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>
            </div>

            {status && (
              <div className={`mt-4 p-3 rounded-md text-sm ${
                status.includes('✅') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : status.includes('❌')
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}>
                {status}
              </div>
            )}

            <div className="text-center text-sm text-gray-500 mt-4">
              We'll send you a secure login link via email.<br/>
              No password required.
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}