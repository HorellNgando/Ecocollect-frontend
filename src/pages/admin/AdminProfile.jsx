// src/pages/admin/AdminProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import {
  FiUser, FiMail, FiPhone, FiLock, FiSave,
  FiEdit2, FiX, FiCheck, FiAlertCircle,
  FiUserCheck, FiBriefcase, FiCalendar,
  FiShield, FiEye, FiEyeOff
} from 'react-icons/fi';
import { FaRegBuilding } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confirmMotDePasse: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user') || '{}');
    setUser(userData);
    setFormData({
      nomComplet: userData.nomComplet || '',
      email: userData.email || '',
      telephone: userData.telephone || '',
      motDePasse: '',
      confirmMotDePasse: ''
    });
    setLoading(false);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomComplet.trim()) {
      newErrors.nomComplet = 'Le nom complet est requis';
    } else if (formData.nomComplet.length < 3) {
      newErrors.nomComplet = 'Le nom doit contenir au moins 3 caractères';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (formData.telephone && !/^[0-9+\-\s]{8,}$/.test(formData.telephone)) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }

    if (formData.motDePasse) {
      if (formData.motDePasse.length < 6) {
        newErrors.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      if (formData.motDePasse !== formData.confirmMotDePasse) {
        newErrors.confirmMotDePasse = 'Les mots de passe ne correspondent pas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setUpdating(true);
    
    try {
      // Préparer les données à envoyer
      const updateData = {
        nomComplet: formData.nomComplet,
        email: formData.email,
        telephone: formData.telephone || null
      };
      
      // Ajouter le mot de passe seulement s'il est fourni
      if (formData.motDePasse) {
        updateData.motDePasse = formData.motDePasse;
      }

      const response = await adminService.updateProfile(updateData);
      
      if (response.success) {
        // Mettre à jour les données utilisateur dans localStorage
        const updatedUser = {
          ...user,
          nomComplet: response.admin.nomComplet,
          email: response.admin.email,
          telephone: response.admin.telephone
        };
        localStorage.setItem('ecocollect_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        // Réinitialiser le formulaire
        setFormData(prev => ({
          ...prev,
          motDePasse: '',
          confirmMotDePasse: ''
        }));
        
        setEditMode(false);
        toast.success('Profil mis à jour avec succès');
        
        // Optionnel: rafraîchir la page ou rediriger
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    // Réinitialiser le formulaire avec les données actuelles
    setFormData({
      nomComplet: user?.nomComplet || '',
      email: user?.email || '',
      telephone: user?.telephone || '',
      motDePasse: '',
      confirmMotDePasse: ''
    });
    setErrors({});
    setEditMode(false);
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    if (!dateString) return 'Non disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <AdminLayout title="Mon profil">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement du profil...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Mon profil" user={user}>
      <div className="max-w-4xl mx-auto">
        {/* Carte de profil */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* En-tête avec gradient */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <FiUser className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{user?.nomComplet || 'Administrateur'}</h1>
                <p className="text-emerald-100 flex items-center gap-2 mt-1">
                  <FiShield className="w-4 h-4" />
                  {user?.role === 'super_admin' ? 'Super Administrateur' : 'Administrateur'}
                </p>
              </div>
            </div>
          </div>

          {/* Contenu du profil */}
          <div className="p-6">
            {/* Bouton d'édition */}
            {!editMode && (
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Modifier le profil
                </button>
              </div>
            )}

            {/* Formulaire ou vue */}
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom complet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="nomComplet"
                      value={formData.nomComplet}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                        errors.nomComplet ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  {errors.nomComplet && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.nomComplet}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="votre@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                        errors.telephone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+237 6XX XXX XXX"
                    />
                  </div>
                  {errors.telephone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.telephone}
                    </p>
                  )}
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="motDePasse"
                      value={formData.motDePasse}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                      placeholder="Laisser vide pour ne pas changer"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum 6 caractères. Laissez vide pour conserver votre mot de passe actuel.
                  </p>
                  {errors.motDePasse && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.motDePasse}
                    </p>
                  )}
                </div>

                {/* Confirmation mot de passe */}
                {formData.motDePasse && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmMotDePasse"
                        value={formData.confirmMotDePasse}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                          errors.confirmMotDePasse ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Confirmer le nouveau mot de passe"
                      />
                    </div>
                    {errors.confirmMotDePasse && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.confirmMotDePasse}
                      </p>
                    )}
                  </div>
                )}

                {/* Boutons d'action */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-5 h-5" />
                        Enregistrer les modifications
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              // Vue des informations
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nom complet */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <FiUser className="w-4 h-4" />
                      <span className="text-sm">Nom complet</span>
                    </div>
                    <p className="text-gray-900 font-medium">{user?.nomComplet || 'Non renseigné'}</p>
                  </div>

                  {/* Email */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <FiMail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </div>
                    <p className="text-gray-900 font-medium">{user?.email || 'Non renseigné'}</p>
                  </div>

                  {/* Téléphone */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <FiPhone className="w-4 h-4" />
                      <span className="text-sm">Téléphone</span>
                    </div>
                    <p className="text-gray-900 font-medium">{user?.telephone || 'Non renseigné'}</p>
                  </div>

                  {/* Rôle */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <FiShield className="w-4 h-4" />
                      <span className="text-sm">Rôle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user?.role === 'super_admin' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {user?.role === 'super_admin' ? 'Super Administrateur' : 'Administrateur'}
                      </div>
                    </div>
                  </div>

                  {/* Date de création */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <FiCalendar className="w-4 h-4" />
                      <span className="text-sm">Membre depuis</span>
                    </div>
                    <p className="text-gray-900 font-medium">{formatDate(user?.cree_le)}</p>
                  </div>

                  {/* Dernière connexion */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <FiUserCheck className="w-4 h-4" />
                      <span className="text-sm">Dernière connexion</span>
                    </div>
                    <p className="text-gray-900 font-medium">{formatDate(user?.derniere_connexion)}</p>
                  </div>
                </div>

                {/* Note de sécurité */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <FiShield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Sécurité du compte</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Pour des raisons de sécurité, nous vous recommandons de changer régulièrement votre mot de passe.
                        Contactez l'administrateur système pour toute modification des permissions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;