import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/sidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="ml-[300px] flex-1">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
