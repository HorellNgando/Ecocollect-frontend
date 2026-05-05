import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Layouts/LayoutDashboard';
import { 
  FiPackage, FiTrendingUp, FiFileText, FiMap, FiPlus, 
  FiClock, FiCheckCircle, FiAlertCircle, FiBarChart2,
  FiUsers, FiDollarSign, FiTruck, FiRefreshCw, FiChevronRight,
  FiEye, FiDownload, FiCalendar, FiActivity, FiTarget,
  FiAward, FiShoppingBag, FiArchive, FiHome
} from 'react-icons/fi';
import { FaRecycle, FaLeaf, FaChartLine, FaRegBuilding } from 'react-icons/fa';

const RecycleurDashboard = () => {
  const [stats, setStats] = useState({
    totalDemandes: 0,
    demandesEnAttente: 0,
    demandesValidees: 0,
    totalStock: 0,
    recentDeclarations: 0,
    pointsCollecte: 8,
    tauxRecyclage: 92,
    gainsMensuels: 1250000,
    collectesRealisees: 45
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setStats({
        totalDemandes: 12,
        demandesEnAttente: 3,
        demandesValidees: 9,
        totalStock: 2500,
        recentDeclarations: 5,
        pointsCollecte: 8,
        tauxRecyclage: 92,
        gainsMensuels: 1250000,
        collectesRealisees: 45
      });

      setRecentActivities([
        { id: 1, type: 'demande', description: 'Nouvelle demande de plastique PET', time: 'Il y a 2h', status: 'pending', details: 'Quantité: 500 kg' },
        { id: 2, type: 'validation', description: 'Demande validée pour collecte', time: 'Il y a 4h', status: 'success', details: 'Par: Collecteur Karim' },
        { id: 3, type: 'declaration', description: 'Déclaration de recyclage soumise', time: 'Il y a 6h', status: 'success', details: 'Type: Papier/Carton' },
        { id: 4, type: 'stock', description: 'Nouveau stock disponible', time: 'Il y a 8h', status: 'info', details: 'Plastique: 200 kg' },
        { id: 5, type: 'collecte', description: 'Collecte programmée', time: 'Il y a 12h', status: 'warning', details: 'Demain 09:00' },
        { id: 6, type: 'paiement', description: 'Paiement reçu', time: 'Il y a 1 jour', status: 'success', details: '125 000 FCFA' }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'demande': return FiPlus;
      case 'validation': return FiCheckCircle;
      case 'declaration': return FiFileText;
      case 'stock': return FiPackage;
      case 'collecte': return FiTruck;
      case 'paiement': return FiDollarSign;
      default: return FiClock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-100 border-red-200';
      case 'pending': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'info': return 'text-purple-600 bg-purple-100 border-purple-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      'plastique': '🥤',
      'papier': '📦',
      'verre': '🥃',
      'metal': '🥫',
      'organique': '🌱'
    };
    return icons[type] || '📦';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  if (loading) {
    return (
      <DashboardLayout title="Tableau de bord" user={{ type: 'recycleur' }}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaRecycle className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement du tableau de bord...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Tableau de bord" user={{ type: 'recycleur' }}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                <FaRecycle className="w-6 h-6 md:w-8 md:h-8" />
                Tableau de bord recycleur
              </h1>
              <p className="text-emerald-100 text-sm md:text-base">
                Gérez vos demandes, stocks et activités de recyclage
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button className="inline-flex items-center gap-2 bg-white/20 text-white px-3 md:px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm text-sm md:text-base">
                <FiDownload className="w-4 h-4" />
                Exporter
              </button>
              <button className="inline-flex items-center gap-2 bg-white text-emerald-700 px-4 md:px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg text-sm md:text-base">
                <FiPlus className="w-4 h-4 md:w-5 md:h-5" />
                Nouvelle demande
              </button>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Total demandes</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.totalDemandes}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    +12% ce mois
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl ml-3">
                <FiTrendingUp className="text-blue-600 text-xl md:text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">En attente</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.demandesEnAttente}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                    À traiter
                  </span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl ml-3">
                <FiClock className="text-yellow-600 text-xl md:text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Validées</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.demandesValidees}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Confirmées
                  </span>
                </div>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl ml-3">
                <FiCheckCircle className="text-emerald-600 text-xl md:text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Stock total (kg)</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.totalStock}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                    Disponible
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl ml-3">
                <FiPackage className="text-purple-600 text-xl md:text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques supplémentaires */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-600 mb-1">Points de collecte</p>
                <p className="text-xl font-bold text-emerald-700">{stats.pointsCollecte}</p>
              </div>
              <FiHome className="w-6 h-6 text-emerald-500 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 mb-1">Taux recyclage</p>
                <p className="text-xl font-bold text-blue-700">{stats.tauxRecyclage}%</p>
              </div>
              <FaLeaf className="w-6 h-6 text-blue-500 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-600 mb-1">Gains mensuels</p>
                <p className="text-xl font-bold text-green-700">{formatCurrency(stats.gainsMensuels)}</p>
              </div>
              <FiDollarSign className="w-6 h-6 text-green-500 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-orange-600 mb-1">Collectes réalisées</p>
                <p className="text-xl font-bold text-orange-700">{stats.collectesRealisees}</p>
              </div>
              <FiTruck className="w-6 h-6 text-orange-500 opacity-80" />
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiActivity className="text-emerald-600" />
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <button className="flex items-center p-3 md:p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all hover:shadow-md group border border-emerald-200">
              <div className="p-2 bg-emerald-200 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                <FiPlus className="text-emerald-700 text-lg md:text-xl" />
              </div>
              <div className="text-left">
                <span className="text-emerald-900 font-medium text-sm md:text-base block">Nouvelle demande</span>
                <span className="text-xs text-emerald-600">Créer une demande de collecte</span>
              </div>
            </button>
            
            <button className="flex items-center p-3 md:p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all hover:shadow-md group border border-blue-200">
              <div className="p-2 bg-blue-200 rounded-lg mr-3 group-hover:translate-y-1 transition-transform">
                <FiFileText className="text-blue-700 text-lg md:text-xl" />
              </div>
              <div className="text-left">
                <span className="text-blue-900 font-medium text-sm md:text-base block">Déclarer recyclage</span>
                <span className="text-xs text-blue-600">Soumettre une déclaration</span>
              </div>
            </button>
            
            <button className="flex items-center p-3 md:p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all hover:shadow-md group border border-purple-200">
              <div className="p-2 bg-purple-200 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                <FiPackage className="text-purple-700 text-lg md:text-xl" />
              </div>
              <div className="text-left">
                <span className="text-purple-900 font-medium text-sm md:text-base block">Voir les stocks</span>
                <span className="text-xs text-purple-600">Consulter l'état des stocks</span>
              </div>
            </button>
            
            <button className="flex items-center p-3 md:p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all hover:shadow-md group border border-orange-200">
              <div className="p-2 bg-orange-200 rounded-lg mr-3 group-hover:translate-x-1 transition-transform">
                <FiMap className="text-orange-700 text-lg md:text-xl" />
              </div>
              <div className="text-left">
                <span className="text-orange-900 font-medium text-sm md:text-base block">Mon stock</span>
                <span className="text-xs text-orange-600">Gérer l'emplacement</span>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activités récentes - prend 2 colonnes sur grand écran */}
          <div className="lg:col-span-2 bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FiClock className="text-emerald-600" />
                Activités récentes
              </h2>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                Voir tout <FiChevronRight />
              </button>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className={`p-2 rounded-xl mr-3 md:mr-4 ${getStatusColor(activity.status)} flex-shrink-0 border`}>
                        <Icon className="text-lg md:text-xl" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-gray-900 font-medium text-sm md:text-base truncate">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs md:text-sm text-gray-500">{activity.time}</p>
                          {activity.details && (
                            <>
                              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                              <p className="text-xs md:text-sm text-gray-600">{activity.details}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <FiEye className="text-gray-400 hover:text-emerald-600 cursor-pointer flex-shrink-0 ml-2" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance et stocks */}
          <div className="space-y-6">
            {/* Graphique de performance */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiBarChart2 className="text-emerald-600" />
                Performance mensuelle
              </h2>
              <div className="h-48 md:h-64 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200">
                <div className="text-center p-4">
                  <FaChartLine className="text-emerald-400 text-3xl md:text-4xl mx-auto mb-2" />
                  <p className="text-emerald-700 font-medium text-sm md:text-base">+24% ce mois</p>
                  <p className="text-xs md:text-sm text-emerald-500 mt-1">Progression constante</p>
                </div>
              </div>
            </div>

            {/* État des stocks */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiArchive className="text-emerald-600" />
                État des stocks
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getTypeIcon('plastique')}</span>
                    <span className="font-medium">Plastique</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-semibold">850 kg</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">Bon</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getTypeIcon('papier')}</span>
                    <span className="font-medium">Papier/Carton</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-semibold">1200 kg</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">Bon</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getTypeIcon('verre')}</span>
                    <span className="font-medium">Verre</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600 font-semibold">350 kg</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Moyen</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getTypeIcon('metal')}</span>
                    <span className="font-medium">Métal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-semibold">100 kg</span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Critique</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alertes et notifications */}
        {stats.demandesEnAttente > 0 && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Demandes en attente</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Vous avez {stats.demandesEnAttente} demande(s) en attente de traitement.
                </p>
              </div>
              <button className="ml-auto px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                Voir les demandes
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RecycleurDashboard;