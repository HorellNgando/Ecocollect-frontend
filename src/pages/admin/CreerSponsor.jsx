import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FiSave, FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, 
  FiLock, FiInfo, FiAlertCircle, FiCheckCircle, FiEye, 
  FiEyeOff, FiHelpCircle, FiShield, FiBriefcase, FiGlobe,
  FiHome, FiFileText, FiAward, FiDollarSign, FiImage,
  FiUpload, FiX, FiTag
} from 'react-icons/fi';
import { FaBuilding, FaRegBuilding, FaHandshake, FaDonate } from 'react-icons/fa';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';

const CreerSponsor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [logoPreview, setLogoPreview] = useState(null);
  const [formData, setFormData] = useState({
    nomOrganisation: '',
    typeOrganisation: 'entreprise',
    nomResponsable: '',
    email: '',
    telephone: '',
    adresse: '',
    siteWeb: '',
    secteurActivite: '',
    description: '',
    motDePasse: '',
    confirmPassword: '',
    photoLogo: null
  });

  const typesOrganisation = [
    { value: 'entreprise', label: 'Entreprise', icon: '🏢' },
    { value: 'association', label: 'Association', icon: '🤝' },
    { value: 'fondation', label: 'Fondation', icon: '🏛️' },
    { value: 'institution', label: 'Institution', icon: '🏛️' },
    { value: 'autre', label: 'Autre', icon: '📌' }
  ];

  const secteursActivite = [
    'Technologie', 'Finance', 'Industrie', 'Commerce', 'Services',
    'Environnement', 'Éducation', 'Santé', 'Agriculture', 'Énergie',
    'Transport', 'Médias', 'Télécommunications', 'Autre'
  ];

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('ecocollect_user')));
    if (id) {
      loadSponsor();
    }
  }, [id]);

  const loadSponsor = async () => {
    try {
      setLoading(true);
      const { data } = await adminService.getSponsor(id);
      const sponsor = data.sponsor;
      setFormData({
        nomOrganisation: sponsor.nom_organisation || '',
        typeOrganisation: sponsor.type_organisation || 'entreprise',
        nomResponsable: sponsor.nom_responsable || '',
        email: sponsor.email || '',
        telephone: sponsor.telephone || '',
        adresse: sponsor.adresse || '',
        siteWeb: sponsor.site_web || '',
        secteurActivite: sponsor.secteur_activite || '',
        description: sponsor.description || '',
        motDePasse: '',
        confirmPassword: '',
        photoLogo: null
      });
      
      // Si un logo existe, afficher un placeholder
      if (sponsor.logo_url) {
        setLogoPreview(sponsor.logo_url);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement du sponsor');
      navigate('/admin/sponsors');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photoLogo') {
      const file = files[0];
      setFormData({ ...formData, photoLogo: file });
      
      // Créer une prévisualisation
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Évaluer la force du mot de passe
    if (name === 'motDePasse') {
      calculatePasswordStrength(value);
    }
  };

  const removeLogo = () => {
    setFormData({ ...formData, photoLogo: null });
    setLogoPreview(null);
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
      
      // Créer un FormData pour gérer l'upload de fichier
      const submitData = new FormData();
      submitData.append('nomOrganisation', formData.nomOrganisation);
      submitData.append('typeOrganisation', formData.typeOrganisation);
      submitData.append('nomResponsable', formData.nomResponsable);
      submitData.append('email', formData.email);
      submitData.append('telephone', formData.telephone);
      submitData.append('adresse', formData.adresse || '');
      submitData.append('siteWeb', formData.siteWeb || '');
      submitData.append('secteurActivite', formData.secteurActivite || '');
      submitData.append('description', formData.description || '');
      
      if (!id && formData.motDePasse) {
        submitData.append('motDePasse', formData.motDePasse);
      }
      
      if (formData.photoLogo) {
        submitData.append('photoLogo', formData.photoLogo);
      }

      if (id) {
        await adminService.updateSponsor(id, submitData);
        toast.success('Sponsor modifié avec succès');
      } else {
        await adminService.createSponsor(submitData);
        toast.success('Sponsor créé avec succès');
      }
      navigate('/admin/sponsors');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title={id ? 'Modifier sponsor' : 'Nouveau sponsor'} user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-emerald-600 from-amber-600 to-amber-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin/sponsors')} 
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaHandshake className="w-8 h-8" />
                {id ? 'Modifier le sponsor' : 'Nouveau sponsor'}
              </h1>
              <p className="text-amber-100">
                {id ? 'Modifiez les informations du partenaire' : 'Ajoutez un nouveau partenaire ou sponsor à la plateforme'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto" encType="multipart/form-data">
          {loading && id ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaHandshake className="w-8 h-8 text-amber-500" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Chargement du sponsor...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Carte du logo */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-emerald-600 from-amber-50 to-white px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
                    <FiImage className="text-amber-600" />
                    Logo du sponsor
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center">
                    {logoPreview ? (
                      <div className="relative mb-4">
                        <img 
                          src={logoPreview} 
                          alt="Logo preview" 
                          className="w-32 h-32 object-contain rounded-xl border-2 border-gray-200 p-2"
                        />
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
                        <FiImage className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="relative">
                      <input
                        type="file"
                        name="photoLogo"
                        id="logo-upload"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400 text-white rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer"
                      >
                        <FiUpload className="w-4 h-4" />
                        {logoPreview ? 'Changer le logo' : 'Télécharger un logo'}
                      </label>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Format recommandé : JPG, PNG. Taille max : 2 Mo
                    </p>
                  </div>
                </div>
              </div>

              {/* Carte d'informations générales */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-white px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
                    <FaBuilding className="text-amber-600" />
                    Informations de l'organisation
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom de l'organisation */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'organisation <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="nomOrganisation"
                          required
                          value={formData.nomOrganisation}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          placeholder="Ex: Fondation EcoPartners"
                        />
                      </div>
                    </div>

                    {/* Type d'organisation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type d'organisation <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                        <select
                          name="typeOrganisation"
                          value={formData.typeOrganisation}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none bg-white"
                        >
                          {typesOrganisation.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.icon} {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Secteur d'activité */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
                      <div className="relative">
                        <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="secteurActivite"
                          value={formData.secteurActivite}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none bg-white"
                        >
                          <option value="">Sélectionner un secteur</option>
                          {secteursActivite.map(secteur => (
                            <option key={secteur} value={secteur}>{secteur}</option>
                          ))}
                        </select>
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          placeholder="contact@organisation.com"
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          placeholder="Adresse complète du siège..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte de description */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-white px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
                    <FiInfo className="text-amber-600" />
                    Description et informations complémentaires
                  </h3>
                </div>
                
                <div className="p-6">
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Décrivez brièvement les activités et missions du sponsor..."
                  />
                </div>
              </div>

              {/* Carte de sécurité (mot de passe) - uniquement pour création */}
              {!id && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-50 to-white px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
                      <FiShield className="text-amber-600" />
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
                            className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
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
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
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
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-start gap-3">
                  <FiInfo className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800 mb-1">Informations importantes</h4>
                    <p className="text-xs text-amber-700">
                      {id 
                        ? 'Les champs marqués d\'un astérisque (*) sont obligatoires. Le logo peut être modifié si nécessaire.'
                        : 'Le sponsor recevra un email de confirmation avec ses identifiants de connexion. Le logo sera affiché sur son profil public.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/sponsors')}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-emerald-600 from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg shadow-amber-200"
                >
                  <FiSave className="w-5 h-5" />
                  {loading ? 'Enregistrement...' : (id ? 'Mettre à jour' : 'Créer le sponsor')}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreerSponsor;