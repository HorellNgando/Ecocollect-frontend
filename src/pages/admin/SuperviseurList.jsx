import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiEdit2, FiPlus, FiEye, FiUsers, FiMail, FiPhone, FiMapPin, 
  FiCalendar, FiShield, FiCheckCircle, FiXCircle, FiSearch,
  FiFilter, FiDownload, FiUserCheck, FiUserX, FiRefreshCw,
  FiChevronLeft, FiChevronRight, FiMoreVertical, FiStar,
  FiAward, FiClock, FiBriefcase, FiHome, FiGlobe
} from 'react-icons/fi';
import { FaUserTie, FaRegBuilding } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminLayout from '../../components/AdminLayout';

const SuperviseurList = () => {
  const [superviseurs, setSuperviseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterZone, setFilterZone] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedSuperviseur, setSelectedSuperviseur] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('ecocollect_user')));
    loadSuperviseurs();
  }, []);

  const loadSuperviseurs = async () => {
    try {
      setLoading(true);
      const response = await adminService.getSuperviseurs();
      setSuperviseurs(response.superviseurs || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des superviseurs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    return status === 'actif' 
      ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
          Actif
        </span>
      : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
          Inactif
        </span>;
  };

  const getPerformanceBadge = (missions) => {
    if (!missions) return null;
    if (missions > 50) {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
        <FiStar className="w-3 h-3 mr-1" /> Expert
      </span>;
    } else if (missions > 20) {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
        <FiAward className="w-3 h-3 mr-1" /> Confirmé
      </span>;
    }
    return null;
  };

  // Extraire les zones uniques pour le filtre
  const zones = [...new Set(superviseurs.map(s => s.zone || 'Non spécifiée'))];

  const filteredSuperviseurs = superviseurs.filter(superviseur => {
    const matchesSearch = 
      (superviseur.nom_complet?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (superviseur.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (superviseur.telephone || '').includes(searchTerm) ||
      (superviseur.id?.toString() || '').includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || superviseur.statut === filterStatus;
    const matchesZone = filterZone === 'all' || (superviseur.zone || 'Non spécifiée') === filterZone;
    
    return matchesSearch && matchesStatus && matchesZone;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSuperviseurs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSuperviseurs.length / itemsPerPage);

  // Statistiques
  const stats = {
    total: superviseurs.length,
    actifs: superviseurs.filter(s => s.statut === 'actif').length,
    inactifs: superviseurs.filter(s => s.statut !== 'actif').length,
    avecMissions: superviseurs.filter(s => (s.nombre_missions || 0) > 0).length,
    totalMissions: superviseurs.reduce((acc, s) => acc + (s.nombre_missions || 0), 0)
  };

  if (loading) {
    return (
      <AdminLayout title="Superviseurs">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaUserTie className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des superviseurs...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Superviseurs">
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FiUsers className="w-8 h-8" />
                Superviseurs
              </h1>
              <p className="text-emerald-100">Gérez les superviseurs et suivez leurs activités sur la plateforme</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                to="/admin/superviseurs/nouveau" 
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <FiPlus className="w-5 h-5" />
                Nouveau superviseur
              </Link>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques modernes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-400 mt-1">Superviseurs</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <FiUsers className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Actifs</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.actifs}</p>
                <p className="text-xs text-gray-400 mt-1">{Math.round((stats.actifs/stats.total)*100) || 0}% du total</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <FiUserCheck className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Inactifs</p>
                <p className="text-2xl font-bold text-gray-600">{stats.inactifs}</p>
                <p className="text-xs text-gray-400 mt-1">{Math.round((stats.inactifs/stats.total)*100) || 0}% du total</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-xl">
                <FiUserX className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Avec missions</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avecMissions}</p>
                <p className="text-xs text-gray-400 mt-1">{Math.round((stats.avecMissions/stats.total)*100) || 0}% actifs</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiBriefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total missions</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalMissions}</p>
                <p className="text-xs text-gray-400 mt-1">missions confiées</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiAward className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Barre de filtres améliorée */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="actif">Actifs</option>
                  <option value="inactif">Inactifs</option>
                </select>
              </div>

              <div className="relative">
                <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <select
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                >
                  <option value="all">Toutes les zones</option>
                  {zones.map((zone, index) => (
                    <option key={index} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={loadSuperviseurs}
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Superviseur</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Localisation</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date d'ajout</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((superviseur) => (
                  <tr key={superviseur.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                          <FaUserTie className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{superviseur.nom_complet}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <FiShield className="w-3 h-3" />
                            ID: {superviseur.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiMail className="w-4 h-4 text-gray-400" />
                          <span className="truncate max-w-[150px]">{superviseur.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiPhone className="w-4 h-4 text-gray-400" />
                          <span>{superviseur.telephone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiMapPin className="w-4 h-4 text-gray-400" />
                          <span className="truncate max-w-[150px]">{superviseur.adresse || 'Non spécifié'}</span>
                        </div>
                        {superviseur.zone && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FiHome className="w-3 h-3" />
                            <span>Zone: {superviseur.zone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{superviseur.nombre_missions || 0}</span>
                          <span className="text-xs text-gray-500">missions</span>
                        </div>
                        {getPerformanceBadge(superviseur.nombre_missions)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCalendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(superviseur.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(superviseur.statut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedSuperviseur(superviseur);
                            setShowModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <FiEye className="w-5 h-5" />
                        </button>
                        <Link 
                          to={`/admin/superviseurs/${superviseur.id}/edit`} 
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </Link>
                        <button
                          className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Plus d'options"
                        >
                          <FiMoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredSuperviseurs.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <FiUsers className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucun superviseur trouvé</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredSuperviseurs.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredSuperviseurs.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredSuperviseurs.length}</span> superviseurs
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
        {showModal && selectedSuperviseur && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* En-tête du modal */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <FaUserTie className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedSuperviseur.nom_complet}</h3>
                      <p className="text-emerald-100">Superviseur • ID: {selectedSuperviseur.id}</p>
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
                {/* Informations principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiMail className="w-4 h-4" /> Contact
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-900">{selectedSuperviseur.email}</p>
                      <p className="text-gray-900">{selectedSuperviseur.telephone}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiMapPin className="w-4 h-4" /> Localisation
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-900">{selectedSuperviseur.adresse || 'Non spécifié'}</p>
                      {selectedSuperviseur.zone && (
                        <p className="text-sm text-gray-600">Zone: {selectedSuperviseur.zone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Statistiques détaillées */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl">
                    <p className="text-sm text-emerald-600 mb-1">Missions totales</p>
                    <p className="text-2xl font-bold text-emerald-700">{selectedSuperviseur.nombre_missions || 0}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-blue-600 mb-1">Taux de réussite</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {selectedSuperviseur.taux_reussite || 0}%
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-sm text-purple-600 mb-1">Points supervisés</p>
                    <p className="text-2xl font-bold text-purple-700">{selectedSuperviseur.nombre_points || 0}</p>
                  </div>
                </div>

                {/* Informations système */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Informations système</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Date d'ajout</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedSuperviseur.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Dernière mise à jour</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedSuperviseur.updated_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                  <Link
                    to={`/admin/superviseurs/${selectedSuperviseur.id}/edit`}
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

export default SuperviseurList;