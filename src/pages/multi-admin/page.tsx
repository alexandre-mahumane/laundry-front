import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { MultiAdminSidebar } from '@/components/multi-admin-sidebar'
import { MultiAdminContent } from '@/components/multi-admin-content'

export default function MultiAdminPage() {
  return (
    <SidebarProvider>
      <MultiAdminSidebar />
      <SidebarInset>
        <MultiAdminContent />
      </SidebarInset>
    </SidebarProvider>
  )
}
