// import React, { useState, useEffect } from 'react';
// import DashboardLayout from '../../Layouts/LayoutDashboard';
// import { 
//   FiPackage, FiSearch, FiFilter, FiEye, FiPlus, FiTruck,
//   FiMapPin, FiCalendar, FiDollarSign, FiTrendingUp,
//   FiRefreshCw, FiDownload, FiAlertCircle, FiX,
//   FiChevronDown, FiBarChart2, FiClock, FiAward,
//   FiHome, FiUser, FiShoppingBag, FiArchive, FiCheckCircle
// } from 'react-icons/fi';
// import { FaRecycle, FaLeaf, FaChartLine } from 'react-icons/fa';

// const StocksList = () => {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [filterQuality, setFilterQuality] = useState('all');
//   const [filterLocation, setFilterLocation] = useState('all');
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortBy, setSortBy] = useState('date');
//   const [sortOrder, setSortOrder] = useState('desc');

//   useEffect(() => {
//     // Simuler le chargement des stocks
//     setTimeout(() => {
//       setStocks([
//         {
//           id: 1,
//           type: 'Plastique PET',
//           category: 'plastique',
//           quantity: 500,
//           unit: 'kg',
//           price: 1.20,
//           totalValue: 600,
//           location: 'Paris',
//           date: '2024-03-15',
//           supplier: 'EcoPlastique SA',
//           quality: 'A',
//           status: 'available',
//           icon: '🥤',
//           lastUpdated: '2024-03-15T10:30:00',
//           minStock: 200,
//           maxStock: 1000
//         },
//         {
//           id: 2,
//           type: 'Carton',
//           category: 'papier',
//           quantity: 1200,
//           unit: 'kg',
//           price: 0.80,
//           totalValue: 960,
//           location: 'Lyon',
//           date: '2024-03-14',
//           supplier: 'RecycleCarton',
//           quality: 'A',
//           status: 'available',
//           icon: '📦',
//           lastUpdated: '2024-03-14T14:20:00',
//           minStock: 300,
//           maxStock: 2000
//         },
//         {
//           id: 3,
//           type: 'Verre',
//           category: 'verre',
//           quantity: 800,
//           unit: 'kg',
//           price: 0.60,
//           totalValue: 480,
//           location: 'Marseille',
//           date: '2024-03-13',
//           supplier: 'VerreRecycle',
//           quality: 'B',
//           status: 'available',
//           icon: '🥃',
//           lastUpdated: '2024-03-13T09:15:00',
//           minStock: 400,
//           maxStock: 1500
//         },
//         {
//           id: 4,
//           type: 'Métal - Aluminium',
//           category: 'metal',
//           quantity: 300,
//           unit: 'kg',
//           price: 2.50,
//           totalValue: 750,
//           location: 'Toulouse',
//           date: '2024-03-12',
//           supplier: 'MetalRecycle',
//           quality: 'A',
//           status: 'reserved',
//           icon: '🥫',
//           lastUpdated: '2024-03-12T16:45:00',
//           minStock: 100,
//           maxStock: 800
//         },
//         {
//           id: 5,
//           type: 'Papier',
//           category: 'papier',
//           quantity: 2000,
//           unit: 'kg',
//           price: 0.40,
//           totalValue: 800,
//           location: 'Bordeaux',
//           date: '2024-03-11',
//           supplier: 'PapierVert',
//           quality: 'A',
//           status: 'available',
//           icon: '📄',
//           lastUpdated: '2024-03-11T11:30:00',
//           minStock: 500,
//           maxStock: 3000
//         },
//         {
//           id: 6,
//           type: 'Plastique PEHD',
//           category: 'plastique',
//           quantity: 150,
//           unit: 'kg',
//           price: 1.50,
//           totalValue: 225,
//           location: 'Lille',
//           date: '2024-03-10',
//           supplier: 'PlastiqueNord',
//           quality: 'C',
//           status: 'critical',
//           icon: '🧴',
//           lastUpdated: '2024-03-10T08:00:00',
//           minStock: 200,
//           maxStock: 600
//         }
//       ]);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Extraire les localisations uniques
//   const locations = [...new Set(stocks.map(s => s.location))];

//   const filteredStocks = stocks.filter(stock => {
//     const matchesSearch = 
//       stock.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       stock.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       stock.location.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = filterType === 'all' || stock.status === filterType;
//     const matchesQuality = filterQuality === 'all' || stock.quality === filterQuality;
//     const matchesLocation = filterLocation === 'all' || stock.location === filterLocation;
    
//     return matchesSearch && matchesStatus && matchesQuality && matchesLocation;
//   });

//   // Trier les stocks
//   const sortedStocks = [...filteredStocks].sort((a, b) => {
//     let comparison = 0;
//     switch (sortBy) {
//       case 'date':
//         comparison = new Date(a.date) - new Date(b.date);
//         break;
//       case 'price':
//         comparison = a.price - b.price;
//         break;
//       case 'quantity':
//         comparison = a.quantity - b.quantity;
//         break;
//       case 'value':
//         comparison = a.totalValue - b.totalValue;
//         break;
//       default:
//         comparison = 0;
//     }
//     return sortOrder === 'asc' ? comparison : -comparison;
//   });

//   const getQualityColor = (quality) => {
//     switch (quality) {
//       case 'A': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       case 'B': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'C': return 'bg-red-100 text-red-800 border-red-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'available': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       case 'reserved': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'critical': return 'bg-red-100 text-red-800 border-red-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 'available': return 'Disponible';
//       case 'reserved': return 'Réservé';
//       case 'critical': return 'Critique';
//       default: return status;
//     }
//   };

//   const getStockLevel = (quantity, min, max) => {
//     if (quantity < min) return { color: 'text-red-600', bg: 'bg-red-50', text: 'Stock bas' };
//     if (quantity > max * 0.8) return { color: 'text-emerald-600', bg: 'bg-emerald-50', text: 'Stock élevé' };
//     return { color: 'text-blue-600', bg: 'bg-blue-50', text: 'Stock normal' };
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

//   const getCategoryIcon = (category) => {
//     const icons = {
//       'plastique': '🥤',
//       'papier': '📦',
//       'verre': '🥃',
//       'metal': '🥫',
//       'organique': '🌱'
//     };
//     return icons[category] || '📦';
//   };

//   if (loading) {
//     return (
//       <DashboardLayout title="Stocks disponibles" user={{ type: 'recycleur' }}>
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="relative mx-auto w-20 h-20">
//               <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <FaRecycle className="w-8 h-8 text-emerald-500" />
//               </div>
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Chargement des stocks...</p>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout title="Stocks disponibles" user={{ type: 'recycleur' }}>
//       <div className="p-6 bg-gray-50 min-h-screen">
//         {/* En-tête avec gradient */}
//         <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
//                 <FiArchive className="w-6 h-6 md:w-8 md:h-8" />
//                 Gestion des stocks
//               </h1>
//               <p className="text-emerald-100 text-sm md:text-base">
//                 Consultez et gérez l'ensemble de vos stocks de matériaux recyclables
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0 flex gap-3">
//               <button className="inline-flex items-center gap-2 bg-white/20 text-white px-3 md:px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm text-sm md:text-base">
//                 <FiRefreshCw className="w-4 h-4" />
//                 Actualiser
//               </button>
//               <button className="inline-flex items-center gap-2 bg-white text-emerald-700 px-4 md:px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg text-sm md:text-base">
//                 <FiPlus className="w-4 h-4 md:w-5 md:h-5" />
//                 Ajouter du stock
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Alertes stocks critiques */}
//         {stocks.filter(s => s.status === 'critical').length > 0 && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
//             <div className="flex items-start gap-3">
//               <FiAlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
//               <div className="flex-1">
//                 <p className="font-medium text-red-800">Stocks critiques détectés</p>
//                 <p className="text-sm text-red-700 mt-1">
//                   {stocks.filter(s => s.status === 'critical').length} matériau(x) sont en dessous du seuil minimum.
//                 </p>
//               </div>
//               <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
//                 Voir les alertes
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Statistiques */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-gray-600 mb-1">Total stocks</p>
//                 <p className="text-xl font-bold text-gray-900">{filteredStocks.length}</p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <FiPackage className="text-blue-600 text-xl" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-gray-600 mb-1">Poids total</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {filteredStocks.reduce((sum, stock) => sum + stock.quantity, 0)} kg
//                 </p>
//               </div>
//               <div className="p-3 bg-emerald-100 rounded-xl">
//                 <FiTrendingUp className="text-emerald-600 text-xl" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-gray-600 mb-1">Valeur totale</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {formatCurrency(filteredStocks.reduce((sum, stock) => sum + stock.totalValue, 0))}
//                 </p>
//               </div>
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <FiDollarSign className="text-purple-600 text-xl" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-gray-600 mb-1">Disponibles</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {filteredStocks.filter(s => s.status === 'available').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-orange-100 rounded-xl">
//                 <FiCheckCircle className="text-orange-600 text-xl" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filtres et recherche */}
//         <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 mb-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div className="flex-1 max-w-md w-full">
//               <div className="relative">
//                 <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Rechercher par type, fournisseur ou localisation..."
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
            
//             <div className="flex flex-wrap items-center gap-3">
//               <div className="relative">
//                 <select
//                   className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-10"
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                 >
//                   <option value="all">Tous les statuts</option>
//                   <option value="available">Disponibles</option>
//                   <option value="reserved">Réservés</option>
//                   <option value="critical">Critiques</option>
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//               </div>
              
//               <button
//                 className={`flex items-center justify-center px-4 py-3 rounded-xl transition-colors ${
//                   showFilters ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <FiFilter className="mr-2" />
//                 Filtres
//               </button>
              
//               <button className="flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
//                 <FiDownload className="mr-2" />
//                 Exporter
//               </button>
//             </div>
//           </div>

//           {showFilters && (
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Qualité</label>
//                   <div className="relative">
//                     <select
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-10"
//                       value={filterQuality}
//                       onChange={(e) => setFilterQuality(e.target.value)}
//                     >
//                       <option value="all">Toutes qualités</option>
//                       <option value="A">Qualité A</option>
//                       <option value="B">Qualité B</option>
//                       <option value="C">Qualité C</option>
//                     </select>
//                     <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
//                   <div className="relative">
//                     <select
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-10"
//                       value={filterLocation}
//                       onChange={(e) => setFilterLocation(e.target.value)}
//                     >
//                       <option value="all">Toutes les villes</option>
//                       {locations.map(loc => (
//                         <option key={loc} value={loc}>{loc}</option>
//                       ))}
//                     </select>
//                     <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
//                   <div className="relative">
//                     <select
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-10"
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                     >
//                       <option value="date">Date</option>
//                       <option value="price">Prix</option>
//                       <option value="quantity">Quantité</option>
//                       <option value="value">Valeur</option>
//                     </select>
//                     <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Ordre</label>
//                   <div className="relative">
//                     <select
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-10"
//                       value={sortOrder}
//                       onChange={(e) => setSortOrder(e.target.value)}
//                     >
//                       <option value="desc">Plus récent d'abord</option>
//                       <option value="asc">Plus ancien d'abord</option>
//                     </select>
//                     <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Liste des stocks en cartes */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <FiPackage className="text-emerald-600" />
//               Liste des stocks disponibles
//               <span className="ml-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
//                 {filteredStocks.length} articles
//               </span>
//             </h3>
//           </div>
          
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {sortedStocks.map((stock) => {
//                 const level = getStockLevel(stock.quantity, stock.minStock, stock.maxStock);
//                 return (
//                   <div key={stock.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all hover:-translate-y-1">
//                     {/* En-tête de la carte */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center text-2xl">
//                           {stock.icon}
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">{stock.type}</h4>
//                           <p className="text-xs text-gray-500">{stock.supplier}</p>
//                         </div>
//                       </div>
//                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${getQualityColor(stock.quality)}`}>
//                         Qualité {stock.quality}
//                       </span>
//                     </div>

//                     {/* Informations principales */}
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <p className="text-xs text-gray-500 mb-1">Quantité</p>
//                         <p className="text-xl font-bold text-gray-900">{stock.quantity} {stock.unit}</p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 mb-1">Prix</p>
//                         <p className="text-lg font-semibold text-gray-900">{stock.price} €/{stock.unit}</p>
//                       </div>
//                     </div>

//                     {/* Barre de progression du stock */}
//                     <div className="mb-4">
//                       <div className="flex justify-between text-xs mb-1">
//                         <span className="text-gray-500">Niveau de stock</span>
//                         <span className={`font-medium ${level.color}`}>{level.text}</span>
//                       </div>
//                       <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div 
//                           className={`h-full ${
//                             stock.quantity < stock.minStock ? 'bg-red-500' :
//                             stock.quantity > stock.maxStock * 0.8 ? 'bg-emerald-500' : 'bg-blue-500'
//                           }`}
//                           style={{ width: `${(stock.quantity / stock.maxStock) * 100}%` }}
//                         />
//                       </div>
//                       <div className="flex justify-between text-xs mt-1">
//                         <span className="text-gray-400">Min: {stock.minStock} kg</span>
//                         <span className="text-gray-400">Max: {stock.maxStock} kg</span>
//                       </div>
//                     </div>

//                     {/* Informations supplémentaires */}
//                     <div className="grid grid-cols-2 gap-2 text-sm mb-4">
//                       <div className="flex items-center gap-1 text-gray-600">
//                         <FiMapPin className="w-4 h-4 text-gray-400" />
//                         <span>{stock.location}</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-gray-600">
//                         <FiCalendar className="w-4 h-4 text-gray-400" />
//                         <span>{formatDate(stock.date)}</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-gray-600">
//                         <FiDollarSign className="w-4 h-4 text-gray-400" />
//                         <span>{formatCurrency(stock.totalValue)}</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-gray-600">
//                         <FiClock className="w-4 h-4 text-gray-400" />
//                         <span>{new Date(stock.lastUpdated).toLocaleTimeString('fr-FR')}</span>
//                       </div>
//                     </div>

//                     {/* Statut et actions */}
//                     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                       <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(stock.status)}`}>
//                         {getStatusText(stock.status)}
//                       </span>
//                       <div className="flex items-center gap-2">
//                         <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Voir détails">
//                           <FiEye className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Ajouter">
//                           <FiPlus className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Réserver">
//                           <FiTruck className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {sortedStocks.length === 0 && (
//               <div className="text-center py-12">
//                 <FiPackage className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun stock trouvé</h3>
//                 <p className="text-gray-500">Aucun stock ne correspond à vos critères de recherche</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default StocksList;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../Layouts/LayoutDashboard';
import recycleurService from '../../services/recycleurService';
import { 
  FiPackage, FiSearch, FiFilter, FiEye, FiPlus, FiTruck,
  FiMapPin, FiCalendar, FiDollarSign, FiTrendingUp,
  FiRefreshCw, FiDownload, FiAlertCircle, FiX,
  FiChevronDown, FiBarChart2, FiClock, FiAward,
  FiHome, FiUser, FiShoppingBag, FiArchive, FiCheckCircle
} from 'react-icons/fi';
import { FaRecycle, FaLeaf, FaChartLine } from 'react-icons/fa';
import toast from 'react-hot-toast';

const StocksList = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totaux, setTotaux] = useState({
    totalGlobal: '0',
    totauxParType: {}
  });
  const [filters, setFilters] = useState({
    typeDechet: '',
    commune: '',
    search: ''
  });
  const [user, setUser] = useState(null);

  // États modernes pour filtres supplémentaires
  const [showFilters, setShowFilters] = useState(false);
  const [filterQuality, setFilterQuality] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user'));
    setUser(userData);
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      setLoading(true);
      const response = await recycleurService.getStocks(filters);
      console.log('📦 Stocks reçus:', response);
      
      if (response && response.stocks) {
        setStocks(response.stocks);
        setTotaux({
          totalGlobal: response.totalGlobal || '0',
          totauxParType: response.totauxParType || {}
        });
      } else if (Array.isArray(response)) {
        setStocks(response);
      } else {
        setStocks([]);
      }
    } catch (error) {
      console.error('❌ Erreur chargement stocks:', error);
      toast.error('Erreur lors du chargement des stocks');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStocks();
    setRefreshing(false);
    toast.success('Stocks actualisés');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    loadStocks();
  };

  const resetFilters = () => {
    setFilters({
      typeDechet: '',
      commune: '',
      search: ''
    });
    setFilterQuality('all');
    setFilterLocation('all');
    setSortBy('date');
    setSortOrder('desc');
    setTimeout(loadStocks, 100);
  };

  const typesDechet = [
    { value: 'plastique_pet', label: 'Plastique PET' },
    { value: 'plastique_pehd', label: 'Plastique PEHD' },
    { value: 'papier_carton', label: 'Papier/Carton' },
    { value: 'metal', label: 'Métal' },
    { value: 'verre', label: 'Verre' },
    { value: 'organique', label: 'Organique' },
  ];

  // Fonctions d'affichage modernes
  const getTypeIcon = (type) => {
    const typeLower = type?.toLowerCase() || '';
    if (typeLower.includes('plastique')) return '🥤';
    if (typeLower.includes('carton') || typeLower.includes('papier')) return '📦';
    if (typeLower.includes('verre')) return '🥃';
    if (typeLower.includes('metal') || typeLower.includes('métal')) return '🥫';
    if (typeLower.includes('organique')) return '🌱';
    return '📦';
  };

  const getQualityColor = (quality) => {
    if (!quality) return 'bg-gray-100 text-gray-800 border-gray-200';
    const q = quality.toString().toUpperCase();
    switch (q) {
      case 'A': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'B': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'C': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    const stat = status || 'available';
    switch (stat) {
      case 'available': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'reserved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    const stat = status || 'available';
    switch (stat) {
      case 'available': return 'Disponible';
      case 'reserved': return 'Réservé';
      case 'critical': return 'Critique';
      default: return stat;
    }
  };

  const getStockLevel = (quantity, min = 0, max = 1000) => {
    const q = parseFloat(quantity) || 0;
    if (q < min) return { color: 'text-red-600', bg: 'bg-red-50', text: 'Stock bas' };
    if (q > max * 0.8) return { color: 'text-emerald-600', bg: 'bg-emerald-50', text: 'Stock élevé' };
    return { color: 'text-blue-600', bg: 'bg-blue-50', text: 'Stock normal' };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Filtrer et trier les stocks pour l'affichage (en plus des filtres API)
  const filteredStocks = stocks.filter(stock => {
    if (filterQuality !== 'all' && stock.qualite !== filterQuality) return false;
    if (filterLocation !== 'all' && stock.commune !== filterLocation) return false;
    return true;
  });

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.dernier_mouvement || 0) - new Date(b.dernier_mouvement || 0);
        break;
      case 'price':
        comparison = (a.prix_unitaire || 0) - (b.prix_unitaire || 0);
        break;
      case 'quantity':
        comparison = (a.quantite_disponible || 0) - (b.quantite_disponible || 0);
        break;
      case 'value':
        comparison = (a.quantite_disponible * (a.prix_unitaire || 0)) - (b.quantite_disponible * (b.prix_unitaire || 0));
        break;
      default:
        comparison = 0;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Statistiques
  const stats = {
    total: filteredStocks.length,
    totalQuantity: filteredStocks.reduce((sum, s) => sum + parseFloat(s.quantite_disponible || 0), 0),
    totalValue: filteredStocks.reduce((sum, s) => sum + (parseFloat(s.quantite_disponible) * (parseFloat(s.prix_unitaire) || 0)), 0),
    available: filteredStocks.filter(s => s.statut === 'available' || !s.statut).length
  };

  if (loading) {
    return (
      <DashboardLayout title="Stocks disponibles" user={user}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaRecycle className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des stocks...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Stocks disponibles" user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                <FiArchive className="w-6 h-6 md:w-8 md:h-8" />
                Gestion des stocks
              </h1>
              <p className="text-emerald-100 text-sm md:text-base">
                Consultez et gérez l'ensemble de vos stocks de matériaux recyclables
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 bg-white/20 text-white px-3 md:px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm text-sm md:text-base disabled:opacity-50"
              >
                <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Actualiser
              </button>
              <Link 
                to="/recycleur/demandes/nouvelle"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-4 md:px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg text-sm md:text-base"
              >
                <FiPlus className="w-4 h-4 md:w-5 md:h-5" />
                Nouvelle demande
              </Link>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total stocks</p>
                <p className="text-xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiPackage className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Poids total</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.totalQuantity.toFixed(1)} kg
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <FiTrendingUp className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          
          
          
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Disponibles</p>
                <p className="text-xl font-bold text-gray-900">{stats.available}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <FiCheckCircle className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  placeholder="Rechercher par type, fournisseur ou localisation..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select
                  name="typeDechet"
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-10"
                  value={filters.typeDechet}
                  onChange={handleFilterChange}
                >
                  <option value="">Tous les types</option>
                  {typesDechet.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              
              <button
                className={`flex items-center justify-center px-4 py-3 rounded-xl transition-colors ${
                  showFilters ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter className="mr-2" />
                Filtres
              </button>
              
              <button 
                onClick={applyFilters}
                className="flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Appliquer
              </button>
              
              <button 
                onClick={resetFilters}
                className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Réinitialiser
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualité</label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-10"
                      value={filterQuality}
                      onChange={(e) => setFilterQuality(e.target.value)}
                    >
                      <option value="all">Toutes qualités</option>
                      <option value="A">Qualité A</option>
                      <option value="B">Qualité B</option>
                      <option value="C">Qualité C</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Filtrer par commune"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={filters.commune}
                      onChange={(e) => setFilters(prev => ({ ...prev, commune: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-10"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="date">Date</option>
                      <option value="price">Prix</option>
                      <option value="quantity">Quantité</option>
                      <option value="value">Valeur</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ordre</label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-10"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="desc">Plus récent d'abord</option>
                      <option value="asc">Plus ancien d'abord</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Liste des stocks en cartes */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiPackage className="text-emerald-600" />
              Liste des stocks disponibles
              <span className="ml-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                {sortedStocks.length} articles
              </span>
            </h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedStocks.map((stock) => {
                const typeLabel = recycleurService.getTypeLabel(stock.type_dechet);
                const icon = getTypeIcon(stock.type_dechet);
                const level = getStockLevel(
                  stock.quantite_disponible,
                  stock.seuil_min,
                  stock.seuil_max
                );
                const prixUnitaire = stock.prix_unitaire || 1.2; // valeur par défaut si absente
                const totalValue = (parseFloat(stock.quantite_disponible) * prixUnitaire) || 0;

                return (
                  <div key={`${stock.point_depot_id}-${stock.type_dechet}`} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all hover:-translate-y-1">
                    {/* En-tête de la carte */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center text-2xl">
                          {icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{typeLabel}</h4>
                          <p className="text-xs text-gray-500">{stock.point_nom || 'Point de collecte'}</p>
                        </div>
                      </div>
                     
                    </div>

                    {/* Informations principales */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quantité</p>
                        <p className="text-xl font-bold text-gray-900">
                          {parseFloat(stock.quantite_disponible || 0).toFixed(1)} kg
                        </p>
                      </div>
                      <div>
                        
                      </div>
                    </div>

                    {/* Barre de progression du stock (si seuils disponibles) */}
                    {stock.seuil_min && stock.seuil_max && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Niveau de stock</span>
                          <span className={`font-medium ${level.color}`}>{level.text}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              stock.quantite_disponible < stock.seuil_min ? 'bg-red-500' :
                              stock.quantite_disponible > stock.seuil_max * 0.8 ? 'bg-emerald-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${(stock.quantite_disponible / stock.seuil_max) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-gray-400">Min: {stock.seuil_min} kg</span>
                          <span className="text-gray-400">Max: {stock.seuil_max} kg</span>
                        </div>
                      </div>
                    )}

                    {/* Informations supplémentaires */}
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <FiMapPin className="w-4 h-4 text-gray-400" />
                        <span>{stock.commune || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <FiCalendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(stock.dernier_mouvement)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-600">
                        <FiClock className="w-4 h-4 text-gray-400" />
                        <span>{(stock.quantite_disponible > 0) ? 'Dispo' : 'Épuisé'}</span>
                      </div>
                    </div>

                    {/* Statut et actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(stock.statut)}`}>
                        {getStatusText(stock.statut)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Link 
                          to={`/recycleur/points/${stock.point_depot_id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <FiEye className="w-4 h-4" />
                        </Link>
                        <Link 
                          to={`/recycleur/demandes/nouvelle?point=${stock.point_depot_id}&type=${stock.type_dechet}`}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Demander"
                        >
                          <FiTruck className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {sortedStocks.length === 0 && (
              <div className="text-center py-12">
                <FiPackage className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun stock trouvé</h3>
                <p className="text-gray-500">Aucun stock ne correspond à vos critères de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StocksList;