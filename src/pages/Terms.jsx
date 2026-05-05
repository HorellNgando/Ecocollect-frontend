// import React, { useState, useEffect, useCallback } from 'react';
// import logo from '../assets/logo.jpeg';

// // ============================================================
// // CONSTANTES & UTILITAIRES
// // ============================================================

// const API_URL = 'https://ecocollect.cm';

// const STORAGE_KEYS = {
//   TOKEN: 'ecocollect_token',
//   USER: 'ecocollect_user',
//   ROLE: 'ecocollect_role',
//   REMEMBER: 'ecocollect_remember'
// };

// const ROLE_CONFIG = {
//   admin: {
//     page: '/admin',
//     url: `${API_URL}/api/auth/connexion`,  // Utilise le endpoint unifié
//     userField: 'utilisateur',
//     roleType: 'admin',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   superviseur: {
//     page: '/superviseur',
//     url: `${API_URL}/api/auth/connexion`,  // Utilise le endpoint unifié
//     userField: 'utilisateur',
//     roleType: 'superviseur',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   gestionnaire: {
//     page: '/gestionnaire',
//     url: `${API_URL}/api/auth/connexion`,  // Utilise le endpoint unifié
//     userField: 'utilisateur',
//     roleType: 'gestionnaire',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   collecteur: {
//     page: '/collecteur',
//     url: `${API_URL}/api/auth/connexion`,  // Utilise le endpoint unifié
//     userField: 'utilisateur',
//     roleType: 'collecteur',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   producteur: {
//     page: '/producteur',
//     url: `${API_URL}/api/auth/connexion`,
//     userField: 'utilisateur',
//     roleType: 'producteur',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   recycleur: {
//     page: '/recycleur',
//     url: `${API_URL}/api/auth/connexion`,
//     userField: 'utilisateur',
//     roleType: 'recycleur',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   sponsor: {
//     page: '/sponsor',
//     url: `${API_URL}/api/auth/connexion`,
//     userField: 'utilisateur',
//     roleType: 'sponsor',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   ong: {
//     page: '/ong',
//     url: `${API_URL}/api/auth/connexion`,
//     userField: 'utilisateur',
//     roleType: 'ong',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   }
// };

// const ROLE_PRIORITY = ['admin', 'superviseur', 'gestionnaire', 'collecteur', 'recycleur', 'sponsor', 'ong', 'producteur'];

// // Validation d'email
// const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// // ============================================================
// // COMPOSANT PRINCIPAL
// // ============================================================

// const Login = () => {
//   // États du formulaire
//   const [formData, setFormData] = useState({
//     identifiant: '',
//     motDePasse: '',
//     rememberMe: false
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [debugInfo, setDebugInfo] = useState(null); // Pour le débogage

//   // Effet de redirection si déjà connecté
//   useEffect(() => {
//     const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
//     const role = localStorage.getItem(STORAGE_KEYS.ROLE);
    
//     console.log('🔍 Vérification session existante:', { token: !!token, role });
    
//     if (token && role && ROLE_CONFIG[role]) {
//       console.log(`✅ Redirection vers ${ROLE_CONFIG[role].page}`);
//       window.location.href = ROLE_CONFIG[role].page;
//     }
//   }, []);

//   // Effet pour effacer les messages après un délai
//   useEffect(() => {
//     if (message.text) {
//       const timer = setTimeout(() => {
//         setMessage({ type: '', text: '' });
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   // ============================================================
//   // GESTIONNAIRES D'ÉVÉNEMENTS
//   // ============================================================

//   const handleInputChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Effacer l'erreur du champ modifié
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
    
//     // Effacer le message d'erreur général
//     if (message.text) {
//       setMessage({ type: '', text: '' });
//     }
//   }, [errors, message]);

//   // Validation du formulaire
//   const validateForm = useCallback(() => {
//     const newErrors = {};

//     if (!formData.identifiant.trim()) {
//       newErrors.identifiant = 'L\'email ou le téléphone est requis';
//     } else if (formData.identifiant.includes('@') && !isValidEmail(formData.identifiant)) {
//       newErrors.identifiant = 'L\'email n\'est pas valide';
//     }

//     if (!formData.motDePasse) {
//       newErrors.motDePasse = 'Le mot de passe est requis';
//     } else if (formData.motDePasse.length < 6) {
//       newErrors.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData]);

//   // Sauvegarde des données d'authentification
//   const saveAuthData = useCallback((token, user, role) => {
//     try {
//       console.log('💾 Sauvegarde des données d\'auth:', { role, userEmail: user?.email });
      
//       localStorage.setItem(STORAGE_KEYS.TOKEN, token);
//       localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
//       localStorage.setItem(STORAGE_KEYS.ROLE, role);
      
//       if (formData.rememberMe) {
//         localStorage.setItem(STORAGE_KEYS.REMEMBER, 'true');
//       } else {
//         localStorage.removeItem(STORAGE_KEYS.REMEMBER);
//       }
      
//       console.log('✅ Données sauvegardées avec succès');
//       return true;
//     } catch (error) {
//       console.error('❌ Erreur lors de la sauvegarde:', error);
//       return false;
//     }
//   }, [formData.rememberMe]);

//   // Extraction des données d'authentification - Version améliorée
//   const extractAuthData = useCallback((data, role) => {
//     console.log(`📦 Extraction des données pour le rôle ${role}:`, data);
    
//     let token = null;
//     let user = null;

//     // Recherche du token - Support multiple formats
//     if (data.token) token = data.token;
//     else if (data.accessToken) token = data.accessToken;
//     else if (data.access_token) token = data.access_token;
//     else if (data.jwt) token = data.jwt;
//     else if (data.data?.token) token = data.data.token;

//     // Recherche de l'utilisateur
//     if (data.utilisateur) {
//       user = data.utilisateur;
//       console.log('✅ Utilisateur trouvé dans data.utilisateur');
//     } else if (data.user) {
//       user = data.user;
//       console.log('✅ Utilisateur trouvé dans data.user');
//     } else if (data.data?.utilisateur) {
//       user = data.data.utilisateur;
//       console.log('✅ Utilisateur trouvé dans data.data.utilisateur');
//     } else if (data[role]) {
//       user = data[role];
//       console.log(`✅ Utilisateur trouvé dans data.${role}`);
//     } else if (typeof data === 'object' && data.id && data.email) {
//       user = data;
//       console.log('✅ Utilisateur trouvé directement dans data');
//     }

//     // Log des résultats
//     console.log(`📋 Résultat extraction: token=${!!token}, user=${!!user}`);
//     if (user) {
//       console.log(`   - User ID: ${user.id}`);
//       console.log(`   - User Email: ${user.email}`);
//       console.log(`   - User Type: ${user.type || role}`);
//     }

//     return { token, user };
//   }, []);

//   // Fonction de connexion unique - Version améliorée
//   const attemptLogin = useCallback(async (identifiant, motDePasse) => {
//     console.log('\n' + '='.repeat(60));
//     console.log('🔐 TENTATIVE DE CONNEXION');
//     console.log(`📧 Identifiant: ${identifiant}`);
//     console.log(`🔑 Mot de passe: ${'*'.repeat(motDePasse.length)}`);
//     console.log('='.repeat(60));
    
//     const startTime = Date.now();
    
//     try {
//       // Utiliser le endpoint unifié
//       const url = `${API_URL}/api/auth/connexion`;
//       console.log(`🌐 URL: ${url}`);
      
//       const requestBody = { identifiant, motDePasse };
//       console.log(`📤 Body:`, requestBody);
      
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
//       });
      
//       const elapsed = Date.now() - startTime;
//       console.log(`⏱️ Réponse reçue en ${elapsed}ms`);
//       console.log(`📊 Status: ${response.status} ${response.statusText}`);
      
//       // Lire la réponse
//       let data;
//       const responseText = await response.text();
//       console.log(`📄 Réponse brute: ${responseText.substring(0, 500)}`);
      
//       try {
//         data = JSON.parse(responseText);
//       } catch (e) {
//         console.error('❌ Erreur parsing JSON:', e);
//         throw new Error('Réponse invalide du serveur');
//       }
      
//       if (response.ok) {
//         console.log('✅ Connexion réussie!');
//         console.log('📦 Données reçues:', data);
        
//         const { token, user } = extractAuthData(data, data.utilisateur?.type || 'unknown');
        
//         if (token && user) {
//           console.log(`✅ Token extrait: ${token.substring(0, 20)}...`);
//           console.log(`✅ Utilisateur extrait:`, user);
          
//           // Déterminer le rôle
//           const role = user.type || user.role || (data.utilisateur?.type) || 'producteur';
//           console.log(`🎭 Rôle détecté: ${role}`);
          
//           if (saveAuthData(token, user, role)) {
//             return { success: true, role, user, token };
//           } else {
//             throw new Error('Erreur lors de la sauvegarde des données');
//           }
//         } else {
//           console.error('❌ Token ou utilisateur manquant dans la réponse');
//           console.error('   - Token trouvé:', !!token);
//           console.error('   - Utilisateur trouvé:', !!user);
//           throw new Error('Données d\'authentification incomplètes');
//         }
//       } else {
//         console.error(`❌ Erreur serveur: ${response.status}`);
//         console.error('   Message:', data.message || 'Pas de message');
//         throw new Error(data.message || 'Erreur de connexion');
//       }
      
//     } catch (error) {
//       console.error('❌ Exception lors de la connexion:', error);
//       throw error;
//     }
//   }, [extractAuthData, saveAuthData]);

//   // Soumission du formulaire - Version simplifiée et corrigée
//   const handleSubmit = useCallback(async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       console.log('❌ Validation du formulaire échouée');
//       return;
//     }

//     setIsLoading(true);
//     setMessage({ type: 'info', text: 'Connexion en cours...' });
//     setDebugInfo(null);

//     try {
//       console.log('\n🚀 Début de la tentative de connexion...');
      
//       const result = await attemptLogin(formData.identifiant, formData.motDePasse);
      
//       if (result.success) {
//         const config = ROLE_CONFIG[result.role] || ROLE_CONFIG.producteur;
        
//         setMessage({ 
//           type: 'success', 
//           text: `Connexion réussie ! Bienvenue ${result.user.nomComplet || result.user.email} !` 
//         });
        
//         console.log(`✅ Connexion réussie pour ${result.user.email} (${result.role})`);
//         console.log(`🔄 Redirection vers ${config.page} dans 1.5 secondes...`);
        
//         setTimeout(() => {
//           window.location.href = config.page;
//         }, 1500);
//       }
      
//     } catch (error) {
//       console.error('❌ Erreur de connexion:', error);
      
//       setDebugInfo({
//         error: error.message,
//         identifiant: formData.identifiant,
//         timestamp: new Date().toISOString()
//       });
      
//       setMessage({ 
//         type: 'error', 
//         text: error.message || 'Identifiants incorrects ou compte non trouvé. Vérifiez vos informations.' 
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [formData, validateForm, attemptLogin]);

//   // ============================================================
//   // RENDU
//   // ============================================================

//   const renderMessage = () => {
//     if (!message.text) return null;
    
//     const icons = {
//       success: 'fa-check-circle',
//       error: 'fa-exclamation-circle',
//       info: 'fa-info-circle'
//     };
    
//     return (
//       <div className={`message ${message.type}`}>
//         <i className={`fas ${icons[message.type] || 'fa-info-circle'}`}></i>
//         {message.text}
//       </div>
//     );
//   };

//   const renderDebugInfo = () => {
//     if (!debugInfo) return null;
    
//     return (
//       <div className="debug-info">
//         <details>
//           <summary>
//             <i className="fas fa-bug"></i>
//             Informations de débogage
//           </summary>
//           <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
//         </details>
//       </div>
//     );
//   };

//   return (
//     <>
//       <style>{styles}</style>
      
//       <div className="ambient ambient-1" />
//       <div className="ambient ambient-2" />

//       <div className="login-container">
//         <a href="/" className="logo">
//           <img src={logo} alt="EcoCollect" className="logo-img" />
//         </a>

//         <h1>
//           <em>Connexion</em>
//         </h1>

//         <form onSubmit={handleSubmit} noValidate>
//           <div className="form-group">
//             <label htmlFor="identifiant">
//               <i className="fas fa-envelope"></i>
//               Email ou Téléphone
//             </label>
//             <div className="input-wrap">
//               <i className={`fas ${formData.identifiant.includes('@') ? 'fa-envelope' : 'fa-phone'} input-icon`}></i>
//               <input
//                 id="identifiant"
//                 type="text"
//                 name="identifiant"
//                 value={formData.identifiant}
//                 onChange={handleInputChange}
//                 className={errors.identifiant ? 'error' : ''}
//                 placeholder="votre@email.com ou 6XXXXXXXX"
//                 disabled={isLoading}
//                 autoComplete="username"
//               />
//             </div>
//             {errors.identifiant && <div className="error-text">{errors.identifiant}</div>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="motDePasse">
//               <i className="fas fa-lock"></i>
//               Mot de passe
//             </label>
//             <div className="input-wrap">
//               <i className="fas fa-lock input-icon"></i>
//               <input
//                 id="motDePasse"
//                 type={showPassword ? 'text' : 'password'}
//                 name="motDePasse"
//                 value={formData.motDePasse}
//                 onChange={handleInputChange}
//                 className={errors.motDePasse ? 'error' : ''}
//                 placeholder="••••••••"
//                 disabled={isLoading}
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(prev => !prev)}
//                 disabled={isLoading}
//                 aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
//               >
//                 <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//               </button>
//             </div>
//             {errors.motDePasse && <div className="error-text">{errors.motDePasse}</div>}
//           </div>

//           <div className="checkbox-group">
//             <label className="checkbox-label" htmlFor="rememberMe">
//               <input
//                 id="rememberMe"
//                 type="checkbox"
//                 name="rememberMe"
//                 checked={formData.rememberMe}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//               />
//               Se souvenir de moi
//             </label>
//             <a href="/forgot-password" className="forgot-link">
//               Mot de passe oublié ?
//             </a>
//           </div>

//           {renderMessage()}
//           {renderDebugInfo()}

//           <button 
//             type="submit" 
//             className="btn" 
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <div className="spinner"></div>
//                 Connexion en cours...
//               </>
//             ) : (
//               <>
//                 <i className="fas fa-sign-in-alt"></i>
//                 Se connecter
//               </>
//             )}
//           </button>
//         </form>

//         <div className="links">
//           <p>
//             Pas encore de compte ? <a href="/register">S'inscrire</a>
//           </p>
//           <a href="/" className="back-home">
//             <i className="fas fa-arrow-left"></i>
//             Retour à l'accueil
//           </a>
//         </div>
//       </div>

//       {/* Font Awesome chargé une seule fois */}
//       <link 
//         rel="stylesheet" 
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
//       />
//     </>
//   );
// };

// // ============================================================
// // STYLES CSS (rajouter le style pour debug-info)
// // ============================================================

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   :root {
//     --background: #f8faf8;
//     --foreground: #1a1e1a;
//     --card: #ffffff;
//     --card-foreground: #1a1e1a;
//     --primary: #2d8a5e;
//     --primary-foreground: #ffffff;
//     --secondary: #e8f3e8;
//     --secondary-foreground: #1a5c3a;
//     --muted: #f0f3f0;
//     --muted-foreground: #5a655a;
//     --accent: #e0a020;
//     --accent-foreground: #3d2d06;
//     --destructive: #dc2626;
//     --border: #d9e0d9;
//     --ring: #2d8a5e;
//     --radius: 0.75rem;
//     --radius-lg: 1.25rem;
//     --radius-xl: 1.75rem;
//     --shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);
//     --shadow-lg: 0 10px 40px -8px rgba(0, 0, 0, 0.08);
//     --shadow-colored: 0 4px 20px -4px rgba(45, 138, 94, 0.15);
//     --ff-head: 'DM Serif Display', Georgia, serif;
//     --ff-body: 'Outfit', sans-serif;
//     --ease: cubic-bezier(.4, 0, .2, 1);
//     --spring: cubic-bezier(.34, 1.56, .64, 1);
//   }

//   body {
//     font-family: var(--ff-body);
//     background: var(--background);
//     color: var(--foreground);
//     min-height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 1rem;
//     position: relative;
//   }

//   body::before {
//     content: '';
//     position: fixed;
//     inset: 0;
//     pointer-events: none;
//     z-index: 0;
//     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
//     opacity: .015;
//   }

//   .ambient {
//     position: fixed;
//     pointer-events: none;
//     z-index: 0;
//     border-radius: 50%;
//     filter: blur(100px);
//   }

//   .ambient-1 {
//     width: 600px;
//     height: 400px;
//     top: 0;
//     left: 50%;
//     transform: translateX(-50%);
//     background: radial-gradient(ellipse, rgba(45, 138, 94, 0.03) 0%, transparent 70%);
//   }

//   .ambient-2 {
//     width: 400px;
//     height: 300px;
//     bottom: 10%;
//     right: 5%;
//     background: radial-gradient(ellipse, rgba(45, 138, 94, 0.02) 0%, transparent 70%);
//   }

//   .login-container {
//     max-width: 450px;
//     width: 100%;
//     background: var(--card);
//     border-radius: var(--radius-xl);
//     padding: 2.5rem;
//     border: 1px solid var(--border);
//     box-shadow: var(--shadow-lg);
//     animation: fadeIn 0.5s var(--spring) both;
//     position: relative;
//     z-index: 1;
//   }

//   @keyframes fadeIn {
//     from {
//       opacity: 0;
//       transform: translateY(24px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   .logo {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 0.75rem;
//     margin-bottom: 2rem;
//     text-decoration: none;
//   }

//   .logo-img {
//     height: 70px;
//     width: auto;
//     border-radius: 15px;
//     transition: transform 0.3s var(--spring);
//   }

//   .logo-img:hover {
//     transform: scale(1.05);
//   }

//   h1 {
//     font-family: var(--ff-head);
//     text-align: center;
//     margin-bottom: 2rem;
//     font-size: 1.8rem;
//     font-weight: 600;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 0.5rem;
//     color: var(--foreground);
//   }

//   h1 em {
//     color: var(--primary);
//     font-style: italic;
//   }

//   .form-group {
//     margin-bottom: 1.5rem;
//   }

//   label {
//     display: block;
//     margin-bottom: 0.5rem;
//     font-size: 0.9rem;
//     font-weight: 600;
//     color: var(--foreground);
//     letter-spacing: 0.02em;
//   }

//   label i {
//     color: var(--primary);
//     margin-right: 0.5rem;
//   }

//   .input-wrap {
//     position: relative;
//   }

//   .input-icon {
//     position: absolute;
//     left: 1rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: var(--muted-foreground);
//     font-size: 1rem;
//     pointer-events: none;
//   }

//   input {
//     width: 100%;
//     padding: 0.9rem 1rem 0.9rem 2.5rem;
//     border-radius: var(--radius);
//     background: var(--muted);
//     border: 1.5px solid var(--border);
//     color: var(--foreground);
//     font-size: 0.95rem;
//     font-family: var(--ff-body);
//     transition: all 0.2s var(--ease);
//     outline: none;
//   }

//   input:focus {
//     border-color: var(--ring);
//     box-shadow: 0 0 0 3px rgba(45, 138, 94, 0.1);
//   }

//   input.error {
//     border-color: var(--destructive);
//   }

//   input:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
//   }

//   .toggle-password {
//     position: absolute;
//     right: 1rem;
//     top: 50%;
//     transform: translateY(-50%);
//     background: none;
//     border: none;
//     cursor: pointer;
//     color: var(--muted-foreground);
//     font-size: 1.1rem;
//     transition: color 0.2s;
//     padding: 0;
//   }

//   .toggle-password:hover:not(:disabled) {
//     color: var(--primary);
//   }

//   .toggle-password:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }

//   .error-text {
//     color: var(--destructive);
//     font-size: 0.75rem;
//     margin-top: 0.25rem;
//     font-weight: 500;
//   }

//   .checkbox-group {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin: 1.5rem 0;
//   }

//   .checkbox-label {
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     cursor: pointer;
//     color: var(--foreground);
//     font-size: 0.9rem;
//   }

//   .checkbox-label input[type="checkbox"] {
//     width: 18px;
//     height: 18px;
//     accent-color: var(--primary);
//     cursor: pointer;
//     padding: 0;
//     margin: 0;
//   }

//   .checkbox-label input[type="checkbox"]:disabled {
//     cursor: not-allowed;
//     opacity: 0.7;
//   }

//   .forgot-link {
//     color: var(--primary);
//     text-decoration: none;
//     font-size: 0.9rem;
//     font-weight: 600;
//     transition: color 0.2s;
//   }

//   .forgot-link:hover {
//     text-decoration: underline;
//   }

//   .btn {
//     width: 100%;
//     padding: 1rem;
//     border: none;
//     border-radius: 100px;
//     cursor: pointer;
//     font-family: var(--ff-body);
//     font-weight: 700;
//     font-size: 1rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 0.75rem;
//     transition: all 0.3s var(--spring);
//     background: var(--primary);
//     color: white;
//     box-shadow: 0 4px 15px rgba(45, 138, 94, 0.2);
//   }

//   .btn:hover:not(:disabled) {
//     transform: translateY(-3px);
//     box-shadow: 0 8px 25px rgba(45, 138, 94, 0.3);
//   }

//   .btn:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }

//   .spinner {
//     width: 1.2rem;
//     height: 1.2rem;
//     border: 2px solid rgba(255, 255, 255, 0.3);
//     border-radius: 50%;
//     border-top-color: white;
//     animation: spin 0.8s linear infinite;
//   }

//   @keyframes spin {
//     to {
//       transform: rotate(360deg);
//     }
//   }

//   .message {
//     padding: 1rem;
//     margin-top: 1rem;
//     border-radius: var(--radius);
//     font-size: 0.9rem;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     animation: slideIn 0.3s var(--ease);
//   }

//   @keyframes slideIn {
//     from {
//       opacity: 0;
//       transform: translateY(-10px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   .message.success {
//     background: var(--secondary);
//     color: var(--secondary-foreground);
//     border: 1px solid var(--primary);
//   }

//   .message.error {
//     background: rgba(220, 38, 38, 0.1);
//     color: var(--destructive);
//     border: 1px solid var(--destructive);
//   }

//   .message.info {
//     background: rgba(45, 138, 94, 0.05);
//     color: var(--primary);
//     border: 1px solid var(--primary);
//   }

//   .debug-info {
//     margin-top: 1rem;
//     padding: 0.75rem;
//     background: var(--muted);
//     border-radius: var(--radius);
//     font-size: 0.8rem;
//   }

//   .debug-info details {
//     cursor: pointer;
//   }

//   .debug-info summary {
//     color: var(--muted-foreground);
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//   }

//   .debug-info pre {
//     margin-top: 0.75rem;
//     padding: 0.5rem;
//     background: var(--card);
//     border-radius: var(--radius);
//     overflow-x: auto;
//     font-size: 0.7rem;
//   }

//   .links {
//     text-align: center;
//     margin-top: 1.5rem;
//     font-size: 0.9rem;
//     color: var(--muted-foreground);
//   }

//   .links p {
//     margin-bottom: 1rem;
//   }

//   .links a {
//     color: var(--primary);
//     text-decoration: none;
//     font-weight: 600;
//     transition: color 0.2s;
//   }

//   .links a:hover {
//     text-decoration: underline;
//   }

//   .back-home {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.5rem;
//     margin-top: 1rem;
//     color: var(--muted-foreground);
//     text-decoration: none;
//     font-size: 0.9rem;
//     transition: all 0.2s;
//   }

//   .back-home:hover {
//     color: var(--primary);
//     transform: translateX(-3px);
//   }

//   @media (max-width: 480px) {
//     .login-container {
//       padding: 2rem 1.5rem;
//     }
    
//     .logo-img {
//       height: 60px;
//     }
//   }
// `;

// export default Login;



import React, { useState, useEffect, useCallback } from 'react';
import logo from '../assets/logo.jpeg';
import './Login.css'; // Contient le contenu de loginStyles

const API_URL = 'https://ecocollect.cm';

const STORAGE_KEYS = {
  TOKEN: 'ecocollect_token',
  USER: 'ecocollect_user',
  ROLE: 'ecocollect_role',
  REMEMBER: 'ecocollect_remember'
};

const ROLE_CONFIG = {
  admin: { page: '/admin', url: `${API_URL}/api/auth/connexion`, userField: 'utilisateur', roleType: 'admin', bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse }) },
  superviseur: { page: '/superviseur', url: `${API_URL}/api/auth/connexion`, userField: 'utilisateur', roleType: 'superviseur', bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse }) },
  gestionnaire: { page: '/gestionnaire', url: `${API_URL}/api/auth/connexion`, userField: 'utilisateur', roleType: 'gestionnaire', bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse }) },
  collecteur: { page: '/collecteur', url: `${API_URL}/api/auth/connexion`, userField: 'utilisateur', roleType: 'collecteur', bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse }) },
  producteur: { page: '/producteur', url: `${API_URL}/api/auth/connexion`, userField: 'utilisateur', roleType: 'producteur', bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse }) },
  recycleur: { page: '/recycleur', url: `${API_URL}/api/auth/connexion`, userField: 'utilisateur', roleType: 'recycleur', bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse }) },
  sponsor: { page: '/sponsor', url: `${API_URL}/api/auth/connexion`, userField: 'utilisateur', roleType: 'sponsor', bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse }) },
  ong: { page: '/ong', url: `${API_URL}/api/auth/connexion`, userField: 'utilisateur', roleType: 'ong', bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse }) },
};

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const Login = () => {
  const [formData, setFormData] = useState({
    identifiant: '',
    motDePasse: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);
    if (token && role && ROLE_CONFIG[role]) {
      window.location.href = ROLE_CONFIG[role].page;
    }
  }, []);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (message.text) setMessage({ type: '', text: '' });
  }, [errors, message]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.identifiant.trim()) {
      newErrors.identifiant = "L'email ou le téléphone est requis";
    } else if (formData.identifiant.includes('@') && !isValidEmail(formData.identifiant)) {
      newErrors.identifiant = "L'email n'est pas valide";
    }
    if (!formData.motDePasse) {
      newErrors.motDePasse = 'Le mot de passe est requis';
    } else if (formData.motDePasse.length < 6) {
      newErrors.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const saveAuthData = useCallback((token, user, role) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
      if (formData.rememberMe) {
        localStorage.setItem(STORAGE_KEYS.REMEMBER, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEYS.REMEMBER);
      }
      return true;
    } catch {
      return false;
    }
  }, [formData.rememberMe]);

  const extractAuthData = useCallback((data, role) => {
    let token = data.token || data.accessToken || data.access_token || data.jwt || data.data?.token || null;
    let user = data.utilisateur || data.user || data.data?.utilisateur || data[role] || null;
    if (!user && typeof data === 'object' && data.id && data.email) user = data;
    return { token, user };
  }, []);

  const attemptLogin = useCallback(async (identifiant, motDePasse) => {
    const url = `${API_URL}/api/auth/connexion`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ identifiant, motDePasse })
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error('Réponse invalide du serveur');
    }

    if (response.ok) {
      const { token, user } = extractAuthData(data, data.utilisateur?.type || 'unknown');
      if (token && user) {
        const role = user.type || user.role || data.utilisateur?.type || 'producteur';
        if (saveAuthData(token, user, role)) {
          return { success: true, role, user, token };
        }
        throw new Error('Erreur lors de la sauvegarde des données');
      }
      throw new Error("Données d'authentification incomplètes");
    }
    throw new Error(data.message || 'Erreur de connexion');
  }, [extractAuthData, saveAuthData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ type: 'info', text: 'Connexion en cours...' });
    setDebugInfo(null);

    try {
      const result = await attemptLogin(formData.identifiant, formData.motDePasse);
      if (result.success) {
        const config = ROLE_CONFIG[result.role] || ROLE_CONFIG.producteur;
        setMessage({ type: 'success', text: `Connexion réussie ! Bienvenue ${result.user.nomComplet || result.user.email} !` });
        setTimeout(() => { window.location.href = config.page; }, 1500);
      }
    } catch (error) {
      setDebugInfo({ error: error.message, identifiant: formData.identifiant, timestamp: new Date().toISOString() });
      setMessage({ type: 'error', text: error.message || 'Identifiants incorrects ou compte non trouvé.' });
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, attemptLogin]);

  return (
    <>
      <div className="ambient ambient-1" />
      <div className="ambient ambient-2" />

      <div className="login-container">
        <a href="/" className="logo">
          <img src={logo} alt="EcoCollect Logo" className="logo-img" />
        </a>

        <h1>Connexion</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identifiant">
              <i className="fas fa-user" />
              Email ou Téléphone
            </label>
            <div className="input-wrap">
              <i className={`fas ${formData.identifiant.includes('@') ? 'fa-envelope' : 'fa-phone'} input-icon`} />
              <input
                id="identifiant"
                type="text"
                name="identifiant"
                value={formData.identifiant}
                onChange={handleInputChange}
                className={errors.identifiant ? 'error' : ''}
                placeholder="votre@email.com ou 6XXXXXXXX"
                disabled={isLoading}
                autoComplete="username"
              />
            </div>
            {errors.identifiant && <p className="error-text">{errors.identifiant}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="motDePasse">
              <i className="fas fa-lock" />
              Mot de passe
            </label>
            <div className="input-wrap">
              <i className="fas fa-lock input-icon" />
              <input
                id="motDePasse"
                type={showPassword ? 'text' : 'password'}
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleInputChange}
                className={errors.motDePasse ? 'error' : ''}
                placeholder="••••••••"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(prev => !prev)}
                disabled={isLoading}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
            {errors.motDePasse && <p className="error-text">{errors.motDePasse}</p>}
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              Se souvenir de moi
            </label>
            <a href="/mot-de-passe-oublie" className="forgot-link">
              Mot de passe oublié ?
            </a>
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : message.type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}`} />
              {message.text}
            </div>
          )}

          {debugInfo && (
            <div className="debug-info">
              <details>
                <summary>
                  <i className="fas fa-bug" />
                  Informations de débogage
                </summary>
                <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
              </details>
            </div>
          )}

          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner" />
                Connexion en cours...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt" />
                Se connecter
              </>
            )}
          </button>
        </form>

        <div className="links">
          <p>
            Pas encore de compte ? <a href="/inscription">S'inscrire</a>
          </p>
          <a href="/" className="back-home">
            <i className="fas fa-arrow-left" />
            Retour à l'accueil
          </a>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </>
  );
};

export default Login;