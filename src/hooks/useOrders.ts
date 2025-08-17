import { useState, useCallback } from 'react'
import apiClient from '../api/client'
import { endpoints } from '../api/endpoints'
import { useLaundryId, useOperatorId } from '../store/useLaundryStore'
import type { Order, CreateOrderData, PaginatedOrderResponse } from '../types'

interface UseOrdersReturn {
  orders: Order[]
  loading: boolean
  error: string | null
  totalPages: number
  currentPage: number
  totalItems: number
  fetchOrdersByLaundry: (page?: number, filters?: OrderFilters) => Promise<void>
  createOrder: (data: CreateOrderData) => Promise<Order | null>
  updateOrderStatus: (
    orderId: string,
    status: string,
    fullOrder?: Order
  ) => Promise<boolean>
  deleteOrder: (orderId: string) => Promise<boolean>
}

export interface OrderFilters {
  status?: string
  paymentStatus?: string
  phone?: string
  startDate?: string
  endDate?: string
  orderNumber?: string
}

export function useOrders(): UseOrdersReturn {
  const laundryId = useLaundryId()
  const operatorId = useOperatorId()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const fetchOrdersByLaundry = useCallback(
    async (page = 1, filters?: OrderFilters) => {
      if (!laundryId) {
        setError('Laundry ID não disponível')
        return
      }

      try {
        setLoading(true)
        setError(null)

        // Build URL with query parameters
        const params = new URLSearchParams()
        params.append('page', page.toString())
        params.append('limit', '10')

        if (filters?.status) params.append('status', filters.status)
        if (filters?.paymentStatus)
          params.append('paymentStatus', filters.paymentStatus)
        if (filters?.phone) params.append('phone', filters.phone)
        if (filters?.startDate) params.append('startDate', filters.startDate)
        if (filters?.endDate) params.append('endDate', filters.endDate)
        if (filters?.orderNumber)
          params.append('orderNumber', filters.orderNumber)

        const url = `${endpoints.orders.byLaundry(
          laundryId
        )}?${params.toString()}`
        const response = await apiClient.get<PaginatedOrderResponse>(url)
        setOrders(response.data.data)
        setTotalPages(response.data.totalPages)
        setCurrentPage(response.data.currentPage)
        setTotalItems(response.data.totalItems)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao carregar pedidos'
        setError(message)
        console.error('Erro ao carregar pedidos:', err)
      } finally {
        setLoading(false)
      }
    },
    [laundryId]
  )

  const createOrder = useCallback(
    async (data: CreateOrderData): Promise<Order | null> => {
      console.log('🎯 createOrder called with data:', data)
      console.log('📍 laundryId:', laundryId)
      console.log('📍 operatorId:', operatorId)

      if (!laundryId) {
        const errorMsg = `Laundry ID (${laundryId})  não disponível`
        setError(errorMsg)
        console.error('❌', errorMsg)
        return null
      }

      try {
        setLoading(true)
        setError(null)
        const url = endpoints.orders.createOrder(laundryId)
        console.log('🚀 Posting to URL:', url)
        const response = await apiClient.post<Order>(url, data)
        console.log('✅ Order created successfully:', response.data)
        return response.data
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao criar pedido'
        setError(message)
        console.error('❌ Erro ao criar pedido:', err)
        return null
      } finally {
        setLoading(false)
      }
    },
    [laundryId, operatorId]
  )

  const updateOrderStatus = useCallback(
    async (
      orderId: string,
      status: string,
      fullOrder?: Order
    ): Promise<boolean> => {
      try {
        setLoading(true)
        setError(null)
        const url = endpoints.orders.update(orderId)

        // Backend accepts status and paymentStatus updates
        // Send the same format as creation
        const payload = fullOrder
          ? {
              client: {
                name: fullOrder.client?.name || '',
                phone: fullOrder.client?.phone || '',
              },
              order: {
                description: fullOrder.description,
                serviceTypeId: fullOrder.services?.map((s) => s.id) || [],
                paymentStatus: fullOrder.payment_status, // Can now be updated
                status: status, // Order status
              },
            }
          : { status }

        await apiClient.put(url, payload)
        return true
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao atualizar pedido'
        setError(message)
        console.error('Erro ao atualizar pedido:', err)
        return false
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const deleteOrder = useCallback(async (orderId: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      const url = endpoints.orders.delete(orderId)
      await apiClient.delete(url)
      setOrders((prev) => prev.filter((o) => o.id !== orderId))
      return true
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao deletar pedido'
      setError(message)
      console.error('Erro ao deletar pedido:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    orders,
    loading,
    error,
    totalPages,
    currentPage,
    totalItems,
    fetchOrdersByLaundry,
    createOrder,
    updateOrderStatus,
    deleteOrder,
  }
}
