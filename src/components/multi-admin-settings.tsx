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
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Database,
  Crown,
  AlertTriangle,
} from 'lucide-react'

export function MultiAdminSettings() {
  const [currentPlan] = useState({
    name: 'Premium',
    laundries: 5,
    maxLaundries: 5,
    price: 49.99,
    features: [
      'Até 5 lavandarias',
      'Operadores ilimitados',
      'Relatórios avançados',
      'Suporte prioritário',
      'Backup automático',
      'API personalizada',
    ],
  })

  const [notifications, setNotifications] = useState({
    emailReports: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReports: true,
    monthlyReports: true,
    lowActivityAlerts: true,
    revenueAlerts: true,
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-2">
            Gerir conta e preferências do sistema
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="plan">Plano & Faturação</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                Dados da sua conta de administrador
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">JS</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Alterar Foto
                  </Button>
                  <p className="text-sm text-gray-500">JPG, PNG até 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue="João Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="joao@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="+351 910 123 456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" defaultValue="Lavandarias Silva Lda" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Morada</Label>
                <Textarea
                  id="address"
                  defaultValue="Rua das Flores, 123&#10;1000-001 Lisboa&#10;Portugal"
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Plano Atual
              </CardTitle>
              <CardDescription>Gerir subscrição e faturação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Plano {currentPlan.name}
                    </h3>
                    <p className="text-gray-600">€{currentPlan.price}/mês</p>
                  </div>
                  <Badge variant="default" className="bg-blue-600">
                    <Crown className="w-3 h-3 mr-1" />
                    Ativo
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Lavandarias</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (currentPlan.laundries /
                                currentPlan.maxLaundries) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">
                        {currentPlan.laundries}/{currentPlan.maxLaundries}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Próxima Faturação
                    </p>
                    <p className="font-semibold">15 de Fevereiro, 2024</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-900">
                    Funcionalidades Incluídas:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentPlan.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline">Alterar Plano</Button>
                  <Button variant="outline">Ver Faturação</Button>
                </div>
              </div>

              {currentPlan.laundries >= currentPlan.maxLaundries && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900">
                        Limite de Lavandarias Atingido
                      </h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Você atingiu o limite de {currentPlan.maxLaundries}{' '}
                        lavandarias do seu plano atual. Para adicionar mais
                        lavandarias, faça upgrade do seu plano.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 bg-transparent"
                      >
                        Fazer Upgrade
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Método de Pagamento
              </CardTitle>
              <CardDescription>
                Cartão de crédito para faturação automática
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-xs text-white font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4532</p>
                    <p className="text-sm text-gray-500">Expira em 12/26</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Alterar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>
                Configure como deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Relatórios por Email</p>
                    <p className="text-sm text-gray-500">
                      Receber relatórios diários por email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailReports}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        emailReports: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas SMS</p>
                    <p className="text-sm text-gray-500">
                      Alertas urgentes via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, smsAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações Push</p>
                    <p className="text-sm text-gray-500">
                      Notificações no navegador
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        pushNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Relatórios Semanais</p>
                    <p className="text-sm text-gray-500">
                      Resumo semanal de performance
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        weeklyReports: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Relatórios Mensais</p>
                    <p className="text-sm text-gray-500">
                      Análise completa mensal
                    </p>
                  </div>
                  <Switch
                    checked={notifications.monthlyReports}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        monthlyReports: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas de Baixa Atividade</p>
                    <p className="text-sm text-gray-500">
                      Quando uma lavandaria tem baixa atividade
                    </p>
                  </div>
                  <Switch
                    checked={notifications.lowActivityAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        lowActivityAlerts: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas de Receita</p>
                    <p className="text-sm text-gray-500">
                      Quando metas de receita são atingidas
                    </p>
                  </div>
                  <Switch
                    checked={notifications.revenueAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        revenueAlerts: checked,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança da Conta
              </CardTitle>
              <CardDescription>
                Configurações de segurança e acesso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Alterar Senha
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">
                        Confirmar Nova Senha
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Alterar Senha</Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Autenticação de Dois Fatores (2FA)
                      </p>
                      <p className="text-sm text-gray-500">
                        Adicione uma camada extra de segurança
                      </p>
                    </div>
                    <Button variant="outline">Configurar 2FA</Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sessões Ativas</p>
                      <p className="text-sm text-gray-500">
                        Gerir dispositivos conectados
                      </p>
                    </div>
                    <Button variant="outline">Ver Sessões</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>
                Backup, exportação e configurações avançadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">Backup Automático</p>
                    <p className="text-sm text-gray-500">
                      Último backup: Hoje às 03:00
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                    <Button variant="outline" size="sm">
                      Backup Manual
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">Exportar Dados</p>
                    <p className="text-sm text-gray-500">
                      Exportar todos os dados em formato JSON
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Exportar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">Logs do Sistema</p>
                    <p className="text-sm text-gray-500">
                      Ver atividade e logs de auditoria
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Logs
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-red-900">Eliminar Conta</p>
                    <p className="text-sm text-red-700">
                      Eliminar permanentemente a conta e todos os dados
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                      >
                        Eliminar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmar Eliminação</DialogTitle>
                        <DialogDescription>
                          Esta ação não pode ser desfeita. Todos os dados serão
                          permanentemente eliminados.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline">Cancelar</Button>
                        <Button variant="destructive">
                          Confirmar Eliminação
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
