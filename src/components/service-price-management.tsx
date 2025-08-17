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
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Edit, Package, DollarSign, Store, Settings } from 'lucide-react'

export function ServicePriceManagement() {
  const [services] = useState([
    {
      id: 1,
      name: 'Lavagem Simples',
      description: 'Lavagem básica de roupas',
      basePrice: 8.0,
      category: 'Lavagem',
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: 2,
      name: 'Lavagem + Passagem',
      description: 'Lavagem completa com passagem a ferro',
      basePrice: 15.0,
      category: 'Completo',
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: 3,
      name: 'Lavagem + Secagem',
      description: 'Lavagem com secagem em máquina',
      basePrice: 12.0,
      category: 'Lavagem',
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: 4,
      name: 'Apenas Passagem',
      description: 'Serviço de passagem a ferro',
      basePrice: 6.0,
      category: 'Passagem',
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: 5,
      name: 'Lavagem Delicada',
      description: 'Lavagem especial para roupas delicadas',
      basePrice: 18.0,
      category: 'Especial',
      isActive: false,
      createdAt: '2024-01-15',
    },
  ])

  const [laundryPrices] = useState([
    {
      laundryId: 1,
      laundryName: 'Lavandaria Norte',
      services: [
        { serviceId: 1, price: 8.5, isActive: true },
        { serviceId: 2, price: 16.0, isActive: true },
        { serviceId: 3, price: 13.0, isActive: true },
        { serviceId: 4, price: 6.5, isActive: true },
        { serviceId: 5, price: 20.0, isActive: false },
      ],
    },
    {
      laundryId: 2,
      laundryName: 'Clean Center',
      services: [
        { serviceId: 1, price: 7.5, isActive: true },
        { serviceId: 2, price: 14.0, isActive: true },
        { serviceId: 3, price: 11.5, isActive: true },
        { serviceId: 4, price: 5.5, isActive: false },
        { serviceId: 5, price: 18.0, isActive: true },
      ],
    },
  ])

  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false)
  const [isEditServiceDialogOpen, setIsEditServiceDialogOpen] = useState(false)
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedLaundry, setSelectedLaundry] = useState<any>(null)

  const laundries = [
    { id: 1, name: 'Lavandaria Norte' },
    { id: 2, name: 'Clean Center' },
    { id: 3, name: 'Express Wash' },
    { id: 4, name: 'Wash & Go' },
    { id: 5, name: 'Quick Clean' },
  ]

  const categories = ['Lavagem', 'Passagem', 'Completo', 'Especial']

  const totalServices = services.length
  const activeServices = services.filter((s) => s.isActive).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Serviços & Preços
          </h1>
          <p className="text-gray-600 mt-2">
            Gerir serviços e preços por lavandaria
          </p>
        </div>

        <Dialog
          open={isAddServiceDialogOpen}
          onOpenChange={setIsAddServiceDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Serviço</DialogTitle>
              <DialogDescription>
                Adicionar um novo tipo de serviço
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="service-name">Nome do Serviço</Label>
                <Input id="service-name" placeholder="Ex: Lavagem Premium" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service-description">Descrição</Label>
                <Textarea
                  id="service-description"
                  placeholder="Descrição do serviço..."
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service-category">Categoria</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="">Selecionar categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service-price">Preço Base (€)</Label>
                <Input
                  id="service-price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="service-active" defaultChecked />
                <Label htmlFor="service-active">Serviço ativo</Label>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAddServiceDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={() => setIsAddServiceDialogOpen(false)}>
                Criar Serviço
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
                  Total de Serviços
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {totalServices}
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
                  Serviços Ativos
                </p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {activeServices}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Preço Médio</p>
                <p className="text-2xl font-bold text-primary mt-2">
                  €
                  {(
                    services.reduce((acc, s) => acc + s.basePrice, 0) /
                    services.length
                  ).toFixed(2)}
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
                <p className="text-sm font-medium text-gray-600">Lavandarias</p>
                <p className="text-2xl font-bold text-purple-600 mt-2">
                  {laundries.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList>
          <TabsTrigger value="services">Catálogo de Serviços</TabsTrigger>
          <TabsTrigger value="prices">Preços por Lavandaria</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Catálogo de Serviços</CardTitle>
              <CardDescription>
                Todos os serviços disponíveis no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço Base</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-500">
                            {service.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{service.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">
                          €{service.basePrice.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={service.isActive ? 'default' : 'secondary'}
                        >
                          {service.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {service.createdAt}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedService(service)
                              setIsEditServiceDialogOpen(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedService(service)
                              setIsPriceDialogOpen(true)
                            }}
                          >
                            <Settings className="w-4 h-4" />
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

        <TabsContent value="prices" className="space-y-6">
          {laundryPrices.map((laundry) => (
            <Card
              key={laundry.laundryId}
              className="border-0 shadow-sm bg-white"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  {laundry.laundryName}
                </CardTitle>
                <CardDescription>
                  Preços e serviços ativos nesta lavandaria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Preço Base</TableHead>
                      <TableHead>Preço Local</TableHead>
                      <TableHead>Diferença</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {laundry.services.map((servicePrice) => {
                      const service = services.find(
                        (s) => s.id === servicePrice.serviceId
                      )
                      const difference =
                        servicePrice.price - (service?.basePrice || 0)
                      return (
                        <TableRow key={servicePrice.serviceId}>
                          <TableCell className="font-medium">
                            {service?.name}
                          </TableCell>
                          <TableCell>
                            €{service?.basePrice.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-green-600">
                              €{servicePrice.price.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium ${
                                difference > 0
                                  ? 'text-green-600'
                                  : difference < 0
                                  ? 'text-red-600'
                                  : 'text-gray-600'
                              }`}
                            >
                              {difference > 0 ? '+' : ''}€
                              {difference.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                servicePrice.isActive ? 'default' : 'secondary'
                              }
                            >
                              {servicePrice.isActive ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Edit Service Dialog */}
      <Dialog
        open={isEditServiceDialogOpen}
        onOpenChange={setIsEditServiceDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Serviço</DialogTitle>
            <DialogDescription>
              Alterar dados do serviço {selectedService?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-service-name">Nome do Serviço</Label>
              <Input
                id="edit-service-name"
                defaultValue={selectedService?.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-service-description">Descrição</Label>
              <Textarea
                id="edit-service-description"
                defaultValue={selectedService?.description}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-service-category">Categoria</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                defaultValue={selectedService?.category}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-service-price">Preço Base (€)</Label>
              <Input
                id="edit-service-price"
                type="number"
                step="0.01"
                defaultValue={selectedService?.basePrice}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-service-active"
                defaultChecked={selectedService?.isActive}
              />
              <Label htmlFor="edit-service-active">Serviço ativo</Label>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditServiceDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={() => setIsEditServiceDialogOpen(false)}>
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Price Configuration Dialog */}
      <Dialog open={isPriceDialogOpen} onOpenChange={setIsPriceDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Configurar Preços - {selectedService?.name}
            </DialogTitle>
            <DialogDescription>
              Definir preços e ativação por lavandaria
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Preço Base do Sistema
              </h4>
              <p className="text-2xl font-bold text-blue-600">
                €{selectedService?.basePrice.toFixed(2)}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Este é o preço padrão sugerido para todas as lavandarias
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">
                Configuração por Lavandaria
              </h4>
              {laundries.map((laundry) => {
                const laundryPrice = laundryPrices
                  .find((lp) => lp.laundryId === laundry.id)
                  ?.services.find((s) => s.serviceId === selectedService?.id)
                return (
                  <div
                    key={laundry.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-900">
                        {laundry.name}
                      </h5>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`laundry-${laundry.id}-active`}
                          defaultChecked={laundryPrice?.isActive || false}
                        />
                        <Label htmlFor={`laundry-${laundry.id}-active`}>
                          Ativo
                        </Label>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`laundry-${laundry.id}-price`}>
                          Preço (€)
                        </Label>
                        <Input
                          id={`laundry-${laundry.id}-price`}
                          type="number"
                          step="0.01"
                          defaultValue={
                            laundryPrice?.price || selectedService?.basePrice
                          }
                        />
                      </div>
                      <div className="flex items-end">
                        <div className="text-sm">
                          <p className="text-gray-600">Diferença:</p>
                          <p
                            className={`font-medium ${
                              (laundryPrice?.price || 0) >
                              (selectedService?.basePrice || 0)
                                ? 'text-green-600'
                                : (laundryPrice?.price || 0) <
                                  (selectedService?.basePrice || 0)
                                ? 'text-red-600'
                                : 'text-gray-600'
                            }`}
                          >
                            {(laundryPrice?.price || 0) -
                              (selectedService?.basePrice || 0) >
                            0
                              ? '+'
                              : ''}
                            €
                            {(
                              (laundryPrice?.price || 0) -
                              (selectedService?.basePrice || 0)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                        >
                          Usar Preço Base
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsPriceDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={() => setIsPriceDialogOpen(false)}>
              Salvar Configurações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
