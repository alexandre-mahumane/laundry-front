import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { Download, TrendingUp, DollarSign, Users, Package } from 'lucide-react'

export function MultiAdminReports() {
  const monthlyData = [
    { month: 'Jan', revenue: 12500, orders: 450, customers: 180 },
    { month: 'Fev', revenue: 13200, orders: 480, customers: 195 },
    { month: 'Mar', revenue: 14100, orders: 520, customers: 210 },
    { month: 'Abr', revenue: 15300, orders: 580, customers: 225 },
    { month: 'Mai', revenue: 16800, orders: 620, customers: 240 },
    { month: 'Jun', revenue: 18200, orders: 680, customers: 260 },
  ]

  const laundryComparison = [
    { name: 'Lavandaria Norte', revenue: 6800, orders: 342, efficiency: 95 },
    { name: 'Clean Center', revenue: 5600, orders: 298, efficiency: 88 },
    { name: 'Express Wash', revenue: 5800, orders: 315, efficiency: 92 },
    { name: 'Wash & Go', revenue: 3900, orders: 245, efficiency: 85 },
    { name: 'Quick Clean', revenue: 3050, orders: 198, efficiency: 78 },
  ]

  const serviceDistribution = [
    { name: 'Lavagem Simples', value: 35, color: '#3b82f6' },
    { name: 'Lavagem + Passagem', value: 28, color: '#10b981' },
    { name: 'Lavagem + Secagem', value: 22, color: '#f59e0b' },
    { name: 'Apenas Passagem', value: 10, color: '#ef4444' },
    { name: 'Lavagem Delicada', value: 5, color: '#8b5cf6' },
  ]

  const operatorPerformance = [
    { name: 'Maria Silva', orders: 245, revenue: 1850, efficiency: 98 },
    { name: 'João Santos', orders: 198, revenue: 1620, efficiency: 92 },
    { name: 'Ana Costa', orders: 156, revenue: 1245, efficiency: 89 },
    { name: 'Pedro Oliveira', orders: 134, revenue: 1080, efficiency: 85 },
    { name: 'Sofia Martins', orders: 112, revenue: 890, efficiency: 82 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Relatórios Consolidados
          </h1>
          <p className="text-gray-600 mt-2">
            Análise completa de todas as lavandarias
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  Total de Pedidos
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-2">1.398</p>
                <p className="text-xs text-blue-600 mt-1">
                  +12% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Clientes
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-2">260</p>
                <p className="text-xs text-purple-600 mt-1">
                  +15 novos clientes
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
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
                <p className="text-2xl font-bold text-orange-600 mt-2">
                  €13.02
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  -2.1% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="laundries">Por Lavandaria</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="operators">Operadores</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Evolução Mensal</CardTitle>
                <CardDescription>
                  Receita, pedidos e clientes nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: 'Receita (€)',
                      color: 'hsl(var(--chart-1))',
                    },
                    orders: { label: 'Pedidos', color: 'hsl(var(--chart-2))' },
                    customers: {
                      label: 'Clientes',
                      color: 'hsl(var(--chart-3))',
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="var(--color-orders)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="customers"
                        stroke="var(--color-customers)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Distribuição de Serviços</CardTitle>
                <CardDescription>
                  Popularidade dos serviços oferecidos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: 'Percentual',
                      color: 'hsl(var(--chart-1))',
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="laundries" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Comparação entre Lavandarias</CardTitle>
              <CardDescription>
                Performance de cada unidade no mês atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: 'Receita (€)',
                    color: 'hsl(var(--chart-1))',
                  },
                  orders: { label: 'Pedidos', color: 'hsl(var(--chart-2))' },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={laundryComparison} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="revenue"
                      fill="var(--color-revenue)"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laundryComparison.map((laundry, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">{laundry.name}</CardTitle>
                  <CardDescription>Performance detalhada</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Receita:</span>
                      <span className="font-semibold text-green-600">
                        €{laundry.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pedidos:</span>
                      <span className="font-semibold text-blue-600">
                        {laundry.orders}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Eficiência:</span>
                      <Badge
                        variant={
                          laundry.efficiency >= 90
                            ? 'default'
                            : laundry.efficiency >= 80
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {laundry.efficiency}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Análise de Serviços</CardTitle>
              <CardDescription>
                Performance dos serviços oferecidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceDistribution.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: service.color }}
                      ></div>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: service.color }}
                      >
                        {service.value}%
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            backgroundColor: service.color,
                            width: `${service.value}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operators" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Performance dos Operadores</CardTitle>
              <CardDescription>Top 5 operadores do mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {operatorPerformance.map((operator, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          #{index + 1}
                        </span>
                      </div>
                      <span className="font-medium">{operator.name}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-gray-600">Pedidos</p>
                        <p className="font-semibold text-blue-600">
                          {operator.orders}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Receita</p>
                        <p className="font-semibold text-green-600">
                          €{operator.revenue}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Eficiência</p>
                        <Badge
                          variant={
                            operator.efficiency >= 95
                              ? 'default'
                              : operator.efficiency >= 85
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {operator.efficiency}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
