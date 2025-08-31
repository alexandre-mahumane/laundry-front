import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { env } from '../config/env'

/**
 * API Client Configuration
 * Centralized Axios instance with interceptors
 */

// Create axios instance
const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request in development
    if (env.IS_DEV) {
      console.log('🚀 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      })
    }

    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (env.IS_DEV) {
      console.log('✅ Response:', {
        status: response.status,
        data: response.data,
      })
    }

    return response
  },
  (error: AxiosError) => {
    // Handle errors globally
    if (error.response) {
      const { status, data } = error.response

      // Log error in development
      if (env.IS_DEV) {
        console.error('❌ Response Error:', {
          status,
          data,
          url: error.config?.url,
        })
      }

      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user')
          window.location.href = '/login'
          break

        case 403:
          // Forbidden
          console.error('Access forbidden')
          break

        case 404:
          // Not found
          console.error('Resource not found')
          break

        case 500:
          // Server error
          console.error('Server error')
          break

        default:
          console.error('An error occurred')
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server')
    } else {
      // Error in request setup
      console.error('Request setup error:', error.message)
    }

    return Promise.reject(error)
  }
)

/**
 * API Helper Methods
 */
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config),
}

export default apiClient
