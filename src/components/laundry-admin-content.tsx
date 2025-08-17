import { useState } from 'react'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { LaundryDashboard } from '@/components/laundry-dashboard'
import { OrderManagement } from '@/components/order-management'
import { OperatorManagement } from '@/components/operator-management'
import { LaundryReports } from '@/components/laundry-reports'
import { LaundrySettings } from '@/components/laundry-settings'

export function LaundryAdminContent() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <LaundryDashboard />
      case 'pedidos':
        return <OrderManagement />
      case 'operadores':
        return <OperatorManagement />
      case 'relatorios':
        return <LaundryReports />
      case 'configuracoes':
        return <LaundrySettings />
      default:
        return <LaundryDashboard />
    }
  }

  // Listen for hash changes to update active section
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) setActiveSection(hash)
    })
  }

  return (
    <SidebarInset className="flex-1 ml-0">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Lavandaria Norte - Admin Dashboard</span>
        </div>
      </header>

      <main className="flex-1 overflow-auto bg-gray-50/50">
        {renderContent()}
      </main>
    </SidebarInset>
  )
}
