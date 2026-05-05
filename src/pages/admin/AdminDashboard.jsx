// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Users, UserCheck, Package, DollarSign,
  TrendingUp, Calendar, Map, FileText,
  Briefcase, Heart, Award, Activity,
  ShoppingCart, ArrowRight, Plus, Eye,
  Settings, BarChart2, Target, Zap,
  ChevronRight, Clock, Star, Truck,
  Home, User, Mail, Phone, MapPin,
  Shield, Database, Server, Cpu,
  AlertTriangle, CheckCircle, XCircle,
  Menu, LogOut, Moon, RefreshCw,
  Filter, Search, Download, Upload
} from 'lucide-react';
import { getThemeClasses, toggleDarkMode, initTheme } from '../../utils/themeUtils.js';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [topCollecteurs, setTopCollecteurs] = useState([]);
  const [achatsStats, setAchatsStats] = useState(null);
  const [collectesStats, setCollectesStats] = useState(null);
  const [stocksPoints, setStocksPoints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('tous');

  const API_URL = 'https://ecobackend-zeds.vercel.app';
  const STORAGE_KEYS = {
    TOKEN: 'ecocollect_token',
    USER: 'ecocollect_user',
    ROLE: 'ecocollect_role'
  };

  useEffect(() => {
    console.log('🔄 Initialisation du AdminDashboard');
    initTheme(); // Initialiser le thème
    checkSession();
    loadDashboard();
    loadRecentActivities();
    loadAchatsStats();
    loadCollectesStats();
    loadStocksPoints();
  }, []);

  const checkSession = () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);

    if (!token || !userJson || role !== 'admin') {
      window.location.href = '/login';
      return;
    }

    try {
      const userData = JSON.parse(userJson);
      setUser(userData);
    } catch (error) {
      console.error('Erreur de session:', error);
      window.location.href = '/login';
    }
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      // Simuler des données pour le moment
      const mockStats = {
        totalUsers: 2547,
        activeUsers: 1834,
        totalMissions: 8921,
        completedMissions: 7843,
        totalRevenue: 15420000,
        monthlyRevenue: 1285000,
        totalWaste: 45670,
        recycledWaste: 38920,
        growthRate: 23.5
      };

      const mockTopCollecteurs = [
        { id: 1, name: 'Jean Dupont', missions: 156, points: 7800, revenue: 234000 },
        { id: 2, name: 'Marie Curie', missions: 142, points: 7100, revenue: 213000 },
        { id: 3, name: 'Paul Martin', missions: 128, points: 6400, revenue: 192000 },
        { id: 4, name: 'Sophie Laurent', missions: 115, points: 5750, revenue: 172500 },
        { id: 5, name: 'Lucas Bernard', missions: 98, points: 4900, revenue: 147000 }
      ];

      setStats(mockStats);
      setTopCollecteurs(mockTopCollecteurs);
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentActivities = async () => {
    try {
      // Simuler des données
      const mockActivities = [
        {
          id: 1,
          type: 'user_registration',
          user: 'Nouveau producteur',
          description: 'Jean Dupont a rejoint la plateforme',
          timestamp: '2024-01-15T14:30:00Z',
          icon: User,
          color: 'green'
        },
        {
          id: 2,
          type: 'mission_completed',
          user: 'Mission validée',
          description: 'Collecte de 50kg de plastique PET validée',
          timestamp: '2024-01-15T13:45:00Z',
          icon: CheckCircle,
          color: 'blue'
        },
        {
          id: 3,
          type: 'system_alert',
          user: 'Alerte système',
          description: 'Espace disque faible sur le serveur principal',
          timestamp: '2024-01-15T12:15:00Z',
          icon: AlertTriangle,
          color: 'red'
        }
      ];

      setRecentActivities(mockActivities);
    } catch (error) {
      console.error('Erreur chargement activités:', error);
    }
  };

  const loadAchatsStats = async () => {
    try {
      // Simuler des données
      const mockAchats = [
        { month: 'Jan', amount: 850000 },
        { month: 'Fév', amount: 920000 },
        { month: 'Mar', amount: 780000 },
        { month: 'Avr', amount: 1050000 },
        { month: 'Mai', amount: 1120000 },
        { month: 'Juin', amount: 1285000 }
      ];

      setAchatsStats(mockAchats);
    } catch (error) {
      console.error('Erreur chargement stats achats:', error);
    }
  };

  const loadCollectesStats = async () => {
    try {
      // Simuler des données
      const mockCollectes = [
        { type: 'Plastique PET', quantite: 2340, percentage: 35 },
        { type: 'Papier/Carton', quantite: 1890, percentage: 28 },
        { type: 'Métal', quantite: 1230, percentage: 18 },
        { type: 'Verre', quantite: 890, percentage: 13 },
        { type: 'Organique', quantite: 340, percentage: 6 }
      ];

      setCollectesStats(mockCollectes);
    } catch (error) {
      console.error('Erreur chargement stats collectes:', error);
    }
  };

  const loadStocksPoints = async () => {
    try {
      // Simuler des données
      const mockStocks = [
        { id: 1, name: 'Centre Douala', capacity: 10000, current: 7500, status: 'normal' },
        { id: 2, name: 'Centre Yaoundé', capacity: 8000, current: 6200, status: 'normal' },
        { id: 3, name: 'Centre Bafoussam', capacity: 5000, current: 4800, status: 'warning' },
        { id: 4, name: 'Centre Garoua', capacity: 6000, current: 2100, status: 'low' }
      ];

      setStocksPoints(mockStocks);
    } catch (error) {
      console.error('Erreur chargement stocks:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(amount);
  };

  const formatDateTime = (dateTimeString) => {
    const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('fr-FR', options);
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'normal': { text: 'Normal', color: 'green' },
      'warning': { text: 'Attention', color: 'orange' },
      'low': { text: 'Critique', color: 'red' },
      'high': { text: 'Élevé', color: 'blue' }
    };
    return badges[status] || { text: 'Inconnu', color: 'gray' };
  };

  // Composant Sidebar
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: Home },
      { id: 'users', label: 'Utilisateurs', icon: Users, badge: stats?.totalUsers },
      { id: 'missions', label: 'Missions', icon: Package },
      { id: 'analytics', label: 'Analytiques', icon: BarChart2 },
      { id: 'system', label: 'Système', icon: Database },
      { id: 'settings', label: 'Paramètres', icon: Settings },
      { id: 'profile', label: 'Mon profil', icon: User }
    ];

    return (
      <>
        {/* Mobile Sidebar */}
        <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className={`fixed top-0 left-0 h-full w-72 ${getThemeClasses.card} shadow-xl transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(user?.nom)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{user?.nom || 'Administrateur'}</p>
                    <p className="text-red-100 text-sm">Super Admin</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setCurrentPage(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors group ${
                          isActive 
                            ? 'bg-red-50 text-red-700 border-l-4 border-red-600' 
                            : `${getThemeClasses.textSecondary} hover:bg-gray-50 hover:text-gray-900`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        
                        {item.badge && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 border-t">
              <button
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEYS.TOKEN);
                  localStorage.removeItem(STORAGE_KEYS.USER);
                  localStorage.removeItem(STORAGE_KEYS.ROLE);
                  window.location.href = '/login';
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className={`hidden lg:block fixed top-0 left-0 h-screen ${getThemeClasses.card} shadow-xl z-50 w-72 overflow-hidden flex flex-col`}>
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials(user?.nom)}
              </div>
              <div>
                <p className={`font-medium ${getThemeClasses.textCard}`}>{user?.nom || 'Administrateur'}</p>
                <p className={`text-xs ${getThemeClasses.textMuted}`}>Super Admin</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentPage(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors group ${
                        isActive 
                          ? 'bg-red-50 text-red-700 border-l-4 border-red-600' 
                          : `${getThemeClasses.textSecondary} hover:bg-gray-50 hover:text-gray-900`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      
                      {item.badge && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={() => {
                localStorage.removeItem(STORAGE_KEYS.TOKEN);
                localStorage.removeItem(STORAGE_KEYS.USER);
                localStorage.removeItem(STORAGE_KEYS.ROLE);
                window.location.href = '/login';
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </>
    );
  };

  // Rendu principal
  return (
    <div className={`min-h-screen ${getThemeClasses.bgPrimary}`}>
      <Sidebar />

      {/* Header mobile */}
      <header className={`lg:hidden ${getThemeClasses.navigation} sticky top-0 z-40`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className={`text-lg font-semibold ${getThemeClasses.textCard}`}>EcoCollect Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <AlertTriangle className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => toggleDarkMode()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Moon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="lg:ml-72">
        {/* Header desktop */}
        <header className={`${getThemeClasses.navigation} hidden lg:flex sticky top-0 z-30`}>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className={`text-xl font-semibold ${getThemeClasses.textCard}`}>EcoCollect Admin</h1>
              <div className={`text-sm ${getThemeClasses.textMuted}`}>
                Panneau d'administration
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => loadDashboard()}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => toggleDarkMode()}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Moon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {currentPage === 'dashboard' && (
            <div>
              <div className="mb-8">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">
                        Bienvenue, {user?.nom?.split(' ')[0] || 'Administrateur'} !
                      </h2>
                      <p className="text-red-100">
                        Gérez l'ensemble de la plateforme EcoCollect avec un contrôle total.
                      </p>
                    </div>
                    <div className="hidden lg:block flex-shrink-0">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[200px]">
                        <div className="text-sm text-red-100">
                          {stats?.activeUsers} utilisateurs actifs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats?.totalUsers}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Total utilisateurs</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>Inscrits sur la plateforme</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +{stats?.growthRate}% ce mois
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats?.completedMissions}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Missions complétées</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>Sur {stats?.totalMissions} totales</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {((stats?.completedMissions / stats?.totalMissions) * 100).toFixed(1)}% de réussite
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{(stats?.monthlyRevenue/1000000).toFixed(1)}M</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Revenus mensuels</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>FCFA</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +18% vs mois dernier
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats?.recycledWaste}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Déchets recyclés</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>kg ce mois</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <Award className="w-4 h-4 mr-1" />
                    {((stats?.recycledWaste / stats?.totalWaste) * 100).toFixed(1)}% de recyclage
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <Star className="w-5 h-5 text-yellow-600" />
                      Top collecteurs
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {topCollecteurs.map((collecteur, index) => (
                        <div key={collecteur.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-sm font-medium text-yellow-600">
                              {index + 1}
                            </div>
                            <div>
                              <p className={`font-medium ${getThemeClasses.textCard}`}>{collecteur.name}</p>
                              <p className={`text-sm ${getThemeClasses.textMuted}`}>{collecteur.missions} missions</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${getThemeClasses.textCard}`}>{collecteur.points}</p>
                            <p className={`text-xs ${getThemeClasses.textMuted}`}>points</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <Activity className="w-5 h-5 text-blue-600" />
                      Activités récentes
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentActivities.map(activite => {
                        const Icon = activite.icon;
                        return (
                          <div key={activite.id} className={`p-3 ${getThemeClasses.bgSecondary} rounded-lg`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                                activite.color === 'green' ? 'bg-green-100 text-green-600' :
                                activite.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                'bg-red-100 text-red-600'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${getThemeClasses.textCard}`}>{activite.user}</p>
                                <p className={`text-xs ${getThemeClasses.textMuted}`}>{activite.description}</p>
                                <p className={`text-xs ${getThemeClasses.textMuted} mt-1`}>{formatDateTime(activite.timestamp)}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <BarChart2 className="w-5 h-5 text-purple-600" />
                      Évolution des achats
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {achatsStats?.map((data, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className={`text-sm ${getThemeClasses.textCard}`}>{data.month}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full" 
                                style={{width: `${(data.amount / 1500000) * 100}%`}}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>
                              {(data.amount / 1000).toFixed(0)}k
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <Database className="w-5 h-5 text-green-600" />
                      Centres de stockage
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {stocksPoints.map(stock => {
                        const status = getStatusBadge(stock.status);
                        const fillPercentage = (stock.current / stock.capacity) * 100;
                        
                        return (
                          <div key={stock.id} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>{stock.name}</span>
                                <span className={`text-xs ${getThemeClasses.textMuted}`}>
                                  {stock.current}/{stock.capacity} kg
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`${
                                    stock.status === 'normal' ? 'bg-green-500' :
                                    stock.status === 'warning' ? 'bg-orange-500' :
                                    'bg-red-500'
                                  } h-2 rounded-full`} 
                                  style={{width: `${fillPercentage}%`}}
                                ></div>
                              </div>
                            </div>
                            <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full bg-${status.color}-100 text-${status.color}-800`}>
                              {status.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} flex items-center gap-2`}>
                  <Users className="w-6 h-6 text-blue-600" />
                  Gestion des utilisateurs
                </h1>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un utilisateur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-10 pr-4 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>
              </div>

              <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                <div className="p-6">
                  <p className={`${getThemeClasses.textMuted} text-center`}>
                    Module de gestion des utilisateurs en cours de développement...
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'system' && (
            <div>
              <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} mb-6 flex items-center gap-2`}>
                <Database className="w-6 h-6 text-purple-600" />
                Système
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <Server className="w-5 h-5 text-blue-600" />
                      Serveurs
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${getThemeClasses.textCard}`}>Serveur principal</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          En ligne
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${getThemeClasses.textCard}`}>Base de données</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Connectée
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${getThemeClasses.textCard}`}>API</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Opérationnelle
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <Cpu className="w-5 h-5 text-orange-600" />
                  Performance
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm ${getThemeClasses.textSecondary}`}>CPU</span>
                          <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm ${getThemeClasses.textSecondary}`}>Mémoire</span>
                          <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>62%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '62%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm ${getThemeClasses.textSecondary}`}>Stockage</span>
                          <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{width: '78%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'profile' && (
            <div>
              <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} mb-6 flex items-center gap-2`}>
                <User className="w-6 h-6 text-red-600" />
                Mon profil
              </h1>

              <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(user?.nom)}
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${getThemeClasses.textCard}`}>{user?.nom || 'Administrateur'}</h2>
                    <p className={`${getThemeClasses.textMuted}`}>{user?.email || 'admin@ecocollect.cm'}</p>
                    <p className={`${getThemeClasses.textMuted}`}>{user?.telephone || '+237 000 000 000'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${getThemeClasses.textSecondary} mb-2`}>Rôle</label>
                    <input
                      type="text"
                      value="Super Administrateur"
                      className={`w-full px-3 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getThemeClasses.textSecondary} mb-2`}>Statut</label>
                    <input
                      type="text"
                      value="Actif"
                      className={`w-full px-3 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
