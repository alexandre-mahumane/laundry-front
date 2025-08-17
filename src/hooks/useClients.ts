import { useState, useCallback } from 'react'
import apiClient from '../api/client'
import { endpoints } from '../api/endpoints'
import { useLaundryId } from '../store/useLaundryStore'
import type { Client } from '../types'

interface UseClientsReturn {
  client: Client | null
  loading: boolean
  error: string | null
  fetchClientByPhone: (phone: string) => Promise<Client | null>
  createClient: (
    data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Client | null>
}

export function useClients(): UseClientsReturn {
  const laundryId = useLaundryId()

  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchClientByPhone = useCallback(
    async (phone: string): Promise<Client | null> => {
      if (!phone || !laundryId) {
        setClient(null)
        return null
      }

      try {
        setLoading(true)
        setError(null)
        const url = endpoints.clients.getByPhone(laundryId, phone)
        const response = await apiClient.get<Client>(url)
        setClient(response.data)
        return response.data
      } catch {
        setError(null) // Não é erro se o cliente não for encontrado
        setClient(null)
        console.log('Cliente não encontrado para este telefone')
        return null
      } finally {
        setLoading(false)
      }
    },
    [laundryId]
  )

  const createClient = useCallback(
    async (
      data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<Client | null> => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiClient.post<Client>(
          endpoints.clients.create,
          data
        )
        setClient(response.data)
        return response.data
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao criar cliente'
        setError(message)
        console.error('Erro ao criar cliente:', err)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    client,
    loading,
    error,
    fetchClientByPhone,
    createClient,
  }
}
