import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  User, MapPin, Phone, Mail, Edit2, Save, X, 
  Camera, Upload, CheckCircle, AlertCircle, LogOut,
  Navigation, Building, Shield, Star, Clock
} from 'lucide-react'
import Layout from '../../components/Layout'

const ProfileCollector = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: 'Michel',
    lastName: 'Martin',
    email: 'michel.martin@email.com',
    phone: '+237 6 987 654 32',
    address: 'Quartier Akwa, Douala',
    businessName: 'Martin Collecte',
    businessLicense: 'BZ2023-456789',
    experience: '3 ans',
    serviceArea: 'Douala et environs',
    specializations: ['Organiques', 'Plastiques', 'Papier'],
    description: 'Service de collecte professionnel et fiable',
    location: {
      latitude: 4.0483,
      longitude: 9.7043
    }
  })
  const [editData, setEditData] = useState(profileData)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const businessStatuses = [
    { id: 'independent', label: 'Indépendant', description: 'Travailleur autonome' },
    { id: 'cooperative', label: 'Coopérative', description: 'Groupe organisé' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleLocationUpdate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setEditData(prev => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }))
          setSuccess('Position mise à jour avec succès')
          setTimeout(() => setSuccess(''), 3000)
        },
        (error) => {
          setErrors(prev => ({
            ...prev,
            location: 'Impossible d\'obtenir votre position'
          }))
        }
      )
    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          photo: 'La taille du fichier ne doit pas dépasser 5MB'
        }))
        return
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          photo: 'Veuillez télécharger une image valide'
        }))
        return
      }

      setEditData(prev => ({
        ...prev,
        photo: file
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!editData.firstName.trim()) newErrors.firstName = 'Le nom est requis'
    if (!editData.lastName.trim()) newErrors.lastName = 'Le prénom est requis'
    
    if (editData.email && !/\S+@\S+\.\S+/.test(editData.email)) {
      newErrors.email = 'L\'email n\'est pas valide'
    }

    if (!editData.interventionZone.trim()) {
      newErrors.interventionZone = 'La zone d\'intervention est requise'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setProfileData({ ...editData })
      setIsEditing(false)
      setSuccess('Profil mis à jour avec succès')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Une erreur est survenue. Veuillez réessayer.'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditing(false)
    setErrors({})
    setSuccess('')
  }

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    console.log('Déconnexion...')
    window.location.href = '/'
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  const openInMaps = () => {
    const { latitude, longitude } = profileData.location
    window.open(`https://maps.google.com/?q=${latitude},${longitude}`, '_blank')
  }

  return (
    <Layout 
      pageTitle="Profil Collecteur" 
      currentPage="profile" 
      userRole="collector"
    >

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.submit && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-700">{errors.submit}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Photo et Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Photo */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  {profileData.photo ? (
                    <img
                      src={URL.createObjectURL(profileData.photo)}
                      alt="Profile"
                      className="h-24 w-24 rounded-full object-cover border-4 border-blue-100"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                      <User className="h-12 w-12 text-white" />
                    </div>
                  )}
                  
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                      <Camera className="h-4 w-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">{profileData.rating}</span>
                  <span className="text-sm text-gray-500">({profileData.totalMissions} missions)</span>
                </div>
                
                {profileData.verified && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Vérifié</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Membre depuis</span>
                  <span className="text-sm font-medium text-gray-900">{profileData.joinDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total missions</span>
                  <span className="text-sm font-medium text-gray-900">{profileData.totalMissions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Note moyenne</span>
                  <span className="text-sm font-medium text-gray-900">{profileData.rating}/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Informations personnelles</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <User className="h-4 w-4 text-blue-600" />
                    Nom
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-blue-600 transition-all ${
                        errors.firstName ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                  ) : (
                    <p className="text-gray-900 py-3.5 px-4 bg-gray-50 rounded-xl">
                      {profileData.firstName}
                    </p>
                  )}
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <User className="h-4 w-4 text-blue-600" />
                    Prénom
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-blue-600 transition-all ${
                        errors.lastName ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                  ) : (
                    <p className="text-gray-900 py-3.5 px-4 bg-gray-50 rounded-xl">
                      {profileData.lastName}
                    </p>
                  )}
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Mail className="h-4 w-4 text-blue-600" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-blue-600 transition-all ${
                        errors.email ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                  ) : (
                    <p className="text-gray-900 py-3.5 px-4 bg-gray-50 rounded-xl">
                      {profileData.email}
                    </p>
                  )}
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Phone className="h-4 w-4 text-blue-600" />
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  ) : (
                    <p className="text-gray-900 py-3.5 px-4 bg-gray-50 rounded-xl">
                      {profileData.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Building className="h-4 w-4 text-blue-600" />
                  Statut professionnel
                </label>
                {isEditing ? (
                  <select
                    name="businessStatus"
                    value={editData.businessStatus}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-blue-600 transition-all"
                  >
                    {businessStatuses.map(status => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900 py-3.5 px-4 bg-gray-50 rounded-xl">
                    {businessStatuses.find(s => s.id === profileData.businessStatus)?.label}
                  </p>
                )}
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Zone d'intervention
                </label>
                {isEditing ? (
                  <textarea
                    name="interventionZone"
                    value={editData.interventionZone}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full rounded-xl border-0 bg-gray-50 px-4 py-3.5 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-blue-600 transition-all ${
                      errors.interventionZone ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                ) : (
                  <p className="text-gray-900 py-3.5 px-4 bg-gray-50 rounded-xl">
                    {profileData.interventionZone}
                  </p>
                )}
                {errors.interventionZone && (
                  <p className="text-red-500 text-xs mt-1">{errors.interventionZone}</p>
                )}
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Navigation className="h-4 w-4 text-blue-600" />
                  Localisation GPS
                </label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Latitude: {profileData.location.latitude.toFixed(6)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Longitude: {profileData.location.longitude.toFixed(6)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing && (
                        <button
                          onClick={handleLocationUpdate}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Navigation className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={openInMaps}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <MapPin className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>
            </div>
          </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <LogOut className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Déconnexion</h3>
              <p className="text-gray-600 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
              <div className="flex gap-3">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ProfileCollector
