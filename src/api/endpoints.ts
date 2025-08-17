/**
 * API Endpoints Configuration
 * Centralized endpoint definitions
 */

export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },

  // Users
  users: {
    list: '/users',
    create: '/users',
    get: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },

  // Laundry (Single)
  laundry: {
    list: '/laundry',
    create: '/laundry',
    get: (id: string) => `/laundry/${id}`,
    update: (id: string) => `/laundry/${id}`,
    delete: (id: string) => `/laundry/${id}`,
    stats: (id: string) => `/order/day-analytics/${id}`,
  },

  // Multi Laundries
  multiLaundries: {
    list: '/multi-laundries',
    create: '/multi-laundries',
    get: (id: string) => `/multi-laundries/${id}`,
    update: (id: string) => `/multi-laundries/${id}`,
    delete: (id: string) => `/multi-laundries/${id}`,
    stats: '/multi-laundries/stats',
  },

  // Operators
  operators: {
    list: '/operator/admin/all',
    create: '/operator/create-operator',
    get: (id: string) => `/operator/${id}`,
    update: (id: string) => `/users/update/${id}`,
    delete: (id: string) => `/operator/${id}`,
    byLaundry: (laundryId: string) => `/operator/laundry/${laundryId}`,
  },

  // Clients
  clients: {
    list: '/client',
    create: '/client',
    get: (id: string) => `/client/${id}`,
    update: (id: string) => `/client/${id}`,
    delete: (id: string) => `/client/${id}`,
    search: '/client/search',
    getByPhone: (laundryId: string, phone: string) =>
      `/client/phone/${laundryId}/${phone}`,
  },

  // Orders
  orders: {
    list: '/order',
    get: (id: string) => `/order/${id}`,
    update: (id: string) => `/order/${id}`,
    delete: (id: string) => `/order/${id}`,
    create: '/order', // For generic order creation
    createOrder: (laundryId: string) => `/order/${laundryId}`,
    byLaundry: (laundryId: string) => `/order/laundry/${laundryId}`,
    byClient: (clientId: string) => `/order/client/${clientId}`,
    stats: (laundryId: string) => `/order/stats/${laundryId}`,
    dayAnalytics: (laundryId: string) => `/order/day-analytics/${laundryId}`,
    updateStatus: (id: string) => `/order/${id}/status`,
  },

  // Services
  services: {
    list: '/service',
    create: '/service',
    get: (id: string) => `/service/${id}`,
    update: (id: string) => `/service/${id}`,
    delete: (id: string) => `/service/${id}`,
    byLaundry: (laundryId: string) => `/service/laundry/${laundryId}`,
  },

  // Reports
  reports: {
    dashboard: '/reports/dashboard',
    sales: '/reports/sales',
    revenue: '/reports/revenue',
    orders: '/reports/orders',
    clients: '/reports/clients',
    operators: '/reports/operators',
    custom: '/reports/custom',
  },
} as const

export type Endpoints = typeof endpoints
