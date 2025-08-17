import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  ArrowLeft,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Edit,
  Plus,
} from 'lucide-react'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

interface LaundryDetailsProps {
  laundryId: string
  onBack: () => void
}

export function LaundryDetails({ laundryId, onBack }: LaundryDetailsProps) {
  // Mock data - em produção viria de uma API
  const laundry = {
    id: laundryId,
    name: 'Lavandaria Norte',
    location: 'Rua das Flores, 123 - Lisboa',
    phone: '+351 210 123 456',
    email: 'norte@lavandaria.com',
    status: 'Ativo',
    monthlyFee: 89.99,
    resources: {
      faturacao: true,
      sms: true,
      email: true,
    },
  }

  const stats = [
    {
      title: 'Usuários Ativos',
      value: '5',
      change: '+1 este mês',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Pedidos Este Mês',
      value: '234',
      change: '+18% vs mês anterior',
      icon: ShoppingCart,
      color: 'text-purple-600',
    },
    {
      title: 'Receita Mensal',
      value: '€3,456',
      change: '+12% vs mês anterior',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Ticket Médio',
      value: '€14.76',
      change: '+5% vs mês anterior',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ]

  const users = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@lavandaria.com',
      role: 'Admin',
      status: 'Ativo',
      lastLogin: '2024-01-15 14:30',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@lavandaria.com',
      role: 'Operador',
      status: 'Ativo',
      lastLogin: '2024-01-15 09:15',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@lavandaria.com',
      role: 'Operador',
      status: 'Inativo',
      lastLogin: '2024-01-10 16:45',
    },
  ]

  const orders = [
    {
      id: 'PED-001',
      client: 'Ana Silva',
      service: 'Lavagem + Passagem',
      value: '€15.50',
      status: 'Concluído',
      date: '2024-01-15',
    },
    {
      id: 'PED-002',
      client: 'Carlos Santos',
      service: 'Lavagem Simples',
      value: '€8.00',
      status: 'Em Andamento',
      date: '2024-01-15',
    },
    {
      id: 'PED-003',
      client: 'Mariana Costa',
      service: 'Lavagem + Secagem',
      value: '€12.00',
      status: 'Pendente',
      date: '2024-01-14',
    },
  ]

  const ordersChartData = [
    { day: '01', orders: 8 },
    { day: '02', orders: 12 },
    { day: '03', orders: 6 },
    { day: '04', orders: 15 },
    { day: '05', orders: 10 },
    { day: '06', orders: 18 },
    { day: '07', orders: 14 },
  ]

  const revenueChartData = [
    { month: 'Jan', revenue: 2800 },
    { month: 'Fev', revenue: 3200 },
    { month: 'Mar', revenue: 2900 },
    { month: 'Abr', revenue: 3456 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{laundry.name}</h1>
          <p className="text-gray-600 mt-2">Detalhes e gestão da lavandaria</p>
        </div>
        <Button variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </div>

      {/* Laundry Info */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Localização</p>
                <p className="text-sm text-gray-600">{laundry.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Telefone</p>
                <p className="text-sm text-gray-600">{laundry.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">{laundry.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Mensalidade</p>
                <p className="text-sm font-semibold text-green-600">
                  €{laundry.monthlyFee}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pedidos Recentes</CardTitle>
                  <CardDescription>
                    Últimos pedidos da lavandaria
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Pedido
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.client}</TableCell>
                      <TableCell>{order.service}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {order.value}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === 'Concluído'
                              ? 'default'
                              : order.status === 'Em Andamento'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Usuários da Lavandaria</CardTitle>
                  <CardDescription>
                    Todos os usuários com acesso a esta lavandaria
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Login</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === 'Admin' ? 'default' : 'outline'
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === 'Ativo' ? 'default' : 'secondary'
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Pedidos por Dia</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <ChartContainer
                config={{
                  orders: {
                    label: 'Pedidos',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ordersChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="orders" fill="var(--color-orders)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Receita Mensal</CardTitle>
                <CardDescription>Comparação com mês anterior</CardDescription>
              </CardHeader>
              <ChartContainer
                config={{
                  revenue: {
                    label: 'Receita',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>
          </div>

          {/* Performance Summary */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Resumo de Performance</CardTitle>
              <CardDescription>Análise detalhada da lavandaria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">
                      Performance Positiva
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      A lavandaria apresenta crescimento de 18% no número de
                      pedidos este mês
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Equipe Ativa</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      5 usuários ativos com bom engajamento no sistema
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">
                      Receita Estável
                    </h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Ticket médio de €14.76 com crescimento consistente
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
