import { SidebarProvider } from "@/components/ui/sidebar";
import { SuperAdminSidebar } from "@/components/sidebar/SuperAdminSidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <SuperAdminSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
