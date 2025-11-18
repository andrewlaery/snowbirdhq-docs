'use client'

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Environment Debug</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Environment Variables</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block font-medium">NEXT_PUBLIC_SUPABASE_URL:</label>
              <code className="block p-2 bg-gray-100 rounded text-sm">
                {process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'}
              </code>
            </div>
            
            <div>
              <label className="block font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</label>
              <code className="block p-2 bg-gray-100 rounded text-sm">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 
                  `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 50)}...` : 
                  'NOT SET'
                }
              </code>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Status:</h3>
            <div className="p-3 rounded">
              {process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
                <div className="text-green-700 bg-green-50 p-2 rounded">
                  ✅ Environment variables are set
                </div>
              ) : (
                <div className="text-red-700 bg-red-50 p-2 rounded">
                  ❌ Environment variables are missing
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}