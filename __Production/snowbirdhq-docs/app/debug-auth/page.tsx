'use client'

import { useEffect, useState } from 'react'

export default function DebugAuthPage() {
  const [cookieInfo, setCookieInfo] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
    setCookieInfo(document.cookie)
  }, [])

  const setCookie = () => {
    const testCookie = `supabase-auth-token=test-value-${Date.now()}; path=/; max-age=86400; samesite=strict`
    console.log('Setting test cookie:', testCookie)
    document.cookie = testCookie
    setCookieInfo(document.cookie)
  }

  const clearCookies = () => {
    document.cookie = 'supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setCookieInfo(document.cookie)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Authentication Debug</h1>
        
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Current URL:</h2>
            <code className="block p-2 bg-gray-100 rounded text-sm">
              {currentUrl}
            </code>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">All Cookies:</h2>
            <code className="block p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap">
              {cookieInfo || 'No cookies found'}
            </code>
          </div>

          <div className="space-x-4">
            <button
              onClick={setCookie}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Set Test Cookie
            </button>
            <button
              onClick={clearCookies}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Cookies
            </button>
            <button
              onClick={() => setCookieInfo(document.cookie)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Refresh Cookie Info
            </button>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Test Links:</h2>
            <div className="space-x-4">
              <a href="/admin" className="text-blue-600 hover:underline">
                Go to /admin
              </a>
              <a href="/auth/login" className="text-blue-600 hover:underline">
                Go to /auth/login
              </a>
              <a href="/" className="text-blue-600 hover:underline">
                Go to home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}