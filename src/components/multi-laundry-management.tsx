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
import {
  Plus,
  Edit,
  MapPin,
  Phone,
  Mail,
  Eye,
  Store,
  Users,
  DollarSign,
} from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertTriangle, CreditCard } from 'lucide-react'

export function MultiLaundryManagement() {
  const [laundries] = useState([
    {
      id: 1,
      name: 'Lavandaria Norte',
      location: 'Rua das Flores, 123 - Lisboa',
      phone: '+351 210 123 456',
      email: 'norte@lavandaria.com',
      status: 'Ativo',
      operators: 5,
      monthlyRevenue: 4500,
      createdAt: '2024-01-01',
    },
    {
      id: 2,
      name: 'Clean Center',
      location: 'Av. Central, 456 - Porto',
      phone: '+351 220 654 321',
      email: 'center@clean.com',
      status: 'Ativo',
      operators: 3,
      monthlyRevenue: 3800,
      createdAt: '2024-01-15',
    },
    {
      id: 3,
      name: 'Express Wash',
      location: 'Rua Nova, 789 - Braga',
      phone: '+351 253 987 654',
      email: 'express@wash.com',
      status: 'Ativo',
      operators: 4,
      monthlyRevenue: 3200,
      createdAt: '2024-02-01',
    },
    {
      id: 4,
      name: 'Wash & Go',
      location: 'Praça da República, 321 - Coimbra',
      phone: '+351 239 111 222',
      email: 'washgo@email.com',
      status: 'Ativo',
      operators: 6,
      monthlyRevenue: 3900,
      createdAt: '2024-02-15',
    },
    {
      id: 5,
      name: 'Quick Clean',
      location: 'Rua do Comércio, 654 - Faro',
      phone: '+351 289 333 444',
      email: 'quick@clean.com',
      status: 'Inativo',
      operators: 2,
      monthlyRevenue: 3050,
      createdAt: '2024-03-01',
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedLaundry, setSelectedLaundry] = useState<any>(null)

  const totalLaundries = laundries.length
  const activeLaundries = laundries.filter((l) => l.status === 'Ativo').length
  const totalRevenue = laundries.reduce((acc, l) => acc + l.monthlyRevenue, 0)
  const totalOperators = laundries.reduce((acc, l) => acc + l.operators, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Minhas Lavandarias
          </h1>
          <p className="text-gray-600 mt-2">Gerir todas as suas lavandarias</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Lavandaria
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Lavandaria</DialogTitle>
              <DialogDescription>
                Expandir seu negócio com uma nova unidade
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Verificação de Plano */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900">
                      Custo Adicional
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Cada lavandaria adicional custa{' '}
                      <strong>€19.99/mês</strong>. Este valor será adicionado à
                      sua próxima fatura.
                    </p>
                    <div className="mt-3 p-3 bg-white border border-yellow-300 rounded">
                      <div className="flex justify-between text-sm">
                        <span>Plano atual:</span>
                        <span className="font-semibold">€49.99/mês</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Nova lavandaria:</span>
                        <span className="font-semibold">€19.99/mês</span>
                      </div>
                      <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                        <span>Total mensal:</span>
                        <span className="text-green-600">€69.98/mês</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Dados da Nova Lavandaria
                </h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome da Lavandaria *</Label>
                    <Input id="name" placeholder="Ex: Lavandaria Centro" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Localização Completa *</Label>
                    <Input
                      id="location"
                      placeholder="Rua, número, código postal, cidade"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="+351 xxx xxx xxx" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contato@lavandaria.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Configurações Iniciais
                </h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="opening-time">Horário de Abertura</Label>
                      <Input
                        id="opening-time"
                        type="time"
                        defaultValue="08:00"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="closing-time">
                        Horário de Fechamento
                      </Label>
                      <Input
                        id="closing-time"
                        type="time"
                        defaultValue="18:00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmação de Pagamento */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    Confirmação de Pagamento
                  </span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  O valor de €19.99 será cobrado no seu cartão terminado em 4532
                  na próxima fatura.
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox id="payment-confirm" />
                  <Label htmlFor="payment-confirm" className="text-sm">
                    Confirmo que aceito o custo adicional de €19.99/mês
                  </Label>
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
              <Button
                onClick={() => setIsAddDialogOpen(false)}
                className="bg-green-600 hover:bg-green-700"
              >
                Adicionar Lavandaria
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
                  Total de Lavandarias
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {totalLaundries}
                </p>
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
                  Lavandarias Ativas
                </p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {activeLaundries}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-green-600" />
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
                <p className="text-2xl font-bold text-primary mt-2">
                  €{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Operadores
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-2">
                  {totalOperators}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Laundries Table */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Lista de Lavandarias</CardTitle>
          <CardDescription>
            Todas as suas lavandarias cadastradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Operadores</TableHead>
                <TableHead>Receita Mensal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laundries.map((laundry) => (
                <TableRow key={laundry.id}>
                  <TableCell className="font-medium">{laundry.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{laundry.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{laundry.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{laundry.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{laundry.operators}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-green-600">
                      €{laundry.monthlyRevenue.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        laundry.status === 'Ativo' ? 'default' : 'secondary'
                      }
                    >
                      {laundry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.location.hash = `lavandaria-${laundry.id}`
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedLaundry(laundry)
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Lavandaria</DialogTitle>
            <DialogDescription>
              Alterar dados da lavandaria {selectedLaundry?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Dados Básicos
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nome da Lavandaria</Label>
                  <Input id="edit-name" defaultValue={selectedLaundry?.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-location">Localização</Label>
                  <Input
                    id="edit-location"
                    defaultValue={selectedLaundry?.location}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-phone">Telefone</Label>
                    <Input
                      id="edit-phone"
                      defaultValue={selectedLaundry?.phone}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      defaultValue={selectedLaundry?.email}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select defaultValue={selectedLaundry?.status.toLowerCase()}>
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
