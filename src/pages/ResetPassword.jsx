import { useState } from 'react'
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react'

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    code: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!formData.code.trim()) {
      newErrors.code = 'Le code de réinitialisation est requis'
    } else if (formData.code.length !== 6) {
      newErrors.code = 'Le code doit contenir 6 caractères'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Le nouveau mot de passe est requis'
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins 6 caractères'
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
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
      
      console.log('Mot de passe réinitialisé avec succès')
      setIsSuccess(true)
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Code invalide ou expiré. Veuillez réessayer.'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Mot de passe réinitialisé !</h1>
            <p className="text-gray-600">
              Votre mot de passe a été mis à jour avec succès
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">Prochaines étapes :</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Utilisez votre nouveau mot de passe pour vous connecter</li>
                <li>• Conservez ce mot de passe en lieu sûr</li>
                <li>• Changez-le régulièrement pour plus de sécurité</li>
              </ul>
            </div>

            <div className="space-y-3">
              <a
                href="/login"
                className="block w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-center"
              >
                Se connecter avec le nouveau mot de passe
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Nouveau mot de passe</h1>
          <p className="text-gray-600">
            Saisissez le code reçu et votre nouveau mot de passe
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Code Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code de réinitialisation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              maxLength={6}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg font-mono ${
                errors.code ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="000000"
            />
            {errors.code && (
              <p className="text-red-500 text-xs mt-1">{errors.code}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Entrez le code à 6 chiffres reçu par email/SMS
            </p>
          </div>

          {/* New Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nouveau mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-300'
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
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className={`w-3 h-3 rounded-full ${formData.newPassword.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-gray-600">Au moins 6 caractères</span>
              </div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
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
                Réinitialisation en cours...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Valider le nouveau mot de passe
              </>
            )}
          </button>

          {/* Back to Login */}
          <div className="text-center">
            <a href="/login" className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </a>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-2">Conseils de sécurité :</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Utilisez un mélange de lettres, chiffres et symboles</li>
            <li>• Évitez les informations personnelles évidentes</li>
            <li>• Ne réutilisez pas d'anciens mots de passe</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
