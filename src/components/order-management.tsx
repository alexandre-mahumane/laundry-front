'use client'

import { useState, useEffect, useMemo } from 'react'
import { useOrders } from '../hooks/useOrders'
import { useClients } from '../hooks/useClients'
import { useServices } from '../hooks/useServices'
import { useOrderStats } from '../hooks/useOrderStats'
import { useLaundryId } from '../store/useLaundryStore'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Search, Receipt, Eye, Loader, AlertCircle } from 'lucide-react'
import type { Order } from '../types'
import { PaymentStatus } from '../types'

export function OrderManagement() {
  // 🔥 Get laundryId from Zustand store
  const laundryId = useLaundryId()
  const [isHydrated, setIsHydrated] = useState(false)

  // Hooks
  const {
    orders,
    loading: ordersLoading,
    fetchOrdersByLaundry,
    createOrder,
    updateOrderStatus,
  } = useOrders()
  const { client, fetchClientByPhone } = useClients()
  const { services, fetchServicesByLaundry } = useServices()
  const { stats, fetchStats } = useOrderStats()

  // Form states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [clientPhone, setClientPhone] = useState('')
  const [clientName, setClientName] = useState('')
  const [searchingClient, setSearchingClient] = useState(false)
  const [clientNotFound, setClientNotFound] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [orderDescription, setOrderDescription] = useState('')
  const [paymentStatus, setPaymentStatus] = useState<string>(PaymentStatus.PAID)
  const [orderStatus, setOrderStatus] = useState<string>('in_processing')
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  // Order details states
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [newOrderStatus, setNewOrderStatus] = useState<string>('')
  const [newPaymentStatus, setNewPaymentStatus] = useState<string>('')
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  // Success modal
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [successType, setSuccessType] = useState<'create' | 'update'>('create')

  // Pagination and filters
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [searchOrderNumber, setSearchOrderNumber] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>('')
  const [filterPhone, setFilterPhone] = useState('')
  const [filterStartDate, setFilterStartDate] = useState<string>('')
  const [filterEndDate, setFilterEndDate] = useState<string>('')

  // Check when store is hydrated
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Load initial data when laundryId changes
  useEffect(() => {
    if (isHydrated && laundryId) {
      fetchOrdersByLaundry(1)
      fetchServicesByLaundry()
      fetchStats()
    }
  }, [
    isHydrated,
    laundryId,
    fetchOrdersByLaundry,
    fetchServicesByLaundry,
    fetchStats,
  ])

  // Load filtered data when filters change
  useEffect(() => {
    if (isHydrated && laundryId) {
      const filters = {
        status: filterStatus || undefined,
        paymentStatus: filterPaymentStatus || undefined,
        phone: filterPhone || undefined,
        startDate: filterStartDate || undefined,
        endDate: filterEndDate || undefined,
        orderNumber: searchOrderNumber || undefined,
      }

      // Remove undefined values
      Object.keys(filters).forEach(
        (key) =>
          filters[key as keyof typeof filters] === undefined &&
          delete filters[key as keyof typeof filters]
      )

      fetchOrdersByLaundry(currentPage, filters)
    }
  }, [
    isHydrated,
    laundryId,
    filterStatus,
    filterPaymentStatus,
    filterPhone,
    filterStartDate,
    filterEndDate,
    searchOrderNumber,
    currentPage,
    fetchOrdersByLaundry,
  ])

  // Search client by phone
  const handleSearchClient = async () => {
    if (!clientPhone.trim()) return

    setSearchingClient(true)
    setClientNotFound(false)
    const foundClient = await fetchClientByPhone(clientPhone)

    if (foundClient) {
      setClientName(foundClient.name)
      setClientNotFound(false)
    } else {
      setClientName('')
      setClientNotFound(true)
    }
    setSearchingClient(false)
  }

  const handleCreateOrder = async () => {
    if (!clientPhone || !clientName || selectedServices.length === 0) {
      setCreateError('Preencha todos os campos obrigatórios')
      return
    }

    if (!laundryId) {
      setCreateError('Laundry ID não disponível')
      return
    }

    setIsCreatingOrder(true)
    setCreateError(null)

    const orderData = {
      client: {
        name: clientName,
        phone: clientPhone,
      },
      order: {
        description: orderDescription,
        serviceTypeId: selectedServices,
        paymentStatus: paymentStatus as PaymentStatus,
        status: orderStatus as Order['status'],
      },
    }

    // 🔥 Call createOrder without laundryId and operatorId (they come from Zustand)
    console.log('Creating order with data:', orderData)
    const result = await createOrder(orderData)

    console.log('Order creation result:', result)
    if (result) {
      // Reset form
      setClientPhone('')
      setClientName('')
      setSelectedServices([])
      setOrderDescription('')
      setPaymentStatus(PaymentStatus.PAID)
      setOrderStatus('pending')
      setIsAddDialogOpen(false)

      // Show success modal
      setSuccessType('create')
      setSuccessMessage(`Pedido #${result.order_number} criado com sucesso!`)
      setIsSuccessOpen(true)

      // Reset filters and page to refresh the list
      setSearchOrderNumber('')
      setFilterStatus('')
      setFilterPaymentStatus('')
      setFilterPhone('')
      setFilterStartDate('')
      setFilterEndDate('')
      setCurrentPage(1)
      fetchStats()
    } else {
      setCreateError('Erro ao criar pedido. Tente novamente.')
    }

    setIsCreatingOrder(false)
  }

  const handleUpdateOrderStatus = async () => {
    if (!selectedOrder || !newOrderStatus) return

    setIsUpdatingStatus(true)

    // Create updated order with new status and payment status
    const updatedOrder = {
      ...selectedOrder,
      payment_status: (newPaymentStatus ||
        selectedOrder.payment_status) as PaymentStatus,
    }

    const success = await updateOrderStatus(
      selectedOrder.id,
      newOrderStatus,
      updatedOrder
    )

    if (success) {
      // Update selected order
      setSelectedOrder({
        ...selectedOrder,
        status: newOrderStatus as Order['status'],
        payment_status: (newPaymentStatus ||
          selectedOrder.payment_status) as PaymentStatus,
      })

      // Show success modal
      setSuccessType('update')
      setSuccessMessage(
        `Pedido #${selectedOrder.order_number} atualizado com sucesso!`
      )
      setIsSuccessOpen(true)

      // Close details dialog
      setIsOrderDetailsOpen(false)

      // Refresh list - the useEffect will handle it when currentPage changes
      setCurrentPage(1)
      fetchStats()
    }

    setIsUpdatingStatus(false)
  }

  // Helper functions
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'in_processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'ready':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'not_paid':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const statusLabels: Record<string, string> = {
    in_processing: 'Em Processamento',
    ready: 'Pronto',
    delivered: 'Entregue',
  }

  const paymentStatusLabels: Record<string, string> = {
    paid: 'Pago',
    not_paid: 'Pendente',
  }

  const totalValue = useMemo(() => {
    return orders.reduce((sum, order) => {
      const value =
        typeof order.value === 'string' ? parseFloat(order.value) : order.value
      return sum + (isNaN(value) ? 0 : value)
    }, 0)
  }, [orders])

  return (
    <div className="p-6 space-y-6">
      {/* Show loading while store is hydrating or laundryId is not available */}
      {!isHydrated || !laundryId ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="w-8 h-8 animate-spin text-gray-400 mb-4" />
          <p className="text-gray-600">Carregando dados da lavandaria...</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Pedidos
              </h1>
              <p className="text-gray-600 mt-2">
                Registrar e acompanhar pedidos
              </p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Pedido
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Registrar Novo Pedido</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do pedido
                  </DialogDescription>
                </DialogHeader>

                {createError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md">
                    <AlertCircle className="w-4 h-4" />
                    <span>{createError}</span>
                  </div>
                )}

                <div className="grid gap-6 py-4">
                  {/* Cliente */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Dados do Cliente
                    </h3>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="client-phone">Número de Telefone</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id="client-phone"
                            placeholder="Ex: 8991234567"
                            value={clientPhone}
                            onChange={(e) => {
                              setClientPhone(e.target.value)
                              setClientNotFound(false)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSearchClient()
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleSearchClient}
                            disabled={searchingClient}
                          >
                            {searchingClient ? (
                              <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                              <Search className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {clientNotFound && clientPhone && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-800 font-medium mb-3">
                          Cliente não encontrado. Crie um novo cliente.
                        </p>
                        <div>
                          <Label htmlFor="new-client-name">
                            Nome do Cliente
                          </Label>
                          <Input
                            id="new-client-name"
                            placeholder="Nome completo"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}

                    {client && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-800">
                          <span className="font-semibold">
                            Cliente encontrado:
                          </span>{' '}
                          {client.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Serviços */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Serviços
                    </h3>
                    {services.length > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-3">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              id={service.id}
                              checked={selectedServices.includes(service.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedServices([
                                    ...selectedServices,
                                    service.id,
                                  ])
                                } else {
                                  setSelectedServices(
                                    selectedServices.filter(
                                      (id) => id !== service.id
                                    )
                                  )
                                }
                              }}
                            />
                            <label
                              htmlFor={service.id}
                              className="flex-1 cursor-pointer flex items-center justify-between"
                            >
                              <span>{service.name}</span>
                              <span className="text-sm text-gray-500">
                                {service.price} MT
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 text-gray-600 rounded-md text-sm">
                        Nenhum serviço disponível para esta lavandaria
                      </div>
                    )}
                  </div>

                  {/* Descrição */}
                  <div className="space-y-2">
                    <Label htmlFor="order-description">
                      Descrição do Pedido
                    </Label>
                    <Textarea
                      id="order-description"
                      placeholder="Ex: 2 camisetas brancas, 1 calça jeans..."
                      value={orderDescription}
                      onChange={(e) => setOrderDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="payment-status">
                        Status de Pagamento
                      </Label>
                      <Select
                        value={paymentStatus}
                        onValueChange={setPaymentStatus}
                      >
                        <SelectTrigger id="payment-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={PaymentStatus.PAID}>
                            Pago
                          </SelectItem>
                          <SelectItem value={PaymentStatus.NOT_PAID}>
                            Não Pago
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="order-status">Status do Pedido</Label>
                      <Select
                        value={orderStatus}
                        onValueChange={setOrderStatus}
                      >
                        <SelectTrigger id="order-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="in_processing">
                            Em Processamento
                          </SelectItem>
                          <SelectItem value="ready">Pronto</SelectItem>
                          <SelectItem value="delivered">Entregue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCreateOrder}
                    disabled={isCreatingOrder}
                  >
                    {isCreatingOrder ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      'Registrar Pedido'
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Recebido</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stats?.totalReceived ?? 0} MT
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Em Processamento</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stats?.totalServiceInProgress ?? 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pronto</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stats?.totalServiceInReady ?? 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Valor Total</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {totalValue.toFixed(2)} MT
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}

          {/* Orders Table */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Lista de Pedidos</CardTitle>
              <CardDescription>
                {ordersLoading
                  ? 'Carregando...'
                  : `Total: ${orders.length} pedidos`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div>
                  <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Search by Order Number */}
                      <div className="space-y-2">
                        <Label htmlFor="search-order">Nº Pedido</Label>
                        <Input
                          id="search-order"
                          placeholder="Buscar por número..."
                          value={searchOrderNumber}
                          onChange={(e) => {
                            setSearchOrderNumber(e.target.value)
                            setCurrentPage(1)
                          }}
                        />
                      </div>

                      {/* Filter by Status */}
                      <div className="space-y-2">
                        <Label htmlFor="filter-status">Status</Label>
                        <Select
                          value={filterStatus}
                          onValueChange={(val) => {
                            setFilterStatus(val)
                            setCurrentPage(1)
                          }}
                        >
                          <SelectTrigger id="filter-status">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in_processing">
                              Em Processamento
                            </SelectItem>
                            <SelectItem value="ready">Pronto</SelectItem>
                            <SelectItem value="delivered">Entregue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Filter by Payment Status */}
                      <div className="space-y-2">
                        <Label htmlFor="filter-payment">Pagamento</Label>
                        <Select
                          value={filterPaymentStatus}
                          onValueChange={(val) => {
                            setFilterPaymentStatus(val)
                            setCurrentPage(1)
                          }}
                        >
                          <SelectTrigger id="filter-payment">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paid">Pago</SelectItem>
                            <SelectItem value="not_paid">Não Pago</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Filter by Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="filter-phone">Telefone Cliente</Label>
                        <Input
                          id="filter-phone"
                          placeholder="Ex: 8991234567"
                          value={filterPhone}
                          onChange={(e) => {
                            setFilterPhone(e.target.value)
                            setCurrentPage(1)
                          }}
                        />
                      </div>

                      {/* Filter by Start Date */}
                      <div className="space-y-2">
                        <Label htmlFor="filter-start">Data Inicial</Label>
                        <Input
                          id="filter-start"
                          type="date"
                          value={filterStartDate}
                          onChange={(e) => {
                            setFilterStartDate(e.target.value)
                            setCurrentPage(1)
                          }}
                        />
                      </div>

                      {/* Filter by End Date */}
                      <div className="space-y-2">
                        <Label htmlFor="filter-end">Data Final</Label>
                        <Input
                          id="filter-end"
                          type="date"
                          value={filterEndDate}
                          onChange={(e) => {
                            setFilterEndDate(e.target.value)
                            setCurrentPage(1)
                          }}
                        />
                      </div>

                      {/* Clear Filters Button */}
                      <div className="flex items-end">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setSearchOrderNumber('')
                            setFilterStatus('')
                            setFilterPaymentStatus('')
                            setFilterPhone('')
                            setFilterStartDate('')
                            setFilterEndDate('')
                            setCurrentPage(1)
                          }}
                        >
                          Limpar Filtros
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {ordersLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum pedido encontrado. Crie um novo pedido para começar.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nº Pedido</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pagamento</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.order_number}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {order.client?.name || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.client?.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {order.description}
                        </TableCell>
                        <TableCell>
                          {typeof order.value === 'string'
                            ? parseFloat(order.value)
                            : order.value}{' '}
                          MT
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(order.status)}>
                            {statusLabels[order.status] || order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getPaymentStatusBadgeColor(
                              order.payment_status
                            )}
                          >
                            {paymentStatusLabels[order.payment_status] ||
                              order.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(order.order_date).toLocaleDateString(
                            'pt-PT'
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order)
                              setNewOrderStatus(order.status)
                              setNewPaymentStatus(order.payment_status)
                              setIsOrderDetailsOpen(true)
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {/* Pagination */}
              {!ordersLoading && orders.length > 0 && (
                <div className="flex items-center justify-between py-4 border-t">
                  <div className="text-sm text-gray-600">
                    Página <span className="font-semibold">{currentPage}</span>{' '}
                    • Exibindo{' '}
                    <span className="font-semibold">
                      {Math.min(pageSize, orders.length)}
                    </span>{' '}
                    de <span className="font-semibold">{orders.length}</span>{' '}
                    pedidos
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      ← Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={orders.length < pageSize}
                    >
                      Próxima →
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details Dialog */}
          <Dialog
            open={isOrderDetailsOpen}
            onOpenChange={setIsOrderDetailsOpen}
          >
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Detalhes do Pedido {selectedOrder?.order_number}
                </DialogTitle>
                <DialogDescription>
                  Informações completas do pedido
                </DialogDescription>
              </DialogHeader>

              {selectedOrder && (
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600">Nº Pedido</Label>
                      <p className="font-semibold mt-1">
                        {selectedOrder.order_number}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Data</Label>
                      <p className="font-semibold mt-1">
                        {new Date(selectedOrder.order_date).toLocaleDateString(
                          'pt-PT'
                        )}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Cliente</Label>
                      <p className="font-semibold mt-1">
                        {selectedOrder.client?.name}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Telefone</Label>
                      <p className="font-semibold mt-1">
                        {selectedOrder.client?.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-600">Descrição</Label>
                    <p className="font-semibold mt-1">
                      {selectedOrder.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-600">Serviços</Label>
                    <div className="space-y-1">
                      {selectedOrder.services?.map((service) => (
                        <div
                          key={service.id}
                          className="text-sm flex justify-between p-2 bg-gray-50 rounded"
                        >
                          <span>{service.name}</span>
                          <span className="font-medium">
                            {service.price} MT
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status-update">Atualizar Status</Label>
                    <Select
                      value={newOrderStatus}
                      onValueChange={setNewOrderStatus}
                    >
                      <SelectTrigger id="status-update">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in_processing">
                          Em Processamento
                        </SelectItem>
                        <SelectItem value="ready">Pronto</SelectItem>
                        <SelectItem value="delivered">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-status-update">
                      Status de Pagamento
                    </Label>
                    <Select
                      value={newPaymentStatus}
                      onValueChange={setNewPaymentStatus}
                    >
                      <SelectTrigger id="payment-status-update">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Pago</SelectItem>
                        <SelectItem value="not_paid">Não Pago</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-semibold">Valor Total:</span>
                    <span className="text-xl font-bold text-green-600">
                      {typeof selectedOrder.value === 'string'
                        ? parseFloat(selectedOrder.value)
                        : selectedOrder.value}{' '}
                      MT
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-semibold">Status de Pagamento:</span>
                    <Badge
                      className={getPaymentStatusBadgeColor(
                        selectedOrder.payment_status
                      )}
                    >
                      {paymentStatusLabels[selectedOrder.payment_status] ||
                        selectedOrder.payment_status}
                    </Badge>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsOrderDetailsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleUpdateOrderStatus}
                  disabled={
                    isUpdatingStatus ||
                    (newOrderStatus === selectedOrder?.status &&
                      newPaymentStatus === selectedOrder?.payment_status)
                  }
                >
                  {isUpdatingStatus ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    'Atualizar Status'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Success Modal */}
          <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
            <DialogContent className="sm:max-w-[400px] text-center">
              <div className="space-y-4 py-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {successType === 'create'
                      ? 'Pedido Criado!'
                      : 'Pedido Atualizado!'}
                  </h2>
                  <p className="text-gray-600 mt-2">{successMessage}</p>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => setIsSuccessOpen(false)}
                >
                  Fechar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}
