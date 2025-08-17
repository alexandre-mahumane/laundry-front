import {
  BarChart3,
  Waves,
  Home,
  Users,
  ShoppingCart,
  Settings,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Pedidos",
    url: "/admin/pedidos",
    icon: ShoppingCart,
  },
  {
    title: "Operadores",
    url: "/admin/operadores",
    icon: Users,
  },
  {
    title: "Relatórios",
    url: "/admin/relatorios",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    url: "/admin/configuracoes",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const location = useLocation();
  return (
    <Sidebar
      style={{ background: "#0077b6" }}
      className="border-r text-white min-h-screen !bg-[#0077b6]"
    >
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0096c7] to-[#00b4d8] rounded-lg flex items-center justify-center">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">
              Lavandaria Norte
            </h2>
            <p className="text-base text-white/80">Painel Admin</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 text-lg">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={
                      isActive
                        ? "bg-[#023e8a] text-white transition-colors duration-150"
                        : "hover:bg-[#023e8a]  hover:text-white transition-colors duration-150"
                    }
                  >
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-2 text-lg font-semibold w-full h-full"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full border-sidebar-border text-white hover:bg-[#023e8a] bg-transparent text-lg font-semibold"
            onClick={() => (window.location.href = "/login")}
          >
            Sair do Sistema
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
