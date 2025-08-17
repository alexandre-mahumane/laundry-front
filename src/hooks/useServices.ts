import { useState, useCallback } from 'react'
import apiClient from '../api/client'
import { endpoints } from '../api/endpoints'
import { useLaundryId } from '../store/useLaundryStore'
import type { Service } from '../types'

interface UseServicesReturn {
  services: Service[]
  loading: boolean
  error: string | null
  fetchServicesByLaundry: () => Promise<void>
}

export function useServices(): UseServicesReturn {
  const laundryId = useLaundryId()

  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchServicesByLaundry = useCallback(async () => {
    if (!laundryId) {
      setError('Laundry ID não disponível')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const url = endpoints.services.byLaundry(laundryId)
      const response = await apiClient.get<Service[]>(url)
      setServices(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar serviços'
      setError(message)
      console.error('Erro ao carregar serviços:', err)
      setServices([])
    } finally {
      setLoading(false)
    }
  }, [laundryId])

  return {
    services,
    loading,
    error,
    fetchServicesByLaundry,
  }
}
