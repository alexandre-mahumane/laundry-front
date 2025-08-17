import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { UserRole } from '../../types'

/**
 * Protected Route Component
 * Protects routes that require authentication
 */

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.computedRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
          <p className="text-xl text-gray-600 mb-8">Acesso Negado</p>
          <p className="text-gray-500">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

/**
 * Public Route Component
 * Redirects authenticated users away from public pages (like login)
 */

interface PublicRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function PublicRoute({ children, redirectTo = '/dashboard' }: PublicRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Redirect authenticated users based on their role
  if (isAuthenticated && user) {
    let destination = redirectTo

    // Role-based redirection
    switch (user.computedRole) {
      case UserRole.SUPER_ADMIN:
        destination = '/dashboard'
        break
      case UserRole.MULTI_ADMIN:
        destination = '/multi-admin'
        break
      case UserRole.SINGLE_ADMIN:
        destination = '/admin/dashboard'
        break
      case UserRole.OPERATOR:
        destination = '/admin/pedidos'
        break
      default:
        destination = redirectTo
    }

    return <Navigate to={destination} replace />
  }

  return <>{children}</>
}
