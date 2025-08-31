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
import { Switch } from '@/components/ui/switch'
import {
  Shield,
  Bell,
  FileText,
  MessageSquare,
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import { useLaundrySettings } from '@/hooks/useLaundrySettings'
import type { UpdateLaundrySettingsData } from '@/types'

export function LaundrySettings() {
  const { laundrySettings, loading, error, updateLaundrySettings } = useLaundrySettings()
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Estado local para os inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  })

  // Sincronizar formData com laundrySettings quando carregar
  useEffect(() => {
    if (laundrySettings) {
      setFormData({
        name: laundrySettings.name || '',
        email: laundrySettings.email || '',
        phone: laundrySettings.phone || '',
        location: laundrySettings.location || '',
      })
    }
  }, [laundrySettings])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target
    const fieldName = id.replace('laundry-', '')
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setSaveSuccess(false)
      setSaveError(null)

      const updateData: UpdateLaundrySettingsData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
      }

      await updateLaundrySettings(updateData)
      setSaveSuccess(true)

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao salvar configurações'
      setSaveError(errorMessage)
      console.error('Erro ao salvar configurações:', err)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando configurações...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">
          Configurações da lavandaria
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Success Alert */}
      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-800">Configurações salvas com sucesso!</p>
        </div>
      )}

      {/* Save Error Alert */}
      {saveError && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800">{saveError}</p>
        </div>
      )}

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
              <Input
                id="laundry-name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nome da lavandaria"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="laundry-phone">Telefone</Label>
              <Input
                id="laundry-phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Telefone"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="laundry-location">Localização</Label>
            <Input
              id="laundry-location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Endereço completo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="laundry-email">Email</Label>
            <Input
              id="laundry-email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email da lavandaria"
            />
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Alterações'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Resources Status */}
      {laundrySettings && (
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
              {laundrySettings.hasBilling && (
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
              )}

              {laundrySettings.hasSmSService && (
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
              )}

              {laundrySettings.hasEmailService && (
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
              )}

              {!laundrySettings.hasBilling && !laundrySettings.hasSmSService && !laundrySettings.hasEmailService && (
                <p className="text-center text-gray-500 py-4">
                  Nenhum recurso adicional ativo
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
    </div>
  )
}
