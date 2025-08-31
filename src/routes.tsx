import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './store/AuthContext'
import { ProtectedRoute, PublicRoute } from './components/common/ProtectedRoute'
import { UserRole } from './types'

// Layouts
import DashboardLayout from './pages/dashboard/page'
import AdminLayout from './pages/admin/page'
import MultiAdminPage from './pages/multi-admin/page'

// Dashboard (Super Admin) Pages
import { DashboardOverview } from './components/dashboard-overview'
import { LaundryManagement } from './components/laundry-management'
import { ResourceManagement } from './components/resource-management'
import { PricingManagement } from './components/pricing-management'
import { ReportsSection } from './components/reports-section-new'

// Admin (Single Laundry) Pages
import { LaundryDashboard } from './components/laundry-dashboard'
import { OrderManagement } from './components/order-management'
import { OperatorManagement } from './components/operator-management'

import { LaundrySettings } from './components/laundry-settings'

// Multi Admin Pages
import { MultiLaundryManagement } from './components/multi-laundry-management'
import { MultiOperatorManagement } from './components/multi-operator-management'
import { ServicePriceManagement } from './components/service-price-management'
import { MultiAdminReports } from './components/multi-admin-reports'
import { MultiAdminSettings } from './components/multi-admin-settings'

// Public Pages
import ClientPage from './pages/client/page'
import LoginPage from './pages/login/page'

/**
 * Application Routes
 * Organized with authentication and role-based access control
 */

const AppRoutes = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Root - Redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="/client" element={<ClientPage />} />

        {/* Dashboard Routes - Super Admin Only */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="lavandarias" element={<LaundryManagement />} />
          <Route path="recursos" element={<ResourceManagement />} />
          <Route path="precos" element={<PricingManagement />} />
          <Route path="relatorios" element={<ReportsSection />} />
        </Route>

        {/* Admin Routes - Single Laundry Admin & Operators */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={[UserRole.SINGLE_ADMIN, UserRole.OPERATOR]}
            >
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<LaundryDashboard />} />
          <Route path="pedidos" element={<OrderManagement />} />
          <Route
            path="operadores"
            element={
              <ProtectedRoute allowedRoles={[UserRole.SINGLE_ADMIN]}>
                <OperatorManagement />
              </ProtectedRoute>
            }
          />
          <Route path="relatorios" element={<ReportsSection />} />
          <Route
            path="configuracoes"
            element={
              <ProtectedRoute allowedRoles={[UserRole.SINGLE_ADMIN]}>
                <LaundrySettings />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Multi Admin Routes - Multi Laundry Admin Only */}
        <Route
          path="/multi-admin"
          element={
            <ProtectedRoute allowedRoles={[UserRole.MULTI_ADMIN]}>
              <MultiAdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/multi-admin/laundries"
          element={
            <ProtectedRoute allowedRoles={[UserRole.MULTI_ADMIN]}>
              <MultiLaundryManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/multi-admin/operators"
          element={
            <ProtectedRoute allowedRoles={[UserRole.MULTI_ADMIN]}>
              <MultiOperatorManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/multi-admin/services"
          element={
            <ProtectedRoute allowedRoles={[UserRole.MULTI_ADMIN]}>
              <ServicePriceManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/multi-admin/reports"
          element={
            <ProtectedRoute allowedRoles={[UserRole.MULTI_ADMIN]}>
              <MultiAdminReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/multi-admin/settings"
          element={
            <ProtectedRoute allowedRoles={[UserRole.MULTI_ADMIN]}>
              <MultiAdminSettings />
            </ProtectedRoute>
          }
        />

        {/* 404 - Not Found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)

export default AppRoutes
