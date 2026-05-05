// pages/Recycleur/MesDeclarations.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../Layouts/LayoutDashboard';
import recycleurService from '../../services/recycleurService';
import { 
  FiFileText, FiCalendar, FiPackage, FiDownload,
  FiEye, FiFilter, FiRefreshCw, FiImage, FiFile,
  FiPlus, FiSearch, FiX, FiChevronLeft, FiChevronRight,
  FiMoreVertical, FiInfo, FiCheckCircle, FiXCircle,
  FiClock, FiAward, FiTrendingUp
} from 'react-icons/fi';
import { FaRecycle, FaLeaf, FaFilePdf, FaFileImage } from 'react-icons/fa';
//import toast from 'react-hot-toast';

const MesDeclarations = () => {
  const [declarations, setDeclarations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeclaration, setSelectedDeclaration] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user'));
    setUser(userData);
    loadDeclarations();
  }, [filtreStatut]);

  const loadDeclarations = async () => {
    try {
      setLoading(true);
      const statut = filtreStatut !== 'tous' ? filtreStatut : null;
      const data = await recycleurService.getMesDeclarations(statut);
      
      // Enrichir avec des données supplémentaires pour la démo
      const enrichedData = (data.declarations || []).map((decl, index) => ({
        ...decl,
        points_gagnes: Math.floor(Math.random() * 500) + 100,
        impact_co2: (decl.quantite_recyclee * 0.8).toFixed(1),
        reference: `DEC-2024-${String(index + 1).padStart(3, '0')}`
      }));
      
      setDeclarations(enrichedData);
    } catch (error) {
      console.error('Erreur chargement déclarations:', error);
      toast.error('Erreur lors du chargement des déclarations');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDeclarations();
    setRefreshing(false);
    toast.success('Données actualisées');
  };

  const handleViewCertificat = (declaration) => {
    setSelectedDeclaration(declaration);
    setShowPreviewModal(true);
  };

  const getTypeLabel = (type) => {
    const labels = {
      'plastique_pet': 'Plastique PET',
      'plastique_pehd': 'Plastique PEHD',
      'papier_carton': 'Papier/Carton',
      'metal': 'Métal',
      'verre': 'Verre',
      'organique': 'Organique'
    };
    return labels[type] || type;
  };
  // Filtrer les déclarations par recherche
  const filteredDeclarations = declarations.filter(decl => {
    const matchesSearch = 
      (getTypeLabel(decl.type_dechet)?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (decl.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeclarations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDeclarations.length / itemsPerPage);

  // Statistiques
  const stats = {
    total: declarations.length,
    enAttente: declarations.filter(d => d.statut === 'en_attente').length,
    validees: declarations.filter(d => d.statut === 'validee').length,
    totalKg: declarations.reduce((sum, d) => sum + parseFloat(d.quantite_recyclee || 0), 0),
    totalPoints: declarations.reduce((sum, d) => sum + (d.points_gagnes || 0), 0)
  };

  const getStatusBadge = (statut) => {
    const badges = {
      'en_attente': { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        label: 'En attente',
        icon: FiClock
      },
      'validee': { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        label: 'Validée',
        icon: FiCheckCircle
      },
      'refusee': { 
        color: 'bg-red-100 text-red-800 border-red-200', 
        label: 'Refusée',
        icon: FiXCircle
      },
    };
    return badges[statut] || { 
      color: 'bg-gray-100 text-gray-800 border-gray-200', 
      label: statut,
      icon: FiInfo
    };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateLong = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  

  const getTypeColor = (type) => {
    const colors = {
      'plastique_pet': 'bg-blue-100 text-blue-800 border-blue-200',
      'plastique_pehd': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'papier_carton': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'metal': 'bg-gray-100 text-gray-800 border-gray-200',
      'verre': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'organique': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'plastique_pet': '🥤',
      'plastique_pehd': '🧴',
      'papier_carton': '📦',
      'metal': '🥫',
      'verre': '🥃',
      'organique': '🌱'
    };
    return icons[type] || '📦';
  };

  const getCertificatIcon = (url) => {
    if (!url) return <FiFile className="w-5 h-5 text-gray-400" />;
    if (url.endsWith('.pdf')) return <FaFilePdf className="w-5 h-5 text-red-500" />;
    return <FaFileImage className="w-5 h-5 text-blue-500" />;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num || 0);
  };

  if (loading) {
    return (
      <DashboardLayout title="Mes déclarations" user={user}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaRecycle className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement de vos déclarations...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Mes déclarations de recyclage" user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaRecycle className="w-8 h-8" />
                Mes déclarations
              </h1>
              <p className="text-emerald-100">Suivez et gérez toutes vos déclarations de recyclage</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button 
                className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Actualiser
              </button>
              <Link 
                to="/recycleur/declarations" 
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <FiPlus className="w-5 h-5" />
                Nouvelle déclaration
              </Link>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiFileText className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-1">Déclarations</p>
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
              <p className="text-sm text-gray-500">Validées</p>
              <div className="p-2 bg-green-100 rounded-lg">
                <FiCheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.validees}</p>
            <p className="text-xs text-gray-400 mt-1">Approuvées</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Poids total</p>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiPackage className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-purple-600">{formatNumber(stats.totalKg)} kg</p>
            <p className="text-xs text-gray-400 mt-1">Recyclés</p>
          </div>

        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par type de déchet ou référence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filtreStatut}
                  onChange={(e) => setFiltreStatut(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="en_attente">En attente</option>
                  <option value="validee">Validées</option>
                  <option value="refusee">Refusées</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tags de recherche actifs */}
          {(searchTerm || filtreStatut !== 'tous') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Filtres actifs:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Recherche: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-900">
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filtreStatut !== 'tous' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Statut: {filtreStatut === 'en_attente' ? 'En attente' : 
                          filtreStatut === 'validee' ? 'Validées' : 'Refusées'}
                  <button onClick={() => setFiltreStatut('tous')} className="ml-1 hover:text-emerald-900">
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Liste des déclarations */}
        {filteredDeclarations.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((declaration) => {
                const status = getStatusBadge(declaration.statut);
                const StatusIcon = status.icon;
                return (
                  <div key={declaration.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow group">
                    {/* En-tête de la carte */}
                    <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getTypeIcon(declaration.type_dechet)}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{getTypeLabel(declaration.type_dechet)}</h3>
                            <p className="text-xs text-gray-500">Réf: {declaration.reference}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {/* Corps de la carte */}
                    <div className="p-5">
                      <div className="text-center mb-4">
                        <span className="text-4xl font-bold text-emerald-600">
                          {parseFloat(declaration.quantite_recyclee).toFixed(1)}
                        </span>
                        <span className="text-gray-500 ml-2">kg</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                          <FiCalendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(declaration.date_recyclage)}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                          <FiTrendingUp className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">Points</p>
                          <p className="text-sm font-medium text-amber-600">{declaration.points_gagnes}</p>
                        </div>
                      </div>

                      {/* Impact environnemental */}
                      <div className="bg-emerald-50 p-3 rounded-lg mb-4">
                        <div className="flex items-center gap-2">
                          <FaLeaf className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm text-gray-600">Impact CO₂ évité:</span>
                          <span className="text-sm font-bold text-emerald-700 ml-auto">{declaration.impact_co2} kg</span>
                        </div>
                      </div>

                      {/* Certificat */}
                      {declaration.certificat_url ? (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            {getCertificatIcon(declaration.certificat_url)}
                            <span className="text-xs text-gray-600 truncate max-w-[150px]">
                              {declaration.certificat_url.split('/').pop()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              onClick={() => handleViewCertificat(declaration)}
                              title="Voir le certificat"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <a
                              href={recycleurService.getCertificatUrl(declaration.certificat_url)}
                              download
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Télécharger"
                            >
                              <FiDownload className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                          <span className="text-xs text-orange-600">Aucun certificat joint</span>
                          <FiInfo className="w-4 h-4 text-orange-500" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {filteredDeclarations.length > 0 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredDeclarations.length)}
                  </span>{' '}
                  sur <span className="font-medium">{filteredDeclarations.length}</span> déclarations
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
          </>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaRecycle className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune déclaration trouvée</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchTerm || filtreStatut !== 'tous' 
                ? 'Aucune déclaration ne correspond à vos critères de recherche.'
                : 'Vous n\'avez pas encore effectué de déclaration de recyclage.'}
            </p>
            <Link 
              to="/recycleur/declarations/nouvelle" 
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              <FiPlus className="w-5 h-5" />
              Créer votre première déclaration
            </Link>
          </div>
        )}

        {/* Modal de prévisualisation amélioré */}
        {showPreviewModal && selectedDeclaration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* En-tête du modal */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <FiFileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Certificat de recyclage</h3>
                      <p className="text-emerald-100 text-sm">
                        {getTypeLabel(selectedDeclaration.type_dechet)} - {formatDateLong(selectedDeclaration.date_recyclage)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Corps du modal */}
              <div className="p-6">
                {selectedDeclaration.certificat_url && (
                  <>
                    {selectedDeclaration.certificat_url.endsWith('.pdf') ? (
                      <iframe
                        src={recycleurService.getCertificatUrl(selectedDeclaration.certificat_url)}
                        className="w-full h-[500px] border border-gray-200 rounded-xl"
                        title="Certificat PDF"
                      />
                    ) : (
                      <img
                        src={recycleurService.getCertificatUrl(selectedDeclaration.certificat_url)}
                        alt="Certificat"
                        className="w-full max-h-[500px] object-contain border border-gray-200 rounded-xl"
                      />
                    )}
                    
                    {/* Informations complémentaires */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Quantité recyclée</p>
                        <p className="text-lg font-bold text-gray-900">{selectedDeclaration.quantite_recyclee} kg</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Points gagnés</p>
                        <p className="text-lg font-bold text-amber-600">{selectedDeclaration.points_gagnes}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() => setShowPreviewModal(false)}
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Fermer
                      </button>
                      <a
                        href={recycleurService.getCertificatUrl(selectedDeclaration.certificat_url)}
                        download
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                      >
                        <FiDownload className="w-4 h-4" />
                        Télécharger
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MesDeclarations;