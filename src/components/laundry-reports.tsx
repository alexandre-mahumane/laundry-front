import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
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
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  TrendingUp,
  Users,
  DollarSign,
  Download,
  ShoppingCart,
} from 'lucide-react'

export function LaundryReports() {
  const clientsData = [
    { day: '01', clients: 12 },
    { day: '02', clients: 15 },
    { day: '03', clients: 10 },
    { day: '04', clients: 18 },
    { day: '05', clients: 14 },
    { day: '06', clients: 22 },
    { day: '07', clients: 16 },
    { day: '08', clients: 19 },
    { day: '09', clients: 13 },
    { day: '10', clients: 21 },
  ]

  const profitData = [
    { month: 'Jan', profit: 2800 },
    { month: 'Fev', profit: 3200 },
    { month: 'Mar', profit: 2900 },
    { month: 'Abr', profit: 3456 },
    { month: 'Mai', profit: 3650 },
  ]

  const serviceDistribution = [
    { name: 'Lavagem Simples', value: 45, color: '#0ea5e9' },
    { name: 'Lavagem + Passagem', value: 30, color: '#10b981' },
    { name: 'Lavagem + Secagem', value: 15, color: '#f59e0b' },
    { name: 'Apenas Passagem', value: 10, color: '#ef4444' },
  ]

  const topClients = [
    {
      name: 'Maria Silva',
      orders: 15,
      revenue: '€234.50',
      phone: '+351 910 123 456',
    },
    {
      name: 'João Santos',
      orders: 12,
      revenue: '€189.00',
      phone: '+351 920 654 321',
    },
    {
      name: 'Ana Costa',
      orders: 10,
      revenue: '€156.80',
      phone: '+351 930 987 654',
    },
    {
      name: 'Pedro Lima',
      orders: 8,
      revenue: '€124.20',
      phone: '+351 940 111 222',
    },
    {
      name: 'Sofia Oliveira',
      orders: 7,
      revenue: '€98.50',
      phone: '+351 950 333 444',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Relatórios Internos
          </h1>
          <p className="text-gray-600 mt-2">
            Análise de performance da lavandaria
          </p>
        </div>

        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Clientes Atendidos
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">156</p>
                <p className="text-sm text-green-600 mt-1">
                  +12% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Lucro Este Mês
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">€3,650</p>
                <p className="text-sm text-green-600 mt-1">
                  +18% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pedidos Este Mês
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">234</p>
                <p className="text-sm text-blue-600 mt-1">
                  +15% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Ticket Médio
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">€15.60</p>
                <p className="text-sm text-orange-600 mt-1">
                  +€1.20 vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Clientes Atendidos Diariamente</CardTitle>
            <CardDescription>Últimos 10 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                clients: {
                  label: 'Clientes',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clientsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="var(--color-clients)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Lucro Mensal</CardTitle>
            <CardDescription>Evolução dos últimos 5 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                profit: {
                  label: 'Lucro',
                  color: 'hsl(var(--chart-2))',
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="profit" fill="var(--color-profit)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Service Distribution */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Distribuição de Serviços</CardTitle>
          <CardDescription>Tipos de serviços mais solicitados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer
              config={{
                services: {
                  label: 'Serviços',
                  color: '#0ea5e9',
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="space-y-4">
              {serviceDistribution.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: service.color }}
                    />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <span
                    className="text-lg font-bold"
                    style={{ color: service.color }}
                  >
                    {service.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Clients */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Top 5 Clientes</CardTitle>
          <CardDescription>
            Clientes com maior número de pedidos e receita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Posição</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-center">Pedidos</TableHead>
                <TableHead className="text-center">Receita Total</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topClients.map((client, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0
                            ? 'bg-yellow-100'
                            : index === 1
                            ? 'bg-gray-100'
                            : index === 2
                            ? 'bg-orange-100'
                            : 'bg-gray-50'
                        }`}
                      >
                        <span
                          className={`text-sm font-bold ${
                            index === 0
                              ? 'text-yellow-600'
                              : index === 1
                              ? 'text-gray-600'
                              : index === 2
                              ? 'text-orange-600'
                              : 'text-gray-400'
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{client.orders} pedidos</Badge>
                  </TableCell>
                  <TableCell className="text-center font-medium text-green-600">
                    {client.revenue}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default">Cliente Fiel</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Insights de Performance</CardTitle>
          <CardDescription>
            Análise automática dos dados da lavandaria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">
                  Crescimento Positivo
                </h4>
                <p className="text-sm text-green-700 mt-1">
                  A lavandaria apresenta crescimento de 18% no lucro em relação
                  ao mês anterior
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">
                  Base de Clientes Sólida
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  156 clientes atendidos este mês, com 12% de crescimento na
                  base de clientes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">
                  Ticket Médio em Alta
                </h4>
                <p className="text-sm text-purple-700 mt-1">
                  Ticket médio de €15.60 representa um aumento de €1.20
                  comparado ao mês anterior
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
