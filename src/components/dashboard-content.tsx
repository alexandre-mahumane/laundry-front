import { useState } from 'react'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { DashboardOverview } from '@/components/dashboard-overview'
import { LaundryManagement } from '@/components/laundry-management'
import { ResourceManagement } from '@/components/resource-management'
import { ReportsSection } from '@/components/reports-section'
import { PricingManagement } from '@/components/pricing-management'
import { LaundryDetails } from '@/components/laundry-details'

export function DashboardContent() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedLaundryId, setSelectedLaundryId] = useState<string | null>(
    null
  )

  const renderContent = () => {
    // Se uma lavandaria específica foi selecionada
    if (selectedLaundryId) {
      return (
        <LaundryDetails
          laundryId={selectedLaundryId}
          onBack={() => setSelectedLaundryId(null)}
        />
      )
    }

    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />
      case 'lavandarias':
        return <LaundryManagement />
      case 'recursos':
        return <ResourceManagement />
      case 'relatorios':
        return <ReportsSection />
      case 'precos':
        return <PricingManagement />
      default:
        return <DashboardOverview />
    }
  }

  // Listen for hash changes to update active section
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '')
      if (hash.startsWith('lavandaria-')) {
        const laundryId = hash.replace('lavandaria-', '')
        setSelectedLaundryId(laundryId)
      } else {
        setSelectedLaundryId(null)
        if (hash) setActiveSection(hash)
      }
    })
  }

  return (
    <SidebarInset className="flex-1 ml-0">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Super Admin Dashboard</span>
        </div>
      </header>

      <main className="flex-1 overflow-auto bg-gray-50/50">
        {renderContent()}
      </main>
    </SidebarInset>
  )
}
