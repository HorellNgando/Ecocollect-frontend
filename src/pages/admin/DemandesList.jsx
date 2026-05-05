import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiEdit2, FiPlus, FiEye, FiFileText, FiCalendar, FiUser, 
  FiCheckCircle, FiXCircle, FiClock, FiFilter, FiSearch,
  FiDownload, FiRefreshCw, FiChevronLeft, FiChevronRight,
  FiMoreVertical, FiMail, FiPhone, FiMapPin, FiTag,
  FiAlertCircle, FiInfo, FiBriefcase, FiHome, FiStar,
  FiTrendingUp, FiUsers, FiPackage, FiAward
} from 'react-icons/fi';
import { FaHandshake, FaUserTie, FaRegBuilding, FaUserPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminLayout from '../../components/AdminLayout';

const DemandesList = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    loadDemandes();
  }, []);

  const loadDemandes = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDemandes();
      
      // Enrichir avec des données supplémentaires pour la démo
      const enrichedData = (data.demandes || []).map((demande, index) => ({
        ...demande,
        telephone: demande.telephone || '+221 77 123 45 6' + (index + 1),
        adresse: demande.adresse || 'Dakar, Sénégal',
        documentUrl: demande.documentUrl || '#',
        motifs: demande.motifs || '',
        traiteePar: demande.traiteePar || null,
        dateTraitement: demande.dateTraitement || null
      }));
      
      setDemandes(enrichedData);
    } catch (error) {
      console.error('Erreur chargement demandes:', error);
      toast.error('Erreur lors du chargement des demandes');
      setDemandes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprouver = async (id) => {
    try {
      await adminService.approuverDemande(id);
      toast.success('Demande approuvée avec succès');
      loadDemandes();
      setShowModal(false);
    } catch (error) {
      console.error('Erreur approbation:', error);
      toast.error('Erreur lors de l\'approbation de la demande');
    }
  };

  const handleRejeter = async (id, motif) => {
    if (!motif || motif.trim() === '') {
      toast.error('Veuillez indiquer un motif de rejet');
      return;
    }
    
    try {
      await adminService.rejeterDemande(id, motif);
      toast.success('Demande rejetée avec succès');
      loadDemandes();
      setShowModal(false);
      setShowRejectModal(false);
      setRejectionReason('');
    } catch (error) {
      console.error('Erreur rejet:', error);
      toast.error('Erreur lors du rejet de la demande');
    }
  };

  const filteredDemandes = demandes.filter(demande => {
    const matchesSearch = 
      (demande.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (demande.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (demande.type?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (demande.telephone || '').includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || demande.statut === filterStatus;
    const matchesType = filterType === 'all' || demande.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDemandes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage);

  // Extraire les types uniques
  const types = [...new Set(demandes.map(d => d.type).filter(Boolean))];

  // Statistiques
  const stats = {
    total: demandes.length,
    enAttente: demandes.filter(d => d.statut === 'en_attente').length,
    approuvees: demandes.filter(d => d.statut === 'approuve').length,
    rejetees: demandes.filter(d => d.statut === 'rejete').length
  };

  const getStatusBadge = (statut) => {
    switch (statut) {
      case 'approuve':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
          <FiCheckCircle className="w-3 h-3 mr-1" /> Approuvée
        </span>;
      case 'rejete':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          <FiXCircle className="w-3 h-3 mr-1" /> Rejetée
        </span>;
      case 'en_attente':
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          <FiClock className="w-3 h-3 mr-1" /> En attente
        </span>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'collecteur': return <FiUser className="w-4 h-4" />;
      case 'recycleur': return <FaRecycle className="w-4 h-4" />;
      case 'producteur': return <FiPackage className="w-4 h-4" />;
      case 'superviseur': return <FiBriefcase className="w-4 h-4" />;
      case 'gestionnaire': return <FiUsers className="w-4 h-4" />;
      case 'ong': return <FaHandshake className="w-4 h-4" />;
      case 'sponsor': return <FaRegBuilding className="w-4 h-4" />;
      default: return <FiFileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'collecteur': 'bg-blue-100 text-blue-800 border-blue-200',
      'recycleur': 'bg-green-100 text-green-800 border-green-200',
      'producteur': 'bg-purple-100 text-purple-800 border-purple-200',
      'superviseur': 'bg-orange-100 text-orange-800 border-orange-200',
      'gestionnaire': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'ong': 'bg-pink-100 text-pink-800 border-pink-200',
      'sponsor': 'bg-amber-100 text-amber-800 border-amber-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <AdminLayout title="Demandes">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FiFileText className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des demandes...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Gestion des Demandes">
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FiFileText className="w-8 h-8" />
                Demandes d'inscription
              </h1>
              <p className="text-blue-100">Gérez les demandes d'inscription des utilisateurs</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                <FiDownload className="w-4 h-4" />
                Exporter
              </button>
              <button 
                onClick={loadDemandes}
                className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <FiRefreshCw className="w-4 h-4" />
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total demandes</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiFileText className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-1">Toutes les demandes</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">En attente</p>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiClock className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.enAttente}</p>
            <p className="text-xs text-gray-400 mt-1">À traiter</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Approuvées</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiCheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.approuvees}</p>
            <p className="text-xs text-gray-400 mt-1">Acceptées</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Rejetées</p>
              <div className="p-2 bg-red-100 rounded-lg">
                <FiXCircle className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-red-600">{stats.rejetees}</p>
            <p className="text-xs text-gray-400 mt-1">Refusées</p>
          </div>
        </div>

        {/* Barre de filtres */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone ou type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="en_attente">En attente</option>
                  <option value="approuve">Approuvées</option>
                  <option value="rejete">Rejetées</option>
                </select>
              </div>

              <div className="relative">
                <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">Tous les types</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tags de recherche actifs */}
          {(searchTerm || filterStatus !== 'all' || filterType !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Filtres actifs:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  Recherche: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-blue-900">
                    <FiXCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  Statut: {filterStatus === 'en_attente' ? 'En attente' : 
                          filterStatus === 'approuve' ? 'Approuvées' : 'Rejetées'}
                  <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-blue-900">
                    <FiXCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterType !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  Type: {filterType}
                  <button onClick={() => setFilterType('all')} className="ml-1 hover:text-blue-900">
                    <FiXCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tableau des demandes */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Demandeur</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((demande) => (
                  <tr key={demande.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                          {getTypeIcon(demande.type)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900">{demande.nom}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <FiMail className="w-3 h-3" />
                            {demande.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg ${getTypeColor(demande.type)}`}>
                        {demande.type?.charAt(0).toUpperCase() + demande.type?.slice(1) || 'Non spécifié'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FiPhone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{demande.telephone || 'Non spécifié'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCalendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(demande.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(demande.createdAt).toLocaleTimeString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(demande.statut)}
                      {demande.statut !== 'en_attente' && demande.dateTraitement && (
                        <div className="text-xs text-gray-400 mt-1">
                          Traité le {new Date(demande.dateTraitement).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedDemande(demande);
                            setShowModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        
                        {demande.statut === 'en_attente' && (
                          <>
                            <button
                              onClick={() => handleApprouver(demande.id)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Approuver"
                            >
                              <FiCheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedDemande(demande);
                                setShowRejectModal(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Rejeter"
                            >
                              <FiXCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors" title="Plus d'options">
                          <FiMoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDemandes.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <FiFileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucune demande trouvée</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredDemandes.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredDemandes.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredDemandes.length}</span> demandes
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
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

        {/* Modal de détails */}
        {showModal && selectedDemande && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* En-tête du modal */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <FiFileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Détails de la demande</h3>
                      <p className="text-blue-100">ID: {selectedDemande.id}</p>
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
                      <FiUser className="w-4 h-4" /> Informations personnelles
                    </h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Nom:</span>
                        <span className="font-medium text-gray-900">{selectedDemande.nom}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-900">{selectedDemande.email}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Téléphone:</span>
                        <span className="font-medium text-gray-900">{selectedDemande.telephone || 'Non spécifié'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiTag className="w-4 h-4" /> Détails de la demande
                    </h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getTypeColor(selectedDemande.type)}`}>
                          {selectedDemande.type?.charAt(0).toUpperCase() + selectedDemande.type?.slice(1)}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <span>{getStatusBadge(selectedDemande.statut)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(selectedDemande.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Adresse */}
                {selectedDemande.adresse && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiMapPin className="w-4 h-4" /> Adresse
                    </h4>
                    <p className="text-gray-900">{selectedDemande.adresse}</p>
                  </div>
                )}

                {/* Description */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    <FiInfo className="w-4 h-4" /> Description
                  </h4>
                  <p className="text-gray-700">{selectedDemande.description || 'Aucune description fournie'}</p>
                </div>

                {/* Motifs de rejet (si rejetée) */}
                {selectedDemande.statut === 'rejete' && selectedDemande.motifs && (
                  <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                    <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-2">
                      <FiAlertCircle className="w-4 h-4" /> Motif du rejet
                    </h4>
                    <p className="text-red-600">{selectedDemande.motifs}</p>
                  </div>
                )}

                {/* Traitement */}
                {selectedDemande.statut !== 'en_attente' && selectedDemande.dateTraitement && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Traitée le</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedDemande.dateTraitement).toLocaleString('fr-FR')}
                    </p>
                  </div>
                )}

                {/* Actions */}
                {selectedDemande.statut === 'en_attente' && (
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => handleApprouver(selectedDemande.id)}
                      className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiCheckCircle className="w-5 h-5" />
                      Approuver
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setShowRejectModal(true);
                      }}
                      className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiXCircle className="w-5 h-5" />
                      Rejeter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal de rejet */}
        {showRejectModal && selectedDemande && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-t-2xl">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FiAlertCircle className="w-6 h-6" />
                  Rejeter la demande
                </h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Veuillez indiquer le motif du rejet pour la demande de <strong>{selectedDemande.nom}</strong>
                </p>
                
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Ex: Documents incomplets, informations manquantes..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="4"
                />
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                      setRejectionReason('');
                    }}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handleRejeter(selectedDemande.id, rejectionReason)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition-colors"
                  >
                    Confirmer le rejet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DemandesList;