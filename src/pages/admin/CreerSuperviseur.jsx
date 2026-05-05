import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FiSave, FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, 
  FiLock, FiInfo, FiAlertCircle, FiCheckCircle, FiEye, 
  FiEyeOff, FiHelpCircle, FiShield, FiBriefcase
} from 'react-icons/fi';
import { FaUserTie, FaRegBuilding } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminLayout from '../../components/AdminLayout';

const CreerSuperviseur = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    nom_complet: '',
    email: '',
    telephone: '',
    adresse: '',
    zone: '',
    fonction: '',
    motDePasse: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('ecocollect_user')));
    if (id) {
      loadSuperviseur();
    }
  }, [id]);

  const loadSuperviseur = async () => {
    try {
      setLoading(true);
      const response = await adminService.getSuperviseurById(id);
      const superviseur = response.superviseur;
      setFormData({
        nom_complet: superviseur.nom_complet || '',
        email: superviseur.email || '',
        telephone: superviseur.telephone || '',
        adresse: superviseur.adresse || '',
        zone: superviseur.zone || '',
        fonction: superviseur.fonction || '',
        motDePasse: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Erreur lors du chargement du superviseur');
      navigate('/admin/superviseurs');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Évaluer la force du mot de passe
    if (name === 'motDePasse') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;
    if (password.match(/[$@#&!]+/)) strength += 25;
    setPasswordStrength(Math.min(strength, 100));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 50) return 'Faible';
    if (passwordStrength < 75) return 'Moyen';
    return 'Fort';
  };

  const validateForm = () => {
    if (!id && formData.motDePasse !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return false;
    }
    if (!id && formData.motDePasse.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    return true;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   try {
  //     setLoading(true);
  //     if (id) {
  //       const { motDePasse, confirmPassword, ...dataToSend } = formData;
  //       const response = await adminService.modifierSuperviseur(id, dataToSend);
  //       if (response.success) {
  //         toast.success('Superviseur modifié avec succès');
  //         navigate('/admin/superviseurs');
  //       }
  //     } else {
  //       const { confirmPassword, ...dataToSend } = formData;
  //       const response = await adminService.creerSuperviseur(dataToSend);
  //       if (response.success) {
  //         toast.success('Superviseur créé avec succès');
  //         navigate('/admin/superviseurs');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Erreur:', error);
  //     toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

 
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
        setLoading(true);
        if (id) {
            const { motDePasse, confirmPassword, ...dataToSend } = formData;
            // Convertir nom_complet en nomComplet pour l'API
            const apiData = {
                ...dataToSend,
                nomComplet: dataToSend.nom_complet
            };
            delete apiData.nom_complet;
            
            const response = await adminService.modifierSuperviseur(id, apiData);
            if (response.success) {
                toast.success('Superviseur modifié avec succès');
                navigate('/admin/superviseurs');
            }
        } else {
            const { confirmPassword, ...dataToSend } = formData;
            // Convertir nom_complet en nomComplet pour l'API
            const apiData = {
                email: dataToSend.email,
                telephone: dataToSend.telephone,
                motDePasse: dataToSend.motDePasse,
                nomComplet: dataToSend.nom_complet  // ICI la correction
            };
            
            const response = await adminService.creerSuperviseur(apiData);
            if (response.success) {
                toast.success('Superviseur créé avec succès');
                navigate('/admin/superviseurs');
            }
        }
    } catch (error) {
        console.error('Erreur:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    } finally {
        setLoading(false);
    }
};

  return (
    <AdminLayout title={id ? 'Modifier le superviseur' : 'Nouveau superviseur'} user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin/superviseurs')} 
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaUserTie className="w-8 h-8" />
                {id ? 'Modifier le superviseur' : 'Nouveau superviseur'}
              </h1>
              <p className="text-emerald-100">
                {id ? 'Modifiez les informations du superviseur' : 'Créez un nouveau compte superviseur sur la plateforme'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          {loading && id ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaUserTie className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Chargement du superviseur...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Carte d'informations générales */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                    <FiUser className="text-emerald-600" />
                    Informations personnelles
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom complet */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="nom_complet"
                          required
                          value={formData.nomComplet}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="Ex: Jean Dupont"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="superviseur@exemple.com"
                        />
                      </div>
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="telephone"
                          required
                          value={formData.telephone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="+237 77 123 45 67"
                        />
                      </div>
                    </div>

                    {/* Fonction */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fonction</label>
                      <div className="relative">
                        <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="fonction"
                          value={formData.fonction}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="Ex: Superviseur principal"
                        />
                      </div>
                    </div>

                    {/* Zone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                      <div className="relative">
                        <FaRegBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="zone"
                          value={formData.zone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                        >
                          <option value="">Sélectionner une ville</option>
                          <option value="Douala">Douala</option>
                          <option value="Yaounde">Yaounde</option>
                          <option value="Kribi">Kribi</option>
                          <option value="Buea">Buea</option>
                          <option value="Limbe">Limbe</option>
                          <option value="Garoua">Garoua</option>
                          <option value="Foumban">Foumabn</option>
                          <option value="Bafoussam">Bafoussam</option>
                          <option value="Guédiawaye">Ebolowa</option>
                          <option value="Maroua">Maroua</option>
                          <option value="Bamenda">Bamenda</option>
                          <option value="Ngaoundere">Ngaoundere</option>
                        </select>
                      </div>
                    </div>

                    {/* Adresse */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adresse complète</label>
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          name="adresse"
                          rows="3"
                          value={formData.adresse}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="Adresse complète..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte de sécurité (mot de passe) - uniquement pour création */}
              {!id && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                      <FiShield className="text-emerald-600" />
                      Sécurité du compte
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Mot de passe */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de passe <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="motDePasse"
                            required={!id}
                            value={formData.motDePasse}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                          </button>
                        </div>
                        
                        {/* Indicateur de force du mot de passe */}
                        {formData.motDePasse && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">Force du mot de passe</span>
                              <span className={`text-xs font-medium ${
                                passwordStrength < 50 ? 'text-red-600' : 
                                passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {getPasswordStrengthText()}
                              </span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                                style={{ width: `${passwordStrength}%` }}
                              ></div>
                            </div>
                            <ul className="mt-2 space-y-1">
                              <li className="flex items-center gap-1 text-xs">
                                <FiCheckCircle className={`w-3 h-3 ${formData.motDePasse.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                                <span className={formData.motDePasse.length >= 8 ? 'text-gray-700' : 'text-gray-400'}>
                                  Au moins 8 caractères
                                </span>
                              </li>
                              <li className="flex items-center gap-1 text-xs">
                                <FiCheckCircle className={`w-3 h-3 ${/[a-z]/.test(formData.motDePasse) ? 'text-green-500' : 'text-gray-300'}`} />
                                <span className={/[a-z]/.test(formData.motDePasse) ? 'text-gray-700' : 'text-gray-400'}>
                                  Une lettre minuscule
                                </span>
                              </li>
                              <li className="flex items-center gap-1 text-xs">
                                <FiCheckCircle className={`w-3 h-3 ${/[A-Z]/.test(formData.motDePasse) ? 'text-green-500' : 'text-gray-300'}`} />
                                <span className={/[A-Z]/.test(formData.motDePasse) ? 'text-gray-700' : 'text-gray-400'}>
                                  Une lettre majuscule
                                </span>
                              </li>
                              <li className="flex items-center gap-1 text-xs">
                                <FiCheckCircle className={`w-3 h-3 ${/[0-9]/.test(formData.motDePasse) ? 'text-green-500' : 'text-gray-300'}`} />
                                <span className={/[0-9]/.test(formData.motDePasse) ? 'text-gray-700' : 'text-gray-400'}>
                                  Un chiffre
                                </span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Confirmation du mot de passe */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le mot de passe <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="password"
                            name="confirmPassword"
                            required={!id}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                          />
                        </div>
                        {formData.confirmPassword && formData.motDePasse !== formData.confirmPassword && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <FiAlertCircle className="w-3 h-3" />
                            Les mots de passe ne correspondent pas
                          </p>
                        )}
                        {formData.confirmPassword && formData.motDePasse === formData.confirmPassword && (
                          <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                            <FiCheckCircle className="w-3 h-3" />
                            Les mots de passe correspondent
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Aide et informations */}
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-start gap-3">
                  <FiInfo className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-emerald-800 mb-1">Informations importantes</h4>
                    <p className="text-xs text-emerald-700">
                      {id 
                        ? 'Les champs marqués d\'un astérisque (*) sont obligatoires. Le mot de passe ne peut être modifié que via la page de modification de profil.'
                        : 'Le superviseur recevra un email de confirmation avec ses identifiants de connexion. Assurez-vous que l\'adresse email est correcte.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/superviseurs')}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg shadow-emerald-200"
                >
                  <FiSave className="w-5 h-5" />
                  {loading ? 'Enregistrement...' : (id ? 'Mettre à jour' : 'Créer le superviseur')}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreerSuperviseur;