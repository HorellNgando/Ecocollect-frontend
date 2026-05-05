// import React, { useState, useEffect } from 'react';
// import DashboardLayout from '../../Layouts/LayoutDashboard';
// import { 
//   FiPlus, FiPackage, FiMapPin, FiCalendar, FiClock,
//   FiUser, FiPhone, FiMail, FiFileText, FiCheckCircle,
//   FiAlertCircle, FiTruck, FiDollarSign, FiFilter,
//   FiSearch, FiRefreshCw, FiDownload, FiEye, FiX,
//   FiChevronRight, FiArrowRight, FiHome, FiTag,
//   FiAward, FiTrendingUp, FiActivity, FiInfo
// } from 'react-icons/fi';
// import { FaRecycle, FaTruck, FaRegClock, FaExclamationTriangle } from 'react-icons/fa';

// const DemandeEnlevement = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [demandes, setDemandes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedDemande, setSelectedDemande] = useState(null);
//   const [formData, setFormData] = useState({
//     type: '',
//     quantity: '',
//     unit: 'kg',
//     location: '',
//     address: '',
//     contactName: '',
//     contactPhone: '',
//     contactEmail: '',
//     description: '',
//     urgency: 'normal',
//     preferredDate: ''
//   });

//   useEffect(() => {
//     // Simuler le chargement des demandes
//     setTimeout(() => {
//       setDemandes([
//         {
//           id: 1,
//           type: 'Plastique PET',
//           quantity: 500,
//           unit: 'kg',
//           location: 'Dakar',
//           address: '123 Rue de la République, Dakar',
//           contactName: 'Jean Dupont',
//           contactPhone: '+221 77 123 45 67',
//           contactEmail: 'jean.dupont@email.com',
//           status: 'pending',
//           urgency: 'high',
//           preferredDate: '2024-03-20',
//           createdAt: '2024-03-15T10:30:00',
//           description: 'Grande quantité de bouteilles en plastique PET disponibles. Bouteilles propres et triées par couleur.',
//           collecteEstimee: '2024-03-21'
//         },
//         {
//           id: 2,
//           type: 'Carton',
//           quantity: 1200,
//           unit: 'kg',
//           location: 'Thiès',
//           address: '456 Avenue des Alpes, Thiès',
//           contactName: 'Marie Martin',
//           contactPhone: '+221 78 234 56 78',
//           contactEmail: 'marie.martin@email.com',
//           status: 'validated',
//           urgency: 'normal',
//           preferredDate: '2024-03-18',
//           createdAt: '2024-03-14T14:45:00',
//           description: 'Cartons de déménagement propres et secs, pliés et prêts à être collectés.',
//           collecteEstimee: '2024-03-19'
//         },
//         {
//           id: 3,
//           type: 'Verre',
//           quantity: 800,
//           unit: 'kg',
//           location: 'Mbour',
//           address: '789 Boulevard du Soleil, Mbour',
//           contactName: 'Pierre Bernard',
//           contactPhone: '+221 76 345 67 89',
//           contactEmail: 'pierre.bernard@email.com',
//           status: 'completed',
//           urgency: 'normal',
//           preferredDate: '2024-03-16',
//           createdAt: '2024-03-13T09:15:00',
//           description: 'Bouteilles en verre diverses couleurs, triées par couleur.',
//           collecteEstimee: '2024-03-17'
//         },
//         {
//           id: 4,
//           type: 'Métal',
//           quantity: 350,
//           unit: 'kg',
//           location: 'Saint-Louis',
//           address: '321 Rue de la Plage, Saint-Louis',
//           contactName: 'Fatima Ba',
//           contactPhone: '+221 70 456 78 90',
//           contactEmail: 'fatima.ba@email.com',
//           status: 'rejected',
//           urgency: 'low',
//           preferredDate: '2024-03-25',
//           createdAt: '2024-03-12T16:20:00',
//           description: 'Déchets métalliques divers (aluminium, fer).',
//           rejectionReason: 'Type de métal non accepté actuellement'
//         }
//       ]);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const nouvelleDemande = {
//       id: demandes.length + 1,
//       ...formData,
//       status: 'pending',
//       createdAt: new Date().toISOString()
//     };
    
//     setDemandes(prev => [nouvelleDemande, ...prev]);
//     setShowForm(false);
//     setFormData({
//       type: '',
//       quantity: '',
//       unit: 'kg',
//       location: '',
//       address: '',
//       contactName: '',
//       contactPhone: '',
//       contactEmail: '',
//       description: '',
//       urgency: 'normal',
//       preferredDate: ''
//     });
//   };

//   const filteredDemandes = demandes.filter(demande => {
//     const matchesSearch = 
//       demande.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       demande.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       demande.contactName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = filterStatus === 'all' || demande.status === filterStatus;
    
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusBadge = (status) => {
//     const config = {
//       'pending': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: FiClock, label: 'En attente' },
//       'validated': { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: FiCheckCircle, label: 'Validée' },
//       'rejected': { color: 'bg-red-100 text-red-800 border-red-200', icon: FiAlertCircle, label: 'Rejetée' },
//       'completed': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: FiTruck, label: 'Terminée' }
//     };
    
//     const badge = config[status] || config.pending;
//     const Icon = badge.icon;
    
//     return (
//       <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
//         <Icon className="w-3 h-3 mr-1" />
//         {badge.label}
//       </span>
//     );
//   };

//   const getUrgencyBadge = (urgency) => {
//     const config = {
//       'high': { color: 'bg-red-100 text-red-800 border-red-200', label: 'Urgent' },
//       'normal': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Normal' },
//       'low': { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Non urgent' }
//     };
    
//     const badge = config[urgency] || config.normal;
    
//     return (
//       <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
//         <FaExclamationTriangle className="w-3 h-3 mr-1" />
//         {badge.label}
//       </span>
//     );
//   };

//   const getTypeIcon = (type) => {
//     const icons = {
//       'Plastique': '🥤',
//       'Carton': '📦',
//       'Verre': '🥃',
//       'Métal': '🥫',
//       'Papier': '📄'
//     };
//     return icons[type?.split(' ')[0]] || '📦';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('fr-FR', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString('fr-FR', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <DashboardLayout title="Demande d'enlèvement" user={{ type: 'recycleur' }}>
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="relative mx-auto w-20 h-20">
//               <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <FaTruck className="w-8 h-8 text-emerald-500" />
//               </div>
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Chargement des demandes...</p>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout title="Demande d'enlèvement" user={{ type: 'recycleur' }}>
//       <div className="p-6 bg-gray-50 min-h-screen">
//         {/* En-tête avec gradient */}
//         <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
//                 <FaTruck className="w-8 h-8" />
//                 Demandes d'enlèvement
//               </h1>
//               <p className="text-emerald-100">Gérez vos demandes de collecte de déchets</p>
//             </div>
//             <div className="mt-4 md:mt-0 flex gap-3">
//               <button className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
//                 <FiDownload className="w-4 h-4" />
//                 Exporter
//               </button>
//               <button
//                 onClick={() => setShowForm(!showForm)}
//                 className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
//               >
//                 <FiPlus className="w-5 h-5" />
//                 Nouvelle demande
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Statistiques */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total demandes</p>
//                 <p className="text-2xl font-bold text-gray-900">{demandes.length}</p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-lg">
//                 <FiPackage className="w-5 h-5 text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">En attente</p>
//                 <p className="text-2xl font-bold text-yellow-600">
//                   {demandes.filter(d => d.status === 'pending').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-yellow-100 rounded-lg">
//                 <FiClock className="w-5 h-5 text-yellow-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Validées</p>
//                 <p className="text-2xl font-bold text-emerald-600">
//                   {demandes.filter(d => d.status === 'validated').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-emerald-100 rounded-lg">
//                 <FiCheckCircle className="w-5 h-5 text-emerald-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Terminées</p>
//                 <p className="text-2xl font-bold text-blue-600">
//                   {demandes.filter(d => d.status === 'completed').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-lg">
//                 <FiTruck className="w-5 h-5 text-blue-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filtres et recherche */}
//         <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Rechercher par type, localisation ou contact..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//               />
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <div className="relative">
//                 <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
//                 >
//                   <option value="all">Tous les statuts</option>
//                   <option value="pending">En attente</option>
//                   <option value="validated">Validées</option>
//                   <option value="completed">Terminées</option>
//                   <option value="rejected">Rejetées</option>
//                 </select>
//               </div>

//               <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
//                 <FiRefreshCw className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Formulaire */}
//         {showForm && (
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-8 overflow-hidden">
//             <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-4 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
//                   <FiPlus className="text-emerald-600" />
//                   Créer une nouvelle demande
//                 </h3>
//                 <button
//                   onClick={() => setShowForm(false)}
//                   className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
            
//             <form onSubmit={handleSubmit} className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Type de déchet */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Type de déchet <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
//                       required
//                     >
//                       <option value="">Sélectionner un type</option>
//                       <option value="Plastique PET">Plastique PET</option>
//                       <option value="Carton">Carton</option>
//                       <option value="Verre">Verre</option>
//                       <option value="Métal">Métal</option>
//                       <option value="Papier">Papier</option>
//                       <option value="Autre">Autre</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Quantité */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Quantité <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex gap-2">
//                     <div className="relative flex-1">
//                       <FiPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                       <input
//                         type="number"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleInputChange}
//                         placeholder="Quantité"
//                         className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                         required
//                       />
//                     </div>
//                     <select
//                       name="unit"
//                       value={formData.unit}
//                       onChange={handleInputChange}
//                       className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
//                     >
//                       <option value="kg">kg</option>
//                       <option value="tonnes">tonnes</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Localisation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Localisation <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       name="location"
//                       value={formData.location}
//                       onChange={handleInputChange}
//                       placeholder="Ville ou région"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Adresse */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Adresse complète <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       placeholder="Adresse exacte"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Nom du contact */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Nom du contact <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       name="contactName"
//                       value={formData.contactName}
//                       onChange={handleInputChange}
//                       placeholder="Nom complet"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Téléphone */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Téléphone <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="tel"
//                       name="contactPhone"
//                       value={formData.contactPhone}
//                       onChange={handleInputChange}
//                       placeholder="Numéro de téléphone"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="email"
//                       name="contactEmail"
//                       value={formData.contactEmail}
//                       onChange={handleInputChange}
//                       placeholder="Adresse email"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Date souhaitée */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Date souhaitée
//                   </label>
//                   <div className="relative">
//                     <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="date"
//                       name="preferredDate"
//                       value={formData.preferredDate}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                     />
//                   </div>
//                 </div>

//                 {/* Urgence */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Urgence
//                   </label>
//                   <div className="relative">
//                     <FaExclamationTriangle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <select
//                       name="urgency"
//                       value={formData.urgency}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
//                     >
//                       <option value="low">Non urgent</option>
//                       <option value="normal">Normal</option>
//                       <option value="high">Urgent</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     placeholder="Description détaillée des déchets (état, conditionnement, etc.)..."
//                     rows={4}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all font-medium shadow-lg shadow-emerald-200 flex items-center gap-2"
//                 >
//                   <FiArrowRight className="w-4 h-4" />
//                   Soumettre la demande
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Liste des demandes */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//             <h3 className="text-lg font-semibold text-gray-900">Mes demandes ({filteredDemandes.length})</h3>
//           </div>
          
//           <div className="divide-y divide-gray-200">
//             {filteredDemandes.length > 0 ? (
//               filteredDemandes.map((demande) => (
//                 <div key={demande.id} className="p-6 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       {/* En-tête avec badges */}
//                       <div className="flex flex-wrap items-center gap-2 mb-3">
//                         <div className="flex items-center gap-2">
//                           <span className="text-2xl">{getTypeIcon(demande.type)}</span>
//                           <h4 className="text-lg font-semibold text-gray-900">{demande.type}</h4>
//                         </div>
//                         {getStatusBadge(demande.status)}
//                         {getUrgencyBadge(demande.urgency)}
//                       </div>
                      
//                       {/* Informations principales */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-3">
//                         <div className="flex items-center gap-2">
//                           <FiPackage className="text-gray-400" />
//                           <span className="font-medium">{demande.quantity} {demande.unit}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <FiMapPin className="text-gray-400" />
//                           <span>{demande.location}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <FiUser className="text-gray-400" />
//                           <span>{demande.contactName}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <FiCalendar className="text-gray-400" />
//                           <span>Soumis le {formatDate(demande.createdAt)}</span>
//                         </div>
//                         {demande.preferredDate && (
//                           <div className="flex items-center gap-2">
//                             <FiClock className="text-gray-400" />
//                             <span>Souhaité: {formatDate(demande.preferredDate)}</span>
//                           </div>
//                         )}
//                         {demande.collecteEstimee && (
//                           <div className="flex items-center gap-2">
//                             <FiTruck className="text-emerald-500" />
//                             <span className="text-emerald-600">Collecte: {formatDate(demande.collecteEstimee)}</span>
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Description */}
//                       {demande.description && (
//                         <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
//                           <FiFileText className="inline mr-1 text-gray-400" />
//                           {demande.description}
//                         </div>
//                       )}
                      
//                       {/* Raison de rejet */}
//                       {demande.status === 'rejected' && demande.rejectionReason && (
//                         <div className="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
//                           <FiAlertCircle className="inline mr-1" />
//                           Motif du rejet: {demande.rejectionReason}
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Actions */}
//                     <div className="flex flex-col gap-2 ml-4">
//                       <button
//                         onClick={() => {
//                           setSelectedDemande(demande);
//                           setShowDetailsModal(true);
//                         }}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                         title="Voir détails"
//                       >
//                         <FiEye className="w-5 h-5" />
//                       </button>
//                       {demande.status === 'validated' && (
//                         <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Suivre la collecte">
//                           <FiTruck className="w-5 h-5" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-12 text-center">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FiPackage className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune demande trouvée</h3>
//                 <p className="text-gray-500 mb-4">Commencez par créer votre première demande d'enlèvement</p>
//                 <button
//                   onClick={() => setShowForm(true)}
//                   className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
//                 >
//                   <FiPlus className="mr-2" />
//                   Créer une demande
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Modal de détails */}
//         {showDetailsModal && selectedDemande && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               {/* En-tête du modal */}
//               <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
//                 <div className="flex items-center justify-between text-white">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                       <FaTruck className="w-8 h-8" />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold">Détails de la demande</h3>
//                       <p className="text-emerald-100">ID: {selectedDemande.id}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowDetailsModal(false)}
//                     className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                   >
//                     <FiX className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
              
//               {/* Corps du modal */}
//               <div className="p-6 space-y-6">
//                 {/* Statuts */}
//                 <div className="flex gap-2">
//                   {getStatusBadge(selectedDemande.status)}
//                   {getUrgencyBadge(selectedDemande.urgency)}
//                 </div>

//                 {/* Informations principales */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                       <FiPackage className="w-4 h-4" /> Type et quantité
//                     </h4>
//                     <div className="space-y-2">
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Type:</span>
//                         <span className="font-medium text-gray-900">{selectedDemande.type}</span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Quantité:</span>
//                         <span className="font-medium text-gray-900">{selectedDemande.quantity} {selectedDemande.unit}</span>
//                       </p>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                       <FiUser className="w-4 h-4" /> Contact
//                     </h4>
//                     <div className="space-y-2">
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Nom:</span>
//                         <span className="font-medium text-gray-900">{selectedDemande.contactName}</span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Téléphone:</span>
//                         <span className="font-medium text-gray-900">{selectedDemande.contactPhone}</span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Email:</span>
//                         <span className="font-medium text-gray-900">{selectedDemande.contactEmail}</span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Adresse */}
//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                     <FiMapPin className="w-4 h-4" /> Localisation
//                   </h4>
//                   <p className="text-gray-900">{selectedDemande.address}</p>
//                 </div>

//                 {/* Description */}
//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                     <FiFileText className="w-4 h-4" /> Description
//                   </h4>
//                   <p className="text-gray-700">{selectedDemande.description || 'Aucune description fournie'}</p>
//                 </div>

//                 {/* Dates importantes */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <p className="text-xs text-gray-400">Date de soumission</p>
//                     <p className="font-medium text-gray-900">{formatDateTime(selectedDemande.createdAt)}</p>
//                   </div>
//                   {selectedDemande.preferredDate && (
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <p className="text-xs text-gray-400">Date souhaitée</p>
//                       <p className="font-medium text-gray-900">{formatDate(selectedDemande.preferredDate)}</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Boutons d'action */}
//                 <div className="flex justify-end gap-3 pt-4 border-t">
//                   <button
//                     onClick={() => setShowDetailsModal(false)}
//                     className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Fermer
//                   </button>
//                   {selectedDemande.status === 'validated' && (
//                     <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
//                       <FiTruck className="w-4 h-4" />
//                       Suivre la collecte
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default DemandeEnlevement;



import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../../Layouts/LayoutDashboard';
import recycleurService from '../../services/recycleurService';
import { 
  FiSend, FiCalendar, FiMapPin, FiPackage, FiPlus,
  FiUser, FiPhone, FiMail, FiFileText, FiClock,
  FiX, FiArrowRight, FiTag, FiHome, FiInfo
} from 'react-icons/fi';
import { FaTruck, FaExclamationTriangle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DemandeEnlevement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // État du formulaire avec champs originaux + quelques champs optionnels supplémentaires pour l'UX
  const [formData, setFormData] = useState({
    pointDepotId: queryParams.get('point') || '',
    typeDechet: queryParams.get('type') || '',
    quantite: '',
    dateSouhaitee: new Date().toISOString().split('T')[0],
    notes: '',
    // Champs supplémentaires pour l'interface moderne (optionnels)
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    description: '',
    urgency: 'normal'
  });

  const [pointsDepot, setPointsDepot] = useState([]);
  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(true); // Toujours affiché car c'est la page de création

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user'));
    setUser(userData);
    loadPointsDepot();
  }, []);

  const loadPointsDepot = async () => {
    try {
      setLoading(true);
      
      // 1. Récupérer les stocks
      const stocksResponse = await recycleurService.getStocks();
      const stocks = stocksResponse.stocks || [];
      setStocksData(stocks);
      
      // 2. Récupérer les points de dépôt
      const pointsResponse = await recycleurService.getPointsDepot();
      const points = pointsResponse.points || pointsResponse || [];
      
      // 3. Créer une map des stocks par point
      const stocksByPoint = {};
      stocks.forEach(stock => {
        if (stock.point_depot_id) {
          if (!stocksByPoint[stock.point_depot_id]) {
            stocksByPoint[stock.point_depot_id] = {};
          }
          stocksByPoint[stock.point_depot_id][stock.type_dechet] = stock.quantite_disponible;
        }
      });
      
      // 4. Combiner les données
      const pointsWithStocks = points.map(point => ({
        id: point.id,
        nom: point.nom,
        commune: point.commune,
        quartier: point.quartier,
        adresse: point.adresse,
        stocks: stocksByPoint[point.id] || {}
      }));
      
      setPointsDepot(pointsWithStocks);
      
    } catch (error) {
      console.error('Erreur chargement points:', error);
      toast.error('Erreur lors du chargement des points de dépôt');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des champs obligatoires (originaux)
    if (!formData.pointDepotId || !formData.typeDechet || !formData.quantite || !formData.dateSouhaitee) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (parseFloat(formData.quantite) <= 0) {
      toast.error('La quantité doit être supérieure à 0');
      return;
    }

    // Vérifier le stock
    const selectedPoint = pointsDepot.find(p => p.id === formData.pointDepotId);
    const stockDispo = selectedPoint?.stocks?.[formData.typeDechet] || 0;
    
    if (parseFloat(formData.quantite) > stockDispo) {
      toast.error(`Stock insuffisant. Disponible: ${stockDispo} kg`);
      return;
    }

    try {
      setSubmitting(true);
      
      // Préparer les données pour l'API (seulement les champs attendus)
      const demandeData = {
        pointDepotId: formData.pointDepotId,
        typeDechet: formData.typeDechet,
        quantite: parseFloat(formData.quantite),
        dateSouhaitee: formData.dateSouhaitee,
        notes: formData.notes
        // Les champs supplémentaires (contact, etc.) ne sont pas envoyés
      };
      
      const response = await recycleurService.creerDemande(demandeData);
      
      if (response.success) {
        toast.success('Demande d\'enlèvement créée avec succès !');
        navigate('/recycleur/demandes');
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setSubmitting(false);
    }
  };

  const typesDechet = [
    { value: 'plastique_pet', label: 'Plastique PET' },
    { value: 'plastique_pehd', label: 'Plastique PEHD' },
    { value: 'papier_carton', label: 'Papier/Carton' },
    { value: 'metal', label: 'Métal' },
    { value: 'verre', label: 'Verre' },
    { value: 'organique', label: 'Organique' },
  ];

  const selectedPoint = pointsDepot.find(p => p.id === formData.pointDepotId);
  const stockDisponible = selectedPoint?.stocks?.[formData.typeDechet] || 0;

  if (loading) {
    return (
      <DashboardLayout title="Nouvelle demande d'enlèvement" user={user}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaTruck className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des points de dépôt...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Nouvelle demande d'enlèvement" user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaTruck className="w-8 h-8" />
                Nouvelle demande d'enlèvement
              </h1>
              <p className="text-emerald-100">Créez une demande de collecte pour vos déchets</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => navigate('/recycleur/demandes')}
                className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <FiX className="w-4 h-4" />
                Annuler
              </button>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                <FiPlus className="text-emerald-600" />
                Détails de la demande
              </h3>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Point de dépôt */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Point de dépôt <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="pointDepotId"
                    value={formData.pointDepotId}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                    required
                  >
                    <option value="">Sélectionnez un point de dépôt</option>
                    {pointsDepot.map(point => (
                      <option key={point.id} value={point.id}>
                        {point.nom} - {point.commune} ({point.quartier})
                      </option>
                    ))}
                  </select>
                </div>
                {selectedPoint && (
                  <div className="mt-2 p-3 bg-emerald-50 rounded-lg flex items-start gap-2">
                    <FiInfo className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-emerald-800">
                      <p><strong>Adresse :</strong> {selectedPoint.adresse}</p>
                      <p className="text-xs text-emerald-600 mt-1">Sélectionnez un type de déchet pour voir le stock disponible</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Type de déchet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de déchet <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="typeDechet"
                    value={formData.typeDechet}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                    required
                  >
                    <option value="">Sélectionnez un type</option>
                    {typesDechet.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedPoint && formData.typeDechet && (
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <FiPackage className="text-emerald-600" />
                    <span>Stock disponible : <strong className="text-emerald-700">{stockDisponible} kg</strong></span>
                  </div>
                )}
              </div>

              {/* Quantité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité (kg) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="quantite"
                    value={formData.quantite}
                    onChange={handleInputChange}
                    min="1"
                    max={stockDisponible || undefined}
                    step="0.1"
                    placeholder="Ex: 500"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Date souhaitée */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date souhaitée <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="dateSouhaitee"
                    value={formData.dateSouhaitee}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Urgence (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau d'urgence
                </label>
                <div className="relative">
                  <FaExclamationTriangle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                  >
                    <option value="low">Non urgent</option>
                    <option value="normal">Normal</option>
                    <option value="high">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Contact (optionnel, pour information) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du contact (optionnel)
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Téléphone (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone (optionnel)
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="Numéro de téléphone"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Notes / Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes ou description (optionnel)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Informations complémentaires sur les déchets, conditions particulières, etc."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/recycleur/demandes')}
                className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all font-medium shadow-lg shadow-emerald-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Soumettre la demande
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Information complémentaire */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <FiInfo className="text-blue-600 w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Comment ça fonctionne ?</p>
            <p>Après soumission, votre demande sera examinée. Vous recevrez une notification dès qu'elle sera validée. Vous pourrez suivre son statut dans la section "Mes demandes".</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DemandeEnlevement;