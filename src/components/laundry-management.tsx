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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Plus,
  Edit,
  MapPin,
  Phone,
  Mail,
  Eye,
  BarChart3,
  ShoppingCart,
} from 'lucide-react'

export function LaundryManagement() {
  const [laundries] = useState([
    {
      id: 1,
      name: 'Lavandaria Norte',
      location: 'Rua das Flores, 123 - Lisboa',
      phone: '+351 210 123 456',
      email: 'norte@lavandaria.com',
      resources: {
        faturacao: true,
        sms: true,
        email: true,
      },
      status: 'Ativo',
      monthlyFee: 89.99,
      totalUsers: 5,
      monthlyOrders: 234,
    },
    {
      id: 2,
      name: 'Clean Center',
      location: 'Av. Central, 456 - Porto',
      phone: '+351 220 654 321',
      email: 'center@clean.com',
      resources: {
        faturacao: true,
        sms: false,
        email: true,
      },
      status: 'Ativo',
      monthlyFee: 69.99,
      totalUsers: 3,
      monthlyOrders: 156,
    },
    {
      id: 3,
      name: 'Express Wash',
      location: 'Rua Nova, 789 - Braga',
      phone: '+351 253 987 654',
      email: 'express@wash.com',
      resources: {
        faturacao: false,
        sms: true,
        email: true,
      },
      status: 'Inativo',
      monthlyFee: 59.99,
      totalUsers: 2,
      monthlyOrders: 89,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedLaundry, setSelectedLaundry] = useState<any>(null)
  const [selectedResources, setSelectedResources] = useState({
    faturacao: false,
    sms: false,
    email: true, // Email sempre incluído
  })

  const resourcePrices = {
    base: 49.99,
    faturacao: 20.0,
    sms: 15.0,
    email: 0.0, // Grátis
  }

  const calculateTotal = () => {
    let total = resourcePrices.base
    if (selectedResources.faturacao) total += resourcePrices.faturacao
    if (selectedResources.sms) total += resourcePrices.sms
    return total
  }

  const handleResourceChange = (resource: string, checked: boolean) => {
    if (resource === 'email') return // Email sempre ativo
    setSelectedResources((prev) => ({
      ...prev,
      [resource]: checked,
    }))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestão de Lavandarias
          </h1>
          <p className="text-gray-600 mt-2">Cadastro e gestão de lavandarias</p>
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
              <DialogTitle>Cadastrar Nova Lavandaria</DialogTitle>
              <DialogDescription>
                Preencha os dados da nova lavandaria
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Dados Básicos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Dados Básicos
                </h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome da Lavandaria</Label>
                    <Input
                      id="name"
                      placeholder="Digite o nome da lavandaria"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Localização Completa</Label>
                    <Input id="location" placeholder="Rua, número, cidade" />
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

              {/* Recursos e Preços */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recursos e Preços
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div className="flex items-center space-x-3">
                        <Checkbox id="base" checked disabled />
                        <div>
                          <Label htmlFor="base" className="text-sm font-medium">
                            Sistema Base
                          </Label>
                          <p className="text-xs text-gray-500">
                            Funcionalidades básicas do sistema
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">
                        €{resourcePrices.base}/mês
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="faturacao"
                          checked={selectedResources.faturacao}
                          onCheckedChange={(checked) =>
                            handleResourceChange(
                              'faturacao',
                              checked as boolean
                            )
                          }
                        />
                        <div>
                          <Label
                            htmlFor="faturacao"
                            className="text-sm font-medium"
                          >
                            Faturação
                          </Label>
                          <p className="text-xs text-gray-500">
                            Permite imprimir recibos e faturas
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-blue-600">
                        €{resourcePrices.faturacao}/mês
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="sms"
                          checked={selectedResources.sms}
                          onCheckedChange={(checked) =>
                            handleResourceChange('sms', checked as boolean)
                          }
                        />
                        <div>
                          <Label htmlFor="sms" className="text-sm font-medium">
                            SMS
                          </Label>
                          <p className="text-xs text-gray-500">
                            Envio de notificações por SMS
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-purple-600">
                        €{resourcePrices.sms}/mês
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div className="flex items-center space-x-3">
                        <Checkbox id="email" checked disabled />
                        <div>
                          <Label
                            htmlFor="email-resource"
                            className="text-sm font-medium"
                          >
                            Email
                          </Label>
                          <p className="text-xs text-gray-500">
                            Envio de notificações por email (Grátis)
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">
                        Grátis
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        Total Mensal:
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        €{calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configurações Iniciais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Configurações Iniciais
                </h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status Inicial</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="admin-password">
                      Senha Inicial para Admin
                    </Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Senha temporária para o administrador"
                    />
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
                Cadastrar Lavandaria - €{calculateTotal().toFixed(2)}/mês
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
                  {laundries.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
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
                  {laundries.filter((l) => l.status === 'Ativo').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
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
                  €
                  {laundries
                    .reduce((acc, l) => acc + l.monthlyFee, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pedidos Totais
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-2">
                  {laundries.reduce((acc, l) => acc + l.monthlyOrders, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
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
            Todas as lavandarias cadastradas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Recursos</TableHead>
                <TableHead>Mensalidade</TableHead>
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
                    <div className="flex gap-1">
                      {laundry.resources.faturacao && (
                        <Badge variant="outline" className="text-xs">
                          Faturação
                        </Badge>
                      )}
                      {laundry.resources.sms && (
                        <Badge variant="outline" className="text-xs">
                          SMS
                        </Badge>
                      )}
                      {laundry.resources.email && (
                        <Badge variant="outline" className="text-xs">
                          Email
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-green-600">
                      €{laundry.monthlyFee}
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
                          // Navegar para detalhes da lavandaria
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
            {/* Dados Básicos */}
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

            {/* Recursos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recursos Ativos
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-faturacao"
                    defaultChecked={selectedLaundry?.resources.faturacao}
                  />
                  <Label
                    htmlFor="edit-faturacao"
                    className="text-sm font-normal"
                  >
                    Faturação - €20.00/mês
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-sms"
                    defaultChecked={selectedLaundry?.resources.sms}
                  />
                  <Label htmlFor="edit-sms" className="text-sm font-normal">
                    SMS - €15.00/mês
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-email-resource"
                    defaultChecked={true}
                    disabled
                  />
                  <Label
                    htmlFor="edit-email-resource"
                    className="text-sm font-normal"
                  >
                    Email - Grátis (sempre ativo)
                  </Label>
                </div>
              </div>
            </div>

            {/* Status */}
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
