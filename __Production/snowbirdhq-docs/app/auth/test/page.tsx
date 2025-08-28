'use client'

import { useState } from 'react'

export default function TestAuthPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const testMagicLink = async () => {
    setLoading(true)
    setStatus('Sending...')

    try {
      const response = await fetch('https://sosefomtzqvpyzojlckh.supabase.co/auth/v1/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc2Vmb210enF2cHl6b2psY2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMTg3NDcsImV4cCI6MjA3MTg5NDc0N30.XuTALvh6SAKfySzRO2xNGxeLTOLjjzMyms-cw7-r0Es',
        },
        body: JSON.stringify({
          email: email,
          options: {
            emailRedirectTo: 'https://docs.snowbirdhq.com/auth/callback'
          }
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setStatus('✅ Magic link sent! Check your email.')
      } else {
        setStatus(`❌ Error: ${data.msg || data.error || 'Failed to send'} `)
      }
    } catch (error) {
      console.error('Test auth error:', error)
      setStatus(`❌ Error: ${error}`)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center">Test Authentication</h1>
          <p className="text-center text-gray-600 mt-2">
            Direct Supabase API test (bypassing SDK)
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <button
            onClick={testMagicLink}
            disabled={loading || !email}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Magic Link (Direct API)'}
          </button>

          {status && (
            <div className={`p-4 rounded-md ${
              status.includes('✅') ? 'bg-green-50 text-green-800' : 
              status.includes('❌') ? 'bg-red-50 text-red-800' : 
              'bg-gray-50 text-gray-800'
            }`}>
              {status}
            </div>
          )}

          <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded">
            <p><strong>How this works:</strong></p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Uses direct API calls to Supabase</li>
              <li>Bypasses the Supabase JS SDK completely</li>
              <li>Should avoid the fetch error</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}