import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
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
import { useEffect, useState } from 'react'
import { api } from '@/api/client'
import { useLaundry } from '@/store/useLaundryStore'

type WeeklyItem = { day: string; orders: number; revenue: number }
type MonthlyItem = { month: string; profit: number }
type TodayStats = {
  totalReceived?: string
  totalServiceInProgress?: string
  totalServiceInReady?: string
  totalServiceInDelivered?: string
  totalReceivable?: string
  totalServices?: string
  total_services?: string
}
type MonthSummary = {
  total_services?: string
  total_gain?: string
  total_services_not_paid?: string
  total_services_paid?: string
}
// TODO: Implement recent orders feature
// type RecentOrder = {
//   id?: string
//   client?: string
//   service?: string
//   value?: string
//   time?: string
// }

export function LaundryDashboard() {
  // 🔥 Get laundry from Zustand store (already populated from login)
  const laundry = useLaundry()

  const [weeklyData, setWeeklyData] = useState<WeeklyItem[]>([])
  const [monthlyData, setMonthlyData] = useState<MonthlyItem[]>([])
  const [todayStats, setTodayStats] = useState<TodayStats | null>(null)
  const [monthSummary, setMonthSummary] = useState<MonthSummary | null>(null)
  // const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Load dashboard data using laundry info from Zustand store
   * Sequence:
   * 1. Parallel fetch: /reports/laundry/:id, /order/week-analytics/:id, /order/day-analytics/:id, /reports/this-month-analytics/:id
   * Map responses into shapes the UI expects.
   */
  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      setError(null)

      try {
        // 🔥 laundry info is already available from Zustand store
        // No need to fetch it again
        if (!laundry || !laundry.id) {
          throw new Error('Laundry info not available. Please log in again.')
        }

        const id = laundry.id

        // 2) parallel requests for dashboard
        const [monthRes, weekRes, dayRes, thisMonthRes] = await Promise.all([
          api.get(`/reports/laundry/${id}`),
          api.get(`/order/week-analytics/${id}`),
          api.get(`/order/day-analytics/${id}`),
          api.get(`/reports/this-month-analytics/${id}`),
        ])

        if (!mounted) return

        // monthRes: array of { date: '8-2025', totalGain | total_gain, totalServices }
        const monthItems = Array.isArray(monthRes.data)
          ? monthRes.data
          : monthRes.data?.items || []
        console.log({ monthRes })
        setMonthlyData(
          (monthItems as Record<string, unknown>[]).map((m) => ({
            month: String(m['date'] ?? ''),
            profit: Number(m['totalGain'] ?? m['total_gain'] ?? 0),
          }))
        )

        // weekRes: { totalsByDay: [ { day: '2025-08-11', total_services, total_gain } ] }
        const totalsByDay = weekRes.data?.totalsByDay || weekRes.data || []
        setWeeklyData(
          (totalsByDay as Record<string, unknown>[]).map((d) => ({
            day: d['day']
              ? new Date(String(d['day'])).toLocaleDateString(undefined, {
                  weekday: 'short',
                })
              : '',
            orders: Number(d['total_services'] ?? d['totalServices'] ?? 0),
            revenue: Number(d['total_gain'] ?? d['totalGain'] ?? 0),
          }))
        )

        // dayRes: could contain totals and recent orders
        const dayData = dayRes.data || {}
        setTodayStats(dayData as TodayStats)

        // TODO: Implement recent orders feature
        // const recent =
        //   (dayData as Record<string, unknown>)['recentOrders'] ??
        //   (dayData as Record<string, unknown>)['orders'] ??
        //   (dayData as Record<string, unknown>)['items'] ??
        //   []
        // const normalized: RecentOrder[] = (
        //   Array.isArray(recent) ? recent : []
        // ).map((o: Record<string, unknown>) => ({
        //   id: String(o['id'] ?? o['orderId'] ?? o['code'] ?? ''),
        //   client: String(
        //     (o['client'] && (o['client'] as Record<string, unknown>)['name']) ??
        //       o['clientName'] ??
        //       o['client'] ??
        //       ''
        //   ),
        //   service: String(o['description'] ?? o['serviceType'] ?? ''),
        //   value: String(
        //     o['value'] ?? o['total'] ?? o['total_gain'] ?? o['amount'] ?? ''
        //   ),
        //   time: String(o['time'] ?? o['createdAt'] ?? o['updatedAt'] ?? ''),
        // }))
        // setRecentOrders(normalized)

        // this month summary
        const thisMonth = Array.isArray(thisMonthRes.data)
          ? thisMonthRes.data[0]
          : thisMonthRes.data
        setMonthSummary(thisMonth)
      } catch (err) {
        console.error(err)
        const e = err as Error
        setError(e?.message ?? String(err))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [laundry])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard {laundry ? `- ${laundry.name}` : ''}
        </h1>
        <p className="text-gray-600 mt-2">Visão geral da sua lavandaria</p>
      </div>

      {loading && <p className="text-sm text-gray-500">Carregando dados...</p>}
      {error && <p className="text-sm text-red-600">Erro: {error}</p>}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Cards: map using todayStats and monthSummary when available */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pedidos Hoje
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {todayStats?.totalServices ??
                    todayStats?.total_services ??
                    '0'}
                </p>
                <p className="text-sm mt-1 text-blue-600">&nbsp;</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lucro Hoje</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {todayStats?.totalReceivable ??
                    todayStats?.totalReceivable ??
                    '€0'}
                </p>
                <p className="text-sm mt-1 text-green-600">&nbsp;</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {monthSummary?.total_services ?? '0'}
                </p>
                <p className="text-sm mt-1 text-purple-600">&nbsp;</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
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
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {monthSummary
                    ? `€${(
                        Number(monthSummary.total_gain ?? 0) /
                        Math.max(1, Number(monthSummary.total_services ?? 1))
                      ).toFixed(2)}`
                    : '€0.00'}
                </p>
                <p className="text-sm mt-1 text-orange-600">&nbsp;</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Pedidos e Receita Semanal</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                orders: {
                  label: 'Pedidos',
                  color: 'hsl(var(--chart-1))',
                },
                revenue: {
                  label: 'Receita',
                  color: 'hsl(var(--chart-2))',
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="orders" fill="var(--color-orders)" />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
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
                  color: 'hsl(var(--chart-3))',
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="var(--color-profit)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Últimos pedidos registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(recentOrders && recentOrders.length > 0
                ? recentOrders
                : []
              ).map((order, index) => (
                <div
                  key={order.id ?? index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{order.id}</span>
                      <span className="text-xs text-gray-500">
                        {order.time
                          ? new Date(order.time)
                              .toLocaleTimeString()
                              .slice(0, 5)
                          : ''}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900">{order.client}</p>
                    <p className="text-xs text-gray-500">{order.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      {order.value}
                    </p>
                  </div>
                </div>
              ))}
              {(!recentOrders || recentOrders.length === 0) && (
                <p className="text-sm text-gray-500">
                  Nenhum pedido recente encontrado
                </p>
              )}
            </div>
          </CardContent>
        </Card> */}

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Resumo do Mês</CardTitle>
            <CardDescription>Performance do mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">
                      Total de Pedidos
                    </p>
                    <p className="text-sm text-blue-700">Este mês</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {monthSummary?.total_services ?? '0'}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Lucro Total</p>
                    <p className="text-sm text-green-700">Este mês</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {monthSummary?.total_gain
                    ? `€${monthSummary.total_gain}`
                    : '€0'}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">Clientes</p>
                    <p className="text-sm text-purple-700">Este mês</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {monthSummary?.total_services ?? '0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
