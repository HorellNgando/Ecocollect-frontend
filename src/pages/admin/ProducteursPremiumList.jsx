import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiPlus, FiEye, FiDollarSign, FiMail, FiPhone, FiMapPin, FiCalendar, FiCheckCircle, FiXCircle, FiFilter, FiSearch, FiAward, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminLayout from '../../components/AdminLayout';

const ProducteursPremiumList = () => {
  const [producteurs, setProducteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedProducteur, setSelectedProducteur] = useState(null);

  useEffect(() => {
    loadProducteurs();
  }, []);

  const loadProducteurs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getProducteurs();
      setProducteurs(data.producteurs?.filter(p => p.premium) || []);
    } catch (error) {
      console.error('Erreur chargement producteurs premium:', error);
      toast.error('Erreur lors du chargement des producteurs premium');
      setProducteurs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducteurs = producteurs.filter(producteur => {
    const matchesSearch = producteur.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producteur.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producteur.entreprise?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || producteur.statut === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (statut) => {
    switch (statut) {
      case 'actif':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-1 w-fit">
          <FiCheckCircle className="w-3 h-3" /> Actif
        </span>;
      case 'inactif':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 flex items-center gap-1 w-fit">
          <FiXCircle className="w-3 h-3" /> Inactif
        </span>;
      case 'suspendu':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 flex items-center gap-1 w-fit">
          <FiXCircle className="w-3 h-3" /> Suspendu
        </span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit">
          <FiCheckCircle className="w-3 h-3" /> En attente
        </span>;
    }
  };

  const getSubscriptionBadge = (abonnement) => {
    switch (abonnement) {
      case 'monthly':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Mensuel</span>;
      case 'yearly':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">Annuel</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">Gratuit</span>;
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Producteurs Premium">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Chargement des producteurs premium...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Producteurs Premium">
      <div className="space-y-6">
        {/* En-tête avec statistiques */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Producteurs Premium</h2>
              <p className="text-purple-100 mt-1">Gérez les abonnements premium des producteurs</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{producteurs.length}</div>
                <div className="text-sm text-purple-100">Total Premium</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{producteurs.filter(p => p.statut === 'actif').length}</div>
                <div className="text-sm text-purple-100">Actifs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un producteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="actif">Actifs</option>
                <option value="inactif">Inactifs</option>
                <option value="suspendu">Suspendus</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des producteurs premium */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredProducteurs.length === 0 ? (
            <div className="p-12 text-center">
              <FiAward className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun producteur premium trouvé</h3>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Aucun producteur ne correspond à vos critères de recherche.'
                  : 'Aucun producteur n\'a souscrit à l\'abonnement premium pour le moment.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producteur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entreprise
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Abonnement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducteurs.map((producteur) => (
                    <tr key={producteur.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                              {producteur.nom?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'PR'}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                              {producteur.nom}
                              <FiStar className="w-4 h-4 text-yellow-500" />
                            </div>
                            <div className="text-sm text-gray-500">{producteur.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{producteur.entreprise || '-'}</div>
                        <div className="text-sm text-gray-500">{producteur.telephone || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {getSubscriptionBadge(producteur.abonnement)}
                          {producteur.dateFinAbonnement && (
                            <div className="text-xs text-gray-500">
                              Jusqu'au {new Date(producteur.dateFinAbonnement).toLocaleDateString('fr-FR')}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(producteur.statut)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedProducteur(producteur);
                              setShowModal(true);
                            }}
                            className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                            title="Voir les détails"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                            title="Modifier"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal de détails */}
        {showModal && selectedProducteur && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  Détails du Producteur Premium
                  <FiStar className="w-5 h-5 text-yellow-500" />
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nom complet</label>
                    <p className="text-gray-900">{selectedProducteur.nom}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedProducteur.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Téléphone</label>
                    <p className="text-gray-900">{selectedProducteur.telephone || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Entreprise</label>
                    <p className="text-gray-900">{selectedProducteur.entreprise || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Type d'abonnement</label>
                    <div className="mt-1">{getSubscriptionBadge(selectedProducteur.abonnement)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Statut</label>
                    <div className="mt-1">{getStatusBadge(selectedProducteur.statut)}</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Localisation</label>
                  <p className="text-gray-900 mt-1 flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" />
                    {selectedProducteur.adresse || 'Non spécifiée'}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Date d'inscription</label>
                  <p className="text-gray-900 mt-1 flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    {new Date(selectedProducteur.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                
                {selectedProducteur.dateFinAbonnement && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Fin d'abonnement</label>
                    <p className="text-gray-900 mt-1 flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      {new Date(selectedProducteur.dateFinAbonnement).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
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

export default ProducteursPremiumList;
