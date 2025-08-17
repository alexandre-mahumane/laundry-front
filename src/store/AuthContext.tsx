import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User, AuthResponse, LoginCredentials, UserRole } from '../types'
import { api } from '../api/client'
import { endpoints } from '../api/endpoints'
import { useLaundryStore } from './useLaundryStore'

/**
 * Authentication Context
 * Manages user authentication state and operations
 * Integrates with Zustand Laundry Store for laundry/operator metadata
 */

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = localStorage.getItem('auth_token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const response = await api.post<AuthResponse>(
        endpoints.auth.login,
        credentials
      )

      console.log('🔥 LOGIN RESPONSE FULL:', response.data)

      const responseData = response.data as unknown as Record<string, string>
      const { token, username, role, adminType } = response.data

      // Extract user ID to use as operator ID (o ID do user é o operatorId)
      const userId = responseData.id
      console.log('🔥 USER ID FROM LOGIN:', userId)

      // Map backend role/type to frontend UserRole
      let computedRole: string = 'SINGLE_ADMIN' // Fallback

      if (role === 'admin') {
        if (adminType === 'multi') computedRole = 'MULTI_ADMIN'
        else computedRole = 'SINGLE_ADMIN'
      } else if (role === 'operator') {
        computedRole = 'OPERATOR'
      }

      const user: User = {
        username,
        role,
        adminType,
        computedRole: computedRole as UserRole,
      }

      // Save to state
      setUser(user)
      setToken(token)

      // Save to localStorage
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))

      // 🔥 Fetch laundry info and store in Zustand
      try {
        const laundryRes = await api.get('/laundry/info')
        const laundryData = Array.isArray(laundryRes.data)
          ? laundryRes.data[0]
          : laundryRes.data

        console.log('🔥 Laundry data fetched:', laundryData)

        if (laundryData && laundryData.id) {
          // Set laundry in Zustand store
          useLaundryStore.getState().setLaundry(laundryData)
          console.log('✅ Laundry stored in Zustand:', laundryData.id)

          // 🔥 Use userId from login response as operatorId
          if (userId) {
            useLaundryStore.getState().setOperatorId(userId)
            console.log('✅ Operator ID (User ID) stored in Zustand:', userId)
          } else {
            console.warn('⚠️ User ID (Operator ID) not found in login response')
          }
        } else {
          console.warn('⚠️ Laundry data is missing or has no ID')
        }
      } catch (laundryError) {
        console.warn('❌ Failed to fetch laundry info:', laundryError)
        // Don't fail the login if laundry info fails to load
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error // Re-throw to allow component to handle it
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear state
    setUser(null)
    setToken(null)

    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')

    // 🔥 Clear Zustand Laundry Store
    useLaundryStore.getState().clear()

    // Redirect to login
    window.location.href = '/login'
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
