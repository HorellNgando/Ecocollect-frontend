// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { 
//   FiSave, FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, 
//   FiLock, FiInfo, FiAlertCircle, FiCheckCircle, FiEye, 
//   FiEyeOff, FiHelpCircle, FiShield, FiBriefcase, FiGlobe,
//   FiHome, FiFileText, FiAward, FiTruck
// } from 'react-icons/fi';
// import { FaRecycle, FaBuilding, FaIndustry, FaRegBuilding } from 'react-icons/fa';
// import toast from 'react-hot-toast';
// import adminService from '../../services/adminService';
// import AdminLayout from '../../components/AdminLayout';

// const CreerRecycleur = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [formData, setFormData] = useState({
//     nom_entreprise: '',
//     email: '',
//     telephone: '',
//     adresse: '',
//     zone: '',
//     siret: '',
//     capacite_traitement: '',
//     types_dechets: [],
//     certifications: [],
//     site_web: '',
//     motDePasse: '',
//     confirmPassword: ''
//   });

//   const typesDechetsOptions = [
//     { value: 'plastique', label: 'Plastique', icon: '🥤' },
//     { value: 'papier', label: 'Papier/Carton', icon: '📦' },
//     { value: 'metal', label: 'Métal', icon: '🥫' },
//     { value: 'verre', label: 'Verre', icon: '🥃' },
//     { value: 'organique', label: 'Organique', icon: '🌱' },
//     { value: 'electronique', label: 'Électronique', icon: '💻' }
//   ];

//   const certificationsOptions = [
//     { value: 'iso_14001', label: 'ISO 14001' },
//     { value: 'iso_9001', label: 'ISO 9001' },
//     { value: 'ecocert', label: 'Ecocert' },
//     { value: 'qualirecyclage', label: 'QualiRecyclage' }
//   ];

//   useEffect(() => {
//     setUser(JSON.parse(localStorage.getItem('ecocollect_user')));
//     if (id) {
//       loadRecycleur();
//     }
//   }, [id]);

//   const loadRecycleur = async () => {
//     try {
//       setLoading(true);
//       const response = await adminService.getRecycleurById(id);
//       const recycleur = response.recycleur;
//       setFormData({
//         nom_entreprise: recycleur.nom_entreprise || '',
//         email: recycleur.email || '',
//         telephone: recycleur.telephone || '',
//         adresse: recycleur.adresse || '',
//         zone: recycleur.zone || '',
//         siret: recycleur.siret || '',
//         capacite_traitement: recycleur.capacite_traitement || '',
//         types_dechets: recycleur.types_dechets || [],
//         certifications: recycleur.certifications || [],
//         site_web: recycleur.site_web || '',
//         motDePasse: '',
//         confirmPassword: ''
//       });
//       setSelectedTypes(recycleur.types_dechets || []);
//     } catch (error) {
//       toast.error('Erreur lors du chargement du recycleur');
//       navigate('/admin/recycleurs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Évaluer la force du mot de passe
//     if (name === 'motDePasse') {
//       calculatePasswordStrength(value);
//     }
//   };

//   const handleTypeChange = (type) => {
//     setSelectedTypes(prev => {
//       const newTypes = prev.includes(type) 
//         ? prev.filter(t => t !== type)
//         : [...prev, type];
//       setFormData({ ...formData, types_dechets: newTypes });
//       return newTypes;
//     });
//   };

//   const handleCertificationChange = (cert) => {
//     setFormData(prev => {
//       const newCerts = prev.certifications.includes(cert)
//         ? prev.certifications.filter(c => c !== cert)
//         : [...prev.certifications, cert];
//       return { ...prev, certifications: newCerts };
//     });
//   };

//   const calculatePasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 8) strength += 25;
//     if (password.match(/[a-z]+/)) strength += 25;
//     if (password.match(/[A-Z]+/)) strength += 25;
//     if (password.match(/[0-9]+/)) strength += 25;
//     if (password.match(/[$@#&!]+/)) strength += 25;
//     setPasswordStrength(Math.min(strength, 100));
//   };

//   const getPasswordStrengthColor = () => {
//     if (passwordStrength < 50) return 'bg-red-500';
//     if (passwordStrength < 75) return 'bg-yellow-500';
//     return 'bg-green-500';
//   };

//   const getPasswordStrengthText = () => {
//     if (passwordStrength < 50) return 'Faible';
//     if (passwordStrength < 75) return 'Moyen';
//     return 'Fort';
//   };

//   const validateForm = () => {
//     if (!id && formData.motDePasse !== formData.confirmPassword) {
//       toast.error('Les mots de passe ne correspondent pas');
//       return false;
//     }
//     if (!id && formData.motDePasse.length < 8) {
//       toast.error('Le mot de passe doit contenir au moins 8 caractères');
//       return false;
//     }
//     if (formData.capacite_traitement && parseFloat(formData.capacite_traitement) <= 0) {
//       toast.error('La capacité de traitement doit être positive');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       if (id) {
//         const { motDePasse, confirmPassword, ...dataToSend } = formData;
//         const response = await adminService.updateRecycleur(id, dataToSend);
//         if (response.success) {
//           toast.success('Recycleur modifié avec succès');
//           navigate('/admin/recycleurs');
//         }
//       } else {
//         const { confirmPassword, ...dataToSend } = formData;
//         const response = await adminService.createRecycleur(dataToSend);
//         if (response.success) {
//           toast.success('Recycleur créé avec succès');
//           navigate('/admin/recycleurs');
//         }
//       }
//     } catch (error) {
//       console.error('Erreur:', error);
//       toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminLayout title={id ? 'Modifier le recycleur' : 'Nouveau recycleur'} user={user}>
//       <div className="p-6 bg-gray-50 min-h-screen">
//         {/* En-tête avec gradient */}
//         <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => navigate('/admin/recycleurs')} 
//               className="p-2 hover:bg-white/20 rounded-xl transition-colors"
//             >
//               <FiArrowLeft className="w-6 h-6" />
//             </button>
//             <div>
//               <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
//                 <FaRecycle className="w-8 h-8" />
//                 {id ? 'Modifier le recycleur' : 'Nouveau recycleur'}
//               </h1>
//               <p className="text-emerald-100">
//                 {id ? 'Modifiez les informations de l\'entreprise de recyclage' : 'Ajoutez une nouvelle entreprise de recyclage à la plateforme'}
//               </p>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
//           {loading && id ? (
//             <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//               <div className="relative mx-auto w-20 h-20">
//                 <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <FaRecycle className="w-8 h-8 text-emerald-500" />
//                 </div>
//               </div>
//               <p className="mt-4 text-gray-600 font-medium">Chargement du recycleur...</p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {/* Carte d'informations de l'entreprise */}
//               <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-4 border-b border-gray-100">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
//                     <FaBuilding className="text-emerald-600" />
//                     Informations de l'entreprise
//                   </h3>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Nom de l'entreprise */}
//                     <div className="col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Nom de l'entreprise <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FaIndustry className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="text"
//                           name="nom_entreprise"
//                           required
//                           value={formData.nom_entreprise}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                           placeholder="Ex: EcoRecycle SA"
//                         />
//                       </div>
//                     </div>

//                     {/* SIRET */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Numéro SIRET</label>
//                       <div className="relative">
//                         <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="text"
//                           name="siret"
//                           value={formData.siret}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                           placeholder="123 456 789 00012"
//                         />
//                       </div>
//                     </div>

//                     {/* Capacité de traitement */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Capacité de traitement (tonnes/mois)</label>
//                       <div className="relative">
//                         <FiTruck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="number"
//                           name="capacite_traitement"
//                           value={formData.capacite_traitement}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                           placeholder="Ex: 1000"
//                           min="0"
//                           step="1"
//                         />
//                       </div>
//                     </div>

//                     {/* Email */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="email"
//                           name="email"
//                           required
//                           value={formData.email}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                           placeholder="contact@entreprise.com"
//                         />
//                       </div>
//                     </div>

//                     {/* Téléphone */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Téléphone <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="tel"
//                           name="telephone"
//                           required
//                           value={formData.telephone}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                           placeholder="+221 77 123 45 67"
//                         />
//                       </div>
//                     </div>

//                     {/* Site web */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Site web</label>
//                       <div className="relative">
//                         <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="url"
//                           name="site_web"
//                           value={formData.site_web}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                           placeholder="https://www.entreprise.com"
//                         />
//                       </div>
//                     </div>

//                     {/* Zone */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Zone d'activité</label>
//                       <div className="relative">
//                         <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <select
//                           name="zone"
//                           value={formData.zone}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
//                         >
//                           <option value="">Sélectionner une zone</option>
//                          <option value="Douala">Douala</option>
//                           <option value="Yaounde">Yaounde</option>
//                           <option value="Kribi">Kribi</option>
//                           <option value="Buea">Buea</option>
//                           <option value="Limbe">Limbe</option>
//                           <option value="Garoua">Garoua</option>
//                           <option value="Foumban">Foumabn</option>
//                           <option value="Bafoussam">Bafoussam</option>
//                           <option value="Guédiawaye">Ebolowa</option>
//                           <option value="Maroua">Maroua</option>
//                           <option value="Bamenda">Bamenda</option>
//                           <option value="Ngaoundere">Ngaoundere</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* Adresse */}
//                     <div className="col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Adresse complète</label>
//                       <div className="relative">
//                         <FiHome className="absolute left-3 top-3 text-gray-400" />
//                         <textarea
//                           name="adresse"
//                           rows="3"
//                           value={formData.adresse}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                           placeholder="Adresse complète de l'entreprise..."
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Carte des types de déchets */}
//               <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-4 border-b border-gray-100">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
//                     <FaRecycle className="text-emerald-600" />
//                     Types de déchets traités
//                   </h3>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                     {typesDechetsOptions.map((type) => (
//                       <label
//                         key={type.value}
//                         className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
//                           selectedTypes.includes(type.value)
//                             ? 'border-emerald-500 bg-emerald-50'
//                             : 'border-gray-200 hover:border-emerald-200'
//                         }`}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selectedTypes.includes(type.value)}
//                           onChange={() => handleTypeChange(type.value)}
//                           className="hidden"
//                         />
//                         <span className="text-xl">{type.icon}</span>
//                         <span className="text-sm font-medium text-gray-700">{type.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Carte des certifications */}
//               <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-4 border-b border-gray-100">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
//                     <FiAward className="text-emerald-600" />
//                     Certifications
//                   </h3>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="grid grid-cols-2 gap-3">
//                     {certificationsOptions.map((cert) => (
//                       <label
//                         key={cert.value}
//                         className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
//                           formData.certifications.includes(cert.value)
//                             ? 'border-emerald-500 bg-emerald-50'
//                             : 'border-gray-200 hover:border-emerald-200'
//                         }`}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={formData.certifications.includes(cert.value)}
//                           onChange={() => handleCertificationChange(cert.value)}
//                           className="hidden"
//                         />
//                         <FiCheckCircle className={`w-5 h-5 ${
//                           formData.certifications.includes(cert.value)
//                             ? 'text-emerald-500'
//                             : 'text-gray-300'
//                         }`} />
//                         <span className="text-sm font-medium text-gray-700">{cert.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Carte de sécurité (mot de passe) - uniquement pour création */}
//               {!id && (
//                 <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                   <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-4 border-b border-gray-100">
//                     <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
//                       <FiShield className="text-emerald-600" />
//                       Sécurité du compte
//                     </h3>
//                   </div>
                  
//                   <div className="p-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {/* Mot de passe */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Mot de passe <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                           <input
//                             type={showPassword ? "text" : "password"}
//                             name="motDePasse"
//                             required={!id}
//                             value={formData.motDePasse}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                             placeholder="••••••••"
//                             minLength={8}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                           >
//                             {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
//                           </button>
//                         </div>
                        
//                         {/* Indicateur de force du mot de passe */}
//                         {formData.motDePasse && (
//                           <div className="mt-2">
//                             <div className="flex items-center justify-between mb-1">
//                               <span className="text-xs text-gray-500">Force du mot de passe</span>
//                               <span className={`text-xs font-medium ${
//                                 passwordStrength < 50 ? 'text-red-600' : 
//                                 passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'
//                               }`}>
//                                 {getPasswordStrengthText()}
//                               </span>
//                             </div>
//                             <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                               <div 
//                                 className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
//                                 style={{ width: `${passwordStrength}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                         )}
//                       </div>

//                       {/* Confirmation du mot de passe */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Confirmer le mot de passe <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                           <input
//                             type="password"
//                             name="confirmPassword"
//                             required={!id}
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                             placeholder="••••••••"
//                           />
//                         </div>
//                         {formData.confirmPassword && formData.motDePasse !== formData.confirmPassword && (
//                           <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
//                             <FiAlertCircle className="w-3 h-3" />
//                             Les mots de passe ne correspondent pas
//                           </p>
//                         )}
//                         {formData.confirmPassword && formData.motDePasse === formData.confirmPassword && (
//                           <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
//                             <FiCheckCircle className="w-3 h-3" />
//                             Les mots de passe correspondent
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Aide et informations */}
//               <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
//                 <div className="flex items-start gap-3">
//                   <FiInfo className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="text-sm font-medium text-emerald-800 mb-1">Informations importantes</h4>
//                     <p className="text-xs text-emerald-700">
//                       {id 
//                         ? 'Les champs marqués d\'un astérisque (*) sont obligatoires. Les informations de l\'entreprise seront visibles par les producteurs.'
//                         : 'Le recycleur recevra un email de confirmation avec ses identifiants de connexion. Assurez-vous que l\'adresse email est correcte.'
//                       }
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Boutons d'action */}
//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => navigate('/admin/recycleurs')}
//                   className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg shadow-emerald-200"
//                 >
//                   <FiSave className="w-5 h-5" />
//                   {loading ? 'Enregistrement...' : (id ? 'Mettre à jour' : 'Créer le recycleur')}
//                 </button>
//               </div>
//             </div>
//           )}
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default CreerRecycleur;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FiSave, FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, 
  FiLock, FiInfo, FiAlertCircle, FiCheckCircle, FiEye, 
  FiEyeOff, FiShield, FiGlobe, FiHome, FiUpload, FiX
} from 'react-icons/fi';
import { FaRecycle, FaIdCard } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminLayout from '../../components/AdminLayout';

const CreerRecycleur = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    nomEntreprise: '',      // Nom de l'entreprise
    nomResponsable: '',     // Nom du responsable (AJOUTÉ)
    email: '',
    telephone: '',
    adresse: '',
    quartier: '',
    commune: '',
    numeroIdentite: '',
    motDePasse: '',
    confirmPassword: ''
  });

  const [files, setFiles] = useState({
    photoProfil: null,
    photoCniRecto: null,
    photoCniVerso: null,
  });

  const [previews, setPreviews] = useState({
    photoProfil: null,
    photoCniRecto: null,
    photoCniVerso: null,
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('ecocollect_user')));
    if (id) {
      loadRecycleur();
    }
  }, [id]);

  const loadRecycleur = async () => {
    try {
      setLoading(true);
      const response = await adminService.getRecycleurById(id);
      const recycleur = response.recycleur;
      setFormData({
        nomEntreprise: recycleur.nomEntreprise || '',
        nomResponsable: recycleur.nomResponsable || '',  // AJOUTÉ
        email: recycleur.email || '',
        telephone: recycleur.telephone || '',
        adresse: recycleur.adresse || '',
        quartier: recycleur.quartier || '',
        commune: recycleur.commune || '',
        numeroIdentite: recycleur.numeroIdentite || '',
        motDePasse: '',
        confirmPassword: ''
      });
      if (recycleur.photoProfil) setPreviews(prev => ({ ...prev, photoProfil: recycleur.photoProfil }));
      if (recycleur.photoCniRecto) setPreviews(prev => ({ ...prev, photoCniRecto: recycleur.photoCniRecto }));
      if (recycleur.photoCniVerso) setPreviews(prev => ({ ...prev, photoCniVerso: recycleur.photoCniVerso }));
    } catch (error) {
      toast.error('Erreur lors du chargement du recycleur');
      navigate('/admin/recycleurs');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'motDePasse') {
      calculatePasswordStrength(value);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [field]: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (field) => {
    setFiles(prev => ({ ...prev, [field]: null }));
    setPreviews(prev => ({ ...prev, [field]: null }));
    const input = document.getElementById(field);
    if (input) input.value = '';
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
    // Vérifier tous les champs obligatoires selon le backend
    if (!formData.nomEntreprise) {
      toast.error('Le nom de l\'entreprise est requis');
      return false;
    }
    if (!formData.nomResponsable) {
      toast.error('Le nom du responsable est requis');
      return false;
    }
    if (!formData.email) {
      toast.error('L\'email est requis');
      return false;
    }
    if (!formData.telephone) {
      toast.error('Le téléphone est requis');
      return false;
    }

    if (!id && formData.motDePasse !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return false;
    }
    
    if (!id && formData.motDePasse.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }

    if (!id && (!files.photoCniRecto || !files.photoCniVerso)) {
      toast.error('Les photos recto et verso de la CNI sont requises');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      
      // Ajouter tous les champs texte (CORRIGÉ)
      formDataToSend.append('nomEntreprise', formData.nomEntreprise);
      formDataToSend.append('nomResponsable', formData.nomResponsable); // AJOUTÉ
      formDataToSend.append('email', formData.email);
      formDataToSend.append('telephone', formData.telephone);
      formDataToSend.append('adresse', formData.adresse || '');
      formDataToSend.append('quartier', formData.quartier || '');
      formDataToSend.append('commune', formData.commune || '');
      formDataToSend.append('numeroIdentite', formData.numeroIdentite || '');
      
      if (!id) {
        formDataToSend.append('motDePasse', formData.motDePasse);
      }

      // Ajouter les fichiers
      if (files.photoProfil) {
        formDataToSend.append('photoProfil', files.photoProfil);
      }
      if (files.photoCniRecto) {
        formDataToSend.append('photoCniRecto', files.photoCniRecto);
      }
      if (files.photoCniVerso) {
        formDataToSend.append('photoCniVerso', files.photoCniVerso);
      }

      let response;
      if (id) {
        response = await adminService.updateRecycleur(id, formDataToSend);
        if (response.success) {
          toast.success('Recycleur modifié avec succès');
          navigate('/admin/recycleurs');
        }
      } else {
        response = await adminService.creerRecycleur(formDataToSend);
        if (response.success) {
          toast.success('Recycleur créé avec succès');
          navigate('/admin/recycleurs');
        }
      }
    } catch (error) {
      console.error('Erreur détaillée:', error);
      // Afficher le message d'erreur du backend
      const errorMessage = error.response?.data?.message || 'Erreur lors de l\'enregistrement';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title={id ? 'Modifier le recycleur' : 'Nouveau recycleur'} user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin/recycleurs')} 
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaRecycle className="w-8 h-8" />
                {id ? 'Modifier le recycleur' : 'Nouveau recycleur'}
              </h1>
              <p className="text-emerald-100">
                {id ? 'Modifiez les informations du recycleur' : 'Ajoutez un nouveau recycleur à la plateforme'}
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
                  <FaRecycle className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Chargement du recycleur...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Carte d'informations */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                    <FiUser className="text-emerald-600" />
                    Informations du recycleur
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom de l'entreprise */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'entreprise <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaRecycle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="nomEntreprise"
                          required
                          value={formData.nomEntreprise}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="EcoRecycle SA"
                        />
                      </div>
                    </div>

                    {/* Nom du responsable - AJOUTÉ */}
                    <div className="col-span-2">
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Nom complet du responsable de l'entreprise</p>
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
                          placeholder="contact@entreprise.com"
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
                          placeholder="+237 6XX XX XX XX"
                        />
                      </div>
                    </div>

                    {/* Numéro d'identité */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Numéro d'identité</label>
                      <div className="relative">
                        <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="numeroIdentite"
                          value={formData.numeroIdentite}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="N° CNI ou passeport"
                        />
                      </div>
                    </div>

                    {/* Commune */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Commune</label>
                      <div className="relative">
                        <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="commune"
                          value={formData.commune}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                        >
                          <option value="">Sélectionner une commune</option>
                          <option value="Douala">Douala</option>
                          <option value="Yaounde">Yaounde</option>
                          <option value="Kribi">Kribi</option>
                          <option value="Buea">Buea</option>
                          <option value="Limbe">Limbe</option>
                          <option value="Garoua">Garoua</option>
                          <option value="Bafoussam">Bafoussam</option>
                          <option value="Ebolowa">Ebolowa</option>
                          <option value="Maroua">Maroua</option>
                          <option value="Bamenda">Bamenda</option>
                          <option value="Ngaoundere">Ngaoundere</option>
                        </select>
                      </div>
                    </div>

                    {/* Quartier */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quartier</label>
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="quartier"
                          value={formData.quartier}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="Centre-ville"
                        />
                      </div>
                    </div>

                    {/* Adresse */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adresse complète</label>
                      <div className="relative">
                        <FiHome className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          name="adresse"
                          rows="2"
                          value={formData.adresse}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="Adresse complète de l'entreprise..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte des documents - reste identique */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                    <FaIdCard className="text-emerald-600" />
                    Documents d'identification
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Photos requises pour l'identification</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Photo de profil */}
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Photo de profil</label>
                      <div 
                        className={`relative w-full aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${
                          previews.photoProfil ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
                        }`}
                        onClick={() => document.getElementById('photoProfil').click()}
                      >
                        {previews.photoProfil ? (
                          <>
                            <img src={previews.photoProfil} alt="Profil" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile('photoProfil');
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500">Cliquez pour uploader</span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        id="photoProfil"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'photoProfil')}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500 mt-2">Optionnel</p>
                    </div>

                    {/* CNI Recto */}
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNI Recto <span className="text-red-500">*</span>
                      </label>
                      <div 
                        className={`relative w-full aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${
                          previews.photoCniRecto ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
                        }`}
                        onClick={() => document.getElementById('photoCniRecto').click()}
                      >
                        {previews.photoCniRecto ? (
                          <>
                            <img src={previews.photoCniRecto} alt="CNI Recto" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile('photoCniRecto');
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500">Cliquez pour uploader</span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        id="photoCniRecto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'photoCniRecto')}
                        className="hidden"
                        required={!id}
                      />
                      <p className="text-xs text-gray-500 mt-2">Recto de la CNI</p>
                    </div>

                    {/* CNI Verso */}
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNI Verso <span className="text-red-500">*</span>
                      </label>
                      <div 
                        className={`relative w-full aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${
                          previews.photoCniVerso ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
                        }`}
                        onClick={() => document.getElementById('photoCniVerso').click()}
                      >
                        {previews.photoCniVerso ? (
                          <>
                            <img src={previews.photoCniVerso} alt="CNI Verso" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile('photoCniVerso');
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500">Cliquez pour uploader</span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        id="photoCniVerso"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'photoCniVerso')}
                        className="hidden"
                        required={!id}
                      />
                      <p className="text-xs text-gray-500 mt-2">Verso de la CNI</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte de sécurité - reste identique */}
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de passe <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="motDePasse"
                            required
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

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le mot de passe <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="password"
                            name="confirmPassword"
                            required
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
                        ? 'Les champs marqués d\'un astérisque (*) sont obligatoires.'
                        : 'Le recycleur recevra un email de confirmation avec ses identifiants de connexion. Les photos de la CNI sont obligatoires pour l\'identification.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/recycleurs')}
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
                  {loading ? 'Enregistrement...' : (id ? 'Mettre à jour' : 'Créer le recycleur')}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreerRecycleur;