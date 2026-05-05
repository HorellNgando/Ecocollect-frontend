import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FiSave, FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, 
  FiLock, FiInfo, FiAlertCircle, FiCheckCircle, FiEye, 
  FiEyeOff, FiHelpCircle, FiShield, FiBriefcase, FiGlobe,
  FiHome, FiFileText, FiAward, FiHeart, FiTag
} from 'react-icons/fi';
import { FaHandHoldingHeart, FaHeartbeat, FaRegBuilding } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminLayout from '../../components/AdminLayout';

const CreerOng = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [selectedDomaines, setSelectedDomaines] = useState([]);
  const [formData, setFormData] = useState({
    nomOng: '',
    numeroAgrement: '',
    domaineIntervention: '',
    nomResponsable: '',
    email: '',
    telephone: '',
    adresse: '',
    motDePasse: '',
    confirmPassword: ''
  });

  //  nomOng: '',
  //   numeroAgrement: '',
  //   domaineIntervention: '',
  //   nomResponsable: '',
  //   email: '',
  //   telephone: '',
  //   adresse: '',
  //   motDePasse: ''

  const domainesOptions = [
    { value: 'environnement', label: 'Environnement', icon: '🌱' },
    { value: 'education', label: 'Éducation', icon: '📚' },
    { value: 'sante', label: 'Santé', icon: '🏥' },
    { value: 'social', label: 'Social', icon: '👥' },
    { value: 'droits_humains', label: 'Droits Humains', icon: '⚖️' },
    { value: 'developpement', label: 'Développement', icon: '🌍' }
  ];

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('ecocollect_user')));
    if (id) {
      loadOng();
    }
  }, [id]);

  const loadOng = async () => {
    try {
      setLoading(true);
      const { data } = await adminService.getOng(id);
      const ong = data.ong;
      
      // Traiter les domaines d'intervention
      let domaines = [];
      if (ong.domaine_intervention) {
        if (Array.isArray(ong.domaine_intervention)) {
          domaines = ong.domaine_intervention;
        } else if (typeof ong.domaine_intervention === 'string') {
          domaines = ong.domaine_intervention.split(',').map(d => d.trim());
        }
      }
      setSelectedDomaines(domaines);
      
      setFormData({
        nomOng: ong.nom_ong || '',
        numeroAgrement: ong.numero_agrement || '',
        domaineIntervention: ong.domaine_intervention || '',
        nomResponsable: ong.nom_responsable || '',
        email: ong.email || '',
        telephone: ong.telephone || '',
        adresse: ong.adresse || '',
        motDePasse: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Erreur lors du chargement de l\'ONG');
      navigate('/admin/ongs');
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

  const handleDomaineChange = (domaine) => {
    setSelectedDomaines(prev => {
      const newDomaines = prev.includes(domaine) 
        ? prev.filter(d => d !== domaine)
        : [...prev, domaine];
      
      // Mettre à jour le champ texte pour la compatibilité
      setFormData(prev => ({
        ...prev,
        domaineIntervention: newDomaines.join(', ')
      }));
      
      return newDomaines;
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      if (id) {
        // Pour la modification, ne pas envoyer le mot de passe
        const { motDePasse, confirmPassword, ...dataToSend } = formData;
        await adminService.updateOng(id, dataToSend);
        toast.success('ONG modifiée avec succès');
      } else {
        const { confirmPassword, ...dataToSend } = formData;
        await adminService.createOng(dataToSend);
        toast.success('ONG créée avec succès');
      }
      navigate('/admin/ongs');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title={id ? 'Modifier ONG' : 'Nouvelle ONG'} user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className=" bg-emerald-600 from-rose-600 to-rose-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin/ongs')} 
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaHandHoldingHeart className="w-8 h-8" />
                {id ? 'Modifier l\'ONG' : 'Nouvelle ONG'}
              </h1>
              <p className="text-rose-100">
                {id ? 'Modifiez les informations de l\'organisation' : 'Ajoutez une nouvelle organisation non gouvernementale à la plateforme'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          {loading && id ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaHeartbeat className="w-8 h-8 text-rose-500" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Chargement de l'ONG...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Carte d'informations générales */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-120  to-white px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6  bg-emerald-600 rounded-full"></div>
                    <FaRegBuilding className="text-emerald-600" />
                    Informations de l'organisation
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom de l'ONG */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'organisation <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaHeartbeat className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="nomOng"
                          required
                          value={formData.nomOng}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                          placeholder="Ex: Fondation pour l'Environnement"
                        />
                      </div>
                    </div>

                    {/* Numéro d'agrément */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Numéro d'agrément</label>
                      <div className="relative">
                        <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="numeroAgrement"
                          value={formData.numeroAgrement}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                          placeholder="Ex: AGRE-2024-001"
                        />
                      </div>
                    </div>

                    {/* Nom du responsable */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du responsable <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="nomResponsable"
                          required
                          value={formData.nomResponsable}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                          placeholder="contact@ong.org"
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                          placeholder="+237 77 123 45 67"
                        />
                      </div>
                    </div>



                    {/* Adresse */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                      <div className="relative">
                        <FiHome className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          name="adresse"
                          value={formData.adresse}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                          placeholder="Adresse complète du siège..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte des domaines d'intervention */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-rose-50 to-white px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-rose-500 rounded-full"></div>
                    <FiHeart className="text-rose-600" />
                    Domaines d'intervention
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {domainesOptions.map((domaine) => (
                      <label
                        key={domaine.value}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedDomaines.includes(domaine.value)
                            ? 'border-rose-500 bg-rose-50'
                            : 'border-gray-200 hover:border-rose-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedDomaines.includes(domaine.value)}
                          onChange={() => handleDomaineChange(domaine.value)}
                          className="hidden"
                        />
                        <span className="text-xl">{domaine.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{domaine.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Sélectionnez un ou plusieurs domaines d'intervention
                  </p>
                </div>
              </div>

              {/* Carte de description */}
              
              {/* Carte de sécurité (mot de passe) - uniquement pour création */}
              {!id && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-rose-50 to-white px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-1 h-6 bg-rose-500 rounded-full"></div>
                      <FiShield className="text-rose-600" />
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
                            className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
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
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
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
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                <div className="flex items-start gap-3">
                  <FiInfo className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-rose-800 mb-1">Informations importantes</h4>
                    <p className="text-xs text-rose-700">
                      {id 
                        ? 'Les champs marqués d\'un astérisque (*) sont obligatoires. Les informations de l\'ONG seront visibles par les producteurs et collecteurs.'
                        : 'L\'ONG recevra un email de confirmation avec ses identifiants de connexion. Assurez-vous que l\'adresse email est correcte.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/ongs')}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3  bg-emerald-600 from-rose-600 to-rose-700 text-white rounded-xl hover:from-rose-700 hover:to-rose-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg shadow-rose-200"
                >
                  <FiSave className="w-5 h-5" />
                  {loading ? 'Enregistrement...' : (id ? 'Mettre à jour' : 'Créer l\'ONG')}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreerOng;