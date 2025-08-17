import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import {
  Store,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
  Crown,
} from 'lucide-react'

export function MultiAdminDashboard() {
  const revenueData = [
    {
      month: 'Jan',
      total: 12500,
      lavandaria1: 4500,
      lavandaria2: 3800,
      lavandaria3: 4200,
    },
    {
      month: 'Fev',
      total: 13200,
      lavandaria1: 4800,
      lavandaria2: 4100,
      lavandaria3: 4300,
    },
    {
      month: 'Mar',
      total: 14100,
      lavandaria1: 5200,
      lavandaria2: 4300,
      lavandaria3: 4600,
    },
    {
      month: 'Abr',
      total: 15300,
      lavandaria1: 5800,
      lavandaria2: 4700,
      lavandaria3: 4800,
    },
    {
      month: 'Mai',
      total: 16800,
      lavandaria1: 6200,
      lavandaria2: 5100,
      lavandaria3: 5500,
    },
    {
      month: 'Jun',
      total: 18200,
      lavandaria1: 6800,
      lavandaria2: 5600,
      lavandaria3: 5800,
    },
  ]

  const ordersData = [
    { day: 'Seg', orders: 45 },
    { day: 'Ter', orders: 52 },
    { day: 'Qua', orders: 48 },
    { day: 'Qui', orders: 61 },
    { day: 'Sex', orders: 55 },
    { day: 'Sáb', orders: 67 },
    { day: 'Dom', orders: 43 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Multi-Admin
          </h1>
          <p className="text-gray-600 mt-2">
            Visão geral de todas as suas lavandarias
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="default"
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <Crown className="w-3 h-3 mr-1" />
            Plano Premium
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Lavandarias
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">5</p>
                <p className="text-xs text-green-600 mt-1">+1 este mês</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Receita Total
                </p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  €18.200
                </p>
                <p className="text-xs text-green-600 mt-1">
                  +8.5% vs mês anterior
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
                  Pedidos Hoje
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-2">127</p>
                <p className="text-xs text-purple-600 mt-1">
                  Todas as lavandarias
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Operadores Ativos
                </p>
                <p className="text-2xl font-bold text-orange-600 mt-2">23</p>
                <p className="text-xs text-orange-600 mt-1">
                  Em todas as unidades
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Receita por Mês
            </CardTitle>
            <CardDescription>
              Comparação entre todas as lavandarias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: { label: 'Total', color: 'hsl(var(--chart-1))' },
                lavandaria1: {
                  label: 'Lavandaria Norte',
                  color: 'hsl(var(--chart-2))',
                },
                lavandaria2: {
                  label: 'Clean Center',
                  color: 'hsl(var(--chart-3))',
                },
                lavandaria3: {
                  label: 'Express Wash',
                  color: 'hsl(var(--chart-4))',
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="var(--color-total)"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="lavandaria1"
                    stroke="var(--color-lavandaria1)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="lavandaria2"
                    stroke="var(--color-lavandaria2)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="lavandaria3"
                    stroke="var(--color-lavandaria3)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Pedidos por Dia</CardTitle>
            <CardDescription>
              Última semana - todas as lavandarias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                orders: { label: 'Pedidos', color: 'hsl(var(--chart-1))' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="orders"
                    fill="var(--color-orders)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Top Lavandaria</CardTitle>
            <CardDescription>Melhor performance este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    Lavandaria Norte
                  </p>
                  <p className="text-sm text-gray-500">Lisboa</p>
                </div>
                <Badge variant="default" className="bg-green-600">
                  #1
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Receita:</span>
                  <span className="font-semibold text-green-600">€6.800</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pedidos:</span>
                  <span className="font-semibold">342</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Crescimento:</span>
                  <span className="font-semibold text-green-600">+12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Alertas</CardTitle>
            <CardDescription>Requer atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">
                    Quick Clean
                  </p>
                  <p className="text-xs text-yellow-700">
                    Baixa atividade nos últimos 3 dias
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Users className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Express Wash
                  </p>
                  <p className="text-xs text-blue-700">
                    Precisa de mais 1 operador
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            <CardDescription>Tarefas comuns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                size="sm"
              >
                <Store className="w-4 h-4 mr-2" />
                Nova Lavandaria
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                size="sm"
              >
                <Users className="w-4 h-4 mr-2" />
                Adicionar Operador
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                size="sm"
              >
                <Package className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                size="sm"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Ver Relatórios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
