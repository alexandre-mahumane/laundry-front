import { useAuth } from "@/store/AuthContext"
import { useLaundryStore } from "@/store/useLaundryStore"
import { ReportsSection } from "./reports-section"

/**
 * LaundryReports Component
 * Displays reports and analytics for a single laundry
 * Uses the integrated ReportsSection with real data from the API
 */
export function LaundryReports() {
  const { user } = useAuth()
  const { laundry } = useLaundryStore()

  // Get the laundry ID from store
  const laundryId = laundry?.id || ""

  return (
    <div className="w-full">
      <ReportsSection laundryId={laundryId} />
    </div>
  )
}
