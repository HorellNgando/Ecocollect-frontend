import { useState } from 'react'
import { 
  User, MapPin, Mail, Phone, Lock, Camera, Upload, 
  Check, AlertCircle, ArrowRight, Home, Building2, Store,
  Leaf, Recycle, Shield, Fingerprint, Globe, Sparkles,
  ChevronRight, Eye, EyeOff, CheckCircle, XCircle
} from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    producerType: '',
    city: '',
    collectionPoint: '',
    neighborhood: '',
    cniRecto: null,
    cniVerso: null,
    acceptTerms: false
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadProgress, setUploadProgress] = useState({ recto: 0, verso: 0 })

  const producerTypes = [
    { id: 'household', label: 'Ménage', icon: Home, color: 'emerald', description: 'Particulier', waste: '5-10 kg/semaine' },
    { id: 'commerce', label: 'Commerce', icon: Store, color: 'green', description: 'Boutique, restaurant', waste: '20-50 kg/semaine' },
    { id: 'enterprise', label: 'Entreprise', icon: Building2, color: 'teal', description: 'PME, industrie', waste: '100+ kg/semaine' }
  ]

  const steps = [
    { id: 1, label: 'Identité', icon: User },
    { id: 2, label: 'Localisation', icon: MapPin },
    { id: 3, label: 'Documents', icon: Shield }
  ]

  const passwordRequirements = [
    { id: 'minLength', label: 'Au moins 6 caractères', regex: /.{6,}/ },
    { id: 'number', label: 'Au moins 1 chiffre', regex: /\d/ },
    { id: 'letter', label: 'Au moins 1 lettre', regex: /[a-zA-Z]/ }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleLocationClick = () => {
    setLocationLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulation de reverse geocoding
          setFormData(prev => ({
            ...prev,
            collectionPoint: `Lat: ${position.coords.latitude.toFixed(6)}, Lng: ${position.coords.longitude.toFixed(6)}`
          }))
          setLocationLoading(false)
        },
        (error) => {
          setErrors(prev => ({
            ...prev,
            location: 'Impossible d\'obtenir votre position. Veuillez saisir manuellement.'
          }))
          setLocationLoading(false)
        }
      )
    } else {
      setErrors(prev => ({
        ...prev,
        location: 'La géolocalisation n\'est pas supportée par votre navigateur.'
      }))
      setLocationLoading(false)
    }
  }

  const handleFileUpload = (e, side) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [`cni${side}`]: 'La taille du fichier ne doit pas dépasser 5MB'
        }))
        return
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          [`cni${side}`]: 'Veuillez télécharger une image valide'
        }))
        return
      }

      setFormData(prev => ({
        ...prev,
        [`cni${side}`]: file
      }))

      // Simulation de progression d'upload
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(prev => ({ ...prev, [side.toLowerCase()]: progress }))
        if (progress >= 100) clearInterval(interval)
      }, 100)

      if (errors[`cni${side}`]) {
        setErrors(prev => ({
          ...prev,
          [`cni${side}`]: ''
        }))
      }
    }
  }

  const checkPasswordStrength = () => {
    const password = formData.password
    if (!password) return { strength: 0, label: 'Faible', color: 'red' }
    
    const checks = passwordRequirements.map(req => req.regex.test(password))
    const strength = checks.filter(Boolean).length
    
    if (strength === 0) return { strength: 0, label: 'Très faible', color: 'red' }
    if (strength === 1) return { strength: 1, label: 'Faible', color: 'orange' }
    if (strength === 2) return { strength: 2, label: 'Moyen', color: 'yellow' }
    return { strength: 3, label: 'Fort', color: 'green' }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Le nom est requis'
      if (!formData.lastName.trim()) newErrors.lastName = 'Le prénom est requis'
      
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'L\'email n\'est pas valide'
      }

      if (!formData.password) newErrors.password = 'Le mot de passe est requis'
      else if (formData.password.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
      }

      if (!formData.producerType) newErrors.producerType = 'Le type de producteur est requis'
    }

    if (step === 2) {
      if (!formData.city.trim()) newErrors.city = 'La ville est requise'
      if (!formData.collectionPoint.trim()) newErrors.collectionPoint = 'Le point de collecte est requis'
      if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Le quartier est requis'
    }

    if (step === 3) {
      if (!formData.cniRecto) newErrors.cniRecto = 'La photo recto de la CNI est requise'
      if (!formData.cniVerso) newErrors.cniVerso = 'La photo verso de la CNI est requise'
      if (!formData.acceptTerms) newErrors.acceptTerms = 'Vous devez accepter les conditions générales'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(3)) return

    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Inscription réussie:', formData)
      // Redirection directe vers le dashboard
      window.location.href = '/dashboard'
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Une erreur est survenue. Veuillez réessayer.'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = checkPasswordStrength()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header avec design premium */}
        <div className="text-center mb-10">
          <div className="relative inline-flex mb-6">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 opacity-75 blur-lg animate-pulse" />
            <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center shadow-xl">
              <Recycle className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Rejoignez la révolution verte
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Créez votre compte et commencez à contribuer à un environnement plus propre
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 relative">
                <div className="flex items-center">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg scale-110'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    {currentStep > step.id && (
                      <div className="absolute -top-1 -right-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Étape {step.id}</p>
                    <p className="text-xs text-gray-500">{step.label}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-5 left-10 right-0 h-0.5 transition-all ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          
          {/* Étape 1: Informations personnelles */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Qui êtes-vous ?</h2>
                <p className="text-gray-600">Renseignez vos informations personnelles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <User className="h-4 w-4 text-emerald-600" />
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-600 transition-all ${
                      errors.firstName ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Votre nom"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <User className="h-4 w-4 text-emerald-600" />
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-600 transition-all ${
                      errors.lastName ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Votre prénom"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border-0 bg-gray-50 pl-11 pr-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-600 transition-all ${
                        errors.email ? 'ring-2 ring-red-500' : ''
                      }`}
                      placeholder="vous@exemple.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border-0 bg-gray-50 pl-11 pr-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-600 transition-all"
                      placeholder="+237 6XX XXX XXX"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Lock className="h-4 w-4 text-emerald-600" />
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border-0 bg-gray-50 pl-11 pr-12 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-600 transition-all ${
                        errors.password ? 'ring-2 ring-red-500' : ''
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-full rounded-full bg-gray-200 overflow-hidden`}>
                          <div 
                            className={`h-full rounded-full transition-all ${
                              passwordStrength.strength === 0 ? 'w-1/4 bg-red-500' :
                              passwordStrength.strength === 1 ? 'w-2/4 bg-orange-500' :
                              passwordStrength.strength === 2 ? 'w-3/4 bg-yellow-500' :
                              'w-full bg-green-500'
                            }`} 
                          />
                        </div>
                        <span className={`text-xs font-medium text-${passwordStrength.color}-600`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {passwordRequirements.map(req => {
                          const isValid = req.regex.test(formData.password)
                          return (
                            <div key={req.id} className="flex items-center gap-2 text-xs">
                              {isValid ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <XCircle className="h-3 w-3 text-gray-400" />
                              )}
                              <span className={isValid ? 'text-green-600' : 'text-gray-500'}>
                                {req.label}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Lock className="h-4 w-4 text-emerald-600" />
                    Confirmer <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border-0 bg-gray-50 pl-11 pr-12 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-600 transition-all ${
                        errors.confirmPassword ? 'ring-2 ring-red-500' : ''
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Building2 className="h-4 w-4 text-emerald-600" />
                  Type de producteur <span className="text-red-500">*</span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {producerTypes.map(type => {
                    const Icon = type.icon
                    const isSelected = formData.producerType === type.id
                    
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, producerType: type.id }))}
                        className={`group relative overflow-hidden rounded-xl p-4 transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-emerald-50 to-green-50 ring-2 ring-emerald-600 shadow-lg scale-105'
                            : 'bg-gray-50 ring-1 ring-gray-200 hover:ring-emerald-300 hover:shadow-md'
                        }`}
                      >
                        <div className="relative">
                          <div className={`mb-3 inline-flex rounded-lg p-2.5 ${
                            isSelected ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="font-semibold text-gray-900">{type.label}</h3>
                          <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                          <p className="text-xs text-emerald-600 mt-2 font-medium">{type.waste}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
                {errors.producerType && (
                  <p className="text-red-500 text-xs mt-1">{errors.producerType}</p>
                )}
              </div>
            </div>
          )}

          {/* Étape 2: Localisation */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Où collectons-nous ?</h2>
                <p className="text-gray-600">Indiquez votre adresse de collecte</p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Ville <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-emerald-600 transition-all ${
                        errors.city ? 'ring-2 ring-red-500' : ''
                      }`}
                    >
                      <option value="">Sélectionner une ville</option>
                      <option value="douala">Douala</option>
                      <option value="yaounde">Yaoundé</option>
                      <option value="bafoussam">Bafoussam</option>
                      <option value="buea">Buea</option>
                      <option value="limbe">Limbe</option>
                      <option value="kribi">Kribi</option>
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Point de collecte <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="collectionPoint"
                      value={formData.collectionPoint}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-emerald-600 transition-all ${
                        errors.collectionPoint ? 'ring-2 ring-red-500' : ''
                      }`}
                    >
                      <option value="">Sélectionner un point</option>
                      <option value="bonanjo">Bonanjo (Centre-ville)</option>
                      <option value="akwa">Akwa</option>
                      <option value="deido">Deido</option>
                      <option value="bepanda">Bépanda</option>
                      <option value="makepe">Makepe</option>
                    </select>
                    {errors.collectionPoint && (
                      <p className="text-red-500 text-xs mt-1">{errors.collectionPoint}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Quartier <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-600 transition-all ${
                      errors.neighborhood ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Ex: Bonamoussadi, Ndogpassi..."
                  />
                  {errors.neighborhood && (
                    <p className="text-red-500 text-xs mt-1">{errors.neighborhood}</p>
                  )}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={handleLocationClick}
                    disabled={locationLoading}
                    className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-4 text-white font-medium transition-all hover:shadow-xl disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                    <div className="relative flex items-center justify-center gap-3">
                      {locationLoading ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Recherche de votre position...</span>
                        </>
                      ) : (
                        <>
                          <Globe className="h-5 w-5" />
                          <span>📍 Utiliser ma position GPS</span>
                        </>
                      )}
                    </div>
                  </button>
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-2">{errors.location}</p>
                  )}
                </div>

                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-emerald-100 p-1.5">
                      <Leaf className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-900">Pourquoi votre localisation ?</p>
                      <p className="text-xs text-emerald-700 mt-1">
                        Elle nous permet d'optimiser nos tournées de collecte et de réduire notre empreinte carbone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Étape 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérification d'identité</h2>
                <p className="text-gray-600">Pour la sécurité de tous, nous vérifions votre identité</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Recto CNI */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Recto CNI <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="cniRecto"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'Recto')}
                      className="hidden"
                    />
                    <label
                      htmlFor="cniRecto"
                      className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                        errors.cniRecto 
                          ? 'border-red-300 bg-red-50/50' 
                          : formData.cniRecto 
                            ? 'border-emerald-300 bg-emerald-50/50' 
                            : 'border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50/30'
                      }`}
                    >
                      {formData.cniRecto ? (
                        <>
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
                            <div className="relative rounded-full bg-emerald-100 p-3 mb-3">
                              <Check className="h-8 w-8 text-emerald-600" />
                            </div>
                          </div>
                          <span className="text-sm font-medium text-emerald-700 mb-1">Fichier téléchargé</span>
                          <span className="text-xs text-emerald-600">{formData.cniRecto.name}</span>
                          {uploadProgress.recto < 100 && (
                            <div className="w-full mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-600 transition-all duration-300"
                                style={{ width: `${uploadProgress.recto}%` }}
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="rounded-full bg-gray-100 p-3 mb-3">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 mb-1">Recto de la CNI</span>
                          <span className="text-xs text-gray-500">Cliquez pour télécharger</span>
                          <span className="text-xs text-gray-400 mt-2">PNG, JPG (max 5MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                  {errors.cniRecto && (
                    <p className="text-red-500 text-xs mt-1">{errors.cniRecto}</p>
                  )}
                </div>

                {/* Verso CNI */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Verso CNI <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="cniVerso"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'Verso')}
                      className="hidden"
                    />
                    <label
                      htmlFor="cniVerso"
                      className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                        errors.cniVerso 
                          ? 'border-red-300 bg-red-50/50' 
                          : formData.cniVerso 
                            ? 'border-emerald-300 bg-emerald-50/50' 
                            : 'border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50/30'
                      }`}
                    >
                      {formData.cniVerso ? (
                        <>
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
                            <div className="relative rounded-full bg-emerald-100 p-3 mb-3">
                              <Check className="h-8 w-8 text-emerald-600" />
                            </div>
                          </div>
                          <span className="text-sm font-medium text-emerald-700 mb-1">Fichier téléchargé</span>
                          <span className="text-xs text-emerald-600">{formData.cniVerso.name}</span>
                          {uploadProgress.verso < 100 && (
                            <div className="w-full mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-600 transition-all duration-300"
                                style={{ width: `${uploadProgress.verso}%` }}
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="rounded-full bg-gray-100 p-3 mb-3">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 mb-1">Verso de la CNI</span>
                          <span className="text-xs text-gray-500">Cliquez pour télécharger</span>
                          <span className="text-xs text-gray-400 mt-2">PNG, JPG (max 5MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                  {errors.cniVerso && (
                    <p className="text-red-500 text-xs mt-1">{errors.cniVerso}</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Photos requises pour la validation</p>
                    <p className="text-xs text-amber-700 mt-1">
                      • Recto et verso de votre CNI en cours de validité<br />
                      • Photos claires et bien cadrées<br />
                      • Format accepté : JPG, PNG - Max 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-emerald-600 border-2 border-gray-300 rounded-lg focus:ring-emerald-500 focus:ring-offset-0 transition-all group-hover:border-emerald-400"
                  />
                  <span className="text-sm text-gray-700">
                    J'accepte les{' '}
                    <a href="/terms" className="text-emerald-600 font-medium hover:underline hover:text-emerald-700">
                      conditions générales
                    </a>
                    {' '}et la{' '}
                    <a href="/privacy" className="text-emerald-600 font-medium hover:underline hover:text-emerald-700">
                      politique de confidentialité
                    </a>
                    <span className="text-red-500 ml-1">*</span>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-red-500 text-xs mt-2">{errors.acceptTerms}</p>
                )}
              </div>
            </div>
          )}

          {/* Messages d'erreur globaux */}
          {errors.submit && (
            <div className="mt-6 animate-slideDown rounded-xl bg-red-50 border border-red-200 p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-sm text-red-800">{errors.submit}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex-1 px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                Précédent
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                Étape suivante
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Création en cours...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    <span>Créer mon compte</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Lien connexion */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <a href="/login" className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-all">
                Se connecter
              </a>
            </p>
          </div>
        </form>

        {/* Badge de confiance */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Données sécurisées
          </div>
          <div className="flex items-center gap-1">
            <Fingerprint className="h-4 w-4" />
            Vérification KYC
          </div>
          <div className="flex items-center gap-1">
            <Recycle className="h-4 w-4" />
            Engagement éco
          </div>
        </div>
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Register