

// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { 
//   FiHome, FiUsers, FiPackage, FiDollarSign, 
//   FiFileText, FiLogOut, FiMenu, FiX,
//   FiUserPlus, FiList, FiSettings, FiBarChart,
//   FiTrendingUp, FiMap, FiCalendar, FiAward,FiUser,
//   FiActivity, FiBriefcase, FiHeart, FiShoppingCart
// } from 'react-icons/fi';

// const AdminSidebar = ({ isOpen, setIsOpen, onLogoutClick }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   React.useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('ecocollect_user') || '{}');
//     setUser(userData);
//   }, []);

//   const menuItems = [
//     {
//       title: 'Principal',
//       items: [
//         { path: '/admin', icon: FiHome, label: 'Tableau de bord', badge: null, description: 'Vue d\'ensemble' }
//       ]
//     },
//     {
//       title: 'Gestion des utilisateurs',
//       items: [
//         { path: '/admin/superviseurs', icon: FiUsers, label: 'Superviseurs', badge: null, description: 'Gérer les superviseurs' },
//         { path: '/admin/superviseurs/nouveau', icon: FiUserPlus, label: 'Nouveau superviseur', badge: 'Nouveau', description: 'Ajouter un superviseur' },
//         { path: '/admin/gestionnaires', icon: FiSettings, label: 'Gestionnaires', badge: null, description: 'Gérer les gestionnaires' },
//         { path: '/admin/collecteurs', icon: FiPackage, label: 'Collecteurs', badge: null, description: 'Gérer les collecteurs' },
//         { path: '/admin/producteurs', icon: FiTrendingUp, label: 'Producteurs', badge: null, description: 'Gérer les producteurs' },
//         { path: '/admin/recycleurs', icon: FiActivity, label: 'Recycleurs', badge: null, description: 'Gérer les recycleurs' }
//       ]
//     },
//     {
//       title: 'Organisations',
//       items: [
//         { path: '/admin/ongs', icon: FiHeart, label: 'ONGs', badge: null, description: 'Organisations non gouvernementales' },
//         { path: '/admin/ongs/nouveau', icon: FiUserPlus, label: 'Nouvelle ONG', badge: null, description: 'Ajouter une ONG' },
//         { path: '/admin/sponsors', icon: FiDollarSign, label: 'Sponsors', badge: null, description: 'Gérer les sponsors' },
//         { path: '/admin/sponsors/nouveau', icon: FiUserPlus, label: 'Nouveau sponsor', badge: null, description: 'Ajouter un sponsor' }
//       ]
//     },
//     {
//       title: 'Campagnes',
//       items: [
//         { path: '/admin/campagnes', icon: FiCalendar, label: 'Campagnes', badge: null, description: 'Gérer les campagnes' },
//         { path: '/admin/campagnes/nouveau', icon: FiUserPlus, label: 'Nouvelle campagne', badge: null, description: 'Créer une campagne' }
//       ]
//     },
//     {
//       title: 'Système',
//       items: [
//         { path: '/admin/profil', icon: FiUser, label: 'Mon profil', badge: null, description: 'Gérer mon profil' },
//         { path: '/admin/producteur-premium', icon: FiAward, label: 'Producteurs premium', badge: null, description: 'Abonnements premium' }
//       ]
//     }
//   ];

//   const isActive = (path) => {
//     const currentPath = location.pathname;
    
//     if (currentPath === path) return true;
    
//     if (path.includes('/nouveau') && currentPath.includes('/nouveau')) {
//       const basePath = path.replace('/nouveau', '');
//       const currentBasePath = currentPath.replace(/\/nouveau.*/, '');
//       return basePath === currentBasePath;
//     }
    
//     if (path.includes('/edit') && currentPath.includes('/edit')) {
//       const basePath = path.replace(/\/:id\/edit$/, '');
//       const currentBasePath = currentPath.replace(/\/\d+\/edit$/, '');
//       return basePath === currentBasePath;
//     }
    
//     return false;
//   };

//   return (
//     <>
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       <div className={`
//         h-full bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col
//         ${isOpen ? 'w-72' : 'w-20'}
//       `}>
//         {/* Header avec dégradé emerald */}
//         <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-emerald-800 flex-shrink-0">
//           <div className="flex items-center justify-between">
//             <div className={`flex items-center gap-2 ${!isOpen && 'justify-center w-full'}`}>
//               <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
//                 <FiSettings className="w-5 h-5 text-emerald-600" />
//               </div>
//               {isOpen && (
//                 <div>
//                   <h1 className="text-lg font-bold text-white">EcoCollect</h1>
//                   <p className="text-xs text-emerald-100">Admin Panel</p>
//                 </div>
//               )}
//             </div>
//             <button 
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white flex-shrink-0"
//               title={isOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}
//             >
//               {isOpen ? <FiX className="w-4 h-4" /> : <FiMenu className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>

//         {/* User info */}
//         {isOpen && user && (
//           <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                 {user.nomComplet?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AD'}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="font-semibold text-gray-900 truncate text-sm">{user.nomComplet || 'Admin'}</p>
//                 <p className="text-xs text-gray-500 truncate">{user.email || 'admin@ecocollect.com'}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation scrollable */}
//         <nav className="flex-1 overflow-y-auto">
//           <div className="p-4 space-y-1">
//             {menuItems.map((section, sectionIndex) => (
//               <div key={sectionIndex} className="mb-5">
//                 {isOpen && (
//                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
//                     {section.title}
//                   </h3>
//                 )}
//                 <ul className="space-y-1">
//                   {section.items.map((item, itemIndex) => {
//                     const Icon = item.icon;
//                     const active = isActive(item.path);
                    
//                     return (
//                       <li key={itemIndex}>
//                         <Link
//                           to={item.path}
//                           className={`
//                             flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
//                             ${active 
//                               ? 'bg-emerald-50 text-emerald-700' 
//                               : 'text-gray-700 hover:bg-gray-100'
//                             }
//                             ${!isOpen && 'justify-center'}
//                           `}
//                           title={!isOpen ? item.label : ''}
//                         >
//                           <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-emerald-600' : 'text-gray-500'}`} />
//                           {isOpen && (
//                             <span className={`text-sm font-medium truncate ${active ? 'text-emerald-700' : 'text-gray-700'}`}>
//                               {item.label}
//                             </span>
//                           )}
//                           {isOpen && item.badge && (
//                             <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
//                               {item.badge}
//                             </span>
//                           )}
//                         </Link>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </nav>

//         {/* Logout fixe en bas */}
//         <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4">
//           <button
//             onClick={onLogoutClick}
//             className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 border border-red-200"
//           >
//             <FiLogOut className="w-5 h-5 flex-shrink-0" />
//             {isOpen && (
//               <span className="text-sm font-medium">Déconnexion</span>
//             )}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminSidebar;



import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiPackage, FiDollarSign, 
  FiFileText, FiLogOut, FiMenu, FiX,
  FiUserPlus, FiList, FiSettings, FiBarChart,
  FiTrendingUp, FiMap, FiCalendar, FiAward,FiUser,
  FiActivity, FiBriefcase, FiHeart, FiShoppingCart
} from 'react-icons/fi';

const AdminSidebar = ({ isOpen, setIsOpen, onLogoutClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user') || '{}');
    setUser(userData);
  }, []);

  const menuItems = [
    // ... (votre menuItems reste identique)
    {
      title: 'Principal',
      items: [
        { path: '/admin', icon: FiHome, label: 'Tableau de bord', badge: null, description: 'Vue d\'ensemble' }
      ]
    },
    {
      title: 'Gestion des utilisateurs',
      items: [
        { path: '/admin/superviseurs', icon: FiUsers, label: 'Superviseurs', badge: null, description: 'Gérer les superviseurs' },
        { path: '/admin/superviseurs/nouveau', icon: FiUserPlus, label: 'Nouveau superviseur', badge: 'Nouveau', description: 'Ajouter un superviseur' },
        { path: '/admin/gestionnaires', icon: FiSettings, label: 'Gestionnaires', badge: null, description: 'Gérer les gestionnaires' },
        { path: '/admin/collecteurs', icon: FiPackage, label: 'Collecteurs', badge: null, description: 'Gérer les collecteurs' },
        { path: '/admin/producteurs', icon: FiTrendingUp, label: 'Producteurs', badge: null, description: 'Gérer les producteurs' },
        { path: '/admin/recycleurs', icon: FiActivity, label: 'Recycleurs', badge: null, description: 'Gérer les recycleurs' }
      ]
    },
    {
      title: 'Organisations',
      items: [
        { path: '/admin/ongs', icon: FiHeart, label: 'ONGs', badge: null, description: 'Organisations non gouvernementales' },
        { path: '/admin/ongs/nouveau', icon: FiUserPlus, label: 'Nouvelle ONG', badge: null, description: 'Ajouter une ONG' },
        { path: '/admin/sponsors', icon: FiDollarSign, label: 'Sponsors', badge: null, description: 'Gérer les sponsors' },
        { path: '/admin/sponsors/nouveau', icon: FiUserPlus, label: 'Nouveau sponsor', badge: null, description: 'Ajouter un sponsor' }
      ]
    },
    {
      title: 'Campagnes',
      items: [
        { path: '/admin/campagnes', icon: FiCalendar, label: 'Campagnes', badge: null, description: 'Gérer les campagnes' },
        { path: '/admin/campagnes/nouveau', icon: FiUserPlus, label: 'Nouvelle campagne', badge: null, description: 'Créer une campagne' }
      ]
    },
    {
      title: 'Système',
      items: [
        { path: '/admin/profil', icon: FiUser, label: 'Mon profil', badge: null, description: 'Gérer mon profil' },
        { path: '/admin/producteur-premium', icon: FiAward, label: 'Producteurs premium', badge: null, description: 'Abonnements premium' }
      ]
    }
  ];

  const isActive = (path) => {
    const currentPath = location.pathname;
    
    if (currentPath === path) return true;
    
    if (path.includes('/nouveau') && currentPath.includes('/nouveau')) {
      const basePath = path.replace('/nouveau', '');
      const currentBasePath = currentPath.replace(/\/nouveau.*/, '');
      return basePath === currentBasePath;
    }
    
    if (path.includes('/edit') && currentPath.includes('/edit')) {
      const basePath = path.replace(/\/:id\/edit$/, '');
      const currentBasePath = currentPath.replace(/\/\d+\/edit$/, '');
      return basePath === currentBasePath;
    }
    
    return false;
  };

  // Fonction pour fermer la sidebar sur mobile après un clic
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay - ne bloque plus les clics sur la sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          style={{ pointerEvents: 'auto' }}
        />
      )}

      {/* Sidebar - avec z-index plus élevé que l'overlay */}
      <div 
        className={`
          fixed lg:relative h-full bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? 'w-72' : 'w-20'}
          z-50
        `}
        style={{ 
          pointerEvents: isOpen ? 'auto' : 'none',
          top: 0,
          left: 0,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out, width 0.3s ease-in-out'
        }}
      >
        {/* Header avec dégradé emerald */}
        <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-emerald-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${!isOpen && 'justify-center w-full'}`}>
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <FiSettings className="w-5 h-5 text-emerald-600" />
              </div>
              {isOpen && (
                <div>
                  <h1 className="text-lg font-bold text-white">EcoCollect</h1>
                  <p className="text-xs text-emerald-100">Admin Panel</p>
                </div>
              )}
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white flex-shrink-0"
              title={isOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}
            >
              {isOpen ? <FiX className="w-4 h-4" /> : <FiMenu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* User info */}
        {isOpen && user && (
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.nomComplet?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AD'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate text-sm">{user.nomComplet || 'Admin'}</p>
                <p className="text-xs text-gray-500 truncate">{user.email || 'admin@ecocollect.com'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation scrollable - avec pointer-events auto */}
        <nav className="flex-1 overflow-y-auto" style={{ pointerEvents: 'auto' }}>
          <div className="p-4 space-y-1">
            {menuItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-5">
                {isOpen && (
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                    {section.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <li key={itemIndex}>
                        <Link
                          to={item.path}
                          onClick={handleLinkClick}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative
                            ${active 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                            }
                            ${!isOpen && 'justify-center'}
                          `}
                          title={!isOpen ? item.label : ''}
                          style={{ cursor: 'pointer' }}
                        >
                          <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-emerald-600' : 'text-gray-500'}`} />
                          {isOpen && (
                            <span className={`text-sm font-medium truncate ${active ? 'text-emerald-700' : 'text-gray-700'}`}>
                              {item.label}
                            </span>
                          )}
                          {isOpen && item.badge && (
                            <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Logout fixe en bas - avec pointer-events auto */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4" style={{ pointerEvents: 'auto' }}>
          <button
            onClick={onLogoutClick}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 border border-red-200"
            style={{ cursor: 'pointer' }}
          >
            <FiLogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && (
              <span className="text-sm font-medium">Déconnexion</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;