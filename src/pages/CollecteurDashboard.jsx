// CollecteurDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Truck, Package, Clock, CheckCircle, TrendingUp, Award, Plus, 
  BarChart3, Users, MapPin, Star, ArrowRight, Calendar, Leaf, Recycle, Target,
  ArrowLeft, Phone, MapPinned, MessageCircle, Edit, Download, Share,
  Scale, AlertCircle, Filter, Search, Eye, LogOut, Key, Copy,
  Bell, Lock, Globe, Smartphone, Mail, Shield, Info, ChevronRight,
  Home, Building2, Store, Droplets, Cpu, Box, Sparkles,
  User, FileText, Upload, Camera, Save, X, UserCheck, Timer, Route,
  Navigation, ThumbsUp, Award as AwardIcon, Wifi, Volume2, Moon, Sun,
  HelpCircle, CreditCard, Download as DownloadIcon, Upload as UploadIcon,
  LogOut as LogOutIcon, Trash2 as Trash2Icon, Fingerprint, MapPin as MapPinIcon,
  Menu, Settings as SettingsIcon, History, X as XIcon, Check, Play, Flag,
  Map, Navigation as NavigationIcon, DollarSign, Coins, TrendingUp as TrendingUpIcon
} from 'lucide-react';
import logo from '../assets/logo.jpeg';
import { getThemeClasses, toggleDarkMode, initTheme } from '../utils/themeUtils.js';

const CollecteurDashboard = () => {
  // ========== ÉTATS ==========
  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState({});
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showDepotModal, setShowDepotModal] = useState(false);
  const [pointsDepot, setPointsDepot] = useState([]);

  // Données du tableau de bord
  const [dashboardData, setDashboardData] = useState({
    totalMissions: 0,
    missionsValidees: 0,
    missionsEnCours: 0,
    totalDechets: 0,
    gainsTotal: 0,
    gainsEnAttente: 0,
    gainsValides: 0
  });

  // Missions
  const [missionsDisponibles, setMissionsDisponibles] = useState([]);
  const [mesMissions, setMesMissions] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [missionFilter, setMissionFilter] = useState('tous');
  const [selectedPointDepot, setSelectedPointDepot] = useState('');

  // Formulaire de mission
  const [missionForm, setMissionForm] = useState({
    photoPreuve: null,
    codeConfirmation: '',
    notes: '',
    conformiteTri: 'true',
    pointDepotId: ''
  });

  // Formulaire de mise à jour profil
  const [profileForm, setProfileForm] = useState({
    nomComplet: '',
    telephone: '',
    zoneIntervention: '',
    quartiers: '',
    communes: ''
  });

  // Formulaire changement mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Gains
  const [gains, setGains] = useState([]);
  const [gainsFilter, setGainsFilter] = useState('all');

  // États UI
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: 'â' });

  const API_URL = 'https://ecobackend-zeds.vercel.app';
  const STORAGE_KEYS = {
    TOKEN: 'ecocollect_token',
    USER: 'ecocollect_user',
    ROLE: 'ecocollect_role'
  };

  // ========== TYPES DE DÃCHETS ==========
  const wasteTypes = {
    'plastique': { label: 'Plastique', icon: 'â¯ï¸', color: 'blue' },
    'plastique_pet': { label: 'Plastique PET', icon: 'â¯ï¸', color: 'blue' },
    'plastique_pehd': { label: 'Plastique PEHD', icon: 'â¯ï¸', color: 'blue' },
    'papier_carton': { label: 'Papier/Carton', icon: 'ð¦', color: 'yellow' },
    'papier': { label: 'Papier', icon: 'ð', color: 'yellow' },
    'carton': { label: 'Carton', icon: 'ð¦', color: 'yellow' },
    'metal': { label: 'MÃ©tal', icon: 'ð§', color: 'gray' },
    'verre': { label: 'Verre', icon: 'ð¾', color: 'green' },
    'organique': { label: 'Organique', icon: 'ð±', color: 'orange' }
  };

  // ========== STATUTS ==========
  const getStatusColor = (status) => {
    const colors = {
      'disponible': 'blue',
      'acceptee': 'purple',
      'en_cours': 'orange',
      'deposee': 'amber',
      'validee': 'green',
      'terminee': 'green'
    };
    return colors[status] || 'gray';
  };

  const getStatusText = (status) => {
    const texts = {
      'disponible': 'Disponible',
      'acceptee': 'AcceptÃ©e',
      'en_cours': 'En cours',
      'deposee': 'DÃ©posÃ©e',
      'validee': 'ValidÃ©e',
      'terminee': 'TerminÃ©e'
    };
    return texts[status] || 'Inconnu';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'disponible': Clock,
      'acceptee': Check,
      'en_cours': Truck,
      'deposee': Map,
      'validee': CheckCircle,
      'terminee': CheckCircle
    };
    return icons[status] || Clock;
  };

  // ========== INITIALISATION ==========
  useEffect(() => {
    console.log('ð¨ Initialisation du CollecteurDashboard');
    initTheme(); // Initialiser le thÃ¨me
    checkSession();
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (currentToken && currentUser) {
      loadCollecteurData();
    }
  }, [currentToken, currentUser]);

  useEffect(() => {
    filterMissions();
  }, [missionFilter, mesMissions, missionsDisponibles]);

  const checkSession = () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);

    if (!token || !userJson || role !== 'collecteur') {
      window.location.href = '/login';
      return;
    }

    try {
      const user = JSON.parse(userJson);
      setCurrentToken(token);
      setCurrentUser(user);
      startAutoRefresh();
    } catch (error) {
      clearSession();
    }
  };

  const startAutoRefresh = () => {
    if (refreshInterval) clearInterval(refreshInterval);
    const interval = setInterval(() => {
      if (activeSection === 'dashboard') {
        loadDashboard();
      } else if (activeSection === 'missions') {
        loadMissions();
      }
    }, 30000);
    setRefreshInterval(interval);
  };

  const clearSession = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    window.location.href = '/';
  };

  // ========== FONCTIONS DE CHARGEMENT ==========
  const loadCollecteurData = async () => {
    await Promise.all([
      loadDashboard(),
      loadMissions(),
      loadGains()
    ]);
  };

  const loadDashboard = async () => {
    if (!currentToken) return;

    try {
      // Simuler des donnÃ©es pour le moment
      setDashboardData({
        totalMissions: 24,
        missionsValidees: 18,
        missionsEnCours: 3,
        totalDechets: 450,
        gainsTotal: 125000,
        gainsEnAttente: 25000,
        gainsValides: 100000
      });
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    }
  };

  const loadMissions = async () => {
    if (!currentToken) return;

    try {
      // Simuler des donnÃ©es
      const disponibles = [
        {
          id: 1,
          typeDechet: 'plastique_pet',
          quantite: 50,
          unite: 'kg',
          adresse: 'Douala, Bonaberi',
          producteur: 'Jean Dupont',
          statut: 'disponible',
          dateCreation: '2024-01-15',
          points: 500
        }
      ];

      const enCours = [
        {
          id: 2,
          typeDechet: 'papier_carton',
          quantite: 30,
          unite: 'kg',
          adresse: 'YaoundÃ©, Bastos',
          producteur: 'Marie Curie',
          statut: 'en_cours',
          dateAcceptation: '2024-01-14',
          points: 300
        }
      ];

      setMissionsDisponibles(disponibles);
      setMesMissions(enCours);
    } catch (error) {
      console.error('Erreur chargement missions:', error);
    }
  };

  const loadGains = async () => {
    if (!currentToken) return;

    try {
      // Simuler des donnÃ©es
      setGains([
        {
          id: 1,
          missionId: 1,
          montant: 5000,
          statut: 'valide',
          dateValidation: '2024-01-13',
          mission: 'Collecte plastique PET'
        }
      ]);
    } catch (error) {
      console.error('Erreur chargement gains:', error);
    }
  };

  // ========== FONCTIONS UTILITAIRES ==========
  const filterMissions = () => {
    let allMissions = [];
    
    if (missionFilter === 'tous' || missionFilter === 'disponibles') {
      allMissions = [...allMissions, ...missionsDisponibles];
    }
    
    if (missionFilter === 'tous' || missionFilter === 'encours') {
      allMissions = [...allMissions, ...mesMissions];
    }
    
    if (missionFilter === 'terminees') {
      allMissions = mesMissions.filter(m => m.statut === 'terminee');
    }
    
    setFilteredMissions(allMissions);
  };

  const accepterMission = async (missionId) => {
    try {
      // Logique d'acceptation
      const mission = missionsDisponibles.find(m => m.id === missionId);
      if (mission) {
        mission.statut = 'en_cours';
        mission.dateAcceptation = new Date().toISOString();
        setMesMissions([...mesMissions, mission]);
        setMissionsDisponibles(missionsDisponibles.filter(m => m.id !== missionId));
      }
    } catch (error) {
      console.error('Erreur acceptation mission:', error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'C';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // ========== COMPOSANTS UI ==========
  const Sidebar = ({ isOpen, toggleSidebar }) => {
    const menuItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
      { id: 'missions', label: 'Missions', icon: Truck, badge: missionsDisponibles.length },
      { id: 'gains', label: 'Mes gains', icon: DollarSign },
      { id: 'profile', label: 'Mon profil', icon: User }
    ];

    return (
      <>
        {/* Mobile Sidebar */}
        <div className={`lg:hidden fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black/50" onClick={toggleSidebar} />
          <div className={`fixed top-0 left-0 h-full w-72 ${getThemeClasses.card} shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(currentUser?.nomComplet)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{currentUser?.nomComplet || 'Collecteur'}</p>
                    <p className="text-green-100 text-sm">En ligne</p>
                  </div>
                </div>
                <button
                  onClick={toggleSidebar}
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
                  const isActive = activeSection === item.id;
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          toggleSidebar();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors group ${
                          isActive 
                            ? 'bg-green-50 text-green-700 border-l-4 border-green-600' 
                            : `${getThemeClasses.textSecondary} hover:bg-gray-50 hover:text-gray-900`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
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
                  clearSession();
                  toggleSidebar();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">DÃ©connexion</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className={`hidden lg:block fixed top-0 left-0 h-screen ${getThemeClasses.card} shadow-xl z-50 w-72 overflow-hidden flex flex-col`}>
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials(currentUser?.nomComplet)}
              </div>
              <div>
                <p className={`font-medium ${getThemeClasses.textCard}`}>{currentUser?.nomComplet || 'Collecteur'}</p>
                <p className={`text-xs ${getThemeClasses.textMuted}`}>{currentUser?.email || 'collecteur@ecocollect.cm'}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors group ${
                        isActive 
                          ? 'bg-green-50 text-green-700 border-l-4 border-green-600' 
                          : `${getThemeClasses.textSecondary} hover:bg-gray-50 hover:text-gray-900`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
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
              onClick={clearSession}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">DÃ©connexion</span>
            </button>
          </div>
        </div>
      </>
    );
  };

  // ========== RENDU PRINCIPAL ==========
  return (
    <div className={`min-h-screen ${getThemeClasses.bgPrimary}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Header avec menu burger pour mobile */}
      <header className={`lg:hidden ${getThemeClasses.navigation} sticky top-0 z-40`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <img src={logo} alt="EcoCollect" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <User className="w-5 h-5 text-gray-600" />
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
              <img src={logo} alt="EcoCollect" className="h-8 w-auto" />
              <div className={`text-sm ${getThemeClasses.textMuted}`}>
                Tableau de bord collecteur
              </div>
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

        <main className="p-6">
          {activeSection === 'dashboard' && (
            <div>
              <div className="mb-8">
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">
                        Bienvenue, {currentUser?.nomComplet?.split(' ')[0] || 'Collecteur'} !
                      </h2>
                      <p className="text-green-100">
                        PrÃªt Ã  collecter des dÃ©chets aujourd'hui ? Vous avez {missionsDisponibles.length} missions disponibles.
                      </p>
                    </div>
                    <div className="hidden lg:block flex-shrink-0">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[200px]">
                        <div className="text-sm text-green-100">
                          {dashboardData.gainsValides.toLocaleString()} FCFA validÃ©s ce mois
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
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{dashboardData.totalMissions}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Total missions</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>Depuis le dÃ©but</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8% ce mois
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{dashboardData.missionsEnCours}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Missions en cours</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>Actives</p>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{dashboardData.missionsValidees}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Missions validÃ©es</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>TerminÃ©es</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    75% de taux de rÃ©ussite
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{(dashboardData.gainsTotal/1000).toFixed(0)}k</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Gains totaux</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>FCFA</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% vs mois dernier
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <Truck className="w-5 h-5 text-green-600" />
                      Missions rÃ©centes
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {mesMissions.slice(0, 3).map(mission => (
                        <div key={mission.id} className={`p-4 ${getThemeClasses.bgSecondary} rounded-lg`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{wasteTypes[mission.typeDechet]?.icon || 'ð¦'}</span>
                                <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>
                                  {mission.quantite} {mission.unite}
                                </span>
                              </div>
                              <p className={`text-sm ${getThemeClasses.textMuted} mb-1`}>
                                {mission.adresse}
                              </p>
                              <p className={`text-xs ${getThemeClasses.textMuted}`}>
                                {mission.producteur}
                              </p>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                              En cours
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
                      <Award className="w-5 h-5 text-yellow-600" />
                      Performance
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm ${getThemeClasses.textSecondary}`}>Taux de rÃ©ussite</span>
                          <span className={`font-semibold ${getThemeClasses.textCard}`}>75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm ${getThemeClasses.textSecondary}`}>Total collectÃ©</span>
                          <span className={`font-semibold ${getThemeClasses.textCard}`}>{dashboardData.totalDechets} kg</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'missions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} flex items-center gap-2`}>
                  <Truck className="w-6 h-6 text-green-600" />
                  Mes missions
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMissionFilter('disponibles')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      missionFilter === 'disponibles' 
                        ? 'bg-blue-600 text-white' 
                        : `${getThemeClasses.bgSecondary} ${getThemeClasses.textSecondary}`
                    }`}
                  >
                    Disponibles ({missionsDisponibles.length})
                  </button>
                  <button
                    onClick={() => setMissionFilter('encours')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      missionFilter === 'encours' 
                        ? 'bg-orange-600 text-white' 
                        : `${getThemeClasses.bgSecondary} ${getThemeClasses.textSecondary}`
                    }`}
                  >
                    En cours ({mesMissions.length})
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {filteredMissions.map(mission => (
                  <div key={mission.id} className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-lg">{wasteTypes[mission.typeDechet]?.icon || 'ð¦'}</span>
                          <div>
                            <h3 className={`font-semibold ${getThemeClasses.textCard}`}>
                              {mission.quantite} {mission.unite} - {wasteTypes[mission.typeDechet]?.label}
                            </h3>
                            <p className={`text-sm ${getThemeClasses.textMuted}`}>
                              {mission.adresse}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`${getThemeClasses.textMuted}`}>
                            <User className="w-4 h-4 inline mr-1" />
                            {mission.producteur}
                          </span>
                          <span className={`${getThemeClasses.textMuted}`}>
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {mission.dateCreation || mission.dateAcceptation}
                          </span>
                          <span className="font-medium text-green-600">
                            <Award className="w-4 h-4 inline mr-1" />
                            {mission.points} points
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {mission.statut === 'disponible' && (
                          <button
                            onClick={() => accepterMission(mission.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Accepter
                          </button>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(mission.statut)}-100 text-${getStatusColor(mission.statut)}-800`}>
                          {getStatusText(mission.statut)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'gains' && (
            <div>
              <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} mb-6 flex items-center gap-2`}>
                <DollarSign className="w-6 h-6 text-green-600" />
                Mes gains
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                  <div className="text-center">
                    <p className={`text-sm ${getThemeClasses.textMuted} mb-2`}>Gains totaux</p>
                    <p className={`text-3xl font-bold ${getThemeClasses.textCard}`}>
                      {(dashboardData.gainsTotal/1000).toFixed(0)}k
                    </p>
                    <p className={`text-sm ${getThemeClasses.textMuted}`}>FCFA</p>
                  </div>
                </div>
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                  <div className="text-center">
                    <p className={`text-sm ${getThemeClasses.textMuted} mb-2`}>Gains validÃ©s</p>
                    <p className={`text-3xl font-bold text-green-600`}>
                      {(dashboardData.gainsValides/1000).toFixed(0)}k
                    </p>
                    <p className={`text-sm ${getThemeClasses.textMuted}`}>FCFA</p>
                  </div>
                </div>
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                  <div className="text-center">
                    <p className={`text-sm ${getThemeClasses.textMuted} mb-2`}>En attente</p>
                    <p className={`text-3xl font-bold text-orange-600`}>
                      {(dashboardData.gainsEnAttente/1000).toFixed(0)}k
                    </p>
                    <p className={`text-sm ${getThemeClasses.textMuted}`}>FCFA</p>
                  </div>
                </div>
              </div>

              <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                <div className={`p-6 border-b ${getThemeClasses.border}`}>
                  <h3 className={`text-lg font-semibold ${getThemeClasses.textCard}`}>Historique des gains</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {gains.map(gain => (
                    <div key={gain.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${getThemeClasses.textCard}`}>{gain.mission}</p>
                          <p className={`text-sm ${getThemeClasses.textMuted}`}>{gain.dateValidation}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getThemeClasses.textCard}`}>{gain.montant.toLocaleString()} FCFA</p>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {gain.statut}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'profile' && (
            <div>
              <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} mb-6 flex items-center gap-2`}>
                <User className="w-6 h-6 text-green-600" />
                Mon profil
              </h1>

              <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(currentUser?.nomComplet)}
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${getThemeClasses.textCard}`}>{currentUser?.nomComplet || 'Collecteur'}</h2>
                    <p className={`${getThemeClasses.textMuted}`}>{currentUser?.email || 'collecteur@ecocollect.cm'}</p>
                    <p className={`${getThemeClasses.textMuted}`}>{currentUser?.telephone || '+237 000 000 000'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${getThemeClasses.textSecondary} mb-2`}>Zone d'intervention</label>
                    <input
                      type="text"
                      value={currentUser?.zoneIntervention || 'Douala et ses environs'}
                      className={`w-full px-3 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getThemeClasses.textSecondary} mb-2`}>Statut</label>
                    <input
                      type="text"
                      value="Actif"
                      className={`w-full px-3 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent`}
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

export default CollecteurDashboard;
