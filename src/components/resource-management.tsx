import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  FileText,
  MessageSquare,
  Mail,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'

export function ResourceManagement() {
  const resources = [
    {
      id: 1,
      laundry: 'Lavandaria Norte',
      faturacao: true,
      sms: true,
      email: true,
      restrictions: [],
    },
    {
      id: 2,
      laundry: 'Clean Center',
      faturacao: true,
      sms: false,
      email: true,
      restrictions: ['Não pode enviar SMS'],
    },
    {
      id: 3,
      laundry: 'Express Wash',
      faturacao: false,
      sms: true,
      email: true,
      restrictions: ['Não pode imprimir recibos'],
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Recursos</h1>
        <p className="text-gray-600 mt-2">
          Controle de recursos e restrições por lavandaria
        </p>
      </div>

      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Faturação Ativa
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {resources.filter((r) => r.faturacao).length}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  de {resources.length} lavandarias
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SMS Ativo</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {resources.filter((r) => r.sms).length}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  de {resources.length} lavandarias
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Email Ativo</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {resources.filter((r) => r.email).length}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  de {resources.length} lavandarias
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Rules */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Regras de Recursos</CardTitle>
          <CardDescription>
            Restrições aplicadas baseadas nos recursos adquiridos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900">
                  Faturação Desabilitada
                </h4>
                <p className="text-sm text-red-700 mt-1">
                  Lavandarias sem o recurso de faturação não podem imprimir
                  recibos ou gerar faturas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900">
                  SMS Desabilitado
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Lavandarias sem o recurso de SMS não podem enviar notificações
                  por mensagem de texto
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">
                  Email Sempre Disponível
                </h4>
                <p className="text-sm text-green-700 mt-1">
                  O recurso de email está disponível para todas as lavandarias
                  por padrão
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Table */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Status dos Recursos por Lavandaria</CardTitle>
          <CardDescription>
            Visualização detalhada dos recursos habilitados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lavandaria</TableHead>
                <TableHead className="text-center">Faturação</TableHead>
                <TableHead className="text-center">SMS</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead>Restrições</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">
                    {resource.laundry}
                  </TableCell>
                  <TableCell className="text-center">
                    {resource.faturacao ? (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Ativo
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-800"
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Inativo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {resource.sms ? (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Ativo
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-800"
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Inativo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Ativo
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {resource.restrictions.length > 0 ? (
                      <div className="space-y-1">
                        {resource.restrictions.map((restriction, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs text-red-600 border-red-200"
                          >
                            {restriction}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-xs text-green-600 border-green-200"
                      >
                        Sem restrições
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Gerenciar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
