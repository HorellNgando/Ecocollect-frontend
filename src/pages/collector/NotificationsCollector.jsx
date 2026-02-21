import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Bell, CheckCircle, AlertCircle, Info, X, Filter, Search,
  Calendar, Clock, MapPin, Package, DollarSign, Star,
  MessageSquare, Phone, Check, Trash2, Archive, Eye,
  Settings, Volume2, VolumeX, Wifi, WifiOff, Award
} from 'lucide-react'
import Layout from '../../components/Layout'

const NotificationsCollector = () => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_mission',
      title: 'Nouvelle mission disponible',
      message: 'Restaurant Le Gourmet - 25kg de déchets organiques à Bonanjo',
      time: 'Il y a 5 min',
      read: false,
      priority: 'high',
      missionId: 1,
      producer: 'Restaurant Le Gourmet',
      location: 'Bonanjo, Douala',
      estimatedEarnings: 2500,
      wasteType: 'Organiques'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Paiement reçu',
      message: 'Mission #12 terminée - 4,500 FCFA transférés vers votre portefeuille',
      time: 'Il y a 1h',
      read: false,
      priority: 'medium',
      amount: 4500,
      paymentMethod: 'wallet',
      missionId: 12
    },
    {
      id: 3,
      type: 'mission_accepted',
      title: 'Mission acceptée',
      message: 'Votre acceptation pour la mission Supermarket Eko a été confirmée',
      time: 'Il y a 2h',
      read: true,
      priority: 'medium',
      missionId: 8,
      producer: 'Supermarket Eko',
      location: 'Akwa, Douala'
    },
    {
      id: 4,
      type: 'mission_completed',
      title: 'Mission terminée avec succès',
      message: 'Mission #10 - Hotel Atlantic. Note: 4.8/5',
      time: 'Il y a 3h',
      read: true,
      priority: 'low',
      missionId: 10,
      producer: 'Hotel Atlantic',
      rating: 4.8,
      feedback: 'Excellent service, très professionnel'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Rappel de mission',
      message: 'Mission Restaurant Le Gourmet à collecter dans 30 minutes',
      time: 'Il y a 4h',
      read: true,
      priority: 'high',
      missionId: 1,
      producer: 'Restaurant Le Gourmet',
      deadline: 'Dans 30 min'
    },
    {
      id: 6,
      type: 'system',
      title: 'Maintenance système',
      message: 'Le système sera indisponible demain de 2h à 4h pour maintenance',
      time: 'Il y a 1 jour',
      read: true,
      priority: 'low',
      scheduledTime: 'Demain 2h-4h'
    },
    {
      id: 7,
      type: 'achievement',
      title: 'Nouveau palier atteint !',
      message: 'Félicitations ! Vous avez atteint le niveau "Collecteur Expert"',
      time: 'Il y a 2 jours',
      read: true,
      priority: 'medium',
      level: 'Collecteur Expert',
      bonus: 5000
    },
    {
      id: 8,
      type: 'new_mission',
      title: 'Mission urgente disponible',
      message: 'Pharmacie Centrale - Déchets spéciaux à collecter rapidement',
      time: 'Il y a 3 jours',
      read: true,
      priority: 'high',
      missionId: 15,
      producer: 'Pharmacie Centrale',
      location: 'Makepe, Douala',
      estimatedEarnings: 3000,
      wasteType: 'Spéciaux',
      urgency: 'Urgent'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNotifications, setSelectedNotifications] = useState([])
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_mission': return <Package className="h-5 w-5" />
      case 'payment': return <DollarSign className="h-5 w-5" />
      case 'mission_accepted': return <CheckCircle className="h-5 w-5" />
      case 'mission_completed': return <Star className="h-5 w-5" />
      case 'reminder': return <Clock className="h-5 w-5" />
      case 'system': return <Settings className="h-5 w-5" />
      case 'achievement': return <Award className="h-5 w-5" />
      default: return <Info className="h-5 w-5" />
    }
  }

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'bg-red-100 text-red-600 border-red-200'
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-600 border-yellow-200'
    
    switch (type) {
      case 'new_mission': return 'bg-blue-100 text-blue-600 border-blue-200'
      case 'payment': return 'bg-green-100 text-green-600 border-green-200'
      case 'mission_completed': return 'bg-purple-100 text-purple-600 border-purple-200'
      case 'achievement': return 'bg-indigo-100 text-indigo-600 border-indigo-200'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
    setSelectedNotifications(prev => prev.filter(id => id !== notificationId))
  }

  const handleNotificationAction = (notification) => {
    markAsRead(notification.id)
    
    switch (notification.type) {
      case 'new_mission':
        navigate('/collector/missions', { state: { highlightMission: notification.missionId } })
        break
      case 'payment':
        navigate('/collector/wallet')
        break
      case 'mission_accepted':
      case 'mission_completed':
      case 'reminder':
        navigate(`/collector/missions?mission=${notification.missionId}`)
        break
      default:
        break
    }
  }

  const toggleSelection = (notificationId) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    )
  }

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)))
    setSelectedNotifications([])
  }

  const NotificationCard = ({ notification }) => (
    <div 
      className={`bg-white rounded-xl shadow-lg border-2 p-4 hover:shadow-xl transition-all cursor-pointer ${
        !notification.read ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'
      }`}
      onClick={() => handleNotificationAction(notification)}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={selectedNotifications.includes(notification.id)}
          onChange={(e) => {
            e.stopPropagation()
            toggleSelection(notification.id)
          }}
          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
        />
        
        <div className={`p-2 rounded-lg border ${getNotificationColor(notification.type, notification.priority)}`}>
          {getNotificationIcon(notification.type)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className={`font-semibold text-gray-900 ${!notification.read ? 'text-blue-900' : ''}`}>
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
            
            {!notification.read && (
              <div className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
            )}
          </div>
          
          {/* Mission Details */}
          {notification.type === 'new_mission' && (
            <div className="bg-blue-50 rounded-lg p-3 mb-2 border border-blue-200">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-blue-700 font-medium">Producteur:</span>
                  <span className="text-blue-900 ml-1">{notification.producer}</span>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Localisation:</span>
                  <span className="text-blue-900 ml-1">{notification.location}</span>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Type:</span>
                  <span className="text-blue-900 ml-1">{notification.wasteType}</span>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Gain:</span>
                  <span className="text-green-600 font-medium ml-1">{notification.estimatedEarnings?.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Payment Details */}
          {notification.type === 'payment' && (
            <div className="bg-green-50 rounded-lg p-3 mb-2 border border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">
                  Montant: {notification.amount.toLocaleString()} FCFA
                </span>
                <span className="text-xs text-green-600">
                  {notification.paymentMethod === 'wallet' ? 'Portefeuille' : 'Virement'}
                </span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {notification.time}
            </span>
            
            <div className="flex items-center gap-2">
              {notification.type === 'new_mission' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNotificationAction(notification)
                  }}
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Voir mission
                </button>
              )}
              
              {!notification.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    markAsRead(notification.id)
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Marquer comme lu
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === 'all' || notification.type === filterType
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'read' && notification.read) ||
      (filterStatus === 'unread' && !notification.read)
    
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <Layout 
      pageTitle="Notifications" 
      currentPage="notifications" 
      userRole="collector"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une notification..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="all">Tous les types</option>
                <option value="new_mission">Nouvelles missions</option>
                <option value="payment">Paiements</option>
                <option value="mission_accepted">Missions acceptées</option>
                <option value="mission_completed">Missions terminées</option>
                <option value="reminder">Rappels</option>
                <option value="system">Système</option>
                <option value="achievement">Succès</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="read">Lus</option>
                <option value="unread">Non lus</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {notifications.filter(n => !n.read).length} non lues sur {notifications.length}
              </span>
              
              {notifications.filter(n => !n.read).length > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Tout marquer comme lu
                </button>
              )}
            </div>
            
            {selectedNotifications.length > 0 && (
              <button
                onClick={deleteSelected}
                className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer ({selectedNotifications.length})
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune notification</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Essayez une autre recherche' : 'Aucune notification ne correspond à ce filtre'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default NotificationsCollector
