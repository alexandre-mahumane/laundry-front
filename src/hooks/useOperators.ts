import { useState, useCallback } from 'react'
import apiClient from '../api/client'
import { endpoints } from '../api/endpoints'
import type { Operator } from '../types'

interface UseOperatorsReturn {
  operators: Operator[]
  operator: Operator | null
  loading: boolean
  error: string | null
  fetchAll: () => Promise<Operator[]>
  create: (data: CreateOperatorPayload) => Promise<Operator | null>
  update: (id: string, data: UpdateOperatorPayload) => Promise<Operator | null>
  delete: (id: string) => Promise<boolean>
}

export interface CreateOperatorPayload {
  username: string
  email: string
  phone: string
  password: string
  status?: string
  role?: string
  adminType?: string
}

export interface UpdateOperatorPayload {
  username?: string
  email?: string
  phone?: string
  status?: string
  role?: string
  adminType?: string
}

export function useOperators(): UseOperatorsReturn {
  const [operators, setOperators] = useState<Operator[]>([])
  const [operator, setOperator] = useState<Operator | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async (): Promise<Operator[]> => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.get<Operator[]>(endpoints.operators.list)
      setOperators(response.data)
      return response.data
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao buscar operadores'
      setError(errorMessage)
      console.error('Erro ao buscar operadores:', err)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const create = useCallback(
    async (data: CreateOperatorPayload): Promise<Operator | null> => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiClient.post<Operator>(
          endpoints.operators.create,
          data
        )
        const newOperator = response.data
        setOperators((prev) => [...prev, newOperator])
        return newOperator
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao criar operador'
        setError(errorMessage)
        console.error('Erro ao criar operador:', err)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const update = useCallback(
    async (
      id: string,
      data: UpdateOperatorPayload
    ): Promise<Operator | null> => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiClient.put<Operator>(
          endpoints.operators.update(id),
          data
        )
        const updatedOperator = response.data
        setOperators((prev) =>
          prev.map((op) => (op.id === id ? updatedOperator : op))
        )
        setOperator(updatedOperator)
        return updatedOperator
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao atualizar operador'
        setError(errorMessage)
        console.error('Erro ao atualizar operador:', err)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const deleteOperator = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      await apiClient.delete(endpoints.operators.delete(id))
      setOperators((prev) => prev.filter((op) => op.id !== id))
      return true
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao deletar operador'
      setError(errorMessage)
      console.error('Erro ao deletar operador:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    operators,
    operator,
    loading,
    error,
    fetchAll,
    create,
    update,
    delete: deleteOperator,
  }
}
