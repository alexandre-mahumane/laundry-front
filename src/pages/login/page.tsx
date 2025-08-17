import React, { useState } from 'react'
import { useAuth } from '@/store/AuthContext'
import { useToast } from '@/components/common/Toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Eye, EyeOff, Waves } from 'lucide-react'
import { ButtonLoader } from '@/components/common/Loading'

/**
 * Login Page - Refactored
 * Features:
 * - Integrated with AuthContext
 * - Toast notifications for feedback
 * - Loading states
 * - Error handling
 * - Form validation
 */

export default function LoginPage() {
  const { login } = useAuth()
  const { showToast } = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido'
    }

    // if (!password) {
    //   newErrors.password = 'Senha é obrigatória'
    // } else if (password.length < 6) {
    //   newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    // }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)
      setErrors({})

      // Call login from AuthContext
      await login({ email, password })

      // Success toast
      showToast('success', 'Login realizado com sucesso!')

      // Navigation is handled by AuthContext/ProtectedRoute
    } catch (error: any) {
      console.error('Login error:', error)

      // Show error toast
      const errorMessage =
        error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.'
      showToast('error', errorMessage)

      // Set form errors if available
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen -ml-72 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <Waves className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Sistema de Lavandaria
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Acesse o painel de controle
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@exemplo.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: undefined })
                  }}
                  className={`h-12 border-gray-200 focus:border-primary focus:ring-primary ${
                    errors.email ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  disabled={isLoading}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({ ...errors, password: undefined })
                    }}
                    className={`h-12 pr-12 border-gray-200 focus:border-primary focus:ring-primary ${
                      errors.password ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium shadow-lg transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <ButtonLoader />
                    Entrando...
                  </span>
                ) : (
                  'Entrar no Sistema'
                )}
              </Button>
            </form>

            {/* Forgot Password Link */}
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-sm text-primary hover:text-secondary transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  showToast('info', 'Funcionalidade em desenvolvimento')
                }}
              >
                Esqueceu sua senha?
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2024 Sistema de Gestão de Lavandarias
        </div>
      </div>
    </div>
  )
}
