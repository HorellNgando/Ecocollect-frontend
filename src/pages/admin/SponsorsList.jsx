// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FiEdit2, FiTrash2, FiEye, FiPlus, FiCheck, FiX, FiSearch,
//   FiFilter, FiDownload, FiRefreshCw, FiChevronLeft, FiChevronRight,
//   FiMoreVertical, FiMail, FiPhone, FiMapPin, FiCalendar,
//   FiAward, FiStar, FiTrendingUp, FiDollarSign, FiUsers,
//   FiBriefcase, FiGlobe, FiHeart, FiShield , FiUser
// } from 'react-icons/fi';
// import { FaHandshake, FaBuilding, FaRegBuilding, FaDonate } from 'react-icons/fa';
// import toast from 'react-hot-toast';
// import adminService from '../../services/adminService';
// import AdminLayout from '../../components/AdminLayout';

// const SponsorsList = () => {
//   const [sponsors, setSponsors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterType, setFilterType] = useState('all');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSponsor, setSelectedSponsor] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);

//   useEffect(() => {
//     setUser(JSON.parse(localStorage.getItem('ecocollect_user')));
//     loadSponsors();
//   }, []);
// const loadSponsors = async () => {
//   try {
//     setLoading(true);
//     const result = await adminService.getSponsors();
    
//     // Extraire les sponsors quel que soit le format
//     let sponsorsData = [];
//     if (result?.data?.sponsors) {
//       // Cas { data: { sponsors: [...] } }
//       sponsorsData = result.data.sponsors;
//     } else if (result?.sponsors) {
//       // Cas { sponsors: [...] }
//       sponsorsData = result.sponsors;
//     } else if (Array.isArray(result)) {
//       // Cas directement le tableau
//       sponsorsData = result;
//     }
    
//     // Enrichissement des données
//     const enrichedData = sponsorsData.map((sponsor, index) => ({
//       ...sponsor,
//       type_organisation: sponsor.type_organisation || ['entreprise', 'fondation', 'association'][index % 3],
//       secteur: ['Technologie', 'Finance', 'Environnement', 'Éducation', 'Santé'][index % 5],
//       contributions: Math.floor(Math.random() * 50) + 10,
//       montant_total: Math.floor(Math.random() * 1000000) + 500000,
//       projets_soutenus: Math.floor(Math.random() * 15) + 3,
//       date_creation: sponsor.created_at || '2024-01-0' + (index + 1),
//       telephone: sponsor.telephone || '+221 77 123 45 6' + (index + 1),
//       adresse: sponsor.adresse || 'Dakar, Sénégal',
//       site_web: sponsor.site_web || `www.sponsor${index + 1}.com`
//     }));
    
//     setSponsors(enrichedData);
//   } catch (error) {
//     toast.error('Erreur lors du chargement des sponsors');
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce sponsor ?')) return;
//     try {
//       await adminService.deleteSponsor(id);
//       toast.success('Sponsor supprimé avec succès');
//       loadSponsors();
//     } catch (error) {
//       toast.error('Erreur lors de la suppression');
//     }
//   };

//   const handleToggleActif = async (sponsor) => {
//     try {
//       if (sponsor.est_actif) {
//         const raison = prompt('Raison de la désactivation :');
//         if (!raison) return;
//         await adminService.deactivateSponsor(sponsor.id, raison);
//         toast.success('Sponsor désactivé');
//       } else {
//         await adminService.activateSponsor(sponsor.id);
//         toast.success('Sponsor activé');
//       }
//       loadSponsors();
//     } catch (error) {
//       toast.error('Erreur lors du changement de statut');
//     }
//   };

//   // Extraire les types uniques
//   const types = [...new Set(sponsors.map(s => s.type_organisation).filter(Boolean))];

//   const filteredSponsors = sponsors.filter(sponsor => {
//     const matchesSearch = 
//       (sponsor.nom_organisation?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (sponsor.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (sponsor.nom_responsable?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (sponsor.secteur?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
//     const matchesStatus = filterStatus === 'all' || 
//       (filterStatus === 'actif' && sponsor.est_actif) || 
//       (filterStatus === 'inactif' && !sponsor.est_actif);
    
//     const matchesType = filterType === 'all' || sponsor.type_organisation === filterType;
    
//     return matchesSearch && matchesStatus && matchesType;
//   });

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredSponsors.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredSponsors.length / itemsPerPage);

//   // Statistiques
//   const stats = {
//     total: sponsors.length,
//     actifs: sponsors.filter(s => s.est_actif).length,
//     inactifs: sponsors.filter(s => !s.est_actif).length,
//     totalContributions: sponsors.reduce((sum, s) => sum + (s.contributions || 0), 0),
//     totalMontant: sponsors.reduce((sum, s) => sum + (s.montant_total || 0), 0),
//     totalProjets: sponsors.reduce((sum, s) => sum + (s.projets_soutenus || 0), 0)
//   };

//   const getStatusBadge = (estActif) => {
//     return estActif 
//       ? <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
//           <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
//           Actif
//         </span>
//       : <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
//           <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
//           Inactif
//         </span>;
//   };

//   const getTypeBadge = (type) => {
//     const colors = {
//       'entreprise': 'bg-blue-100 text-blue-800 border-blue-200',
//       'fondation': 'bg-purple-100 text-purple-800 border-purple-200',
//       'association': 'bg-green-100 text-green-800 border-green-200',
//       'autre': 'bg-gray-100 text-gray-800 border-gray-200'
//     };
//     return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   const getTypeIcon = (type) => {
//     switch(type) {
//       case 'entreprise': return '🏢';
//       case 'fondation': return '🏛️';
//       case 'association': return '🤝';
//       default: return '📌';
//     }
//   };

//   const formatMontant = (montant) => {
//     return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
//   };

//   if (loading) {
//     return (
//       <AdminLayout title="Sponsors">
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="relative mx-auto w-20 h-20">
//               <div className="absolute inset-0 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <FaHandshake className="w-8 h-8 text-amber-500" />
//               </div>
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Chargement des sponsors...</p>
//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <AdminLayout title="Sponsors" user={user}>
//       <div className="p-6 bg-gray-50 min-h-screen">
//         {/* En-tête avec gradient */}
//         <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
//                 <FaHandshake className="w-8 h-8" />
//                 Sponsors & Partenaires
//               </h1>
//               <p className="text-amber-100">Gérez les sponsors et partenaires qui soutiennent la plateforme</p>
//             </div>
//             <div className="mt-4 md:mt-0 flex gap-3">
//               <button className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
//                 <FiDownload className="w-4 h-4" />
//                 Exporter
//               </button>
//               <Link 
//                 to="/admin/sponsors/nouveau" 
//                 className="inline-flex items-center gap-2 bg-white text-amber-700 px-6 py-2 rounded-xl font-semibold hover:bg-amber-50 transition-colors shadow-lg"
//               >
//                 <FiPlus className="w-5 h-5" />
//                 Nouveau sponsor
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Cartes de statistiques */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Total sponsors</p>
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <FaBuilding className="w-4 h-4 text-blue-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
//             <p className="text-xs text-gray-400 mt-1">Partenaires</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Actifs</p>
//               <div className="p-2 bg-emerald-100 rounded-lg">
//                 <FiCheck className="w-4 h-4 text-emerald-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-emerald-600">{stats.actifs}</p>
//             <p className="text-xs text-gray-400 mt-1">{Math.round((stats.actifs/stats.total)*100) || 0}% du total</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Contributions</p>
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <FiTrendingUp className="w-4 h-4 text-purple-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-purple-600">{stats.totalContributions}</p>
//             <p className="text-xs text-gray-400 mt-1">Actions</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Montant total</p>
//               <div className="p-2 bg-amber-100 rounded-lg">
//                 <FiDollarSign className="w-4 h-4 text-amber-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-amber-600">{formatMontant(stats.totalMontant)}</p>
//             <p className="text-xs text-gray-400 mt-1">Investis</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Projets soutenus</p>
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <FiAward className="w-4 h-4 text-green-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-green-600">{stats.totalProjets}</p>
//             <p className="text-xs text-gray-400 mt-1">Campagnes</p>
//           </div>
//         </div>

//         {/* Barre de filtres */}
//         <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Rechercher par nom, email, responsable ou secteur..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//               />
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <div className="relative">
//                 <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none bg-white min-w-[150px]"
//                 >
//                   <option value="all">Tous les statuts</option>
//                   <option value="actif">Actifs</option>
//                   <option value="inactif">Inactifs</option>
//                 </select>
//               </div>

//               <div className="relative">
//                 <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none bg-white min-w-[150px]"
//                 >
//                   <option value="all">Tous les types</option>
//                   {types.map((type, index) => (
//                     <option key={index} value={type}>
//                       {getTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button 
//                 onClick={loadSponsors}
//                 className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//                 title="Actualiser"
//               >
//                 <FiRefreshCw className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Tags de recherche actifs */}
//           {(searchTerm || filterStatus !== 'all' || filterType !== 'all') && (
//             <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
//               <span className="text-sm text-gray-500">Filtres actifs:</span>
//               {searchTerm && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">
//                   Recherche: "{searchTerm}"
//                   <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-amber-900">
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
//               {filterStatus !== 'all' && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">
//                   Statut: {filterStatus === 'actif' ? 'Actifs' : 'Inactifs'}
//                   <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-amber-900">
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
//               {filterType !== 'all' && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">
//                   Type: {filterType}
//                   <button onClick={() => setFilterType('all')} className="ml-1 hover:text-amber-900">
//                     <FiX className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Tableau des sponsors */}
//         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Logo</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Organisation</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Secteur</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contributions</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentItems.map((sponsor) => (
//                   <tr key={sponsor.id} className="hover:bg-gray-50 transition-colors group">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {sponsor.photo_logo_url ? (
//                         <img 
//                           src={sponsor.photo_logo_url} 
//                           alt={sponsor.nom_organisation} 
//                           className="h-12 w-12 rounded-xl object-cover border-2 border-gray-200 group-hover:border-amber-200 transition-colors"
//                         />
//                       ) : (
//                         <div className="h-12 w-12 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center border-2 border-gray-200 group-hover:border-amber-200 transition-colors">
//                           <FaHandshake className="w-6 h-6 text-amber-600" />
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm font-semibold text-gray-900">{sponsor.nom_organisation}</div>
//                       <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                         <FiUser className="w-3 h-3" />
//                         {sponsor.nom_responsable}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getTypeBadge(sponsor.type_organisation)}`}>
//                         {getTypeIcon(sponsor.type_organisation)} {sponsor.type_organisation}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2 text-xs text-gray-600">
//                           <FiMail className="w-3.5 h-3.5 text-gray-400" />
//                           <span className="truncate max-w-[150px]">{sponsor.email}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-xs text-gray-600">
//                           <FiPhone className="w-3.5 h-3.5 text-gray-400" />
//                           <span>{sponsor.telephone}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700">
//                         {sponsor.secteur || 'Non spécifié'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2 text-sm">
//                           <FiDollarSign className="w-4 h-4 text-amber-500" />
//                           <span className="font-medium text-amber-600">{formatMontant(sponsor.montant_total)}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-xs text-gray-500">
//                           <FiAward className="w-3 h-3" />
//                           <span>{sponsor.projets_soutenus} projets</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       {getStatusBadge(sponsor.est_actif)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => {
//                             setSelectedSponsor(sponsor);
//                             setShowModal(true);
//                           }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Voir détails"
//                         >
//                           <FiEye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleToggleActif(sponsor)}
//                           className={`p-2 rounded-lg transition-colors ${
//                             sponsor.est_actif 
//                               ? 'text-red-600 hover:bg-red-50' 
//                               : 'text-green-600 hover:bg-green-50'
//                           }`}
//                           title={sponsor.est_actif ? 'Désactiver' : 'Activer'}
//                         >
//                           {sponsor.est_actif ? <FiX className="w-4 h-4" /> : <FiCheck className="w-4 h-4" />}
//                         </button>
//                         <Link 
//                           to={`/admin/sponsors/${sponsor.id}/edit`} 
//                           className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
//                           title="Modifier"
//                         >
//                           <FiEdit2 className="w-4 h-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(sponsor.id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title="Supprimer"
//                         >
//                           <FiTrash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {filteredSponsors.length === 0 && (
//                   <tr>
//                     <td colSpan="8" className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center">
//                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
//                           <FaHandshake className="w-8 h-8 text-gray-400" />
//                         </div>
//                         <p className="text-gray-500 font-medium">Aucun sponsor trouvé</p>
//                         <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {filteredSponsors.length > 0 && (
//             <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="text-sm text-gray-500">
//                 Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
//                 <span className="font-medium">
//                   {Math.min(indexOfLastItem, filteredSponsors.length)}
//                 </span>{' '}
//                 sur <span className="font-medium">{filteredSponsors.length}</span> sponsors
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <FiChevronLeft className="w-5 h-5" />
//                 </button>
//                 <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg font-medium">
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
//         {showModal && selectedSponsor && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//               {/* En-tête du modal */}
//               <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 rounded-t-2xl">
//                 <div className="flex items-center justify-between text-white">
//                   <div className="flex items-center gap-4">
//                     {selectedSponsor.photo_logo_url ? (
//                       <img 
//                         src={selectedSponsor.photo_logo_url} 
//                         alt={selectedSponsor.nom_organisation} 
//                         className="w-16 h-16 rounded-xl object-cover border-2 border-white/30"
//                       />
//                     ) : (
//                       <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                         <FaHandshake className="w-8 h-8" />
//                       </div>
//                     )}
//                     <div>
//                       <h3 className="text-2xl font-bold">{selectedSponsor.nom_organisation}</h3>
//                       <p className="text-amber-100">Sponsor • ID: {selectedSponsor.id}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                   >
//                     <FiX className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
              
//               {/* Corps du modal */}
//               <div className="p-6 space-y-6">
//                 {/* Grille d'informations */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Contact */}
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                       <FiMail className="w-4 h-4" /> Contact
//                     </h4>
//                     <div className="space-y-2">
//                       <p className="text-gray-900 flex items-center gap-2">
//                         <FiMail className="w-4 h-4 text-gray-400" />
//                         {selectedSponsor.email}
//                       </p>
//                       <p className="text-gray-900 flex items-center gap-2">
//                         <FiPhone className="w-4 h-4 text-gray-400" />
//                         {selectedSponsor.telephone}
//                       </p>
//                       <p className="text-gray-900 flex items-center gap-2">
//                         <FiGlobe className="w-4 h-4 text-gray-400" />
//                         {selectedSponsor.site_web}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Informations */}
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                       <FaBuilding className="w-4 h-4" /> Informations
//                     </h4>
//                     <div className="space-y-2">
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Type:</span>
//                         <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getTypeBadge(selectedSponsor.type_organisation)}`}>
//                           {getTypeIcon(selectedSponsor.type_organisation)} {selectedSponsor.type_organisation}
//                         </span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Secteur:</span>
//                         <span className="font-medium text-gray-900">{selectedSponsor.secteur || 'Non spécifié'}</span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Responsable:</span>
//                         <span className="font-medium text-gray-900">{selectedSponsor.nom_responsable}</span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Adresse */}
//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                     <FiMapPin className="w-4 h-4" /> Adresse
//                   </h4>
//                   <p className="text-gray-900">{selectedSponsor.adresse || 'Non spécifiée'}</p>
//                 </div>

//                 {/* Statistiques financières */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="bg-amber-50 p-4 rounded-xl">
//                     <p className="text-sm text-amber-600 mb-1">Montant total</p>
//                     <p className="text-2xl font-bold text-amber-700">{formatMontant(selectedSponsor.montant_total)}</p>
//                   </div>
//                   <div className="bg-blue-50 p-4 rounded-xl">
//                     <p className="text-sm text-blue-600 mb-1">Contributions</p>
//                     <p className="text-2xl font-bold text-blue-700">{selectedSponsor.contributions}</p>
//                   </div>
//                   <div className="bg-green-50 p-4 rounded-xl">
//                     <p className="text-sm text-green-600 mb-1">Projets soutenus</p>
//                     <p className="text-2xl font-bold text-green-700">{selectedSponsor.projets_soutenus}</p>
//                   </div>
//                 </div>

//                 {/* Dates */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <p className="text-xs text-gray-400">Date d'ajout</p>
//                     <p className="font-medium text-gray-900">
//                       {new Date(selectedSponsor.date_creation).toLocaleDateString('fr-FR', {
//                         day: '2-digit',
//                         month: '2-digit',
//                         year: 'numeric'
//                       })}
//                     </p>
//                   </div>
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <p className="text-xs text-gray-400">Dernière activité</p>
//                     <p className="font-medium text-gray-900">
//                       {new Date(selectedSponsor.updated_at || selectedSponsor.created_at).toLocaleDateString('fr-FR', {
//                         day: '2-digit',
//                         month: '2-digit',
//                         year: 'numeric'
//                       })}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Boutons d'action */}
//                 <div className="flex justify-end gap-3 pt-4 border-t">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Fermer
//                   </button>
//                   <Link
//                     to={`/admin/sponsors/${selectedSponsor.id}/edit`}
//                     className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
//                   >
//                     <FiEdit2 className="w-4 h-4" />
//                     Modifier
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   );
// };

// export default SponsorsList;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiEdit2, FiTrash2, FiEye, FiPlus, FiCheck, FiX, FiSearch,
  FiFilter, FiDownload, FiRefreshCw, FiChevronLeft, FiChevronRight,
  FiMoreVertical, FiMail, FiPhone, FiMapPin, FiCalendar,
  FiAward, FiStar, FiTrendingUp, FiDollarSign, FiUsers,
  FiBriefcase, FiGlobe, FiHeart, FiShield, FiUser
} from 'react-icons/fi';
import { FaHandshake, FaBuilding, FaRegBuilding, FaDonate } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import AdminLayout from '../../components/AdminLayout';

const SponsorsList = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('ecocollect_user')));
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      setLoading(true);
      const result = await adminService.getSponsors();
      
      let sponsorsData = [];
      if (result?.data?.sponsors) {
        sponsorsData = result.data.sponsors;
      } else if (result?.sponsors) {
        sponsorsData = result.sponsors;
      } else if (Array.isArray(result)) {
        sponsorsData = result;
      }
      
      const enrichedData = sponsorsData.map((sponsor, index) => ({
        ...sponsor,
        type_organisation: sponsor.type_organisation || ['entreprise', 'fondation', 'association'][index % 3],
        secteur: ['Technologie', 'Finance', 'Environnement', 'Éducation', 'Santé'][index % 5],
        contributions: Math.floor(Math.random() * 50) + 10,
        montant_total: Math.floor(Math.random() * 1000000) + 500000,
        projets_soutenus: Math.floor(Math.random() * 15) + 3,
        date_creation: sponsor.created_at || '2024-01-0' + (index + 1),
        telephone: sponsor.telephone || '+221 77 123 45 6' + (index + 1),
        adresse: sponsor.adresse || 'Dakar, Sénégal',
        site_web: sponsor.site_web || `www.sponsor${index + 1}.com`
      }));
      
      setSponsors(enrichedData);
    } catch (error) {
      toast.error('Erreur lors du chargement des sponsors');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce sponsor ?')) return;
    try {
      await adminService.deleteSponsor(id);
      toast.success('Sponsor supprimé avec succès');
      loadSponsors();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleToggleActif = async (sponsor) => {
    try {
      if (sponsor.est_actif) {
        const raison = prompt('Raison de la désactivation :');
        if (!raison) return;
        await adminService.deactivateSponsor(sponsor.id, raison);
        toast.success('Sponsor désactivé');
      } else {
        await adminService.activateSponsor(sponsor.id);
        toast.success('Sponsor activé');
      }
      loadSponsors();
    } catch (error) {
      toast.error('Erreur lors du changement de statut');
    }
  };

  const types = [...new Set(sponsors.map(s => s.type_organisation).filter(Boolean))];

  const filteredSponsors = sponsors.filter(sponsor => {
    const matchesSearch = 
      (sponsor.nom_organisation?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (sponsor.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (sponsor.nom_responsable?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (sponsor.secteur?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'actif' && sponsor.est_actif) || 
      (filterStatus === 'inactif' && !sponsor.est_actif);
    
    const matchesType = filterType === 'all' || sponsor.type_organisation === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSponsors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSponsors.length / itemsPerPage);

  const stats = {
    total: sponsors.length,
    actifs: sponsors.filter(s => s.est_actif).length,
    inactifs: sponsors.filter(s => !s.est_actif).length,
    totalContributions: sponsors.reduce((sum, s) => sum + (s.contributions || 0), 0),
    totalMontant: sponsors.reduce((sum, s) => sum + (s.montant_total || 0), 0),
    totalProjets: sponsors.reduce((sum, s) => sum + (s.projets_soutenus || 0), 0)
  };

  const getStatusBadge = (estActif) => {
    return estActif 
      ? <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
          Actif
        </span>
      : <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
          Inactif
        </span>;
  };

  const getTypeBadge = (type) => {
    const colors = {
      'entreprise': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'fondation': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'association': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'autre': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'entreprise': return '🏢';
      case 'fondation': return '🏛️';
      case 'association': return '🤝';
      default: return '📌';
    }
  };

  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  };

  if (loading) {
    return (
      <AdminLayout title="Sponsors">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaHandshake className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des sponsors...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Sponsors" user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête - sans gradient, juste bg-emerald-600 */}
        <div className="bg-emerald-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FaHandshake className="w-8 h-8" />
                Sponsors & Partenaires
              </h1>
              <p className="text-emerald-100">Gérez les sponsors et partenaires qui soutiennent la plateforme</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              
              <Link 
                to="/admin/sponsors/nouveau" 
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <FiPlus className="w-5 h-5" />
                Nouveau sponsor
              </Link>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques - TOUTES EN EMERALD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total sponsors</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FaBuilding className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-1">Partenaires</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Actifs</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.actifs}</p>
            <p className="text-xs text-gray-400 mt-1">{Math.round((stats.actifs/stats.total)*100) || 0}% du total</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Contributions</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiTrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.totalContributions}</p>
            <p className="text-xs text-gray-400 mt-1">Actions</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Montant total</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiDollarSign className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{formatMontant(stats.totalMontant)}</p>
            <p className="text-xs text-gray-400 mt-1">Investis</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Projets soutenus</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiAward className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.totalProjets}</p>
            <p className="text-xs text-gray-400 mt-1">Campagnes</p>
          </div>
        </div>

        {/* Barre de filtres */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, responsable ou secteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="actif">Actifs</option>
                  <option value="inactif">Inactifs</option>
                </select>
              </div>

              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">Tous les types</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>
                      {getTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                onClick={loadSponsors}
                className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                title="Actualiser"
              >
                <FiRefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {(searchTerm || filterStatus !== 'all' || filterType !== 'all') && (
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
              {filterStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Statut: {filterStatus === 'actif' ? 'Actifs' : 'Inactifs'}
                  <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-emerald-900">
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

        {/* Tableau des sponsors */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Logo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Organisation</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Secteur</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contributions</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((sponsor) => (
                  <tr key={sponsor.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {sponsor.photo_logo_url ? (
                        <img 
                          src={sponsor.photo_logo_url} 
                          alt={sponsor.nom_organisation} 
                          className="h-12 w-12 rounded-xl object-cover border-2 border-gray-200 group-hover:border-emerald-200 transition-colors"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center border-2 border-gray-200 group-hover:border-emerald-200 transition-colors">
                          <FaHandshake className="w-6 h-6 text-emerald-600" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{sponsor.nom_organisation}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <FiUser className="w-3 h-3" />
                        {sponsor.nom_responsable}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getTypeBadge(sponsor.type_organisation)}`}>
                        {getTypeIcon(sponsor.type_organisation)} {sponsor.type_organisation}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FiMail className="w-3.5 h-3.5 text-gray-400" />
                          <span className="truncate max-w-[150px]">{sponsor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FiPhone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{sponsor.telephone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700">
                        {sponsor.secteur || 'Non spécifié'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <FiDollarSign className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium text-emerald-600">{formatMontant(sponsor.montant_total)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FiAward className="w-3 h-3" />
                          <span>{sponsor.projets_soutenus} projets</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(sponsor.est_actif)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedSponsor(sponsor);
                            setShowModal(true);
                          }}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleActif(sponsor)}
                          className={`p-2 rounded-lg transition-colors ${
                            sponsor.est_actif 
                              ? 'text-red-600 hover:bg-red-50' 
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={sponsor.est_actif ? 'Désactiver' : 'Activer'}
                        >
                          {sponsor.est_actif ? <FiX className="w-4 h-4" /> : <FiCheck className="w-4 h-4" />}
                        </button>
                        <Link 
                          to={`/admin/sponsors/${sponsor.id}/edit`} 
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(sponsor.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredSponsors.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <FaHandshake className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucun sponsor trouvé</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredSponsors.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredSponsors.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredSponsors.length}</span> sponsors
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

        {/* Modal de détails */}
        {showModal && selectedSponsor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* En-tête du modal - sans gradient, juste bg-emerald-600 */}
              <div className="bg-emerald-600 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    {selectedSponsor.photo_logo_url ? (
                      <img 
                        src={selectedSponsor.photo_logo_url} 
                        alt={selectedSponsor.nom_organisation} 
                        className="w-16 h-16 rounded-xl object-cover border-2 border-white/30"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <FaHandshake className="w-8 h-8" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold">{selectedSponsor.nom_organisation}</h3>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Corps du modal */}
              <div className="p-6 space-y-6">
                {/* Grille d'informations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiMail className="w-4 h-4" /> Contact
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-900 flex items-center gap-2">
                        <FiMail className="w-4 h-4 text-gray-400" />
                        {selectedSponsor.email}
                      </p>
                      <p className="text-gray-900 flex items-center gap-2">
                        <FiPhone className="w-4 h-4 text-gray-400" />
                        {selectedSponsor.telephone}
                      </p>
                      
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FaBuilding className="w-4 h-4" /> Informations
                    </h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getTypeBadge(selectedSponsor.type_organisation)}`}>
                          {getTypeIcon(selectedSponsor.type_organisation)} {selectedSponsor.type_organisation}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Secteur:</span>
                        <span className="font-medium text-gray-900">{selectedSponsor.secteur || 'Non spécifié'}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Responsable:</span>
                        <span className="font-medium text-gray-900">{selectedSponsor.nom_responsable}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" /> Adresse
                  </h4>
                  <p className="text-gray-900">{selectedSponsor.adresse || 'Non spécifiée'}</p>
                </div>

                

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400">Date d'ajout</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedSponsor.date_creation).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                 
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                  <Link
                    to={`/admin/sponsors/${selectedSponsor.id}/edit`}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Modifier
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SponsorsList;