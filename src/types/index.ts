/**
 * Global TypeScript Types
 * Common types used across the application
 */

// ============================================
// User & Authentication Types
// ============================================

export const UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  MULTI_ADMIN: 'MULTI_ADMIN',
  SINGLE_ADMIN: 'SINGLE_ADMIN',
  OPERATOR: 'OPERATOR',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export interface User {
  username: string
  role: string
  adminType?: 'single' | 'multi'
  // Propriedades computadas para uso interno
  computedRole: UserRole
}

export interface AuthResponse {
  token: string
  username: string
  role: string
  adminType?: 'single' | 'multi'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  role: UserRole
}

// ============================================
// Laundry Types
// ============================================

export const LaundryType = {
  SINGLE: 'SINGLE',
  MULTI: 'MULTI',
} as const

export type LaundryType = (typeof LaundryType)[keyof typeof LaundryType]

export const LaundryStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  MAINTENANCE: 'MAINTENANCE',
} as const

export type LaundryStatus = (typeof LaundryStatus)[keyof typeof LaundryStatus]

export interface Laundry {
  id: string
  name: string
  email: string
  phone: string
  location: string
  adminId: string
  hasBilling: boolean
  hasEmailService: boolean
  hasSmSService: boolean
  isDeleted: boolean
  status: string // 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  type?: LaundryType
  address?: string
  city?: string
  province?: string
  ownerId?: string
  owner?: User
}

export interface LaundrySettings {
  id: string
  name: string
  email: string
  phone: string
  location: string
  adminId: string
  hasBilling: boolean
  hasEmailService: boolean
  hasSmSService: boolean
  isDeleted: boolean
  status: string
}

export interface UpdateLaundrySettingsData {
  name?: string
  email?: string
  phone?: string
  location?: string
  hasBilling?: boolean
  hasEmailService?: boolean
  hasSmSService?: boolean
}

export interface CreateLaundryData {
  name: string
  type: LaundryType
  address: string
  city: string
  province: string
  phone: string
  email?: string
}

// ============================================
// Operator Types
// ============================================

export const OperatorStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export type OperatorStatus =
  (typeof OperatorStatus)[keyof typeof OperatorStatus]

export interface Operator {
  id: string
  username: string
  email: string
  phone: string
  password: string
  status: string // 'active' | 'inactive'
  adminType?: string
  role: string // 'operator' | 'supervisor'
  laundryId?: string
  laundry?: Laundry
  userId?: string
  user?: User
  createdAt?: string
  updatedAt?: string
}

export interface CreateOperatorData {
  username: string
  email: string
  phone: string
  password: string
  status?: string
  role?: string
  adminType?: string
}

// ============================================
// Client Types
// ============================================

export interface Client {
  id: string
  name: string
  email?: string
  phone: string
  laundryId: string
  operatorId?: string
  address?: string
  city?: string
  province?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateClientData {
  name: string
  email?: string
  phone: string
  address?: string
  city?: string
  province?: string
  notes?: string
}

// ============================================
// Service Types
// ============================================

export const ServiceCategory = {
  WASHING: 'WASHING',
  IRONING: 'IRONING',
  DRY_CLEANING: 'DRY_CLEANING',
  SPECIAL: 'SPECIAL',
} as const

export type ServiceCategory =
  (typeof ServiceCategory)[keyof typeof ServiceCategory]

export interface Service {
  id: string
  name: string
  price: number
  description?: string
  laundryId?: string
  laundry?: Laundry
  createdAt?: string
  updatedAt?: string
}

export interface CreateServiceData {
  name: string
  category: ServiceCategory
  price: number
  description?: string
  laundryId: string
}

// ============================================
// Order Types
// ============================================

export const OrderStatus = {
  IN_PROCESSING: 'in_processing',
  READY: 'ready',
  DELIVERED: 'delivered',
} as const

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

export const PaymentStatus = {
  PAID: 'paid',
  NOT_PAID: 'not_paid',
} as const

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

export interface OrderService {
  id: string
  name: string
  price: number
  description?: string
}

export interface OrderClient {
  id: string
  name: string
  phone: string
}

export interface Order {
  id: string
  order_number: string
  clientId: string
  client?: OrderClient
  client_id?: string
  laundryId: string
  laundry_id?: string
  operatorId?: string
  operator_id?: string
  operator?: Operator
  services: OrderService[]
  description: string
  value: string | number
  status: OrderStatus
  payment_status: PaymentStatus
  paymentStatus?: PaymentStatus
  notes?: string
  order_date: string
  updated_at: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateOrderData {
  client: {
    name: string
    phone: string
  }
  order: {
    description: string
    serviceTypeId: string[]
    paymentStatus: PaymentStatus
    status: OrderStatus
  }
}

export interface OrderStatsResponse {
  totalReceived: string | number
  totalServiceInProgress: string | number
  totalServiceInReady: string | number
  totalServiceInDelivered: string | number
  totalReceivable: string | number
  totalServices: string | number
}

export interface PaginatedOrderResponse {
  currentPage: number
  totalItems: number
  totalPages: number
  nextPage?: number
  previousPage?: number
  data: Order[]
}

// ============================================
// Report Types
// ============================================

export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalClients: number
  totalLaundries: number
  ordersToday: number
  revenueToday: number
  pendingOrders: number
  completedOrders: number
}

export interface SalesReport {
  date: string
  orders: number
  revenue: number
}

export interface RevenueReport {
  period: string
  revenue: number
  orders: number
  averageOrderValue: number
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

// ============================================
// Form Types
// ============================================

export interface FormField {
  name: string
  label: string
  type: string
  placeholder?: string
  required?: boolean
  validation?: any
}

export interface SelectOption {
  value: string
  label: string
}
