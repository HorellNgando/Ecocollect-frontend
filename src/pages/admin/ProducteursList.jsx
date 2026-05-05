


// import React, { useState, useEffect } from 'react';
// import DashboardLayout from '../../Layouts/LayoutDashboard';
// import AdminLayout from '../../components/AdminLayout';
// import adminService from '../../services/adminService';
// import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';
// import { FaRecycle } from 'react-icons/fa';
// import toast from 'react-hot-toast';

// const ProducteursList = () => {
//   const [producteurs, setProducteurs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('ecocollect_user'));
//     setUser(userData);
//     loadProducteurs();
//   }, []);

//   const loadProducteurs = async () => {
//     try {
//       setLoading(true);
//       const data = await adminService.getProducteurs();
//       setProducteurs(data.producteurs || []);
//     } catch (error) {
//       console.error('Erreur chargement producteurs:', error);
//       toast.error('Erreur lors du chargement des producteurs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calcul des statistiques
//   const stats = {
//     total: producteurs.length,
//     particuliers: producteurs.filter(p => p.type_producteur === 'particulier').length,
//     entreprises: producteurs.filter(p => p.type_producteur === 'entreprise').length,
//     premium: producteurs.filter(p => p.type_compte === 'premium').length,
//     standard: producteurs.filter(p => p.type_compte === 'standard').length,
//   };

//   return (
//     <AdminLayout title="Producteurs" user={user}>
//       {/* Cartes statistiques */}
//       <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-green-600 uppercase tracking-wider">Total</p>
//               <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
//               <p className="text-xs text-gray-500 mt-1">Producteurs inscrits</p>
//             </div>
//             <div className="p-3 bg-green-100 rounded-xl">
//               <FiUser className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">Particuliers</p>
//               <p className="text-3xl font-bold text-gray-800 mt-1">{stats.particuliers}</p>
//               <p className="text-xs text-gray-500 mt-1">{((stats.particuliers/stats.total)*100 || 0).toFixed(1)}%</p>
//             </div>
//             <div className="p-3 bg-blue-100 rounded-xl">
//               <FiUser className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-purple-600 uppercase tracking-wider">Entreprises</p>
//               <p className="text-3xl font-bold text-gray-800 mt-1">{stats.entreprises}</p>
//               <p className="text-xs text-gray-500 mt-1">{((stats.entreprises/stats.total)*100 || 0).toFixed(1)}%</p>
//             </div>
//             <div className="p-3 bg-purple-100 rounded-xl">
//               <FiAward className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 border border-amber-100 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-amber-600 uppercase tracking-wider">Premium</p>
//               <p className="text-3xl font-bold text-gray-800 mt-1">{stats.premium}</p>
//               <p className="text-xs text-gray-500 mt-1">{stats.standard} standard</p>
//             </div>
//             <div className="p-3 bg-amber-100 rounded-xl">
//               <FiAward className="w-6 h-6 text-amber-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tableau des producteurs */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <FaRecycle className="w-6 h-6 text-green-500 animate-pulse" />
//               </div>
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Chargement des producteurs...</p>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     {['Nom', 'Email', 'Téléphone', 'Type', 'Localisation', 'Compte', 'Inscription'].map(header => (
//                       <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-100">
//                   {producteurs.map((p, index) => (
//                     <tr key={p.id} className="hover:bg-green-50 transition-colors duration-150">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center">
//                             <span className="text-green-700 font-medium">
//                               {p.nom_complet?.charAt(0) || 'P'}
//                             </span>
//                           </div>
//                           <div className="ml-3">
//                             <p className="text-sm font-medium text-gray-900">{p.nom_complet}</p>
//                             <p className="text-xs text-gray-500">ID: {p.id}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-gray-700">
//                           <FiMail className="mr-2 text-green-500" />
//                           {p.email}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-gray-700">
//                           <FiPhone className="mr-2 text-green-500" />
//                           {p.telephone}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize
//                           ${p.type_producteur === 'particulier' 
//                             ? 'bg-blue-100 text-blue-800 border border-blue-200' 
//                             : 'bg-purple-100 text-purple-800 border border-purple-200'
//                           }`}>
//                           {p.type_producteur}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-gray-700">
//                           <FiMapPin className="mr-2 text-green-500 flex-shrink-0" />
//                           <span>{p.quartier}, {p.commune}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           p.type_compte === 'premium'
//                             ? 'bg-amber-100 text-amber-800 border border-amber-200'
//                             : 'bg-gray-100 text-gray-800 border border-gray-200'
//                         }`}>
//                           {p.type_compte === 'premium' ? (
//                             <span className="flex items-center">
//                               <FiAward className="mr-1" /> Premium
//                             </span>
//                           ) : 'Standard'}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <div className="flex items-center">
//                           <FiCalendar className="mr-2 text-green-500" />
//                           {new Date(p.cree_le).toLocaleDateString('fr-FR')}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {producteurs.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
//                   <FiUser className="w-10 h-10 text-green-600" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun producteur</h3>
//                 <p className="text-gray-500">La liste des producteurs est vide pour le moment.</p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </AdminLayout>
//   );
// };

// export default ProducteursList;


import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Layouts/LayoutDashboard';
import AdminLayout from '../../components/AdminLayout';
import adminService from '../../services/adminService';
import {
  Search, Filter, Plus, Edit, Trash2, Eye, Users, Mail, Phone,
  MapPin, Calendar, Award, UserCheck, Package, ChevronLeft,
  ChevronRight, MoreVertical, XCircle, RefreshCw, Download,
  Building2, Recycle, User, Star
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProducteursList = () => {
  const [producteurs, setProducteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'particulier', 'entreprise'
  const [filterCompte, setFilterCompte] = useState('all'); // 'all', 'premium', 'standard'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducteur, setSelectedProducteur] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user'));
    setUser(userData);
    loadProducteurs();
  }, []);

  const loadProducteurs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getProducteurs();
      setProducteurs(data.producteurs || []);
    } catch (error) {
      console.error('Erreur chargement producteurs:', error);
      toast.error('Erreur lors du chargement des producteurs');
    } finally {
      setLoading(false);
    }
  };

  // Filtrage
  const filteredProducteurs = producteurs.filter(p => {
    const matchesSearch = 
      (p.nom_complet?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (p.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (p.telephone || '').includes(searchTerm) ||
      (p.quartier?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (p.commune?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || p.type_producteur === filterType;
    const matchesCompte = filterCompte === 'all' || p.type_compte === filterCompte;
    
    return matchesSearch && matchesType && matchesCompte;
  });

  // Statistiques
  const stats = {
    total: producteurs.length,
    particuliers: producteurs.filter(p => p.type_producteur === 'particulier').length,
    entreprises: producteurs.filter(p => p.type_producteur === 'entreprise').length,
    premium: producteurs.filter(p => p.type_compte === 'premium').length,
    standard: producteurs.filter(p => p.type_compte === 'standard').length,
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducteurs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducteurs.length / itemsPerPage);

  const getTypeBadge = (type) => {
    return type === 'entreprise' ? (
      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
        <Building2 className="w-3 h-3 mr-1" />
        Entreprise
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
        <User className="w-3 h-3 mr-1" />
        Particulier
      </span>
    );
  };

  const getCompteBadge = (type) => {
    return type === 'premium' ? (
      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
        <Award className="w-3 h-3 mr-1" />
        Premium
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
        <Star className="w-3 h-3 mr-1" />
        Standard
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout title="Producteurs" user={user}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Recycle className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Chargement des producteurs...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Producteurs" user={user}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* En-tête avec gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Recycle className="w-8 h-8" />
                Producteurs
              </h1>
              <p className="text-emerald-100">Gérez les producteurs de déchets et suivez leurs contributions</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              
              <button className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
                <Plus className="w-5 h-5" />
                Nouveau producteur
              </button>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-1">Producteurs</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Particuliers</p>
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.particuliers}</p>
            <p className="text-xs text-gray-400 mt-1">{((stats.particuliers/stats.total)*100 || 0).toFixed(1)}%</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Entreprises</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.entreprises}</p>
            <p className="text-xs text-gray-400 mt-1">{((stats.entreprises/stats.total)*100 || 0).toFixed(1)}%</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Premium</p>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Award className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-600">{stats.premium}</p>
            <p className="text-xs text-gray-400 mt-1">{stats.standard} standard</p>
          </div>
        </div>

        {/* Barre de filtres */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone, quartier, commune..."
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
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">Tous types</option>
                  <option value="particulier">Particuliers</option>
                  <option value="entreprise">Entreprises</option>
                </select>
              </div>

              <div className="relative">
                <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white min-w-[150px]"
                  value={filterCompte}
                  onChange={(e) => setFilterCompte(e.target.value)}
                >
                  <option value="all">Tous comptes</option>
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterCompte('all');
                }}
                className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                title="Réinitialiser les filtres"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filtres actifs */}
          {(searchTerm || filterType !== 'all' || filterCompte !== 'all') && (
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
              {filterType !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Type: {filterType === 'particulier' ? 'Particuliers' : 'Entreprises'}
                  <button onClick={() => setFilterType('all')} className="ml-1 hover:text-emerald-900">
                    <XCircle className="w-4 h-4" />
                  </button>
                </span>
              )}
              {filterCompte !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Compte: {filterCompte === 'premium' ? 'Premium' : 'Standard'}
                  <button onClick={() => setFilterCompte('all')} className="ml-1 hover:text-emerald-900">
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Producteur</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Compte</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Localisation</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Inscription</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                          <User className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900">{p.nom_complet}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {p.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getTypeBadge(p.type_producteur)}
                    </td>
                    <td className="px-6 py-4">
                      {getCompteBadge(p.type_compte)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{p.quartier}, {p.commune}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(p.cree_le).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedProducteur(p);
                            setShowModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducteurs.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucun producteur trouvé</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredProducteurs.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">{Math.min(indexOfLastItem, filteredProducteurs.length)}</span>{' '}
                sur <span className="font-medium">{filteredProducteurs.length}</span> producteurs
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
        {showModal && selectedProducteur && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedProducteur.nom_complet}</h3>
                      <p className="text-emerald-100">Producteur • ID: {selectedProducteur.id}</p>
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
                {/* Grille d'informations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Contact
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {selectedProducteur.email}
                      </p>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {selectedProducteur.telephone || 'Non renseigné'}
                      </p>
                      <p className="text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {selectedProducteur.quartier}, {selectedProducteur.commune}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4" /> Profil
                    </h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Type :</span>
                        <span>{getTypeBadge(selectedProducteur.type_producteur)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Compte :</span>
                        <span>{getCompteBadge(selectedProducteur.type_compte)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl">
                    <p className="text-sm text-emerald-600 mb-1">Date d'inscription</p>
                    <p className="text-xl font-bold text-emerald-700">
                      {new Date(selectedProducteur.cree_le).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-blue-600 mb-1">Dernière mise à jour</p>
                    <p className="text-xl font-bold text-blue-700">
                      {selectedProducteur.modifie_le
                        ? new Date(selectedProducteur.modifie_le).toLocaleDateString('fr-FR')
                        : 'Jamais'}
                    </p>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProducteursList;