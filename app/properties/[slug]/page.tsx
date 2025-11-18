import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  allProperties, 
  allWelcomeHouseRules, 
  allUserInstructions, 
  allCriticalInfos,
  allLocalGuides 
} from 'contentlayer/generated'
import PropertyHeader from '@/components/PropertyHeader'
import QuickInfoCard from '@/components/QuickInfoCard'
import PrintButton from '@/components/PrintButton'
import PropertyTabsSimple from '@/components/PropertyTabsSimple'

export async function generateStaticParams() {
  return allProperties.map((property) => ({
    slug: property.slug,
  }))
}

// Extract WiFi info from content
function extractWifiInfo(content?: string): { network?: string; password?: string } {
  if (!content) return {}
  
  const wifiSection = content.match(/## WiFi Access[\s\S]*?(?=##|$)/i)
  if (!wifiSection) return {}
  
  const network = wifiSection[0].match(/Network[:\s*-]+([^\n]+)/i)?.[1]?.trim()
  const password = wifiSection[0].match(/Password[:\s*-]+([^\n]+)/i)?.[1]?.trim()
  
  return { network, password }
}

export default async function PropertyPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const property = allProperties.find(
    (property) => property.slug === resolvedParams.slug
  )

  if (!property) {
    notFound()
  }

  // Find associated documents
  const welcomeHouseRules = allWelcomeHouseRules.find(
    (doc) => doc.propertySlug === resolvedParams.slug
  )
  
  const userInstructions = allUserInstructions.find(
    (doc) => doc.propertySlug === resolvedParams.slug
  )
  
  const criticalInfo = allCriticalInfos.find(
    (doc) => doc.propertySlug === resolvedParams.slug
  )

  // Find local guide based on property location
  const locationSlug = property.location.toLowerCase().replace(/\s+/g, '-')
  const localGuide = allLocalGuides.find(
    (guide) => guide.locationSlug === locationSlug
  )

  // Extract WiFi info from user instructions
  const wifiInfo = extractWifiInfo(userInstructions?.body.raw)

  return (
    <>
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/properties" className="text-gray-600 hover:text-gray-900">Properties</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{property.title}</span>
            </nav>
            <PrintButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Property Header */}
        <PropertyHeader 
          title={property.title}
          location={property.location}
          capacity={property.capacity}
        />

        {/* Quick Info Card */}
        <QuickInfoCard 
          wifiNetwork={wifiInfo.network}
          wifiPassword={wifiInfo.password}
        />

        {/* Property Documentation Tabs */}
        <PropertyTabsSimple 
          welcomeHouseRules={welcomeHouseRules}
          userInstructions={userInstructions}
          criticalInfo={criticalInfo}
          localGuide={localGuide}
        />

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Need Help?
              </h3>
              <p className="text-sm text-blue-800">
                Questions about your stay? Check the <strong>Critical Info</strong> tab for emergency contacts, 
                or browse the <strong>Local Guide</strong> for area recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}