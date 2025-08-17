/**
 * Utility Functions
 * Common helper functions used across the application
 */

// ============================================
// Date & Time Utilities
// ============================================

export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const d = new Date(date)
  
  if (format === 'short') {
    return d.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }
  
  return d.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  
  return d.toLocaleString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatTime(date: string | Date): string {
  const d = new Date(date)
  
  return d.toLocaleTimeString('pt-PT', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getRelativeTime(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return 'agora mesmo'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `há ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`
  }
  
  return formatDate(date)
}

// ============================================
// Number & Currency Utilities
// ============================================

export function formatCurrency(amount: number, currency: string = 'MZN'): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-PT').format(num)
}

export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`
}

// ============================================
// String Utilities
// ============================================

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// ============================================
// Validation Utilities
// ============================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  // Mozambique phone format: +258 XX XXX XXXX or 8X XXX XXXX
  const phoneRegex = /^(\+258|258)?[8][2-7][0-9]{7}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function formatPhone(phone: string): string {
  // Format to: +258 XX XXX XXXX
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 9) {
    return `+258 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`
  }
  
  if (cleaned.length === 12 && cleaned.startsWith('258')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  
  return phone
}

// ============================================
// Array Utilities
// ============================================

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

// ============================================
// Status Utilities
// ============================================

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    // Order Status
    PENDING: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    READY: 'bg-green-100 text-green-800',
    DELIVERED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 text-red-800',
    
    // Payment Status
    PAID: 'bg-green-100 text-green-800',
    PARTIAL: 'bg-orange-100 text-orange-800',
    UNPAID: 'bg-red-100 text-red-800',
    
    // Laundry Status
    ACTIVE: 'bg-green-100 text-green-800',
    INACTIVE: 'bg-gray-100 text-gray-800',
    MAINTENANCE: 'bg-yellow-100 text-yellow-800',
  }
  
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

export function getStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    // Order Status
    PENDING: 'Pendente',
    IN_PROGRESS: 'Em Progresso',
    READY: 'Pronto',
    DELIVERED: 'Entregue',
    CANCELLED: 'Cancelado',
    
    // Payment Status
    PAID: 'Pago',
    PARTIAL: 'Parcial',
    UNPAID: 'Não Pago',
    
    // Laundry Status
    ACTIVE: 'Ativo',
    INACTIVE: 'Inativo',
    MAINTENANCE: 'Manutenção',
    
    // User Roles
    SUPER_ADMIN: 'Super Admin',
    MULTI_ADMIN: 'Admin Multi',
    SINGLE_ADMIN: 'Admin',
    OPERATOR: 'Operador',
  }
  
  return statusLabels[status] || status
}

// ============================================
// Local Storage Utilities
// ============================================

export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error)
    return defaultValue
  }
}

export function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error)
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error)
  }
}

// ============================================
// Debounce & Throttle
// ============================================

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
