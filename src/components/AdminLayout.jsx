// // import React, { useState, useEffect } from 'react';
// // import { FiMenu } from 'react-icons/fi';
// // import AdminSidebar from './AdminSidebar';

// // const AdminLayout = ({ children, title }) => {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);

// //   useEffect(() => {
// //     const checkMobile = () => {
// //       const mobile = window.innerWidth < 1024;
// //       setIsMobile(mobile);
// //       setSidebarOpen(!mobile); // Open on desktop, closed on mobile
// //     };

// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);
// //     return () => window.removeEventListener('resize', checkMobile);
// //   }, []);

// //   return (
// //     <div className="h-screen bg-gray-50 flex overflow-hidden">
// //       {/* Sidebar fixe - desktop visible, mobile caché par défaut */}
// //       <div className={`fixed lg:relative lg:flex lg:flex-shrink-0 z-40 transition-transform duration-300 ease-in-out ${
// //         sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
// //       }`}>
// //         <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
// //       </div>
      
// //       {/* Main content scrollable */}
// //       <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
// //         {/* Header fixe */}
// //         <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0 z-30">
// //           <div className="px-6 py-4">
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-4">
// //                 {/* Desktop menu button - caché sur mobile */}
// //                 <button
// //                   onClick={() => setSidebarOpen(!sidebarOpen)}
// //                   className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
// //                   title={sidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}
// //                 >
// //                   <FiMenu className="w-5 h-5" />
// //                 </button>
// //                 <div>
// //                   <h1 className="text-2xl font-bold text-gray-900">{title || 'Administration'}</h1>
// //                   <p className="text-sm text-gray-500 mt-1">Panneau d'administration EcoCollect</p>
// //                 </div>
// //               </div>
              
// //               {/* Mobile menu button - visible uniquement sur mobile */}
// //               <button
// //                 onClick={() => setSidebarOpen(!sidebarOpen)}
// //                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
// //                 title={sidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}
// //               >
// //                 <FiMenu className="w-6 h-6" />
// //               </button>
// //             </div>
// //           </div>
// //         </header>

// //         {/* Page content scrollable */}
// //         <main className="flex-1 overflow-y-auto p-6">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminLayout;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiMenu, FiLogOut } from 'react-icons/fi';
// import AdminSidebar from './AdminSidebar';

// const AdminLayout = ({ children, title }) => {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);
//       setSidebarOpen(!mobile);
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const handleLogout = () => {
//     setShowLogoutModal(false);
//     localStorage.removeItem('ecocollect_token');
//     localStorage.removeItem('ecocollect_user');
//     localStorage.removeItem('ecocollect_role');
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   const LogoutModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
//       <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
//         <div className="p-6">
//           <div className="text-center">
//             <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiLogOut className="h-10 w-10 text-red-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Déconnexion</h3>
//             <p className="text-gray-600 mb-6">
//               Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre compte administrateur.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowLogoutModal(false)}
//                 className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
//               >
//                 Annuler
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2"
//               >
//                 <FiLogOut className="h-4 w-4" />
//                 Se déconnecter
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div className="h-screen bg-gray-50 flex overflow-hidden">
//         {/* Sidebar fixe */}
//         <div className={`fixed lg:relative lg:flex lg:flex-shrink-0 z-40 transition-transform duration-300 ease-in-out ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//         }`}>
//           <AdminSidebar 
//             isOpen={sidebarOpen} 
//             setIsOpen={setSidebarOpen} 
//             onLogoutClick={() => setShowLogoutModal(true)}
//           />
//         </div>
        
//         {/* Main content scrollable */}
//         <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
//           {/* Header fixe */}
//           <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0 z-30">
//             <div className="px-6 py-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() => setSidebarOpen(!sidebarOpen)}
//                     className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                     title={sidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}
//                   >
//                     <FiMenu className="w-5 h-5" />
//                   </button>
//                   <div>
//                     <h1 className="text-2xl font-bold text-gray-900">{title || 'Administration'}</h1>
//                     <p className="text-sm text-gray-500 mt-1">Panneau d'administration EcoCollect</p>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={() => setSidebarOpen(!sidebarOpen)}
//                   className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                   title={sidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}
//                 >
//                   <FiMenu className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>
//           </header>

//           {/* Page content scrollable */}
//           <main className="flex-1 overflow-y-auto p-6">
//             {children}
//           </main>
//         </div>
//       </div>

//       {/* Modal de déconnexion - placé en dehors de la sidebar */}
//       {showLogoutModal && <LogoutModal />}
//     </>
//   );
// };

// export default AdminLayout;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Sur mobile, la sidebar est fermée par défaut
      // Sur desktop, elle est ouverte par défaut
      setSidebarOpen(!mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem('ecocollect_token');
    localStorage.removeItem('ecocollect_user');
    localStorage.removeItem('ecocollect_role');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const LogoutModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLogOut className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Déconnexion</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre compte administrateur.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <FiLogOut className="h-4 w-4" />
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Sidebar - maintenant gérée entièrement par AdminSidebar */}
        <AdminSidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          onLogoutClick={() => setShowLogoutModal(true)}
        />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Header fixe */}
          <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0 z-30">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title={sidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}
                  >
                    <FiMenu className="w-6 h-6" />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title || 'Administration'}</h1>
                    <p className="text-sm text-gray-500 mt-1">Panneau d'administration EcoCollect</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page content scrollable */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Modal de déconnexion */}
      {showLogoutModal && <LogoutModal />}
    </>
  );
};

export default AdminLayout;