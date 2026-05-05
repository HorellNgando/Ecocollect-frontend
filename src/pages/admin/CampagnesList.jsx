import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiEdit2, FiPlus, FiEye, FiCalendar, FiActivity, FiUser, 
  FiMapPin, FiCheckCircle, FiXCircle, FiClock, FiTarget,
  FiSearch, FiFilter, FiDownload, FiRefreshCw, FiChevronLeft,
  FiChevronRight, FiMoreVertical, FiUsers, FiPackage, FiTrendingUp,
  FiAward, FiDollarSign, FiMap, FiInfo
} from 'react-icons/fi';
import { FaRecycle, FaLeaf, FaHandHoldingHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminLayout from '../../components/AdminLayout';

const CampagnesList = () => {
  const [campagnes, setCampagnes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterZone, setFilterZone] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedCampagne, setSelectedCampagne] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('ecocollect_user')));
    loadCampagnes();
  }, []);

  const loadCampagnes = async () => {
    try {
      setLoading(true);
      const response = await adminService.getCampagnes();
      
      // Enrichir avec des données supplémentaires pour la démo
      const enrichedData = (response.campagnes || []).map((campagne, index) => ({
        ...campagne,
        progression: Math.floor(Math.random() * 100),
        collecte_actuelle: Math.floor(Math.random() * 8000) + 2000,
        objectif_total: 10000,
        participants: Math.floor(Math.random() * 50) + 10,
        points_collecte: Math.floor(Math.random() * 15) + 5,
        budget: Math.floor(Math.random() * 5000000) + 1000000,
        responsable: ['Karim Diallo', 'Aïsha Ndiaye', 'Omar Fall', 'Fatima Ba'][index % 4],
        types_dechets: [
          ['Plastique', 'Papier'],
          ['Verre', 'Métal'],
          ['Organique', 'Plastique'],
          ['Papier', 'Carton']
        ][index % 4],
        zones_intervention: campagne.zones_intervention || [
          ['Dakar', 'Pikine'],
          ['Guédiawaye', 'Rufisque'],
          ['Thiès', 'Mbour'],
          ['Saint-Louis', 'Louga']
        ][index % 4]
      }));
      
      setCampagnes(enrichedData);
    } catch (error) {
      toast.error('Erreur lors du chargement des campagnes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'en_cours': { 
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        label: 'En cours', 
        icon: FiActivity,
        bgLight: 'bg-blue-50'
      },
      'terminee': { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        label: 'Terminée', 
        icon: FiCheckCircle,
        bgLight: 'bg-green-50'
      },
      'planifiee': { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        label: 'Planifiée', 
        icon: FiCalendar,
        bgLight: 'bg-yellow-50'
      },
      'annulee': { 
        color: 'bg-red-100 text-red-800 border-red-200', 
        label: 'Annulée', 
        icon: FiXCircle,
        bgLight: 'bg-red-50'
      }
    };
    
    const config = statusConfig[status] || statusConfig['planifiee'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getProgressColor = (progression) => {
    if (progression >= 75) return 'bg-green-500';
    if (progression >= 50) return 'bg-blue-500';
    if (progression >= 25) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getZoneColor = (zone) => {
    const colors = {
      'Dakar': 'bg-blue-100 text-blue-800',
      'Pikine': 'bg-green-100 text-green-800',
      'Guédiawaye': 'bg-purple-100 text-purple-800',
      'Rufisque': 'bg-orange-100 text-orange-800',
      'Thiès': 'bg-pink-100 text-pink-800'
    };
    return colors[zone] || 'bg-gray-100 text-gray-800';
  };

  // Extraire les zones uniques
  const zones = [...new Set(campagnes.flatMap(c => c.zones_intervention || []))];

  const filteredCampagnes = campagnes.filter(campagne => {
    const matchesSearch = 
      (campagne.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (campagne.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (campagne.responsable?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || campagne.statut === filterStatus;
    const matchesZone = filterZone === 'all' || 
      (campagne.zones_intervention && campagne.zones_intervention.includes(filterZone));
    
    return matchesSearch && matchesStatus && matchesZone;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCampagnes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCampagnes.length / itemsPerPage);

  // Statistiques enrichies
  const stats = {
    total: campagnes.length,
    enCours: campagnes.filter(c => c.statut === 'en_cours').length,
    terminees: campagnes.filter(c => c.statut === 'terminee').length,
    planifiees: campagnes.filter(c => c.statut === 'planifiee').length,
    totalCollecte: campagnes.reduce((sum, c) => sum + (c.collecte_actuelle || 0), 0),
    totalObjectif: campagnes.reduce((sum, c) => sum + (c.objectif_total || 0), 0),
    totalParticipants: campagnes.reduce((sum, c) => sum + (c.participants || 0), 0)
  };

  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  };

  if (loading) {
    return (
      <AdminLayout title="Campagnes">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaRecycle className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des campagnes...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Campagnes">
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-emerald-600 from-purple-600 to-purple-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaRecycle className="w-8 h-8" />
                Campagnes de collecte
              </h1>
              <p className="text-purple-100">Gérez et suivez toutes les campagnes de recyclage</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              
              <Link 
                to="/admin/campagnes/nouveau" 
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg"
              >
                <FiPlus className="w-5 h-5" />
                Nouvelle campagne
              </Link>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques modernes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total campagnes</p>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiCalendar className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-1">Campagnes</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">En cours</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiActivity className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.enCours}</p>
            <p className="text-xs text-gray-400 mt-1">Actives</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Terminées</p>
              <div className="p-2 bg-green-100 rounded-lg">
                <FiCheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.terminees}</p>
            <p className="text-xs text-gray-400 mt-1">Campagnes</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Collecté</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiPackage className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.totalCollecte} kg</p>
            <p className="text-xs text-gray-400 mt-1">Déchets</p>
          </div>

          
        </div>

        {/* Barre de filtres */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, description ou responsable..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="planifiee">Planifiées</option>
                  <option value="en_cours">En cours</option>
                  <option value="terminee">Terminées</option>
                  <option value="annulee">Annulées</option>
                </select>
              </div>

              <div className="relative">
                <FiMap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">Toutes les zones</option>
                  {zones.map((zone, index) => (
                    <option key={index} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={loadCampagnes}
                className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                title="Actualiser"
              >
                <FiRefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Tags de recherche actifs */}
          {(searchTerm || filterStatus !== 'all' || filterZone !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Filtres actifs:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                  Recherche: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-purple-900">
                    <FiXCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                  Statut: {filterStatus === 'en_cours' ? 'En cours' : 
                          filterStatus === 'terminee' ? 'Terminées' : 
                          filterStatus === 'planifiee' ? 'Planifiées' : 'Annulées'}
                  <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-purple-900">
                    <FiXCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterZone !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                  Zone: {filterZone}
                  <button onClick={() => setFilterZone('all')} className="ml-1 hover:text-purple-900">
                    <FiXCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tableau des campagnes */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Campagne</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Période</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Zones</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Types déchets</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progression</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((campagne) => (
                  <tr key={campagne.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                          <FaRecycle className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900">{campagne.nom}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <FiUser className="w-3 h-3" />
                            {campagne.responsable}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FiCalendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>Début: {new Date(campagne.date_debut).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FiClock className="w-3.5 h-3.5 text-gray-400" />
                          <span>Fin: {new Date(campagne.date_fin).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {campagne.zones_intervention?.map((zone, idx) => (
                          <span key={idx} className={`px-2 py-1 text-xs font-medium rounded-lg ${getZoneColor(zone)}`}>
                            {zone}
                          </span>
                        ))}
                        {!campagne.zones_intervention?.length && (
                          <span className="text-xs text-gray-400">National</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {campagne.types_dechets?.map((type, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700">
                            {type}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">{campagne.collecte_actuelle} kg</span>
                          <span className="font-medium text-purple-600">{campagne.progression}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getProgressColor(campagne.progression)}`}
                            style={{ width: `${campagne.progression}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <FiTarget className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{campagne.objectif_total} kg</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(campagne.statut)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedCampagne(campagne);
                            setShowModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <Link 
                          to={`/admin/campagnes/${campagne.id}/edit`} 
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCampagnes.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <FaRecycle className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucune campagne trouvée</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredCampagnes.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredCampagnes.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredCampagnes.length}</span> campagnes
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 bg-white-50 text-emerald-700 rounded-lg font-medium">
                  Page {currentPage} sur {totalPages || 1}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal de détails amélioré */}
        {showModal && selectedCampagne && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* En-tête du modal */}
              <div className="bg-emerald-600 from-purple-600 to-purple-700 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <FaRecycle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedCampagne.nom}</h3>
                     
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <FiXCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Corps du modal */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    <FiInfo className="w-4 h-4" /> Description
                  </h4>
                  <p className="text-gray-700">{selectedCampagne.description || 'Aucune description disponible.'}</p>
                </div>

                {/* Grille d'informations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Période */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" /> Période
                    </h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Début:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(selectedCampagne.date_debut).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Fin:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(selectedCampagne.date_fin).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <span>{getStatusBadge(selectedCampagne.statut)}</span>
                      </p>
                    </div>
                  </div>

                  {/* Responsable et zones */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiUser className="w-4 h-4" /> Responsable
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-900 font-medium">{selectedCampagne.responsable}</p>
                      <div className="pt-2">
                        <p className="text-xs text-gray-400 mb-1">Zones d'intervention</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedCampagne.zones_intervention?.map((zone, idx) => (
                            <span key={idx} className={`px-2 py-1 text-xs font-medium rounded-lg ${getZoneColor(zone)}`}>
                              {zone}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Types de déchets */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    <FiPackage className="w-4 h-4" /> Types de déchets
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCampagne.types_dechets?.map((type, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Statistiques de collecte */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-sm text-purple-600 mb-1">Collecté</p>
                    <p className="text-2xl font-bold text-purple-700">{selectedCampagne.collecte_actuelle} kg</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-blue-600 mb-1">Objectif</p>
                    <p className="text-2xl font-bold text-blue-700">{selectedCampagne.objectif_total} kg</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl">
                    <p className="text-sm text-amber-600 mb-1">Progression</p>
                    <p className="text-2xl font-bold text-amber-700">{selectedCampagne.progression}%</p>
                  </div>
                </div>

                {/* Autres statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 
                  
                </div>

                {/* Dates importantes */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Date de création</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedCampagne.created_at || selectedCampagne.date_debut).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Dernière mise à jour</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedCampagne.updated_at || selectedCampagne.date_fin).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                  <Link
                    to={`/admin/campagnes/${selectedCampagne.id}/edit`}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-bleu-400 transition-colors flex items-center gap-2"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Modifier
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CampagnesList;