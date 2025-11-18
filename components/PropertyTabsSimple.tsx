'use client'

import { useState } from 'react'

interface PropertyTabsProps {
  welcomeHouseRules?: { body: { raw: string } }
  userInstructions?: { body: { raw: string } }
  criticalInfo?: { body: { raw: string } }
  localGuide?: { body: { raw: string } }
}

const tabs = [
  { 
    id: 'welcome', 
    label: 'Welcome & House Rules',
    icon: '🏡',
    key: 'welcomeHouseRules' as const 
  },
  { 
    id: 'instructions', 
    label: 'User Instructions',
    icon: '📝',
    key: 'userInstructions' as const 
  },
  { 
    id: 'critical', 
    label: 'Critical Info',
    icon: '🚨',
    key: 'criticalInfo' as const 
  },
  { 
    id: 'local', 
    label: 'Local Guide',
    icon: '🗺️',
    key: 'localGuide' as const 
  }
]

export default function PropertyTabsSimple({
  welcomeHouseRules,
  userInstructions,
  criticalInfo,
  localGuide
}: PropertyTabsProps) {
  const documents = {
    welcomeHouseRules,
    userInstructions,
    criticalInfo,
    localGuide
  }

  // Find first available tab
  const firstAvailableTab = tabs.find(tab => documents[tab.key])?.id || 'welcome'
  const [activeTab, setActiveTab] = useState(firstAvailableTab)

  const activeDocument = documents[tabs.find(tab => tab.id === activeTab)?.key || 'welcomeHouseRules']

  const formatMarkdown = (content: string) => {
    // Remove frontmatter
    const withoutFrontmatter = content.replace(/^---[\s\S]*?---\n?/, '')
    
    // Simple markdown-to-HTML conversion for basic formatting
    return withoutFrontmatter
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8 pb-2 border-b border-gray-200">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-800 mb-3 mt-6">$1</h3>')
      .replace(/^\* (.*)$/gm, '<li class="text-gray-700 mb-1">$1</li>')
      .replace(/^\n(<li.*<\/li>)$/gm, '<ul class="list-disc pl-6 mb-4">$1</ul>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/^([^<\n].*[^>])$/gm, '<p class="text-gray-700 mb-4 leading-relaxed">$1</p>')
      .replace(/\n\n/g, '\n')
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex overflow-x-auto">
          {tabs.map((tab) => {
            const isAvailable = !!documents[tab.key]
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => isAvailable && setActiveTab(tab.id)}
                disabled={!isAvailable}
                className={`
                  whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors flex items-center gap-2
                  ${isActive && isAvailable
                    ? 'border-blue-500 text-blue-600' 
                    : isAvailable 
                      ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                      : 'border-transparent text-gray-300 cursor-not-allowed opacity-50'
                  }
                `}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
                {!isAvailable && (
                  <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                    Soon
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeDocument?.body?.raw ? (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: formatMarkdown(activeDocument.body.raw)
            }} 
          />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-medium mb-2">Content Coming Soon</h3>
            <p>This section is currently being prepared.</p>
          </div>
        )}
      </div>
    </div>
  )
}