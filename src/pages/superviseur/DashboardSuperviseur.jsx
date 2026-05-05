// DashboardSuperviseur.jsx
import { useState, useEffect, useCallback, useRef, useMemo, useDeferredValue } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import {
  // Icônes principales
  User, Users, UserPlus, UserCheck, UserX, UserCog,
  Building, MapPin, Phone, Mail, Calendar, Clock,
  CheckCircle, XCircle, AlertCircle, Info, Eye, Target,
  Edit2, Trash2, Save, X, Plus, Search, Filter,
  RefreshCw, Download, Upload, FileText, Printer,
  BarChart3, PieChart, TrendingUp, Award, Star,
  Shield, Key, LogOut, Menu, Home, LayoutDashboard,
  Package, Truck, Wallet, History, HelpCircle, Settings,
  ChevronRight, ChevronDown, ChevronUp, ArrowLeft,
  Scale, Gift, AlertTriangle, Check, Copy, ExternalLink,
  Moon
} from 'lucide-react';
import { getThemeClasses, toggleDarkMode, initTheme } from '../../utils/themeUtils.js';

// ==================== MODAL DE DÃCONNEXION ====================
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${getThemeClasses.card} rounded-2xl max-w-md w-full shadow-2xl transform transition-all`}>
        <div className={`p-6 border-b ${getThemeClasses.border} bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
            <h2 className={`text-xl font-bold ${getThemeClasses.textCard}`}>DÃ©connexion</h2>
          </div>
        </div>

        <div className="p-6">
          <p className={`${getThemeClasses.textCard} mb-2`}>Ãtes-vous sÃ»r de vouloir vous dÃ©connecter ?</p>
          <p className={`text-sm ${getThemeClasses.textMuted}`}>Vous devrez vous reconnecter pour accÃ©der Ã  votre compte.</p>
        </div>

        <div className={`p-6 border-t ${getThemeClasses.border} ${getThemeClasses.bgSecondary} rounded-b-2xl flex gap-3`}>
          <button
            onClick={onClose}
            className={`flex-1 px-4 py-2 border border-gray-300 ${getThemeClasses.textSecondary} rounded-lg hover:bg-gray-100 transition-colors`}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Se dÃ©connecter
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== COMPOSANT PRINCIPAL ====================
const DashboardSuperviseur = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Ãtat des donnÃ©es
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalUtilisateurs: 0,
    producteursActifs: 0,
    collecteursActifs: 0,
    recycleursActifs: 0,
    missionsTotal: 0,
    missionsValidees: 0,
    demandesEnAttente: 0,
    revenusTotal: 0
  });
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [missionsRecentes, setMissionsRecentes] = useState([]);
  const [demandesRecycleurs, setDemandesRecycleurs] = useState([]);
  const [campagnes, setCampagnes] = useState([]);
  const [activitesRecentes, setActivitesRecentes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Formulaires
  const [utilisateurForm, setUtilisateurForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    role: '',
    statut: 'actif'
  });

  const [campagneForm, setCampagneForm] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    budget: '',
    statut: 'active'
  });

  // Ãtats UI
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('tous');
  const [filterStatut, setFilterStatut] = useState('tous');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCampagneModal, setShowCampagneModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const API_URL = 'https://ecobackend-zeds.vercel.app';
  const STORAGE_KEYS = {
    TOKEN: 'ecocollect_token',
    USER: 'ecocollect_user',
    ROLE: 'ecocollect_role'
  };

  // Initialisation
  useEffect(() => {
    console.log('ð¨ Initialisation du DashboardSuperviseur');
    initTheme(); // Initialiser le thÃ¨me
    checkSession();
    loadSuperviseurData();
  }, []);

  const checkSession = () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);

    if (!token || !userJson || role !== 'superviseur') {
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

  const loadSuperviseurData = async () => {
    setIsLoading(true);
    try {
      // Simuler des donnÃ©es pour le moment
      setStats({
        totalUtilisateurs: 1247,
        producteursActifs: 456,
        collecteursActifs: 234,
        recycleursActifs: 89,
        missionsTotal: 3421,
        missionsValidees: 3156,
        demandesEnAttente: 12,
        revenusTotal: 5420000
      });

      setUtilisateurs([
        {
          id: 1,
          nom: 'Jean Dupont',
          email: 'jean@example.com',
          telephone: '+237 123456789',
          role: 'producteur',
          statut: 'actif',
          dateInscription: '2024-01-10',
          missions: 45,
          points: 2300
        },
        {
          id: 2,
          nom: 'Marie Curie',
          email: 'marie@example.com',
          telephone: '+237 987654321',
          role: 'collecteur',
          statut: 'actif',
          dateInscription: '2024-01-12',
          missions: 67,
          points: 3400
        }
      ]);

      setMissionsRecentes([
        {
          id: 1,
          producteur: 'Jean Dupont',
          collecteur: 'Paul Martin',
          typeDechet: 'plastique_pet',
          quantite: 50,
          statut: 'validee',
          date: '2024-01-15',
          points: 500
        }
      ]);

      setDemandesRecycleurs([
        {
          id: 1,
          nom: 'RecyclePro SARL',
          email: 'contact@recyclepro.cm',
          telephone: '+237 234567890',
          description: 'SociÃ©tÃ© de recyclage de plastiques spÃ©cialisÃ©e dans le PET',
          statut: 'en_attente',
          dateDemande: '2024-01-14'
        }
      ]);

      setCampagnes([
        {
          id: 1,
          titre: 'Nettoyage de la plage de Kribi',
          description: 'Campagne de collecte de dÃ©chets plastiques sur les plages',
          dateDebut: '2024-02-01',
          dateFin: '2024-02-28',
          budget: 500000,
          statut: 'active',
          participants: 156
        }
      ]);

      setActivitesRecentes([
        {
          id: 1,
          type: 'inscription',
          utilisateur: 'Nouveau producteur',
          description: 'Jean Dupont a rejoint la plateforme',
          date: '2024-01-15 14:30'
        },
        {
          id: 2,
          type: 'mission',
          utilisateur: 'Mission validÃ©e',
          description: 'Collecte de 50kg de plastique PET',
          date: '2024-01-15 13:45'
        }
      ]);

    } catch (error) {
      console.error('Erreur chargement donnÃ©es:', error);
      setError('Erreur lors du chargement des donnÃ©es');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonctions utilitaires
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(amount);
  };

  const getRoleBadge = (role) => {
    const badges = {
      'producteur': { text: 'Producteur', color: 'green' },
      'collecteur': { text: 'Collecteur', color: 'blue' },
      'gestionnaire': { text: 'Gestionnaire', color: 'purple' },
      'recycleur': { text: 'Recycleur', color: 'orange' },
      'sponsor': { text: 'Sponsor', color: 'pink' }
    };
    return badges[role] || { text: 'Inconnu', color: 'gray' };
  };

  const getStatusBadge = (statut) => {
    const badges = {
      'actif': { text: 'Actif', color: 'green' },
      'inactif': { text: 'Inactif', color: 'red' },
      'suspendu': { text: 'Suspendu', color: 'orange' },
      'en_attente': { text: 'En attente', color: 'yellow' }
    };
    return badges[statut] || { text: 'Inconnu', color: 'gray' };
  };

  // Actions
  const validerDemandeRecycleur = async (demandeId) => {
    try {
      // Logique de validation
      setDemandesRecycleurs(prev => prev.filter(d => d.id !== demandeId));
      setStats(prev => ({
        ...prev,
        demandesEnAttente: prev.demandesEnAttente - 1,
        recycleursActifs: prev.recycleursActifs + 1
      }));
    } catch (error) {
      console.error('Erreur validation demande:', error);
    }
  };

  const rejeterDemandeRecycleur = async (demandeId) => {
    try {
      // Logique de rejet
      setDemandesRecycleurs(prev => prev.filter(d => d.id !== demandeId));
      setStats(prev => ({
        ...prev,
        demandesEnAttente: prev.demandesEnAttente - 1
      }));
    } catch (error) {
      console.error('Erreur rejet demande:', error);
    }
  };

  const creerUtilisateur = async (formData) => {
    try {
      // Logique de crÃ©ation utilisateur
      const nouvelUtilisateur = {
        id: Date.now(),
        ...formData,
        dateInscription: new Date().toISOString().split('T')[0],
        missions: 0,
        points: 0
      };
      setUtilisateurs(prev => [nouvelUtilisateur, ...prev]);
      setShowUserModal(false);
      setUtilisateurForm({ nom: '', email: '', telephone: '', role: '', statut: 'actif' });
    } catch (error) {
      console.error('Erreur crÃ©ation utilisateur:', error);
    }
  };

  const creerCampagne = async (formData) => {
    try {
      // Logique de crÃ©ation campagne
      const nouvelleCampagne = {
        id: Date.now(),
        ...formData,
        participants: 0
      };
      setCampagnes(prev => [nouvelleCampagne, ...prev]);
      setShowCampagneModal(false);
      setCampagneForm({ titre: '', description: '', dateDebut: '', dateFin: '', budget: '', statut: 'active' });
    } catch (error) {
      console.error('Erreur crÃ©ation campagne:', error);
    }
  };

  const supprimerUtilisateur = async (userId) => {
    try {
      // Logique de suppression
      setUtilisateurs(prev => prev.filter(u => u.id !== userId));
    } catch (error) {
      console.error('Erreur suppression utilisateur:', error);
    }
  };

  const refreshData = () => {
    loadSuperviseurData();
  };

  const getInitials = (name) => {
    if (!name) return 'S';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Composant Sidebar
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
      { id: 'utilisateurs', label: 'Utilisateurs', icon: Users, badge: utilisateurs.length },
      { id: 'missions', label: 'Missions', icon: Package },
      { id: 'demandes', label: 'Demandes recycleurs', icon: UserPlus, badge: demandesRecycleurs.length },
      { id: 'campagnes', label: 'Campagnes', icon: Target },
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
            <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(userData?.nom)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{userData?.nom || 'Superviseur'}</p>
                    <p className="text-emerald-100 text-sm">En ligne</p>
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
                            ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600' 
                            : `${getThemeClasses.textSecondary} hover:bg-gray-50 hover:text-gray-900`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
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
                onClick={() => setLogoutModalOpen(true)}
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
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials(userData?.nom)}
              </div>
              <div>
                <p className={`font-medium ${getThemeClasses.textCard}`}>{userData?.nom || 'Superviseur'}</p>
                <p className={`text-xs ${getThemeClasses.textMuted}`}>{userData?.email || 'superviseur@ecocollect.cm'}</p>
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
                          ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600' 
                          : `${getThemeClasses.textSecondary} hover:bg-gray-50 hover:text-gray-900`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
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
              onClick={() => setLogoutModalOpen(true)}
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
            <h1 className={`text-lg font-semibold ${getThemeClasses.textCard}`}>EcoCollect Supervision</h1>
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
              <h1 className={`text-xl font-semibold ${getThemeClasses.textCard}`}>EcoCollect Supervision</h1>
              <div className={`text-sm ${getThemeClasses.textMuted}`}>
                Tableau de bord superviseur
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
                <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl p-6 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">
                        Bienvenue, {userData?.nom?.split(' ')[0] || 'Superviseur'} !
                      </h2>
                      <p className="text-emerald-100">
                        Supervisez et gÃ©rez l'ensemble des opÃ©rations de la plateforme EcoCollect.
                      </p>
                    </div>
                    <div className="hidden lg:block flex-shrink-0">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[200px]">
                        <div className="text-sm text-emerald-100">
                          {stats.totalUtilisateurs} utilisateurs actifs
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
                    <span className="text-2xl font-bold text-gray-900">{stats.totalUtilisateurs}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Total utilisateurs</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>Tous rÃ´les confondus</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +15% ce mois
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.missionsTotal}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Missions totales</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>CrÃ©Ã©es depuis le dÃ©but</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {((stats.missionsValidees / stats.missionsTotal) * 100).toFixed(1)}% validÃ©es
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.demandesEnAttente}</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Demandes en attente</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>Validation requise</p>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{(stats.revenusTotal/1000000).toFixed(1)}M</span>
                  </div>
                  <p className={`${getThemeClasses.textSecondary} font-medium`}>Revenus totaux</p>
                  <p className={`text-sm ${getThemeClasses.textMuted} mt-1`}>FCFA</p>
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +22% vs trimestre dernier
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <Users className="w-5 h-5 text-blue-600" />
                      Utilisateurs par rÃ´le
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                            P
                          </div>
                          <span className={`text-sm ${getThemeClasses.textCard}`}>Producteurs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                          </div>
                          <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>{stats.producteursActifs}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                            C
                          </div>
                          <span className={`text-sm ${getThemeClasses.textCard}`}>Collecteurs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '35%'}}></div>
                          </div>
                          <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>{stats.collecteursActifs}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-medium text-orange-600">
                            R
                          </div>
                          <span className={`text-sm ${getThemeClasses.textCard}`}>Recycleurs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{width: '15%'}}></div>
                          </div>
                          <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>{stats.recycleursActifs}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard} flex items-center gap-2`}>
                      <Clock className="w-5 h-5 text-purple-600" />
                      ActivitÃ©s rÃ©centes
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {activitesRecentes.map(activite => (
                        <div key={activite.id} className={`p-3 ${getThemeClasses.bgSecondary} rounded-lg`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                              activite.type === 'inscription' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {activite.type === 'inscription' ? <UserPlus className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${getThemeClasses.textCard}`}>{activite.utilisateur}</p>
                              <p className={`text-xs ${getThemeClasses.textMuted}`}>{activite.description}</p>
                              <p className={`text-xs ${getThemeClasses.textMuted} mt-1`}>{formatDateTime(activite.date)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'utilisateurs' && (
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
                  <button
                    onClick={() => setShowUserModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {utilisateurs.map(utilisateur => {
                  const roleBadge = getRoleBadge(utilisateur.role);
                  const statusBadge = getStatusBadge(utilisateur.statut);
                  
                  return (
                    <div key={utilisateur.id} className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                              {getInitials(utilisateur.nom)}
                            </div>
                            <div>
                              <h3 className={`font-semibold ${getThemeClasses.textCard}`}>{utilisateur.nom}</h3>
                              <p className={`text-sm ${getThemeClasses.textMuted}`}>{utilisateur.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className={`${getThemeClasses.textMuted}`}>
                              <Phone className="w-4 h-4 inline mr-1" />
                              {utilisateur.telephone}
                            </span>
                            <span className={`${getThemeClasses.textMuted}`}>
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {formatDate(utilisateur.dateInscription)}
                            </span>
                            <span className="font-medium text-green-600">
                              <Award className="w-4 h-4 inline mr-1" />
                              {utilisateur.points} points
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${roleBadge.color}-100 text-${roleBadge.color}-800`}>
                            {roleBadge.text}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusBadge.color}-100 text-${statusBadge.color}-800`}>
                            {statusBadge.text}
                          </span>
                          <button
                            onClick={() => supprimerUtilisateur(utilisateur.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentPage === 'demandes' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} flex items-center gap-2`}>
                  <UserPlus className="w-6 h-6 text-orange-600" />
                  Demandes de recycleurs
                </h1>
                <div className="text-sm text-gray-600">
                  {demandesRecycleurs.length} demande(s) en attente
                </div>
              </div>

              <div className="grid gap-4">
                {demandesRecycleurs.map(demande => (
                  <div key={demande.id} className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-sm font-medium text-orange-600">
                            {getInitials(demande.nom)}
                          </div>
                          <div>
                            <h3 className={`font-semibold ${getThemeClasses.textCard}`}>{demande.nom}</h3>
                            <p className={`text-sm ${getThemeClasses.textMuted}`}>{demande.email}</p>
                          </div>
                        </div>
                        <p className={`text-sm ${getThemeClasses.textCard} mb-3`}>{demande.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`${getThemeClasses.textMuted}`}>
                            <Phone className="w-4 h-4 inline mr-1" />
                            {demande.telephone}
                          </span>
                          <span className={`${getThemeClasses.textMuted}`}>
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {formatDate(demande.dateDemande)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => validerDemandeRecycleur(demande.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Valider
                        </button>
                        <button
                          onClick={() => rejeterDemandeRecycleur(demande.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Rejeter
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentPage === 'campagnes' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${getThemeClasses.textCard} flex items-center gap-2`}>
                  <Target className="w-6 h-6 text-purple-600" />
                  Campagnes de collecte
                </h1>
                <button
                  onClick={() => setShowCampagneModal(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nouvelle campagne
                </button>
              </div>

              <div className="grid gap-4">
                {campagnes.map(campagne => (
                  <div key={campagne.id} className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${getThemeClasses.textCard} mb-2`}>{campagne.titre}</h3>
                        <p className={`text-sm ${getThemeClasses.textMuted} mb-3`}>{campagne.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`${getThemeClasses.textMuted}`}>
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {formatDate(campagne.dateDebut)} - {formatDate(campagne.dateFin)}
                          </span>
                          <span className="font-medium text-purple-600">
                            <Users className="w-4 h-4 inline mr-1" />
                            {campagne.participants} participants
                          </span>
                          <span className="font-medium text-green-600">
                            <Wallet className="w-4 h-4 inline mr-1" />
                            {formatCurrency(campagne.budget)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {campagne.statut}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard}`}>Statistiques par rÃ´le</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${getThemeClasses.textCard}`}>Producteurs</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                          </div>
                          <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>{stats.producteursActifs}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${getThemeClasses.textCard}`}>Collecteurs</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '35%'}}></div>
                          </div>
                          <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>{stats.collecteursActifs}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${getThemeClasses.textCard}`}>Recycleurs</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{width: '15%'}}></div>
                          </div>
                          <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>{stats.recycleursActifs}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border}`}>
                  <div className={`p-6 border-b ${getThemeClasses.border}`}>
                    <h3 className={`text-lg font-semibold ${getThemeClasses.textCard}`}>Performance mensuelle</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {['Janvier', 'FÃ©vrier', 'Mars', 'Avril', 'Mai', 'Juin'].map((mois, index) => (
                        <div key={mois} className="flex items-center justify-between">
                          <span className={`text-sm ${getThemeClasses.textCard}`}>{mois}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-emerald-500 h-2 rounded-full" 
                                style={{width: `${Math.random() * 60 + 40}%`}}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${getThemeClasses.textCard}`}>
                              {Math.floor(Math.random() * 200 + 100)} missions
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
                <User className="w-6 h-6 text-emerald-600" />
                Mon profil
              </h1>

              <div className={`${getThemeClasses.card} rounded-xl shadow-sm ${getThemeClasses.border} p-6`}>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(userData?.nom)}
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${getThemeClasses.textCard}`}>{userData?.nom || 'Superviseur'}</h2>
                    <p className={`${getThemeClasses.textMuted}`}>{userData?.email || 'superviseur@ecocollect.cm'}</p>
                    <p className={`${getThemeClasses.textMuted}`}>{userData?.telephone || '+237 000 000 000'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${getThemeClasses.textSecondary} mb-2`}>RÃ´le</label>
                    <input
                      type="text"
                      value="Superviseur systÃ¨me"
                      className={`w-full px-3 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getThemeClasses.textSecondary} mb-2`}>Statut</label>
                    <input
                      type="text"
                      value="Actif"
                      className={`w-full px-3 py-2 ${getThemeClasses.input} rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal de dÃ©connexion */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => {
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          localStorage.removeItem(STORAGE_KEYS.ROLE);
          navigate('/login');
        }}
      />
    </div>
  );
};

export default DashboardSuperviseur;
