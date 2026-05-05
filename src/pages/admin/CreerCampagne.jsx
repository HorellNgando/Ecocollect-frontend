// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { 
//   FiSave, FiArrowLeft, FiCalendar, FiMapPin, FiFileText,
//   FiInfo, FiAlertCircle, FiCheckCircle, FiTrash2, FiPlus,
//   FiPackage, FiDollarSign, FiTarget, FiGlobe, FiHome,
//   FiClock, FiUsers, FiAward
// } from 'react-icons/fi';
// import { FaRecycle, FaLeaf, FaHandHoldingHeart } from 'react-icons/fa';
// import toast from 'react-hot-toast';
// import adminService from '../../services/adminService';
// import AdminLayout from '../../components/AdminLayout';

// const CreerCampagne = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   const [zonesInput, setZonesInput] = useState('');
//   const [formData, setFormData] = useState({
//     nom: '',
//     description: '',
//     dateDebut: '',
//     dateFin: '',
//     objectifs: [{ typeDechet: '', poidsAttendue: '', prixParKg: '' }],
//     zonesIntervention: []
//   });

//   const wasteTypes = [
//     { value: 'plastique_pet', label: 'Plastique PET', icon: '🥤', color: 'bg-blue-100 text-blue-800' },
//     { value: 'plastique_pehd', label: 'Plastique PEHD', icon: '🧴', color: 'bg-indigo-100 text-indigo-800' },
//     { value: 'papier_carton', label: 'Papier/Carton', icon: '📦', color: 'bg-yellow-100 text-yellow-800' },
//     { value: 'metal', label: 'Métal', icon: '🥫', color: 'bg-gray-100 text-gray-800' },
//     { value: 'verre', label: 'Verre', icon: '🥃', color: 'bg-emerald-100 text-emerald-800' },
//     { value: 'organique', label: 'Organique', icon: '🌱', color: 'bg-green-100 text-green-800' }
//   ];

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('ecocollect_user') || '{}');
//     setUser(userData);
    
//     if (id) {
//       loadCampagne();
//     }
//   }, [id]);

//   useEffect(() => {
//     // Mettre à jour l'input texte quand les zones changent
//     setZonesInput(formData.zonesIntervention.join(', '));
//   }, [formData.zonesIntervention]);

//   const loadCampagne = async () => {
//     try {
//       setLoading(true);
//       const response = await adminService.getCampagne(id);
      
//       if (response.success) {
//         const c = response.campagne;
        
//         // Transformer les types_dechets en objectifs si nécessaire
//         let objectifs = c.objectifs || [];
//         if (objectifs.length === 0 && c.types_dechets) {
//           objectifs = c.types_dechets.map((type, index) => ({
//             typeDechet: type,
//             poidsAttendue: Array.isArray(c.poids_attendue) ? c.poids_attendue[index] : c.poids_attendue,
//             prixParKg: Array.isArray(c.prix_par_kg) ? c.prix_par_kg[index] : c.prix_par_kg
//           }));
//         }

//         setFormData({
//           nom: c.nom || '',
//           description: c.description || '',
//           dateDebut: c.date_debut ? c.date_debut.slice(0, 10) : '',
//           dateFin: c.date_fin ? c.date_fin.slice(0, 10) : '',
//           objectifs: objectifs,
//           zonesIntervention: c.zones_intervention || []
//         });
//       }
//     } catch (error) {
//       console.error('Erreur chargement campagne:', error);
//       toast.error('Erreur lors du chargement de la campagne');
//       navigate('/admin/campagnes');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleObjectifChange = (index, field, value) => {
//     const nouveauxObjectifs = [...formData.objectifs];
//     nouveauxObjectifs[index][field] = value;
//     setFormData(prev => ({ ...prev, objectifs: nouveauxObjectifs }));
//   };

//   const handleAjouterObjectif = () => {
//     setFormData(prev => ({
//       ...prev,
//       objectifs: [...prev.objectifs, { typeDechet: '', poidsAttendue: '', prixParKg: '' }]
//     }));
//   };

//   const handleSupprimerObjectif = (index) => {
//     if (formData.objectifs.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         objectifs: prev.objectifs.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   const handleZoneChange = (e) => {
//     const input = e.target.value;
//     setZonesInput(input);
    
//     const zones = input.split(',').map(z => z.trim()).filter(z => z);
//     setFormData(prev => ({ ...prev, zonesIntervention: zones }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validations
//     if (!formData.nom || !formData.dateDebut || !formData.dateFin) {
//       toast.error('Veuillez remplir le nom et les dates de la campagne');
//       return;
//     }

//     if (formData.objectifs.length === 0) {
//       toast.error('Ajoutez au moins un objectif');
//       return;
//     }

//     for (const obj of formData.objectifs) {
//       if (!obj.typeDechet || !obj.poidsAttendue || !obj.prixParKg) {
//         toast.error('Tous les objectifs doivent être complets');
//         return;
//       }
//       if (parseFloat(obj.poidsAttendue) <= 0 || parseFloat(obj.prixParKg) <= 0) {
//         toast.error('Les poids et prix doivent être positifs');
//         return;
//       }
//     }

//     if (new Date(formData.dateDebut) > new Date(formData.dateFin)) {
//       toast.error('La date de début doit être antérieure à la date de fin');
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const dataToSend = {
//         ...formData,
//       };

//       if (id) {
//         const response = await adminService.updateCampagne(id, dataToSend);
//         if (response.success) {
//           toast.success('Campagne modifiée avec succès');
//           navigate('/admin/campagnes');
//         }
//       } else {
//         const response = await adminService.createCampagne(dataToSend);
//         if (response.success) {
//           toast.success('Campagne créée avec succès');
//           navigate('/admin/campagnes');
//         }
//       }
//     } catch (error) {
//       console.error('Erreur:', error);
//       toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateTotalBudget = () => {
//     return formData.objectifs.reduce((total, obj) => {
//       return total + (parseFloat(obj.poidsAttendue || 0) * parseFloat(obj.prixParKg || 0));
//     }, 0);
//   };

//   return (
//     <AdminLayout title={id ? 'Modifier la campagne' : 'Nouvelle campagne'} user={user}>
//       <div className="p-6 bg-gray-50 min-h-screen">
//         {/* En-tête avec gradient */}
//         <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => navigate('/admin/campagnes')} 
//               className="p-2 hover:bg-white/20 rounded-xl transition-colors"
//             >
//               <FiArrowLeft className="w-6 h-6" />
//             </button>
//             <div>
//               <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
//                 <FaRecycle className="w-8 h-8" />
//                 {id ? 'Modifier la campagne' : 'Nouvelle campagne'}
//               </h1>
//               <p className="text-purple-100">
//                 {id ? 'Modifiez les détails de la campagne de collecte' : 'Créez une nouvelle campagne de collecte de déchets'}
//               </p>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
//           {loading && !formData.nom && id ? (
//             <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//               <div className="relative mx-auto w-20 h-20">
//                 <div className="absolute inset-0 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <FaRecycle className="w-8 h-8 text-purple-500" />
//                 </div>
//               </div>
//               <p className="mt-4 text-gray-600 font-medium">Chargement de la campagne...</p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {/* Carte d'informations générales */}
//               <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-100">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
//                     <FiFileText className="text-purple-600" />
//                     Informations générales
//                   </h3>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="grid grid-cols-1 gap-6">
//                     {/* Nom de la campagne */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Nom de la campagne <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <FaRecycle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="text"
//                           name="nom"
//                           required
//                           value={formData.nom}
//                           onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                           placeholder="Ex: Campagne de recyclage Dakar 2024"
//                         />
//                       </div>
//                     </div>

//                     {/* Description */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                       <div className="relative">
//                         <FiInfo className="absolute left-3 top-3 text-gray-400" />
//                         <textarea
//                           name="description"
//                           rows="4"
//                           value={formData.description}
//                           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                           placeholder="Décrivez les objectifs et le contexte de cette campagne..."
//                         />
//                       </div>
//                     </div>

//                     {/* Dates */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Date de début <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                           <input
//                             type="date"
//                             name="dateDebut"
//                             required
//                             value={formData.dateDebut}
//                             onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
//                             min={new Date().toISOString().split('T')[0]}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Date de fin <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                           <input
//                             type="date"
//                             name="dateFin"
//                             required
//                             value={formData.dateFin}
//                             onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
//                             min={formData.dateDebut || new Date().toISOString().split('T')[0]}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Carte des objectifs */}
//               <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-100">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
//                     <FiTarget className="text-purple-600" />
//                     Objectifs par type de déchet <span className="text-red-500">*</span>
//                   </h3>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="space-y-4">
//                     {formData.objectifs.map((objectif, index) => (
//                       <div key={index} className="bg-gray-50 p-5 rounded-xl border border-gray-200 relative">
//                         {formData.objectifs.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => handleSupprimerObjectif(index)}
//                             className="absolute top-3 right-3 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             title="Supprimer cet objectif"
//                           >
//                             <FiTrash2 className="w-4 h-4" />
//                           </button>
//                         )}
                        
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           {/* Type de déchet */}
//                           <div>
//                             <label className="block text-xs font-medium text-gray-500 mb-1">
//                               Type de déchet
//                             </label>
//                             <select
//                               value={objectif.typeDechet}
//                               onChange={(e) => handleObjectifChange(index, 'typeDechet', e.target.value)}
//                               className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
//                               required
//                             >
//                               <option value="">Sélectionner</option>
//                               {wasteTypes.map(type => (
//                                 <option key={type.value} value={type.value}>
//                                   {type.icon} {type.label}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
                          
//                           {/* Poids attendu */}
//                           <div>
//                             <label className="block text-xs font-medium text-gray-500 mb-1">
//                               Poids attendu (kg)
//                             </label>
//                             <div className="relative">
//                               <FiPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                               <input
//                                 type="number"
//                                 placeholder="Ex: 1000"
//                                 value={objectif.poidsAttendue}
//                                 onChange={(e) => handleObjectifChange(index, 'poidsAttendue', e.target.value)}
//                                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                                 min="1"
//                                 step="0.1"
//                                 required
//                               />
//                             </div>
//                           </div>
                          
//                           {/* Prix par kg */}
//                           <div>
//                             <label className="block text-xs font-medium text-gray-500 mb-1">
//                               Prix/kg (FCFA)
//                             </label>
//                             <div className="relative">
//                               <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                               <input
//                                 type="number"
//                                 placeholder="Ex: 500"
//                                 value={objectif.prixParKg}
//                                 onChange={(e) => handleObjectifChange(index, 'prixParKg', e.target.value)}
//                                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                                 min="1"
//                                 step="1"
//                                 required
//                               />
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* Résumé de l'objectif */}
//                         {objectif.typeDechet && objectif.poidsAttendue && objectif.prixParKg && (
//                           <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
//                             <span className="text-xs text-gray-500">Budget estimé pour ce type</span>
//                             <span className="text-sm font-semibold text-purple-600">
//                               {(parseFloat(objectif.poidsAttendue) * parseFloat(objectif.prixParKg)).toLocaleString()} FCFA
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     ))}
                    
//                     <button
//                       type="button"
//                       onClick={handleAjouterObjectif}
//                       className="w-full py-4 border-2 border-dashed border-purple-200 rounded-xl text-purple-600 hover:border-purple-400 hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 font-medium"
//                     >
//                       <FiPlus className="w-5 h-5" />
//                       Ajouter un type de déchet
//                     </button>
//                   </div>

//                   {/* Résumé global */}
//                   {formData.objectifs.some(obj => obj.poidsAttendue && obj.prixParKg) && (
//                     <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <FiAward className="w-5 h-5 text-purple-600" />
//                           <span className="font-medium text-purple-900">Budget total estimé</span>
//                         </div>
//                         <span className="text-2xl font-bold text-purple-700">
//                           {calculateTotalBudget().toLocaleString()} FCFA
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Carte des zones d'intervention */}
//               <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-100">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
//                     <FiMapPin className="text-purple-600" />
//                     Zones d'intervention
//                   </h3>
//                 </div>
                
//                 <div className="p-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Communes/Localités
//                     </label>
//                     <div className="relative">
//                       <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                       <input
//                         type="text"
//                         value={zonesInput}
//                         onChange={handleZoneChange}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                         placeholder="Ex: Dakar, Pikine, Guédiawaye (séparés par des virgules)"
//                       />
//                     </div>
//                     <p className="mt-2 text-xs text-gray-500">
//                       Laissez vide si la campagne est nationale
//                     </p>
                    
//                     {/* Affichage des zones sous forme de tags */}
//                     {formData.zonesIntervention.length > 0 && (
//                       <div className="mt-4">
//                         <p className="text-xs font-medium text-gray-500 mb-2">Zones sélectionnées :</p>
//                         <div className="flex flex-wrap gap-2">
//                           {formData.zonesIntervention.map((zone, idx) => (
//                             <span key={idx} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm flex items-center gap-1">
//                               <FiMapPin className="w-3 h-3" />
//                               {zone}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Aide et informations */}
//               <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
//                 <div className="flex items-start gap-3">
//                   <FiInfo className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="text-sm font-medium text-purple-800 mb-1">Informations importantes</h4>
//                     <p className="text-xs text-purple-700">
//                       {id 
//                         ? 'Les objectifs peuvent être modifiés même après le début de la campagne. Les zones d\'intervention peuvent être étendues.'
//                         : 'Les objectifs définis permettront de calculer les budgets et de suivre la progression de la campagne. Vous pourrez ajouter des objectifs supplémentaires plus tard.'
//                       }
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Boutons d'action */}
//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => navigate('/admin/campagnes')}
//                   className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg shadow-purple-200"
//                 >
//                   <FiSave className="w-5 h-5" />
//                   {loading ? 'Enregistrement...' : (id ? 'Mettre à jour' : 'Créer la campagne')}
//                 </button>
//               </div>
//             </div>
//           )}
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default CreerCampagne;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FiSave, FiArrowLeft, FiCalendar, FiMapPin, FiFileText,
  FiInfo, FiAlertCircle, FiCheckCircle, FiTrash2, FiPlus,
  FiPackage, FiDollarSign, FiTarget, FiGlobe, FiHome,
  FiClock, FiUsers, FiAward
} from 'react-icons/fi';
import { FaRecycle, FaLeaf, FaHandHoldingHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminLayout from '../../components/AdminLayout';

const CreerCampagne = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [zonesInput, setZonesInput] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    objectifs: [{ typeDechet: '', poidsAttendue: '', prixParKg: '' }],
    zonesIntervention: []
  });

  const wasteTypes = [
    { value: 'plastique_pet', label: 'Plastique PET', icon: '🥤', color: 'bg-blue-100 text-blue-800' },
    { value: 'plastique_pehd', label: 'Plastique PEHD', icon: '🧴', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'papier_carton', label: 'Papier/Carton', icon: '📦', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'metal', label: 'Métal', icon: '🥫', color: 'bg-gray-100 text-gray-800' },
    { value: 'verre', label: 'Verre', icon: '🥃', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'organique', label: 'Organique', icon: '🌱', color: 'bg-green-100 text-green-800' }
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user') || '{}');
    setUser(userData);
    
    if (id) {
      loadCampagne();
    }
  }, [id]);

  useEffect(() => {
    setZonesInput(formData.zonesIntervention.join(', '));
  }, [formData.zonesIntervention]);

  const loadCampagne = async () => {
    try {
      setLoading(true);
      const response = await adminService.getCampagne(id);
      
      if (response.success) {
        const c = response.campagne;
        
        let objectifs = c.objectifs || [];
        if (objectifs.length === 0 && c.types_dechets) {
          objectifs = c.types_dechets.map((type, index) => ({
            typeDechet: type,
            poidsAttendue: Array.isArray(c.poids_attendue) ? c.poids_attendue[index] : c.poids_attendue,
            prixParKg: Array.isArray(c.prix_par_kg) ? c.prix_par_kg[index] : c.prix_par_kg
          }));
        }

        setFormData({
          nom: c.nom || '',
          description: c.description || '',
          dateDebut: c.date_debut ? c.date_debut.slice(0, 10) : '',
          dateFin: c.date_fin ? c.date_fin.slice(0, 10) : '',
          objectifs: objectifs,
          zonesIntervention: c.zones_intervention || []
        });
      }
    } catch (error) {
      console.error('Erreur chargement campagne:', error);
      toast.error('Erreur lors du chargement de la campagne');
      navigate('/admin/campagnes');
    } finally {
      setLoading(false);
    }
  };

  const handleObjectifChange = (index, field, value) => {
    const nouveauxObjectifs = [...formData.objectifs];
    nouveauxObjectifs[index][field] = value;
    setFormData(prev => ({ ...prev, objectifs: nouveauxObjectifs }));
  };

  const handleAjouterObjectif = () => {
    setFormData(prev => ({
      ...prev,
      objectifs: [...prev.objectifs, { typeDechet: '', poidsAttendue: '', prixParKg: '' }]
    }));
  };

  const handleSupprimerObjectif = (index) => {
    if (formData.objectifs.length > 1) {
      setFormData(prev => ({
        ...prev,
        objectifs: prev.objectifs.filter((_, i) => i !== index)
      }));
    }
  };

  const handleZoneChange = (e) => {
    const input = e.target.value;
    setZonesInput(input);
    
    const zones = input.split(',').map(z => z.trim()).filter(z => z);
    setFormData(prev => ({ ...prev, zonesIntervention: zones }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nom || !formData.dateDebut || !formData.dateFin) {
      toast.error('Veuillez remplir le nom et les dates de la campagne');
      return;
    }

    if (formData.objectifs.length === 0) {
      toast.error('Ajoutez au moins un objectif');
      return;
    }

    for (const obj of formData.objectifs) {
      if (!obj.typeDechet || !obj.poidsAttendue || !obj.prixParKg) {
        toast.error('Tous les objectifs doivent être complets');
        return;
      }
      if (parseFloat(obj.poidsAttendue) <= 0 || parseFloat(obj.prixParKg) <= 0) {
        toast.error('Les poids et prix doivent être positifs');
        return;
      }
    }

    if (new Date(formData.dateDebut) > new Date(formData.dateFin)) {
      toast.error('La date de début doit être antérieure à la date de fin');
      return;
    }

    try {
      setLoading(true);
      
      const dataToSend = {
        ...formData,
      };

      if (id) {
        const response = await adminService.updateCampagne(id, dataToSend);
        if (response.success) {
          toast.success('Campagne modifiée avec succès');
          navigate('/admin/campagnes');
        }
      } else {
        const response = await adminService.createCampagne(dataToSend);
        if (response.success) {
          toast.success('Campagne créée avec succès');
          navigate('/admin/campagnes');
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalBudget = () => {
    return formData.objectifs.reduce((total, obj) => {
      return total + (parseFloat(obj.poidsAttendue || 0) * parseFloat(obj.prixParKg || 0));
    }, 0);
  };

  return (
    <AdminLayout title={id ? 'Modifier la campagne' : 'Nouvelle campagne'} user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête - sans gradient, juste bg-emerald-600 */}
        <div className="bg-emerald-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin/campagnes')} 
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaRecycle className="w-8 h-8" />
                {id ? 'Modifier la campagne' : 'Nouvelle campagne'}
              </h1>
              <p className="text-emerald-100">
                {id ? 'Modifiez les détails de la campagne de collecte' : 'Créez une nouvelle campagne de collecte de déchets'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {loading && !formData.nom && id ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaRecycle className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Chargement de la campagne...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Carte d'informations générales */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-emerald-50 px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                    <FiFileText className="text-emerald-600" />
                    Informations générales
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Nom de la campagne */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de la campagne <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaRecycle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="nom"
                          required
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="Ex: Campagne de recyclage Dakar 2024"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <div className="relative">
                        <FiInfo className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          name="description"
                          rows="4"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          placeholder="Décrivez les objectifs et le contexte de cette campagne..."
                        />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date de début <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            name="dateDebut"
                            required
                            value={formData.dateDebut}
                            onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date de fin <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            name="dateFin"
                            required
                            value={formData.dateFin}
                            onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                            min={formData.dateDebut || new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte des objectifs */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-emerald-50 px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                    <FiTarget className="text-emerald-600" />
                    Objectifs par type de déchet <span className="text-red-500">*</span>
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {formData.objectifs.map((objectif, index) => (
                      <div key={index} className="bg-gray-50 p-5 rounded-xl border border-gray-200 relative">
                        {formData.objectifs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleSupprimerObjectif(index)}
                            className="absolute top-3 right-3 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer cet objectif"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Type de déchet */}
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Type de déchet
                            </label>
                            <select
                              value={objectif.typeDechet}
                              onChange={(e) => handleObjectifChange(index, 'typeDechet', e.target.value)}
                              className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                              required
                            >
                              <option value="">Sélectionner</option>
                              {wasteTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                  {type.icon} {type.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {/* Poids attendu */}
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Poids attendu (kg)
                            </label>
                            <div className="relative">
                              <FiPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                type="number"
                                placeholder="Ex: 1000"
                                value={objectif.poidsAttendue}
                                onChange={(e) => handleObjectifChange(index, 'poidsAttendue', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                min="1"
                                step="0.1"
                                required
                              />
                            </div>
                          </div>
                          
                          {/* Prix par kg */}
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Prix/kg (FCFA)
                            </label>
                            <div className="relative">
                              <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                type="number"
                                placeholder="Ex: 500"
                                value={objectif.prixParKg}
                                onChange={(e) => handleObjectifChange(index, 'prixParKg', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                min="1"
                                step="1"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Résumé de l'objectif */}
                        {objectif.typeDechet && objectif.poidsAttendue && objectif.prixParKg && (
                          <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-xs text-gray-500">Budget estimé pour ce type</span>
                            <span className="text-sm font-semibold text-emerald-600">
                              {(parseFloat(objectif.poidsAttendue) * parseFloat(objectif.prixParKg)).toLocaleString()} FCFA
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={handleAjouterObjectif}
                      className="w-full py-4 border-2 border-dashed border-emerald-200 rounded-xl text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <FiPlus className="w-5 h-5" />
                      Ajouter un type de déchet
                    </button>
                  </div>

                  {/* Résumé global */}
                  {formData.objectifs.some(obj => obj.poidsAttendue && obj.prixParKg) && (
                    <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FiAward className="w-5 h-5 text-emerald-600" />
                          <span className="font-medium text-emerald-900">Budget total estimé</span>
                        </div>
                        <span className="text-2xl font-bold text-emerald-700">
                          {calculateTotalBudget().toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Carte des zones d'intervention */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-emerald-50 px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                    <FiMapPin className="text-emerald-600" />
                    Zones d'intervention
                  </h3>
                </div>
                
                <div className="p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Communes/Localités
                    </label>
                    <div className="relative">
                      <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={zonesInput}
                        onChange={handleZoneChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="Ex: Dakar, Pikine, Guédiawaye (séparés par des virgules)"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Laissez vide si la campagne est nationale
                    </p>
                    
                    {/* Affichage des zones sous forme de tags */}
                    {formData.zonesIntervention.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-gray-500 mb-2">Zones sélectionnées :</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.zonesIntervention.map((zone, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm flex items-center gap-1">
                              <FiMapPin className="w-3 h-3" />
                              {zone}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Aide et informations */}
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-start gap-3">
                  <FiInfo className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-emerald-800 mb-1">Informations importantes</h4>
                    <p className="text-xs text-emerald-700">
                      {id 
                        ? 'Les objectifs peuvent être modifiés même après le début de la campagne. Les zones d\'intervention peuvent être étendues.'
                        : 'Les objectifs définis permettront de calculer les budgets et de suivre la progression de la campagne. Vous pourrez ajouter des objectifs supplémentaires plus tard.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/campagnes')}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg shadow-emerald-200"
                >
                  <FiSave className="w-5 h-5" />
                  {loading ? 'Enregistrement...' : (id ? 'Mettre à jour' : 'Créer la campagne')}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreerCampagne;