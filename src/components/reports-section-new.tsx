import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import {
  TrendingUp,
  Users,
  DollarSign,
  Trophy,
  Download,
  CreditCard,
  Loader,
} from 'lucide-react'
import { useReports } from '@/hooks/useReports'
import { useLaundryId } from '@/store/useLaundryStore'
import type { JSX } from 'react'
import type { TopServiceWithPercentage } from '@/types/reports'

// Helper functions
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]/g, ''))
}

function getRankMedal(index: number) {
  if (index === 0) {
    return (
      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
        <Trophy className="w-4 h-4 text-yellow-600" />
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
        <span className="text-sm font-bold text-gray-600">🥈</span>
      </div>
    )
  }
  if (index === 2) {
    return (
      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
        <span className="text-sm font-bold text-orange-600">🥉</span>
      </div>
    )
  }
  return (
    <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
      <span className="text-sm font-bold text-gray-400">{index + 1}</span>
    </div>
  )
}

interface CardMetrics {
  totalServicesNumber: number
  totalGainNumber: number
  averageTicket: number
  newClientsNumber: number
  paidPercentage: number
  totalPaidNumber: number
}

interface IComparisons {
  gains: {
    growth: number
    growthPercentage: string
  }
}

// Generate dynamic performance insights from metrics
function generateInsights(
  cardMetrics: CardMetrics,
  comparisons: IComparisons,
  topServices: TopServiceWithPercentage[]
) {
  const insights: Array<{
    id: string
    title: string
    description: string
    color?: string
    icon?: JSX.Element
  }> = []

  // Total gain insight
  const totalGain = cardMetrics?.totalGainNumber || 0
  const gainGrowth = comparisons?.gains?.growth ?? 0
  const gainGrowthLabel = comparisons?.gains?.growthPercentage ?? ''
  insights.push({
    id: 'gain',
    title: gainGrowth >= 0 ? 'Ganho Total em Alta' : 'Queda no Ganho',
    description: `Total: ${formatCurrency(
      totalGain
    )} — ${gainGrowthLabel} vs anterior`,
    color: gainGrowth >= 0 ? 'blue' : 'red',
  })

  // Payment rate insight
  const paidPct = cardMetrics?.paidPercentage ?? 0
  let paymentTitle = 'Taxa de Pagamento'
  let paymentColor = 'green'
  if (paidPct >= 85) {
    paymentTitle = 'Taxa de Pagamento Excelente'
    paymentColor = 'green'
  } else if (paidPct < 50) {
    paymentTitle = 'Taxa de Pagamento Baixa'
    paymentColor = 'red'
  } else if (paidPct < 75) {
    paymentTitle = 'Taxa de Pagamento Moderada'
    paymentColor = 'orange'
  }
  insights.push({
    id: 'payment',
    title: paymentTitle,
    description: `${paidPct.toFixed(1)}% pagos (${
      cardMetrics.totalPaidNumber
    } de ${cardMetrics.totalServicesNumber})`,
    color: paymentColor,
  })

  // Top service insight
  if (topServices && topServices.length > 0) {
    const top = topServices[0]
    const topReq = parseInt(top.totalRequests as unknown as string) || 0
    const topGain = parseFloat(top.totalGain as unknown as string) || 0
    insights.push({
      id: 'top-service',
      title: `Mais usado: ${top.serviceName}`,
      description: `${topReq} solicitações • ${formatCurrency(topGain)}`,
      color: 'purple',
    })
  }

  // New clients insight
  const newClients = cardMetrics?.newClientsNumber ?? 0
  if (newClients > 0) {
    insights.push({
      id: 'new-clients',
      title: 'Crescimento de Clientes',
      description: `${newClients} novos clientes neste período`,
      color: 'teal',
    })
  }

  return insights
}

export function ReportsSection() {
  const laundryId = useLaundryId()
  const { data: reportsData, loading } = useReports({
    laundryId,
    autoFetch: true,
  })

  if (!laundryId) {
    return (
      <div className="p-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-12 text-center">
            <p className="text-gray-600">
              Selecione uma lavandaria para visualizar os relatórios
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-12 text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
            <p className="text-gray-600">Carregando relatórios...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // if (!reportsData) {
  //   return (
  //     <div className="p-6">
  //       <Card className="border-0 shadow-sm bg-white">
  //         <CardContent className="p-12 text-center">
  //           <p className="text-gray-600">
  //             Nenhum dado disponível para exibir
  //           </p>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   )
  // }

  const {
    cardMetrics,
    topClients,
    topServices: topServicesRaw,
    comparisons,
  } = reportsData
  const topServices = topServicesRaw || []
  const serviceRequestsTotal = topServices.reduce(
    (sum, s) => sum + (parseInt(s.totalRequests as unknown as string) || 0),
    0
  )
  const pieColors = ['#10b981', '#3b82f6', '#f97316', '#ef4444', '#8b5cf6']
  const serviceGainTotal = topServices.reduce(
    (sum, s) => sum + (parseFloat(s.totalGain as unknown as string) || 0),
    0
  )
  const totalGainNumber = cardMetrics.totalGainNumber
  const averageTicket = cardMetrics.averageTicket
  const insights = generateInsights(cardMetrics, comparisons, topServices)
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Relatórios & Análises
          </h1>
          <p className="text-gray-600 mt-2">
            Análise de desempenho e estatísticas do sistema
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Services */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total de Serviços
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {cardMetrics.totalServicesNumber}
                </p>
                <p className="text-sm text-gray-500 mt-1">neste período</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Gain */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Ganho</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {formatCurrency(totalGainNumber)}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    comparisons.gains.growth >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {comparisons.gains.growthPercentage} vs anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Ticket */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Ticket Médio
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {formatCurrency(averageTicket)}
                </p>
                <p className="text-sm text-gray-500 mt-1">por serviço</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Clients */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Novos Clientes
                </p>
                <p className="text-2xl font-bold text-primary mt-2">
                  {cardMetrics.newClientsNumber}
                </p>
                <p className="text-sm text-blue-600 mt-1">clientes novos</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Taxa de Pagamento
                </p>
                <p className="text-2xl font-bold text-primary mt-2">
                  {cardMetrics.paidPercentage.toFixed(1)}%
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  {cardMetrics.totalPaidNumber} pagos
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Status Breakdown */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Serviços & Receitas</CardTitle>
          <CardDescription>
            Uso por serviço e contribuição para receita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <ChartContainer
                config={{
                  services: {
                    label: 'Solicitações',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topServices.map((s) => ({
                        name: s.serviceName,
                        value:
                          parseInt(s.totalRequests as unknown as string) || 0,
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value, percent }) =>
                        `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {topServices.map((_, i) => (
                        <Cell key={i} fill={pieColors[i % pieColors.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="text-sm text-gray-500 mt-3">
                Total de solicitações: <strong>{serviceRequestsTotal}</strong>
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">
                Serviços que mais geraram receita
              </h4>
              <div className="space-y-3">
                {topServices
                  .slice()
                  .sort(
                    (a, b) =>
                      (parseFloat(b.totalGain as unknown as string) || 0) -
                      (parseFloat(a.totalGain as unknown as string) || 0)
                  )
                  .slice(0, 5)
                  .map((s) => {
                    const requests =
                      parseInt(s.totalRequests as unknown as string) || 0
                    const gain =
                      parseFloat(s.totalGain as unknown as string) || 0
                    const gainPercent = serviceGainTotal
                      ? (gain / serviceGainTotal) * 100
                      : 0
                    const reqPercent = serviceRequestsTotal
                      ? (requests / serviceRequestsTotal) * 100
                      : 0
                    return (
                      <div
                        key={s.serviceId}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {s.serviceName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {requests} solicitações • {formatCurrency(gain)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {gainPercent.toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-500">
                            {reqPercent.toFixed(1)}% das solicitações
                          </p>
                        </div>
                      </div>
                    )
                  })}
                {topServices.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Nenhum serviço encontrado
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Clients */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Top Clientes
          </CardTitle>
          <CardDescription>Clientes com maior gasto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topClients.slice(0, 10).map((client, index) => (
              <div
                key={client.clientId}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors"
              >
                <div>{getRankMedal(index)}</div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-900">
                    {client.clientName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {parseInt(client.totalOrders)} pedidos
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {formatCurrency(parseCurrency(client.totalSpent))}
                  </p>
                  <p className="text-sm text-gray-500">
                    {client.percentage.toFixed(1)}% do total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Insights de Performance</CardTitle>
          <CardDescription>
            Análise automática dos dados do período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => {
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-50 border-blue-200 text-blue-900',
                green: 'bg-green-50 border-green-200 text-green-900',
                red: 'bg-red-50 border-red-200 text-red-900',
                orange: 'bg-orange-50 border-orange-200 text-orange-900',
                purple: 'bg-purple-50 border-purple-200 text-purple-900',
                teal: 'bg-teal-50 border-teal-200 text-teal-900',
              }
              const classes =
                colorMap[insight.color as string] ||
                'bg-gray-50 border-gray-200 text-gray-900'
              return (
                <div
                  key={insight.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${classes}`}
                >
                  <div className="mt-0.5">
                    {/* icon placeholder - keep layout consistent */}
                    <div className="w-5 h-5 rounded-full bg-white/0" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm mt-1 text-gray-700">
                      {insight.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
