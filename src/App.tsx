import AppRoutes from './routes'
import { ToastProvider } from './components/common/Toast'

/**
 * Main App Component
 * Wraps the application with necessary providers
 */

function App() {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  )
}

export default App
