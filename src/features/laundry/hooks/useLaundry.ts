import { useState, useCallback } from 'react'
import { api } from '../../../api/client'
import { endpoints } from '../../../api/endpoints'
import type { Laundry, CreateLaundryData, PaginatedResponse } from '../../../types'

/**
 * Custom hook for Laundry operations
 */

export function useLaundry() {
  const [laundries, setLaundries] = useState<Laundry[]>([])
  const [currentLaundry, setCurrentLaundry] = useState<Laundry | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all laundries
  const fetchLaundries = useCallback(async (params?: { page?: number; limit?: number }) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.get<PaginatedResponse<Laundry>>(endpoints.laundry.list, {
        params,
      })
      
      setLaundries(response.data.data)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar lavandarias'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch single laundry
  const fetchLaundry = useCallback(async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.get<Laundry>(endpoints.laundry.get(id))
      
      setCurrentLaundry(response.data)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar lavandaria'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Create laundry
  const createLaundry = useCallback(async (data: CreateLaundryData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.post<Laundry>(endpoints.laundry.create, data)
      
      setLaundries((prev) => [...prev, response.data])
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao criar lavandaria'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update laundry
  const updateLaundry = useCallback(async (id: string, data: Partial<CreateLaundryData>) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.put<Laundry>(endpoints.laundry.update(id), data)
      
      setLaundries((prev) =>
        prev.map((laundry) => (laundry.id === id ? response.data : laundry))
      )
      
      if (currentLaundry?.id === id) {
        setCurrentLaundry(response.data)
      }
      
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao atualizar lavandaria'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [currentLaundry])

  // Delete laundry
  const deleteLaundry = useCallback(async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      await api.delete(endpoints.laundry.delete(id))
      
      setLaundries((prev) => prev.filter((laundry) => laundry.id !== id))
      
      if (currentLaundry?.id === id) {
        setCurrentLaundry(null)
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao deletar lavandaria'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [currentLaundry])

  // Fetch laundry stats
  const fetchLaundryStats = useCallback(async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.get(endpoints.laundry.stats(id))
      
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar estatísticas'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    laundries,
    currentLaundry,
    isLoading,
    error,
    fetchLaundries,
    fetchLaundry,
    createLaundry,
    updateLaundry,
    deleteLaundry,
    fetchLaundryStats,
  }
}
