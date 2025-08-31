import { useState, useEffect } from 'react'
import apiClient from '@/api/client'
import { endpoints } from '@/api/endpoints'
import type { LaundrySettings, UpdateLaundrySettingsData } from '@/types'

interface UseLaundrySettingsReturn {
  laundrySettings: LaundrySettings | null
  loading: boolean
  error: string | null
  updateLaundrySettings: (data: UpdateLaundrySettingsData) => Promise<void>
  refetch: () => Promise<void>
}

/**
 * Hook para gerenciar configurações da lavanderia
 * Faz fetch dos dados da lavanderia e permite atualizações
 */
export function useLaundrySettings(): UseLaundrySettingsReturn {
  const [laundrySettings, setLaundrySettings] =
    useState<LaundrySettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch inicial dos dados da lavanderia
  useEffect(() => {
    fetchLaundrySettings()
  }, [])

  /**
   * Busca as configurações da lavanderia
   * Faz GET na lista e extrai o primeiro item
   */
  const fetchLaundrySettings = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiClient.get(endpoints.laundry.listByAdmin)
      const laundries = response.data

      // Validar se retornou dados
      if (Array.isArray(laundries) && laundries.length > 0) {
        const laundryData = laundries[0]

        // Mapear para o tipo LaundrySettings
        const settings: LaundrySettings = {
          id: laundryData.id,
          name: laundryData.name,
          email: laundryData.email,
          phone: laundryData.phone,
          location: laundryData.location,
          adminId: laundryData.adminId,
          hasBilling: laundryData.hasBilling,
          hasEmailService: laundryData.hasEmailService,
          hasSmSService: laundryData.hasSmSService,
          isDeleted: laundryData.isDeleted,
          status: laundryData.status,
        }

        setLaundrySettings(settings)
      } else {
        setError('Nenhuma lavanderia encontrada')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao buscar configurações'
      setError(errorMessage)
      console.error('❌ Erro ao buscar laundry settings:', err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Atualiza as configurações da lavanderia
   */
  const updateLaundrySettings = async (data: UpdateLaundrySettingsData) => {
    if (!laundrySettings) {
      setError('Nenhuma lavanderia carregada')
      return
    }

    try {
      setError(null)

      const response = await apiClient.put(
        endpoints.laundry.update(laundrySettings.id),
        data
      )

      // Atualizar estado com os novos dados
      setLaundrySettings({
        ...laundrySettings,
        ...response.data,
      })

      console.log('✅ Configurações salvas com sucesso')
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao atualizar configurações'
      setError(errorMessage)
      console.error('❌ Erro ao atualizar laundry settings:', err)
      throw err
    }
  }

  return {
    laundrySettings,
    loading,
    error,
    updateLaundrySettings,
    refetch: fetchLaundrySettings,
  }
}
