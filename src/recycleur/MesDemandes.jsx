// import React, { useState, useEffect } from 'react';
// import DashboardLayout from '../../Layouts/LayoutDashboard';
// import { 
//   FiPackage, FiSearch, FiFilter, FiEye, FiEdit, FiTrash2,
//   FiCalendar, FiClock, FiCheckCircle, FiAlertCircle, FiXCircle,
//   FiTruck, FiMapPin, FiUser, FiPhone, FiMail, FiFileText,
//   FiRefreshCw, FiDownload, FiTrendingUp, FiBarChart2,
//   FiChevronLeft, FiChevronRight, FiMoreVertical, FiInfo,
//   FiAward, FiDollarSign, FiHome, FiGlobe, FiTag
// } from 'react-icons/fi';
// import { FaRecycle, FaLeaf, FaRegBuilding } from 'react-icons/fa';

// const MesDemandes = () => {
//   const [demandes, setDemandes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterType, setFilterType] = useState('all');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedDemande, setSelectedDemande] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);

//   useEffect(() => {
//     // Simuler le chargement des demandes
//     setTimeout(() => {
//       setDemandes([
//         {
//           id: 1,
//           type: 'Plastique PET',
//           quantity: 500,
//           unit: 'kg',
//           location: 'Paris',
//           address: '123 Rue de la République, 75001 Paris',
//           contactName: 'Jean Dupont',
//           contactPhone: '+33 6 12 34 56 78',
//           contactEmail: 'jean.dupont@email.com',
//           status: 'validated',
//           urgency: 'high',
//           preferredDate: '2024-03-20',
//           createdAt: '2024-03-15',
//           updatedAt: '2024-03-16',
//           description: 'Grande quantité de bouteilles en plastique PET disponibles. Bouteilles propres et triées par couleur.',
//           estimatedValue: 600,
//           collectDate: '2024-03-20',
//           collectTime: '14:00',
//           collecteur: 'EcoCollect Paris',
//           photos: ['url1', 'url2'],
//           codePostal: '75001'
//         },
//         {
//           id: 2,
//           type: 'Carton',
//           quantity: 1200,
//           unit: 'kg',
//           location: 'Lyon',
//           address: '456 Avenue des Alpes, 69003 Lyon',
//           contactName: 'Marie Martin',
//           contactPhone: '+33 6 23 45 67 89',
//           contactEmail: 'marie.martin@email.com',
//           status: 'pending',
//           urgency: 'normal',
//           preferredDate: '2024-03-18',
//           createdAt: '2024-03-14',
//           updatedAt: '2024-03-14',
//           description: 'Cartons de déménagement propres et secs. Grande quantité disponible.',
//           estimatedValue: 960,
//           codePostal: '69003'
//         },
//         {
//           id: 3,
//           type: 'Verre',
//           quantity: 800,
//           unit: 'kg',
//           location: 'Marseille',
//           address: '789 Boulevard du Soleil, 13008 Marseille',
//           contactName: 'Pierre Bernard',
//           contactPhone: '+33 6 34 56 78 90',
//           contactEmail: 'pierre.bernard@email.com',
//           status: 'rejected',
//           urgency: 'normal',
//           preferredDate: '2024-03-22',
//           createdAt: '2024-03-13',
//           updatedAt: '2024-03-15',
//           description: 'Bouteilles en verre diverses couleurs. Mélangé, nécessite tri.',
//           rejectionReason: 'Quantité insuffisante pour la collecte. Minimum requis: 1000 kg.'
//         },
//         {
//           id: 4,
//           type: 'Métal - Aluminium',
//           quantity: 300,
//           unit: 'kg',
//           location: 'Toulouse',
//           address: '321 Rue du Canal, 31000 Toulouse',
//           contactName: 'Sophie Petit',
//           contactPhone: '+33 6 45 67 89 01',
//           contactEmail: 'sophie.petit@email.com',
//           status: 'completed',
//           urgency: 'low',
//           preferredDate: '2024-03-10',
//           createdAt: '2024-03-10',
//           updatedAt: '2024-03-12',
//           description: 'Canettes et emballages en aluminium. Bien compacté.',
//           estimatedValue: 750,
//           collectDate: '2024-03-12',
//           collectTime: '10:00',
//           collecteur: 'EcoCollect Toulouse',
//           actualValue: 720,
//           codePostal: '31000'
//         },
//         {
//           id: 5,
//           type: 'Papier',
//           quantity: 2000,
//           unit: 'kg',
//           location: 'Bordeaux',
//           address: '654 Place de la Victoire, 33000 Bordeaux',
//           contactName: 'Lucas Dubois',
//           contactPhone: '+33 6 56 78 90 12',
//           contactEmail: 'lucas.dubois@email.com',
//           status: 'pending',
//           urgency: 'normal',
//           preferredDate: '2024-03-25',
//           createdAt: '2024-03-11',
//           updatedAt: '2024-03-11',
//           description: 'Papier bureau et journaux. Grande quantité disponible.',
//           estimatedValue: 800,
//           codePostal: '33000'
//         },
//         {
//           id: 6,
//           type: 'Plastique PEHD',
//           quantity: 450,
//           unit: 'kg',
//           location: 'Lille',
//           address: '123 Rue Nationale, 59000 Lille',
//           contactName: 'Julie Leroy',
//           contactPhone: '+33 6 67 89 01 23',
//           contactEmail: 'julie.leroy@email.com',
//           status: 'validated',
//           urgency: 'high',
//           preferredDate: '2024-03-21',
//           createdAt: '2024-03-09',
//           updatedAt: '2024-03-10',
//           description: 'Bidons et flacons en plastique PEHD. Bien rincés.',
//           estimatedValue: 540,
//           collectDate: '2024-03-21',
//           collectTime: '09:00',
//           collecteur: 'EcoCollect Lille'
//         }
//       ]);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Extraire les types uniques pour le filtre
//   const types = [...new Set(demandes.map(d => d.type))];

//   const filteredDemandes = demandes.filter(demande => {
//     const matchesSearch = 
//       demande.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       demande.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       demande.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (demande.codePostal || '').includes(searchTerm);
    
//     const matchesStatus = filterStatus === 'all' || demande.status === filterStatus;
//     const matchesType = filterType === 'all' || demande.type === filterType;
    
//     return matchesSearch && matchesStatus && matchesType;
//   });

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredDemandes.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'validated': return 'bg-green-100 text-green-800 border-green-200';
//       case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
//       case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'pending': return FiClock;
//       case 'validated': return FiCheckCircle;
//       case 'rejected': return FiXCircle;
//       case 'completed': return FiCheckCircle;
//       default: return FiAlertCircle;
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 'pending': return 'En attente';
//       case 'validated': return 'Validée';
//       case 'rejected': return 'Rejetée';
//       case 'completed': return 'Terminée';
//       default: return status;
//     }
//   };

//   const getUrgencyColor = (urgency) => {
//     switch (urgency) {
//       case 'high': return 'bg-red-100 text-red-800 border-red-200';
//       case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getUrgencyText = (urgency) => {
//     switch (urgency) {
//       case 'high': return 'Urgent';
//       case 'normal': return 'Normal';
//       case 'low': return 'Non urgent';
//       default: return urgency;
//     }
//   };

//   const getTypeIcon = (type) => {
//     if (type.includes('Plastique')) return '🥤';
//     if (type.includes('Carton') || type.includes('Papier')) return '📦';
//     if (type.includes('Verre')) return '🥃';
//     if (type.includes('Métal')) return '🥫';
//     return '♻️';
//   };

//   const handleViewDetails = (demande) => {
//     setSelectedDemande(demande);
//     setShowDetails(true);
//   };

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('fr-FR', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const stats = {
//     total: demandes.length,
//     pending: demandes.filter(d => d.status === 'pending').length,
//     validated: demandes.filter(d => d.status === 'validated').length,
//     completed: demandes.filter(d => d.status === 'completed').length,
//     totalValue: demandes.reduce((sum, d) => sum + (d.actualValue || d.estimatedValue || 0), 0),
//     totalQuantity: demandes.reduce((sum, d) => sum + d.quantity, 0)
//   };

//   if (loading) {
//     return (
//       <DashboardLayout title="Mes demandes" user={{ type: 'recycleur' }}>
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="relative mx-auto w-20 h-20">
//               <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <FaRecycle className="w-8 h-8 text-emerald-500" />
//               </div>
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Chargement de vos demandes...</p>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout title="Mes demandes" user={{ type: 'recycleur' }}>
//       <div className="p-6 bg-gray-50 min-h-screen">
//         {/* En-tête avec gradient */}
//         <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
//                 <FaRecycle className="w-8 h-8" />
//                 Mes demandes de collecte
//               </h1>
//               <p className="text-emerald-100">Gérez et suivez toutes vos demandes de collecte de déchets</p>
//             </div>
//             <div className="mt-4 md:mt-0 flex gap-3">
//               <button className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
//                 <FiRefreshCw className="w-4 h-4" />
//                 Actualiser
//               </button>
//               <button className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
//                 <FiFileText className="w-5 h-5" />
//                 Nouvelle demande
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Cartes de statistiques */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 mb-8">
//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Total demandes</p>
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <FiPackage className="w-4 h-4 text-blue-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
//             <p className="text-xs text-gray-400 mt-1">Toutes</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">En attente</p>
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <FiClock className="w-4 h-4 text-yellow-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
//             <p className="text-xs text-gray-400 mt-1">À traiter</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Validées</p>
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <FiCheckCircle className="w-4 h-4 text-green-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-green-600">{stats.validated}</p>
//             <p className="text-xs text-gray-400 mt-1">Confirmées</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Terminées</p>
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <FiCheckCircle className="w-4 h-4 text-blue-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
//             <p className="text-xs text-gray-400 mt-1">Collectées</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Quantité totale</p>
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <FiTrendingUp className="w-4 h-4 text-purple-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-purple-600">{stats.totalQuantity} kg</p>
//             <p className="text-xs text-gray-400 mt-1">Déchets</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Valeur totale</p>
//               <div className="p-2 bg-emerald-100 rounded-lg">
//                 <FiDollarSign className="w-4 h-4 text-emerald-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-emerald-600">{formatCurrency(stats.totalValue)}</p>
//             <p className="text-xs text-gray-400 mt-1">Estimée</p>
//           </div>
//         </div>

//         {/* Filtres et recherche */}
//         <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Rechercher par type, localisation, contact ou code postal..."
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
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
//                   <option value="rejected">Rejetées</option>
//                   <option value="completed">Terminées</option>
//                 </select>
//               </div>

//               <div className="relative">
//                 <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
//                 >
//                   <option value="all">Tous les types</option>
//                   {types.map((type, index) => (
//                     <option key={index} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>

//               <button className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md">
//                 <FiDownload className="w-4 h-4" />
//                 Exporter
//               </button>
//             </div>
//           </div>

//           {/* Tags de recherche actifs */}
//           {(searchTerm || filterStatus !== 'all' || filterType !== 'all') && (
//             <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
//               <span className="text-sm text-gray-500">Filtres actifs:</span>
//               {searchTerm && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
//                   Recherche: "{searchTerm}"
//                   <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-900">
//                     <FiXCircle className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
//               {filterStatus !== 'all' && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
//                   Statut: {filterStatus === 'pending' ? 'En attente' : 
//                           filterStatus === 'validated' ? 'Validées' :
//                           filterStatus === 'rejected' ? 'Rejetées' : 'Terminées'}
//                   <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-emerald-900">
//                     <FiXCircle className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
//               {filterType !== 'all' && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
//                   Type: {filterType}
//                   <button onClick={() => setFilterType('all')} className="ml-1 hover:text-emerald-900">
//                     <FiXCircle className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Liste des demandes */}
//         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantité</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Localisation</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Urgence</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Valeur</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentItems.map((demande) => {
//                   const StatusIcon = getStatusIcon(demande.status);
//                   return (
//                     <tr key={demande.id} className="hover:bg-gray-50 transition-colors group">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <span className="text-xl">{getTypeIcon(demande.type)}</span>
//                           <span className="text-sm font-medium text-gray-900">{demande.type}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="text-sm font-semibold text-gray-900">{demande.quantity}</span>
//                         <span className="text-xs text-gray-500 ml-1">{demande.unit}</span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-1">
//                           <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
//                           <span className="text-sm text-gray-900">{demande.location}</span>
//                         </div>
//                         <div className="text-xs text-gray-500 mt-1">{demande.codePostal}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getUrgencyColor(demande.urgency)}`}>
//                           {getUrgencyText(demande.urgency)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(demande.status)}`}>
//                             <StatusIcon className="w-3 h-3 mr-1" />
//                             {getStatusText(demande.status)}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-1 text-sm">
//                           <FiCalendar className="w-3.5 h-3.5 text-gray-400" />
//                           <span>{formatDate(demande.createdAt)}</span>
//                         </div>
//                         {demande.collectDate && (
//                           <div className="text-xs text-gray-500 mt-1">
//                             Collecte: {formatDate(demande.collectDate)}
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="text-sm font-semibold text-emerald-600">
//                           {formatCurrency(demande.actualValue || demande.estimatedValue || 0)}
//                         </span>
//                         {demande.actualValue && (
//                           <div className="text-xs text-gray-500">Effectif</div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           <button 
//                             onClick={() => handleViewDetails(demande)}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                             title="Voir détails"
//                           >
//                             <FiEye className="w-4 h-4" />
//                           </button>
//                           {demande.status === 'pending' && (
//                             <>
//                               <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Modifier">
//                                 <FiEdit className="w-4 h-4" />
//                               </button>
//                               <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
//                                 <FiTrash2 className="w-4 h-4" />
//                               </button>
//                             </>
//                           )}
//                           <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors" title="Plus d'options">
//                             <FiMoreVertical className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//                 {filteredDemandes.length === 0 && (
//                   <tr>
//                     <td colSpan="8" className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center">
//                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
//                           <FiPackage className="w-8 h-8 text-gray-400" />
//                         </div>
//                         <p className="text-gray-500 font-medium">Aucune demande trouvée</p>
//                         <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {filteredDemandes.length > 0 && (
//             <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="text-sm text-gray-500">
//                 Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
//                 <span className="font-medium">
//                   {Math.min(indexOfLastItem, filteredDemandes.length)}
//                 </span>{' '}
//                 sur <span className="font-medium">{filteredDemandes.length}</span> demandes
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <FiChevronLeft className="w-5 h-5" />
//                 </button>
//                 <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
//                   Page {currentPage} sur {totalPages || 1}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages || totalPages === 0}
//                   className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <FiChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Modal de détails */}
//         {showDetails && selectedDemande && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//               {/* En-tête du modal */}
//               <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
//                 <div className="flex items-center justify-between text-white">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                       <span className="text-3xl">{getTypeIcon(selectedDemande.type)}</span>
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold">{selectedDemande.type}</h3>
//                       <p className="text-emerald-100">Demande #{selectedDemande.id}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowDetails(false)}
//                     className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                   >
//                     <FiXCircle className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
              
//               {/* Corps du modal */}
//               <div className="p-6 space-y-6">
//                 {/* Statut et urgence */}
//                 <div className="flex gap-3">
//                   <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(selectedDemande.status)}`}>
//                     <StatusIcon className="w-4 h-4 mr-1" />
//                     {getStatusText(selectedDemande.status)}
//                   </span>
//                   <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getUrgencyColor(selectedDemande.urgency)}`}>
//                     <FiAlertCircle className="w-4 h-4 mr-1" />
//                     {getUrgencyText(selectedDemande.urgency)}
//                   </span>
//                 </div>

//                 {/* Grille d'informations */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Quantité et valeur */}
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                       <FiPackage className="w-4 h-4" /> Quantité
//                     </h4>
//                     <p className="text-2xl font-bold text-gray-900">
//                       {selectedDemande.quantity} <span className="text-sm font-normal text-gray-500">{selectedDemande.unit}</span>
//                     </p>
//                     {selectedDemande.estimatedValue && (
//                       <div className="mt-2 flex items-center justify-between">
//                         <span className="text-sm text-gray-600">Valeur estimée:</span>
//                         <span className="font-semibold text-emerald-600">{formatCurrency(selectedDemande.estimatedValue)}</span>
//                       </div>
//                     )}
//                     {selectedDemande.actualValue && (
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600">Valeur réelle:</span>
//                         <span className="font-semibold text-green-600">{formatCurrency(selectedDemande.actualValue)}</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Contact */}
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                       <FiUser className="w-4 h-4" /> Contact
//                     </h4>
//                     <div className="space-y-2">
//                       <p className="flex items-center gap-2 text-gray-900">
//                         <FiUser className="w-4 h-4 text-gray-400" />
//                         {selectedDemande.contactName}
//                       </p>
//                       <p className="flex items-center gap-2 text-gray-900">
//                         <FiPhone className="w-4 h-4 text-gray-400" />
//                         {selectedDemande.contactPhone}
//                       </p>
//                       <p className="flex items-center gap-2 text-gray-900">
//                         <FiMail className="w-4 h-4 text-gray-400" />
//                         {selectedDemande.contactEmail}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Adresse */}
//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                     <FiHome className="w-4 h-4" /> Adresse
//                   </h4>
//                   <p className="text-gray-900">{selectedDemande.address}</p>
//                   <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
//                     <FiMapPin className="w-3 h-3" />
//                     <span>{selectedDemande.location} - {selectedDemande.codePostal}</span>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 {selectedDemande.description && (
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                       <FiFileText className="w-4 h-4" /> Description
//                     </h4>
//                     <p className="text-gray-700">{selectedDemande.description}</p>
//                   </div>
//                 )}

//                 {/* Dates */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <p className="text-xs text-gray-400">Date de soumission</p>
//                     <p className="font-medium text-gray-900">{formatDate(selectedDemande.createdAt)}</p>
//                   </div>
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <p className="text-xs text-gray-400">Date souhaitée</p>
//                     <p className="font-medium text-gray-900">
//                       {selectedDemande.preferredDate ? formatDate(selectedDemande.preferredDate) : 'Non spécifiée'}
//                     </p>
//                   </div>
//                   {selectedDemande.collectDate && (
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <p className="text-xs text-gray-400">Date de collecte</p>
//                       <p className="font-medium text-gray-900">
//                         {formatDate(selectedDemande.collectDate)} à {selectedDemande.collectTime}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Collecteur */}
//                 {selectedDemande.collecteur && (
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                       <FiTruck className="w-4 h-4" /> Collecteur assigné
//                     </h4>
//                     <p className="text-gray-900 font-medium">{selectedDemande.collecteur}</p>
//                   </div>
//                 )}

//                 {/* Motif de rejet */}
//                 {selectedDemande.rejectionReason && (
//                   <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//                     <div className="flex items-start gap-3">
//                       <FiAlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
//                       <div>
//                         <h4 className="font-medium text-red-800">Motif du rejet</h4>
//                         <p className="text-sm text-red-600 mt-1">{selectedDemande.rejectionReason}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Boutons d'action */}
//                 <div className="flex justify-end gap-3 pt-4 border-t">
//                   <button
//                     onClick={() => setShowDetails(false)}
//                     className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Fermer
//                   </button>
//                   {selectedDemande.status === 'pending' && (
//                     <>
//                       <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
//                         <FiEdit className="w-4 h-4" />
//                         Modifier
//                       </button>
//                       <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
//                         <FiTrash2 className="w-4 h-4" />
//                         Supprimer
//                       </button>
//                     </>
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

// export default MesDemandes;


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardLayout from '../../Layouts/LayoutDashboard';
import recycleurService from '../../services/recycleurService';
import { 
  FiPackage, FiSearch, FiFilter, FiEye, FiEdit, FiTrash2,
  FiCalendar, FiClock, FiCheckCircle, FiAlertCircle, FiXCircle,
  FiTruck, FiMapPin, FiUser, FiPhone, FiMail, FiFileText,
  FiRefreshCw, FiDownload, FiTrendingUp, FiBarChart2,
  FiChevronLeft, FiChevronRight, FiMoreVertical, FiInfo,
  FiAward, FiDollarSign, FiHome, FiGlobe, FiTag, FiPlus,
  FiX
} from 'react-icons/fi';
import { FaRecycle, FaLeaf, FaRegBuilding } from 'react-icons/fa';


const MesDemandes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // États origine
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filtreStatut, setFiltreStatut] = useState(queryParams.get('statut') || 'tous');
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [quantiteRecue, setQuantiteRecue] = useState('');
  const [notesConfirmation, setNotesConfirmation] = useState('');
  const [user, setUser] = useState(null);

  // États modernes
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user'));
    setUser(userData);
    loadDemandes();
  }, [filtreStatut]); // Recharge quand le filtre statut change

  const loadDemandes = async () => {
    try {
      setLoading(true);
      const statut = filtreStatut !== 'tous' ? filtreStatut : null;
      const data = await recycleurService.getMesDemandes(statut);
      setDemandes(data.demandes || []);
      setCurrentPage(1); // Reset à la première page
    } catch (error) {
      console.error('Erreur chargement demandes:', error);
      toast.error('Erreur lors du chargement des demandes');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDemandes();
    setRefreshing(false);
    toast.success('Données actualisées');
  };

  const handleConfirmerReception = async () => {
    if (!quantiteRecue || parseFloat(quantiteRecue) <= 0) {
      toast.error('Veuillez entrer une quantité valide');
      return;
    }

    try {
      const response = await recycleurService.confirmerReception(
        selectedDemande.id,
        parseFloat(quantiteRecue),
        notesConfirmation
      );

      if (response.success) {
        toast.success('Réception confirmée avec succès !');
        setShowConfirmModal(false);
        setSelectedDemande(null);
        setQuantiteRecue('');
        setNotesConfirmation('');
        loadDemandes();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la confirmation');
    }
  };

  // Fonctions de mapping
  const getStatusBadge = (statut) => {
    const badges = {
      'en_attente': { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        icon: FiClock,
        label: 'En attente' 
      },
      'validee': { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        icon: FiCheckCircle,
        label: 'Validée' 
      },
      'acceptee': { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        icon: FiCheckCircle,
        label: 'Acceptée' 
      },
      'realisee': { 
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        icon: FiCheckCircle,
        label: 'Réalisée' 
      },
      'refusee': { 
        color: 'bg-red-100 text-red-800 border-red-200', 
        icon: FiXCircle,
        label: 'Refusée' 
      },
    };
    return badges[statut] || badges.en_attente;
  };

  const getUrgencyColor = (urgence) => {
    switch (urgence) {
      case 'haute': return 'bg-red-100 text-red-800 border-red-200';
      case 'normale': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'basse': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyText = (urgence) => {
    switch (urgence) {
      case 'haute': return 'Urgent';
      case 'normale': return 'Normal';
      case 'basse': return 'Non urgent';
      default: return 'Normal';
    }
  };

  const getTypeIcon = (type) => {
    const typeLower = type?.toLowerCase() || '';
    if (typeLower.includes('plastique')) return '🥤';
    if (typeLower.includes('carton') || typeLower.includes('papier')) return '📦';
    if (typeLower.includes('verre')) return '🥃';
    if (typeLower.includes('métal') || typeLower.includes('metal')) return '🥫';
    return '♻️';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0);
  };

  // Extraire les types uniques pour le filtre
  const types = [...new Set(demandes.map(d => recycleurService.getTypeLabel(d.type_dechet)))];

  // Filtrage combiné
  const filteredDemandes = demandes.filter(demande => {
    const typeLabel = recycleurService.getTypeLabel(demande.type_dechet).toLowerCase();
    const locationMatch = (demande.nom_point || '').toLowerCase();
    const contactMatch = (demande.nom_contact || '').toLowerCase();
    const codePostal = (demande.code_postal || '').toString();
    
    const matchesSearch = 
      typeLabel.includes(searchTerm.toLowerCase()) ||
      locationMatch.includes(searchTerm.toLowerCase()) ||
      contactMatch.includes(searchTerm.toLowerCase()) ||
      codePostal.includes(searchTerm);
    
    const matchesType = filterType === 'all' || recycleurService.getTypeLabel(demande.type_dechet) === filterType;
    
    return matchesSearch && matchesType;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDemandes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage);

  // Statistiques
  const stats = {
    total: demandes.length,
    pending: demandes.filter(d => d.statut === 'en_attente').length,
    validated: demandes.filter(d => d.statut === 'validee' || d.statut === 'acceptee').length,
    completed: demandes.filter(d => d.statut === 'realisee').length,
    totalQuantity: demandes.reduce((sum, d) => sum + (d.quantite_demandee || 0), 0)
  };

  if (loading) {
    return (
      <DashboardLayout title="Mes demandes" user={user}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaRecycle className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement de vos demandes...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Mes demandes d'enlèvement" user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaRecycle className="w-8 h-8" />
                Mes demandes de collecte
              </h1>
              <p className="text-emerald-100">Gérez et suivez toutes vos demandes de collecte de déchets</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm disabled:opacity-50"
              >
                <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Actualiser
              </button>
              <Link 
                to="/recycleur/demandes/nouvelle"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <FiFileText className="w-5 h-5" />
                Nouvelle demande
              </Link>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total demandes</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiPackage className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-1">Toutes</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">En attente</p>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiClock className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-xs text-gray-400 mt-1">À traiter</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Validées</p>
              <div className="p-2 bg-green-100 rounded-lg">
                <FiCheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.validated}</p>
            <p className="text-xs text-gray-400 mt-1">Confirmées</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Terminées</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiCheckCircle className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
            <p className="text-xs text-gray-400 mt-1">Collectées</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Quantité totale</p>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiTrendingUp className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.totalQuantity} kg</p>
            <p className="text-xs text-gray-400 mt-1">Déchets</p>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par type, point de dépôt, contact..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filtreStatut}
                  onChange={(e) => setFiltreStatut(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="en_attente">En attente</option>
                  <option value="validee">Validées</option>
                  <option value="realisee">Réalisées</option>
                  <option value="refusee">Refusées</option>
                </select>
              </div>

              <div className="relative">
                <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">Tous les types</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <button className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md">
                <FiDownload className="w-4 h-4" />
                Exporter
              </button>
            </div>
          </div>

          {/* Tags de recherche actifs */}
          {(searchTerm || filterType !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Filtres actifs:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Recherche: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-900">
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterType !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Type: {filterType}
                  <button onClick={() => setFilterType('all')} className="ml-1 hover:text-emerald-900">
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tableau des demandes */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">N° Demande</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Point de dépôt</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantité</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date souhaitée</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((demande) => {
                  const status = getStatusBadge(demande.statut);
                  const StatusIcon = status.icon;
                  return (
                    <tr key={demande.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">#{demande.id?.substring(0, 8)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getTypeIcon(demande.type_dechet)}</span>
                          <span className="text-sm text-gray-900">{recycleurService.getTypeLabel(demande.type_dechet)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{demande.nom_point || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">{demande.quantite_demandee}</span>
                        <span className="text-xs text-gray-500 ml-1">kg</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm">
                          <FiCalendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{formatDate(demande.date_souhaitee)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setSelectedDemande(demande);
                              setShowDetails(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir détails"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          
                          {demande.statut === 'validee' && (
                            <button 
                              onClick={() => {
                                setSelectedDemande(demande);
                                setQuantiteRecue(demande.quantite_demandee);
                                setShowConfirmModal(true);
                              }}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Confirmer réception"
                            >
                              <FiCheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          
                          {demande.statut === 'en_attente' && (
                            <>
                              <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Modifier">
                                <FiEdit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          
                          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors" title="Plus d'options">
                            <FiMoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredDemandes.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <FiPackage className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucune demande trouvée</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredDemandes.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredDemandes.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredDemandes.length}</span> demandes
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                  Page {currentPage} sur {totalPages || 1}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal de confirmation de réception */}
        {showConfirmModal && selectedDemande && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmer la réception</h3>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-600">Demande #{selectedDemande.id?.substring(0, 8)}</p>
                <p className="font-medium text-gray-900 mt-1">{recycleurService.getTypeLabel(selectedDemande.type_dechet)}</p>
                <p className="text-sm text-gray-500 mt-1">Quantité demandée: {selectedDemande.quantite_demandee} kg</p>
                <p className="text-sm text-gray-500">Point: {selectedDemande.nom_point}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité reçue (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={quantiteRecue}
                    onChange={(e) => setQuantiteRecue(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Saisir la quantité reçue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optionnel)</label>
                  <textarea
                    value={notesConfirmation}
                    onChange={(e) => setNotesConfirmation(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Observations sur la réception..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setSelectedDemande(null);
                    setQuantiteRecue('');
                    setNotesConfirmation('');
                  }}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmerReception}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de détails */}
        {showDetails && selectedDemande && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* En-tête */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-3xl">{getTypeIcon(selectedDemande.type_dechet)}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{recycleurService.getTypeLabel(selectedDemande.type_dechet)}</h3>
                      <p className="text-emerald-100">Demande #{selectedDemande.id?.substring(0, 8)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Corps */}
              <div className="p-6 space-y-6">
                {/* Statut */}
                <div className="flex gap-3">
                  {(() => {
                    const status = getStatusBadge(selectedDemande.statut);
                    const StatusIcon = status.icon;
                    return (
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${status.color}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {status.label}
                      </span>
                    );
                  })()}
                </div>

                {/* Grille d'informations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiPackage className="w-4 h-4" /> Quantité
                    </h4>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedDemande.quantite_demandee} <span className="text-sm font-normal text-gray-500">kg</span>
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiUser className="w-4 h-4" /> Contact
                    </h4>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-gray-900">
                        <FiUser className="w-4 h-4 text-gray-400" />
                        {selectedDemande.nom_contact || 'Non spécifié'}
                      </p>
                      <p className="flex items-center gap-2 text-gray-900">
                        <FiPhone className="w-4 h-4 text-gray-400" />
                        {selectedDemande.telephone_contact || 'Non spécifié'}
                      </p>
                      {selectedDemande.email_contact && (
                        <p className="flex items-center gap-2 text-gray-900">
                          <FiMail className="w-4 h-4 text-gray-400" />
                          {selectedDemande.email_contact}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Point de dépôt */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    <FiHome className="w-4 h-4" /> Point de dépôt
                  </h4>
                  <p className="text-gray-900">{selectedDemande.nom_point || 'Non spécifié'}</p>
                  {selectedDemande.adresse_point && (
                    <p className="text-sm text-gray-500 mt-1">{selectedDemande.adresse_point}</p>
                  )}
                </div>

                {/* Description */}
                {selectedDemande.description && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiFileText className="w-4 h-4" /> Description
                    </h4>
                    <p className="text-gray-700">{selectedDemande.description}</p>
                  </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Date de soumission</p>
                    <p className="font-medium text-gray-900">{formatDate(selectedDemande.cree_le)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Date souhaitée</p>
                    <p className="font-medium text-gray-900">{formatDate(selectedDemande.date_souhaitee) || 'Non spécifiée'}</p>
                  </div>
                </div>

                {/* Motif de rejet */}
                {selectedDemande.statut === 'refusee' && selectedDemande.motif_refus && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <FiAlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800">Motif du rejet</h4>
                        <p className="text-sm text-red-600 mt-1">{selectedDemande.motif_refus}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Boutons d'action */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                  {selectedDemande.statut === 'en_attente' && (
                    <>
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                        <FiEdit className="w-4 h-4" />
                        Modifier
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                        <FiTrash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MesDemandes;