import { useState, useEffect } from 'react'
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Plus, Edit, Users, UserCheck, UserX, Trash2 } from 'lucide-react'
import { useOperators } from '@/hooks/useOperators'
import { useToast } from '@/components/common/Toast'
import type { Operator } from '@/types'

export function OperatorManagement() {
  const {
    operators,
    fetchAll,
    create,
    update,
    delete: deleteOperator,
  } = useOperators()
  const { showToast } = useToast()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(
    null
  )

  // Form states for create
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'operator',
    status: 'active',
  })

  // Form states for edit
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    phone: '',
    role: 'operator',
    status: 'active',
  })

  // Load operators on mount
  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const activeOperators = operators.filter(
    (op) => op.status === 'active'
  ).length
  const inactiveOperators = operators.filter(
    (op) => op.status === 'inactive'
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
                <Label htmlFor="operator-username">Nome de Usuário</Label>
                <Input
                  id="operator-username"
                  placeholder="Nome do operador"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operator-email">Email</Label>
                <Input
                  id="operator-email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operator-phone">Telefone</Label>
                <Input
                  id="operator-phone"
                  placeholder="+351 xxx xxx xxx"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operator-password">Senha Inicial</Label>
                <Input
                  id="operator-password"
                  type="password"
                  placeholder="Senha temporária"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operator-role">Função</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operator">Operador</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="operator-active"
                  checked={formData.status === 'active'}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      status: checked ? 'active' : 'inactive',
                    })
                  }
                />
                <Label htmlFor="operator-active">Operador ativo</Label>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  setFormData({
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: 'operator',
                    status: 'active',
                  })
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={async () => {
                  const newOperator = await create(formData)
                  if (newOperator) {
                    showToast(
                      'success',
                      `Operador ${newOperator.username} criado com sucesso!`
                    )
                    setIsAddDialogOpen(false)
                    setFormData({
                      username: '',
                      email: '',
                      phone: '',
                      password: '',
                      role: 'operator',
                      status: 'active',
                    })
                    // Refresh tabela
                    await fetchAll()
                  } else {
                    showToast(
                      'error',
                      'Erro ao criar operador. Tente novamente.'
                    )
                  }
                }}
              >
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
                <TableHead>Nome de Usuário</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operators.map((operator) => (
                <TableRow key={operator.id}>
                  <TableCell className="font-medium">
                    {operator.username}
                  </TableCell>
                  <TableCell>{operator.email}</TableCell>
                  <TableCell>{operator.phone}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        operator.status === 'active' ? 'default' : 'secondary'
                      }
                    >
                      {operator.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOperator(operator)
                          setEditFormData({
                            username: operator.username,
                            email: operator.email,
                            phone: operator.phone,
                            role: operator.role,
                            status: operator.status,
                          })
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOperator(operator)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
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
              Alterar dados do operador {selectedOperator?.username}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-operator-username">Nome de Usuário</Label>
              <Input
                id="edit-operator-username"
                value={editFormData.username}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, username: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-operator-email">Email</Label>
              <Input
                id="edit-operator-email"
                type="email"
                value={editFormData.email}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-operator-phone">Telefone</Label>
              <Input
                id="edit-operator-phone"
                value={editFormData.phone}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, phone: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-operator-role">Função</Label>
              <Select
                value={editFormData.role}
                onValueChange={(value) =>
                  setEditFormData({ ...editFormData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operator">Operador</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-operator-active"
                checked={editFormData.status === 'active'}
                onCheckedChange={(checked) =>
                  setEditFormData({
                    ...editFormData,
                    status: checked ? 'active' : 'inactive',
                  })
                }
              />
              <Label htmlFor="edit-operator-active">Operador ativo</Label>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={async () => {
                if (selectedOperator?.id) {
                  const updated = await update(
                    selectedOperator.id,
                    editFormData
                  )
                  if (updated) {
                    showToast(
                      'success',
                      `Operador ${editFormData.username} atualizado com sucesso!`
                    )
                    setIsEditDialogOpen(false)
                    // Refresh tabela
                    await fetchAll()
                  } else {
                    showToast(
                      'error',
                      'Erro ao atualizar operador. Tente novamente.'
                    )
                  }
                }
              }}
            >
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja deletar?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a deletar o operador{' '}
              <strong>{selectedOperator?.username}</strong>. Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (selectedOperator?.id) {
                  const success = await deleteOperator(selectedOperator.id)
                  if (success) {
                    showToast(
                      'success',
                      `Operador ${selectedOperator.username} deletado com sucesso!`
                    )
                    setIsDeleteDialogOpen(false)
                    setSelectedOperator(null)
                    // Refresh tabela
                    await fetchAll()
                  } else {
                    showToast(
                      'error',
                      'Erro ao deletar operador. Tente novamente.'
                    )
                  }
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Deletar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
