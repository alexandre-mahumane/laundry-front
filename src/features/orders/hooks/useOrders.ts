import { useState, useCallback } from 'react'
import { api } from '../../../api/client'
import { endpoints } from '../../../api/endpoints'
import type { Order, CreateOrderData, PaginatedResponse, OrderStatus } from '../../../types'

/**
 * Custom hook for Order operations
 */

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all orders
  const fetchOrders = useCallback(async (params?: { 
    page?: number
    limit?: number
    status?: OrderStatus
    laundryId?: string
  }) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.get<PaginatedResponse<Order>>(endpoints.orders.list, {
        params,
      })
      
      setOrders(response.data.data)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar pedidos'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch single order
  const fetchOrder = useCallback(async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.get<Order>(endpoints.orders.get(id))
      
      setCurrentOrder(response.data)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar pedido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Create order
  const createOrder = useCallback(async (data: CreateOrderData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.post<Order>(endpoints.orders.create, data)
      
      setOrders((prev) => [response.data, ...prev])
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao criar pedido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update order
  const updateOrder = useCallback(async (id: string, data: Partial<CreateOrderData>) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.put<Order>(endpoints.orders.update(id), data)
      
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? response.data : order))
      )
      
      if (currentOrder?.id === id) {
        setCurrentOrder(response.data)
      }
      
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao atualizar pedido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [currentOrder])

  // Update order status
  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.patch<Order>(endpoints.orders.updateStatus(id), { status })
      
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? response.data : order))
      )
      
      if (currentOrder?.id === id) {
        setCurrentOrder(response.data)
      }
      
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao atualizar status'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [currentOrder])

  // Delete order
  const deleteOrder = useCallback(async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      await api.delete(endpoints.orders.delete(id))
      
      setOrders((prev) => prev.filter((order) => order.id !== id))
      
      if (currentOrder?.id === id) {
        setCurrentOrder(null)
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao deletar pedido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [currentOrder])

  // Fetch orders by laundry
  const fetchOrdersByLaundry = useCallback(async (laundryId: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.get<Order[]>(endpoints.orders.byLaundry(laundryId))
      
      setOrders(response.data)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar pedidos'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    orders,
    currentOrder,
    isLoading,
    error,
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    fetchOrdersByLaundry,
  }
}
