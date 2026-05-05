import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import { FiEye, FiXCircle, FiCalendar, FiDollarSign, FiAward , FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProducteursPremiumList = () => {
  const [producteurs, setProducteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user'));
    setUser(userData);
    loadProducteurs();
  }, []);

  const loadProducteurs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getProducteursPremium();
      setProducteurs(data.producteurs || []);
    } catch (error) {
      console.error('Erreur chargement producteurs premium:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleResilier = async (id, nom) => {
    if (!window.confirm(`Voulez-vous résilier l'abonnement de ${nom} ?`)) return;
    try {
      await adminService.resilierAbonnement(id, 'Résiliation par admin');
      toast.success('Abonnement résilié');
      loadProducteurs();
    } catch (error) {
      toast.error('Erreur lors de la résiliation');
    }
  };

  const getStatusBadge = (statut) => {
    const colors = {
      actif: 'bg-green-100 text-green-800',
      expire: 'bg-gray-100 text-gray-800',
      resilie: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[statut] || 'bg-gray-100'}`}>
        {statut}
      </span>
    );
  };

  const styles = `
    .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .btn-primary { background: #2d8a5e; color: white; padding: 0.75rem 1.5rem; border-radius: 100px; display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
    .table-container { background: white; border-radius: 1rem; border: 1px solid #d9e0d9; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f8faf8; padding: 1rem; text-align: left; }
    td { padding: 1rem; border-bottom: 1px solid #d9e0d9; }
    .badge { padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem; }
    .action-btn { background: none; border: none; color: #5a655a; cursor: pointer; padding: 0.5rem; border-radius: 0.5rem; }
    .action-btn:hover { background: #e8f3e8; color: #2d8a5e; }
    .action-btn.delete:hover { background: #fee2e2; color: #dc2626; }
  `;

  return (
    <AdminLayout title="Producteurs Premium" user={user}>
      <div className="space-y-6">
        {/* En-tête avec actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Producteurs Premium</h2>
              <p className="text-sm text-gray-500 mt-1">Gérez les abonnements premium des producteurs</p>
            </div>
            <Link
              to="/admin/producteurs/convertir-premium"
              className=" bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 w-fit"
            >
              <FiAward className="w-5 h-5" />
              Convertir en premium
            </Link>
          </div>
        </div>

        {/* Tableau des producteurs premium */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement des producteurs premium...</p>
            </div>
          ) : producteurs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producteur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Abonnement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durée
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
                  {producteurs.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                              {p.nom_complet?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'PR'}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                              {p.nom_complet}
                              <FiStar className="w-4 h-4 text-yellow-500" />
                            </div>
                            <div className="text-sm text-gray-500">{p.entreprise || '-'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{p.email}</div>
                        <div className="text-sm text-gray-500">{p.telephone || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{p.type_abonnement}</div>
                        <div className="text-sm text-gray-500">{p.montant_abonnement?.toLocaleString()} FCFA/mois</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(p.date_debut).toLocaleDateString('fr-FR')} - {new Date(p.date_fin).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-sm text-gray-500">{p.frequence_collecte}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(p.abonnement_statut || p.statut)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/producteurs-premium/${p.id}`}
                            className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                            title="Voir les détails"
                          >
                            <FiEye className="w-4 h-4" />
                          </Link>
                          <button
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            onClick={() => handleResilier(p.id, p.nom_complet)}
                            title="Résilier abonnement"
                          >
                            <FiXCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <FiAward className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun producteur premium</h3>
              <p className="text-gray-500 mb-4">Aucun producteur n'a souscrit à l'abonnement premium pour le moment.</p>
              <Link
                to="/admin/producteurs/convertir-premium"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
              >
                <FiAward className="w-5 h-5" />
                Convertir un producteur
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProducteursPremiumList;