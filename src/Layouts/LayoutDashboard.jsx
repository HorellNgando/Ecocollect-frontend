// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { 
// //   FiMenu, FiX, FiHome, FiUsers, FiPackage, 
// //   FiTrendingUp, FiSettings, FiLogOut, FiUser,
// //   FiCalendar, FiDollarSign, FiMap, FiFileText
// // } from 'react-icons/fi';

// // const DashboardLayout = ({ children, title, user }) => {
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.removeItem('ecocollect_token');
// //     localStorage.removeItem('ecocollect_user');
// //     localStorage.removeItem('ecocollect_role');
// //     navigate('/login');
// //   };

// //   const getNavItems = () => {
// //     const role = user?.type;

// //     if (role === 'admin') {
// //       return [
// //         { path: '/admin', icon: FiHome, label: 'Dashboard' },
// //         { path: '/admin/superviseurs', icon: FiUsers, label: 'Superviseurs' },
// //         { path: '/admin/recycleurs', icon: FiPackage, label: 'Recycleurs' },
// //         { path: '/admin/producteurs-premium', icon: FiDollarSign, label: 'Producteurs Premium' },
// //         { path: '/admin/demandes', icon: FiFileText, label: 'Demandes' },
// //       ];
// //     }

// //     if (role === 'recycleur') {
// //       return [
// //         { path: '/recycleur', icon: FiHome, label: 'Dashboard' },
// //         { path: '/recycleur/stocks', icon: FiPackage, label: 'Stocks disponibles' },
// //         { path: '/recycleur/demandes', icon: FiTrendingUp, label: 'Mes demandes' },
// //         { path: '/recycleur/declarations', icon: FiFileText, label: 'Déclarations' },
// //       ];
// //     }

// //     if (role === 'sponsor') {
// //       return [
// //         { path: '/sponsor', icon: FiHome, label: 'Dashboard' },
// //         { path: '/sponsor/campagnes', icon: FiCalendar, label: 'Mes campagnes' },
// //         { path: '/sponsor/rapports', icon: FiFileText, label: 'Rapports' },
// //       ];
// //     }

// //     return [];
// //   };

// //   const navItems = getNavItems();

// //   const styles = `
// //     .dashboard {
// //       display: flex;
// //       min-height: 100vh;
// //       background: #f8faf8;
// //     }

// //     .sidebar {
// //       width: ${sidebarOpen ? '280px' : '80px'};
// //       background: white;
// //       border-right: 1px solid #d9e0d9;
// //       transition: width 0.3s ease;
// //       position: fixed;
// //       height: 100vh;
// //       z-index: 50;
// //       overflow-y: auto;
// //     }

// //     .sidebar-header {
// //       padding: 1.5rem;
// //       display: flex;
// //       align-items: center;
// //       justify-content: ${sidebarOpen ? 'space-between' : 'center'};
// //       border-bottom: 1px solid #d9e0d9;
// //     }

// //     .logo {
// //       font-size: 1.5rem;
// //       font-weight: 800;
// //       color: #1a1e1a;
// //       display: ${sidebarOpen ? 'block' : 'none'};
// //     }

// //     .logo span {
// //       color: #2d8a5e;
// //     }

// //     .toggle-btn {
// //       background: none;
// //       border: none;
// //       color: #5a655a;
// //       cursor: pointer;
// //       font-size: 1.2rem;
// //     }

// //     .user-info {
// //       padding: 1.5rem;
// //       border-bottom: 1px solid #d9e0d9;
// //       display: ${sidebarOpen ? 'block' : 'none'};
// //     }

// //     .user-name {
// //       font-weight: 600;
// //       color: #1a1e1a;
// //     }

// //     .user-role {
// //       font-size: 0.8rem;
// //       color: #2d8a5e;
// //       text-transform: capitalize;
// //     }

// //     .nav-items {
// //       padding: 1rem 0;
// //     }

// //     .nav-item {
// //       display: flex;
// //       align-items: center;
// //       padding: 0.8rem 1.5rem;
// //       color: #5a655a;
// //       text-decoration: none;
// //       transition: all 0.2s;
// //       margin: 0.2rem 0;
// //     }

// //     .nav-item:hover {
// //       background: #e8f3e8;
// //       color: #2d8a5e;
// //     }

// //     .nav-item.active {
// //       background: #2d8a5e;
// //       color: white;
// //     }

// //     .nav-icon {
// //       font-size: 1.2rem;
// //       min-width: 2rem;
// //     }

// //     .nav-label {
// //       display: ${sidebarOpen ? 'inline' : 'none'};
// //       margin-left: 0.5rem;
// //     }

// //     .main-content {
// //       flex: 1;
// //       margin-left: ${sidebarOpen ? '280px' : '80px'};
// //       transition: margin-left 0.3s ease;
// //       padding: 2rem;
// //     }

// //     .top-bar {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: center;
// //       margin-bottom: 2rem;
// //     }

// //     .page-title {
// //       font-size: 1.8rem;
// //       font-weight: 700;
// //       color: #1a1e1a;
// //     }

// //     .page-title span {
// //       color: #2d8a5e;
// //     }

// //     .logout-btn {
// //       background: none;
// //       border: 1px solid #d9e0d9;
// //       padding: 0.5rem 1rem;
// //       border-radius: 0.75rem;
// //       display: flex;
// //       align-items: center;
// //       gap: 0.5rem;
// //       color: #5a655a;
// //       cursor: pointer;
// //       transition: all 0.2s;
// //     }

// //     .logout-btn:hover {
// //       background: #dc2626;
// //       color: white;
// //       border-color: #dc2626;
// //     }

// //     @media (max-width: 768px) {
// //       .sidebar {
// //         transform: translateX(${sidebarOpen ? '0' : '-100%'});
// //         width: 280px;
// //       }
      
// //       .main-content {
// //         margin-left: 0;
// //       }
// //     }
// //   `;

// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="dashboard">
// //         {/* Sidebar */}
// //         <aside className="sidebar">
// //           <div className="sidebar-header">
// //             {sidebarOpen && (
// //               <div className="logo">
// //                 Eco<span>Collect</span>
// //               </div>
// //             )}
// //             <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
// //               {sidebarOpen ? <FiX /> : <FiMenu />}
// //             </button>
// //           </div>

// //           {sidebarOpen && user && (
// //             <div className="user-info">
// //               <div className="user-name">{user.nomComplet || user.nomEntreprise || user.nomOrganisation}</div>
// //               <div className="user-role">{user.type}</div>
// //             </div>
// //           )}

// //           <nav className="nav-items">
// //             {navItems.map((item) => (
// //               <Link
// //                 key={item.path}
// //                 to={item.path}
// //                 className={`nav-item ${window.location.pathname === item.path ? 'active' : ''}`}
// //               >
// //                 <item.icon className="nav-icon" />
// //                 <span className="nav-label">{item.label}</span>
// //               </Link>
// //             ))}
// //           </nav>
// //         </aside>

// //         {/* Main content */}
// //         <main className="main-content">
// //           <div className="top-bar">
// //             <h1 className="page-title">
// //               <span>/</span> {title}
// //             </h1>
// //             <button className="logout-btn" onClick={handleLogout}>
// //               <FiLogOut /> Déconnexion
// //             </button>
// //           </div>
// //           {children}
// //         </main>
// //       </div>
// //     </>
// //   );
// // };

// // export default DashboardLayout;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { 
//   FiMenu, FiX, FiHome, FiUsers, FiPackage, 
//   FiTrendingUp, FiSettings, FiLogOut, FiUser,
//   FiCalendar, FiDollarSign, FiMap, FiFileText,
//   FiUserPlus, FiList, FiBell , FiHeart , FiAward , FiBriefcase 
// } from 'react-icons/fi';

// const DashboardLayout = ({ children, title, user: propUser }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [user, setUser] = useState(propUser || null);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     // Récupérer l'utilisateur depuis localStorage si non fourni en props
//     if (!propUser) {
//       const storedUser = localStorage.getItem('ecocollect_user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     }
//   }, [propUser]);

//   const handleLogout = () => {
//     localStorage.removeItem('ecocollect_token');
//     localStorage.removeItem('ecocollect_user');
//     localStorage.removeItem('ecocollect_role');
//     navigate('/login');
//   };
// const getNavItems = () => {
//   const role = user?.type || localStorage.getItem('ecocollect_role');

//   if (role === 'admin') {
//     return [
//       { path: '/admin', icon: FiHome, label: 'Dashboard' },
//       { path: '/admin/superviseurs', icon: FiUsers, label: 'Superviseurs' },
//       { path: '/admin/superviseurs/nouveau', icon: FiUserPlus, label: 'Nouveau superviseur' },
//       { path: '/admin/recycleurs', icon: FiPackage, label: 'Recycleurs' },
//       { path: '/admin/recycleurs/nouveau', icon: FiUserPlus, label: 'Créer recycleur' },
//       { path: '/admin/producteurs', icon: FiUsers, label: 'Producteurs' },
//       { path: '/admin/collecteurs', icon: FiUsers, label: 'Collecteurs' },
//       { path: '/admin/gestionnaires', icon: FiBriefcase, label: 'Gestionnaires' },
//       { path: '/admin/sponsors', icon: FiDollarSign, label: 'Sponsors' },
//       { path: '/admin/sponsors/nouveau', icon: FiUserPlus, label: 'Nouveau sponsor' },
//       { path: '/admin/ongs', icon: FiHeart, label: 'ONG' },
//       { path: '/admin/ongs/nouveau', icon: FiUserPlus, label: 'Nouvelle ONG' },
//       { path: '/admin/campagnes', icon: FiTrendingUp, label: 'Campagnes' },
//       { path: '/admin/campagnes/nouveau', icon: FiUserPlus, label: 'Nouvelle campagne' },
//       { path: '/admin/producteurs-premium', icon: FiAward, label: 'Producteurs Premium' },
//       { path: '/admin/demandes', icon: FiFileText, label: 'Demandes' },
//       { path: '/admin/parametres', icon: FiSettings, label: 'Paramètres' }
//     ];
//   }

//     if (role === 'recycleur') {
//       return [
//         { path: '/recycleur', icon: FiHome, label: 'Dashboard' },
//         { path: '/recycleur/stocks', icon: FiPackage, label: 'Stocks disponibles' },
//         { path: '/recycleur/demandes', icon: FiTrendingUp, label: 'Mes demandes' },
//         { path: '/recycleur/declarations', icon: FiFileText, label: 'Déclarations' },
//         { path: '/recycleur/monStock', icon: FiMap, label: 'Mon stock' },  
//         { path: '/recycleur/Mesdeclarations', icon: FiPackage, label: 'Mes Declartions' },
//         { path: '/recycleur/parametres', icon: FiSettings, label: 'Paramètres' }
//       ];
//     }

//     if (role === 'superviseur') {
//       return [
//         { path: '/superviseur', icon: FiHome, label: 'Dashboard' },
//         { path: '/superviseur/producteurs', icon: FiUsers, label: 'Producteurs' },
//         { path: '/superviseur/collectes', icon: FiPackage, label: 'Collectes' },
//         { path: '/superviseur/tournees', icon: FiMap, label: 'Tournées' },
//         { path: '/superviseur/declarations', icon: FiFileText, label: 'Déclarations' },
//         { path: '/superviseur/parametres', icon: FiSettings, label: 'Paramètres' }
//       ];
//     }

//     if (role === 'producteur-premium') {
//       return [
//         { path: '/producteur-premium', icon: FiHome, label: 'Dashboard' },
//         { path: '/producteur-premium/collectes', icon: FiPackage, label: 'Mes collectes' },
//         { path: '/producteur-premium/paiements', icon: FiDollarSign, label: 'Paiements' },
//         { path: '/producteur-premium/contrats', icon: FiFileText, label: 'Contrats' },
//         { path: '/producteur-premium/parametres', icon: FiSettings, label: 'Paramètres' }
//       ];
//     }

//     if (role === 'sponsor') {
//       return [
//         { path: '/sponsor', icon: FiHome, label: 'Dashboard' },
//         { path: '/sponsor/campagnes', icon: FiCalendar, label: 'Mes campagnes' },
//         { path: '/sponsor/rapports', icon: FiFileText, label: 'Rapports' },
//         { path: '/sponsor/parametres', icon: FiSettings, label: 'Paramètres' }
//       ];
//     }

//     return [];
//   };

//   const navItems = getNavItems();

//   const styles = `
//     .dashboard {
//       display: flex;
//       min-height: 100vh;
//       background: #f8faf8;
//     }

//     .sidebar {
//       width: ${sidebarOpen ? '280px' : '80px'};
//       background: white;
//       border-right: 1px solid #d9e0d9;
//       transition: width 0.3s ease;
//       position: fixed;
//       height: 100vh;
//       z-index: 50;
//       overflow-y: auto;
//       box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
//     }

//     .sidebar-header {
//       padding: 1rem 1.5rem;
//       display: flex;
//       align-items: center;
//       justify-content: ${sidebarOpen ? 'space-between' : 'center'};
//       border-bottom: 1px solid #d9e0d9;
//     }

//     .logo {
//       font-size: 1.3rem;
//       font-weight: 800;
//       color: #1a1e1a;
//       display: ${sidebarOpen ? 'block' : 'none'};
//     }

//     .logo span {
//       color: #2d8a5e;
//     }

//     .toggle-btn {
//       background: none;
//       border: none;
//       color: #5a655a;
//       cursor: pointer;
//       font-size: 1.2rem;
//       padding: 0.5rem;
//       border-radius: 0.5rem;
//       transition: background 0.2s;
//     }

//     .toggle-btn:hover {
//       background: #e8f3e8;
//     }

//     .user-info {
//       padding: 0.8rem 1rem;
//       border-bottom: 1px solid #d9e0d9;
//       display: ${sidebarOpen ? 'flex' : 'none'};
//       align-items: center;
//       gap: 0.8rem;
//     }

//     .user-avatar {
//       width: 40px;
//       height: 40px;
//       background: #2d8a5e;
//       border-radius: 50%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: white;
//       font-weight: 600;
//       font-size: 1rem;
//       flex-shrink: 0;
//     }

//     .user-details {
//       flex: 1;
//       min-width: 0;
//     }

//     .user-name {
//       font-weight: 600;
//       color: #1a1e1a;
//       font-size: 0.9rem;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }

//     .user-role {
//       font-size: 0.7rem;
//       color: #2d8a5e;
//       text-transform: capitalize;
//       background: #e8f3e8;
//       display: inline-block;
//       padding: 0.15rem 0.5rem;
//       border-radius: 1rem;
//       white-space: nowrap;
//       max-width: 100%;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }

//     .nav-items {
//       padding: 0.5rem 0;
//     }

//     .nav-item {
//       display: flex;
//       align-items: center;
//       padding: 0.7rem 1.5rem;
//       color: #5a655a;
//       text-decoration: none;
//       transition: all 0.2s;
//       margin: 0.1rem 0;
//       position: relative;
//       white-space: nowrap;
//     }

//     .nav-item:hover {
//       background: #e8f3e8;
//       color: #2d8a5e;
//     }

//     .nav-item.active {
//       background: #2d8a5e;
//       color: white;
//     }

//     .nav-item.active::before {
//       content: '';
//       position: absolute;
//       left: 0;
//       top: 0;
//       height: 100%;
//       width: 4px;
//       background: #1e5a3e;
//     }

//     .nav-icon {
//       font-size: 1.1rem;
//       min-width: 2rem;
//     }

//     .nav-label {
//       display: ${sidebarOpen ? 'inline' : 'none'};
//       margin-left: 0.5rem;
//       font-size: 0.9rem;
//     }

//     .main-content {
//       flex: 1;
//       margin-left: ${sidebarOpen ? '280px' : '80px'};
//       transition: margin-left 0.3s ease;
//       padding: 2rem;
//     }

//     .top-bar {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 2rem;
//       background: white;
//       border-radius: 1rem;
//       padding: 1rem 2rem;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
//     }

//     .page-title {
//       font-size: 1.8rem;
//       font-weight: 700;
//       color: #1a1e1a;
//       margin: 0;
//     }

//     .page-title span {
//       color: #2d8a5e;
//     }

//     .top-bar-actions {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//     }

//     .notification-btn {
//       position: relative;
//       background: none;
//       border: none;
//       color: #5a655a;
//       font-size: 1.2rem;
//       cursor: pointer;
//       padding: 0.5rem;
//       border-radius: 0.5rem;
//       transition: background 0.2s;
//     }

//     .notification-btn:hover {
//       background: #f0f5f0;
//     }

//     .notification-badge {
//       position: absolute;
//       top: 0;
//       right: 0;
//       background: #dc2626;
//       color: white;
//       font-size: 0.7rem;
//       padding: 0.2rem 0.4rem;
//       border-radius: 1rem;
//       min-width: 1.2rem;
//     }

//     .logout-btn {
//       background: none;
//       border: 1px solid #d9e0d9;
//       padding: 0.5rem 1rem;
//       border-radius: 0.75rem;
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       color: #5a655a;
//       cursor: pointer;
//       transition: all 0.2s;
//       font-size: 0.95rem;
//     }

//     .logout-btn:hover {
//       background: #dc2626;
//       color: white;
//       border-color: #dc2626;
//     }

//     .content-wrapper {
//       background: white;
//       border-radius: 1rem;
//       padding: 2rem;
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
//     }

//     @media (max-width: 768px) {
//       .sidebar {
//         transform: translateX(${sidebarOpen ? '0' : '-100%'});
//         width: 280px;
//       }
      
//       .main-content {
//         margin-left: 0;
//         padding: 1rem;
//       }

//       .top-bar {
//         flex-direction: column;
//         gap: 1rem;
//         align-items: flex-start;
//         padding: 1rem;
//       }

//       .content-wrapper {
//         padding: 1rem;
//       }
//     }
//   `;

//   const getInitials = () => {
//     if (!user) return 'U';
//     if (user.nomComplet) {
//       return user.nomComplet.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//     }
//     if (user.nomEntreprise) {
//       return user.nomEntreprise.slice(0, 2).toUpperCase();
//     }
//     if (user.nomOrganisation) {
//       return user.nomOrganisation.slice(0, 2).toUpperCase();
//     }
//     return 'U';
//   };

//   const getDisplayName = () => {
//     if (!user) return 'Utilisateur';
//     return user.nomComplet || user.nomEntreprise || user.nomOrganisation || 'Utilisateur';
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="dashboard">
//         {/* Sidebar */}
//         <aside className="sidebar">
//           <div className="sidebar-header">
//             {sidebarOpen && (
//               <div className="logo">
//                 Eco<span>Collect</span>
//               </div>
//             )}
//             <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
//               {sidebarOpen ? <FiX /> : <FiMenu />}
//             </button>
//           </div>

//           {sidebarOpen && user && (
//             <div className="user-info">
//               <div className="user-avatar">
//                 {getInitials()}
//               </div>
//               <div className="user-details">
//                 <div className="user-name">{getDisplayName()}</div>
//                 <div className="user-role">{user.type || 'Utilisateur'}</div>
//               </div>
//             </div>
//           )}

//           <nav className="nav-items">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.path || 
//                               (item.path !== '/admin' && location.pathname.startsWith(item.path));
              
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`nav-item ${isActive ? 'active' : ''}`}
//                 >
//                   <item.icon className="nav-icon" />
//                   <span className="nav-label">{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>
//         </aside>

//         {/* Main content */}
//         <main className="main-content">
//           <div className="top-bar">
//             <h1 className="page-title">
//               <span>/</span> {title}
//             </h1>
//             <div className="top-bar-actions">
//               <button 
//                 className="notification-btn"
//                 onClick={() => setShowNotifications(!showNotifications)}
//               >
//                 <FiBell />
//                 <span className="notification-badge">3</span>
//               </button>

//               <button className="logout-btn" onClick={handleLogout}>
//                 <FiLogOut /> Déconnexion
//               </button>
//             </div>
//           </div>
          
//           <div className="content-wrapper">
//             {children}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiMenu, FiX, FiHome, FiUsers, FiPackage, 
  FiTrendingUp, FiSettings, FiLogOut, FiUser,
  FiCalendar, FiDollarSign, FiMap, FiFileText,
  FiUserPlus, FiList, FiBell , FiHeart , FiAward , FiBriefcase 
} from 'react-icons/fi';

const styleId = '_dashboard-layout-styles';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const el = document.createElement('style');
  el.id = styleId;
  el.textContent = `
    .dashboard { display: flex; min-height: 100vh; ... }
    .sidebar { ... }
    /* tout votre CSS exactement comme avant */
  `;
  document.head.appendChild(el);
}


const DashboardLayout = ({ children, title, user: propUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(propUser || null);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    if (!propUser) {
      const storedUser = localStorage.getItem('ecocollect_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    // Fermer la sidebar sur mobile au redimensionnement
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Vérifier au montage

    return () => window.removeEventListener('resize', handleResize);
  }, [propUser]);

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('ecocollect_token');
      localStorage.removeItem('ecocollect_user');
      localStorage.removeItem('ecocollect_role');
      navigate('/');
    }
  };

  const getNavItems = () => {
    const role = user?.type || localStorage.getItem('ecocollect_role');

    if (role === 'admin') {
      return [
        { path: '/admin', icon: FiHome, label: 'Dashboard' },
        { path: '/admin/superviseurs', icon: FiUsers, label: 'Superviseurs' },
        { path: '/admin/superviseurs/nouveau', icon: FiUserPlus, label: 'Nouveau superviseur' },
        { path: '/admin/recycleurs', icon: FiPackage, label: 'Recycleurs' },
        { path: '/admin/recycleurs/nouveau', icon: FiUserPlus, label: 'Créer recycleur' },
        { path: '/admin/producteurs', icon: FiUsers, label: 'Producteurs' },
        { path: '/admin/collecteurs', icon: FiUsers, label: 'Collecteurs' },
        { path: '/admin/gestionnaires', icon: FiBriefcase, label: 'Gestionnaires' },
        { path: '/admin/sponsors', icon: FiDollarSign, label: 'Sponsors' },
        { path: '/admin/sponsors/nouveau', icon: FiUserPlus, label: 'Nouveau sponsor' },
        { path: '/admin/ongs', icon: FiHeart, label: 'ONG' },
        { path: '/admin/ongs/nouveau', icon: FiUserPlus, label: 'Nouvelle ONG' },
        { path: '/admin/campagnes', icon: FiTrendingUp, label: 'Campagnes' },
        { path: '/admin/campagnes/nouveau', icon: FiUserPlus, label: 'Nouvelle campagne' },
        { path: '/admin/producteurs-premium', icon: FiAward, label: 'Producteurs Premium' },
        { path: '/admin/demandes', icon: FiFileText, label: 'Demandes' },
        { path: '/admin/parametres', icon: FiSettings, label: 'Paramètres' }
      ];
    }

    if (role === 'recycleur') {
      return [
        { 
          path: '/recycleur', 
          icon: FiHome, 
          label: 'Tableau de bord',
          badge: null,
          description: 'Vue d\'ensemble'
        },
        { 
          path: '/recycleur/stocks', 
          icon: FiPackage, 
          label: 'Stocks disponibles',
          badge: 'new',
          description: 'Consulter les stocks'
        },
        { 
          path: '/recycleur/demandes', 
          icon: FiTrendingUp, 
          label: 'Mes demandes',
          badge: '3',
          description: 'Gérer mes demandes'
        },
        { 
          path: '/recycleur/demandes/nouvelle', 
          icon: FiList, 
          label: 'Nouvelle demande',
          badge: null,
          description: 'Créer une demande'
        },
        { 
          path: '/recycleur/monStock', 
          icon: FiMap, 
          label: 'Mon stock',
          badge: null,
          description: 'Mon personnel'
        },
        { 
          path: '/recycleur/declarations', 
          icon: FiFileText, 
          label: 'Déclarations',
          badge: '2',
          description: 'Déclarer recyclage'
        },
        { 
          path: '/recycleur/Mesdeclarations', 
          icon: FiPackage, 
          label: 'Mes déclarations',
          badge: null,
          description: 'Historique'
        }
      ];
    }

    if (role === 'superviseur') {
      return [
        { path: '/superviseur', icon: FiHome, label: 'Dashboard' },
        { path: '/superviseur/producteurs', icon: FiUsers, label: 'Producteurs' },
        { path: '/superviseur/collectes', icon: FiPackage, label: 'Collectes' },
        { path: '/superviseur/tournees', icon: FiMap, label: 'Tournées' },
        { path: '/superviseur/declarations', icon: FiFileText, label: 'Déclarations' },
        { path: '/superviseur/parametres', icon: FiSettings, label: 'Paramètres' }
      ];
    }

    if (role === 'producteur-premium') {
      return [
        { path: '/producteur-premium', icon: FiHome, label: 'Dashboard' },
        { path: '/producteur-premium/collectes', icon: FiPackage, label: 'Mes collectes' },
        { path: '/producteur-premium/paiements', icon: FiDollarSign, label: 'Paiements' },
        { path: '/producteur-premium/contrats', icon: FiFileText, label: 'Contrats' },
        { path: '/producteur-premium/parametres', icon: FiSettings, label: 'Paramètres' }
      ];
    }

    if (role === 'sponsor') {
      return [
        { path: '/sponsor', icon: FiHome, label: 'Dashboard' },
        { path: '/sponsor/campagnes', icon: FiCalendar, label: 'Mes campagnes' },
        { path: '/sponsor/rapports', icon: FiFileText, label: 'Rapports' },
        { path: '/sponsor/parametres', icon: FiSettings, label: 'Paramètres' }
      ];
    }

    return [];
  };

  const navItems = getNavItems();

  const styles = `
    .dashboard {
      display: flex;
      min-height: 100vh;
      background: #f8faf8;
    }

    .sidebar {
      width: ${sidebarOpen ? '280px' : '80px'};
      background: linear-gradient(135deg, #ffffff 0%, #f8faf8 100%);
      border-right: 1px solid #e2e8e8;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: fixed;
      height: 100vh;
      z-index: 50;
      overflow-y: auto;
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(10px);
    }

    .sidebar-header {
      padding: 1.2rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: ${sidebarOpen ? 'space-between' : 'center'};
      border-bottom: 1px solid #e2e8e8;
      background: linear-gradient(135deg, #2d8a5e 0%, #1e5a3e 100%);
      position: relative;
      overflow: hidden;
    }

    .sidebar-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
      animation: shimmer 3s infinite;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .logo {
      font-size: 1.4rem;
      font-weight: 900;
      color: #ffffff;
      display: ${sidebarOpen ? 'block' : 'none'};
      position: relative;
      z-index: 1;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .logo span {
      color: #4ade80;
      font-weight: 900;
    }

    .toggle-btn {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0.6rem;
      border-radius: 0.8rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      z-index: 1;
      backdrop-filter: blur(10px);
    }

    .toggle-btn:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .user-info {
      padding: 1.2rem 1rem;
      border-bottom: 1px solid #e2e8e8;
      display: ${sidebarOpen ? 'flex' : 'none'};
      align-items: center;
      gap: 1rem;
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      position: relative;
    }

    .user-avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #2d8a5e 0%, #4ade80 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 1.1rem;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(45, 138, 94, 0.3);
      border: 3px solid #ffffff;
      position: relative;
    }

    .user-avatar::after {
      content: '';
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      background: #4ade80;
      border: 2px solid #ffffff;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.1); }
    }

    .user-details {
      flex: 1;
      min-width: 0;
    }

    .user-name {
      font-weight: 700;
      color: #1a1e1a;
      font-size: 0.95rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0.2rem;
    }

    .user-role {
      font-size: 0.75rem;
      color: #2d8a5e;
      text-transform: capitalize;
      background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
      display: inline-flex;
      align-items: center;
      padding: 0.3rem 0.8rem;
      border-radius: 2rem;
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
      border: 1px solid #bbf7d0;
    }

    .nav-section {
      padding: 1rem 0;
      border-bottom: 1px solid #f1f5f1;
    }

    .nav-section-title {
      font-size: 0.7rem;
      font-weight: 700;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0 1.5rem;
      margin-bottom: 0.5rem;
      display: ${sidebarOpen ? 'block' : 'none'};
    }

    .nav-items {
      padding: 0.5rem 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.8rem 1.5rem;
      color: #4b5563;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      margin: 0.2rem 0.5rem;
      position: relative;
      white-space: nowrap;
      border-radius: 0.8rem;
      overflow: hidden;
    }

    .nav-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(45, 138, 94, 0.1), transparent);
      transition: left 0.5s;
    }

    .nav-item:hover::before {
      left: 100%;
    }

    .nav-item:hover {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      color: #2d8a5e;
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(45, 138, 94, 0.15);
    }

    .nav-item.active {
      background: linear-gradient(135deg, #2d8a5e 0%, #1e5a3e 100%);
      color: white;
      transform: translateX(4px);
      box-shadow: 0 6px 20px rgba(45, 138, 94, 0.3);
    }

    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
      border-radius: 0 4px 4px 0;
    }

    .nav-icon {
      font-size: 1.2rem;
      min-width: 2.2rem;
      z-index: 1;
      position: relative;
    }

    .nav-label {
      display: ${sidebarOpen ? 'inline' : 'none'};
      margin-left: 0.8rem;
      font-size: 0.9rem;
      font-weight: 500;
      flex: 1;
      z-index: 1;
      position: relative;
    }

    .nav-description {
      display: ${sidebarOpen ? 'block' : 'none'};
      font-size: 0.7rem;
      color: #9ca3af;
      margin-top: 0.2rem;
      opacity: 0.8;
    }

    .nav-badge {
      position: absolute;
      top: 0.5rem;
      right: 1rem;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
      font-size: 0.65rem;
      padding: 0.2rem 0.5rem;
      border-radius: 1rem;
      font-weight: 700;
      min-width: 1.5rem;
      text-align: center;
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
      animation: badgePulse 2s infinite;
      z-index: 2;
    }

    .nav-badge.new {
      background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
      box-shadow: 0 2px 8px rgba(74, 222, 128, 0.4);
    }

    @keyframes badgePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .nav-item.active .nav-badge {
      background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
      color: #2d8a5e;
    }

    .main-content {
      flex: 1;
      margin-left: ${sidebarOpen ? '280px' : '80px'};
      transition: margin-left 0.3s ease;
      padding: 2rem;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      background: white;
      border-radius: 1rem;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    }

    .page-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1a1e1a;
      margin: 0;
    }

    .page-title span {
      color: #2d8a5e;
    }

    .top-bar-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .notification-btn {
      position: relative;
      background: none;
      border: none;
      color: #5a655a;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: background 0.2s;
    }

    .notification-btn:hover {
      background: #f0f5f0;
    }

    .notification-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #dc2626;
      color: white;
      font-size: 0.7rem;
      padding: 0.2rem 0.4rem;
      border-radius: 1rem;
      min-width: 1.2rem;
    }

    .logout-btn {
      background: linear-gradient(135deg, #ffffff 0%, #f8faf8 100%);
      border: 2px solid #e2e8e8;
      padding: 0.6rem 1.2rem;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 0.9rem;
      font-weight: 600;
      position: relative;
      overflow: hidden;
    }

    .logout-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.1), transparent);
      transition: left 0.5s;
    }

    .logout-btn:hover::before {
      left: 100%;
    }

    .logout-btn:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: white;
      border-color: #dc2626;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
    }

    .logout-btn:active {
      transform: translateY(0);
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
    }

    .content-wrapper {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
      min-height: calc(100vh - 8rem);
    }

    @media (max-width: 1024px) {
      .content-wrapper {
        padding: 1.5rem;
      }
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: #5a655a;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: background 0.2s;
    }

    .mobile-menu-btn:hover {
      background: #f0f5f0;
    }

    .mobile-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 40;
    }

    @media (max-width: 768px) {
      .mobile-overlay {
        display: block;
      }

      .sidebar {
        transform: translateX(${sidebarOpen ? '0' : '-100%'});
        width: 280px;
      }
      
      .main-content {
        margin-left: 0;
        padding: 0.5rem;
      }

      .mobile-menu-btn {
        display: block;
      }

      .top-bar {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1rem;
        gap: 1rem;
        flex-wrap: nowrap;
      }

      .page-title {
        font-size: 1.2rem;
        flex: 1;
        text-align: center;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .top-bar-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
      }

      .notification-btn {
        font-size: 1rem;
        padding: 0.4rem;
      }

      .logout-btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
      }

      .logout-btn span {
        display: none;
      }

      .content-wrapper {
        padding: 1rem;
        min-height: calc(100vh - 6rem);
      }
    }

    @media (max-width: 480px) {
      .top-bar {
        padding: 0.5rem;
      }

      .page-title {
        font-size: 1rem;
      }

      .notification-btn {
        font-size: 0.9rem;
        padding: 0.3rem;
      }

      .logout-btn {
        padding: 0.3rem 0.6rem;
        font-size: 0.7rem;
      }

      .content-wrapper {
        padding: 0.75rem;
      }
    }
  `;

  const getInitials = () => {
    if (!user) return 'U';
    if (user.nomComplet) {
      return user.nomComplet.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user.nomEntreprise) {
      return user.nomEntreprise.slice(0, 2).toUpperCase();
    }
    if (user.nomOrganisation) {
      return user.nomOrganisation.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = () => {
    if (!user) return 'Utilisateur';
    return user.nomComplet || user.nomEntreprise || user.nomOrganisation || 'Utilisateur';
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">
        {/* Overlay pour mobile */}
        {sidebarOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            {sidebarOpen && (
              <div className="logo">
                Eco<span>Collect</span>
              </div>
            )}
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {sidebarOpen && user && (
            <div className="user-info">
              <div className="user-avatar">
                {getInitials()}
              </div>
              <div className="user-details">
                <div className="user-name">{getDisplayName()}</div>
                <div className="user-role">{user.type || 'Utilisateur'}</div>
              </div>
            </div>
          )}

          <nav className="nav-items">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path !== '/admin' && 
                               item.path !== '/recycleur' && 
                               location.pathname.startsWith(item.path + '/')) ||
                              (item.path === '/recycleur' && location.pathname === '/recycleur');
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
          
                    if (window.innerWidth <= 768) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <item.icon className="nav-icon" />
                  <div className="nav-label">
                    <div>{item.label}</div>
                    {sidebarOpen && item.description && (
                      <div className="nav-description">{item.description}</div>
                    )}
                  </div>
                  {sidebarOpen && item.badge && (
                    <span className={`nav-badge ${item.badge === 'new' ? 'new' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <div className="top-bar">
            {/* Bouton burger pour mobile */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu />
            </button>
            
            <h1 className="page-title">
              <span>/</span> {title}
            </h1>
            <div className="top-bar-actions">
              <button 
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FiBell />
                <span className="notification-badge">3</span>
              </button>

              <button className="logout-btn" onClick={handleLogout}>
                <FiLogOut /> <span>Déconnexion</span>
              </button>
            </div>
          </div>
          
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
