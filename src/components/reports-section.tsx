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
  Trophy,
  Download,
  Calendar,
  CreditCard,
} from 'lucide-react'

export function ReportsSection() {
  const topLaundries = [
    {
      name: 'Lavandaria Norte',
      clients: 1234,
      revenue: '€12,450',
      growth: '+15%',
      monthlyFee: 89.99,
      status: 'Ativo',
    },
    {
      name: 'Clean Center',
      clients: 987,
      revenue: '€9,870',
      growth: '+12%',
      monthlyFee: 69.99,
      status: 'Ativo',
    },
    {
      name: 'Express Wash',
      clients: 756,
      revenue: '€7,560',
      growth: '+8%',
      monthlyFee: 59.99,
      status: 'Inativo',
    },
    {
      name: 'Wash & Go',
      clients: 543,
      revenue: '€5,430',
      growth: '+5%',
      monthlyFee: 79.99,
      status: 'Ativo',
    },
    {
      name: 'Quick Clean',
      clients: 432,
      revenue: '€4,320',
      growth: '+3%',
      monthlyFee: 89.99,
      status: 'Ativo',
    },
  ]

  // Calcular receita prevista das mensalidades
  const activeLaundries = topLaundries.filter((l) => l.status === 'Ativo')
  const totalMonthlyRevenue = activeLaundries.reduce(
    (acc, l) => acc + l.monthlyFee,
    0
  )
  const totalYearlyRevenue = totalMonthlyRevenue * 12

  // Dados para gráficos
  const dailyClientsData = [
    { day: '01', clients: 2100 },
    { day: '02', clients: 2300 },
    { day: '03', clients: 2150 },
    { day: '04', clients: 2400 },
    { day: '05', clients: 2250 },
    { day: '06', clients: 2600 },
    { day: '07', clients: 2800 },
    { day: '08', clients: 2500 },
    { day: '09', clients: 2700 },
    { day: '10', clients: 2847 },
  ]

  const monthlyProfitData = [
    { month: 'Jan', daily: 8200, monthly: 245000 },
    { month: 'Fev', daily: 8500, monthly: 255000 },
    { month: 'Mar', daily: 8100, monthly: 240000 },
    { month: 'Abr', daily: 8800, monthly: 267000 },
    { month: 'Mai', daily: 8945, monthly: 267340 },
  ]

  const subscriptionRevenueData = [
    { name: 'Mensalidades', value: totalMonthlyRevenue, color: '#0ea5e9' },
    { name: 'Receita Operacional', value: 45678, color: '#10b981' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Relatórios Globais
          </h1>
          <p className="text-gray-600 mt-2">
            Análise de desempenho e estatísticas do sistema
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Clientes Hoje
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">2,847</p>
                <p className="text-sm text-green-600 mt-1">+18% vs ontem</p>
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
                  Lucro Diário
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">€8,945</p>
                <p className="text-sm text-green-600 mt-1">+12% vs ontem</p>
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
                  Lucro Mensal
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  €267,340
                </p>
                <p className="text-sm text-green-600 mt-1">
                  +25% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Mensalidades/Mês
                </p>
                <p className="text-2xl font-bold text-primary mt-2">
                  €{totalMonthlyRevenue.toFixed(2)}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  {activeLaundries.length} lavandarias ativas
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Previsão Anual
                </p>
                <p className="text-2xl font-bold text-primary mt-2">
                  €{totalYearlyRevenue.toFixed(0)}
                </p>
                <p className="text-sm text-blue-600 mt-1">só mensalidades</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Receita Prevista das Mensalidades</CardTitle>
          <CardDescription>
            Análise detalhada da receita recorrente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartContainer
                config={{
                  subscriptions: {
                    label: 'Mensalidades',
                    color: '#0ea5e9',
                  },
                  operations: {
                    label: 'Operacional',
                    color: '#10b981',
                  },
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subscriptionRevenueData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) =>
                        `${name}: €${value.toFixed(0)}`
                      }
                    >
                      {subscriptionRevenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold text-primary">
                  Receita Mensal Garantida
                </h4>
                <p className="text-2xl font-bold text-primary mt-2">
                  €{totalMonthlyRevenue.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {activeLaundries.length} lavandarias ativas
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-700">Projeção Anual</h4>
                <p className="text-2xl font-bold text-green-700 mt-2">
                  €{totalYearlyRevenue.toFixed(0)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Baseado nas mensalidades atuais
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-700">Ticket Médio</h4>
                <p className="text-2xl font-bold text-blue-700 mt-2">
                  €{(totalMonthlyRevenue / activeLaundries.length).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Por lavandaria ativa
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Clientes Diários</CardTitle>
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
                <LineChart data={dailyClientsData}>
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
            <CardTitle>Lucro Diário vs Mensal</CardTitle>
            <CardDescription>Comparação de períodos</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                daily: {
                  label: 'Diário',
                  color: 'hsl(var(--chart-2))',
                },
                monthly: {
                  label: 'Mensal',
                  color: 'hsl(var(--chart-3))',
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyProfitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="daily" fill="var(--color-daily)" />
                  <Bar dataKey="monthly" fill="var(--color-monthly)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Laundries Ranking */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Ranking das Lavandarias Mais Ativas
          </CardTitle>
          <CardDescription>
            Classificação baseada no número de clientes e receita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Posição</TableHead>
                <TableHead>Lavandaria</TableHead>
                <TableHead className="text-center">Clientes</TableHead>
                <TableHead className="text-center">Receita</TableHead>
                <TableHead className="text-center">Mensalidade</TableHead>
                <TableHead className="text-center">Crescimento</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topLaundries.map((laundry, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {index === 0 && (
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                        </div>
                      )}
                      {index === 1 && (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-600">
                            2
                          </span>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-orange-600">
                            3
                          </span>
                        </div>
                      )}
                      {index > 2 && (
                        <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-400">
                            {index + 1}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{laundry.name}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{laundry.clients.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium text-green-600">
                    {laundry.revenue}
                  </TableCell>
                  <TableCell className="text-center font-medium text-primary">
                    €{laundry.monthlyFee}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200"
                    >
                      {laundry.growth}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        laundry.status === 'Ativo' ? 'default' : 'secondary'
                      }
                    >
                      {laundry.status}
                    </Badge>
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
            Análise automática dos dados do sistema
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
                  O sistema apresenta crescimento de 18% no número de clientes
                  em relação ao período anterior
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">
                  Receita Recorrente Estável
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Receita mensal garantida de €{totalMonthlyRevenue.toFixed(2)}{' '}
                  com {activeLaundries.length} lavandarias ativas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">
                  Projeção Anual Positiva
                </h4>
                <p className="text-sm text-purple-700 mt-1">
                  Previsão de €{totalYearlyRevenue.toFixed(0)} anuais apenas com
                  mensalidades das lavandarias ativas
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
