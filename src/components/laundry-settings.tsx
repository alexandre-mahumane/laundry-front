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
import { Textarea } from '@/components/ui/textarea'
import {
  Settings,
  Shield,
  Bell,
  FileText,
  MessageSquare,
  Mail,
} from 'lucide-react'

export function LaundrySettings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">
          Configurações da lavandaria e recursos
        </p>
      </div>

      {/* Laundry Info */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Informações da Lavandaria</CardTitle>
          <CardDescription>Dados básicos da sua lavandaria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="laundry-name">Nome da Lavandaria</Label>
              <Input id="laundry-name" defaultValue="Lavandaria Norte" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="laundry-phone">Telefone</Label>
              <Input id="laundry-phone" defaultValue="+351 210 123 456" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="laundry-address">Endereço Completo</Label>
            <Input
              id="laundry-address"
              defaultValue="Rua das Flores, 123 - Lisboa"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="laundry-email">Email</Label>
            <Input
              id="laundry-email"
              type="email"
              defaultValue="norte@lavandaria.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="laundry-description">Descrição</Label>
            <Textarea
              id="laundry-description"
              rows={3}
              defaultValue="Lavandaria especializada em serviços de qualidade com atendimento personalizado."
            />
          </div>
          <Button>Salvar Alterações</Button>
        </CardContent>
      </Card>

      {/* Resources Status */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Status dos Recursos
          </CardTitle>
          <CardDescription>Recursos ativos na sua lavandaria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">Faturação</h4>
                  <p className="text-sm text-green-700">
                    Impressão de recibos e faturas
                  </p>
                </div>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Ativo
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">SMS</h4>
                  <p className="text-sm text-green-700">Notificações por SMS</p>
                </div>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Ativo
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">Email</h4>
                  <p className="text-sm text-green-700">
                    Notificações por email
                  </p>
                </div>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Ativo
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Configurações de Notificações
          </CardTitle>
          <CardDescription>
            Configure quando e como enviar notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">
                  Notificar cliente quando pedido estiver pronto
                </h4>
                <p className="text-sm text-gray-500">
                  Enviar SMS/Email automaticamente
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Lembrete de retirada após 24h</h4>
                <p className="text-sm text-gray-500">
                  Lembrar cliente se não retirou o pedido
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">
                  Confirmação de recebimento do pedido
                </h4>
                <p className="text-sm text-gray-500">
                  Confirmar recebimento via SMS/Email
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações do Sistema
          </CardTitle>
          <CardDescription>Configurações gerais do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="working-hours">Horário de Funcionamento</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input id="opening-time" type="time" defaultValue="08:00" />
                <Input id="closing-time" type="time" defaultValue="18:00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-service-time">
                Tempo padrão de serviço (horas)
              </Label>
              <Input
                id="default-service-time"
                type="number"
                defaultValue="24"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Modo de manutenção</h4>
                <p className="text-sm text-gray-500">
                  Desabilitar temporariamente novos pedidos
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Backup automático</h4>
                <p className="text-sm text-gray-500">Backup diário dos dados</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Button>Salvar Configurações</Button>
        </CardContent>
      </Card>
    </div>
  )
}
