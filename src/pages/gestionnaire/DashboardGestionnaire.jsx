// DashboardGestionnaire.jsx
import { useState, useEffect, useCallback, useRef, useMemo, useDeferredValue } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import {
  Warehouse, Package, Clock, CheckCircle, TrendingUp, Award,
  BarChart3, Target, DollarSign, Bell, ArrowRight,
  Truck, MapPin, Star, Activity, Users, Calendar,
  Menu, X, LogOut, User, Settings, HelpCircle,
  LayoutDashboard, Filter, Search, Phone, MessageSquare, Eye,
  Edit2, Save, Building, Shield, Download, AlertCircle,
  RefreshCw, Gift, Award as AwardIcon, BarChart, PieChart,
  Scale, ThumbsUp, Info, ChevronRight, Check, TrendingDown,
  ShoppingCart, Plus, Minus, Receipt, History, Printer
} from 'lucide-react';
import { getThemeClasses, toggleDarkMode, initTheme } from '../../utils/themeUtils.js';

// ==================== COMPOSANT PRINCIPAL ====================
const DashboardGestionnaire = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // État des données
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalMissions: 0,
    missionsValidees: 0,
    missionsEnAttente: 0,
    totalAchats: 0,
    totalStock: 0,
    revenusTotal: 0
  });
  const [missionsEnAttente, setMissionsEnAttente] = useState([]);
  const [missionsRecentes, setMissionsRecentes] = useState([]);
  const [topCollecteurs, setTopCollecteurs] = useState([]);
  const [mesMissionsValidees, setMesMissionsValidees] = useState([]);
  const [monHistorique, setMonHistorique] = useState([]);
  const [achats, setAchats] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [statsAchatsParType, setStatsAchatsParType] = useState([]);
  const [statsParType, setStatsParType] = useState([]);
  const [evolutionJournaliere, setEvolutionJournaliere] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Formulaires
  const [achatForm, setAchatForm] = useState({
    typeDechet: '',
    quantite: '',
    prixUnitaire: '',
    fournisseur: '',
    dateAchat: ''
  });

  const [stockForm, setStockForm] = useState({
    typeDechet: '',
    quantite: '',
    operation: 'ajout',
    raison: ''
  });

  const [profileForm, setProfileForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // États UI
  const [showAchatModal, setShowAchatModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('tous');

  const API_URL = 'https://ecobackend-zeds.vercel.app';
  const STORAGE_KEYS = {
    TOKEN: 'ecocollect_token',
    USER: 'ecocollect_user',
    ROLE: 'ecocollect_role'
  };

  // Types de déchets
  const wasteTypes = {
    'plastique': { label: 'Plastique', icon: '♻️', color: 'blue' },
    'plastique_pet': { label: 'Plastique PET', icon: '♻️', color: 'blue' },
    'plastique_pehd': { label: 'Plastique PEHD', icon: '♻️', color: 'blue' },
    'papier_carton': { label: 'Papier/Carton', icon: '📦', color: 'yellow' },
    'papier': { label: 'Papier', icon: '📄', color: 'yellow' },
    'carton': { label: 'Carton', icon: '📦', color: 'yellow' },
    'metal': { label: 'Métal', icon: '🔧', color: 'gray' },
    'verre': { label: 'Verre', icon: '🍾', color: 'green' },
    'organique': { label: 'Organique', icon: '🌱', color: 'orange' }
  };

  // Initialisation
  useEffect(() => {
    console.log('🔄 Initialisation du DashboardGestionnaire');
    initTheme(); // Initialiser le thème
    checkSession();
    loadGestionnaireData();
  }, []);

  const checkSession = () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);

    if (!token || !userJson || role !== 'gestionnaire') {
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(userJson);
      setUserData(user);
    } catch (error) {
      console.error('Erreur de session:', error);
      navigate('/login');
    }
  };

  const loadGestionnaireData = async () => {
    setIsLoading(true);
    try {
      // Simuler des données pour le moment
      setStats({
        totalMissions: 156,
        missionsValidees: 142,
        missionsEnAttente: 14,
        totalAchats: 850000,
        totalStock: 2340,
        revenusTotal: 1250000
      });

      setMissionsEnAttente([
        {
          id: 1,
          collecteur: 'Jean Dupont',
          typeDechet: 'plastique_pet',
          quantite: 50,
          points: 500,
          date: '2024-01-15',
          statut: 'en_attente'
        }
      ]);

      setMissionsRecentes([
        {
          id: 2,
          collecteur: 'Marie Curie',
          typeDechet: 'papier_carton',
          quantite: 30,
          points: 300,
          date: '2024-01-14',
          statut: 'validee'
        }
      ]);

      setTopCollecteurs([
        { nom: 'Paul Martin', missions: 45, points: 4500 },
        { nom: 'Sophie Laurent', missions: 38, points: 3800 },
        { nom: 'Lucas Bernard', missions: 32, points: 3200 }
      ]);

      setStocks([
        { type: 'plastique_pet', quantite: 450, unite: 'kg', seuil: 100 },
        { type: 'papier_carton', quantite: 320, unite: 'kg', seuil: 150 },
        { type: 'metal', quantite: 180, unite: 'kg', seuil: 50 }
      ]);

      setAchats([
        {
          id: 1,
          typeDechet: 'plastique_pet',
          quantite: 100,
          prixUnitaire: 2500,
          fournisseur: 'RecyclePro',
          date: '2024-01-10',
          total: 250000
        }
      ]);

    } catch (error) {
      console.error('Erreur chargement données:', error);
      setError('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonctions utilitaires
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(amount);
  };

  const getTypeIcon = (type) => {
    return wasteTypes[type]?.icon || '📦';
  };

  const getTypeColor = (type) => {
    return wasteTypes[type]?.color || 'gray';
  };

  const getNiveauStock = (quantite, seuil) => {
    if (quantite <= seuil) return { niveau: 'critique', color: 'red' };
    if (quantite <= seuil * 1.5) return { niveau: 'bas', color: 'orange' };
    if (quantite <= seuil * 2) return { niveau: 'moyen', color: 'yellow' };
    return { niveau: 'bon', color: 'green' };
  };

  const getStatusBadge = (statut) => {
    const badges = {
      'en_attente': { text: 'En attente', color: 'orange' },
      'validee': { text: 'Validée', color: 'green' },
      'rejetee': { text: 'Rejetée', color: 'red' },
      'en_cours': { text: 'En cours', color: 'blue' }
    };
    return badges[statut] || { text: 'Inconnu', color: 'gray' };
  };

  // Actions
  const validerMission = async (missionId) => {
    try {
      // Logique de validation
      setMissionsEnAttente(prev => prev.filter(m => m.id !== missionId));
      setStats(prev => ({
        ...prev,
        missionsValidees: prev.missionsValidees + 1,
        missionsEnAttente: prev.missionsEnAttente - 1
      }));
    } catch (error) {
      console.error('Erreur validation mission:', error);
    }
  };

  const creerAchat = async (formData) => {
    try {
      // Logique de création d'achat
      const nouvelAchat = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        total: formData.quantite * formData.prixUnitaire
      };
      setAchats(prev => [nouvelAchat, ...prev]);
      setShowAchatModal(false);
      setAchatForm({ typeDechet: '', quantite: '', prixUnitaire: '', fournisseur: '', dateAchat: '' });
    } catch (error) {
      console.error('Erreur création achat:', error);
    }
  };

  const ajusterStock = async (formData) => {
    try {
      // Logique d'ajustement de stock
      const stockIndex = stocks.findIndex(s => s.type === formData.typeDechet);
      if (stockIndex !== -1) {
        const nouvelleQuantite = formData.operation === 'ajout' 
          ? stocks[stockIndex].quantite + parseInt(formData.quantite)
          : stocks[stockIndex].quantite - parseInt(formData.quantite);
        
        setStocks(prev => {
          const newStocks = [...prev];
          newStocks[stockIndex] = { ...newStocks[stockIndex], quantite: nouvelleQuantite };
          return newStocks;
        });
      }
      setShowStockModal(false);
      setStockForm({ typeDechet: '', quantite: '', operation: 'ajout', raison: '' });
    } catch (error) {
      console.error('Erreur ajustement stock:', error);
    }
  };

  const updateProfil = async (formData) => {
    try {
      // Logique de mise à jour profil
      setUserData(prev => ({ ...prev, ...formData }));
      setShowProfileModal(false);
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
    }
  };

  const changePassword = async (formData) => {
    try {
      // Logique de changement de mot de passe
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Erreur changement mot de passe:', error);
    }
  };

  const refreshData = () => {
    loadGestionnaireData();
  };

  const getInitials = (name) => {
    if (!name) return 'G';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Composant Sidebar
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
      { id: 'missions', label: 'Missions', icon: Package, badge: missionsEnAttente.length },
      { id: 'achats', label: 'Achats', icon: ShoppingCart },
      { id: 'stocks', label: 'Stocks', icon: Warehouse },
      { id: 'rapports', label: 'Rapports', icon: BarChart3 },
      { id: 'profil', label: 'Mon profil', icon: User }
    ];

    return (
      <>
        {/* Mobile Sidebar */}
        <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className={`fixed top-0 left-0 h-full w-72 ${getThemeClasses.card} shadow-xl transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(userData?.nom)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{userData?.nom || 'Gestionnaire'}</p>
                    <p className="text-blue-100 text-sm">En ligne</p>
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
                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                            : `${getThemeClasses.textSecondary} hover:bg-gray-50 hover:text-gray-900`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        
                        {item.badge && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
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
                onClick={() => navigate('/login')}
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
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials(userData?.nom)}
              </div>
              <div>
                <p className={`font-medium ${getThemeClasses.textCard}`}>{userData?.nom || 'Gestionnaire'}</p>
                <p className={`text-xs ${getThemeClasses.textMuted}`}>{userData?.email || 'gestionnaire@ecocollect.cm'}</p>
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
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                          : `${getThemeClasses.textSecondary} hover:bg-gray-50 hover:text-gray-900`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      
                      {item.badge && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
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
              onClick={() => navigate('/login')}
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
            <h1 className={`text-lg font-semibold ${getThemeClasses.textCard}`}>EcoCollect Gestion</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
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
              <h1 className={`text-xl font-semibold ${getThemeClasses.textCard}`}>EcoCollect Gestion</h1>
              <div className={`text-sm ${getThemeClasses.textMuted}`}>
                Tableau de bord gestionnaire
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={refreshData}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
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
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">
                        Bienvenue, {userData?.nom?.split(' ')[0] || 'Gestionnaire'} !
                      </h2>
                      <p className="text-blue-100">
                        Gérez efficacement vos opérations de collecte et de traitement des déchets.
                      </p>
                    </div>
                    <div className="hidden lg:block flex-shrink-0">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[200px]">
                        <div className="text-sm text-blue-100">
                          {stats.missionsValidees} missions validées ce mois
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
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalMissions}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Total missions</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>Toutes catégories</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% ce mois
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.missionsEnAttente}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>En attente</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>Validation requise</p>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '35%'}}></div>
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Warehouse className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalStock}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Stock total</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>kg en stock</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Niveau optimal
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{(stats.revenusTotal/1000).toFixed(0)}k</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Revenus</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>FCFA</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +18% vs mois dernier
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <Package className="w-5 h-5 text-blue-600" />
                      Missions en attente
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {missionsEnAttente.slice(0, 3).map(mission => (
                        <div key={mission.id} className={`p-4 ${getThemeClasses.bgSecondary} rounded-lg`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{getTypeIcon(mission.typeDechet)}</span>
                                <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>
                                  {mission.quantite} kg
                                </span>
                              </div>
                              <p className={`text-sm ${getThemeClasses.textMuted} mb-1`}>
                                {mission.collecteur}
                              </p>
                              <p className={`text-xs ${getThemeClasses.textMuted}`}>
                                {formatDate(mission.date)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => validerMission(mission.id)}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                              >
                                Valider
                              </button>
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                                {mission.points} pts
                              </span>
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
                      <Users className="w-5 h-5 text-green-600" />
                      Top collecteurs
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {topCollecteurs.map((collecteur, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                              {index + 1}
                            </div>
                            <div>
                              <p className={`font-medium ${getThemeClasses.textCard}`}>{collecteur.nom}</p>
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
              </div>
            </div>
          )}

          {currentPage === 'missions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} flex items-center gap-2`}>
                  <Package className="w-6 h-6 text-blue-600" />
                  Gestion des missions
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterType('en_attente')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterType === 'en_attente' 
                        ? 'bg-orange-600 text-white' 
                        : `${getThemeClasses.bgSecondary} ${getThemeClasses.textSecondary}`
                    }`}
                  >
                    En attente ({missionsEnAttente.length})
                  </button>
                  <button
                    onClick={() => setFilterType('validees')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterType === 'validees' 
                        ? 'bg-green-600 text-white' 
                        : `${getThemeClasses.bgSecondary} ${getThemeClasses.textSecondary}`
                    }`}
                  >
                    Validées ({stats.missionsValidees})
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {missionsEnAttente.map(mission => (
                  <div key={mission.id} className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-lg">{getTypeIcon(mission.typeDechet)}</span>
                          <div>
                            <h3 className={`font-semibold ${getThemeClasses.textCard}`}>
                              {mission.quantite} kg - {wasteTypes[mission.typeDechet]?.label}
                            </h3>
                            <p className={`text-sm ${getThemeClasses.textMuted}`}>
                              Collecteur: {mission.collecteur}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`${getThemeClasses.textMuted}`}>
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {formatDate(mission.date)}
                          </span>
                          <span className="font-medium text-green-600">
                            <Award className="w-4 h-4 inline mr-1" />
                            {mission.points} points
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => validerMission(mission.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Valider
                        </button>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800`}>
                          En attente
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentPage === 'achats' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} flex items-center gap-2`}>
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                  Achats de déchets
                </h1>
                <button
                  onClick={() => setShowAchatModal(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nouvel achat
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                  <div className="text-center">
                    <p className={`text-sm ${getThemeClasses.textMuted} mb-2`}>Total achats</p>
                    <p className={`text-3xl font-bold ${getThemeClasses.textCard}`}>
                      {(stats.totalAchats/1000).toFixed(0)}k
                    </p>
                    <p className={`text-sm ${getThemeClasses.textMuted}`}>FCFA</p>
                  </div>
                </div>
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                  <div className="text-center">
                    <p className={`text-sm ${getThemeClasses.textMuted} mb-2`}>Ce mois</p>
                    <p className={`text-3xl font-bold text-purple-600`}>
                      {(stats.totalAchats * 0.3 / 1000).toFixed(0)}k
                    </p>
                    <p className={`text-sm ${getThemeClasses.textMuted}`}>FCFA</p>
                  </div>
                </div>
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                  <div className="text-center">
                    <p className={`text-sm ${getThemeClasses.textMuted} mb-2`}>Fournisseurs</p>
                    <p className={`text-3xl font-bold text-blue-600`}>12</p>
                    <p className={`text-sm ${getThemeClasses.textMuted}`}>Actifs</p>
                  </div>
                </div>
              </div>

              <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                <div className={`p-6 border-b ${getThemeClasses.border}`}>
                  <h3 className={`text-lg font-semibold ${getThemeClasses.textCard}`}>Historique des achats</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {achats.map(achat => (
                    <div key={achat.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${getThemeClasses.textCard}`}>
                            {getTypeIcon(achat.typeDechet)} {wasteTypes[achat.typeDechet]?.label}
                          </p>
                          <p className={`text-sm ${getThemeClasses.textMuted}`}>
                            {achat.quantite} kg × {formatCurrency(achat.prixUnitaire)} - {achat.fournisseur}
                          </p>
                          <p className={`text-xs ${getThemeClasses.textMuted}`}>{formatDate(achat.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getThemeClasses.textCard}`}>{formatCurrency(achat.total)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentPage === 'stocks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} flex items-center gap-2`}>
                  <Warehouse className="w-6 h-6 text-green-600" />
                  Gestion des stocks
                </h1>
                <button
                  onClick={() => setShowStockModal(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Ajuster stock
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stocks.map((stock, index) => {
                  const niveau = getNiveauStock(stock.quantite, stock.seuil);
                  return (
                    <div key={index} className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getTypeIcon(stock.type)}</span>
                          <span className={`font-medium ${getThemeClasses.textCard}`}>
                            {wasteTypes[stock.type]?.label}
                          </span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${niveau.color}-100 text-${niveau.color}-800`}>
                          {niveau.niveau}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm ${getThemeClasses.textMuted}`}>Quantité</span>
                          <span className={`font-semibold ${getThemeClasses.textCard}`}>{stock.quantite} {stock.unite}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-${niveau.color}-500 h-2 rounded-full`} 
                            style={{width: `${Math.min((stock.quantite / (stock.seuil * 3)) * 100, 100)}%`}}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Seil critique: {stock.seuil} {stock.unite}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentPage === 'rapports' && (
            <div>
              <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} mb-6 flex items-center gap-2`}>
                <BarChart3 className="w-6 h-6 text-indigo-600" />
                Rapports et statistiques
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard}`}>Statistiques par type</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {Object.entries(wasteTypes).slice(0, 5).map(([type, info]) => (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>{info.icon}</span>
                            <span className={`text-sm ${getThemeClasses.textCard}`}>{info.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{width: `${Math.random() * 80 + 20}%`}}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>
                              {Math.floor(Math.random() * 500 + 100)} kg
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard}`}>Performance mensuelle</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'].map((mois, index) => (
                        <div key={mois} className="flex items-center justify-between">
                          <span className={`text-sm ${getThemeClasses.textCard}`}>{mois}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{width: `${Math.random() * 60 + 40}%`}}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>
                              {Math.floor(Math.random() * 50 + 20)} missions
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

          {currentPage === 'profil' && (
            <div>
              <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} mb-6 flex items-center gap-2`}>
                <User className="w-6 h-6 text-blue-600" />
                Mon profil
              </h1>

              <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(userData?.nom)}
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${getThemeClasses.textCard}`}>{userData?.nom || 'Gestionnaire'}</h2>
                    <p className={`${getThemeClasses.textMuted}`}>{userData?.email || 'gestionnaire@ecocollect.cm'}</p>
                    <p className={`${getThemeClasses.textMuted}`}>{userData?.telephone || '+237 000 000 000'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${getThemeClasses.textSecondary} mb-2`}>Centre de gestion</label>
                    <input
                      type="text"
                      value={userData?.centre || 'Douala, Akwa'}
                      className={`w-full px-3 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getThemeClasses.textSecondary} mb-2`}>Statut</label>
                    <input
                      type="text"
                      value="Actif"
                      className={`w-full px-3 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Modifier le profil
                  </button>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Changer le mot de passe
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardGestionnaire;
