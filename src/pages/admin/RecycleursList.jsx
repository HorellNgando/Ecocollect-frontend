import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiEdit2, FiPlus, FiEye, FiPackage, FiMail, FiPhone, FiMapPin, 
  FiCalendar, FiCheckCircle, FiXCircle, FiSearch, FiFilter,
  FiDownload, FiRefreshCw, FiChevronLeft, FiChevronRight,
  FiMoreVertical, FiAward, FiStar, FiTruck, FiActivity,
  FiBarChart2, FiTrendingUp, FiUsers, FiClock
} from 'react-icons/fi';
import { FaRecycle, FaBuilding, FaRegBuilding } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminLayout from '../../components/AdminLayout';

const RecycleursList = () => {
  const [recycleurs, setRecycleurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterZone, setFilterZone] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedRecycleur, setSelectedRecycleur] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('ecocollect_user')));
    loadRecycleurs();
  }, []);

  const loadRecycleurs = async () => {
    try {
      setLoading(true);
      const response = await adminService.getRecycleurs();
      // Enrichir avec des données supplémentaires pour la démo
      const enrichedData = (response.recycleurs || []).map((r, index) => ({
        ...r,
        zone: ['Dakar', 'Pikine', 'Guédiawaye', 'Rufisque', 'Thiès'][index % 5],
        certifications: index % 2 === 0 ? ['ISO 14001', 'Qualité'] : ['ISO 9001'],
        capacite_traitement: Math.floor(Math.random() * 1000) + 500,
        dechets_traites: Math.floor(Math.random() * 800) + 200,
        taux_recyclage: Math.floor(Math.random() * 30) + 70,
        dernier_controle: '2024-03-' + (10 + index),
        types_dechets: ['plastique', 'papier', 'métal'].slice(0, Math.floor(Math.random() * 3) + 1)
      }));
      setRecycleurs(enrichedData);
    } catch (error) {
      toast.error('Erreur lors du chargement des recycleurs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    return status === 'actif' 
      ? <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
          Actif
        </span>
      : <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
          Inactif
        </span>;
  };

  const getPerformanceColor = (taux) => {
    if (taux >= 90) return 'text-emerald-600';
    if (taux >= 80) return 'text-blue-600';
    if (taux >= 70) return 'text-yellow-600';
    return 'text-red-600';
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
  const zones = [...new Set(recycleurs.map(r => r.zone).filter(Boolean))];

  const filteredRecycleurs = recycleurs.filter(recycleur => {
    const matchesSearch = 
      (recycleur.nom_entreprise?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (recycleur.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (recycleur.telephone || '').includes(searchTerm) ||
      (recycleur.zone?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || recycleur.statut === filterStatus;
    const matchesZone = filterZone === 'all' || recycleur.zone === filterZone;
    
    return matchesSearch && matchesStatus && matchesZone;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecycleurs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecycleurs.length / itemsPerPage);

  // Statistiques enrichies
  const stats = {
    total: recycleurs.length,
    actifs: recycleurs.filter(r => r.statut === 'actif').length,
    inactifs: recycleurs.filter(r => r.statut !== 'actif').length,
    capacite_totale: recycleurs.reduce((sum, r) => sum + (r.capacite_traitement || 0), 0),
    dechets_traites: recycleurs.reduce((sum, r) => sum + (r.dechets_traites || 0), 0),
    taux_moyen: Math.round(recycleurs.reduce((sum, r) => sum + (r.taux_recyclage || 0), 0) / recycleurs.length) || 0
  };

  if (loading) {
    return (
      <AdminLayout title="Recycleurs">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaRecycle className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des recycleurs...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Recycleurs">
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaRecycle className="w-8 h-8" />
                Recycleurs
              </h1>
              <p className="text-emerald-100">Gérez les entreprises de recyclage et suivez leurs performances</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              
              <Link 
                to="/admin/recycleurs/nouveau" 
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <FiPlus className="w-5 h-5" />
                Nouveau recycleur
              </Link>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques modernes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaBuilding className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-1">Entreprises</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Actifs</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiCheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.actifs}</p>
            <p className="text-xs text-gray-400 mt-1">{Math.round((stats.actifs/stats.total)*100) || 0}% du total</p>
          </div>

          

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Déchets traités</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FaRecycle className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.dechets_traites} t</p>
            <p className="text-xs text-gray-400 mt-1">Ce mois</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Taux moyen</p>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiTrendingUp className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.taux_moyen}%</p>
            <p className="text-xs text-gray-400 mt-1">Recyclage</p>
          </div>
        </div>

        {/* Barre de filtres améliorée */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone ou zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="actif">Actifs</option>
                  <option value="inactif">Inactifs</option>
                </select>
              </div>

              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">Toutes les zones</option>
                  {zones.map((zone, index) => (
                    <option key={index} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={loadRecycleurs}
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
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Recherche: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-900">
                    <FiXCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Statut: {filterStatus === 'actif' ? 'Actifs' : 'Inactifs'}
                  <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-emerald-900">
                    <FiXCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterZone !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Zone: {filterZone}
                  <button onClick={() => setFilterZone('all')} className="ml-1 hover:text-emerald-900">
                    <FiXCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tableau moderne */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Entreprise</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Zone</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Types de déchets</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((recycleur) => (
                  <tr key={recycleur.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                          <FaRecycle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900">{recycleur.nom_entreprise}</div>
                          <div className="text-xs text-gray-500">ID: {recycleur.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getZoneColor(recycleur.zone)}`}>
                          {recycleur.zone || 'Non spécifié'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FiMail className="w-3.5 h-3.5 text-gray-400" />
                          <span className="truncate max-w-[150px]">{recycleur.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FiPhone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{recycleur.telephone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FiActivity className="w-3.5 h-3.5 text-gray-400" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Taux recyclage</span>
                              <span className={`font-medium ${getPerformanceColor(recycleur.taux_recyclage)}`}>
                                {recycleur.taux_recyclage || 0}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                              <div 
                                className={`h-full rounded-full ${
                                  (recycleur.taux_recyclage || 0) >= 90 ? 'bg-emerald-500' :
                                  (recycleur.taux_recyclage || 0) >= 80 ? 'bg-blue-500' :
                                  (recycleur.taux_recyclage || 0) >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${recycleur.taux_recyclage || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FiTruck className="w-3.5 h-3.5" />
                          <span>{recycleur.dechets_traites || 0} t traités</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {recycleur.types_dechets?.map((type, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700">
                            {type}
                          </span>
                        ))}
                        {!recycleur.types_dechets?.length && (
                          <span className="text-xs text-gray-400">Non spécifié</span>
                        )}
                      </div>
                      {recycleur.certifications?.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <FiAward className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-yellow-600">Certifié</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(recycleur.statut)}
                      <div className="text-xs text-gray-400 mt-1">
                        <FiCalendar className="w-3 h-3 inline mr-1" />
                        {new Date(recycleur.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedRecycleur(recycleur);
                            setShowModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <Link 
                          to={`/admin/recycleurs/${recycleur.id}/edit`} 
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors" title="Plus d'options">
                          <FiMoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRecycleurs.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <FaRecycle className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucun recycleur trouvé</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredRecycleurs.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredRecycleurs.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredRecycleurs.length}</span> recycleurs
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
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
        {showModal && selectedRecycleur && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* En-tête du modal */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <FaRecycle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedRecycleur.nom_entreprise}</h3>
                      <p className="text-emerald-100">Recycleur • ID: {selectedRecycleur.id}</p>
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
                {/* Grille d'informations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiMail className="w-4 h-4" /> Contact
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-900 flex items-center gap-2">
                        <FiMail className="w-4 h-4 text-gray-400" />
                        {selectedRecycleur.email}
                      </p>
                      <p className="text-gray-900 flex items-center gap-2">
                        <FiPhone className="w-4 h-4 text-gray-400" />
                        {selectedRecycleur.telephone}
                      </p>
                      <p className="text-gray-900 flex items-center gap-2">
                        <FiMapPin className="w-4 h-4 text-gray-400" />
                        {selectedRecycleur.adresse || 'Non spécifié'}
                      </p>
                    </div>
                  </div>

                  {/* Informations professionnelles */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FaBuilding className="w-4 h-4" /> Professionnel
                    </h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Zone:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getZoneColor(selectedRecycleur.zone)}`}>
                          {selectedRecycleur.zone || 'Non spécifié'}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <span>{getStatusBadge(selectedRecycleur.statut)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Dernier contrôle:</span>
                        <span className="font-medium text-gray-900">
                          {selectedRecycleur.dernier_controle || 'Non effectué'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistiques détaillées */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl text-center">
                    <p className="text-sm text-emerald-600 mb-1">Capacité</p>
                    <p className="text-2xl font-bold text-emerald-700">{selectedRecycleur.capacite_traitement || 0} t</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <p className="text-sm text-blue-600 mb-1">Traités</p>
                    <p className="text-2xl font-bold text-blue-700">{selectedRecycleur.dechets_traites || 0} t</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-xl text-center">
                    <p className="text-sm text-yellow-600 mb-1">Taux recyclage</p>
                    <p className="text-2xl font-bold text-yellow-700">{selectedRecycleur.taux_recyclage || 0}%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center">
                    <p className="text-sm text-purple-600 mb-1">Types</p>
                    <p className="text-2xl font-bold text-purple-700">{selectedRecycleur.types_dechets?.length || 0}</p>
                  </div>
                </div>

                {/* Types de déchets et certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Types de déchets traités</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecycleur.types_dechets?.map((type, idx) => (
                        <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm">
                          {type}
                        </span>
                      ))}
                      {!selectedRecycleur.types_dechets?.length && (
                        <p className="text-sm text-gray-400">Aucun type spécifié</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecycleur.certifications?.map((cert, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                          {cert}
                        </span>
                      ))}
                      {!selectedRecycleur.certifications?.length && (
                        <p className="text-sm text-gray-400">Aucune certification</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dates importantes */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Date d'inscription</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedRecycleur.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Dernière mise à jour</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedRecycleur.updated_at).toLocaleDateString('fr-FR', {
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
                    to={`/admin/recycleurs/${selectedRecycleur.id}/edit`}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
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

export default RecycleursList;