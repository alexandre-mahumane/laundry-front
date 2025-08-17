import { useState } from 'react'
import { MultiAdminDashboard } from './multi-admin-dashboard'
import { MultiLaundryManagement } from './multi-laundry-management'
import { MultiOperatorManagement } from './multi-operator-management'
import { ServicePriceManagement } from './service-price-management'
import { MultiAdminReports } from './multi-admin-reports'
import { MultiAdminSettings } from './multi-admin-settings'

export function MultiAdminContent() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <MultiAdminDashboard />
      case 'laundries':
        return <MultiLaundryManagement />
      case 'operators':
        return <MultiOperatorManagement />
      case 'services':
        return <ServicePriceManagement />
      case 'reports':
        return <MultiAdminReports />
      case 'settings':
        return <MultiAdminSettings />
      default:
        return <MultiAdminDashboard />
    }
  }

  return <div className="flex-1">{renderContent()}</div>
}
