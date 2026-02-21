import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Package, MapPin, Clock, DollarSign, Navigation, 
  Filter, Search, Calendar, AlertCircle, CheckCircle,
  Truck, Star, Phone, MessageSquare, Eye, ChevronRight,
  Target, Activity, TrendingUp, ArrowRight
} from 'lucide-react'
import Layout from '../../components/Layout'

const MissionsCollector = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMission, setSelectedMission] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  const [missions, setMissions] = useState([
    {
      id: 1,
      status: 'new',
      producerName: 'Restaurant Le Gourmet',
      producerPhone: '+237 698 123 456',
      location: 'Bonanjo, Douala',
      coordinates: { lat: 4.0581, lng: 9.7043 },
      wasteType: 'Organiques',
      estimatedQuantity: '25 kg',
      distance: '2.3 km',
      estimatedEarnings: 2500,
      urgency: 'high',
      timeAgo: 'Il y a 5 min',
      description: 'Déchets de cuisine quotidiens',
      producerRating: 4.5,
      specialInstructions: 'Passer par l\'arrière du restaurant'
    },
    {
      id: 2,
      status: 'accepted',
      producerName: 'Supermarket Eko',
      producerPhone: '+237 698 234 567',
      location: 'Akwa, Douala',
      coordinates: { lat: 4.0500, lng: 9.7000 },
      wasteType: 'Plastiques',
      estimatedQuantity: '40 kg',
      distance: '1.8 km',
      estimatedEarnings: 4000,
      urgency: 'medium',
      timeAgo: 'Il y a 1h',
      description: 'Emballages plastiques et bouteilles',
      producerRating: 4.8,
      acceptedAt: 'Il y a 1h',
      estimatedDuration: '30 min'
    },
    {
      id: 3,
      status: 'in_progress',
      producerName: 'Hotel Atlantic',
      producerPhone: '+237 698 345 678',
      location: 'Deido, Douala',
      coordinates: { lat: 4.0600, lng: 9.7100 },
      wasteType: 'Mixtes',
      estimatedQuantity: '60 kg',
      distance: '4.1 km',
      estimatedEarnings: 6000,
      urgency: 'low',
      timeAgo: 'Il y a 3h',
      description: 'Déchets hôteliers variés',
      producerRating: 4.2,
      startedAt: 'Il y a 30 min',
      currentStep: 'collecting'
    },
    {
      id: 4,
      status: 'completed',
      producerName: 'Boulangerie Paul',
      producerPhone: '+237 698 456 789',
      location: 'Bépanda, Douala',
      coordinates: { lat: 4.0450, lng: 9.6950 },
      wasteType: 'Organiques',
      estimatedQuantity: '15 kg',
      distance: '3.2 km',
      estimatedEarnings: 1500,
      urgency: 'low',
      timeAgo: 'Il y a 5h',
      description: 'Pain invendu et déchets de farine',
      producerRating: 4.9,
      completedAt: 'Il y a 2h',
      actualQuantity: '18 kg',
      finalEarnings: 1800,
      producerFeedback: 'Service rapide et professionnel'
    },
    {
      id: 5,
      status: 'deposited',
      producerName: 'Pharmacie Centrale',
      producerPhone: '+237 698 567 890',
      location: 'Makepe, Douala',
      coordinates: { lat: 4.0400, lng: 9.6900 },
      wasteType: 'Spéciaux',
      estimatedQuantity: '8 kg',
      distance: '5.5 km',
      estimatedEarnings: 3000,
      urgency: 'high',
      timeAgo: 'Il y a 1 jour',
      description: 'Déchets médicaux traités',
      producerRating: 4.7,
      depositedAt: 'Il y a 1 jour',
      depositPoint: 'Centre de traitement Makepe'
    }
  ])

  const tabs = [
    { id: 'all', label: 'Toutes', count: missions.length },
    { id: 'new', label: 'Nouvelles', count: missions.filter(m => m.status === 'new').length },
    { id: 'accepted', label: 'Acceptées', count: missions.filter(m => m.status === 'accepted').length },
    { id: 'in_progress', label: 'En cours', count: missions.filter(m => m.status === 'in_progress').length },
    { id: 'completed', label: 'Terminées', count: missions.filter(m => ['completed', 'deposited'].includes(m.status)).length }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'accepted': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'in_progress': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      case 'deposited': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new': return 'Nouvelle'
      case 'accepted': return 'Acceptée'
      case 'in_progress': return 'En cours'
      case 'completed': return 'Terminée'
      case 'deposited': return 'Déposée'
      default: return status
    }
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case 'high': return 'Urgent'
      case 'medium': return 'Normal'
      case 'low': return 'Faible'
      default: return urgency
    }
  }

  const filteredMissions = missions.filter(mission => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'completed' ? ['completed', 'deposited'].includes(mission.status) : mission.status === activeTab)
    const matchesSearch = mission.producerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.wasteType.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const handleMissionAction = (missionId, action) => {
    switch (action) {
      case 'accept':
        setMissions(prev => 
          prev.map(m => m.id === missionId ? { ...m, status: 'accepted', acceptedAt: 'Maintenant' } : m)
        )
        break
      case 'start':
        setMissions(prev => 
          prev.map(m => m.id === missionId ? { ...m, status: 'in_progress', startedAt: 'Maintenant' } : m)
        )
        break
      case 'complete':
        setMissions(prev => 
          prev.map(m => m.id === missionId ? { ...m, status: 'completed', completedAt: 'Maintenant' } : m)
        )
        break
      case 'deposit':
        setMissions(prev => 
          prev.map(m => m.id === missionId ? { ...m, status: 'deposited', depositedAt: 'Maintenant' } : m)
        )
        break
      case 'navigate':
        const mission = missions.find(m => m.id === missionId)
        if (mission) {
          window.open(`https://maps.google.com/?q=${mission.coordinates.lat},${mission.coordinates.lng}`, '_blank')
        }
        break
    }
  }

  const openMissionDetail = (mission) => {
    setSelectedMission(mission)
    setShowDetail(true)
  }

  const MissionCard = ({ mission }) => (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-gray-900 text-lg">{mission.producerName}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(mission.status)}`}>
              {getStatusLabel(mission.status)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(mission.urgency)}`}>
              {getUrgencyLabel(mission.urgency)}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {mission.location}
            </div>
            <div className="flex items-center gap-1">
              <Navigation className="h-4 w-4" />
              {mission.distance}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {mission.timeAgo}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">{mission.estimatedEarnings.toLocaleString()} FCFA</p>
          <p className="text-xs text-gray-500">Gain estimé</p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{mission.wasteType}</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{mission.estimatedQuantity}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{mission.description}</p>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {mission.status === 'new' && (
          <>
            <button
              onClick={() => handleMissionAction(mission.id, 'accept')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Accepter
            </button>
            <button
              onClick={() => openMissionDetail(mission)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
            </button>
          </>
        )}
        
        {mission.status === 'accepted' && (
          <>
            <button
              onClick={() => handleMissionAction(mission.id, 'start')}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Commencer
            </button>
            <button
              onClick={() => handleMissionAction(mission.id, 'navigate')}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <Navigation className="h-4 w-4" />
            </button>
            <button
              onClick={() => openMissionDetail(mission)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
            </button>
          </>
        )}
        
        {mission.status === 'in_progress' && (
          <>
            <button
              onClick={() => handleMissionAction(mission.id, 'complete')}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Terminer
            </button>
            <button
              onClick={() => handleMissionAction(mission.id, 'navigate')}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <Navigation className="h-4 w-4" />
            </button>
            <button
              onClick={() => openMissionDetail(mission)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
            </button>
          </>
        )}
        
        {mission.status === 'completed' && (
          <>
            <button
              onClick={() => handleMissionAction(mission.id, 'deposit')}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Déposer
            </button>
            <button
              onClick={() => openMissionDetail(mission)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
            </button>
          </>
        )}
        
        {mission.status === 'deposited' && (
          <button
            onClick={() => openMissionDetail(mission)}
            className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-semibold"
          >
            Voir détails
          </button>
        )}
      </div>
    </div>
  )

  const MissionDetailModal = () => {
    if (!selectedMission) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Détails de la mission</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Producer Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                Informations producteur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Nom</p>
                    <p className="font-semibold text-lg text-gray-900">{selectedMission.producerName}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                    <p className="font-semibold text-lg text-gray-900">{selectedMission.producerPhone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Note</p>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg text-gray-900">{selectedMission.producerRating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                Localisation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Adresse</p>
                    <p className="font-semibold text-lg text-gray-900">{selectedMission.location}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Distance</p>
                    <p className="font-semibold text-lg text-gray-900">{selectedMission.distance}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Coordonnées</p>
                    <p className="font-mono text-sm text-gray-900">
                      {selectedMission.coordinates.lat.toFixed(6)}, {selectedMission.coordinates.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waste Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                Détails des déchets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Type</p>
                    <p className="font-semibold text-lg text-gray-900">{selectedMission.wasteType}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Quantité estimée</p>
                    <p className="font-semibold text-lg text-gray-900">{selectedMission.estimatedQuantity}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Gain estimé</p>
                    <p className="font-semibold text-2xl text-green-600">{selectedMission.estimatedEarnings?.toLocaleString() || 0} FCFA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            {selectedMission.specialInstructions && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  Instructions spéciales
                </h3>
                <p className="text-yellow-800">{selectedMission.specialInstructions}</p>
              </div>
            )}

            {/* Status Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Clock className="h-5 w-5 text-indigo-600" />
                </div>
                Historique
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-blue-900">Mission créée</p>
                    <p className="text-sm text-blue-700">{selectedMission.timeAgo}</p>
                  </div>
                </div>
                {selectedMission.acceptedAt && (
                  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="h-3 w-3 bg-yellow-600 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-yellow-900">Mission acceptée</p>
                      <p className="text-sm text-yellow-700">{selectedMission.acceptedAt}</p>
                    </div>
                  </div>
                )}
                {selectedMission.startedAt && (
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-purple-900">Collecte commencée</p>
                      <p className="text-sm text-purple-700">{selectedMission.startedAt}</p>
                    </div>
                  </div>
                )}
                {selectedMission.completedAt && (
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="h-3 w-3 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-green-900">Collecte terminée</p>
                      <p className="text-sm text-green-700">{selectedMission.completedAt}</p>
                    </div>
                  </div>
                )}
                {selectedMission.depositedAt && (
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="h-3 w-3 bg-emerald-600 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-emerald-900">Déposée au centre</p>
                      <p className="text-sm text-emerald-700">{selectedMission.depositedAt}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Feedback */}
            {selectedMission.producerFeedback && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Feedback producteur
                </h3>
                <p className="text-green-800">{selectedMission.producerFeedback}</p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              <button
                onClick={() => setShowDetail(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Fermer
              </button>
              {selectedMission.status === 'new' && (
                <button
                  onClick={() => {
                    handleMissionAction(selectedMission.id, 'accept')
                    setShowDetail(false)
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl"
                >
                  Accepter la mission
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout 
      pageTitle="Mes missions" 
      currentPage="missions" 
      userRole="collector"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/collector/dashboard')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Mes missions</h1>
                  <p className="text-sm text-gray-500">EcoCollect - Espace Collecteur</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher une mission..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Filter className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                {missions.filter(m => m.status === 'new').length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Nouvelles missions</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-8 w-8 text-yellow-600" />
              <span className="text-2xl font-bold text-gray-900">
                {missions.filter(m => m.status === 'in_progress').length}
              </span>
            </div>
            <p className="text-sm text-gray-600">En cours</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                {missions.filter(m => m.status === 'completed').length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Terminées</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">
                {missions.reduce((sum, m) => sum + m.estimatedEarnings, 0).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">Gain potentiel (FCFA)</p>
          </div>
        </div>

        {/* Missions List */}
        <div className="space-y-4">
          {filteredMissions.length > 0 ? (
            filteredMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune mission trouvée</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Essayez une autre recherche' : 'Aucune mission ne correspond à ce filtre'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mission Detail Modal */}
      {showDetail && <MissionDetailModal />}
    </Layout>
  )
}

export default MissionsCollector
