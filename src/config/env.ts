/**
 * Environment configuration
 * Centralized environment variables management
 */

export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1',
  
  // App Configuration
  APP_NAME: 'Laundry Management System',
  APP_VERSION: '1.0.0',
  
  // Environment
  NODE_ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const

export type Env = typeof env
