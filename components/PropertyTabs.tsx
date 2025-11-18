'use client'

import { useState } from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'

interface PropertyTabsProps {
  welcomeHouseRules?: {
    body: { code: string }
  }
  userInstructions?: {
    body: { code: string }
  }
  criticalInfo?: {
    body: { code: string }
  }
  localGuide?: {
    body: { code: string }
  }
}

interface TabConfig {
  id: string
  label: string
  icon: string
  description: string
}

const tabs: TabConfig[] = [
  {
    id: 'welcome',
    label: 'Welcome & House Rules',
    icon: '🏡',
    description: 'Welcome message and property rules'
  },
  {
    id: 'instructions',
    label: 'User Instructions',
    icon: '📝',
    description: 'How to use the property and amenities'
  },
  {
    id: 'critical',
    label: 'Critical Info',
    icon: '🚨',
    description: 'Emergency contacts and safety information'
  },
  {
    id: 'local',
    label: 'Local Guide',
    icon: '🗺️',
    description: 'Area attractions and recommendations'
  }
]

export default function PropertyTabs({
  welcomeHouseRules,
  userInstructions,
  criticalInfo,
  localGuide
}: PropertyTabsProps) {
  // Find first available document for initial state
  const getFirstAvailableTab = () => {
    if (welcomeHouseRules) return 'welcome'
    if (userInstructions) return 'instructions' 
    if (criticalInfo) return 'critical'
    if (localGuide) return 'local'
    return 'welcome'
  }
  
  const [activeTab, setActiveTab] = useState(getFirstAvailableTab)

  const getActiveDocument = () => {
    switch (activeTab) {
      case 'welcome':
        return welcomeHouseRules
      case 'instructions':
        return userInstructions
      case 'critical':
        return criticalInfo
      case 'local':
        return localGuide
      default:
        return null
    }
  }

  const activeDocument = getActiveDocument()
  const isDocumentAvailable = (tabId: string) => {
    switch (tabId) {
      case 'welcome': return !!welcomeHouseRules
      case 'instructions': return !!userInstructions
      case 'critical': return !!criticalInfo
      case 'local': return !!localGuide
      default: return false
    }
  }

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => {
            const isAvailable = isDocumentAvailable(tab.id)
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => isAvailable && setActiveTab(tab.id)}
                disabled={!isAvailable}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                  ${isActive && isAvailable
                    ? 'border-blue-500 text-blue-600'
                    : isAvailable
                      ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                      : 'border-transparent text-gray-300 cursor-not-allowed opacity-50'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-lg">{tab.icon}</span>
                <div className="flex flex-col items-start">
                  <span>{tab.label}</span>
                  <span className="text-xs text-gray-400 font-normal hidden sm:block">
                    {isAvailable ? tab.description : 'Coming soon'}
                  </span>
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeDocument?.body?.code ? (
          <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mb-3 prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:my-4 prose-ul:space-y-2 prose-li:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono [&>h1:first-child]:hidden [&>p:first-of-type]:text-lg [&>p:first-of-type]:text-gray-600 [&>p:first-of-type]:mb-6">
            <MDXContent code={activeDocument.body.code} />
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Content Not Available
            </h3>
            <p className="text-gray-600">
              This section is being updated. Please check back soon.
            </p>
          </div>
        )}
      </div>

      {/* Print-friendly separator for when multiple tabs are printed */}
      <div className="hidden print:block">
        <div className="h-px bg-gray-300 my-8"></div>
        <div className="text-center text-gray-500 text-sm mb-8">
          — End of {tabs.find(t => t.id === activeTab)?.label} —
        </div>
      </div>
    </div>
  )
}

// Safe MDX component wrapper
function MDXContent({ code }: { code: string }) {
  try {
    const Component = useMDXComponent(code)
    return (
      <div suppressHydrationWarning>
        <Component />
      </div>
    )
  } catch (error) {
    console.error('MDX rendering error:', error)
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium mb-2">Content Loading Error</h3>
        <p className="text-red-600 text-sm">
          There was an issue loading this content. Please try refreshing the page.
        </p>
      </div>
    )
  }
}