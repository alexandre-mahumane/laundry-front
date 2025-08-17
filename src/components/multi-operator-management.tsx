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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Plus,
  Edit,
  Eye,
  Users,
  Activity,
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
} from 'lucide-react'

export function MultiOperatorManagement() {
  const [operators] = useState([
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria@email.com',
      phone: '+351 910 123 456',
      laundryId: 1,
      laundryName: 'Lavandaria Norte',
      role: 'Operador',
      status: 'Ativo',
      joinDate: '2024-01-15',
      todayOrders: 12,
      monthlyOrders: 245,
      monthlyRevenue: 1850,
      lastActivity: '2024-01-20 14:30',
      recentActivity: [
        { date: '2024-01-20', orders: 12, revenue: 95 },
        { date: '2024-01-19', orders: 8, revenue: 68 },
        { date: '2024-01-18', orders: 15, revenue: 125 },
        { date: '2024-01-17', orders: 10, revenue: 82 },
        { date: '2024-01-16', orders: 14, revenue: 110 },
      ],
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao@email.com',
      phone: '+351 920 654 321',
      laundryId: 2,
      laundryName: 'Clean Center',
      role: 'Supervisor',
      status: 'Ativo',
      joinDate: '2024-01-10',
      todayOrders: 8,
      monthlyOrders: 198,
      monthlyRevenue: 1620,
      lastActivity: '2024-01-20 13:45',
      recentActivity: [
        { date: '2024-01-20', orders: 8, revenue: 72 },
        { date: '2024-01-19', orders: 11, revenue: 89 },
        { date: '2024-01-18', orders: 9, revenue: 76 },
        { date: '2024-01-17', orders: 13, revenue: 105 },
        { date: '2024-01-16', orders: 7, revenue: 58 },
      ],
    },
    {
      id: 3,
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '+351 930 987 654',
      laundryId: 1,
      laundryName: 'Lavandaria Norte',
      role: 'Operador',
      status: 'Ativo',
      joinDate: '2024-02-01',
      todayOrders: 15,
      monthlyOrders: 156,
      monthlyRevenue: 1245,
      lastActivity: '2024-01-20 15:20',
      recentActivity: [
        { date: '2024-01-20', orders: 15, revenue: 118 },
        { date: '2024-01-19', orders: 6, revenue: 48 },
        { date: '2024-01-18', orders: 12, revenue: 96 },
        { date: '2024-01-17', orders: 9, revenue: 75 },
        { date: '2024-01-16', orders: 11, revenue: 88 },
      ],
    },
  ])

  const [laundries] = useState([
    { id: 1, name: 'Lavandaria Norte', location: 'Lisboa' },
    { id: 2, name: 'Clean Center', location: 'Porto' },
    { id: 3, name: 'Express Wash', location: 'Braga' },
    { id: 4, name: 'Wash & Go', location: 'Coimbra' },
    { id: 5, name: 'Quick Clean', location: 'Faro' },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState<any>(null)

  const totalOperators = operators.length
  const activeOperators = operators.filter((o) => o.status === 'Ativo').length
  const todayOrders = operators.reduce((acc, o) => acc + o.todayOrders, 0)
  const monthlyRevenue = operators.reduce((acc, o) => acc + o.monthlyRevenue, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestão de Operadores
          </h1>
          <p className="text-gray-600 mt-2">
            Gerir operadores de todas as lavandarias
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Operador
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Operador</DialogTitle>
              <DialogDescription>
                Cadastrar operador e atribuir a uma lavandaria
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Dados Pessoais
                </h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Nome do operador" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="+351 xxx xxx xxx" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Atribuição de Trabalho
                </h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="laundry">Lavandaria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar lavandaria" />
                      </SelectTrigger>
                      <SelectContent>
                        {laundries.map((laundry) => (
                          <SelectItem
                            key={laundry.id}
                            value={laundry.id.toString()}
                          >
                            {laundry.name} - {laundry.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Função</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar função" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operador">Operador</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Configurações de Acesso
                </h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Senha Temporária</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Senha inicial"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status Inicial</Label>
                    <Select defaultValue="ativo">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Cadastrar Operador
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
                <p className="text-sm font-medium text-gray-600">
                  Total Operadores
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {totalOperators}
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
                  Operadores Ativos
                </p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {activeOperators}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
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
                <p className="text-2xl font-bold text-purple-600 mt-2">
                  {todayOrders}
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
                  Receita Mensal
                </p>
                <p className="text-2xl font-bold text-primary mt-2">
                  €{monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Todos os Operadores</TabsTrigger>
          <TabsTrigger value="by-laundry">Por Lavandaria</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Lista de Operadores</CardTitle>
              <CardDescription>
                Todos os operadores de todas as lavandarias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Operador</TableHead>
                    <TableHead>Lavandaria</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Pedidos Hoje</TableHead>
                    <TableHead>Receita Mensal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operators.map((operator) => (
                    <TableRow key={operator.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32`}
                            />
                            <AvatarFallback>
                              {operator.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{operator.name}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {operator.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {operator.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{operator.laundryName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            operator.role === 'Supervisor'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {operator.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-blue-600">
                          {operator.todayOrders}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">
                          €{operator.monthlyRevenue}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            operator.status === 'Ativo'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {operator.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedOperator(operator)
                              setIsActivityDialogOpen(true)
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedOperator(operator)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-laundry" className="space-y-6">
          {laundries.map((laundry) => {
            const laundryOperators = operators.filter(
              (o) => o.laundryId === laundry.id
            )
            if (laundryOperators.length === 0) return null

            return (
              <Card key={laundry.id} className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {laundry.name} - {laundry.location}
                  </CardTitle>
                  <CardDescription>
                    {laundryOperators.length} operadores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {laundryOperators.map((operator) => (
                      <div
                        key={operator.id}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40`}
                            />
                            <AvatarFallback>
                              {operator.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{operator.name}</p>
                            <Badge
                              variant={
                                operator.role === 'Supervisor'
                                  ? 'default'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {operator.role}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Pedidos hoje:</span>
                            <span className="font-semibold text-blue-600">
                              {operator.todayOrders}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Receita mensal:</span>
                            <span className="font-semibold text-green-600">
                              €{operator.monthlyRevenue}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <Badge
                              variant={
                                operator.status === 'Ativo'
                                  ? 'default'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {operator.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => {
                              setSelectedOperator(operator)
                              setIsActivityDialogOpen(true)
                            }}
                          >
                            <Activity className="w-3 h-3 mr-1" />
                            Atividade
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedOperator(operator)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>

      {/* Activity Dialog */}
      <Dialog
        open={isActivityDialogOpen}
        onOpenChange={setIsActivityDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Atividade do Operador</DialogTitle>
            <DialogDescription>
              Detalhes de atividade de {selectedOperator?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900">
                  Pedidos Hoje
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {selectedOperator?.todayOrders}
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-900">
                  Receita Mensal
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  €{selectedOperator?.monthlyRevenue}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Atividade dos Últimos 5 Dias
              </h4>
              <div className="space-y-3">
                {selectedOperator?.recentActivity.map(
                  (activity: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{activity.date}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-blue-600 font-semibold">
                          {activity.orders} pedidos
                        </span>
                        <span className="text-green-600 font-semibold">
                          €{activity.revenue}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Informações Gerais
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Lavandaria:</span>
                  <p className="font-medium">{selectedOperator?.laundryName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Função:</span>
                  <p className="font-medium">{selectedOperator?.role}</p>
                </div>
                <div>
                  <span className="text-gray-600">Data de Entrada:</span>
                  <p className="font-medium">{selectedOperator?.joinDate}</p>
                </div>
                <div>
                  <span className="text-gray-600">Última Atividade:</span>
                  <p className="font-medium">
                    {selectedOperator?.lastActivity}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setIsActivityDialogOpen(false)}
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Operador</DialogTitle>
            <DialogDescription>
              Alterar dados de {selectedOperator?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Dados Pessoais
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nome Completo</Label>
                  <Input id="edit-name" defaultValue={selectedOperator?.name} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      defaultValue={selectedOperator?.email}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-phone">Telefone</Label>
                    <Input
                      id="edit-phone"
                      defaultValue={selectedOperator?.phone}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Atribuição de Trabalho
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-laundry">Lavandaria</Label>
                  <Select
                    defaultValue={selectedOperator?.laundryId?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {laundries.map((laundry) => (
                        <SelectItem
                          key={laundry.id}
                          value={laundry.id.toString()}
                        >
                          {laundry.name} - {laundry.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Função</Label>
                  <Select defaultValue={selectedOperator?.role?.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operador">Operador</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    defaultValue={selectedOperator?.status?.toLowerCase()}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
