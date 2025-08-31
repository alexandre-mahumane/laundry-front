/**
 * Reports Types
 * Type definitions for reports and analytics data
 */

// Top Clients
export interface TopClient {
  clientId: string
  clientName: string
  totalSpent: string // string currency value
  totalOrders: string // string number
}

export interface TopClientWithPercentage extends TopClient {
  percentage: number // percentage of total spent
  rank: number // ranking position (1, 2, 3, ...)
}

// Top Services
export interface TopService {
  serviceId: string
  serviceName: string
  price: number
  totalRequests: string // string number
  totalGain: string // string currency value
}

export interface TopServiceWithPercentage extends TopService {
  percentage: number // percentage of total requests/gain
  usagePercentage: number // percentage of total service usage
}

// Card Metrics
export interface CardMetrics {
  total_services: string // string number
  new_clients: string // string number
  total_gain: string // string currency value
  total_services_not_paid: string // string number
  total_services_paid: string // string number
}

export interface CardMetricsCalculated extends CardMetrics {
  totalGainNumber: number
  totalServicesNumber: number
  newClientsNumber: number
  totalNotPaidNumber: number
  totalPaidNumber: number
  averageTicket: number // average value per service
  paidPercentage: number // percentage of services paid
  notPaidPercentage: number // percentage of services not paid
}

// Period Comparison
export interface PeriodComparison {
  currentPeriod: number
  previousPeriod: number
  growth: number // percentage growth
  growthPercentage: string // formatted growth percentage with sign
}

// Reports Response
export interface ReportsData {
  topClients: TopClientWithPercentage[]
  topServices: TopServiceWithPercentage[]
  cardMetrics: CardMetricsCalculated
  comparisons: {
    gains: PeriodComparison
    services: PeriodComparison
    clients: PeriodComparison
  }
}

// API Response types (raw from backend)
export type TopClientsResponse = TopClient[]
export type TopServicesResponse = TopService[]
export type CardMetricsResponse = CardMetrics
