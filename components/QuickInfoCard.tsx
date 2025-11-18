interface QuickInfoCardProps {
  wifiNetwork?: string
  wifiPassword?: string
  checkIn?: string
  checkOut?: string
}

export default function QuickInfoCard({ 
  wifiNetwork, 
  wifiPassword, 
  checkIn = "3:00 PM", 
  checkOut = "10:00 AM" 
}: QuickInfoCardProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Quick Access Info
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        {wifiNetwork && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              <span className="text-sm font-medium">WiFi Network</span>
            </div>
            <div className="font-mono text-lg">{wifiNetwork}</div>
            {wifiPassword && (
              <>
                <div className="text-gray-600 text-sm mt-2 mb-1">Password</div>
                <div className="font-mono text-lg bg-gray-50 p-2 rounded">{wifiPassword}</div>
              </>
            )}
          </div>
        )}
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Check-in/out Times</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-semibold">{checkIn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-out:</span>
              <span className="font-semibold">{checkOut}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}