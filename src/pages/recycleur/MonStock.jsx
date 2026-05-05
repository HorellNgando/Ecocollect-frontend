// import React, { useState, useEffect } from 'react';
// import DashboardLayout from '../../Layouts/LayoutDashboard';
// import { 
//   FiPackage, FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter,
//   FiTrendingUp, FiBarChart2, FiDollarSign, FiMapPin, FiCalendar,
//   FiEye, FiRefreshCw, FiDownload, FiAlertCircle, FiCheckCircle,
//   FiClock, FiTruck, FiActivity, FiTag, FiX, FiChevronDown,
//   FiHome, FiShoppingBag, FiAward, FiArchive
// } from 'react-icons/fi';
// import { FaRecycle, FaChartLine, FaWarehouse, FaBoxes } from 'react-icons/fa';

// const MonStock = () => {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showFilters, setShowFilters] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [formData, setFormData] = useState({
//     type: '',
//     quantity: '',
//     unit: 'kg',
//     quality: 'A',
//     location: '',
//     description: '',
//     purchasePrice: '',
//     purchaseDate: '',
//     supplier: ''
//   });

//   useEffect(() => {
//     // Simuler le chargement des stocks personnels
//     setTimeout(() => {
//       setStocks([
//         {
//           id: 1,
//           type: 'Plastique PET',
//           quantity: 500,
//           unit: 'kg',
//           quality: 'A',
//           location: 'Entrepôt Paris',
//           description: 'Bouteilles en plastique PET propres et triées',
//           purchasePrice: 1.20,
//           purchaseDate: '2024-03-15',
//           supplier: 'EcoPlastique SA',
//           currentValue: 1.50,
//           lastUpdated: '2024-03-16',
//           status: 'available',
//           category: 'plastique',
//           icon: '🥤'
//         },
//         {
//           id: 2,
//           type: 'Carton',
//           quantity: 1200,
//           unit: 'kg',
//           quality: 'A',
//           location: 'Entrepôt Lyon',
//           description: 'Cartons de déménagement propres et secs',
//           purchasePrice: 0.80,
//           purchaseDate: '2024-03-14',
//           supplier: 'RecycleCarton',
//           currentValue: 0.95,
//           lastUpdated: '2024-03-16',
//           status: 'available',
//           category: 'papier',
//           icon: '📦'
//         },
//         {
//           id: 3,
//           type: 'Verre',
//           quantity: 800,
//           unit: 'kg',
//           quality: 'B',
//           location: 'Entrepôt Marseille',
//           description: 'Bouteilles en verre diverses couleurs',
//           purchasePrice: 0.60,
//           purchaseDate: '2024-03-13',
//           supplier: 'VerreRecycle',
//           currentValue: 0.65,
//           lastUpdated: '2024-03-16',
//           status: 'processing',
//           category: 'verre',
//           icon: '🥃'
//         },
//         {
//           id: 4,
//           type: 'Métal - Aluminium',
//           quantity: 300,
//           unit: 'kg',
//           quality: 'A',
//           location: 'Entrepôt Toulouse',
//           description: 'Canettes et emballages en aluminium',
//           purchasePrice: 2.50,
//           purchaseDate: '2024-03-12',
//           supplier: 'MetalRecycle',
//           currentValue: 2.80,
//           lastUpdated: '2024-03-15',
//           status: 'available',
//           category: 'metal',
//           icon: '🥫'
//         },
//         {
//           id: 5,
//           type: 'Papier',
//           quantity: 2000,
//           unit: 'kg',
//           quality: 'A',
//           location: 'Entrepôt Bordeaux',
//           description: 'Papier bureau et journaux',
//           purchasePrice: 0.40,
//           purchaseDate: '2024-03-11',
//           supplier: 'PapierVert',
//           currentValue: 0.45,
//           lastUpdated: '2024-03-16',
//           status: 'reserved',
//           category: 'papier',
//           icon: '📄'
//         },
//         {
//           id: 6,
//           type: 'Plastique HDPE',
//           quantity: 750,
//           unit: 'kg',
//           quality: 'A',
//           location: 'Entrepôt Paris',
//           description: 'Bouteilles et contenants en HDPE',
//           purchasePrice: 1.00,
//           purchaseDate: '2024-03-10',
//           supplier: 'PlastiquePro',
//           currentValue: 1.20,
//           lastUpdated: '2024-03-16',
//           status: 'available',
//           category: 'plastique',
//           icon: '🧴'
//         }
//       ]);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const filteredStocks = stocks.filter(stock => {
//     const matchesSearch = stock.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          stock.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          stock.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesType = filterType === 'all' || stock.category === filterType;
//     const matchesStatus = filterStatus === 'all' || stock.status === filterStatus;
    
//     return matchesSearch && matchesType && matchesStatus;
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Déterminer la catégorie et l'icône en fonction du type
//     let category = 'autre';
//     let icon = '📦';
    
//     if (formData.type.toLowerCase().includes('plastique')) {
//       category = 'plastique';
//       icon = formData.type.toLowerCase().includes('pet') ? '🥤' : '🧴';
//     } else if (formData.type.toLowerCase().includes('carton') || formData.type.toLowerCase().includes('papier')) {
//       category = 'papier';
//       icon = formData.type.toLowerCase().includes('carton') ? '📦' : '📄';
//     } else if (formData.type.toLowerCase().includes('verre')) {
//       category = 'verre';
//       icon = '🥃';
//     } else if (formData.type.toLowerCase().includes('metal') || formData.type.toLowerCase().includes('aluminium')) {
//       category = 'metal';
//       icon = '🥫';
//     }
    
//     const nouveauStock = {
//       id: stocks.length + 1,
//       ...formData,
//       currentValue: parseFloat(formData.purchasePrice) * 1.1, // Simulation de plus-value
//       lastUpdated: new Date().toISOString().split('T')[0],
//       status: 'available',
//       category,
//       icon
//     };
    
//     setStocks(prev => [nouveauStock, ...prev]);
//     setShowForm(false);
//     setFormData({
//       type: '',
//       quantity: '',
//       unit: 'kg',
//       quality: 'A',
//       location: '',
//       description: '',
//       purchasePrice: '',
//       purchaseDate: '',
//       supplier: ''
//     });
//   };

//   const handleViewDetails = (stock) => {
//     setSelectedStock(stock);
//     setShowDetails(true);
//   };

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
//       case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'sold': return 'bg-gray-100 text-gray-800 border-gray-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 'available': return 'Disponible';
//       case 'processing': return 'En traitement';
//       case 'reserved': return 'Réservé';
//       case 'sold': return 'Vendu';
//       default: return status;
//     }
//   };

//   const calculateTotalValue = () => {
//     return stocks.reduce((total, stock) => total + (stock.quantity * stock.currentValue), 0);
//   };

//   const calculateProfit = () => {
//     return stocks.reduce((total, stock) => {
//       const purchaseValue = stock.quantity * stock.purchasePrice;
//       const currentValue = stock.quantity * stock.currentValue;
//       return total + (currentValue - purchaseValue);
//     }, 0);
//   };

//   const calculateTotalQuantity = () => {
//     return stocks.reduce((sum, stock) => sum + stock.quantity, 0);
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
//   };

//   if (loading) {
//     return (
//       <DashboardLayout title="Mon stock" user={{ type: 'recycleur' }}>
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="relative mx-auto w-20 h-20">
//               <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <FaBoxes className="w-8 h-8 text-emerald-500" />
//               </div>
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Chargement de votre stock...</p>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout title="Mon stock" user={{ type: 'recycleur' }}>
//       <div className="p-6 bg-gray-50 min-h-screen">
//         {/* En-tête avec gradient */}
//         <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
//                 <FaWarehouse className="w-6 h-6 md:w-8 md:h-8" />
//                 Gestion de stock
//               </h1>
//               <p className="text-emerald-100 text-sm md:text-base">
//                 Gérez vos stocks de matières recyclées
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0 flex gap-3">
//               <button className="inline-flex items-center gap-2 bg-white/20 text-white px-3 md:px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm text-sm md:text-base">
//                 <FiDownload className="w-4 h-4" />
//                 Exporter
//               </button>
//               <button 
//                 onClick={() => setShowForm(!showForm)}
//                 className="inline-flex items-center gap-2 bg-white text-emerald-700 px-4 md:px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg text-sm md:text-base"
//               >
//                 <FiPlus className="w-4 h-4 md:w-5 md:h-5" />
//                 Ajouter au stock
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Cartes de statistiques */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//           <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Total articles</p>
//                 <p className="text-2xl md:text-3xl font-bold text-gray-900">{stocks.length}</p>
//                 <div className="flex items-center gap-1 mt-1">
//                   <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
//                     Types de déchets
//                   </span>
//                 </div>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <FaBoxes className="text-blue-600 text-xl md:text-2xl" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Poids total</p>
//                 <p className="text-2xl md:text-3xl font-bold text-gray-900">
//                   {calculateTotalQuantity().toLocaleString()} kg
//                 </p>
//                 <div className="flex items-center gap-1 mt-1">
//                   <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
//                     ~{Math.round(calculateTotalQuantity() / 1000)} tonnes
//                   </span>
//                 </div>
//               </div>
//               <div className="p-3 bg-emerald-100 rounded-xl">
//                 <FiActivity className="text-emerald-600 text-xl md:text-2xl" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Valeur totale</p>
//                 <p className="text-2xl md:text-3xl font-bold text-gray-900">{formatCurrency(calculateTotalValue())}</p>
//                 <div className="flex items-center gap-1 mt-1">
//                   <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
//                     Stock actuel
//                   </span>
//                 </div>
//               </div>
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <FiDollarSign className="text-purple-600 text-xl md:text-2xl" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Profit potentiel</p>
//                 <p className="text-2xl md:text-3xl font-bold text-emerald-600">{formatCurrency(calculateProfit())}</p>
//                 <div className="flex items-center gap-1 mt-1">
//                   <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
//                     +{((calculateProfit() / calculateTotalValue()) * 100 || 0).toFixed(1)}%
//                   </span>
//                 </div>
//               </div>
//               <div className="p-3 bg-emerald-100 rounded-xl">
//                 <FiTrendingUp className="text-emerald-600 text-xl md:text-2xl" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Barre de recherche et filtres */}
//         <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Rechercher par type, localisation ou fournisseur..."
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <div className="relative">
//                 <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
//                 <select
//                   className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                 >
//                   <option value="all">Tous types</option>
//                   <option value="plastique">Plastique</option>
//                   <option value="papier">Papier/Carton</option>
//                   <option value="verre">Verre</option>
//                   <option value="metal">Métal</option>
//                 </select>
//               </div>

//               <div className="relative">
//                 <FiActivity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
//                 <select
//                   className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">Tous statuts</option>
//                   <option value="available">Disponible</option>
//                   <option value="processing">En traitement</option>
//                   <option value="reserved">Réservé</option>
//                 </select>
//               </div>

//               <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
//                 <FiRefreshCw className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Formulaire d'ajout */}
//         {showForm && (
//           <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                 <FiPlus className="text-emerald-600" />
//                 Ajouter un nouveau stock
//               </h3>
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <FiX className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Type de déchet <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="type"
//                     value={formData.type}
//                     onChange={handleInputChange}
//                     placeholder="Ex: Plastique PET"
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Quantité <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex gap-2">
//                     <input
//                       type="number"
//                       step="0.1"
//                       name="quantity"
//                       value={formData.quantity}
//                       onChange={handleInputChange}
//                       placeholder="Quantité"
//                       className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       required
//                     />
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

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Qualité</label>
//                   <select
//                     name="quality"
//                     value={formData.quality}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
//                   >
//                     <option value="A">Qualité A (Excellente)</option>
//                     <option value="B">Qualité B (Moyenne)</option>
//                     <option value="C">Qualité C (Basse)</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Localisation <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={formData.location}
//                     onChange={handleInputChange}
//                     placeholder="Entrepôt, emplacement..."
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Prix d'achat (€/kg) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     name="purchasePrice"
//                     value={formData.purchasePrice}
//                     onChange={handleInputChange}
//                     placeholder="Prix par kg"
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date d'achat <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="purchaseDate"
//                     value={formData.purchaseDate}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Fournisseur <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="supplier"
//                     value={formData.supplier}
//                     onChange={handleInputChange}
//                     placeholder="Nom du fournisseur"
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Description détaillée du lot..."
//                   rows={3}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               <div className="flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all font-medium shadow-lg"
//                 >
//                   Ajouter au stock
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Tableau des stocks */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//             <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//               <FiArchive className="text-emerald-600" />
//               Mon inventaire ({filteredStocks.length} articles)
//             </h3>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Quantité
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Qualité
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Localisation
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Prix achat
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Valeur actuelle
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Statut
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredStocks.map((stock) => (
//                   <tr key={stock.id} className="hover:bg-gray-50 transition-colors group">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <span className="text-2xl mr-3">{stock.icon}</span>
//                         <div>
//                           <div className="text-sm font-semibold text-gray-900">{stock.type}</div>
//                           <div className="text-xs text-gray-500">{stock.supplier}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="text-sm font-medium text-gray-900">{stock.quantity.toLocaleString()} {stock.unit}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg border ${getQualityColor(stock.quality)}`}>
//                         Qualité {stock.quality}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center text-sm text-gray-900">
//                         <FiMapPin className="text-gray-400 mr-1" />
//                         {stock.location}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="text-sm text-gray-900">{formatCurrency(stock.purchasePrice)}/{stock.unit}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm">
//                         <div className="text-gray-900 font-medium">{formatCurrency(stock.currentValue)}/{stock.unit}</div>
//                         <div className="text-xs text-emerald-600">
//                           +{formatCurrency((stock.currentValue - stock.purchasePrice) * stock.quantity)}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg border ${getStatusColor(stock.status)}`}>
//                         {getStatusText(stock.status)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button 
//                           onClick={() => handleViewDetails(stock)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Voir détails"
//                         >
//                           <FiEye className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Modifier">
//                           <FiEdit className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
//                           <FiTrash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
            
//             {filteredStocks.length === 0 && (
//               <div className="text-center py-12">
//                 <FaBoxes className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500 font-medium">Aucun stock trouvé</p>
//                 <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Modal de détails */}
//         {showDetails && selectedStock && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//               {/* En-tête du modal */}
//               <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
//                 <div className="flex items-center justify-between text-white">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                       <span className="text-3xl">{selectedStock.icon}</span>
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold">{selectedStock.type}</h3>
//                       <p className="text-emerald-100">ID: {selectedStock.id}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowDetails(false)}
//                     className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                   >
//                     <FiX className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
              
//               {/* Corps du modal */}
//               <div className="p-6 space-y-6">
//                 {/* Informations principales */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                       <FiPackage className="w-4 h-4" /> Informations
//                     </h4>
//                     <div className="space-y-2">
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Quantité:</span>
//                         <span className="font-medium text-gray-900">{selectedStock.quantity} {selectedStock.unit}</span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Qualité:</span>
//                         <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getQualityColor(selectedStock.quality)}`}>
//                           Qualité {selectedStock.quality}
//                         </span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span className="text-gray-600">Statut:</span>
//                         <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getStatusColor(selectedStock.status)}`}>
//                           {getStatusText(selectedStock.status)}
//                         </span>
//                       </p>
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                       <FiMapPin className="w-4 h-4" /> Localisation
//                     </h4>
//                     <p className="text-gray-900">{selectedStock.location}</p>
//                   </div>
//                 </div>

//                 {/* Informations fournisseur */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3">Fournisseur</h4>
//                     <p className="text-gray-900 font-medium">{selectedStock.supplier}</p>
//                     <p className="text-xs text-gray-500 mt-1">Date d'achat: {new Date(selectedStock.purchaseDate).toLocaleDateString('fr-FR')}</p>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3">Dernière mise à jour</h4>
//                     <p className="text-gray-900">{new Date(selectedStock.lastUpdated).toLocaleDateString('fr-FR')}</p>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 {selectedStock.description && (
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3">Description</h4>
//                     <p className="text-gray-700">{selectedStock.description}</p>
//                   </div>
//                 )}

//                 {/* Valeurs financières */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="bg-blue-50 p-4 rounded-xl">
//                     <p className="text-sm text-blue-600 mb-1">Valeur d'achat</p>
//                     <p className="text-xl font-bold text-blue-700">
//                       {formatCurrency(selectedStock.quantity * selectedStock.purchasePrice)}
//                     </p>
//                     <p className="text-xs text-blue-500 mt-1">{selectedStock.purchasePrice} €/{selectedStock.unit}</p>
//                   </div>
//                   <div className="bg-green-50 p-4 rounded-xl">
//                     <p className="text-sm text-green-600 mb-1">Valeur actuelle</p>
//                     <p className="text-xl font-bold text-green-700">
//                       {formatCurrency(selectedStock.quantity * selectedStock.currentValue)}
//                     </p>
//                     <p className="text-xs text-green-500 mt-1">{selectedStock.currentValue} €/{selectedStock.unit}</p>
//                   </div>
//                   <div className="bg-purple-50 p-4 rounded-xl">
//                     <p className="text-sm text-purple-600 mb-1">Profit potentiel</p>
//                     <p className="text-xl font-bold text-purple-700">
//                       {formatCurrency((selectedStock.currentValue - selectedStock.purchasePrice) * selectedStock.quantity)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Boutons d'action */}
//                 <div className="flex justify-end gap-3 pt-4 border-t">
//                   <button
//                     onClick={() => setShowDetails(false)}
//                     className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Fermer
//                   </button>
//                   <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
//                     <FiEdit className="w-4 h-4" />
//                     Modifier
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default MonStock;


import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Layouts/LayoutDashboard';
import recycleurService from '../../services/recycleurService';
import { 
  FiPackage, FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter,
  FiTrendingUp, FiBarChart2, FiDollarSign, FiMapPin, FiCalendar,
  FiEye, FiRefreshCw, FiDownload, FiAlertCircle, FiCheckCircle,
  FiClock, FiTruck, FiActivity, FiTag, FiX, FiChevronDown,
  FiHome, FiShoppingBag, FiAward, FiArchive
} from 'react-icons/fi';
import { FaRecycle, FaChartLine, FaWarehouse, FaBoxes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const MonStock = () => {
  // États pour les données API
  const [stocks, setStocks] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [statistiques, setStatistiques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // États pour l'interface moderne
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({
    type_dechet: '',
    quantite: '',
    unite: 'kg',
    qualite: 'A',
    localisation: '',
    description: '',
    prix_achat: '',
    date_achat: '',
    fournisseur: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user'));
    setUser(userData);
    loadStock();
  }, []);

  const loadStock = async () => {
    try {
      setLoading(true);
      const data = await recycleurService.getMonStock();
      console.log('📦 Données reçues:', data);
      
      if (data.success) {
        setStocks(data.stocks || []);
        setHistorique(data.historique || []);
        setStatistiques(data.statistiques || []);
      } else {
        toast.error(data.message || 'Erreur lors du chargement');
      }
    } catch (error) {
      console.error('❌ Erreur chargement stock:', error);
      toast.error('Erreur lors du chargement du stock');
    } finally {
      setLoading(false);
    }
  };

  // Fonctions de mapping pour les labels
  const getTypeLabel = (type) => {
    const labels = {
      'plastique_pet': 'Plastique PET',
      'plastique_pehd': 'Plastique PEHD',
      'papier_carton': 'Papier/Carton',
      'metal': 'Métal',
      'verre': 'Verre',
      'organique': 'Organique'
    };
    return labels[type] || type;
  };

  const getTypeIcon = (type) => {
    const icons = {
      'plastique_pet': '🥤',
      'plastique_pehd': '🧴',
      'papier_carton': '📦',
      'metal': '🥫',
      'verre': '🥃',
      'organique': '🌱'
    };
    return icons[type] || '📦';
  };

  const getMouvementIcon = (type) => {
    switch(type) {
      case 'reception': return '📥';
      case 'recyclage': return '♻️';
      default: return '📦';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fonctions pour l'interface moderne
  const getQualityColor = (quality) => {
    switch (quality) {
      case 'A': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'B': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'C': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    // Si le statut n'est pas fourni, on utilise 'available' par défaut
    const stat = status || 'available';
    switch (stat) {
      case 'available': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'sold': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    const stat = status || 'available';
    switch (stat) {
      case 'available': return 'Disponible';
      case 'processing': return 'En traitement';
      case 'reserved': return 'Réservé';
      case 'sold': return 'Vendu';
      default: return stat;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  // Calculs pour les statistiques (à partir des données réelles)
  const totalQuantity = stocks.reduce((acc, s) => acc + parseFloat(s.quantite_disponible || 0), 0);
  const totalRecycled = statistiques.reduce((acc, s) => acc + parseFloat(s.total_recycle || 0), 0);
  
  // Filtrage des stocks
  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = 
      getTypeLabel(stock.type_dechet).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (stock.localisation && stock.localisation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (stock.fournisseur && stock.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || (stock.categorie && stock.categorie === filterType);
    // Si pas de catégorie, on essaie de déduire du type
    const matchesTypeFallback = filterType === 'all' || 
      (filterType === 'plastique' && stock.type_dechet?.includes('plastique')) ||
      (filterType === 'papier' && (stock.type_dechet?.includes('papier') || stock.type_dechet?.includes('carton'))) ||
      (filterType === 'verre' && stock.type_dechet?.includes('verre')) ||
      (filterType === 'metal' && stock.type_dechet?.includes('metal'));
    
    const matchesStatus = filterStatus === 'all' || (stock.statut && stock.statut === filterStatus);
    
    return matchesSearch && (matchesType || matchesTypeFallback) && matchesStatus;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // À adapter si votre service a une méthode pour ajouter du stock
      // const response = await recycleurService.ajouterStock(formData);
      // if (response.success) {
      //   toast.success('Stock ajouté avec succès');
      //   setShowForm(false);
      //   loadStock(); // recharger les données
      // }
      
      // Version locale (mock) pour l'exemple
      const nouveauStock = {
        id: stocks.length + 1,
        type_dechet: formData.type_dechet,
        quantite_disponible: parseFloat(formData.quantite),
        localisation: formData.localisation,
        fournisseur: formData.fournisseur,
        date_achat: formData.date_achat,
        prix_achat: parseFloat(formData.prix_achat),
        qualite: formData.qualite,
        description: formData.description,
        dernier_mouvement: new Date().toISOString(),
        statut: 'available'
      };
      setStocks(prev => [nouveauStock, ...prev]);
      setShowForm(false);
      setFormData({
        type_dechet: '',
        quantite: '',
        unite: 'kg',
        qualite: 'A',
        localisation: '',
        description: '',
        prix_achat: '',
        date_achat: '',
        fournisseur: ''
      });
      toast.success('Stock ajouté (simulation)');
    } catch (error) {
      toast.error('Erreur lors de l\'ajout');
    }
  };

  const handleViewDetails = (stock) => {
    setSelectedStock(stock);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <DashboardLayout title="Mon Stock" user={user}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaBoxes className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement de votre stock...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Mon Stock de déchets" user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                <FaWarehouse className="w-6 h-6 md:w-8 md:h-8" />
                Gestion de stock
              </h1>
              <p className="text-emerald-100 text-sm md:text-base">
                Gérez vos stocks de matières recyclées
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button className="inline-flex items-center gap-2 bg-white/20 text-white px-3 md:px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm text-sm md:text-base">
                <FiDownload className="w-4 h-4" />
                Exporter
              </button>
              <button 
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-4 md:px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg text-sm md:text-base"
              >
                <FiPlus className="w-4 h-4 md:w-5 md:h-5" />
                Ajouter au stock
              </button>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Stock total</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {totalQuantity.toFixed(1)} kg
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    ~{(totalQuantity/1000).toFixed(2)} tonnes
                  </span>
                </div>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <FiPackage className="text-emerald-600 text-xl md:text-2xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Types de déchets</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stocks.length}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {new Set(stocks.map(s => s.type_dechet)).size} catégories
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiBarChart2 className="text-blue-600 text-xl md:text-2xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Déjà recyclés</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {totalRecycled.toFixed(1)} kg
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                    Depuis le début
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FaRecycle className="text-purple-600 text-xl md:text-2xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Mouvements</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{historique.length}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    Dernier: {historique[0] ? formatDate(historique[0].cree_le) : 'Aucun'}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <FiActivity className="text-amber-600 text-xl md:text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par type, localisation ou fournisseur..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">Tous types</option>
                  <option value="plastique">Plastique</option>
                  <option value="papier">Papier/Carton</option>
                  <option value="verre">Verre</option>
                  <option value="metal">Métal</option>
                </select>
              </div>

              <div className="relative">
                <FiActivity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tous statuts</option>
                  <option value="available">Disponible</option>
                  <option value="processing">En traitement</option>
                  <option value="reserved">Réservé</option>
                </select>
              </div>

              <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <FiRefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        {showForm && (
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiPlus className="text-emerald-600" />
                Ajouter un nouveau stock
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de déchet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="type_dechet"
                    value={formData.type_dechet}
                    onChange={handleInputChange}
                    placeholder="Ex: plastique_pet"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.1"
                      name="quantite"
                      value={formData.quantite}
                      onChange={handleInputChange}
                      placeholder="Quantité"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <select
                      name="unite"
                      value={formData.unite}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="kg">kg</option>
                      <option value="tonnes">tonnes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualité</label>
                  <select
                    name="qualite"
                    value={formData.qualite}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="A">Qualité A (Excellente)</option>
                    <option value="B">Qualité B (Moyenne)</option>
                    <option value="C">Qualité C (Basse)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Localisation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="localisation"
                    value={formData.localisation}
                    onChange={handleInputChange}
                    placeholder="Entrepôt, emplacement..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix d'achat (€/kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="prix_achat"
                    value={formData.prix_achat}
                    onChange={handleInputChange}
                    placeholder="Prix par kg"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'achat <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date_achat"
                    value={formData.date_achat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fournisseur <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fournisseur"
                    value={formData.fournisseur}
                    onChange={handleInputChange}
                    placeholder="Nom du fournisseur"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description détaillée du lot..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all font-medium shadow-lg"
                >
                  Ajouter au stock
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tableau des stocks */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiArchive className="text-emerald-600" />
              Mon inventaire ({filteredStocks.length} articles)
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantité
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Localisation
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Dernier mouvement
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStocks.map((stock) => (
                  <tr key={stock.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getTypeIcon(stock.type_dechet)}</span>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{getTypeLabel(stock.type_dechet)}</div>
                          {stock.fournisseur && <div className="text-xs text-gray-500">{stock.fournisseur}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {parseFloat(stock.quantite_disponible).toFixed(1)} kg
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <FiMapPin className="text-gray-400 mr-1" />
                        {stock.localisation || 'Non spécifié'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {stock.dernier_mouvement ? formatDate(stock.dernier_mouvement) : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg border ${getStatusColor(stock.statut)}`}>
                        {getStatusText(stock.statut)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewDetails(stock)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Modifier">
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredStocks.length === 0 && (
              <div className="text-center py-12">
                <FaBoxes className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Aucun stock trouvé</p>
                <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
              </div>
            )}
          </div>
        </div>

        {/* Historique des mouvements */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiClock className="text-emerald-600" />
              Historique des mouvements ({historique.length})
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {historique.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getMouvementIcon(item.type_mouvement)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.type_mouvement === 'reception' ? '📥 Réception' : '♻️ Recyclage'}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {getTypeLabel(item.type_dechet)}: {parseFloat(item.quantite).toFixed(1)} kg
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(item.cree_le)}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Stock avant: {parseFloat(item.stock_avant).toFixed(1)} kg → 
                        après: {parseFloat(item.stock_apres).toFixed(1)} kg
                      </div>
                      {item.notes && (
                        <p className="mt-1 text-xs text-gray-400">{item.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {historique.length === 0 && (
                <p className="text-center text-gray-500 py-8">Aucun mouvement pour le moment</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal de détails */}
        {showDetails && selectedStock && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* En-tête du modal */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-3xl">{getTypeIcon(selectedStock.type_dechet)}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{getTypeLabel(selectedStock.type_dechet)}</h3>
                      <p className="text-emerald-100">ID: {selectedStock.id}</p>
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
              
              {/* Corps du modal */}
              <div className="p-6 space-y-6">
                {/* Informations principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiPackage className="w-4 h-4" /> Informations
                    </h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Quantité:</span>
                        <span className="font-medium text-gray-900">{parseFloat(selectedStock.quantite_disponible).toFixed(1)} kg</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getStatusColor(selectedStock.statut)}`}>
                          {getStatusText(selectedStock.statut)}
                        </span>
                      </p>
                      {selectedStock.fournisseur && (
                        <p className="flex justify-between">
                          <span className="text-gray-600">Fournisseur:</span>
                          <span className="font-medium text-gray-900">{selectedStock.fournisseur}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FiMapPin className="w-4 h-4" /> Localisation
                    </h4>
                    <p className="text-gray-900">{selectedStock.localisation || 'Non spécifié'}</p>
                  </div>
                </div>

                {/* Informations supplémentaires */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedStock.date_achat && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Date d'achat</h4>
                      <p className="text-gray-900">{formatDate(selectedStock.date_achat)}</p>
                    </div>
                  )}
                  {selectedStock.prix_achat && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Prix d'achat</h4>
                      <p className="text-gray-900">{formatCurrency(selectedStock.prix_achat)}/kg</p>
                    </div>
                  )}
                </div>

                {/* Dernier mouvement */}
                {selectedStock.dernier_mouvement && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Dernier mouvement</h4>
                    <p className="text-gray-900">{formatDate(selectedStock.dernier_mouvement)}</p>
                  </div>
                )}

                {/* Description */}
                {selectedStock.description && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Description</h4>
                    <p className="text-gray-700">{selectedStock.description}</p>
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
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                    <FiEdit className="w-4 h-4" />
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MonStock;