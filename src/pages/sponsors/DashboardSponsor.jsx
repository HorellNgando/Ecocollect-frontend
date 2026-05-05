// pages/Sponsor/DashboardSponsor.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, DollarSign, Package, Map, Calendar,
  Download, Eye, Filter, RefreshCw, Award,
  Target, BarChart3, PieChart, Clock, CheckCircle,
  XCircle, Users, Building, Plus, Search, Zap, X,
  Menu, LogOut, Home, BarChart, Settings, HelpCircle,
  Mail, Phone, MapPin, Edit, Save, Camera, Moon
} from 'lucide-react';
import { getThemeClasses, toggleDarkMode, initTheme } from '../../utils/themeUtils.js';

const DashboardSponsor = () => {
  const navigate = useNavigate();
  
  // États existants
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  const [campagnes, setCampagnes] = useState([]);
  const [stats, setStats] = useState({
    totalCampagnes: 0,
    campagnesActives: 0,
    campagnesTerminees: 0,
    budgetTotal: 0,
    montantUtilise: 0,
    poidsTotalCollecte: 0,
    poidsTotalAttendu: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampagne, setSelectedCampagne] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [campagneDetails, setCampagneDetails] = useState(null);
  const [pointsDetails, setPointsDetails] = useState([]);
  const [evolutionJournaliere, setEvolutionJournaliere] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  // États pour la navigation et modals
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const [evolutionData, setEvolutionData] = useState([]);

  const API_URL = 'https://ecobackend-zeds.vercel.app';
  const STORAGE_KEYS = {
    TOKEN: 'ecocollect_token',
    USER: 'ecocollect_user',
    ROLE: 'ecocollect_role'
  };

  useEffect(() => {
    console.log('🔄 Initialisation du DashboardSponsor');
    initTheme(); // Initialiser le thème
    checkSession();
    loadSponsorData();
  }, []);

  const checkSession = () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);

    if (!token || !userJson || role !== 'sponsor') {
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(userJson);
      setUser(userData);
    } catch (error) {
      console.error('Erreur de session:', error);
      navigate('/login');
    }
  };

  const loadSponsorData = async () => {
    try {
      setLoading(true);
      // Simuler des données pour le moment
      const mockStats = {
        totalCampagnes: 12,
        campagnesActives: 3,
        campagnesTerminees: 9,
        budgetTotal: 5000000,
        montantUtilise: 3200000,
        poidsTotalCollecte: 15420,
        poidsTotalAttendu: 25000
      };

      const mockCampagnes = [
        {
          id: 1,
          titre: 'Campagne de recyclage scolaire',
          description: 'Sensibilisation et collecte dans les écoles',
          budget: 1500000,
          montantUtilise: 850000,
          dateDebut: '2024-01-01',
          dateFin: '2024-06-30',
          statut: 'active',
          participants: 45,
          poidsCollecte: 5230,
          image: 'https://images.unsplash.com/photo-1532996120186-bf3a4c5c0c7a?w=400'
        },
        {
          id: 2,
          titre: 'Nettoyage des plages du Cameroun',
          description: 'Collecte de déchets plastiques sur les côtes camerounaises',
          budget: 2000000,
          montantUtilise: 1200000,
          dateDebut: '2024-02-01',
          dateFin: '2024-08-31',
          statut: 'active',
          participants: 128,
          poidsCollecte: 8900,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
        },
        {
          id: 3,
          titre: 'Recyclage urbain Douala',
          description: 'Programme de collecte en milieu urbain',
          budget: 1000000,
          montantUtilise: 650000,
          dateDebut: '2024-03-01',
          dateFin: '2024-05-31',
          statut: 'active',
          participants: 67,
          poidsCollecte: 1290,
          image: 'https://images.unsplash.com/photo-1584464491033-062286e35230?w=400'
        }
      ];

      const mockEvolution = [
        { date: '2024-01-01', poids: 1200, montant: 450000 },
        { date: '2024-01-15', poids: 2800, montant: 680000 },
        { date: '2024-02-01', poids: 4200, montant: 920000 },
        { date: '2024-02-15', poids: 6800, montant: 1350000 },
        { date: '2024-03-01', poids: 8900, montant: 1680000 },
        { date: '2024-03-15', poids: 11200, montant: 2100000 },
        { date: '2024-04-01', poids: 13400, montant: 2450000 },
        { date: '2024-04-15', poids: 15420, montant: 2850000 }
      ];

      setStats(mockStats);
      setCampagnes(mockCampagnes);
      setEvolutionData(mockEvolution);
    } catch (error) {
      console.error('Erreur chargement données sponsor:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getStatusBadge = (statut) => {
    const badges = {
      'active': { text: 'Active', color: 'green' },
      'completed': { text: 'Terminée', color: 'blue' },
      'paused': { text: 'En pause', color: 'orange' },
      'cancelled': { text: 'Annulée', color: 'red' }
    };
    return badges[statut] || { text: 'Inconnue', color: 'gray' };
  };

  const getInitials = (name) => {
    if (!name) return 'S';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadSponsorData();
    setRefreshing(false);
  };

  // Composant Sidebar
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: Home },
      { id: 'campaigns', label: 'Mes campagnes', icon: Target, badge: campagnes.length },
      { id: 'analytics', label: 'Analytiques', icon: BarChart3 },
      { id: 'impact', label: 'Impact environnemental', icon: Award },
      { id: 'profile', label: 'Mon profil', icon: Users }
    ];

    return (
      <>
        {/* Mobile Sidebar */}
        <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className={`fixed top-0 left-0 h-full w-72 ${getThemeClasses.card} shadow-xl transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="bg-gradient-to-r from-pink-600 to-purple-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(user?.nom)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{user?.nom || 'Sponsor'}</p>
                    <p className="text-pink-100 text-sm">Partenaire Premium</p>
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
                            ? 'bg-pink-50 text-pink-700 border-l-4 border-pink-600' 
                            : `${getThemeClasses.textSecondary} hover:bg-gray-50 hover:text-gray-900`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-pink-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        
                        {item.badge && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
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
                onClick={() => setShowLogoutModal(true)}
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
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials(user?.nom)}
              </div>
              <div>
                <p className={`font-medium ${getThemeClasses.textCard}`}>{user?.nom || 'Sponsor'}</p>
                <p className={`text-xs ${getThemeClasses.textMuted}`}>Partenaire Premium</p>
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
                          ? 'bg-pink-50 text-pink-700 border-l-4 border-pink-600' 
                          : `${getThemeClasses.textSecondary} hover:bg-gray-50 hover:text-gray-900`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-pink-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      
                      {item.badge && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
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
              onClick={() => setShowLogoutModal(true)}
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

  // Modal de déconnexion
  const LogoutModal = () => {
    if (!showLogoutModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`${getThemeClasses.card} rounded-2xl max-w-md w-full shadow-2xl transform transition-all`}>
          <div className={`p-6 border-b ${getThemeClasses.border} bg-gradient-to-r from-red-50 to-pink-50 rounded-t-2xl`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut className="h-6 w-6 text-red-600" />
              </div>
              <h2 className={`text-xl font-bold ${getThemeClasses.textCard}`}>Déconnexion</h2>
            </div>
          </div>

          <div className="p-6">
            <p className={`${getThemeClasses.textCard} mb-2`}>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <p className={`text-sm ${getThemeClasses.textMuted}`}>Vous devrez vous reconnecter pour accéder à votre compte.</p>
          </div>

          <div className={`p-6 border-t ${getThemeClasses.border} ${getThemeClasses.bgSecondary} rounded-b-2xl flex gap-3`}>
            <button
              onClick={() => setShowLogoutModal(false)}
              className={`flex-1 px-4 py-2 border border-gray-300 ${getThemeClasses.textSecondary} rounded-lg hover:bg-gray-100 transition-colors`}
            >
              Annuler
            </button>
            <button
              onClick={() => {
                localStorage.removeItem(STORAGE_KEYS.TOKEN);
                localStorage.removeItem(STORAGE_KEYS.USER);
                localStorage.removeItem(STORAGE_KEYS.ROLE);
                navigate('/login');
              }}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${getThemeClasses.bgPrimary} flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Award className="w-8 h-8 text-pink-500" />
            </div>
          </div>
          <p className={`mt-4 ${getThemeClasses.textMuted} font-medium`}>Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

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
            <h1 className={`text-lg font-semibold ${getThemeClasses.textCard}`}>EcoCollect Sponsor</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={refreshData}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
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
              <h1 className={`text-xl font-semibold ${getThemeClasses.textCard}`}>EcoCollect Sponsor</h1>
              <div className={`text-sm ${getThemeClasses.textMuted}`}>
                Tableau de bord sponsor
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={refreshData}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
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
                <div className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-2xl p-6 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">
                        Bienvenue, {user?.nom?.split(' ')[0] || 'Sponsor'} !
                      </h2>
                      <p className="text-pink-100">
                        Merci pour votre engagement dans la protection de l'environnement.
                      </p>
                    </div>
                    <div className="hidden lg:block flex-shrink-0">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[200px]">
                        <div className="text-sm text-pink-100">
                          {stats.campagnesActives} campagnes actives
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
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalCampagnes}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Total campagnes</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>Depuis le début</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +2 nouvelles ce mois
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.poidsTotalCollecte}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Poids collecté</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>kg de déchets</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {((stats.poidsTotalCollecte / stats.poidsTotalAttendu) * 100).toFixed(1)}% de l'objectif
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{(stats.budgetTotal/1000000).toFixed(1)}M</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Budget total</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>FCFA</p>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: `${(stats.montantUtilise / stats.budgetTotal) * 100}%`}}></div>
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">240</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Participants</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>Actifs</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +15% ce mois
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <Target className="w-5 h-5 text-pink-600" />
                      Campagnes actives
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {campagnes.filter(c => c.statut === 'active').slice(0, 3).map(campagne => (
                        <div key={campagne.id} className={`p-4 ${getThemeClasses.bgSecondary} rounded-lg`}>
                          <div className="flex items-start gap-3">
                            <img 
                              src={campagne.image} 
                              alt={campagne.titre}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h4 className={`font-medium ${getThemeClasses.textCard} mb-1`}>{campagne.titre}</h4>
                              <p className={`text-sm ${getThemeClasses.textMuted} mb-2`}>{campagne.participants} participants</p>
                              <div className="flex items-center justify-between">
                                <span className={`text-xs ${getThemeClasses.textMuted}`}>
                                  {formatDate(campagne.dateDebut)} - {formatDate(campagne.dateFin)}
                                </span>
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                  Active
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Évolution de l'impact
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {evolutionData.slice(-4).map((data, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className={`text-sm ${getThemeClasses.textCard}`}>{formatDate(data.date)}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{width: `${(data.poids / 20000) * 100}%`}}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>
                              {data.poids} kg
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'campaigns' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} flex items-center gap-2`}>
                  <Target className="w-6 h-6 text-pink-600" />
                  Mes campagnes
                </h1>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Nouvelle campagne
                </button>
              </div>

              <div className="grid gap-6">
                {campagnes.map(campagne => {
                  const status = getStatusBadge(campagne.statut);
                  return (
                    <div key={campagne.id} className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                      <div className="flex items-start gap-4">
                        <img 
                          src={campagne.image} 
                          alt={campagne.titre}
                          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className={`font-semibold ${getThemeClasses.textCard} text-lg mb-2`}>{campagne.titre}</h3>
                              <p className={`${getThemeClasses.textMuted} text-sm mb-3`}>{campagne.description}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${status.color}-100 text-${status.color}-800`}>
                              {status.text}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className={`text-xs ${getThemeClasses.textMuted} mb-1`}>Budget</p>
                              <p className={`font-semibold ${getThemeClasses.textCard}`}>{formatCurrency(campagne.budget)}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${getThemeClasses.textMuted} mb-1`}>Utilisé</p>
                              <p className={`font-semibold ${getThemeClasses.textCard}`}>{formatCurrency(campagne.montantUtilise)}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${getThemeClasses.textMuted} mb-1`}>Participants</p>
                              <p className={`font-semibold ${getThemeClasses.textCard}`}>{campagne.participants}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${getThemeClasses.textMuted} mb-1`}>Poids collecté</p>
                              <p className={`font-semibold ${getThemeClasses.textCard}`}>{campagne.poidsCollecte} kg</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className={`text-sm ${getThemeClasses.textMuted}`}>
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {formatDate(campagne.dateDebut)} - {formatDate(campagne.dateFin)}
                            </div>
                            <button className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              Voir les détails
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentPage === 'profile' && (
            <div>
              <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} mb-6 flex items-center gap-2`}>
                <Users className="w-6 h-6 text-pink-600" />
                Mon profil
              </h1>

              <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(user?.nom)}
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${getThemeClasses.textCard}`}>{user?.nom || 'Sponsor'}</h2>
                    <p className={`${getThemeClasses.textMuted}`}>{user?.email || 'sponsor@ecocollect.cm'}</p>
                    <p className={`${getThemeClasses.textMuted}`}>{user?.telephone || '+237 000 000 000'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${getThemeClasses.textSecondary} mb-2`}>Entreprise</label>
                    <input
                      type="text"
                      value={user?.entreprise || 'EcoSolutions SARL'}
                      className={`w-full px-3 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getThemeClasses.textSecondary} mb-2`}>Statut</label>
                    <input
                      type="text"
                      value="Partenaire Premium"
                      className={`w-full px-3 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal de déconnexion */}
      <LogoutModal />
    </div>
  );
};

export default DashboardSponsor;
