

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import { FiSave, FiX, FiArrowLeft, FiAward, FiUser, FiCalendar, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ErreurDom from '../../Layouts/ErreurDom';

const ConvertirProducteurPremium = () => {
  const navigate = useNavigate();
  const [producteurs, setProducteurs] = useState([]);
  const [selectedProducteur, setSelectedProducteur] = useState('');
  const [formData, setFormData] = useState({
    typeAbonnement: 'mensuel',
    frequenceCollecte: 'hebdomadaire',
    montantAbonnement: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingProducteurs, setLoadingProducteurs] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user'));
    setUser(userData);
    loadProducteurs();
  }, []);

  const loadProducteurs = async () => {
    try {
      const data = await adminService.getProducteurs();
      console.log('📦 Données producteurs reçues:', data);
      const nonPremium = (data.producteurs || []).filter(p => p.type_compte !== 'premium');
      setProducteurs(nonPremium);
    } catch (error) {
      console.error('Erreur chargement producteurs:', error);
      toast.error('Erreur lors du chargement des producteurs');
    } finally {
      setLoadingProducteurs(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🟢 selectedProducteur avant envoi:', selectedProducteur, typeof selectedProducteur);

    if (!selectedProducteur) {
      toast.error('Veuillez sélectionner un producteur');
      return;
    }
    if (!formData.montantAbonnement || parseFloat(formData.montantAbonnement) <= 0) {
      toast.error('Montant invalide');
      return;
    }

    try {
      setLoading(true);
      await adminService.convertirEnPremium(selectedProducteur, {
        typeAbonnement: formData.typeAbonnement,
        frequenceCollecte: formData.frequenceCollecte,
        montantAbonnement: parseFloat(formData.montantAbonnement),
      });
      toast.success('Producteur converti en premium avec succès');
      navigate('/admin/producteurs-premium');
    } catch (error) {
      console.error('❌ Erreur conversion:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la conversion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErreurDom>
    <AdminLayout title="Convertir Producteur en Premium" user={user}>
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/admin/producteurs-premium')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Convertir en Premium</h2>
              <p className="text-sm text-gray-500">Transformez un producteur standard en abonnement premium</p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <FiAward className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Configuration de l'abonnement</h3>
              <p className="text-sm text-gray-500">Remplissez les informations pour créer l'abonnement premium</p>
            </div>
          </div>

          {loadingProducteurs ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement des producteurs...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sélection du producteur */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiUser className="w-4 h-4 inline mr-2" />
                  Producteur à convertir *
                </label>
                <select
                  value={selectedProducteur}
                  onChange={(e) => setSelectedProducteur(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez un producteur</option>
                  {producteurs.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nom_complet} - {p.email}
                    </option>
                  ))}
                </select>
                {producteurs.length === 0 && !loadingProducteurs && (
                  <p className="text-sm text-amber-600 mt-2">Aucun producteur standard disponible.</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type d'abonnement */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type d'abonnement *
                  </label>
                  <select
                    name="typeAbonnement"
                    value={formData.typeAbonnement}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="mensuel">Mensuel</option>
                    <option value="trimestriel">Trimestriel</option>
                    <option value="annuel">Annuel</option>
                  </select>
                </div>

                {/* Fréquence de collecte */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiCalendar className="w-4 h-4 inline mr-2" />
                    Fréquence de collecte *
                  </label>
                  <select
                    name="frequenceCollecte"
                    value={formData.frequenceCollecte}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="hebdomadaire">Hebdomadaire</option>
                    <option value="bi-mensuelle">Bi-mensuelle</option>
                    <option value="mensuelle">Mensuelle</option>
                  </select>
                </div>
              </div>

              {/* Montant de l'abonnement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiDollarSign className="w-4 h-4 inline mr-2" />
                  Montant de l'abonnement (FCFA) *
                </label>
                <input
                  type="number"
                  step="100"
                  min="0"
                  name="montantAbonnement"
                  value={formData.montantAbonnement}
                  onChange={handleChange}
                  required
                  placeholder="5000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Montant à facturer selon la fréquence choisie
                </p>
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading || producteurs.length === 0}
                  className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Traitement...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Convertir en Premium
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/producteurs-premium')}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <FiX className="w-5 h-5" />
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-emerald-50 rounded-xl p-6 mt-6">
          <div className="flex items-start gap-3">
            <FiAward className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-900 mb-2">Avantages Premium</h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Collectes priorisées et plus fréquentes</li>
                <li>• Support client dédié 24/7</li>
                <li>• Accès aux statistiques avancées</li>
                <li>• Badges et reconnaissance spéciale</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
    </ErreurDom>
  );
};

export default ConvertirProducteurPremium;