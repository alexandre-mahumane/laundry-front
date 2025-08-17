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
import { Plus, Edit, DollarSign, Package, Trash2 } from 'lucide-react'

export function PricingManagement() {
  const [resources, setResources] = useState([
    {
      id: 1,
      name: 'Sistema Base',
      description: 'Funcionalidades básicas do sistema de gestão',
      price: 49.99,
      isBase: true,
      isActive: true,
      features: ['Dashboard básico', 'Gestão de clientes', 'Suporte por email'],
    },
    {
      id: 2,
      name: 'Faturação',
      description: 'Módulo completo de faturação e impressão de recibos',
      price: 20.0,
      isBase: false,
      isActive: true,
      features: [
        'Impressão de recibos',
        'Gestão de faturas',
        'Relatórios fiscais',
      ],
    },
    {
      id: 3,
      name: 'SMS',
      description: 'Envio de notificações por SMS para clientes',
      price: 15.0,
      isBase: false,
      isActive: true,
      features: [
        'Notificações automáticas',
        'SMS personalizados',
        'Relatórios de envio',
      ],
    },
    {
      id: 4,
      name: 'Email',
      description: 'Sistema de notificações por email',
      price: 0.0,
      isBase: false,
      isActive: true,
      features: [
        'Emails automáticos',
        'Templates personalizados',
        'Relatórios de entrega',
      ],
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<any>(null)

  const totalActiveResources = resources.filter(
    (r) => r.isActive && !r.isBase
  ).length
  const totalRevenue = resources.reduce(
    (acc, r) => (r.isActive ? acc + r.price : acc),
    0
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Preços</h1>
          <p className="text-gray-600 mt-2">
            Configurar recursos e preços do sistema
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Recurso
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Recurso</DialogTitle>
              <DialogDescription>
                Criar um novo recurso com preço personalizado
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="resource-name">Nome do Recurso</Label>
                <Input
                  id="resource-name"
                  placeholder="Ex: Relatórios Avançados"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resource-description">Descrição</Label>
                <Textarea
                  id="resource-description"
                  placeholder="Descreva as funcionalidades do recurso"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resource-price">Preço Mensal (€)</Label>
                <Input
                  id="resource-price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="resource-active" defaultChecked />
                <Label htmlFor="resource-active">Recurso ativo</Label>
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
                Criar Recurso
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
                  Total de Recursos
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {resources.length}
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
                  Recursos Ativos
                </p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {resources.filter((r) => r.isActive).length}
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
                <p className="text-sm font-medium text-gray-600">
                  Receita Base
                </p>
                <p className="text-2xl font-bold text-primary mt-2">
                  €{totalRevenue.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">por lavandaria/mês</p>
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
                <p className="text-sm font-medium text-gray-600">Preço Médio</p>
                <p className="text-2xl font-bold text-purple-600 mt-2">
                  €
                  {(
                    totalRevenue / resources.filter((r) => r.isActive).length
                  ).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">por recurso</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Table */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Tabela de Preços</CardTitle>
          <CardDescription>
            Todos os recursos disponíveis e seus preços
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recurso</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Preço Mensal</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.name}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-gray-600 truncate">
                      {resource.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">
                        €{resource.price.toFixed(2)}
                      </span>
                      {resource.price === 0 && (
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-200"
                        >
                          Grátis
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={resource.isBase ? 'default' : 'outline'}>
                      {resource.isBase ? 'Base' : 'Adicional'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={resource.isActive ? 'default' : 'secondary'}
                    >
                      {resource.isActive ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedResource(resource)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {!resource.isBase && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resource Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {resources
          .filter((r) => r.isActive)
          .map((resource) => (
            <Card key={resource.id} className="border-0 shadow-sm bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      €{resource.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">/mês</span>
                  </div>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">
                    Funcionalidades incluídas:
                  </h4>
                  <ul className="space-y-1">
                    {resource.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Recurso</DialogTitle>
            <DialogDescription>
              Alterar dados do recurso {selectedResource?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-resource-name">Nome do Recurso</Label>
              <Input
                id="edit-resource-name"
                defaultValue={selectedResource?.name}
                disabled={selectedResource?.isBase}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-resource-description">Descrição</Label>
              <Textarea
                id="edit-resource-description"
                defaultValue={selectedResource?.description}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-resource-price">Preço Mensal (€)</Label>
              <Input
                id="edit-resource-price"
                type="number"
                step="0.01"
                defaultValue={selectedResource?.price}
                disabled={selectedResource?.isBase}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-resource-active"
                defaultChecked={selectedResource?.isActive}
                disabled={selectedResource?.isBase}
              />
              <Label htmlFor="edit-resource-active">Recurso ativo</Label>
            </div>
            {selectedResource?.isBase && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Este é um recurso base e não pode ser desativado ou ter o
                  preço alterado.
                </p>
              </div>
            )}
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
