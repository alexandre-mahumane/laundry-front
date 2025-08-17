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
import { Switch } from '@/components/ui/switch'
import { Plus, Edit, Users, UserCheck, UserX, Key } from 'lucide-react'

export function OperatorManagement() {
  const [operators, setOperators] = useState([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@lavandaria.com',
      phone: '+351 910 123 456',
      status: 'Ativo',
      role: 'Operador',
      lastLogin: '2024-01-15 14:30',
      createdAt: '2024-01-01',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@lavandaria.com',
      phone: '+351 920 654 321',
      status: 'Ativo',
      role: 'Operador',
      lastLogin: '2024-01-15 09:15',
      createdAt: '2024-01-05',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@lavandaria.com',
      phone: '+351 930 987 654',
      status: 'Inativo',
      role: 'Operador',
      lastLogin: '2024-01-10 16:45',
      createdAt: '2024-01-10',
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState<any>(null)

  const activeOperators = operators.filter((op) => op.status === 'Ativo').length
  const inactiveOperators = operators.filter(
    (op) => op.status === 'Inativo'
  ).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestão de Operadores
          </h1>
          <p className="text-gray-600 mt-2">
            Criar e gerenciar operadores da lavandaria
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Operador
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Operador</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo operador
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="operator-name">Nome Completo</Label>
                <Input id="operator-name" placeholder="Nome do operador" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operator-email">Email</Label>
                <Input
                  id="operator-email"
                  type="email"
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operator-phone">Telefone</Label>
                <Input id="operator-phone" placeholder="+351 xxx xxx xxx" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operator-password">Senha Inicial</Label>
                <Input
                  id="operator-password"
                  type="password"
                  placeholder="Senha temporária"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operator-role">Função</Label>
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
              <div className="flex items-center space-x-2">
                <Switch id="operator-active" defaultChecked />
                <Label htmlFor="operator-active">Operador ativo</Label>
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
                Criar Operador
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
                  Total de Operadores
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {operators.length}
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
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Operadores Inativos
                </p>
                <p className="text-2xl font-bold text-red-600 mt-2">
                  {inactiveOperators}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Online Agora
                </p>
                <p className="text-2xl font-bold text-primary mt-2">2</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operators Table */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Lista de Operadores</CardTitle>
          <CardDescription>Todos os operadores cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operators.map((operator) => (
                <TableRow key={operator.id}>
                  <TableCell className="font-medium">{operator.name}</TableCell>
                  <TableCell>{operator.email}</TableCell>
                  <TableCell>{operator.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{operator.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        operator.status === 'Ativo' ? 'default' : 'secondary'
                      }
                    >
                      {operator.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {operator.lastLogin}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4" />
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Operador</DialogTitle>
            <DialogDescription>
              Alterar dados do operador {selectedOperator?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-operator-name">Nome Completo</Label>
              <Input
                id="edit-operator-name"
                defaultValue={selectedOperator?.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-operator-email">Email</Label>
              <Input
                id="edit-operator-email"
                type="email"
                defaultValue={selectedOperator?.email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-operator-phone">Telefone</Label>
              <Input
                id="edit-operator-phone"
                defaultValue={selectedOperator?.phone}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-operator-role">Função</Label>
              <Select defaultValue={selectedOperator?.role.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operador">Operador</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-operator-active"
                defaultChecked={selectedOperator?.status === 'Ativo'}
              />
              <Label htmlFor="edit-operator-active">Operador ativo</Label>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Para alterar a senha, use o botão "Redefinir Senha" na lista de
                operadores.
              </p>
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
