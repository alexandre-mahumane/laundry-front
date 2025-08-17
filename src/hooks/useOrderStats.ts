import { useState, useCallback } from 'react'
import apiClient from '../api/client'
import { endpoints } from '../api/endpoints'
import { useLaundryId } from '../store/useLaundryStore'
import type { OrderStatsResponse } from '../types'

interface UseOrderStatsReturn {
  stats: OrderStatsResponse | null
  loading: boolean
  error: string | null
  fetchStats: () => Promise<void>
}

export function useOrderStats(): UseOrderStatsReturn {
  const laundryId = useLaundryId()

  const [stats, setStats] = useState<OrderStatsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    if (!laundryId) {
      setError('Laundry ID não disponível')
      return
    }

    try {
      setLoading(true)
      setError(null)
      // TODO: Endpoint /order/stats/{laundryId} precisa ser implementado no backend
      // Por enquanto, usando /laundry/{id}/stats como alternativa
      const url = endpoints.laundry.stats(laundryId)
      const response = await apiClient.get<OrderStatsResponse>(url)
      setStats(response.data)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar estatísticas'
      setError(message)
      console.error('Erro ao carregar estatísticas:', err)
    } finally {
      setLoading(false)
    }
  }, [laundryId])

  return {
    stats,
    loading,
    error,
    fetchStats,
  }
}
