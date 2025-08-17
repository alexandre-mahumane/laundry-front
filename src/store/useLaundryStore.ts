import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Laundry } from '../types'

/**
 * Laundry Store
 * Manages laundry information and metadata using Zustand
 * Persisted to localStorage for recovery across sessions
 */

interface LaundryState {
  laundry: Laundry | null
  operatorId: string | null // Este é o ID do usuário logado (user.id)
  isLoading: boolean
  error: string | null
  setLaundry: (laundry: Laundry) => void
  setOperatorId: (operatorId: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clear: () => void
}

export const useLaundryStore = create<LaundryState>()(
  persist(
    (set) => ({
      laundry: null,
      operatorId: null,
      isLoading: false,
      error: null,

      setLaundry: (laundry: Laundry) => {
        set({ laundry, error: null })
      },

      setOperatorId: (operatorId: string) => {
        set({ operatorId })
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading })
      },

      setError: (error: string | null) => {
        set({ error })
      },

      clear: () => {
        set({
          laundry: null,
          operatorId: null,
          isLoading: false,
          error: null,
        })
      },
    }),
    {
      name: 'laundry-store', // localStorage key
      version: 1,
    }
  )
)

/**
 * Selector hook to get laundry ID
 * @returns laundry ID or null
 */
export const useLaundryId = () => useLaundryStore((state) => state.laundry?.id)

/**
 * Selector hook to get operator ID
 * @returns operator ID or null
 */
export const useOperatorId = () => useLaundryStore((state) => state.operatorId)

/**
 * Selector hook to get full laundry info
 * @returns laundry object or null
 */
export const useLaundry = () => useLaundryStore((state) => state.laundry)

/**
 * Debug hook to see full store state
 * @returns full laundry store state
 */
export const useLaundryStoreDebug = () => useLaundryStore()

// 🔥 Expose store to window for debugging in console
if (typeof window !== 'undefined') {
  ;(window as unknown as Record<string, unknown>).__laundryStore =
    useLaundryStore
  console.log('🔥 Zustand Laundry Store exposed to window.__laundryStore')
}
