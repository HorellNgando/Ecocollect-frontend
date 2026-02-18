import { useState } from 'react'
import { User, Lock, Mail, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({
    contact: '',
    password: '',
    rememberMe: false
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.contact.trim()) {
      newErrors.contact = 'L\'email ou le téléphone est requis'
    } else if (formData.contact.includes('@') && !/\S+@\S+\.\S+/.test(formData.contact)) {
      newErrors.contact = 'L\'email n\'est pas valide'
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Connexion réussie:', formData)
      // Redirect to dashboard page without alert
      window.location.href = '/dashboard'
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Email ou mot de passe incorrect. Veuillez réessayer.'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const isEmail = (contact) => contact.includes('@')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Connexion</h1>
          <p className="text-gray-600">Accédez à votre espace EcoCollect</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Contact Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ou Téléphone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              {isEmail(formData.contact) ? (
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              ) : (
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              )}
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.contact ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="votre@email.com ou +237 XX XX XX XX"
              />
            </div>
            {errors.contact && (
              <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Se souvenir de moi</span>
            </label>
            
            <a 
              href="/forgot-password" 
              className="text-sm text-green-600 hover:underline font-medium"
            >
              Mot de passe oublié ?
            </a>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Connexion en cours...
              </>
            ) : (
              <>
                Se connecter
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <a href="/register" className="text-green-600 hover:underline font-medium">
                Créer un compte
              </a>
            </p>
          </div>
        </form>

        {/* Quick Demo Access */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2">Accès rapide pour démonstration</p>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Demo: demo@ecocollect.cm / demo123</p>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  contact: 'demo@ecocollect.cm',
                  password: 'demo123',
                  rememberMe: false
                })
              }}
              className="text-xs text-green-600 hover:underline"
            >
              Remplir automatiquement
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
