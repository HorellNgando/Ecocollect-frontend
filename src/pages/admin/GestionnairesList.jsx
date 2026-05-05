// // import React, { useState, useEffect } from 'react';
// // import { 
// //   Search, Filter, Plus, Edit, Trash2, Eye, Users, Mail, Phone, 
// //   MapPin, Calendar, Shield, CheckCircle, AlertCircle, UserCheck,
// //   UserX, Briefcase, BarChart3, TrendingUp, Clock, Download,
// //   ChevronLeft, ChevronRight, MoreVertical, Star, Award,
// //   Building2, Activity, XCircle, RefreshCw
// // } from 'lucide-react';
// // import AdminLayout from '../../components/AdminLayout';

// // const GestionnairesList = () => {
// //   const [gestionnaires, setGestionnaires] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterStatus, setFilterStatus] = useState('all');
// //   const [filterDepartment, setFilterDepartment] = useState('all');
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedGestionnaire, setSelectedGestionnaire] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage] = useState(8);

// //   // Données de démonstration enrichies
// //   useEffect(() => {
// //     const mockData = [
// //       {
// //         id: 1,
// //         name: 'Karim Alami',
// //         email: 'karim.alami@email.com',
// //         phone: '+212 6 45 67 89 01',
// //         address: '123 Boulevard Anfa, Casablanca',
// //         status: 'active',
// //         registrationDate: '2024-01-05',
// //         department: 'Opérations',
// //         managedCollecteurs: 15,
// //         managedProducteurs: 45,
// //         approvalsProcessed: 128,
// //         pendingApprovals: 8,
// //         rejectionRate: 12,
// //         avgResponseTime: '2.5h',
// //         satisfaction: 94,
// //         lastLogin: '2024-03-15 14:30',
// //         zone: 'Casablanca-Settat',
// //         permissions: ['validation', 'gestion', 'rapports']
// //       },
// //       {
// //         id: 2,
// //         name: 'Sofia Bennani',
// //         email: 'sofia.bennani@email.com',
// //         phone: '+212 6 12 34 56 78',
// //         address: '456 Rue Moulay Youssef, Rabat',
// //         status: 'active',
// //         registrationDate: '2024-02-10',
// //         department: 'Qualité',
// //         managedCollecteurs: 12,
// //         managedProducteurs: 38,
// //         approvalsProcessed: 95,
// //         pendingApprovals: 5,
// //         rejectionRate: 8,
// //         avgResponseTime: '3.2h',
// //         satisfaction: 97,
// //         lastLogin: '2024-03-15 09:15',
// //         zone: 'Rabat-Salé-Kénitra',
// //         permissions: ['validation', 'rapports']
// //       },
// //       {
// //         id: 3,
// //         name: 'Youssef Mansouri',
// //         email: 'youssef.mansouri@email.com',
// //         phone: '+212 6 78 90 12 34',
// //         address: '789 Avenue Mohammed V, Marrakech',
// //         status: 'inactive',
// //         registrationDate: '2024-03-01',
// //         department: 'Logistique',
// //         managedCollecteurs: 8,
// //         managedProducteurs: 22,
// //         approvalsProcessed: 45,
// //         pendingApprovals: 12,
// //         rejectionRate: 18,
// //         avgResponseTime: '5.1h',
// //         satisfaction: 82,
// //         lastLogin: '2024-03-10 16:45',
// //         zone: 'Marrakech-Safi',
// //         permissions: ['gestion']
// //       },
// //       {
// //         id: 4,
// //         name: 'Fatima Zahra',
// //         email: 'fatima.zahra@email.com',
// //         phone: '+212 6 23 45 67 89',
// //         address: '321 Rue de France, Tanger',
// //         status: 'active',
// //         registrationDate: '2024-01-15',
// //         department: 'Finance',
// //         managedCollecteurs: 20,
// //         managedProducteurs: 52,
// //         approvalsProcessed: 156,
// //         pendingApprovals: 10,
// //         rejectionRate: 6,
// //         avgResponseTime: '1.8h',
// //         satisfaction: 99,
// //         lastLogin: '2024-03-15 11:20',
// //         zone: 'Tanger-Tétouan-Al Hoceïma',
// //         permissions: ['validation', 'gestion', 'rapports', 'finances']
// //       },
// //       {
// //         id: 5,
// //         name: 'Mehdi Fassi',
// //         email: 'mehdi.fassi@email.com',
// //         phone: '+212 6 56 78 90 12',
// //         address: '567 Avenue Hassan II, Fès',
// //         status: 'active',
// //         registrationDate: '2024-02-20',
// //         department: 'RH',
// //         managedCollecteurs: 10,
// //         managedProducteurs: 25,
// //         approvalsProcessed: 67,
// //         pendingApprovals: 3,
// //         rejectionRate: 10,
// //         avgResponseTime: '4.0h',
// //         satisfaction: 88,
// //         lastLogin: '2024-03-14 16:30',
// //         zone: 'Fès-Meknès',
// //         permissions: ['gestion', 'rapports']
// //       }
// //     ];
    
// //     setTimeout(() => {
// //       setGestionnaires(mockData);
// //       setLoading(false);
// //     }, 1000);
// //   }, []);

// //   // Extraire les départements uniques
// //   const departments = [...new Set(gestionnaires.map(g => g.department))];
// //   const zones = [...new Set(gestionnaires.map(g => g.zone))];

// //   const filteredGestionnaires = gestionnaires.filter(gestionnaire => {
// //     const matchesSearch = 
// //       (gestionnaire.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
// //       (gestionnaire.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
// //       (gestionnaire.department?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
// //       (gestionnaire.zone?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
// //     const matchesStatus = filterStatus === 'all' || gestionnaire.status === filterStatus;
// //     const matchesDepartment = filterDepartment === 'all' || gestionnaire.department === filterDepartment;
    
// //     return matchesSearch && matchesStatus && matchesDepartment;
// //   });

// //   // Pagination
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = filteredGestionnaires.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(filteredGestionnaires.length / itemsPerPage);

// //   // Statistiques enrichies
// //   const stats = {
// //     total: gestionnaires.length,
// //     actifs: gestionnaires.filter(g => g.status === 'active').length,
// //     inactifs: gestionnaires.filter(g => g.status === 'inactive').length,
// //     totalApprovals: gestionnaires.reduce((sum, g) => sum + g.approvalsProcessed, 0),
// //     pendingApprovals: gestionnaires.reduce((sum, g) => sum + (g.pendingApprovals || 0), 0),
// //     totalManaged: gestionnaires.reduce((sum, g) => sum + g.managedCollecteurs + g.managedProducteurs, 0),
// //     avgSatisfaction: Math.round(gestionnaires.reduce((sum, g) => sum + g.satisfaction, 0) / gestionnaires.length),
// //     departmentsCount: departments.length
// //   };

// //   const getStatusBadge = (status) => {
// //     return status === 'active' 
// //       ? <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
// //           <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
// //           Actif
// //         </span>
// //       : <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
// //           <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
// //           Inactif
// //         </span>;
// //   };

// //   const getDepartmentColor = (department) => {
// //     const colors = {
// //       'Opérations': 'bg-blue-100 text-blue-800 border-blue-200',
// //       'Qualité': 'bg-purple-100 text-purple-800 border-purple-200',
// //       'Logistique': 'bg-green-100 text-green-800 border-green-200',
// //       'Finance': 'bg-yellow-100 text-yellow-800 border-yellow-200',
// //       'RH': 'bg-pink-100 text-pink-800 border-pink-200'
// //     };
// //     return colors[department] || 'bg-gray-100 text-gray-800 border-gray-200';
// //   };

// //   const getPerformanceLevel = (satisfaction) => {
// //     if (satisfaction >= 95) return 'text-emerald-600';
// //     if (satisfaction >= 85) return 'text-blue-600';
// //     if (satisfaction >= 70) return 'text-yellow-600';
// //     return 'text-red-600';
// //   };

// //   if (loading) {
// //     return (
// //       <AdminLayout title="Gestionnaires">
// //         <div className="flex items-center justify-center h-96">
// //           <div className="text-center">
// //             <div className="relative mx-auto w-20 h-20">
// //               <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
// //               <div className="absolute inset-0 flex items-center justify-center">
// //                 <Users className="w-8 h-8 text-emerald-500" />
// //               </div>
// //             </div>
// //             <p className="mt-4 text-gray-600 font-medium">Chargement des gestionnaires...</p>
// //           </div>
// //         </div>
// //       </AdminLayout>
// //     );
// //   }

// //   return (
// //     <AdminLayout title="Gestionnaires">
// //       <div className="p-6 bg-gray-50 min-h-screen">
// //         {/* En-tête avec gradient */}
// //         <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
// //             <div>
// //               <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
// //                 <Briefcase className="w-8 h-8" />
// //                 Gestionnaires
// //               </h1>
// //               <p className="text-emerald-100">Gérez les gestionnaires et suivez leurs performances sur la plateforme</p>
// //             </div>
// //             <div className="mt-4 md:mt-0 flex gap-3">
// //               <button className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
// //                 <Download className="w-4 h-4" />
// //                 Exporter
// //               </button>
// //               <button className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
// //                 <Plus className="w-5 h-5" />
// //                 Nouveau gestionnaire
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Cartes de statistiques modernes */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 mb-8">
// //           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
// //             <div className="flex items-center justify-between mb-2">
// //               <p className="text-sm text-gray-500">Total</p>
// //               <div className="p-2 bg-emerald-100 rounded-lg">
// //                 <Users className="w-4 h-4 text-emerald-600" />
// //               </div>
// //             </div>
// //             <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
// //             <p className="text-xs text-gray-400 mt-1">Gestionnaires</p>
// //           </div>

// //           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
// //             <div className="flex items-center justify-between mb-2">
// //               <p className="text-sm text-gray-500">Actifs</p>
// //               <div className="p-2 bg-emerald-100 rounded-lg">
// //                 <UserCheck className="w-4 h-4 text-emerald-600" />
// //               </div>
// //             </div>
// //             <p className="text-2xl font-bold text-emerald-600">{stats.actifs}</p>
// //             <p className="text-xs text-gray-400 mt-1">{Math.round((stats.actifs/stats.total)*100) || 0}% du total</p>
// //           </div>

// //           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
// //             <div className="flex items-center justify-between mb-2">
// //               <p className="text-sm text-gray-500">Départements</p>
// //               <div className="p-2 bg-purple-100 rounded-lg">
// //                 <Building2 className="w-4 h-4 text-purple-600" />
// //               </div>
// //             </div>
// //             <p className="text-2xl font-bold text-purple-600">{stats.departmentsCount}</p>
// //             <p className="text-xs text-gray-400 mt-1">Services</p>
// //           </div>

// //           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
// //             <div className="flex items-center justify-between mb-2">
// //               <p className="text-sm text-gray-500">Approbations</p>
// //               <div className="p-2 bg-blue-100 rounded-lg">
// //                 <Shield className="w-4 h-4 text-blue-600" />
// //               </div>
// //             </div>
// //             <p className="text-2xl font-bold text-blue-600">{stats.totalApprovals}</p>
// //             <p className="text-xs text-gray-400 mt-1">Traitées</p>
// //           </div>

// //           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
// //             <div className="flex items-center justify-between mb-2">
// //               <p className="text-sm text-gray-500">En attente</p>
// //               <div className="p-2 bg-yellow-100 rounded-lg">
// //                 <Clock className="w-4 h-4 text-yellow-600" />
// //               </div>
// //             </div>
// //             <p className="text-2xl font-bold text-yellow-600">{stats.pendingApprovals}</p>
// //             <p className="text-xs text-gray-400 mt-1">À traiter</p>
// //           </div>

// //           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
// //             <div className="flex items-center justify-between mb-2">
// //               <p className="text-sm text-gray-500">Satisfaction</p>
// //               <div className="p-2 bg-emerald-100 rounded-lg">
// //                 <Award className="w-4 h-4 text-emerald-600" />
// //               </div>
// //             </div>
// //             <p className="text-2xl font-bold text-emerald-600">{stats.avgSatisfaction}%</p>
// //             <p className="text-xs text-gray-400 mt-1">Moyenne</p>
// //           </div>
// //         </div>

// //         {/* Barre de filtres améliorée */}
// //         <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
// //           <div className="flex flex-col lg:flex-row gap-4">
// //             <div className="flex-1 relative">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //               <input
// //                 type="text"
// //                 placeholder="Rechercher par nom, email, département ou zone..."
// //                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
            
// //             <div className="flex flex-wrap gap-3">
// //               <div className="relative">
// //                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
// //                 <select
// //                   className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
// //                   value={filterStatus}
// //                   onChange={(e) => setFilterStatus(e.target.value)}
// //                 >
// //                   <option value="all">Tous les statuts</option>
// //                   <option value="active">Actifs</option>
// //                   <option value="inactive">Inactifs</option>
// //                 </select>
// //               </div>

// //               <div className="relative">
// //                 <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
// //                 <select
// //                   className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
// //                   value={filterDepartment}
// //                   onChange={(e) => setFilterDepartment(e.target.value)}
// //                 >
// //                   <option value="all">Tous les départements</option>
// //                   {departments.map((dept, index) => (
// //                     <option key={index} value={dept}>{dept}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
// //                 <RefreshCw className="w-5 h-5 text-gray-600" />
// //               </button>
// //             </div>
// //           </div>

// //           {/* Tags de recherche actifs */}
// //           {(searchTerm || filterStatus !== 'all' || filterDepartment !== 'all') && (
// //             <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
// //               <span className="text-sm text-gray-500">Filtres actifs:</span>
// //               {searchTerm && (
// //                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
// //                   Recherche: "{searchTerm}"
// //                   <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-900">
// //                     <XCircle className="w-4 h-4" />
// //                   </button>
// //                 </span>
// //               )}
// //               {filterStatus !== 'all' && (
// //                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
// //                   Statut: {filterStatus === 'active' ? 'Actifs' : 'Inactifs'}
// //                   <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-emerald-900">
// //                     <XCircle className="w-4 h-4" />
// //                   </button>
// //                 </span>
// //               )}
// //               {filterDepartment !== 'all' && (
// //                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
// //                   Département: {filterDepartment}
// //                   <button onClick={() => setFilterDepartment('all')} className="ml-1 hover:text-emerald-900">
// //                     <XCircle className="w-4 h-4" />
// //                   </button>
// //                 </span>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Tableau moderne */}
// //         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gestionnaire</th>
// //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Département</th>
// //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
// //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Performance</th>
// //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Utilisateurs gérés</th>
// //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Approbations</th>
// //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dernière connexion</th>
// //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {currentItems.map((gestionnaire) => (
// //                   <tr key={gestionnaire.id} className="hover:bg-gray-50 transition-colors group">
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center">
// //                         <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
// //                           <Users className="w-5 h-5 text-emerald-600" />
// //                         </div>
// //                         <div className="ml-3">
// //                           <div className="text-sm font-semibold text-gray-900">{gestionnaire.name}</div>
// //                           <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
// //                             <Mail className="w-3 h-3" />
// //                             {gestionnaire.email}
// //                           </div>
// //                           <div className="text-xs text-gray-500 flex items-center gap-1">
// //                             <Phone className="w-3 h-3" />
// //                             {gestionnaire.phone}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <span className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg ${getDepartmentColor(gestionnaire.department)}`}>
// //                         {gestionnaire.department}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       {getStatusBadge(gestionnaire.status)}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <div className="flex flex-col">
// //                           <div className="flex items-center gap-1">
// //                             <Award className={`w-3 h-3 ${getPerformanceLevel(gestionnaire.satisfaction)}`} />
// //                             <span className={`text-sm font-medium ${getPerformanceLevel(gestionnaire.satisfaction)}`}>
// //                               {gestionnaire.satisfaction}%
// //                             </span>
// //                           </div>
// //                           <span className="text-xs text-gray-400">Satisfaction</span>
// //                         </div>
// //                         <div className="h-8 w-px bg-gray-200 mx-2"></div>
// //                         <div className="flex flex-col">
// //                           <div className="flex items-center gap-1">
// //                             <Clock className="w-3 h-3 text-gray-400" />
// //                             <span className="text-sm text-gray-600">{gestionnaire.avgResponseTime}</span>
// //                           </div>
// //                           <span className="text-xs text-gray-400">Réponse</span>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="space-y-1">
// //                         <div className="flex items-center justify-between text-sm">
// //                           <span className="text-gray-600">Collecteurs:</span>
// //                           <span className="font-medium text-gray-900">{gestionnaire.managedCollecteurs}</span>
// //                         </div>
// //                         <div className="flex items-center justify-between text-sm">
// //                           <span className="text-gray-600">Producteurs:</span>
// //                           <span className="font-medium text-gray-900">{gestionnaire.managedProducteurs}</span>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="space-y-1">
// //                         <div className="flex items-center gap-2">
// //                           <CheckCircle className="w-3 h-3 text-emerald-500" />
// //                           <span className="text-sm font-medium text-gray-900">{gestionnaire.approvalsProcessed}</span>
// //                           <span className="text-xs text-gray-400">traitées</span>
// //                         </div>
// //                         {gestionnaire.pendingApprovals > 0 && (
// //                           <div className="flex items-center gap-2">
// //                             <AlertCircle className="w-3 h-3 text-yellow-500" />
// //                             <span className="text-sm text-yellow-600">{gestionnaire.pendingApprovals}</span>
// //                             <span className="text-xs text-gray-400">en attente</span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-1 text-sm text-gray-600">
// //                         <Calendar className="w-3 h-3 text-gray-400" />
// //                         <span>{new Date(gestionnaire.lastLogin).toLocaleString('fr-FR', {
// //                           day: '2-digit',
// //                           month: '2-digit',
// //                           hour: '2-digit',
// //                           minute: '2-digit'
// //                         })}</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <button
// //                           onClick={() => {
// //                             setSelectedGestionnaire(gestionnaire);
// //                             setShowModal(true);
// //                           }}
// //                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// //                           title="Voir détails"
// //                         >
// //                           <Eye className="w-4 h-4" />
// //                         </button>
// //                         <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Modifier">
// //                           <Edit className="w-4 h-4" />
// //                         </button>
// //                         <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
// //                           <Trash2 className="w-4 h-4" />
// //                         </button>
// //                         <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors" title="Plus d'options">
// //                           <MoreVertical className="w-4 h-4" />
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //                 {filteredGestionnaires.length === 0 && (
// //                   <tr>
// //                     <td colSpan="8" className="px-6 py-12 text-center">
// //                       <div className="flex flex-col items-center">
// //                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
// //                           <Users className="w-8 h-8 text-gray-400" />
// //                         </div>
// //                         <p className="text-gray-500 font-medium">Aucun gestionnaire trouvé</p>
// //                         <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Pagination */}
// //           {filteredGestionnaires.length > 0 && (
// //             <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
// //               <div className="text-sm text-gray-500">
// //                 Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
// //                 <span className="font-medium">
// //                   {Math.min(indexOfLastItem, filteredGestionnaires.length)}
// //                 </span>{' '}
// //                 sur <span className="font-medium">{filteredGestionnaires.length}</span> gestionnaires
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <button
// //                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
// //                   disabled={currentPage === 1}
// //                   className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   <ChevronLeft className="w-5 h-5" />
// //                 </button>
// //                 <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
// //                   Page {currentPage} sur {totalPages || 1}
// //                 </span>
// //                 <button
// //                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
// //                   disabled={currentPage === totalPages || totalPages === 0}
// //                   className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   <ChevronRight className="w-5 h-5" />
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Modal de détails amélioré */}
// //         {showModal && selectedGestionnaire && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //             <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
// //               {/* En-tête du modal */}
// //               <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
// //                 <div className="flex items-center justify-between text-white">
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
// //                       <Users className="w-8 h-8" />
// //                     </div>
// //                     <div>
// //                       <h3 className="text-2xl font-bold">{selectedGestionnaire.name}</h3>
// //                       <p className="text-emerald-100">{selectedGestionnaire.department} • ID: {selectedGestionnaire.id}</p>
// //                     </div>
// //                   </div>
// //                   <button
// //                     onClick={() => setShowModal(false)}
// //                     className="p-2 hover:bg-white/20 rounded-lg transition-colors"
// //                   >
// //                     <XCircle className="w-6 h-6" />
// //                   </button>
// //                 </div>
// //               </div>
              
// //               {/* Corps du modal */}
// //               <div className="p-6 space-y-6">
// //                 {/* Grille d'informations */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {/* Contact */}
// //                   <div className="bg-gray-50 p-4 rounded-xl">
// //                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
// //                       <Mail className="w-4 h-4" /> Contact
// //                     </h4>
// //                     <div className="space-y-2">
// //                       <p className="text-gray-900 flex items-center gap-2">
// //                         <Mail className="w-4 h-4 text-gray-400" />
// //                         {selectedGestionnaire.email}
// //                       </p>
// //                       <p className="text-gray-900 flex items-center gap-2">
// //                         <Phone className="w-4 h-4 text-gray-400" />
// //                         {selectedGestionnaire.phone}
// //                       </p>
// //                       <p className="text-gray-900 flex items-center gap-2">
// //                         <MapPin className="w-4 h-4 text-gray-400" />
// //                         {selectedGestionnaire.address}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   {/* Informations professionnelles */}
// //                   <div className="bg-gray-50 p-4 rounded-xl">
// //                     <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
// //                       <Briefcase className="w-4 h-4" /> Professionnel
// //                     </h4>
// //                     <div className="space-y-2">
// //                       <p className="flex justify-between">
// //                         <span className="text-gray-600">Département:</span>
// //                         <span className="font-medium text-gray-900">{selectedGestionnaire.department}</span>
// //                       </p>
// //                       <p className="flex justify-between">
// //                         <span className="text-gray-600">Zone:</span>
// //                         <span className="font-medium text-gray-900">{selectedGestionnaire.zone}</span>
// //                       </p>
// //                       <p className="flex justify-between">
// //                         <span className="text-gray-600">Statut:</span>
// //                         <span>{getStatusBadge(selectedGestionnaire.status)}</span>
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Statistiques détaillées */}
// //                 <div className="bg-gray-50 p-4 rounded-xl">
// //                   <h4 className="text-sm font-medium text-gray-500 mb-4">Statistiques de performance</h4>
// //                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                     <div className="text-center">
// //                       <p className="text-2xl font-bold text-emerald-600">{selectedGestionnaire.managedCollecteurs}</p>
// //                       <p className="text-xs text-gray-500">Collecteurs gérés</p>
// //                     </div>
// //                     <div className="text-center">
// //                       <p className="text-2xl font-bold text-blue-600">{selectedGestionnaire.managedProducteurs}</p>
// //                       <p className="text-xs text-gray-500">Producteurs gérés</p>
// //                     </div>
// //                     <div className="text-center">
// //                       <p className="text-2xl font-bold text-purple-600">{selectedGestionnaire.approvalsProcessed}</p>
// //                       <p className="text-xs text-gray-500">Approbations traitées</p>
// //                     </div>
// //                     <div className="text-center">
// //                       <p className="text-2xl font-bold text-yellow-600">{selectedGestionnaire.pendingApprovals}</p>
// //                       <p className="text-xs text-gray-500">En attente</p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Métriques avancées */}
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                   <div className="bg-gray-50 p-4 rounded-xl">
// //                     <p className="text-sm text-gray-500 mb-1">Taux de satisfaction</p>
// //                     <p className={`text-2xl font-bold ${getPerformanceLevel(selectedGestionnaire.satisfaction)}`}>
// //                       {selectedGestionnaire.satisfaction}%
// //                     </p>
// //                   </div>
// //                   <div className="bg-gray-50 p-4 rounded-xl">
// //                     <p className="text-sm text-gray-500 mb-1">Taux de rejet</p>
// //                     <p className="text-2xl font-bold text-red-600">{selectedGestionnaire.rejectionRate}%</p>
// //                   </div>
// //                   <div className="bg-gray-50 p-4 rounded-xl">
// //                     <p className="text-sm text-gray-500 mb-1">Temps de réponse moyen</p>
// //                     <p className="text-2xl font-bold text-blue-600">{selectedGestionnaire.avgResponseTime}</p>
// //                   </div>
// //                 </div>

// //                 {/* Permissions */}
// //                 <div className="bg-gray-50 p-4 rounded-xl">
// //                   <h4 className="text-sm font-medium text-gray-500 mb-3">Permissions</h4>
// //                   <div className="flex flex-wrap gap-2">
// //                     {selectedGestionnaire.permissions.map((perm, idx) => (
// //                       <span key={idx} className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
// //                         {perm === 'validation' && '✅ Validation'}
// //                         {perm === 'gestion' && '📋 Gestion'}
// //                         {perm === 'rapports' && '📊 Rapports'}
// //                         {perm === 'finances' && '💰 Finances'}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Dates importantes */}
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div className="bg-gray-50 p-3 rounded-lg">
// //                     <p className="text-xs text-gray-400">Date d'inscription</p>
// //                     <p className="font-medium text-gray-900">
// //                       {new Date(selectedGestionnaire.registrationDate).toLocaleDateString('fr-FR', {
// //                         day: '2-digit',
// //                         month: '2-digit',
// //                         year: 'numeric'
// //                       })}
// //                     </p>
// //                   </div>
// //                   <div className="bg-gray-50 p-3 rounded-lg">
// //                     <p className="text-xs text-gray-400">Dernière connexion</p>
// //                     <p className="font-medium text-gray-900">
// //                       {new Date(selectedGestionnaire.lastLogin).toLocaleString('fr-FR', {
// //                         day: '2-digit',
// //                         month: '2-digit',
// //                         year: 'numeric',
// //                         hour: '2-digit',
// //                         minute: '2-digit'
// //                       })}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Boutons d'action */}
// //                 <div className="flex justify-end gap-3 pt-4 border-t">
// //                   <button
// //                     onClick={() => setShowModal(false)}
// //                     className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
// //                   >
// //                     Fermer
// //                   </button>
// //                   <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
// //                     <Edit className="w-4 h-4" />
// //                     Modifier
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </AdminLayout>
// //   );
// // };

// // export default GestionnairesList;



// import React, { useState, useEffect } from 'react';
// import { 
//   Search, Filter, Plus, Edit, Trash2, Eye, Users, Mail, Phone, 
//   MapPin, Calendar, Shield, CheckCircle, AlertCircle, UserCheck,
//   UserX, Briefcase, BarChart3, TrendingUp, Clock, Download,
//   ChevronLeft, ChevronRight, MoreVertical, Star, Award,
//   Building2, Activity, XCircle, RefreshCw
// } from 'lucide-react';
// import AdminLayout from '../../components/AdminLayout';
// import adminService from '../../services/adminService';
// import toast from 'react-hot-toast';


// // Composant Modal de création/édition de gestionnaire
// const GestionnaireModal = ({ isOpen, onClose, gestionnaire, pointsDepot, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     telephone: '',
//     motDePasse: '',
//     nomComplet: '',
//     pointCollecteId: '',
//     fonction: 'Gestionnaire'
//   });

//   const [pointsDepotList, setPointsDepotList] = useState([]);
//   const [loadingPoints, setLoadingPoints] = useState(false);
//   const [showGestionnaireModal, setShowGestionnaireModal] = useState(false);
//   const [editingGestionnaire, setEditingGestionnaire] = useState(null);

//   // Ajoutez cette fonction après loadGestionnaires
// const handleCreateGestionnaire = async (formData) => {
//   try {
//     setLoading(true);
//     const response = await adminService.createGestionnaire(formData);
//     if (response.success) {
//       toast.success('Gestionnaire créé avec succès');
//       setShowGestionnaireModal(false);
//       loadGestionnaires(); // Recharger la liste
//     } else {
//       throw new Error(response.message || 'Erreur lors de la création');
//     }
//   } catch (error) {
//     console.error('Erreur création gestionnaire:', error);
//     toast.error(error.message || 'Erreur lors de la création du gestionnaire');
//   } finally {
//     setLoading(false);
//   }
// };

// const handleUpdateGestionnaire = async (formData) => {
//   if (!editingGestionnaire?.id) {
//     toast.error('Aucun gestionnaire sélectionné');
//     return;
//   }
  
//   try {
//     setLoading(true);
//     const response = await adminService.updateGestionnaire(editingGestionnaire.id, formData);
//     if (response.success) {
//       toast.success('Gestionnaire modifié avec succès');
//       setShowGestionnaireModal(false);
//       setEditingGestionnaire(null);
//       loadGestionnaires();
//     } else {
//       throw new Error(response.message || 'Erreur lors de la modification');
//     }
//   } catch (error) {
//     console.error('Erreur modification gestionnaire:', error);
//     toast.error(error.message || 'Erreur lors de la modification');
//   } finally {
//     setLoading(false);
//   }
// };

// const handleOpenCreateModal = () => {
//   setEditingGestionnaire(null);
//   setShowGestionnaireModal(true);
// };

// const handleOpenEditModal = (gestionnaire) => {
//   setEditingGestionnaire(gestionnaire);
//   setShowGestionnaireModal(true);
// };

// const handleCloseModal = () => {
//   setShowGestionnaireModal(false);
//   setEditingGestionnaire(null);
// };

// const handleSubmitGestionnaire = (formData) => {
//   if (editingGestionnaire) {
//     handleUpdateGestionnaire(formData);
//   } else {
//     handleCreateGestionnaire(formData);
//   }
// };

//   // Charger les points de dépôt disponibles
//   useEffect(() => {
//     const loadPointsDepot = async () => {
//       if (!isOpen) return;
//       setLoadingPoints(true);
//       try {
//         const data = await adminService.getPointsDepot();
//         setPointsDepotList(data.points || []);
//       } catch (error) {
//         console.error('Erreur chargement points de dépôt:', error);
//         toast.error('Erreur lors du chargement des points de dépôt');
//       } finally {
//         setLoadingPoints(false);
//       }
//     };
//     loadPointsDepot();
//   }, [isOpen]);

//   // Initialisation quand le modal s'ouvre
//   useEffect(() => {
//     if (gestionnaire) {
//       setFormData({
//         email: gestionnaire.email || '',
//         telephone: gestionnaire.telephone || '',
//         motDePasse: '', // Ne pas afficher le mot de passe existant
//         nomComplet: gestionnaire.nom_complet || gestionnaire.nomComplet || '',
//         pointCollecteId: gestionnaire.point_collecte_id || gestionnaire.pointCollecteId || '',
//         fonction: gestionnaire.fonction || 'Gestionnaire'
//       });
//     } else {
//       setFormData({
//         email: '',
//         telephone: '',
//         motDePasse: '',
//         nomComplet: '',
//         pointCollecteId: '',
//         fonction: 'Gestionnaire'
//       });
//     }
//   }, [gestionnaire, isOpen]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//         <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-green-50">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-gray-900">
//               {gestionnaire ? 'Modifier le gestionnaire' : 'Créer un gestionnaire'}
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <XCircle className="h-6 w-6" />
//             </button>
//           </div>
//           <p className="text-gray-600 mt-1">
//             {gestionnaire ? 'Modifiez les informations du gestionnaire' : 'Remplissez le formulaire pour créer un nouveau gestionnaire'}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
//               <input
//                 type="text"
//                 name="nomComplet"
//                 value={formData.nomComplet}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
//                 required
//                 autoFocus
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
//               <input
//                 type="tel"
//                 name="telephone"
//                 value={formData.telephone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
//                 required
//               />
//             </div>

//             {!gestionnaire && (
//               <div className="col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe *</label>
//                 <input
//                   type="password"
//                   name="motDePasse"
//                   value={formData.motDePasse}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
//                   required
//                   minLength="6"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Fonction</label>
//               <input
//                 type="text"
//                 name="fonction"
//                 value={formData.fonction}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
//                 placeholder="Gestionnaire"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Point de collecte</label>
//               <select
//                 name="pointCollecteId"
//                 value={formData.pointCollecteId}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
//               >
//                 <option value="">Non assigné</option>
//                 {loadingPoints ? (
//                   <option disabled>Chargement...</option>
//                 ) : (
//                   pointsDepotList.map(p => (
//                     <option key={p.id} value={p.id}>{p.nom}</option>
//                   ))
//                 )}
//               </select>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
//             >
//               {gestionnaire ? 'Modifier' : 'Créer'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const GestionnairesList = () => {
//   const [gestionnaires, setGestionnaires] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'
//   const [filterDepartment, setFilterDepartment] = useState('all'); // à ajuster selon les données réelles
//   const [showModal, setShowModal] = useState(false);
//   const [selectedGestionnaire, setSelectedGestionnaire] = useState(null);
//   const [detailsGestionnaire, setDetailsGestionnaire] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);

//   useEffect(() => {
//     loadGestionnaires();
//   }, []);

//   const loadGestionnaires = async () => {
//     try {
//       setLoading(true);
//       const data = await adminService.getGestionnaires();
//       setGestionnaires(data.gestionnaires || []);
//     } catch (error) {
//       console.error('Erreur chargement gestionnaires:', error);
//       toast.error('Erreur lors du chargement des gestionnaires');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDetails = async (gestionnaire) => {
//     setSelectedGestionnaire(gestionnaire);
//     setShowModal(true);
//     setDetailsGestionnaire(null);
//     try {
//       const data = await adminService.getGestionnaireDetails(gestionnaire.id);
//       setDetailsGestionnaire(data);
//     } catch (error) {
//       console.error('Erreur chargement détails gestionnaire:', error);
//       toast.error('Erreur lors du chargement des détails');
//     }
//   };

//   // Extraire les départements uniques (si disponible)
//   const departments = [...new Set(gestionnaires.map(g => g.fonction || 'Non spécifié'))];

//   const filteredGestionnaires = gestionnaires.filter(g => {
//     const matchesSearch = 
//       (g.nom_complet?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (g.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (g.fonction?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (g.point_depot_nom?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
//     const matchesStatus = filterStatus === 'all' || 
//       (filterStatus === 'active' && g.est_actif) || 
//       (filterStatus === 'inactive' && !g.est_actif);
    
//     // Département à adapter selon les données réelles
//     const matchesDepartment = filterDepartment === 'all' || g.fonction === filterDepartment;
    
//     return matchesSearch && matchesStatus && matchesDepartment;
//   });

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredGestionnaires.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredGestionnaires.length / itemsPerPage);

//   // Statistiques
//   const stats = {
//     total: gestionnaires.length,
//     actifs: gestionnaires.filter(g => g.est_actif).length,
//     inactifs: gestionnaires.filter(g => !g.est_actif).length,
//     // On pourrait ajouter d'autres stats si disponibles
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

//   const getDepartmentColor = (fonction) => {
//     // Couleurs par défaut
//     return 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   const getPerformanceLevel = (satisfaction) => {
//     return 'text-gray-600'; // Par défaut
//   };

//   if (loading) {
//     return (
//       <AdminLayout title="Gestionnaires">
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="relative mx-auto w-20 h-20">
//               <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Users className="w-8 h-8 text-emerald-500" />
//               </div>
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Chargement des gestionnaires...</p>
//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <AdminLayout title="Gestionnaires">
//       <div className="p-6 bg-gray-50 min-h-screen">
//         {/* En-tête avec gradient */}
//         <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
//                 <Briefcase className="w-8 h-8" />
//                 Gestionnaires
//               </h1>
//               <p className="text-emerald-100">Gérez les gestionnaires et suivez leurs performances sur la plateforme</p>
//             </div>
//             <div className="mt-4 md:mt-0 flex gap-3">
             
//               <button className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
//                 <Plus className="w-5 h-5" />
//                 Nouveau gestionnaire
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Cartes de statistiques modernes */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 mb-8">
//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Total</p>
//               <div className="p-2 bg-emerald-100 rounded-lg">
//                 <Users className="w-4 h-4 text-emerald-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
//             <p className="text-xs text-gray-400 mt-1">Gestionnaires</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Actifs</p>
//               <div className="p-2 bg-emerald-100 rounded-lg">
//                 <UserCheck className="w-4 h-4 text-emerald-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-emerald-600">{stats.actifs}</p>
//             <p className="text-xs text-gray-400 mt-1">{Math.round((stats.actifs/stats.total)*100) || 0}% du total</p>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-sm text-gray-500">Inactifs</p>
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <UserX className="w-4 h-4 text-red-600" />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-red-600">{stats.inactifs}</p>
//             <p className="text-xs text-gray-400 mt-1">Comptes inactifs</p>
//           </div>
//         </div>

//         {/* Barre de filtres améliorée */}
//         <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Rechercher par nom, email, téléphone, point de collecte..."
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
//                 <select
//                   className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">Tous les statuts</option>
//                   <option value="active">Actifs</option>
//                   <option value="inactive">Inactifs</option>
//                 </select>
//               </div>

//               <div className="relative">
//                 <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
//                 <select
//                   className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
//                   value={filterDepartment}
//                   onChange={(e) => setFilterDepartment(e.target.value)}
//                 >
//                   <option value="all">Toutes les fonctions</option>
//                   {departments.map((dept, index) => (
//                     <option key={index} value={dept}>{dept}</option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 onClick={loadGestionnaires}
//                 className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//               >
//                 <RefreshCw className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Tags de recherche actifs */}
//           {(searchTerm || filterStatus !== 'all' || filterDepartment !== 'all') && (
//             <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
//               <span className="text-sm text-gray-500">Filtres actifs:</span>
//               {searchTerm && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
//                   Recherche: "{searchTerm}"
//                   <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-900">
//                     <XCircle className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
//               {filterStatus !== 'all' && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
//                   Statut: {filterStatus === 'active' ? 'Actifs' : 'Inactifs'}
//                   <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-emerald-900">
//                     <XCircle className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
//               {filterDepartment !== 'all' && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
//                   Fonction: {filterDepartment}
//                   <button onClick={() => setFilterDepartment('all')} className="ml-1 hover:text-emerald-900">
//                     <XCircle className="w-4 h-4" />
//                   </button>
//                 </span>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Tableau moderne */}
//         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gestionnaire</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fonction</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Point de collecte</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Inscription</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentItems.map((gestionnaire) => (
//                   <tr key={gestionnaire.id} className="hover:bg-gray-50 transition-colors group">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
//                           <Users className="w-5 h-5 text-emerald-600" />
//                         </div>
//                         <div className="ml-3">
//                           <div className="text-sm font-semibold text-gray-900">{gestionnaire.nom_complet}</div>
//                           <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                             <Mail className="w-3 h-3" />
//                             {gestionnaire.email}
//                           </div>
//                           <div className="text-xs text-gray-500 flex items-center gap-1">
//                             <Phone className="w-3 h-3" />
//                             {gestionnaire.telephone}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg ${getDepartmentColor(gestionnaire.fonction)}`}>
//                         {gestionnaire.fonction || '-'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-1 text-sm text-gray-700">
//                         <MapPin className="w-4 h-4 text-gray-400" />
//                         {gestionnaire.point_depot_nom || '-'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       {getStatusBadge(gestionnaire.est_actif)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="space-y-1 text-sm">
//                         <div className="flex items-center gap-1">
//                           <Mail className="w-3 h-3 text-gray-400" />
//                           {gestionnaire.email}
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Phone className="w-3 h-3 text-gray-400" />
//                           {gestionnaire.telephone}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-1 text-sm text-gray-600">
//                         <Calendar className="w-3 h-3 text-gray-400" />
//                         {new Date(gestionnaire.cree_le).toLocaleDateString('fr-FR')}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleDetails(gestionnaire)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Voir détails"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Modifier">
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors" title="Plus d'options">
//                           <MoreVertical className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {filteredGestionnaires.length === 0 && (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center">
//                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
//                           <Users className="w-8 h-8 text-gray-400" />
//                         </div>
//                         <p className="text-gray-500 font-medium">Aucun gestionnaire trouvé</p>
//                         <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {filteredGestionnaires.length > 0 && (
//             <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="text-sm text-gray-500">
//                 Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
//                 <span className="font-medium">
//                   {Math.min(indexOfLastItem, filteredGestionnaires.length)}
//                 </span>{' '}
//                 sur <span className="font-medium">{filteredGestionnaires.length}</span> gestionnaires
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
//                   Page {currentPage} sur {totalPages || 1}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages || totalPages === 0}
//                   className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Modal de détails */}
//         {showModal && selectedGestionnaire && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//               {/* En-tête du modal */}
//               <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
//                 <div className="flex items-center justify-between text-white">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                       <Users className="w-8 h-8" />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold">{selectedGestionnaire.nom_complet}</h3>
//                       <p className="text-emerald-100">{selectedGestionnaire.fonction || 'Gestionnaire'} • ID: {selectedGestionnaire.id}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                   >
//                     <XCircle className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
              
//               {/* Corps du modal */}
//               <div className="p-6 space-y-6">
//                 {detailsGestionnaire ? (
//                   <>
//                     {/* Informations de base */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="bg-gray-50 p-4 rounded-xl">
//                         <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                           <Mail className="w-4 h-4" /> Contact
//                         </h4>
//                         <div className="space-y-2">
//                           <p className="text-gray-900 flex items-center gap-2">
//                             <Mail className="w-4 h-4 text-gray-400" />
//                             {selectedGestionnaire.email}
//                           </p>
//                           <p className="text-gray-900 flex items-center gap-2">
//                             <Phone className="w-4 h-4 text-gray-400" />
//                             {selectedGestionnaire.telephone}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="bg-gray-50 p-4 rounded-xl">
//                         <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
//                           <Briefcase className="w-4 h-4" /> Professionnel
//                         </h4>
//                         <div className="space-y-2">
//                           <p className="flex justify-between">
//                             <span className="text-gray-600">Fonction:</span>
//                             <span className="font-medium text-gray-900">{selectedGestionnaire.fonction || '-'}</span>
//                           </p>
//                           <p className="flex justify-between">
//                             <span className="text-gray-600">Point de collecte:</span>
//                             <span className="font-medium text-gray-900">{selectedGestionnaire.point_depot_nom || '-'}</span>
//                           </p>
//                           <p className="flex justify-between">
//                             <span className="text-gray-600">Statut:</span>
//                             <span>{getStatusBadge(selectedGestionnaire.est_actif)}</span>
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Statistiques des achats et collectes */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl border border-green-100">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="text-sm text-green-600 font-medium">Achats</p>
//                             <p className="text-3xl font-bold text-gray-800 mt-1">{detailsGestionnaire.achats?.nombre || 0}</p>
//                             <p className="text-xs text-gray-500 mt-1">Total transactions</p>
//                           </div>
//                           <div className="p-3 bg-green-100 rounded-lg">
//                             <TrendingUp className="w-6 h-6 text-green-600" />
//                           </div>
//                         </div>
//                         <div className="mt-3 pt-3 border-t border-green-100">
//                           <div className="flex justify-between text-sm">
//                             <span className="text-gray-500">Poids total</span>
//                             <span className="font-semibold text-gray-800">{detailsGestionnaire.achats?.poids_total || 0} kg</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="text-sm text-blue-600 font-medium">Collectes validées</p>
//                             <p className="text-3xl font-bold text-gray-800 mt-1">{detailsGestionnaire.collectes?.nombre || 0}</p>
//                             <p className="text-xs text-gray-500 mt-1">Validations</p>
//                           </div>
//                           <div className="p-3 bg-blue-100 rounded-lg">
//                             <Activity className="w-6 h-6 text-blue-600" />
//                           </div>
//                         </div>
//                         <div className="mt-3 pt-3 border-t border-blue-100">
//                           <div className="flex justify-between text-sm">
//                             <span className="text-gray-500">Poids total</span>
//                             <span className="font-semibold text-gray-800">{detailsGestionnaire.collectes?.poids_total || 0} kg</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Derniers achats */}
//                     <div className="space-y-3">
//                       <h4 className="font-medium text-gray-900 flex items-center gap-2">
//                         <TrendingUp className="w-4 h-4 text-emerald-600" /> Derniers achats
//                       </h4>
//                       {detailsGestionnaire.achats?.liste?.length > 0 ? (
//                         <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
//                           {detailsGestionnaire.achats.liste.slice(0, 5).map(a => (
//                             <div key={a.id} className="p-3 flex justify-between items-center hover:bg-white transition-colors">
//                               <div>
//                                 <p className="text-sm font-medium text-gray-800">{a.type_dechet}</p>
//                                 <p className="text-xs text-gray-500">{new Date(a.date_achat).toLocaleDateString('fr-FR')}</p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="text-sm font-semibold text-green-600">{a.poids} kg</p>
//                                 <p className="text-xs text-gray-600">{a.total} FCFA</p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <p className="text-sm text-gray-500 italic">Aucun achat récent</p>
//                       )}
//                     </div>

//                     {/* Dernières collectes validées */}
//                     <div className="space-y-3">
//                       <h4 className="font-medium text-gray-900 flex items-center gap-2">
//                         <Activity className="w-4 h-4 text-emerald-600" /> Dernières collectes validées
//                       </h4>
//                       {detailsGestionnaire.collectes?.liste?.length > 0 ? (
//                         <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
//                           {detailsGestionnaire.collectes.liste.slice(0, 5).map(c => (
//                             <div key={c.id} className="p-3 flex justify-between items-center hover:bg-white transition-colors">
//                               <div>
//                                 <p className="text-sm font-medium text-gray-800">{c.type_dechet}</p>
//                                 <p className="text-xs text-gray-500">{new Date(c.date_validation).toLocaleDateString('fr-FR')}</p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="text-sm font-semibold text-green-600">{c.poids_depose} kg</p>
//                                 <p className="text-xs text-gray-600">{c.gains_attribues} FCFA</p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <p className="text-sm text-gray-500 italic">Aucune collecte validée récente</p>
//                       )}
//                     </div>
//                   </>
//                 ) : (
//                   <div className="flex justify-center py-12">
//                     <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
//                   </div>
//                 )}
//               </div>

//               {/* Pied du modal */}
//               <div className="bg-gray-50 px-6 py-3 flex justify-end">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//                 >
//                   Fermer
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   );
// };

// export default GestionnairesList;



import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, Eye, Users, Mail, Phone, 
  MapPin, Calendar, Shield, CheckCircle, AlertCircle, UserCheck,
  UserX, Briefcase, BarChart3, TrendingUp, Clock, Download,
  ChevronLeft, ChevronRight, MoreVertical, Star, Award,
  Building2, Activity, XCircle, RefreshCw
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';

// Composant Modal de création/édition de gestionnaire
const GestionnaireModal = ({ isOpen, onClose, gestionnaire, pointsDepot, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    telephone: '',
    motDePasse: '',
    nomComplet: '',
    pointCollecteId: '',
    fonction: 'Gestionnaire'
  });

  const [pointsDepotList, setPointsDepotList] = useState([]);
  const [loadingPoints, setLoadingPoints] = useState(false);

  // Charger les points de dépôt disponibles
  useEffect(() => {
    const loadPointsDepot = async () => {
      if (!isOpen) return;
      setLoadingPoints(true);
      try {
        const data = await adminService.getPointsDepot();
        setPointsDepotList(data.points || []);
      } catch (error) {
        console.error('Erreur chargement points de dépôt:', error);
        toast.error('Erreur lors du chargement des points de dépôt');
      } finally {
        setLoadingPoints(false);
      }
    };
    loadPointsDepot();
  }, [isOpen]);

  // Initialisation quand le modal s'ouvre
  useEffect(() => {
    if (gestionnaire) {
      setFormData({
        email: gestionnaire.email || '',
        telephone: gestionnaire.telephone || '',
        motDePasse: '', // Ne pas afficher le mot de passe existant
        nomComplet: gestionnaire.nom_complet || gestionnaire.nomComplet || '',
        pointCollecteId: gestionnaire.point_collecte_id || gestionnaire.pointCollecteId || '',
        fonction: gestionnaire.fonction || 'Gestionnaire'
      });
    } else {
      setFormData({
        email: '',
        telephone: '',
        motDePasse: '',
        nomComplet: '',
        pointCollecteId: '',
        fonction: 'Gestionnaire'
      });
    }
  }, [gestionnaire, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {gestionnaire ? 'Modifier le gestionnaire' : 'Créer un gestionnaire'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
          <p className="text-gray-600 mt-1">
            {gestionnaire ? 'Modifiez les informations du gestionnaire' : 'Remplissez le formulaire pour créer un nouveau gestionnaire'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
              <input
                type="text"
                name="nomComplet"
                value={formData.nomComplet}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            {!gestionnaire && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe *</label>
                <input
                  type="password"
                  name="motDePasse"
                  value={formData.motDePasse}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  required
                  minLength="6"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fonction</label>
              <input
                type="text"
                name="fonction"
                value={formData.fonction}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                placeholder="Gestionnaire"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Point de collecte</label>
              <select
                name="pointCollecteId"
                value={formData.pointCollecteId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
              >
                <option value="">Non assigné</option>
                {loadingPoints ? (
                  <option disabled>Chargement...</option>
                ) : (
                  pointsDepotList.map(p => (
                    <option key={p.id} value={p.id}>{p.nom}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              {gestionnaire ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GestionnairesList = () => {
  const [gestionnaires, setGestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedGestionnaire, setSelectedGestionnaire] = useState(null);
  const [detailsGestionnaire, setDetailsGestionnaire] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  
  // États pour le modal de création/édition
  const [showGestionnaireModal, setShowGestionnaireModal] = useState(false);
  const [editingGestionnaire, setEditingGestionnaire] = useState(null);
  const [pointsDepot, setPointsDepot] = useState([]);

  useEffect(() => {
    loadGestionnaires();
  }, []);

  const loadGestionnaires = async () => {
    try {
      setLoading(true);
      const data = await adminService.getGestionnaires();
      setGestionnaires(data.gestionnaires || []);
    } catch (error) {
      console.error('Erreur chargement gestionnaires:', error);
      toast.error('Erreur lors du chargement des gestionnaires');
    } finally {
      setLoading(false);
    }
  };

  // Fonctions pour la gestion des gestionnaires
  const handleCreateGestionnaire = async (formData) => {
    try {
      setLoading(true);
      const response = await adminService.createGestionnaire(formData);
      if (response.success) {
        toast.success('Gestionnaire créé avec succès');
        setShowGestionnaireModal(false);
        loadGestionnaires();
      } else {
        throw new Error(response.message || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Erreur création gestionnaire:', error);
      toast.error(error.message || 'Erreur lors de la création du gestionnaire');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGestionnaire = async (formData) => {
    if (!editingGestionnaire?.id) {
      toast.error('Aucun gestionnaire sélectionné');
      return;
    }
    
    try {
      setLoading(true);
      const response = await adminService.updateGestionnaire(editingGestionnaire.id, formData);
      if (response.success) {
        toast.success('Gestionnaire modifié avec succès');
        setShowGestionnaireModal(false);
        setEditingGestionnaire(null);
        loadGestionnaires();
      } else {
        throw new Error(response.message || 'Erreur lors de la modification');
      }
    } catch (error) {
      console.error('Erreur modification gestionnaire:', error);
      toast.error(error.message || 'Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingGestionnaire(null);
    setShowGestionnaireModal(true);
  };

  const handleOpenEditModal = (gestionnaire) => {
    setEditingGestionnaire(gestionnaire);
    setShowGestionnaireModal(true);
  };

  const handleCloseModal = () => {
    setShowGestionnaireModal(false);
    setEditingGestionnaire(null);
  };

  const handleSubmitGestionnaire = (formData) => {
    if (editingGestionnaire) {
      handleUpdateGestionnaire(formData);
    } else {
      handleCreateGestionnaire(formData);
    }
  };

  const handleDetails = async (gestionnaire) => {
    setSelectedGestionnaire(gestionnaire);
    setShowModal(true);
    setDetailsGestionnaire(null);
    try {
      const data = await adminService.getGestionnaireDetails(gestionnaire.id);
      setDetailsGestionnaire(data);
    } catch (error) {
      console.error('Erreur chargement détails gestionnaire:', error);
      toast.error('Erreur lors du chargement des détails');
    }
  };

  // Extraire les départements uniques
  const departments = [...new Set(gestionnaires.map(g => g.fonction || 'Non spécifié'))];

  const filteredGestionnaires = gestionnaires.filter(g => {
    const matchesSearch = 
      (g.nom_complet?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (g.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (g.fonction?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (g.point_depot_nom?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && g.est_actif) || 
      (filterStatus === 'inactive' && !g.est_actif);
    
    const matchesDepartment = filterDepartment === 'all' || g.fonction === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGestionnaires.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGestionnaires.length / itemsPerPage);

  // Statistiques
  const stats = {
    total: gestionnaires.length,
    actifs: gestionnaires.filter(g => g.est_actif).length,
    inactifs: gestionnaires.filter(g => !g.est_actif).length,
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

  const getDepartmentColor = (fonction) => {
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <AdminLayout title="Gestionnaires">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des gestionnaires...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Gestionnaires">
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Briefcase className="w-8 h-8" />
                Gestionnaires
              </h1>
              <p className="text-emerald-100">Gérez les gestionnaires et suivez leurs performances sur la plateforme</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button 
                onClick={handleOpenCreateModal}
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Nouveau gestionnaire
              </button>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-1">Gestionnaires</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Actifs</p>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <UserCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.actifs}</p>
            <p className="text-xs text-gray-400 mt-1">{Math.round((stats.actifs/stats.total)*100) || 0}% du total</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Inactifs</p>
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-red-600">{stats.inactifs}</p>
            <p className="text-xs text-gray-400 mt-1">Comptes inactifs</p>
          </div>
        </div>

        {/* Barre de filtres */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone, point de collecte..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actifs</option>
                  <option value="inactive">Inactifs</option>
                </select>
              </div>

              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="all">Toutes les fonctions</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={loadGestionnaires}
                className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Tags de recherche actifs */}
          {(searchTerm || filterStatus !== 'all' || filterDepartment !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Filtres actifs:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Recherche: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-900">
                    <XCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Statut: {filterStatus === 'active' ? 'Actifs' : 'Inactifs'}
                  <button onClick={() => setFilterStatus('all')} className="ml-1 hover:text-emerald-900">
                    <XCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterDepartment !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Fonction: {filterDepartment}
                  <button onClick={() => setFilterDepartment('all')} className="ml-1 hover:text-emerald-900">
                    <XCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gestionnaire</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fonction</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Point de collecte</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                 
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Inscription</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((gestionnaire) => (
                  <tr key={gestionnaire.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                          <Users className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900">{gestionnaire.nom_complet}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {gestionnaire.email}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {gestionnaire.telephone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg ${getDepartmentColor(gestionnaire.fonction)}`}>
                        {gestionnaire.fonction || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {gestionnaire.point_depot_nom || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(gestionnaire.est_actif)}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {new Date(gestionnaire.cree_le).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDetails(gestionnaire)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleOpenEditModal(gestionnaire)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredGestionnaires.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucun gestionnaire trouvé</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredGestionnaires.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredGestionnaires.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredGestionnaires.length}</span> gestionnaires
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                  Page {currentPage} sur {totalPages || 1}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal de détails */}
        {showModal && selectedGestionnaire && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedGestionnaire.nom_complet}</h3>
                      <p className="text-emerald-100">{selectedGestionnaire.fonction || 'Gestionnaire'} • ID: {selectedGestionnaire.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {detailsGestionnaire ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Contact
                        </h4>
                        <div className="space-y-2">
                          <p className="text-gray-900 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {selectedGestionnaire.email}
                          </p>
                          <p className="text-gray-900 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {selectedGestionnaire.telephone}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                          <Briefcase className="w-4 h-4" /> Professionnel
                        </h4>
                        <div className="space-y-2">
                          <p className="flex justify-between">
                            <span className="text-gray-600">Fonction:</span>
                            <span className="font-medium text-gray-900">{selectedGestionnaire.fonction || '-'}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-600">Point de collecte:</span>
                            <span className="font-medium text-gray-900">{selectedGestionnaire.point_depot_nom || '-'}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-600">Statut:</span>
                            <span>{getStatusBadge(selectedGestionnaire.est_actif)}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl border border-green-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-600 font-medium">Achats</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{detailsGestionnaire.achats?.nombre || 0}</p>
                            <p className="text-xs text-gray-500 mt-1">Total transactions</p>
                          </div>
                          <div className="p-3 bg-green-100 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-green-100">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Poids total</span>
                            <span className="font-semibold text-gray-800">{detailsGestionnaire.achats?.poids_total || 0} kg</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-600 font-medium">Collectes validées</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{detailsGestionnaire.collectes?.nombre || 0}</p>
                            <p className="text-xs text-gray-500 mt-1">Validations</p>
                          </div>
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Activity className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-blue-100">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Poids total</span>
                            <span className="font-semibold text-gray-800">{detailsGestionnaire.collectes?.poids_total || 0} kg</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center py-12">
                    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de création/édition de gestionnaire */}
        <GestionnaireModal
          isOpen={showGestionnaireModal}
          onClose={handleCloseModal}
          gestionnaire={editingGestionnaire}
          pointsDepot={pointsDepot}
          onSubmit={handleSubmitGestionnaire}
        />
      </div>
    </AdminLayout>
  );
};

export default GestionnairesList;