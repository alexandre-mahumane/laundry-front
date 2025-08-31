/**
 * useReports Hook
 * Fetches and processes reports data from the API
 */

import { useCallback, useEffect, useState } from 'react'
import apiClient from '@/api/client'
import {
  type CardMetricsCalculated,
  type CardMetricsResponse,
  type PeriodComparison,
  type ReportsData,
  type TopClientWithPercentage,
  type TopServiceWithPercentage,
} from '@/types/reports'

interface UseReportsOptions {
  laundryId: string
  period?: 'today' | 'week' | 'month' | 'year'
  autoFetch?: boolean
}

interface UseReportsState {
  data: ReportsData | null
  loading: boolean
  error: Error | null
}

/**
 * Converts string currency to number
 */
function parseCurrency(value: string): number {
  // return parseFloat(value.replace(/[^0-9.-]/g, ''))

  return Number(value)
}

/**
 * Calculates percentage growth between two periods
 */
function calculateGrowth(current: number, previous: number): PeriodComparison {
  const growth = previous === 0 ? 0 : ((current - previous) / previous) * 100
  const sign = growth >= 0 ? '+' : ''

  return {
    currentPeriod: current,
    previousPeriod: previous,
    growth,
    growthPercentage: `${sign}${growth.toFixed(2)}%`,
  }
}

/**
 * Processes top clients data with percentage calculations
 */
function processTopClients(
  clients: Array<Record<string, unknown>>
): TopClientWithPercentage[] {
  const totalSpent = clients.reduce(
    (sum, client) => sum + parseCurrency(String(client.totalSpent || '0')),
    0
  )

  return clients.map((client, index) => {
    const spent = parseCurrency(String(client.totalSpent || '0'))
    const percentage = totalSpent === 0 ? 0 : (spent / totalSpent) * 100

    return {
      clientId: String(client.clientId || ''),
      clientName: String(client.clientName || ''),
      totalSpent: String(client.totalSpent || '0'),
      totalOrders: String(client.totalOrders || '0'),
      percentage: Math.round(percentage * 100) / 100,
      rank: index + 1,
    }
  })
}

/**
 * Processes top services data with percentage calculations
 */
function processTopServices(
  services: Array<Record<string, unknown>>
): TopServiceWithPercentage[] {
  const totalRequests = services.reduce(
    (sum, service) => sum + parseInt(String(service.totalRequests || '0')),
    0
  )

  return services.map((service) => {
    const requests = parseInt(String(service.totalRequests || '0'))
    const usagePercentage =
      totalRequests === 0 ? 0 : (requests / totalRequests) * 100

    return {
      serviceId: String(service.serviceId || ''),
      serviceName: String(service.serviceName || ''),
      price: Number(service.price || 0),
      totalRequests: String(service.totalRequests || '0'),
      totalGain: String(service.totalGain || '0'),
      percentage: Math.round(usagePercentage * 100) / 100,
      usagePercentage: Math.round(usagePercentage * 100) / 100,
    }
  })
}

/**
 * Processes card metrics with calculations
 */
function processCardMetrics(
  metrics: CardMetricsResponse
): CardMetricsCalculated {
  const totalServicesNumber = parseInt(metrics.total_services || '0')
  const newClientsNumber = parseInt(metrics.new_clients || '0')
  const totalGainNumber = parseCurrency(metrics.total_gain)
  const totalNotPaidNumber = parseInt(metrics.total_services_not_paid || '0')
  const totalPaidNumber = parseInt(metrics.total_services_paid || '0')

  const averageTicket =
    totalServicesNumber === 0 ? 0 : totalGainNumber / totalServicesNumber

  const totalServices = totalNotPaidNumber + totalPaidNumber
  const paidPercentage =
    totalServices === 0 ? 0 : (totalPaidNumber / totalServices) * 100
  const notPaidPercentage = 100 - paidPercentage

  return {
    ...metrics,
    totalServicesNumber,
    newClientsNumber,
    totalGainNumber,
    totalNotPaidNumber,
    totalPaidNumber,
    averageTicket: Math.round(averageTicket * 100) / 100,
    paidPercentage: Math.round(paidPercentage * 100) / 100,
    notPaidPercentage: Math.round(notPaidPercentage * 100) / 100,
  }
}

export function useReports(
  options: UseReportsOptions
): UseReportsState & { refetch: () => Promise<void> } {
  const [data, setData] = useState<ReportsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { laundryId, autoFetch = true } = options

  const fetchReports = useCallback(async () => {
    if (!laundryId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Fetch top clients
      const clientsResponse = await apiClient.get(
        `/reports/top/clients/month/${laundryId}`
      )
      // Fetch top services
      const servicesResponse = await apiClient.get(
        `/reports/top/services/${laundryId}`
      )

      console.log('ppp', { servicesResponse })
      // Fetch card metrics
      const metricsResponse = await apiClient.get(
        `/reports/this-month-analytics/${laundryId}`
      )

      // Process data
      const processedClients = processTopClients(clientsResponse.data || [])
      const processedServices = processTopServices(servicesResponse.data || [])
      const processedMetrics = processCardMetrics(
        metricsResponse.data || {
          total_services: '0',
          new_clients: '0',
          total_gain: '0',
          total_services_not_paid: '0',
          total_services_paid: '0',
        }
      )
      console.log('mm', { metricsResponse })
      // TODO: Add period comparison calculations
      // These would require fetching previous period data
      const comparisons = {
        gains: calculateGrowth(
          processedMetrics.totalGainNumber,
          0 // Previous period value would come from API
        ),
        services: calculateGrowth(processedMetrics.totalServicesNumber, 0),
        clients: calculateGrowth(processedMetrics.newClientsNumber, 0),
      }
      console.log('dd', {
        topClients: processedClients,
        topServices: processedServices,
        cardMetrics: processedMetrics,
        comparisons,
      })
      setData({
        topClients: processedClients,
        topServices: processedServices,
        cardMetrics: processedMetrics,
        comparisons,
      })
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Failed to fetch reports')
      setError(error)
      console.error('Reports error:', error)
    } finally {
      setLoading(false)
    }
  }, [laundryId])

  useEffect(() => {
    if (autoFetch) {
      fetchReports()
    }
  }, [fetchReports, autoFetch])
  console.log({ data })
  return {
    data,
    loading,
    error,
    refetch: fetchReports,
  }
}
