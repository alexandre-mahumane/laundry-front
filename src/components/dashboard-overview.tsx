import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Store, DollarSign, ShoppingCart, Shield } from 'lucide-react'
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

export function DashboardOverview() {
  const stats = [
    {
      title: 'Lavandarias Ativas',
      value: '156',
      change: '+8%',
      icon: Store,
      color: 'text-blue-600',
    },
    {
      title: 'Pedidos Hoje',
      value: '1,234',
      change: '+23%',
      icon: ShoppingCart,
      color: 'text-purple-600',
    },
    {
      title: 'Receita Total',
      value: '€45,678',
      change: '+15%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Recursos Ativos',
      value: '89%',
      change: '+5%',
      icon: Shield,
      color: 'text-indigo-600',
    },
  ]

  const dailyOrdersData = [
    { day: 'Seg', orders: 45 },
    { day: 'Ter', orders: 52 },
    { day: 'Qua', orders: 48 },
    { day: 'Qui', orders: 61 },
    { day: 'Sex', orders: 55 },
    { day: 'Sáb', orders: 67 },
    { day: 'Dom', orders: 43 },
  ]

  const monthlyRevenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Fev', revenue: 13200 },
    { month: 'Mar', revenue: 11800 },
    { month: 'Abr', revenue: 14500 },
    { month: 'Mai', revenue: 13900 },
    { month: 'Jun', revenue: 15200 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral do sistema de gestão</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <p className={`text-sm mt-1 ${stat.color}`}>
                    {stat.change} vs mês anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Pedidos Diários</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
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
                <BarChart data={dailyOrdersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="orders" fill="var(--color-orders)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
            <CardDescription>Comparação com mês anterior</CardDescription>
          </CardHeader>
          <CardContent>
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
                <LineChart data={monthlyRevenueData}>
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
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>Últimas ações no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: 'Nova empresa cadastrada',
                time: '2 min atrás',
                type: 'success',
              },
              {
                action: 'Lavandaria desativada',
                time: '15 min atrás',
                type: 'warning',
              },
              {
                action: 'Relatório mensal gerado',
                time: '1 hora atrás',
                type: 'info',
              },
              {
                action: 'Backup realizado',
                time: '2 horas atrás',
                type: 'success',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-50"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === 'success'
                      ? 'bg-green-500'
                      : activity.type === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
