import { useState } from 'react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Phone,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

export default function ClientPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [orderCode, setOrderCode] = useState('')
  const [clientOrders, setClientOrders] = useState<any[]>([])
  const [orderStatus, setOrderStatus] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)

  const mockClientOrders = [
    {
      id: 'PED-001',
      date: '2024-01-15',
      service: 'Lavagem + Passagem',
      items: ['2x Camisas', '1x Calças'],
      value: 15.5,
      status: 'Concluído',
      pickupDate: '2024-01-16',
    },
    {
      id: 'PED-002',
      date: '2024-01-10',
      service: 'Lavagem Simples',
      items: ['3x T-shirts'],
      value: 8.0,
      status: 'Retirado',
      pickupDate: '2024-01-11',
    },
    {
      id: 'PED-003',
      date: '2024-01-08',
      service: 'Lavagem + Secagem',
      items: ['1x Vestido', '2x Blusas'],
      value: 12.0,
      status: 'Retirado',
      pickupDate: '2024-01-09',
    },
  ]

  const searchByPhone = () => {
    if (phoneNumber === '+351 910 123 456') {
      setClientOrders(mockClientOrders)
      setShowResults(true)
    } else {
      setClientOrders([])
      setShowResults(true)
    }
  }

  const searchByOrderCode = () => {
    const order = mockClientOrders.find((o) => o.id === orderCode)
    if (order) {
      setOrderStatus(order)
    } else {
      setOrderStatus(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800'
      case 'Em Andamento':
        return 'bg-yellow-100 text-yellow-800'
      case 'Pendente':
        return 'bg-gray-100 text-gray-800'
      case 'Retirado':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Concluído':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'Em Andamento':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'Pendente':
        return <AlertCircle className="w-4 h-4 text-gray-600" />
      case 'Retirado':
        return <Package className="w-4 h-4 text-blue-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 -ml-72 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Lavandaria Norte
          </h1>
          <p className="text-gray-600">
            Consulte seus pedidos e acompanhe o status
          </p>
        </div>

        <Tabs defaultValue="extract" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="extract">Extrato de Pedidos</TabsTrigger>
            <TabsTrigger value="status">Status do Pedido</TabsTrigger>
          </TabsList>

          <TabsContent value="extract" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Consultar Pedidos por Telefone
                </CardTitle>
                <CardDescription>
                  Digite seu número de telefone para ver todos os seus pedidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="phone">Número de Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="+351 xxx xxx xxx"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <Button onClick={searchByPhone} className="mt-6">
                    <Search className="w-4 h-4 mr-2" />
                    Buscar
                  </Button>
                </div>

                {showResults && (
                  <div className="mt-6">
                    {clientOrders.length > 0 ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Seus Pedidos
                        </h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Código</TableHead>
                              <TableHead>Data</TableHead>
                              <TableHead>Serviço</TableHead>
                              <TableHead>Itens</TableHead>
                              <TableHead>Valor</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {clientOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">
                                  {order.id}
                                </TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.service}</TableCell>
                                <TableCell>
                                  <div className="text-sm">
                                    {order.items.map(
                                      (item: string, index: number) => (
                                        <div key={index}>{item}</div>
                                      )
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="font-semibold text-green-600">
                                  €{order.value.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={getStatusColor(order.status)}
                                  >
                                    <div className="flex items-center gap-1">
                                      {getStatusIcon(order.status)}
                                      {order.status}
                                    </div>
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">
                            Resumo
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-blue-700">
                                Total de Pedidos:
                              </span>
                              <span className="font-semibold ml-2">
                                {clientOrders.length}
                              </span>
                            </div>
                            <div>
                              <span className="text-blue-700">
                                Valor Total:
                              </span>
                              <span className="font-semibold ml-2 text-green-600">
                                €
                                {clientOrders
                                  .reduce((acc, order) => acc + order.value, 0)
                                  .toFixed(2)}
                              </span>
                            </div>
                            <div>
                              <span className="text-blue-700">
                                Último Pedido:
                              </span>
                              <span className="font-semibold ml-2">
                                {clientOrders[0]?.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Nenhum pedido encontrado
                        </h3>
                        <p className="text-gray-600">
                          Não encontramos pedidos para este número de telefone.
                          Verifique se digitou corretamente.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Consultar Status do Pedido
                </CardTitle>
                <CardDescription>
                  Digite o código do seu pedido para ver o status atual
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="order-code">Código do Pedido</Label>
                    <Input
                      id="order-code"
                      placeholder="Ex: PED-001"
                      value={orderCode}
                      onChange={(e) => setOrderCode(e.target.value)}
                    />
                  </div>
                  <Button onClick={searchByOrderCode} className="mt-6">
                    <Search className="w-4 h-4 mr-2" />
                    Consultar
                  </Button>
                </div>

                {orderStatus && (
                  <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Pedido {orderStatus.id}
                      </h3>
                      <Badge className={getStatusColor(orderStatus.status)}>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(orderStatus.status)}
                          {orderStatus.status}
                        </div>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">
                            Data do Pedido:
                          </span>
                          <p className="text-gray-900">{orderStatus.date}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">
                            Serviço:
                          </span>
                          <p className="text-gray-900">{orderStatus.service}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">
                            Valor:
                          </span>
                          <p className="text-green-600 font-semibold">
                            €{orderStatus.value.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">
                            Itens:
                          </span>
                          <div className="text-gray-900">
                            {orderStatus.items.map(
                              (item: string, index: number) => (
                                <div key={index}>• {item}</div>
                              )
                            )}
                          </div>
                        </div>
                        {orderStatus.pickupDate && (
                          <div>
                            <span className="text-sm font-medium text-gray-600">
                              Data de Retirada:
                            </span>
                            <p className="text-gray-900">
                              {orderStatus.pickupDate}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {orderStatus.status === 'Concluído' && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-900">
                            Pedido Pronto para Retirada!
                          </span>
                        </div>
                        <p className="text-sm text-green-700 mt-1">
                          Seu pedido está pronto e pode ser retirado na
                          lavandaria.
                        </p>
                      </div>
                    )}

                    {orderStatus.status === 'Em Andamento' && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-yellow-600" />
                          <span className="font-medium text-yellow-900">
                            Pedido em Processamento
                          </span>
                        </div>
                        <p className="text-sm text-yellow-700 mt-1">
                          Seu pedido está sendo processado. Você será notificado
                          quando estiver pronto.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {orderCode && !orderStatus && orderCode.length > 0 && (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Pedido não encontrado
                    </h3>
                    <p className="text-gray-600">
                      Não encontramos um pedido com este código. Verifique se
                      digitou corretamente.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 Lavandaria Norte - Rua das Flores, 123 - Lisboa</p>
          <p>Telefone: +351 210 123 456 | Email: norte@lavandaria.com</p>
        </div>
      </div>
    </div>
  )
}
