


import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, Eye, Users, Mail, Phone, 
  MapPin, Calendar, Star, Map, TrendingUp, Award, UserCheck, 
  UserX, Truck, Package, Clock, ChevronLeft, ChevronRight, 
  MoreVertical, XCircle, RefreshCw, Download, BarChart3,
  Activity, CheckCircle, AlertCircle, Shield, Home, DollarSign
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';

const CollecteursList = () => {
  const [collecteurs, setCollecteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterZone, setFilterZone] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedCollecteur, setSelectedCollecteur] = useState(null);
  const [statsCollecteur, setStatsCollecteur] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    loadCollecteurs();
  }, []);

  const loadCollecteurs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getCollecteurs();
      console.log('📦 Données collecteurs reçues:', data);
      
      // Extraire les collecteurs de la réponse
      const collecteursList = data.collecteurs || data || [];
      
      // Log pour vérifier les zones de chaque collecteur
      collecteursList.forEach(c => {
        console.log(`Collecteur ${c.nom_complet}: zone = "${c.zone_intervention_nom}", gains = ${c.gains_total}`);
      });
      
      setCollecteurs(collecteursList);
      
    } catch (error) {
      console.error('Erreur chargement collecteurs:', error);
      toast.error('Erreur lors du chargement des collecteurs');
    } finally {
      setLoading(false);
    }
  };

  const handleVoirStats = async (collecteur) => {
    setSelectedCollecteur(collecteur);
    setStatsCollecteur(null);
    setShowModal(true);
    try {
      const data = await adminService.getCollecteurStats(collecteur.id);
      setStatsCollecteur(data);
    } catch (error) {
      console.error('Erreur chargement stats collecteur:', error);
      toast.error('Erreur lors du chargement des statistiques');
    }
  };

  // Fonction pour obtenir la zone d'un collecteur (gère les valeurs null/undefined)
  const getZoneIntervention = (collecteur) => {
    // Priorité à zone_intervention_nom
    if (collecteur.zone_intervention_nom && collecteur.zone_intervention_nom.trim() !== '') {
      return collecteur.zone_intervention_nom.trim();
    }
    // Fallback sur commune si disponible
    if (collecteur.commune && collecteur.commune.trim() !== '') {
      return collecteur.commune.trim();
    }
    // Fallback sur quartier si disponible
    if (collecteur.quartier && collecteur.quartier.trim() !== '') {
      return collecteur.quartier.trim();
    }
    return 'Non spécifié';
  };

  // Extraire les zones uniques depuis zone_intervention_nom
  const zones = [...new Set(collecteurs
    .map(c => getZoneIntervention(c))
    .filter(zone => zone && zone !== 'Non spécifié')
  )];

  const filteredCollecteurs = collecteurs.filter(collecteur => {
    const zoneIntervention = getZoneIntervention(collecteur);
    
    const matchesSearch = 
      (collecteur.nom_complet?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (collecteur.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (collecteur.telephone || '').includes(searchTerm) ||
      zoneIntervention.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || collecteur.statut === filterStatus;
    const matchesZone = filterZone === 'all' || zoneIntervention === filterZone;
    
    return matchesSearch && matchesStatus && matchesZone;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollecteurs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCollecteurs.length / itemsPerPage);

  // Fonction pour obtenir les gains d'un collecteur
  const getCollecteurGains = (collecteur) => {
    const gains = collecteur.gains_total || collecteur.gains || collecteur.total_gains || 0;
    return typeof gains === 'number' ? gains : parseFloat(gains) || 0;
  };

  // Calcul des statistiques globales
  const stats = {
    total: collecteurs.length,
    actifs: collecteurs.filter(c => c.statut === 'actif').length,
    enAttente: collecteurs.filter(c => c.statut === 'en_attente').length,
    inactifs: collecteurs.filter(c => c.statut === 'inactif').length,
    totalPoints: collecteurs.reduce((sum, c) => {
      const points = c.points_total || c.points || 0;
      return sum + (typeof points === 'number' ? points : parseFloat(points) || 0);
    }, 0),
    totalGains: collecteurs.reduce((sum, c) => sum + getCollecteurGains(c), 0)
  };

  // Fonction pour formater les gains
  const formatGains = (gains) => {
    const value = gains || 0;
    return value.toLocaleString();
  };

  const getStatusBadge = (statut) => {
    const colors = {
      actif: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      en_attente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      inactif: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    const color = colors[statut] || 'bg-gray-100 text-gray-800';
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          statut === 'actif' ? 'bg-emerald-500' : 
          statut === 'en_attente' ? 'bg-yellow-500' : 'bg-gray-400'
        }`}></span>
        {statut === 'actif' ? 'Actif' : statut === 'en_attente' ? 'En attente' : 'Inactif'}
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout title="Collecteurs">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Truck className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des collecteurs...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Collecteurs">
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Truck className="w-8 h-8" />
                Collecteurs
              </h1>
              <p className="text-emerald-100">Gérez les collecteurs et suivez leurs performances sur le terrain</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                <Download className="w-4 h-4" />
                Exporter
              </button>
              <button className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
                <Plus className="w-5 h-5" />
                Nouveau collecteur
              </button>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-1">Collecteurs</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Actifs</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <UserCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.actifs}</p>
            <p className="text-xs text-gray-400 mt-1">{Math.round((stats.actifs/stats.total)*100) || 0}% du total</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">En attente</p>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.enAttente}</p>
            <p className="text-xs text-gray-400 mt-1">Validation</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Inactifs</p>
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-red-600">{stats.inactifs}</p>
            <p className="text-xs text-gray-400 mt-1">Hors service</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Gains totaux</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.totalGains.toLocaleString()} F</p>
            <p className="text-xs text-gray-400 mt-1">FCFA</p>
          </div>
        </div>

        {/* Barre de filtres */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone ou zone..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="actif">Actifs</option>
                  <option value="en_attente">En attente</option>
                  <option value="inactif">Inactifs</option>
                </select>
              </div>

              <div className="relative">
                <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                >
                  <option value="all">Toutes les zones</option>
                  {zones.map((zone, index) => (
                    <option key={index} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={loadCollecteurs}
                className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Tags de recherche actifs */}
          {(searchTerm || filterStatus !== 'all' || filterZone !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Filtres actifs:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Recherche: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-900">
                    <XCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Statut: {filterStatus === 'actif' ? 'Actifs' : filterStatus === 'en_attente' ? 'En attente' : 'Inactifs'}
                  <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-emerald-900">
                    <XCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterZone !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Zone: {filterZone}
                  <button onClick={() => setFilterZone('all')} className="ml-1 hover:text-emerald-900">
                    <XCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Collecteur</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gains (FCFA)</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Inscription</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((collecteur) => {
                  const zoneValue = getZoneIntervention(collecteur);
                  return (
                    <tr key={collecteur.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                            <Truck className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-semibold text-gray-900">{collecteur.nom_complet}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {zoneValue}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs truncate max-w-[150px]">{collecteur.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs">{collecteur.telephone}</span>
                          </div>
                        </div>
                      </td>
                     
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-800 border border-gray-200">
                          {collecteur.type_collecteur || 'Indépendant'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(collecteur.statut)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium text-gray-900">
                            {formatGains(getCollecteurGains(collecteur))}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {new Date(collecteur.cree_le).toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleVoirStats(collecteur)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir statistiques"
                          >
                            <BarChart3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredCollecteurs.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <Truck className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucun collecteur trouvé</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredCollecteurs.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredCollecteurs.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredCollecteurs.length}</span> collecteurs
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                  Page {currentPage} sur {totalPages || 1}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal de statistiques collecteur */}
        {showModal && selectedCollecteur && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Truck className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedCollecteur.nom_complet}</h3>
                      <p className="text-emerald-100 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {getZoneIntervention(selectedCollecteur)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {statsCollecteur ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl border border-emerald-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-emerald-600 font-medium">Total collecté</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{statsCollecteur.total_kg || 0} kg</p>
                          </div>
                          <div className="p-3 bg-emerald-100 rounded-lg">
                            <Package className="w-6 h-6 text-emerald-600" />
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-600 font-medium">Missions</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{statsCollecteur.nb_missions || 0}</p>
                          </div>
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-white p-5 rounded-xl border border-yellow-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-yellow-600 font-medium">Gains totaux</p>
                          <p className="text-3xl font-bold text-yellow-600 mt-1">
                            {(statsCollecteur.gains_total || 0).toLocaleString()} FCFA
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                          <DollarSign className="w-6 h-6 text-yellow-600" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 flex items-center gap-2">
                        <Package className="w-4 h-4 text-emerald-600" /> Répartition par type de déchet
                      </h4>
                      {statsCollecteur.par_type && statsCollecteur.par_type.length > 0 ? (
                        <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                          {statsCollecteur.par_type.map(t => (
                            <div key={t.type_dechet} className="p-3 flex justify-between items-center hover:bg-white transition-colors">
                              <span className="text-sm font-medium text-gray-800">{t.type_dechet}</span>
                              <span className="text-sm font-semibold text-emerald-600">{t.kg} kg</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Aucune donnée disponible</p>
                      )}
                    </div>

                    {statsCollecteur.dernieres_missions && statsCollecteur.dernieres_missions.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-600" /> Dernières missions
                        </h4>
                        <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                          {statsCollecteur.dernieres_missions.slice(0, 5).map(m => (
                            <div key={m.id} className="p-3 flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium text-gray-800">{m.type_dechet}</p>
                                <p className="text-xs text-gray-500">{new Date(m.date_mission).toLocaleDateString('fr-FR')}</p>
                              </div>
                              <span className="text-sm font-semibold text-emerald-600">{m.poids} kg</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex justify-center py-12">
                    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CollecteursList;