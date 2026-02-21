import { useState } from 'react'
import { 
  Package, Clock, CheckCircle, TrendingUp, Award, 
  BarChart3, Target, DollarSign, Bell, ArrowRight,
  Truck, MapPin, Star, Activity, Users, Calendar
} from 'lucide-react'
import Layout from '../../components/Layout'

const DashboardCollector = () => {
  // Simulated collector data
  const [userData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    businessStatus: 'independent'
  })

  // Simulated dashboard statistics
  const [stats] = useState({
    totalMissions: 47,
    availableMissions: 12,
    inProgressMissions: 2,
    completedMissions: 33,
    totalEarnings: 285000,
    thisMonthEarnings: 45000,
    averageEarnings: 2850,
    rating: 4.8,
    monthlyTrend: {
      missions: [8, 12, 15, 11, 9, 14, 12],
      earnings: [25000, 38000, 45000, 32000, 28000, 42000, 45000]
    }
  })

  // Simulated recent missions
  const [recentMissions] = useState([
    {
      id: 'MIS-147',
      producerName: 'Restaurant Le Gourmet',
      location: 'Bonanjo, Douala',
      wasteType: 'Organiques',
      quantity: '25 kg',
      status: 'new',
      earnings: 2500,
      timeAgo: 'Il y a 5 min',
      urgency: 'high'
    },
    {
      id: 'MIS-146',
      producerName: 'Supermarket Eko',
      location: 'Akwa, Douala',
      wasteType: 'Plastiques',
      quantity: '40 kg',
      status: 'in_progress',
      earnings: 4000,
      timeAgo: 'Il y a 1h',
      urgency: 'medium'
    },
    {
      id: 'MIS-145',
      producerName: 'Hotel Atlantic',
      location: 'Deido, Douala',
      wasteType: 'Mixtes',
      quantity: '60 kg',
      status: 'completed',
      earnings: 6000,
      timeAgo: 'Il y a 3h',
      urgency: 'low'
    }
  ])

  // Simulated notifications
  const [notifications] = useState([
    {
      id: 1,
      type: 'new_mission',
      title: 'Nouvelle mission disponible',
      message: 'Restaurant Le Gourmet - 25kg de déchets organiques',
      time: 'Il y a 5 min',
      read: false
    },
    {
      id: 2,
      type: 'payment',
      title: 'Paiement reçu',
      message: 'Mission #145 - 4000 FCFA crédités',
      time: 'Il y a 2h',
      read: false
    },
    {
      id: 3,
      type: 'mission_completed',
      title: 'Mission terminée',
      message: 'Hotel Atlantic - Note: 5/5',
      time: 'Il y a 3h',
      read: true
    }
  ])

  return (
    <Layout 
      pageTitle="Tableau de bord" 
      currentPage="dashboard" 
      notifications={notifications}
      userRole="collector"
    >
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Bienvenue, {userData.firstName} ! 👋
              </h1>
              <p className="text-blue-100">
                Prêt pour de nouvelles missions aujourd'hui ?
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.availableMissions}</p>
              <p className="text-blue-100 text-sm">Missions disponibles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.totalMissions}</span>
          </div>
          <p className="text-sm text-gray-600">Total missions</p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12% ce mois
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.totalEarnings.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-600">Gains totaux (FCFA)</p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            +8% ce mois
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.inProgressMissions}</span>
          </div>
          <p className="text-sm text-gray-600">En cours</p>
          <div className="mt-2 flex items-center text-xs text-purple-600">
            <Clock className="h-3 w-3 mr-1" />
            En progression
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.rating}</span>
          </div>
          <p className="text-sm text-gray-600">Note moyenne</p>
          <div className="mt-2 flex items-center text-xs text-yellow-600">
            <Award className="h-3 w-3 mr-1" />
            Excellence
          </div>
        </div>
      </div>

      {/* Recent Missions & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Missions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Missions récentes</h3>
              <a href="/collector/missions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir tout
              </a>
            </div>
            
            <div className="space-y-4">
              {recentMissions.map((mission) => (
                <div key={mission.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{mission.producerName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          mission.status === 'new' ? 'bg-blue-100 text-blue-700' :
                          mission.status === 'in_progress' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {mission.status === 'new' ? 'Nouvelle' :
                           mission.status === 'in_progress' ? 'En cours' : 'Terminée'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {mission.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          {mission.wasteType} • {mission.quantity}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{mission.timeAgo}</span>
                        <span className="text-sm font-semibold text-green-600">{mission.earnings.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                    
                    <button className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
              <a href="/collector/notifications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir tout
              </a>
            </div>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg border ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'new_mission' ? 'bg-blue-100' :
                      notification.type === 'payment' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {notification.type === 'new_mission' ? <Package className="h-4 w-4 text-blue-600" /> :
                       notification.type === 'payment' ? <DollarSign className="h-4 w-4 text-green-600" /> :
                       <CheckCircle className="h-4 w-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Actions rapides</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <a href="/collector/missions" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Voir missions</p>
              <p className="text-xs text-gray-600">{stats.availableMissions} disponibles</p>
            </div>
          </a>

          <a href="/collector/wallet" className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
            <div className="p-2 bg-green-600 rounded-lg group-hover:bg-green-700 transition-colors">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Mes gains</p>
              <p className="text-xs text-gray-600">{stats.totalEarnings.toLocaleString()} FCFA</p>
            </div>
          </a>

          <a href="/collector/deposit" className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group">
            <div className="p-2 bg-purple-600 rounded-lg group-hover:bg-purple-700 transition-colors">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Déposer déchets</p>
              <p className="text-xs text-gray-600">Nouveau dépôt</p>
            </div>
          </a>

          <a href="/collector/profile" className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors group">
            <div className="p-2 bg-yellow-600 rounded-lg group-hover:bg-yellow-700 transition-colors">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Mon profil</p>
              <p className="text-xs text-gray-600">Gérer compte</p>
            </div>
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardCollector
