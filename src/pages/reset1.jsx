

// import React, { useState, useRef } from 'react';
// import logo from '../assets/logo.jpeg';

// const Register = () => {
//   // ========== ÉTATS ==========
//   const [currentScreen, setCurrentScreen] = useState(1);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [formStep, setFormStep] = useState(1);
  
//   // État pour le formulaire producteur
//   const [producteurForm, setProducteurForm] = useState({
//     email: '',
//     phone: '',
//     password: '',
//     passwordConfirm: '',
//     nomComplet: '',
//     type: '',
//     adresse: '',
//     quartier: '',
//     commune: '',
//     latitude: '',
//     longitude: '',
//     cgu: false
//   });

//   // État pour le formulaire collecteur
//   const [collecteurForm, setCollecteurForm] = useState({
//     email: '',
//     phone: '',
//     password: '',
//     passwordConfirm: '',
//     nomComplet: '',
//     type: '',
//     identite: '',
//     zone: '',
//     quartiers: '',
//     communes: '',
//     photo: null,
//     photoCniRecto: null,
//     photoCniVerso: null,
//     cgu: false
//   });

//   // États pour la visibilité des mots de passe (gérés via React)
//   const [showPPwd, setShowPPwd] = useState(false);
//   const [showPPwdConfirm, setShowPPwdConfirm] = useState(false);
//   const [showCPwd, setShowCPwd] = useState(false);
//   const [showCPwdConfirm, setShowCPwdConfirm] = useState(false);

//   // États pour les erreurs
//   const [errors, setErrors] = useState({});
//   const [passwordStrength, setPasswordStrength] = useState({
//     producteur: { score: 0, label: '–' },
//     collecteur: { score: 0, label: '–' }
//   });

//   // États pour les messages
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [isLoading, setIsLoading] = useState(false);

//   // États pour les photos
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [cniRectoPreview, setCniRectoPreview] = useState(null);
//   const [cniVersoPreview, setCniVersoPreview] = useState(null);

//   // Refs pour les inputs file
//   const photoInputRef = useRef(null);
//   const cniRectoInputRef = useRef(null);
//   const cniVersoInputRef = useRef(null);

//   // CONFIGURATION ==========
//   const API_URL = 'http://localhost:3000';

//   const selectRole = (role) => {
//     setSelectedRole(role);
//     setFormStep(1);
//     // Pas de manipulation DOM, React gère les classes via l'état selectedRole
//   };

//   const goToForm = () => {
//     if (selectedRole) {
//       setCurrentScreen(2);
//     }
//   };

//   const goBack = () => {
//     if (currentScreen === 2) {
//       setCurrentScreen(1);
//       setFormStep(1);
//     }
//   };

//   // ========== GESTION DES MOTS DE PASSE ==========
//   const checkPasswordStrength = (password, type) => {
//     let score = 0;
//     let label = 'Faible';

//     if (password.length >= 8) score += 1;
//     if (/[A-Z]/.test(password)) score += 1;
//     if (/[0-9]/.test(password)) score += 1;
//     if (/[^A-Za-z0-9]/.test(password)) score += 1;

//     if (score === 0) label = '–';
//     else if (score <= 1) label = 'Faible';
//     else if (score === 2) label = 'Moyen';
//     else if (score === 3) label = 'Bon';
//     else if (score === 4) label = 'Fort';

//     setPasswordStrength(prev => ({
//       ...prev,
//       [type]: { score, label }
//     }));
//   };

//   // ========== GESTION DES PHOTOS ==========
//   const handlePhotoUpload = (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       setMessage({ type: 'error', text: 'Le fichier ne doit pas dépasser 5 Mo' });
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (type === 'photo') {
//         setPhotoPreview(reader.result);
//         setCollecteurForm(prev => ({ ...prev, photo: file }));
//       } else if (type === 'recto') {
//         setCniRectoPreview(reader.result);
//         setCollecteurForm(prev => ({ ...prev, photoCniRecto: file }));
//       } else if (type === 'verso') {
//         setCniVersoPreview(reader.result);
//         setCollecteurForm(prev => ({ ...prev, photoCniVerso: file }));
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const triggerFileInput = (inputRef) => {
//     inputRef.current?.click();
//   };

//   // ========== GESTION GPS ==========
//   const getGPS = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setProducteurForm(prev => ({
//             ...prev,
//             latitude: position.coords.latitude.toString(),
//             longitude: position.coords.longitude.toString()
//           }));
//           setMessage({ type: 'success', text: 'Position GPS obtenue !' });
//         },
//         () => {
//           setMessage({ type: 'error', text: 'Impossible d\'obtenir votre position' });
//         }
//       );
//     } else {
//       setMessage({ type: 'error', text: 'Géolocalisation non supportée' });
//     }
//   };

//   // ========== VALIDATION DES ÉTAPES ==========
//   const validateProducteurStep = (step) => {
//     const newErrors = {};

//     if (step === 1) {
//       if (!producteurForm.email) newErrors.pEmail = 'Email requis';
//       else if (!/\S+@\S+\.\S+/.test(producteurForm.email)) newErrors.pEmail = 'Email invalide';
      
//       if (!producteurForm.phone) newErrors.pPhone = 'Téléphone requis';
      
//       if (!producteurForm.password) newErrors.pPassword = 'Mot de passe requis';
//       else if (producteurForm.password.length < 8) newErrors.pPassword = 'Minimum 8 caractères';
      
//       if (producteurForm.password !== producteurForm.passwordConfirm) {
//         newErrors.pPasswordConfirm = 'Les mots de passe ne correspondent pas';
//       }
//     } else if (step === 2) {
//       if (!producteurForm.nomComplet) newErrors.pNomComplet = 'Nom requis';
//       if (!producteurForm.type) newErrors.pType = 'Type requis';
//     } else if (step === 3) {
//       if (!producteurForm.adresse) newErrors.pAdresse = 'Adresse requise';
//       if (!producteurForm.quartier) newErrors.pQuartier = 'Quartier requis';
//       if (!producteurForm.commune) newErrors.pCommune = 'Commune requise';
//     }

//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateCollecteurStep = (step) => {
//     const newErrors = {};

//     if (step === 1) {
//       if (!collecteurForm.email) newErrors.cEmail = 'Email requis';
//       else if (!/\S+@\S+\.\S+/.test(collecteurForm.email)) newErrors.cEmail = 'Email invalide';
      
//       if (!collecteurForm.phone) newErrors.cPhone = 'Téléphone requis';
      
//       if (!collecteurForm.password) newErrors.cPassword = 'Mot de passe requis';
//       else if (collecteurForm.password.length < 8) newErrors.cPassword = 'Minimum 8 caractères';
      
//       if (collecteurForm.password !== collecteurForm.passwordConfirm) {
//         newErrors.cPasswordConfirm = 'Les mots de passe ne correspondent pas';
//       }
//     } else if (step === 2) {
//       if (!collecteurForm.nomComplet) newErrors.cNomComplet = 'Nom requis';
//       if (!collecteurForm.type) newErrors.cType = 'Type requis';
//     } else if (step === 3) {
//       if (!collecteurForm.zone) newErrors.cZone = 'Zone requise';
//       if (!collecteurForm.photo) newErrors.cPhoto = 'Photo de profil requise';
//       if (!collecteurForm.photoCniRecto) newErrors.cCniRecto = 'Photo CNI recto requise';
//       if (!collecteurForm.photoCniVerso) newErrors.cCniVerso = 'Photo CNI verso requise';
//     }

//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return Object.keys(newErrors).length === 0;
//   };

//   // ========== NAVIGATION ENTRE LES ÉTAPES ==========
//   const pNext = (currentStep) => {
//     if (validateProducteurStep(currentStep)) {
//       setFormStep(currentStep + 1);
//     }
//   };

//   const pPrev = (targetStep) => {
//     setFormStep(targetStep);
//   };

//   const cNext = (currentStep) => {
//     if (validateCollecteurStep(currentStep)) {
//       setFormStep(currentStep + 1);
//     }
//   };

//   const cPrev = (targetStep) => {
//     setFormStep(targetStep);
//   };

//   const submitProducteur = async () => {
//     if (!producteurForm.cgu) {
//       setMessage({ type: 'error', text: 'Vous devez accepter les conditions générales' });
//       return;
//     }

//     if (!producteurForm.email || !producteurForm.phone || !producteurForm.password || 
//         !producteurForm.nomComplet || !producteurForm.type || !producteurForm.adresse || 
//         !producteurForm.quartier || !producteurForm.commune) {
//       setMessage({ type: 'error', text: 'Tous les champs requis doivent être remplis' });
//       return;
//     }

//     setIsLoading(true);
//     setMessage({ type: 'info', text: 'Création du compte en cours...' });

//     try {
//       const requestData = {
//         email: producteurForm.email.trim(),
//         telephone: producteurForm.phone.trim(),
//         motDePasse: producteurForm.password,
//         typeProducteur: producteurForm.type,
//         nomComplet: producteurForm.nomComplet.trim(),
//         adresse: producteurForm.adresse.trim(),
//         quartier: producteurForm.quartier.trim(),
//         commune: producteurForm.commune.trim(),
//         cguAcceptees: producteurForm.cgu
//       };

//       if (producteurForm.latitude && producteurForm.latitude.trim() !== '') {
//         requestData.latitude = parseFloat(producteurForm.latitude);
//       }
//       if (producteurForm.longitude && producteurForm.longitude.trim() !== '') {
//         requestData.longitude = parseFloat(producteurForm.longitude);
//       }

//       const response = await fetch(`${API_URL}/api/auth/inscription`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(requestData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setCurrentScreen(3);
//         setMessage({ type: 'success', text: '' });
//         if (data.token) {
//           localStorage.setItem('auth_token', data.token);
//         }
//       } else {
//         setMessage({ 
//           type: 'error', 
//           text: data.message || data.erreur || 'Erreur lors de l\'inscription' 
//         });
//       }
//     } catch (error) {
//       console.error('❌ Erreur inscription:', error);
//       setMessage({ 
//         type: 'error', 
//         text: 'Erreur de connexion au serveur. Vérifiez que le backend est bien lancé sur http://localhost:3000' 
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const submitCollecteur = async () => {
//     if (!collecteurForm.cgu) {
//       setMessage({ type: 'error', text: 'Vous devez accepter les conditions' });
//       return;
//     }

//     setIsLoading(true);
//     setMessage({ type: 'info', text: 'Création du compte en cours...' });

//     try {
//       // Simulation de succès (à remplacer par un vrai appel API)
//       setTimeout(() => {
//         setCurrentScreen(3);
//         setMessage({ type: 'success', text: '' });
//         setIsLoading(false);
//       }, 1500);
//     } catch (error) {
//       console.error('Erreur inscription collecteur:', error);
//       setMessage({ type: 'error', text: 'Erreur lors de l\'inscription' });
//       setIsLoading(false);
//     }
//   };

//   // ========== FONCTIONS POUR LES RÉCAPITULATIFS ==========
//   const getProducteurRecap = () => {
//     const typeLabels = {
//       menage: 'Ménage',
//       commerce: 'Commerce',
//       entreprise: 'Entreprise',
//       administration: 'Administration'
//     };

//     return (
//       <div className="recap-grid">
//         <div className="recap-item">
//           <div className="recap-label">Email</div>
//           <div className="recap-val">{producteurForm.email}</div>
//         </div>
//         <div className="recap-item">
//           <div className="recap-label">Téléphone</div>
//           <div className="recap-val">{producteurForm.phone}</div>
//         </div>
//         <div className="recap-item">
//           <div className="recap-label">Nom</div>
//           <div className="recap-val">{producteurForm.nomComplet}</div>
//         </div>
//         <div className="recap-item">
//           <div className="recap-label">Type</div>
//           <div className="recap-val">{typeLabels[producteurForm.type] || producteurForm.type}</div>
//         </div>
//         <div className="recap-item">
//           <div className="recap-label">Adresse</div>
//           <div className="recap-val">{producteurForm.adresse}</div>
//         </div>
//         <div className="recap-item">
//           <div className="recap-label">Quartier / Commune</div>
//           <div className="recap-val">{producteurForm.quartier}, {producteurForm.commune}</div>
//         </div>
//         {producteurForm.latitude && producteurForm.longitude && (
//           <div className="recap-item">
//             <div className="recap-label">GPS</div>
//             <div className="recap-val">{producteurForm.latitude}, {producteurForm.longitude}</div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const getCollecteurRecap = () => {
//     const typeLabels = {
//       independant: 'Indépendant',
//       cooperative: 'Coopérative'
//     };

//     return (
//       <div className="recap-grid">
//         <div className="recap-item">
//           <div className="recap-label">Email</div>
//           <div className="recap-val">{collecteurForm.email}</div>
//         </div>
//         <div className="recap-item">
//           <div className="recap-label">Téléphone</div>
//           <div className="recap-val">{collecteurForm.phone}</div>
//         </div>
//         <div className="recap-item">
//           <div className="recap-label">Nom</div>
//           <div className="recap-val">{collecteurForm.nomComplet}</div>
//         </div>
//         <div className="recap-item">
//           <div className="recap-label">Type</div>
//           <div className="recap-val">{typeLabels[collecteurForm.type] || collecteurForm.type}</div>
//         </div>
//         <div className="recap-item">
//           <div className="recap-label">Zone</div>
//           <div className="recap-val">{collecteurForm.zone}</div>
//         </div>
//         <div className="recap-item">
//           <div className="recap-label">Quartiers / Communes</div>
//           <div className="recap-val">{collecteurForm.quartiers} / {collecteurForm.communes}</div>
//         </div>
//       </div>
//     );
//   };

  
//   // ========== STYLES ==========
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

//     *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

//     :root {
//       --background: #f8faf8;
//       --foreground: #1a1e1a;
//       --card: #ffffff;
//       --card-foreground: #1a1e1a;
//       --primary: #2d8a5e;
//       --primary-foreground: #ffffff;
//       --secondary: #e8f3e8;
//       --secondary-foreground: #1a5c3a;
//       --muted: #f0f3f0;
//       --muted-foreground: #5a655a;
//       --accent: #e0a020;
//       --accent-foreground: #3d2d06;
//       --destructive: #dc2626;
//       --border: #d9e0d9;
//       --ring: #2d8a5e;
//       --radius: 0.75rem;
//       --radius-lg: 1.25rem;
//       --radius-xl: 1.75rem;
//       --shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);
//       --shadow-lg: 0 10px 40px -8px rgba(0, 0, 0, 0.08);
//       --shadow-colored: 0 4px 20px -4px rgba(45, 138, 94, 0.15);
      
//       --input-bg: #ffffff;
//       --input-border: var(--border);
//       --input-focus: var(--ring);
//       --error: #dc2626;
      
//       --ff-head: 'DM Serif Display', Georgia, serif;
//       --ff-body: 'Outfit', sans-serif;
      
//       --ease: cubic-bezier(.4,0,.2,1);
//       --spring: cubic-bezier(.34,1.56,.64,1);
//     }

//     html { scroll-behavior:smooth; }

//     body {
//       font-family: var(--ff-body);
//       background: var(--background);
//       color: var(--foreground);
//       min-height:100svh;
//       overflow-x:hidden;
//     }

//     body::before {
//       content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
//       background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
//       opacity:.015;
//     }

//     nav {
//       position:fixed; top:0; left:0; right:0; z-index:100;
//       padding:1.25rem 2.5rem;
//       display:flex; align-items:center; justify-content:space-between;
//       background:rgba(255,255,255,0.95); backdrop-filter:blur(10px);
//       border-bottom:1px solid var(--border);
//       box-shadow: 0 2px 10px rgba(0,0,0,0.02);
//     }

//     .logo-img {
//       height: 38px;
//       width: auto;
//       object-fit: contain;
//     }

//     .nav-back {
//       display:flex; align-items:center; gap:.5rem;
//       color:var(--muted-foreground); font-size:.95rem; font-weight:500;
//       text-decoration:none; padding:.5rem 1rem; border-radius:100px;
//       border:1px solid var(--border);
//       transition:all .2s var(--ease);
//       background:none; cursor:pointer;
//     }

//     .nav-back:hover { 
//       color:var(--foreground); 
//       border-color:var(--primary); 
//       background:var(--secondary); 
//     }

//     .page {
//       min-height:100svh; position:relative; z-index:1;
//       display:flex; flex-direction:column; align-items:center;
//       padding:7rem 1.5rem 4rem;
//     }

//     .ambient {
//       position:fixed; pointer-events:none; z-index:0;
//       border-radius:50%; filter:blur(100px);
//     }

//     .ambient-1 { 
//       width:600px; height:400px; top:0; left:50%; transform:translateX(-50%);
//       background:radial-gradient(ellipse, rgba(45,138,94,0.03) 0%, transparent 70%); 
//     }

//     .ambient-2 { 
//       width:400px; height:300px; bottom:10%; right:5%;
//       background:radial-gradient(ellipse, rgba(45,138,94,0.02) 0%, transparent 70%); 
//     }

//     .progress-wrap {
//       width:100%; max-width:580px; margin-bottom:3rem;
//       position:relative; z-index:1;
//     }

//     .progress-steps {
//       display:flex; align-items:center; justify-content:center; gap:0;
//       position:relative;
//     }

//     .progress-step {
//       display:flex; flex-direction:column; align-items:center; gap:.5rem;
//       position:relative; z-index:1;
//     }

//     .step-dot {
//       width:40px; height:40px; border-radius:50%;
//       border:2px solid var(--border);
//       background:white;
//       display:flex; align-items:center; justify-content:center;
//       font-size:.9rem; font-weight:700; color:var(--muted-foreground);
//       transition:all .4s var(--ease);
//     }

//     .step-dot.active {
//       border-color:var(--primary); 
//       color:var(--primary);
//       background:rgba(45,138,94,0.05);
//       box-shadow:0 0 0 4px rgba(45,138,94,0.1);
//     }

//     .step-dot.done {
//       border-color:var(--primary); 
//       background:var(--primary);
//       color:white;
//     }

//     .step-label {
//       font-size:.75rem; font-weight:500; color:var(--muted-foreground);
//       text-align:center; white-space:nowrap;
//     }

//     .step-label.active { color:var(--primary); }

//     .step-line {
//       flex:1; height:2px; background:var(--border);
//       margin:0 .75rem; margin-bottom:1.5rem;
//       transition:background .4s var(--ease);
//       min-width:60px;
//     }

//     .step-line.done { background:var(--primary); }

//     .screen {
//       display:none; width:100%; max-width:880px;
//       position:relative; z-index:1;
//       animation:screenIn .45s var(--ease) both;
//     }

//     .screen.active { display:block; }

//     @keyframes screenIn {
//       from { opacity:0; transform:translateY(24px); }
//       to   { opacity:1; transform:translateY(0); }
//     }

//     .screen-title {
//       font-family:var(--ff-head); font-size:clamp(2rem,5vw,3rem);
//       line-height:1.1; margin-bottom:.75rem; text-align:center;
//       color: var(--foreground);
//     }

//     .screen-title em { 
//       font-style:italic; 
//       color: var(--primary);
//     }

//     .screen-sub {
//       text-align:center; color:var(--muted-foreground); font-size:1rem; line-height:1.7;
//       margin-bottom:3rem; max-width:480px; margin-left:auto; margin-right:auto;
//     }

//     .roles-grid {
//       display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;
//       margin-bottom:2rem;
//     }

//     .role-card {
//       background:white; 
//       border:2px solid var(--border);
//       border-radius:var(--radius-xl); 
//       padding:2.5rem 2rem;
//       cursor:pointer; 
//       transition:all .35s var(--ease);
//       text-align:center; 
//       position:relative; 
//       overflow:hidden;
//     }

//     .role-card.producteur:hover { 
//       border-color:var(--primary); 
//       box-shadow:var(--shadow-colored); 
//     }

//     .role-card.collecteur:hover { 
//       border-color:var(--primary); 
//       box-shadow:var(--shadow-colored); 
//     }

//     .role-card.selected.producteur {
//       border-color:var(--primary);
//       background:rgba(45,138,94,0.02);
//       box-shadow:0 0 0 3px rgba(45,138,94,0.1), var(--shadow-colored);
//     }

//     .role-card.selected.collecteur {
//       border-color:var(--primary);
//       background:rgba(45,138,94,0.02);
//       box-shadow:0 0 0 3px rgba(45,138,94,0.1), var(--shadow-colored);
//     }

//     .role-icon {
//       width:80px; height:80px; border-radius:var(--radius-lg);
//       margin:0 auto 1.5rem; display:flex; align-items:center; justify-content:center;
//       font-size:2.25rem; transition:transform .35s var(--spring);
//       border:1px solid var(--border);
//       background:var(--muted);
//       color: var(--foreground);
//     }

//     .role-card:hover .role-icon { transform:scale(1.1) rotate(-5deg); }

//     .role-name {
//       font-family:var(--ff-head); font-size:1.6rem;
//       margin-bottom:.65rem; color:var(--foreground);
//     }

//     .role-desc { 
//       font-size:.95rem; 
//       color:var(--muted-foreground); 
//       line-height:1.65; 
//       margin-bottom:1.5rem; 
//     }

//     .role-tags { display:flex; flex-wrap:wrap; gap:.5rem; justify-content:center; }

//     .role-tag {
//       font-size:.75rem; font-weight:600; padding:.3rem .75rem;
//       border-radius:100px; 
//       border:1px solid var(--border); 
//       letter-spacing:.04em;
//       color:var(--muted-foreground);
//       background:var(--muted);
//     }

//     .role-check {
//       position:absolute; top:1rem; right:1rem;
//       width:28px; height:28px; border-radius:50%;
//       display:flex; align-items:center; justify-content:center;
//       font-size:.8rem; font-weight:700;
//       opacity:0; transform:scale(.5);
//       transition:all .3s var(--spring);
//       background:var(--primary); 
//       color:white;
//     }

//     .role-card.selected .role-check { opacity:1; transform:scale(1); }

//     .btn-continue {
//       width:100%; 
//       padding:1.1rem; 
//       border-radius:100px;
//       font-family:var(--ff-body); 
//       font-weight:700; 
//       font-size:1.05rem;
//       border:none; 
//       cursor:pointer;
//       display:flex; 
//       align-items:center; 
//       justify-content:center; 
//       gap:.75rem;
//       transition:all .3s var(--spring);
//       opacity:.4; 
//       pointer-events:none;
//       background:var(--muted);
//       color:var(--muted-foreground);
//     }

//     .btn-continue.ready {
//       opacity:1; 
//       pointer-events:all;
//       background:var(--primary);
//       color:white;
//       box-shadow:0 4px 15px rgba(45,138,94,0.2);
//     }

//     .btn-continue.ready:hover { 
//       transform:translateY(-3px); 
//       box-shadow:0 8px 25px rgba(45,138,94,0.3); 
//     }

//     .btn-continue svg { transition:transform .3s var(--spring); }
//     .btn-continue.ready:hover svg { transform:translateX(5px); }

//     .form-card {
//       background:white; 
//       border:1px solid var(--border);
//       border-radius:var(--radius-xl); 
//       padding:3rem;
//       position:relative; 
//       overflow:hidden;
//       box-shadow:var(--shadow);
//     }

//     .form-card::before {
//       content:''; 
//       position:absolute; 
//       top:0; 
//       left:0; 
//       right:0; 
//       height:3px;
//       background:linear-gradient(90deg, var(--primary), #5daa5d);
//     }

//     .form-role-badge {
//       display:inline-flex; 
//       align-items:center; 
//       gap:.6rem;
//       padding:.45rem 1.1rem; 
//       border-radius:100px;
//       font-size:.85rem; 
//       font-weight:600; 
//       letter-spacing:.06em;
//       margin-bottom:2rem; 
//       border:1px solid var(--primary);
//       background:rgba(45,138,94,0.05);
//       color:var(--primary);
//     }

//     .form-step { display:none; }
//     .form-step.active { display:block; animation:screenIn .35s var(--ease) both; }

//     .step-heading {
//       font-family:var(--ff-head); 
//       font-size:1.6rem;
//       margin-bottom:1.75rem; 
//       display:flex; 
//       align-items:center; 
//       gap:.75rem;
//       color:var(--foreground);
//     }

//     .step-heading-num {
//       width:36px; 
//       height:36px; 
//       border-radius:10px;
//       background:var(--muted); 
//       border:1px solid var(--border);
//       color:var(--primary); 
//       font-size:1rem; 
//       font-weight:800;
//       display:flex; 
//       align-items:center; 
//       justify-content:center;
//       font-family:var(--ff-body);
//     }

//     .field-row { 
//       display:grid; 
//       grid-template-columns:1fr 1fr; 
//       gap:1.25rem; 
//     }

//     .field-row-3 { 
//       display:grid; 
//       grid-template-columns:1fr 1fr 1fr; 
//       gap:1.25rem; 
//     }

//     .field {
//       display:flex; 
//       flex-direction:column; 
//       gap:.5rem; 
//       margin-bottom:1.25rem;
//     }

//     .field label {
//       font-size:.9rem; 
//       font-weight:600; 
//       color:var(--foreground);
//       display:flex; 
//       align-items:center; 
//       gap:.4rem;
//       letter-spacing:.02em;
//     }

//     .field label .req { color:var(--primary); }
//     .field label .lbl-icon { font-size:1rem; }

//     .field input, .field select, .field textarea {
//       background:white;
//       border:1.5px solid var(--border);
//       border-radius:var(--radius);
//       padding:.85rem 1rem;
//       color:var(--foreground);
//       font-family:var(--ff-body); 
//       font-size:.95rem;
//       transition:all .2s var(--ease);
//       outline:none; 
//       width:100%;
//     }

//     .field input::placeholder, .field textarea::placeholder { 
//       color:var(--muted-foreground); 
//       opacity:0.6;
//     }

//     .field input:focus, .field select:focus, .field textarea:focus {
//       border-color:var(--primary);
//       box-shadow:0 0 0 3px rgba(45,138,94,0.1);
//     }

//     .field select option { background:white; color:var(--foreground); }

//     .field.has-error input, .field.has-error select { 
//       border-color:var(--destructive); 
//     }

//     .field-error { 
//       font-size:.8rem; 
//       color:var(--destructive); 
//       display:none; 
//     }

//     .field.has-error .field-error { display:block; }

//     .field-hint { 
//       font-size:.8rem; 
//       color:var(--muted-foreground); 
//     }

//     .input-wrap { position:relative; }
//     .input-wrap input { padding-right:2.75rem; }

//     .input-toggle {
//       position:absolute; 
//       right:.85rem; 
//       top:50%; 
//       transform:translateY(-50%);
//       background:none; 
//       border:none; 
//       cursor:pointer;
//       color:var(--muted-foreground); 
//       padding:.25rem; 
//       transition:color .2s;
//       font-size:1.1rem;
//     }

//     .input-toggle:hover { color:var(--primary); }

//     .pwd-strength { margin-top:.5rem; }

//     .pwd-bar-wrap { 
//       height:4px; 
//       background:var(--muted); 
//       border-radius:100px; 
//       overflow:hidden; 
//       margin-bottom:.3rem; 
//     }

//     .pwd-bar { 
//       height:100%; 
//       border-radius:100px; 
//       width:0; 
//       transition:width .4s var(--ease), background .4s; 
//     }

//     .pwd-label { 
//       font-size:.8rem; 
//       color:var(--muted-foreground); 
//     }

//     .type-grid { 
//       display:grid; 
//       grid-template-columns:repeat(4,1fr); 
//       gap:1rem; 
//       margin-bottom:1.25rem; 
//     }

//     .type-opt { cursor:pointer; }
//     .type-opt input { display:none; }

//     .type-opt-inner {
//       border:2px solid var(--border); 
//       border-radius:var(--radius-lg);
//       padding:1.25rem .75rem; 
//       text-align:center;
//       transition:all .3s var(--ease); 
//       background:white;
//     }

//     .type-opt:hover .type-opt-inner { 
//       border-color:var(--primary); 
//       transform:translateY(-3px); 
//     }

//     .type-opt input:checked + .type-opt-inner {
//       border-color:var(--primary); 
//       background:rgba(45,138,94,0.02);
//       box-shadow:0 0 0 3px rgba(45,138,94,0.1);
//     }

//     .type-emoji { font-size:1.75rem; margin-bottom:.5rem; }
//     .type-name { 
//       font-size:.9rem; 
//       font-weight:600; 
//       color:var(--foreground); 
//       margin-bottom:.25rem; 
//     }

//     .type-hint { 
//       font-size:.8rem; 
//       color:var(--muted-foreground); 
//     }

//     .col-type-grid { 
//       display:grid; 
//       grid-template-columns:1fr 1fr; 
//       gap:1.25rem; 
//       margin-bottom:1.25rem; 
//     }

//     .col-type-opt { cursor:pointer; }
//     .col-type-opt input { display:none; }

//     .col-type-inner {
//       border:2px solid var(--border); 
//       border-radius:var(--radius-lg);
//       padding:1.5rem 1.25rem; 
//       text-align:center;
//       transition:all .3s var(--ease); 
//       background:white;
//     }

//     .col-type-opt:hover .col-type-inner { 
//       border-color:var(--primary); 
//       transform:translateY(-3px); 
//     }

//     .col-type-opt input:checked + .col-type-inner {
//       border-color:var(--primary); 
//       background:rgba(45,138,94,0.02);
//       box-shadow:0 0 0 3px rgba(45,138,94,0.1);
//     }

//     .col-type-emoji { font-size:2rem; margin-bottom:.75rem; }
//     .col-type-name { 
//       font-size:1rem; 
//       font-weight:700; 
//       color:var(--foreground); 
//       margin-bottom:.4rem; 
//     }

//     .col-type-desc { 
//       font-size:.85rem; 
//       color:var(--muted-foreground); 
//       line-height:1.5; 
//     }

//     .gps-btn {
//       display:flex; 
//       align-items:center; 
//       gap:.65rem;
//       background:white; 
//       border:1.5px solid var(--border);
//       color:var(--primary); 
//       font-family:var(--ff-body); 
//       font-size:.95rem; 
//       font-weight:600;
//       padding:.7rem 1.25rem; 
//       border-radius:var(--radius); 
//       cursor:pointer;
//       transition:all .25s var(--ease); 
//       width:100%; 
//       justify-content:center;
//     }

//     .gps-btn:hover { 
//       border-color:var(--primary); 
//       background:rgba(45,138,94,0.02); 
//     }

//     .photo-upload {
//       display:flex; 
//       flex-direction:column; 
//       align-items:center; 
//       gap:1rem;
//       padding:2rem; 
//       border:2px dashed var(--border); 
//       border-radius:var(--radius-lg);
//       cursor:pointer; 
//       transition:all .3s var(--ease); 
//       background:white;
//     }

//     .photo-upload:hover { 
//       border-color:var(--primary); 
//       background:rgba(45,138,94,0.02); 
//     }

//     .photo-preview {
//       width:90px; 
//       height:90px; 
//       border-radius:50%;
//       border:3px solid var(--border);
//       object-fit:cover; 
//       background:var(--muted);
//       display:flex; 
//       align-items:center; 
//       justify-content:center;
//       font-size:2.5rem; 
//       overflow:hidden;
//       color:var(--muted-foreground);
//     }

//     .photo-preview img { width:100%; height:100%; object-fit:cover; display:none; }

//     .photo-upload-text { text-align:center; }

//     .photo-upload-text strong { 
//       display:block; 
//       font-size:.95rem; 
//       color:var(--foreground); 
//       margin-bottom:.25rem; 
//     }

//     .photo-upload-text span { 
//       font-size:.85rem; 
//       color:var(--muted-foreground); 
//     }

//     .cgu-row {
//       display:flex; 
//       align-items:flex-start; 
//       gap:.85rem;
//       padding:1.25rem; 
//       border:1.5px solid var(--border);
//       border-radius:var(--radius); 
//       background:white;
//       cursor:pointer; 
//       transition:border-color .2s;
//     }

//     .cgu-row:hover { border-color:var(--primary); }
//     .cgu-row input[type=checkbox] { display:none; }

//     .cgu-box {
//       width:22px; 
//       height:22px; 
//       min-width:22px; 
//       border-radius:6px;
//       border:2px solid var(--border); 
//       background:white;
//       transition:all .2s var(--ease);
//       display:flex; 
//       align-items:center; 
//       justify-content:center;
//       font-size:.8rem; 
//       color:white;
//     }

//     .cgu-row.checked .cgu-box { 
//       background:var(--primary); 
//       border-color:var(--primary); 
//     }

//     .cgu-row.checked .cgu-box::after { content:'✓'; }

//     .cgu-text { 
//       font-size:.9rem; 
//       color:var(--muted-foreground); 
//       line-height:1.6; 
//     }

//     .cgu-text a { 
//       color:var(--primary); 
//       text-decoration:underline;
//     }

//     .form-nav {
//       display:flex; 
//       gap:1rem; 
//       margin-top:2rem;
//     }

//     .btn-back {
//       padding:.9rem 1.75rem; 
//       border-radius:100px;
//       background:transparent; 
//       border:1.5px solid var(--border);
//       color:var(--muted-foreground); 
//       font-family:var(--ff-body); 
//       font-size:.95rem; 
//       font-weight:600;
//       cursor:pointer; 
//       transition:all .2s var(--ease);
//       display:flex; 
//       align-items:center; 
//       gap:.5rem;
//     }

//     .btn-back:hover { 
//       border-color:var(--primary); 
//       color:var(--primary); 
//       background:rgba(45,138,94,0.02); 
//     }

//     .btn-next {
//       flex:1; 
//       padding:.9rem; 
//       border-radius:100px;
//       font-family:var(--ff-body); 
//       font-size:.95rem; 
//       font-weight:700;
//       border:none; 
//       cursor:pointer;
//       display:flex; 
//       align-items:center; 
//       justify-content:center; 
//       gap:.6rem;
//       transition:all .3s var(--spring);
//       background:var(--primary);
//       color:white;
//       box-shadow:0 4px 15px rgba(45,138,94,0.15);
//     }

//     .btn-next:hover { 
//       transform:translateY(-2px); 
//       box-shadow:0 8px 25px rgba(45,138,94,0.25); 
//     }

//     .btn-next svg { transition:transform .3s var(--spring); }
//     .btn-next:hover svg { transform:translateX(4px); }

//     .recap-grid { 
//       display:grid; 
//       grid-template-columns:1fr 1fr; 
//       gap:1rem; 
//       margin-bottom:1.5rem; 
//     }

//     .recap-item {
//       background:var(--muted); 
//       border:1px solid var(--border);
//       border-radius:var(--radius); 
//       padding:1rem;
//     }

//     .recap-label { 
//       font-size:.8rem; 
//       color:var(--muted-foreground); 
//       margin-bottom:.3rem; 
//       text-transform:uppercase; 
//       letter-spacing:.06em; 
//     }

//     .recap-val { 
//       font-size:.95rem; 
//       color:var(--foreground); 
//       font-weight:500; 
//     }

//     .msg-box {
//       padding:1rem 1.25rem; 
//       border-radius:var(--radius);
//       font-size:.9rem; 
//       margin-top:1rem; 
//       display:none;
//     }

//     .msg-box.success { 
//       background:var(--secondary); 
//       border:1px solid var(--primary); 
//       color:var(--secondary-foreground); 
//       display:block; 
//     }

//     .msg-box.error { 
//       background:rgba(220,38,38,0.05); 
//       border:1px solid var(--destructive); 
//       color:var(--destructive); 
//       display:block; 
//     }

//     .msg-box.info { 
//       background:rgba(45,138,94,0.05); 
//       border:1px solid var(--primary); 
//       color:var(--primary); 
//       display:block; 
//     }

//     .success-anim {
//       width:120px; 
//       height:120px; 
//       border-radius:50%; 
//       margin:0 auto 2rem;
//       display:flex; 
//       align-items:center; 
//       justify-content:center;
//       font-size:3.5rem;
//       animation:popIn .6s var(--spring) both;
//       background:var(--secondary); 
//       border:3px solid var(--primary); 
//       box-shadow:0 0 40px rgba(45,138,94,0.15);
//     }

//     @keyframes popIn {
//       from { transform:scale(.3); opacity:0; }
//       to   { transform:scale(1); opacity:1; }
//     }

//     .success-title { 
//       font-family:var(--ff-head); 
//       font-size:2.5rem; 
//       margin-bottom:1rem; 
//       color:var(--foreground);
//       text-align:center;
//     }

//     .success-title em { 
//       color:var(--primary); 
//     }

//     .success-sub { 
//       color:var(--muted-foreground); 
//       font-size:1.05rem; 
//       line-height:1.7; 
//       max-width:420px; 
//       margin:0 auto 2.5rem; 
//       text-align:center;
//     }

//     .success-actions { 
//       display:flex; 
//       gap:1rem; 
//       justify-content:center; 
//       flex-wrap:wrap; 
//     }

//     .btn-go {
//       padding:.9rem 2rem; 
//       border-radius:100px;
//       font-family:var(--ff-body); 
//       font-weight:700; 
//       font-size:1rem;
//       border:none; 
//       cursor:pointer; 
//       transition:all .3s var(--spring);
//     }

//     .btn-go.primary { 
//       background:var(--primary); 
//       color:white; 
//       box-shadow:0 4px 15px rgba(45,138,94,0.2); 
//     }

//     .btn-go.primary:hover { 
//       transform:translateY(-3px); 
//       box-shadow:0 8px 25px rgba(45,138,94,0.3); 
//     }

//     .btn-go.ghost { 
//       background:transparent; 
//       color:var(--muted-foreground); 
//       border:1.5px solid var(--border); 
//     }

//     .btn-go.ghost:hover { 
//       color:var(--foreground); 
//       border-color:var(--primary); 
//     }

//     .auth-link { 
//       text-align:center; 
//       margin-top:1.75rem; 
//       font-size:.95rem; 
//       color:var(--muted-foreground); 
//     }

//     .auth-link a { 
//       color:var(--primary); 
//       font-weight:600; 
//       text-decoration:none; 
//     }

//     .auth-link a:hover { text-decoration:underline; }

//     .divider {
//       height:1px; 
//       background:linear-gradient(90deg,transparent,var(--border),transparent);
//       margin:2rem 0;
//     }

//     @media (max-width:680px) {
//       .roles-grid { grid-template-columns:1fr; }
//       .type-grid { grid-template-columns:repeat(2,1fr); }
//       .field-row, .field-row-3 { grid-template-columns:1fr; }
//       .recap-grid { grid-template-columns:1fr; }
//       .form-card { padding:2rem 1.25rem; }
//       .col-type-grid { grid-template-columns:1fr; }
//       .form-nav { flex-direction:column; }
//       .btn-back { text-align:center; justify-content:center; }
//       nav { padding:1rem 1.25rem; }
//       .logo-img { height:32px; }
//     }
//   `;


//   return (
    
//     <>
//       <style>{styles}</style>
      
//       <div className="ambient ambient-1"></div>
//       <div className="ambient ambient-2"></div>

//       <nav>
//         <img src={logo} alt="EcoCollect" className="logo-img" />
//         <button className="nav-back" onClick={() => window.location.href = '/'}>
//           ← Retour à l'accueil
//         </button>
//       </nav>

//       <div className="page">
//         {/* Barre de progression - entièrement contrôlée par les états React */}
//         <div className="progress-wrap">
//           <div className="progress-steps">
//             <div className="progress-step">
//               <div className={`step-dot ${currentScreen === 1 ? 'active' : ''} ${currentScreen === 2 && formStep > 1 ? 'done' : ''} ${currentScreen === 3 ? 'done' : ''}`}>
//                 {currentScreen === 1 ? '1' : (currentScreen === 2 && formStep === 1) ? '1' : (currentScreen === 2 && formStep > 1) ? '✓' : (currentScreen === 3 ? '✓' : '1')}
//               </div>
//               <div className={`step-label ${currentScreen === 1 || (currentScreen === 2 && formStep >= 1) || currentScreen === 3 ? 'active' : ''}`}>Mon rôle</div>
//             </div>
//             <div className={`step-line ${(currentScreen === 2 && formStep > 1) || currentScreen === 3 ? 'done' : ''}`}></div>
//             <div className="progress-step">
//               <div className={`step-dot ${(currentScreen === 2 && formStep === 2) ? 'active' : ''} ${(currentScreen === 2 && formStep > 2) || currentScreen === 3 ? 'done' : ''}`}>
//                 {(currentScreen === 2 && formStep === 2) ? '2' : ((currentScreen === 2 && formStep > 2) || currentScreen === 3) ? '✓' : '2'}
//               </div>
//               <div className={`step-label ${(currentScreen === 2 && formStep >= 2) || currentScreen === 3 ? 'active' : ''}`}>Mes infos</div>
//             </div>
//             <div className={`step-line ${(currentScreen === 2 && formStep > 2) || currentScreen === 3 ? 'done' : ''}`}></div>
//             <div className="progress-step">
//               <div className={`step-dot ${(currentScreen === 2 && formStep === 3) ? 'active' : ''} ${(currentScreen === 2 && formStep > 3) || currentScreen === 3 ? 'done' : ''}`}>
//                 {(currentScreen === 2 && formStep === 3) ? '3' : ((currentScreen === 2 && formStep > 3) || currentScreen === 3) ? '✓' : '3'}
//               </div>
//               <div className={`step-label ${(currentScreen === 2 && formStep >= 3) || currentScreen === 3 ? 'active' : ''}`}>Confirmation</div>
//             </div>
//             <div className={`step-line ${currentScreen === 3 ? 'done' : ''}`}></div>
//             <div className="progress-step">
//               <div className={`step-dot ${currentScreen === 3 ? 'done' : ''}`}>✓</div>
//               <div className={`step-label ${currentScreen === 3 ? 'active' : ''}`}>C'est parti !</div>
//             </div>
//           </div>
//         </div>

//         {/* ÉCRAN 1 : Choix du rôle */}
//         <div key="screen1" className={`screen ${currentScreen === 1 ? 'active' : ''}`}>
//           <h1 className="screen-title">Quel est <em>votre rôle</em> ?</h1>
//           <p className="screen-sub">Choisissez votre profil pour accéder au formulaire d'inscription adapté à vos besoins.</p>

//           <div className="roles-grid">
//             {/* Producteur */}
//             <div 
//               className={`role-card producteur ${selectedRole === 'producteur' ? 'selected' : ''}`}
//               onClick={() => selectRole('producteur')}
//             >
//               <div className="role-check">✓</div>
//               <div className="role-icon">🏠</div>
//               <h2 className="role-name">Producteur</h2>
//               <p className="role-desc">Vous générez des déchets chez vous, dans votre commerce ou entreprise, et souhaitez les faire collecter ou les déposer dans un point de regroupement.</p>
//               <div className="role-tags">
//                 <span className="role-tag">Ménage</span>
//                 <span className="role-tag">Commerce</span>
//                 <span className="role-tag">Entreprise</span>
//                 <span className="role-tag">Administration</span>
//               </div>
//             </div>

//             {/* Collecteur */}
//             <div 
//               className={`role-card collecteur ${selectedRole === 'collecteur' ? 'selected' : ''}`}
//               onClick={() => selectRole('collecteur')}
//             >
//               <div className="role-check">✓</div>
//               <div className="role-icon">🚛</div>
//               <h2 className="role-name">Collecteur</h2>
//               <p className="role-desc">Vous collectez les déchets chez les producteurs ou récupérez les dépôts dans les points de regroupement. Vous êtes rémunéré par mission validée.</p>
//               <div className="role-tags">
//                 <span className="role-tag">Indépendant</span>
//                 <span className="role-tag">Coopérative</span>
//               </div>
//             </div>
//           </div>

//           <button 
//             className={`btn-continue ${selectedRole ? 'ready' : ''}`}
//             onClick={goToForm}
//           >
//             Continuer avec ce rôle
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M5 12h14M12 5l7 7-7 7"/>
//             </svg>
//           </button>

//           <div className="auth-link">
//             Vous avez déjà un compte ? <a href="/login">Se connecter</a>
//           </div>
//         </div>

//         {/* ÉCRAN 2A : Formulaire Producteur */}
//         <div key="screen-prod" className={`screen ${currentScreen === 2 && selectedRole === 'producteur' ? 'active' : ''}`}>
//           <div className="form-card">
//             <div className="form-role-badge">🏠 Inscription Producteur</div>

//             {/* Étape 1: Identifiants */}
//             <div className={`form-step ${formStep === 1 ? 'active' : ''}`}>
//               <h3 className="step-heading">
//                 <span className="step-heading-num">1</span>
//                 Informations de connexion
//               </h3>

//               <div className="field-row">
//                 <div className={`field ${errors.pEmail ? 'has-error' : ''}`}>
//                   <label><span className="lbl-icon">✉️</span> Email <span className="req">*</span></label>
//                   <input 
//                     type="email" 
//                     placeholder="votre@email.com"
//                     value={producteurForm.email}
//                     onChange={(e) => setProducteurForm({...producteurForm, email: e.target.value})}
//                   />
//                   <span className="field-error">Email invalide</span>
//                 </div>
//                 <div className={`field ${errors.pPhone ? 'has-error' : ''}`}>
//                   <label><span className="lbl-icon">📱</span> Téléphone <span className="req">*</span></label>
//                   <input 
//                     type="tel" 
//                     placeholder="+237 6XX XXX XXX"
//                     value={producteurForm.phone}
//                     onChange={(e) => setProducteurForm({...producteurForm, phone: e.target.value})}
//                   />
//                   <span className="field-error">Téléphone invalide</span>
//                 </div>
//               </div>

//               <div className="field-row">
//                 <div className={`field ${errors.pPassword ? 'has-error' : ''}`}>
//                   <label><span className="lbl-icon">🔒</span> Mot de passe <span className="req">*</span></label>
//                   <div className="input-wrap">
//                     <input 
//                       type={showPPwd ? 'text' : 'password'}
//                       placeholder="Min. 8 caractères"
//                       value={producteurForm.password}
//                       onChange={(e) => {
//                         setProducteurForm({...producteurForm, password: e.target.value});
//                         checkPasswordStrength(e.target.value, 'producteur');
//                       }}
//                     />
//                     <button 
//                       type="button" 
//                       className="input-toggle"
//                       onClick={() => setShowPPwd(!showPPwd)}
//                     >
//                       {showPPwd ? '👁‍🗨' : '👁'}
//                     </button>
//                   </div>
//                   <div className="pwd-strength">
//                     <div className="pwd-bar-wrap">
//                       <div 
//                         className="pwd-bar" 
//                         style={{ 
//                           width: `${passwordStrength.producteur.score * 25}%`,
//                           background: passwordStrength.producteur.score <= 1 ? '#dc2626' : 
//                                      passwordStrength.producteur.score === 2 ? '#e0a020' : 
//                                      passwordStrength.producteur.score >= 3 ? '#2d8a5e' : '#d9e0d9'
//                         }}
//                       ></div>
//                     </div>
//                     <span className="pwd-label">{passwordStrength.producteur.label}</span>
//                   </div>
//                   <span className="field-error">Min. 8 caractères</span>
//                 </div>
//                 <div className={`field ${errors.pPasswordConfirm ? 'has-error' : ''}`}>
//                   <label><span className="lbl-icon">🔒</span> Confirmer <span className="req">*</span></label>
//                   <div className="input-wrap">
//                     <input 
//                       type={showPPwdConfirm ? 'text' : 'password'}
//                       placeholder="Répétez le mot de passe"
//                       value={producteurForm.passwordConfirm}
//                       onChange={(e) => setProducteurForm({...producteurForm, passwordConfirm: e.target.value})}
//                     />
//                     <button 
//                       type="button" 
//                       className="input-toggle"
//                       onClick={() => setShowPPwdConfirm(!showPPwdConfirm)}
//                     >
//                       {showPPwdConfirm ? '👁‍🗨' : '👁'}
//                     </button>
//                   </div>
//                   <span className="field-error">Les mots de passe ne correspondent pas</span>
//                 </div>
//               </div>

//               <div className="form-nav">
//                 <button type="button" className="btn-back" onClick={goBack}>← Retour</button>
//                 <button type="button" className="btn-next" onClick={() => pNext(1)}>
//                   Étape suivante
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//                 </button>
//               </div>
//             </div>

//             {/* Étape 2: Profil */}
//             <div className={`form-step ${formStep === 2 ? 'active' : ''}`}>
//               <h3 className="step-heading">
//                 <span className="step-heading-num">2</span>
//                 Votre profil
//               </h3>

//               <div className={`field ${errors.pNomComplet ? 'has-error' : ''}`}>
//                 <label><span className="lbl-icon">👤</span> Nom complet / Raison sociale <span className="req">*</span></label>
//                 <input 
//                   type="text" 
//                   placeholder="Jean Dupont ou ETS Dupont"
//                   value={producteurForm.nomComplet}
//                   onChange={(e) => setProducteurForm({...producteurForm, nomComplet: e.target.value})}
//                 />
//                 <span className="field-error">Champ requis</span>
//               </div>

//               <div className="field">
//                 <label><span className="lbl-icon">🏷️</span> Type de producteur <span className="req">*</span></label>
//                 <div className="type-grid">
//                   {['menage', 'commerce', 'entreprise', 'administration'].map((type) => (
//                     <label className="type-opt" key={type}>
//                       <input 
//                         type="radio" 
//                         name="p-type" 
//                         value={type}
//                         checked={producteurForm.type === type}
//                         onChange={(e) => setProducteurForm({...producteurForm, type: e.target.value})}
//                       />
//                       <div className="type-opt-inner">
//                         <div className="type-emoji">
//                           {type === 'menage' && '🏠'}
//                           {type === 'commerce' && '🏪'}
//                           {type === 'entreprise' && '🏭'}
//                           {type === 'administration' && '🏛️'}
//                         </div>
//                         <div className="type-name">
//                           {type === 'menage' && 'Ménage'}
//                           {type === 'commerce' && 'Commerce'}
//                           {type === 'entreprise' && 'Entreprise'}
//                           {type === 'administration' && 'Administration'}
//                         </div>
//                         <div className="type-hint">
//                           {type === 'menage' && 'Particulier'}
//                           {type === 'commerce' && 'Boutique / Resto'}
//                           {type === 'entreprise' && 'PME / Industrie'}
//                           {type === 'administration' && 'Service public'}
//                         </div>
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//                 {errors.pType && <span className="field-error">Sélectionnez un type</span>}
//               </div>

//               <div className="form-nav">
//                 <button type="button" className="btn-back" onClick={() => pPrev(1)}>← Retour</button>
//                 <button type="button" className="btn-next" onClick={() => pNext(2)}>
//                   Étape suivante
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//                 </button>
//               </div>
//             </div>

//             {/* Étape 3: Localisation */}
//             <div className={`form-step ${formStep === 3 ? 'active' : ''}`}>
//               <h3 className="step-heading">
//                 <span className="step-heading-num">3</span>
//                 Localisation
//               </h3>

//               <div className={`field ${errors.pAdresse ? 'has-error' : ''}`}>
//                 <label><span className="lbl-icon">📍</span> Adresse complète <span className="req">*</span></label>
//                 <input 
//                   type="text" 
//                   placeholder="Ex: Rue de la Paix, Immeuble ABC, Apt. 12"
//                   value={producteurForm.adresse}
//                   onChange={(e) => setProducteurForm({...producteurForm, adresse: e.target.value})}
//                 />
//                 <span className="field-error">Champ requis</span>
//               </div>

//               <div className="field-row">
//                 <div className={`field ${errors.pQuartier ? 'has-error' : ''}`}>
//                   <label><span className="lbl-icon">🏘️</span> Quartier <span className="req">*</span></label>
//                   <input 
//                     type="text" 
//                     placeholder="Ex: Akwa"
//                     value={producteurForm.quartier}
//                     onChange={(e) => setProducteurForm({...producteurForm, quartier: e.target.value})}
//                   />
//                   <span className="field-error">Champ requis</span>
//                 </div>
//                 <div className={`field ${errors.pCommune ? 'has-error' : ''}`}>
//                   <label><span className="lbl-icon">🏙️</span> Commune <span className="req">*</span></label>
//                   <input 
//                     type="text" 
//                     placeholder="Ex: Douala 1er"
//                     value={producteurForm.commune}
//                     onChange={(e) => setProducteurForm({...producteurForm, commune: e.target.value})}
//                   />
//                   <span className="field-error">Champ requis</span>
//                 </div>
//               </div>

//               <div className="field">
//                 <label><span className="lbl-icon">🛰️</span> Coordonnées GPS <span style={{fontWeight:400,color:'var(--muted-foreground)'}}>(optionnel)</span></label>
//                 <button type="button" className="gps-btn" onClick={getGPS}>
//                   📡 Utiliser ma position actuelle
//                 </button>
//               </div>
//               <div className="field-row" style={{marginTop:'.75rem'}}>
//                 <div className="field">
//                   <label style={{fontSize:'.8rem'}}>Latitude</label>
//                   <input 
//                     type="number" 
//                     step="0.000001" 
//                     placeholder="4.0511"
//                     value={producteurForm.latitude}
//                     onChange={(e) => setProducteurForm({...producteurForm, latitude: e.target.value})}
//                   />
//                 </div>
//                 <div className="field">
//                   <label style={{fontSize:'.8rem'}}>Longitude</label>
//                   <input 
//                     type="number" 
//                     step="0.000001" 
//                     placeholder="9.7679"
//                     value={producteurForm.longitude}
//                     onChange={(e) => setProducteurForm({...producteurForm, longitude: e.target.value})}
//                   />
//                 </div>
//               </div>

//               <div className="form-nav">
//                 <button type="button" className="btn-back" onClick={() => pPrev(2)}>← Retour</button>
//                 <button type="button" className="btn-next" onClick={() => pNext(3)}>
//                   Étape suivante
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//                 </button>
//               </div>
//             </div>

//             {/* Étape 4: Confirmation */}
//             <div className={`form-step ${formStep === 4 ? 'active' : ''}`}>
//               <h3 className="step-heading">
//                 <span className="step-heading-num">4</span>
//                 Vérification & Confirmation
//               </h3>

//               {getProducteurRecap()}

//               <label 
//                 className={`cgu-row ${producteurForm.cgu ? 'checked' : ''}`}
//                 onClick={() => setProducteurForm({...producteurForm, cgu: !producteurForm.cgu})}
//               >
//                 <input type="checkbox" checked={producteurForm.cgu} readOnly />
//                 <div className="cgu-box"></div>
//                 <div className="cgu-text">
//                   J'accepte les <a href="#" onClick={(e) => e.preventDefault()}>Conditions Générales d'Utilisation</a> et la <a href="#" onClick={(e) => e.preventDefault()}>Politique de Confidentialité</a> d'EcoCollect. <span className="req" style={{color:'var(--primary)'}}>*</span>
//                 </div>
//               </label>

//               {message.text && message.type !== 'success' && (
//                 <div className={`msg-box ${message.type}`}>
//                   {message.text}
//                 </div>
//               )}

//               <div className="form-nav">
//                 <button type="button" className="btn-back" onClick={() => pPrev(3)}>← Retour</button>
//                 <button 
//                   type="button" 
//                   className="btn-next" 
//                   onClick={submitProducteur}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Création...' : '🚀 Créer mon compte'}
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="auth-link">
//             Vous avez déjà un compte ? <a href="/login">Se connecter</a>
//           </div>
//         </div>

//         {/* ÉCRAN 2B : Formulaire Collecteur */}
//         <div key="screen-col" className={`screen ${currentScreen === 2 && selectedRole === 'collecteur' ? 'active' : ''}`}>
//           <div className="form-card">
//             <div className="form-role-badge">🚛 Inscription Collecteur</div>

//             {/* Étape 1: Identifiants */}
//             <div className={`form-step ${formStep === 1 ? 'active' : ''}`}>
//               <h3 className="step-heading">
//                 <span className="step-heading-num">1</span>
//                 Informations de connexion
//               </h3>

//               <div className="field-row">
//                 <div className={`field ${errors.cEmail ? 'has-error' : ''}`}>
//                   <label><span className="lbl-icon">✉️</span> Email <span className="req">*</span></label>
//                   <input 
//                     type="email" 
//                     placeholder="votre@email.com"
//                     value={collecteurForm.email}
//                     onChange={(e) => setCollecteurForm({...collecteurForm, email: e.target.value})}
//                   />
//                   <span className="field-error">Email invalide</span>
//                 </div>
//                 <div className={`field ${errors.cPhone ? 'has-error' : ''}`}>
//                   <label><span className="lbl-icon">📱</span> Téléphone <span className="req">*</span></label>
//                   <input 
//                     type="tel" 
//                     placeholder="+237 6XX XXX XXX"
//                     value={collecteurForm.phone}
//                     onChange={(e) => setCollecteurForm({...collecteurForm, phone: e.target.value})}
//                   />
//                   <span className="field-error">Téléphone invalide</span>
//                 </div>
//               </div>

//               <div className="field-row">
//                 <div className={`field ${errors.cPassword ? 'has-error' : ''}`}>
//                   <label><span className="lbl-icon">🔒</span> Mot de passe <span className="req">*</span></label>
//                   <div className="input-wrap">
//                     <input 
//                       type={showCPwd ? 'text' : 'password'}
//                       placeholder="Min. 8 caractères"
//                       value={collecteurForm.password}
//                       onChange={(e) => {
//                         setCollecteurForm({...collecteurForm, password: e.target.value});
//                         checkPasswordStrength(e.target.value, 'collecteur');
//                       }}
//                     />
//                     <button 
//                       type="button" 
//                       className="input-toggle"
//                       onClick={() => setShowCPwd(!showCPwd)}
//                     >
//                       {showCPwd ? '👁‍🗨' : '👁'}
//                     </button>
//                   </div>
//                   <div className="pwd-strength">
//                     <div className="pwd-bar-wrap">
//                       <div 
//                         className="pwd-bar" 
//                         style={{ 
//                           width: `${passwordStrength.collecteur.score * 25}%`,
//                           background: passwordStrength.collecteur.score <= 1 ? '#dc2626' : 
//                                      passwordStrength.collecteur.score === 2 ? '#e0a020' : 
//                                      passwordStrength.collecteur.score >= 3 ? '#2d8a5e' : '#d9e0d9'
//                         }}
//                       ></div>
//                     </div>
//                     <span className="pwd-label">{passwordStrength.collecteur.label}</span>
//                   </div>
//                   <span className="field-error">Min. 8 caractères</span>
//                 </div>
//                 <div className={`field ${errors.cPasswordConfirm ? 'has-error' : ''}`}>
//                   <label><span className="lbl-icon">🔒</span> Confirmer <span className="req">*</span></label>
//                   <div className="input-wrap">
//                     <input 
//                       type={showCPwdConfirm ? 'text' : 'password'}
//                       placeholder="Répétez le mot de passe"
//                       value={collecteurForm.passwordConfirm}
//                       onChange={(e) => setCollecteurForm({...collecteurForm, passwordConfirm: e.target.value})}
//                     />
//                     <button 
//                       type="button" 
//                       className="input-toggle"
//                       onClick={() => setShowCPwdConfirm(!showCPwdConfirm)}
//                     >
//                       {showCPwdConfirm ? '👁‍🗨' : '👁'}
//                     </button>
//                   </div>
//                   <span className="field-error">Les mots de passe ne correspondent pas</span>
//                 </div>
//               </div>

//               <div className="form-nav">
//                 <button type="button" className="btn-back" onClick={goBack}>← Retour</button>
//                 <button type="button" className="btn-next" onClick={() => cNext(1)}>
//                   Étape suivante
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//                 </button>
//               </div>
//             </div>

//             {/* Étape 2: Identité */}
//             <div className={`form-step ${formStep === 2 ? 'active' : ''}`}>
//               <h3 className="step-heading">
//                 <span className="step-heading-num">2</span>
//                 Identité & Type
//               </h3>

//               <div className={`field ${errors.cNomComplet ? 'has-error' : ''}`}>
//                 <label><span className="lbl-icon">👤</span> Nom complet <span className="req">*</span></label>
//                 <input 
//                   type="text" 
//                   placeholder="Jean Dupont"
//                   value={collecteurForm.nomComplet}
//                   onChange={(e) => setCollecteurForm({...collecteurForm, nomComplet: e.target.value})}
//                 />
//                 <span className="field-error">Champ requis</span>
//               </div>

//               <div className="field">
//                 <label><span className="lbl-icon">🔖</span> Type de collecteur <span className="req">*</span></label>
//                 <div className="col-type-grid">
//                   <label className="col-type-opt">
//                     <input 
//                       type="radio" 
//                       name="c-type" 
//                       value="independant"
//                       checked={collecteurForm.type === 'independant'}
//                       onChange={(e) => setCollecteurForm({...collecteurForm, type: e.target.value})}
//                     />
//                     <div className="col-type-inner">
//                       <div className="col-type-emoji">🧑‍💼</div>
//                       <div className="col-type-name">Indépendant</div>
//                       <div className="col-type-desc">Vous travaillez seul et êtes directement rémunéré par mission</div>
//                     </div>
//                   </label>
//                   <label className="col-type-opt">
//                     <input 
//                       type="radio" 
//                       name="c-type" 
//                       value="cooperative"
//                       checked={collecteurForm.type === 'cooperative'}
//                       onChange={(e) => setCollecteurForm({...collecteurForm, type: e.target.value})}
//                     />
//                     <div className="col-type-inner">
//                       <div className="col-type-emoji">🤝</div>
//                       <div className="col-type-name">Coopérative</div>
//                       <div className="col-type-desc">Vous faites partie d'une structure collective de collecte</div>
//                     </div>
//                   </label>
//                 </div>
//                 {errors.cType && <span className="field-error">Sélectionnez un type</span>}
//               </div>

//               <div className="field">
//                 <label><span className="lbl-icon">🪪</span> Numéro d'identité <span style={{fontWeight:400,color:'var(--muted-foreground)'}}>(indépendant)</span></label>
//                 <input 
//                   type="text" 
//                   placeholder="CNI, Passeport..."
//                   value={collecteurForm.identite}
//                   onChange={(e) => setCollecteurForm({...collecteurForm, identite: e.target.value})}
//                 />
//                 <span className="field-hint">Requis pour les collecteurs indépendants</span>
//               </div>

//               <div className="form-nav">
//                 <button type="button" className="btn-back" onClick={() => cPrev(1)}>← Retour</button>
//                 <button type="button" className="btn-next" onClick={() => cNext(2)}>
//                   Étape suivante
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//                 </button>
//               </div>
//             </div>

//             {/* Étape 3: Zone & Documents */}
//             <div className={`form-step ${formStep === 3 ? 'active' : ''}`}>
//               <h3 className="step-heading">
//                 <span className="step-heading-num">3</span>
//                 Zone d'intervention & Documents
//               </h3>

//               <div className={`field ${errors.cZone ? 'has-error' : ''}`}>
//                 <label><span className="lbl-icon">🗺️</span> Nom de la zone <span className="req">*</span></label>
//                 <input 
//                   type="text" 
//                   placeholder="Ex: Zone Centre-ville"
//                   value={collecteurForm.zone}
//                   onChange={(e) => setCollecteurForm({...collecteurForm, zone: e.target.value})}
//                 />
//                 <span className="field-error">Champ requis</span>
//               </div>

//               <div className="field-row">
//                 <div className="field">
//                   <label><span className="lbl-icon">📌</span> Quartiers habituels</label>
//                   <input 
//                     type="text" 
//                     placeholder="Akwa, Bonanjo..."
//                     value={collecteurForm.quartiers}
//                     onChange={(e) => setCollecteurForm({...collecteurForm, quartiers: e.target.value})}
//                   />
//                   <span className="field-hint">Séparés par des virgules</span>
//                 </div>
//                 <div className="field">
//                   <label><span className="lbl-icon">🏙️</span> Communes</label>
//                   <input 
//                     type="text" 
//                     placeholder="Douala 1, Douala 3..."
//                     value={collecteurForm.communes}
//                     onChange={(e) => setCollecteurForm({...collecteurForm, communes: e.target.value})}
//                   />
//                   <span className="field-hint">Séparées par des virgules</span>
//                 </div>
//               </div>

//               {/* Photo de profil */}
//               <div className={`field ${errors.cPhoto ? 'has-error' : ''}`}>
//                 <label><span className="lbl-icon">📸</span> Photo de profil <span className="req">*</span></label>
//                 <div className="photo-upload" onClick={() => triggerFileInput(photoInputRef)}>
//                   <div className="photo-preview">
//                     {photoPreview ? (
//                       <img src={photoPreview} alt="Prévisualisation" style={{display: 'block'}} />
//                     ) : (
//                       <span>📷</span>
//                     )}
//                   </div>
//                   <div className="photo-upload-text">
//                     <strong>Cliquez pour choisir une photo</strong>
//                     <span>JPG, PNG — Max. 5 Mo</span>
//                   </div>
//                 </div>
//                 <input 
//                   type="file" 
//                   ref={photoInputRef}
//                   accept="image/*" 
//                   style={{display:'none'}}
//                   onChange={(e) => handlePhotoUpload(e, 'photo')}
//                 />
//                 {errors.cPhoto && <span className="field-error">Photo requise</span>}
//               </div>

//               {/* Photo CNI Recto */}
//               <div className={`field ${errors.cCniRecto ? 'has-error' : ''}`}>
//                 <label><span className="lbl-icon">🪪</span> Photo CNI Recto <span className="req">*</span></label>
//                 <div className="photo-upload" onClick={() => triggerFileInput(cniRectoInputRef)}>
//                   <div className="photo-preview">
//                     {cniRectoPreview ? (
//                       <img src={cniRectoPreview} alt="CNI Recto" style={{display: 'block'}} />
//                     ) : (
//                       <span>📄 Recto</span>
//                     )}
//                   </div>
//                   <div className="photo-upload-text">
//                     <strong>Cliquez pour charger le recto de votre CNI</strong>
//                     <span>JPG, PNG — Max. 5 Mo</span>
//                   </div>
//                 </div>
//                 <input 
//                   type="file" 
//                   ref={cniRectoInputRef}
//                   accept="image/*" 
//                   style={{display:'none'}}
//                   onChange={(e) => handlePhotoUpload(e, 'recto')}
//                 />
//                 {errors.cCniRecto && <span className="field-error">CNI recto requise</span>}
//               </div>

//               {/* Photo CNI Verso */}
//               <div className={`field ${errors.cCniVerso ? 'has-error' : ''}`}>
//                 <label><span className="lbl-icon">🪪</span> Photo CNI Verso <span className="req">*</span></label>
//                 <div className="photo-upload" onClick={() => triggerFileInput(cniVersoInputRef)}>
//                   <div className="photo-preview">
//                     {cniVersoPreview ? (
//                       <img src={cniVersoPreview} alt="CNI Verso" style={{display: 'block'}} />
//                     ) : (
//                       <span>📄 Verso</span>
//                     )}
//                   </div>
//                   <div className="photo-upload-text">
//                     <strong>Cliquez pour charger le verso de votre CNI</strong>
//                     <span>JPG, PNG — Max. 5 Mo</span>
//                   </div>
//                 </div>
//                 <input 
//                   type="file" 
//                   ref={cniVersoInputRef}
//                   accept="image/*" 
//                   style={{display:'none'}}
//                   onChange={(e) => handlePhotoUpload(e, 'verso')}
//                 />
//                 {errors.cCniVerso && <span className="field-error">CNI verso requise</span>}
//               </div>

//               <div className="form-nav">
//                 <button type="button" className="btn-back" onClick={() => cPrev(2)}>← Retour</button>
//                 <button type="button" className="btn-next" onClick={() => cNext(3)}>
//                   Étape suivante
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//                 </button>
//               </div>
//             </div>

//             {/* Étape 4: Confirmation */}
//             <div className={`form-step ${formStep === 4 ? 'active' : ''}`}>
//               <h3 className="step-heading">
//                 <span className="step-heading-num">4</span>
//                 Vérification & Confirmation
//               </h3>

//               {getCollecteurRecap()}

//               <label 
//                 className={`cgu-row ${collecteurForm.cgu ? 'checked' : ''}`}
//                 onClick={() => setCollecteurForm({...collecteurForm, cgu: !collecteurForm.cgu})}
//               >
//                 <input type="checkbox" checked={collecteurForm.cgu} readOnly />
//                 <div className="cgu-box"></div>
//                 <div className="cgu-text">
//                   J'accepte les <a href="#" onClick={(e) => e.preventDefault()}>Conditions Générales d'Utilisation</a> et la <a href="#" onClick={(e) => e.preventDefault()}>Politique de Confidentialité</a> d'EcoCollect. <span className="req" style={{color:'var(--primary)'}}>*</span>
//                 </div>
//               </label>

//               {message.text && message.type !== 'success' && (
//                 <div className={`msg-box ${message.type}`}>
//                   {message.text}
//                 </div>
//               )}

//               <div className="form-nav">
//                 <button type="button" className="btn-back" onClick={() => cPrev(3)}>← Retour</button>
//                 <button 
//                   type="button" 
//                   className="btn-next" 
//                   onClick={submitCollecteur}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Création...' : '🚀 Créer mon compte'}
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="auth-link">
//             Vous avez déjà un compte ? <a href="/login">Se connecter</a>
//           </div>
//         </div>

//         {/* ÉCRAN 3 : Succès */}
//         <div key="screen-success" className={`screen ${currentScreen === 3 ? 'active' : ''}`}>
//           <div className="form-card" style={{textAlign:'center', padding:'4rem 3rem'}}>
//             <div className="success-anim">🎉</div>
//             <h2 className="success-title">
//               Félicitations <em>{selectedRole === 'producteur' ? producteurForm.nomComplet?.split(' ')[0] : collecteurForm.nomComplet?.split(' ')[0]} !</em>
//             </h2>
//             <p className="success-sub">
//               Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter et commencer à utiliser EcoCollect.
//             </p>
//             <div className="success-actions">
//               <button className="btn-go primary" onClick={() => window.location.href = '/login'}>
//                 Se connecter
//               </button>
//               <button className="btn-go ghost" onClick={() => window.location.href = '/'}>
//                 Retour à l'accueil
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;




import React, { useState, useRef, useEffect, useCallback } from 'react';
import logo from '../assets/logo.jpeg';

// ============================================================
// CONSTANTES & UTILITAIRES
// ============================================================

const API_URL = 'https://ecocollect.cm';

// Types de producteurs
const PRODUCTEUR_TYPES = {
  menage: { label: 'Ménage', icon: '🏠', desc: 'Particulier' },
  commerce: { label: 'Commerce', icon: '🏪', desc: 'Boutique / Resto' },
  entreprise: { label: 'Entreprise', icon: '🏭', desc: 'PME / Industrie' },
  administration: { label: 'Administration', icon: '🏛️', desc: 'Service public' }
};

// Types de collecteurs
const COLLECTEUR_TYPES = {
  independant: { label: 'Indépendant', icon: '🧑‍💼', desc: 'Rémunéré directement par mission' },
  cooperative: { label: 'Coopérative', icon: '🤝', desc: 'Structure collective de collecte' }
};

// Évaluation de la force du mot de passe
const evaluatePasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const labels = ['Très faible', 'Faible', 'Moyen', 'Bon', 'Fort'];
  return { score, label: labels[score] };
};

// Validation d'email
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

const Register = () => {
  // État de navigation
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // États des formulaires
  const [producteurForm, setProducteurForm] = useState({
    email: '', phone: '', password: '', passwordConfirm: '',
    nomComplet: '', type: '', adresse: '', quartier: '', commune: '',
    latitude: '', longitude: '', cgu: false
  });

  const [collecteurForm, setCollecteurForm] = useState({
    email: '', phone: '', password: '', passwordConfirm: '',
    nomComplet: '', type: '', identite: '', zone: '', quartiers: '', communes: '',
    photo: null, photoCniRecto: null, photoCniVerso: null,
    cgu: false
  });

  // États d'affichage des mots de passe
  const [showPasswords, setShowPasswords] = useState({
    producteur: { pwd: false, confirm: false },
    collecteur: { pwd: false, confirm: false }
  });

  // États des erreurs
  const [errors, setErrors] = useState({});

  // Force des mots de passe
  const [passwordStrength, setPasswordStrength] = useState({
    producteur: { score: 0, label: 'Très faible' },
    collecteur: { score: 0, label: 'Très faible' }
  });

  // Prévisualisations des images
  const [previews, setPreviews] = useState({
    photo: null,
    cniRecto: null,
    cniVerso: null
  });

  // Refs pour les inputs de fichiers
  const fileInputRefs = {
    photo: useRef(null),
    cniRecto: useRef(null),
    cniVerso: useRef(null)
  };

  // Effets
  useEffect(() => {
    setFormStep(1);
    setErrors({});
  }, [selectedRole]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // ============================================================
  // GESTIONNAIRES D'ÉVÉNEMENTS
  // ============================================================

  const selectRole = useCallback((role) => {
    setSelectedRole(role);
    setFormStep(1);
    setErrors({});
    setMessage({ type: '', text: '' });
  }, []);

  const goToForm = useCallback(() => {
    if (selectedRole) {
      setCurrentScreen(2);
      setFormStep(1);
    }
  }, [selectedRole]);

  const handlePasswordChange = useCallback((role, value) => {
    const strength = evaluatePasswordStrength(value);
    setPasswordStrength(prev => ({ ...prev, [role]: strength }));
    
    if (role === 'producteur') {
      setProducteurForm(prev => ({ ...prev, password: value }));
    } else {
      setCollecteurForm(prev => ({ ...prev, password: value }));
    }
  }, []);

  const handleFileUpload = useCallback((event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Le fichier ne doit pas dépasser 5 Mo' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setPreviews(prev => ({ ...prev, [type]: result }));
      
      if (type === 'photo') {
        setCollecteurForm(prev => ({ ...prev, photo: file }));
      } else if (type === 'cniRecto') {
        setCollecteurForm(prev => ({ ...prev, photoCniRecto: file }));
      } else if (type === 'cniVerso') {
        setCollecteurForm(prev => ({ ...prev, photoCniVerso: file }));
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setMessage({ type: 'error', text: 'La géolocalisation n\'est pas supportée par votre navigateur' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setProducteurForm(prev => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString()
        }));
        setMessage({ type: 'success', text: 'Position GPS obtenue avec succès !' });
      },
      () => {
        setMessage({ type: 'error', text: 'Impossible d\'obtenir votre position. Vérifiez vos paramètres de localisation.' });
      }
    );
  }, []);

  // ============================================================
  // VALIDATIONS
  // ============================================================

  const validateProducteurStep = useCallback((step) => {
    const newErrors = {};

    if (step === 1) {
      if (!producteurForm.email) newErrors.pEmail = 'Email requis';
      else if (!isValidEmail(producteurForm.email)) newErrors.pEmail = 'Email invalide';
      
      if (!producteurForm.phone) newErrors.pPhone = 'Téléphone requis';
      if (!producteurForm.password) newErrors.pPassword = 'Mot de passe requis';
      else if (producteurForm.password.length < 8) newErrors.pPassword = 'Minimum 8 caractères';
      
      if (producteurForm.password !== producteurForm.passwordConfirm) {
        newErrors.pPasswordConfirm = 'Les mots de passe ne correspondent pas';
      }
    } 
    else if (step === 2) {
      if (!producteurForm.nomComplet) newErrors.pNomComplet = 'Nom complet requis';
      if (!producteurForm.type) newErrors.pType = 'Type de producteur requis';
    } 
    else if (step === 3) {
      if (!producteurForm.adresse) newErrors.pAdresse = 'Adresse requise';
      if (!producteurForm.quartier) newErrors.pQuartier = 'Quartier requis';
      if (!producteurForm.commune) newErrors.pCommune = 'Commune requise';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }, [producteurForm]);

  const validateCollecteurStep = useCallback((step) => {
    const newErrors = {};

    if (step === 1) {
      if (!collecteurForm.email) newErrors.cEmail = 'Email requis';
      else if (!isValidEmail(collecteurForm.email)) newErrors.cEmail = 'Email invalide';
      
      if (!collecteurForm.phone) newErrors.cPhone = 'Téléphone requis';
      if (!collecteurForm.password) newErrors.cPassword = 'Mot de passe requis';
      else if (collecteurForm.password.length < 8) newErrors.cPassword = 'Minimum 8 caractères';
      
      if (collecteurForm.password !== collecteurForm.passwordConfirm) {
        newErrors.cPasswordConfirm = 'Les mots de passe ne correspondent pas';
      }
    }
    else if (step === 2) {
      if (!collecteurForm.nomComplet) newErrors.cNomComplet = 'Nom complet requis';
      if (!collecteurForm.type) newErrors.cType = 'Type de collecteur requis';
    }
    else if (step === 3) {
      if (!collecteurForm.zone) newErrors.cZone = 'Zone de collecte requise';
      if (!collecteurForm.photo) newErrors.cPhoto = 'Photo de profil requise';
      if (!collecteurForm.photoCniRecto) newErrors.cCniRecto = 'Photo CNI recto requise';
      if (!collecteurForm.photoCniVerso) newErrors.cCniVerso = 'Photo CNI verso requise';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }, [collecteurForm]);

  const nextStep = useCallback((role, step) => {
    const isValid = role === 'producteur' 
      ? validateProducteurStep(step) 
      : validateCollecteurStep(step);
    
    if (isValid) setFormStep(step + 1);
  }, [validateProducteurStep, validateCollecteurStep]);

  // ============================================================
  // SOUMISSION DES FORMULAIRES
  // ============================================================

  const submitProducteur = useCallback(async () => {
    if (!producteurForm.cgu) {
      setMessage({ type: 'error', text: 'Vous devez accepter les conditions générales d\'utilisation' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: 'info', text: 'Création de votre compte en cours...' });

    try {
      const response = await fetch(`${API_URL}/api/auth/inscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: producteurForm.email.trim(),
          telephone: producteurForm.phone.trim(),
          motDePasse: producteurForm.password,
          typeProducteur: producteurForm.type,
          nomComplet: producteurForm.nomComplet.trim(),
          adresse: producteurForm.adresse.trim(),
          quartier: producteurForm.quartier.trim(),
          commune: producteurForm.commune.trim(),
          cguAcceptees: producteurForm.cgu,
          ...(producteurForm.latitude && { latitude: parseFloat(producteurForm.latitude) }),
          ...(producteurForm.longitude && { longitude: parseFloat(producteurForm.longitude) })
        })
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentScreen(3);
        if (data.token) localStorage.setItem('auth_token', data.token);
      } else {
        setMessage({ type: 'error', text: data.message || 'Erreur lors de l\'inscription' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' });
    } finally {
      setIsLoading(false);
    }
  }, [producteurForm]);

  // Dans submitCollecteur (lignes 510-525)
const submitCollecteur = useCallback(async () => {
  if (!collecteurForm.cgu) {
    setMessage({ type: 'error', text: 'Vous devez accepter les conditions générales d\'utilisation' });
    return;
  }

  setIsLoading(true);
  setMessage({ type: 'info', text: 'Création de votre compte en cours...' });

  try {
    const formData = new FormData();
    
    // Ajouter les champs texte avec les BONS NOMS
    formData.append('email', collecteurForm.email.trim());
    formData.append('telephone', collecteurForm.phone.trim());
    formData.append('motDePasse', collecteurForm.password);
    formData.append('typeCollecteur', collecteurForm.type);
    formData.append('nomComplet', collecteurForm.nomComplet.trim());
    formData.append('zoneInterventionNom', collecteurForm.zone.trim()); // ← Changé
    formData.append('cguAcceptees', collecteurForm.cgu);
    
    // Ajouter les champs optionnels avec les BONS NOMS
    if (collecteurForm.identite) {
      formData.append('numeroIdentite', collecteurForm.identite.trim()); // ← Changé
    }
    if (collecteurForm.quartiers) {
      formData.append('quartiersHabituels', collecteurForm.quartiers.trim()); // ← Changé
    }
    if (collecteurForm.communes) {
      formData.append('communesIntervention', collecteurForm.communes.trim()); // ← Changé
    }
    
    // Ajouter les fichiers
    if (collecteurForm.photo) {
      formData.append('photoProfilUrl', collecteurForm.photo); // ← Changé
    }
    if (collecteurForm.photoCniRecto) {
      formData.append('photoCniRectoUrl', collecteurForm.photoCniRecto); // ← Changé
    }
    if (collecteurForm.photoCniVerso) {
      formData.append('photoCniVersoUrl', collecteurForm.photoCniVerso); // ← Changé
    }

    const response = await fetch(`${API_URL}/api/collecteurs/inscription`, {
      method: 'POST',
      body: formData  // Ne pas mettre Content-Type
    });

    const data = await response.json();

    if (response.ok) {
      setCurrentScreen(3);
      if (data.token) localStorage.setItem('auth_token', data.token);
    } else {
      setMessage({ type: 'error', text: data.message || 'Erreur lors de l\'inscription' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    setMessage({ type: 'error', text: 'Erreur de connexion au serveur' });
  } finally {
    setIsLoading(false);
  }
}, [collecteurForm]);

  // ============================================================
  // RENDU DES COMPOSANTS
  // ============================================================

  const renderProgressBar = () => {
    const steps = [
      { label: 'Mon rôle', screen: 1 },
      { label: 'Mes infos', screen: 2 },
      { label: 'Confirmation', screen: 2 },
      { label: 'C\'est parti !', screen: 3 }
    ];

    return (
      <div className="reg-progress-steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className="reg-progress-step">
              <div className={`reg-step-dot ${
                currentScreen > step.screen || (currentScreen === step.screen && formStep > index + 1) ? 'done' :
                currentScreen === step.screen && formStep === index + 1 ? 'active' : ''
              }`}>
                {currentScreen > step.screen || (currentScreen === step.screen && formStep > index + 1) ? '✓' : index + 1}
              </div>
              <div className={`reg-step-label ${currentScreen >= step.screen ? 'active' : ''}`}>
                {step.label}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`reg-step-line ${
                currentScreen > step.screen || (currentScreen === step.screen && formStep > index + 1) ? 'done' : ''
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderMessage = () => {
    if (!message.text) return null;
    return <div className={`reg-message ${message.type}`}>{message.text}</div>;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="reg-root">
        <div className="reg-ambient reg-ambient-1" />
        <div className="reg-ambient reg-ambient-2" />

        <nav className="reg-nav">
          <img src={logo} alt="EcoCollect" />
          <button 
            className="reg-nav-back" 
            onClick={() => window.location.href = '/'}
            type="button"
          >
            ← Retour à l'accueil
          </button>
        </nav>

        <div className="reg-page">
          <div className="reg-progress-wrap">
            {renderProgressBar()}
          </div>

          {/* Écran 1 : Sélection du rôle */}
          {currentScreen === 1 && (
            <div className="reg-card">
              <h1 className="reg-title">Quel est votre rôle ?</h1>
              <p className="reg-subtitle">
                Choisissez votre profil pour accéder au formulaire d'inscription adapté.
              </p>
              
              <div className="reg-roles">
                <button
                  className={`reg-role-card ${selectedRole === 'producteur' ? 'selected' : ''}`}
                  onClick={() => selectRole('producteur')}
                  type="button"
                >
                  <div className="reg-role-check">✓</div>
                  <div className="reg-role-icon">🏠</div>
                  <div className="reg-role-title">Producteur</div>
                  <div className="reg-role-desc">
                    Vous générez des déchets et souhaitez les faire collecter.
                  </div>
                  <div className="reg-role-tags">
                    <span className="reg-role-tag">Ménage</span>
                    <span className="reg-role-tag">Commerce</span>
                    <span className="reg-role-tag">Entreprise</span>
                    <span className="reg-role-tag">Administration</span>
                  </div>
                </button>

                <button
                  className={`reg-role-card ${selectedRole === 'collecteur' ? 'selected' : ''}`}
                  onClick={() => selectRole('collecteur')}
                  type="button"
                >
                  <div className="reg-role-check">✓</div>
                  <div className="reg-role-icon">🚛</div>
                  <div className="reg-role-title">Collecteur</div>
                  <div className="reg-role-desc">
                    Vous collectez les déchets et êtes rémunéré par mission.
                  </div>
                  <div className="reg-role-tags">
                    <span className="reg-role-tag">Indépendant</span>
                    <span className="reg-role-tag">Coopérative</span>
                  </div>
                </button>
              </div>

              <button
                className="reg-btn reg-btn-primary"
                disabled={!selectedRole}
                onClick={goToForm}
                type="button"
              >
                Continuer avec ce rôle →
              </button>

              <div className="reg-link">
                Vous avez déjà un compte ? <a href="/login">Se connecter</a>
              </div>
            </div>
          )}

          {/* Écran 2 : Formulaire Producteur */}
          {currentScreen === 2 && selectedRole === 'producteur' && (
            <div className="reg-card">
              <h1 className="reg-title">🏠 Inscription Producteur</h1>

              {/* Étape 1 - Informations de connexion */}
              {formStep === 1 && (
                <>
                  <div className="reg-step-header">
                    <div className="reg-step-num">1</div>
                    <div className="reg-step-title">Informations de connexion</div>
                  </div>

                  <div className="reg-row">
                    <div className="reg-field">
                      <label className="reg-label">✉️ Email *</label>
                      <input
                        className="reg-input"
                        type="email"
                        placeholder="nom@email.com"
                        value={producteurForm.email}
                        onChange={(e) => setProducteurForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                      {errors.pEmail && <div className="reg-error">{errors.pEmail}</div>}
                    </div>

                    <div className="reg-field">
                      <label className="reg-label">📱 Téléphone *</label>
                      <input
                        className="reg-input"
                        type="tel"
                        placeholder="+225 XX XX XX XX"
                        value={producteurForm.phone}
                        onChange={(e) => setProducteurForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                      {errors.pPhone && <div className="reg-error">{errors.pPhone}</div>}
                    </div>
                  </div>

                  <div className="reg-row">
                    <div className="reg-field">
                      <label className="reg-label">🔒 Mot de passe *</label>
                      <div className="reg-pwd-wrap">
                        <input
                          className="reg-input"
                          type={showPasswords.producteur.pwd ? 'text' : 'password'}
                          placeholder="Min. 8 caractères"
                          value={producteurForm.password}
                          onChange={(e) => handlePasswordChange('producteur', e.target.value)}
                        />
                        <button
                          type="button"
                          className="reg-pwd-toggle"
                          onClick={() => setShowPasswords(prev => ({
                            ...prev,
                            producteur: { ...prev.producteur, pwd: !prev.producteur.pwd }
                          }))}
                        >
                          {showPasswords.producteur.pwd ? '🙈' : '👁️'}
                        </button>
                      </div>
                      <div className="reg-pwd-meter">
                        <div className="reg-pwd-bars">
                          {[1, 2, 3, 4].map(i => (
                            <div
                              key={i}
                              className="reg-pwd-bar"
                              style={{
                                background: passwordStrength.producteur.score >= i ? '#2d8a5e' : '#d9e0d9'
                              }}
                            />
                          ))}
                        </div>
                        <span className="reg-pwd-label">{passwordStrength.producteur.label}</span>
                      </div>
                      {errors.pPassword && <div className="reg-error">{errors.pPassword}</div>}
                    </div>

                    <div className="reg-field">
                      <label className="reg-label">🔒 Confirmer le mot de passe *</label>
                      <div className="reg-pwd-wrap">
                        <input
                          className="reg-input"
                          type={showPasswords.producteur.confirm ? 'text' : 'password'}
                          placeholder="Confirmer"
                          value={producteurForm.passwordConfirm}
                          onChange={(e) => setProducteurForm(prev => ({ ...prev, passwordConfirm: e.target.value }))}
                        />
                        <button
                          type="button"
                          className="reg-pwd-toggle"
                          onClick={() => setShowPasswords(prev => ({
                            ...prev,
                            producteur: { ...prev.producteur, confirm: !prev.producteur.confirm }
                          }))}
                        >
                          {showPasswords.producteur.confirm ? '🙈' : '👁️'}
                        </button>
                      </div>
                      {errors.pPasswordConfirm && <div className="reg-error">{errors.pPasswordConfirm}</div>}
                    </div>
                  </div>

                  <div className="reg-actions">
                    <button
                      className="reg-btn reg-btn-outline"
                      onClick={() => setCurrentScreen(1)}
                      type="button"
                    >
                      ← Retour
                    </button>
                    <button
                      className="reg-btn reg-btn-primary"
                      onClick={() => nextStep('producteur', 1)}
                      type="button"
                    >
                      Étape suivante →
                    </button>
                  </div>
                </>
              )}

              {/* Étape 2 - Profil */}
              {formStep === 2 && (
                <>
                  <div className="reg-step-header">
                    <div className="reg-step-num">2</div>
                    <div className="reg-step-title">Votre profil</div>
                  </div>

                  <div className="reg-field">
                    <label className="reg-label">👤 Nom complet / Raison sociale *</label>
                    <input
                      className="reg-input"
                      placeholder="Votre nom"
                      value={producteurForm.nomComplet}
                      onChange={(e) => setProducteurForm(prev => ({ ...prev, nomComplet: e.target.value }))}
                    />
                    {errors.pNomComplet && <div className="reg-error">{errors.pNomComplet}</div>}
                  </div>

                  <div className="reg-field">
                    <label className="reg-label">🏷️ Type de producteur *</label>
                    <div className="reg-radio-group">
                      {Object.entries(PRODUCTEUR_TYPES).map(([key, { label, icon, desc }]) => (
                        <div className="reg-radio-item" key={key}>
                          <input
                            type="radio"
                            name="producteurType"
                            id={`ptype-${key}`}
                            value={key}
                            checked={producteurForm.type === key}
                            onChange={(e) => setProducteurForm(prev => ({ ...prev, type: e.target.value }))}
                          />
                          <label className="reg-radio-label" htmlFor={`ptype-${key}`}>
                            <span className="reg-radio-icon">{icon}</span>
                            <span className="reg-radio-title">{label}</span>
                            <span className="reg-radio-desc">{desc}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.pType && <div className="reg-error">{errors.pType}</div>}
                  </div>

                  <div className="reg-actions">
                    <button
                      className="reg-btn reg-btn-outline"
                      onClick={() => setFormStep(1)}
                      type="button"
                    >
                      ← Retour
                    </button>
                    <button
                      className="reg-btn reg-btn-primary"
                      onClick={() => nextStep('producteur', 2)}
                      type="button"
                    >
                      Étape suivante →
                    </button>
                  </div>
                </>
              )}

              {/* Étape 3 - Localisation */}
              {formStep === 3 && (
                <>
                  <div className="reg-step-header">
                    <div className="reg-step-num">3</div>
                    <div className="reg-step-title">Localisation</div>
                  </div>

                  <div className="reg-field">
                    <label className="reg-label">📍 Adresse complète *</label>
                    <input
                      className="reg-input"
                      placeholder="Rue, numéro..."
                      value={producteurForm.adresse}
                      onChange={(e) => setProducteurForm(prev => ({ ...prev, adresse: e.target.value }))}
                    />
                    {errors.pAdresse && <div className="reg-error">{errors.pAdresse}</div>}
                  </div>

                  <div className="reg-row">
                    <div className="reg-field">
                      <label className="reg-label">🏘️ Quartier *</label>
                      <input
                        className="reg-input"
                        placeholder="Quartier"
                        value={producteurForm.quartier}
                        onChange={(e) => setProducteurForm(prev => ({ ...prev, quartier: e.target.value }))}
                      />
                      {errors.pQuartier && <div className="reg-error">{errors.pQuartier}</div>}
                    </div>

                    <div className="reg-field">
                      <label className="reg-label">🏙️ Commune *</label>
                      <input
                        className="reg-input"
                        placeholder="Commune"
                        value={producteurForm.commune}
                        onChange={(e) => setProducteurForm(prev => ({ ...prev, commune: e.target.value }))}
                      />
                      {errors.pCommune && <div className="reg-error">{errors.pCommune}</div>}
                    </div>
                  </div>

                  <div className="reg-field">
                    <label className="reg-label">🛰️ Coordonnées GPS (optionnel)</label>
                    <button
                      className="reg-btn reg-btn-gps"
                      onClick={getCurrentLocation}
                      type="button"
                    >
                      📡 Utiliser ma position actuelle
                    </button>
                  </div>

                  <div className="reg-row">
                    <div className="reg-field">
                      <label className="reg-label">Latitude</label>
                      <input
                        className="reg-input"
                        placeholder="Ex: 5.345"
                        value={producteurForm.latitude}
                        onChange={(e) => setProducteurForm(prev => ({ ...prev, latitude: e.target.value }))}
                      />
                    </div>

                    <div className="reg-field">
                      <label className="reg-label">Longitude</label>
                      <input
                        className="reg-input"
                        placeholder="Ex: -3.982"
                        value={producteurForm.longitude}
                        onChange={(e) => setProducteurForm(prev => ({ ...prev, longitude: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="reg-actions">
                    <button
                      className="reg-btn reg-btn-outline"
                      onClick={() => setFormStep(2)}
                      type="button"
                    >
                      ← Retour
                    </button>
                    <button
                      className="reg-btn reg-btn-primary"
                      onClick={() => nextStep('producteur', 3)}
                      type="button"
                    >
                      Étape suivante →
                    </button>
                  </div>
                </>
              )}

              {/* Étape 4 - Confirmation */}
              {formStep === 4 && (
                <>
                  <div className="reg-step-header">
                    <div className="reg-step-num">4</div>
                    <div className="reg-step-title">Vérification & Confirmation</div>
                  </div>

                  <div className="reg-recap">
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Email</span>
                      <span className="reg-recap-value">{producteurForm.email}</span>
                    </div>
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Téléphone</span>
                      <span className="reg-recap-value">{producteurForm.phone}</span>
                    </div>
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Nom</span>
                      <span className="reg-recap-value">{producteurForm.nomComplet}</span>
                    </div>
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Type</span>
                      <span className="reg-recap-value">
                        {PRODUCTEUR_TYPES[producteurForm.type]?.label || producteurForm.type}
                      </span>
                    </div>
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Adresse</span>
                      <span className="reg-recap-value">{producteurForm.adresse}</span>
                    </div>
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Quartier / Commune</span>
                      <span className="reg-recap-value">{producteurForm.quartier}, {producteurForm.commune}</span>
                    </div>
                    {producteurForm.latitude && producteurForm.longitude && (
                      <div className="reg-recap-row">
                        <span className="reg-recap-label">GPS</span>
                        <span className="reg-recap-value">
                          {producteurForm.latitude}, {producteurForm.longitude}
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    className="reg-cgu"
                    onClick={() => setProducteurForm(prev => ({ ...prev, cgu: !prev.cgu }))}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && setProducteurForm(prev => ({ ...prev, cgu: !prev.cgu }))}
                  >
                    <div className={`reg-cgu-box ${producteurForm.cgu ? 'checked' : ''}`}>
                      {producteurForm.cgu && '✓'}
                    </div>
                    <span className="reg-cgu-text">
                      J'accepte les <a href="#" onClick={(e) => e.preventDefault()}>CGU</a> et la{' '}
                      <a href="#" onClick={(e) => e.preventDefault()}>Politique de Confidentialité</a> d'EcoCollect. *
                    </span>
                  </div>

                  {renderMessage()}

                  <div className="reg-actions">
                    <button
                      className="reg-btn reg-btn-outline"
                      onClick={() => setFormStep(3)}
                      type="button"
                    >
                      ← Retour
                    </button>
                    <button
                      className="reg-btn reg-btn-primary"
                      disabled={isLoading}
                      onClick={submitProducteur}
                      type="button"
                    >
                      {isLoading ? 'Création en cours...' : '🚀 Créer mon compte →'}
                    </button>
                  </div>
                </>
              )}

              <div className="reg-link">
                Vous avez déjà un compte ? <a href="/login">Se connecter</a>
              </div>
            </div>
          )}

          {/* Écran 2 : Formulaire Collecteur */}
          {currentScreen === 2 && selectedRole === 'collecteur' && (
            <div className="reg-card">
              <h1 className="reg-title">🚛 Inscription Collecteur</h1>

              {/* Étape 1 - Informations de connexion */}
              {formStep === 1 && (
                <>
                  <div className="reg-step-header">
                    <div className="reg-step-num">1</div>
                    <div className="reg-step-title">Informations de connexion</div>
                  </div>

                  <div className="reg-row">
                    <div className="reg-field">
                      <label className="reg-label">✉️ Email *</label>
                      <input
                        className="reg-input"
                        type="email"
                        placeholder="nom@email.com"
                        value={collecteurForm.email}
                        onChange={(e) => setCollecteurForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                      {errors.cEmail && <div className="reg-error">{errors.cEmail}</div>}
                    </div>

                    <div className="reg-field">
                      <label className="reg-label">📱 Téléphone *</label>
                      <input
                        className="reg-input"
                        type="tel"
                        placeholder="+225 XX XX XX XX"
                        value={collecteurForm.phone}
                        onChange={(e) => setCollecteurForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                      {errors.cPhone && <div className="reg-error">{errors.cPhone}</div>}
                    </div>
                  </div>

                  <div className="reg-row">
                    <div className="reg-field">
                      <label className="reg-label">🔒 Mot de passe *</label>
                      <div className="reg-pwd-wrap">
                        <input
                          className="reg-input"
                          type={showPasswords.collecteur.pwd ? 'text' : 'password'}
                          placeholder="Min. 8 caractères"
                          value={collecteurForm.password}
                          onChange={(e) => handlePasswordChange('collecteur', e.target.value)}
                        />
                        <button
                          type="button"
                          className="reg-pwd-toggle"
                          onClick={() => setShowPasswords(prev => ({
                            ...prev,
                            collecteur: { ...prev.collecteur, pwd: !prev.collecteur.pwd }
                          }))}
                        >
                          {showPasswords.collecteur.pwd ? '🙈' : '👁️'}
                        </button>
                      </div>
                      <div className="reg-pwd-meter">
                        <div className="reg-pwd-bars">
                          {[1, 2, 3, 4].map(i => (
                            <div
                              key={i}
                              className="reg-pwd-bar"
                              style={{
                                background: passwordStrength.collecteur.score >= i ? '#2d8a5e' : '#d9e0d9'
                              }}
                            />
                          ))}
                        </div>
                        <span className="reg-pwd-label">{passwordStrength.collecteur.label}</span>
                      </div>
                      {errors.cPassword && <div className="reg-error">{errors.cPassword}</div>}
                    </div>

                    <div className="reg-field">
                      <label className="reg-label">🔒 Confirmer le mot de passe *</label>
                      <div className="reg-pwd-wrap">
                        <input
                          className="reg-input"
                          type={showPasswords.collecteur.confirm ? 'text' : 'password'}
                          placeholder="Confirmer"
                          value={collecteurForm.passwordConfirm}
                          onChange={(e) => setCollecteurForm(prev => ({ ...prev, passwordConfirm: e.target.value }))}
                        />
                        <button
                          type="button"
                          className="reg-pwd-toggle"
                          onClick={() => setShowPasswords(prev => ({
                            ...prev,
                            collecteur: { ...prev.collecteur, confirm: !prev.collecteur.confirm }
                          }))}
                        >
                          {showPasswords.collecteur.confirm ? '🙈' : '👁️'}
                        </button>
                      </div>
                      {errors.cPasswordConfirm && <div className="reg-error">{errors.cPasswordConfirm}</div>}
                    </div>
                  </div>

                  <div className="reg-actions">
                    <button
                      className="reg-btn reg-btn-outline"
                      onClick={() => setCurrentScreen(1)}
                      type="button"
                    >
                      ← Retour
                    </button>
                    <button
                      className="reg-btn reg-btn-primary"
                      onClick={() => nextStep('collecteur', 1)}
                      type="button"
                    >
                      Étape suivante →
                    </button>
                  </div>
                </>
              )}

              {/* Étape 2 - Identité & Type */}
              {formStep === 2 && (
                <>
                  <div className="reg-step-header">
                    <div className="reg-step-num">2</div>
                    <div className="reg-step-title">Identité & Type</div>
                  </div>

                  <div className="reg-field">
                    <label className="reg-label">👤 Nom complet *</label>
                    <input
                      className="reg-input"
                      placeholder="Votre nom"
                      value={collecteurForm.nomComplet}
                      onChange={(e) => setCollecteurForm(prev => ({ ...prev, nomComplet: e.target.value }))}
                    />
                    {errors.cNomComplet && <div className="reg-error">{errors.cNomComplet}</div>}
                  </div>

                  <div className="reg-field">
                    <label className="reg-label">🔖 Type de collecteur *</label>
                    <div className="reg-radio-group">
                      {Object.entries(COLLECTEUR_TYPES).map(([key, { label, icon, desc }]) => (
                        <div className="reg-radio-item" key={key}>
                          <input
                            type="radio"
                            name="collecteurType"
                            id={`ctype-${key}`}
                            value={key}
                            checked={collecteurForm.type === key}
                            onChange={(e) => setCollecteurForm(prev => ({ ...prev, type: e.target.value }))}
                          />
                          <label className="reg-radio-label" htmlFor={`ctype-${key}`}>
                            <span className="reg-radio-icon">{icon}</span>
                            <span className="reg-radio-title">{label}</span>
                            <span className="reg-radio-desc">{desc}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.cType && <div className="reg-error">{errors.cType}</div>}
                  </div>

                  <div className="reg-field">
                    <label className="reg-label">🪪 Numéro d'identité</label>
                    <input
                      className="reg-input"
                      placeholder="N° CNI ou passeport"
                      value={collecteurForm.identite}
                      onChange={(e) => setCollecteurForm(prev => ({ ...prev, identite: e.target.value }))}
                    />
                    <div className="reg-hint">
                      Requis pour les collecteurs indépendants
                    </div>
                  </div>

                  <div className="reg-actions">
                    <button
                      className="reg-btn reg-btn-outline"
                      onClick={() => setFormStep(1)}
                      type="button"
                    >
                      ← Retour
                    </button>
                    <button
                      className="reg-btn reg-btn-primary"
                      onClick={() => nextStep('collecteur', 2)}
                      type="button"
                    >
                      Étape suivante →
                    </button>
                  </div>
                </>
              )}

              {/* Étape 3 - Zone & Documents */}
              {formStep === 3 && (
                <>
                  <div className="reg-step-header">
                    <div className="reg-step-num">3</div>
                    <div className="reg-step-title">Zone & Documents</div>
                  </div>

                  <div className="reg-field">
                    <label className="reg-label">🗺️ Nom de la zone *</label>
                    <input
                      className="reg-input"
                      placeholder="Zone de collecte"
                      value={collecteurForm.zone}
                      onChange={(e) => setCollecteurForm(prev => ({ ...prev, zone: e.target.value }))}
                    />
                    {errors.cZone && <div className="reg-error">{errors.cZone}</div>}
                  </div>

                  <div className="reg-row">
                    <div className="reg-field">
                      <label className="reg-label">📌 Quartiers habituels</label>
                      <input
                        className="reg-input"
                        placeholder="Séparés par virgules"
                        value={collecteurForm.quartiers}
                        onChange={(e) => setCollecteurForm(prev => ({ ...prev, quartiers: e.target.value }))}
                      />
                    </div>

                    <div className="reg-field">
                      <label className="reg-label">🏙️ Communes</label>
                      <input
                        className="reg-input"
                        placeholder="Séparées par virgules"
                        value={collecteurForm.communes}
                        onChange={(e) => setCollecteurForm(prev => ({ ...prev, communes: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Upload de photo de profil */}
                  <div className="reg-field">
                    <label className="reg-label">📸 Photo de profil *</label>
                    <div
                      className="reg-upload-zone"
                      onClick={() => fileInputRefs.photo.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && fileInputRefs.photo.current?.click()}
                    >
                      <div className="reg-upload-preview">
                        {previews.photo ? (
                          <img src={previews.photo} alt="Photo de profil" />
                        ) : (
                          <span>📷</span>
                        )}
                      </div>
                      <div>
                        <div className="reg-upload-text">Cliquez pour choisir une photo</div>
                        <div className="reg-upload-hint">JPG, PNG — Max. 5 Mo</div>
                      </div>
                    </div>
                    <input
                      ref={fileInputRefs.photo}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e, 'photo')}
                    />
                    {errors.cPhoto && <div className="reg-error">{errors.cPhoto}</div>}
                  </div>

                  {/* Upload CNI Recto */}
                  <div className="reg-field">
                    <label className="reg-label">🪪 Photo CNI Recto *</label>
                    <div
                      className="reg-upload-zone"
                      onClick={() => fileInputRefs.cniRecto.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && fileInputRefs.cniRecto.current?.click()}
                    >
                      <div className="reg-upload-preview">
                        {previews.cniRecto ? (
                          <img src={previews.cniRecto} alt="CNI Recto" />
                        ) : (
                          <span>📄</span>
                        )}
                      </div>
                      <div>
                        <div className="reg-upload-text">Cliquez pour charger le recto</div>
                        <div className="reg-upload-hint">JPG, PNG — Max. 5 Mo</div>
                      </div>
                    </div>
                    <input
                      ref={fileInputRefs.cniRecto}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e, 'cniRecto')}
                    />
                    {errors.cCniRecto && <div className="reg-error">{errors.cCniRecto}</div>}
                  </div>

                  {/* Upload CNI Verso */}
                  <div className="reg-field">
                    <label className="reg-label">🪪 Photo CNI Verso *</label>
                    <div
                      className="reg-upload-zone"
                      onClick={() => fileInputRefs.cniVerso.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && fileInputRefs.cniVerso.current?.click()}
                    >
                      <div className="reg-upload-preview">
                        {previews.cniVerso ? (
                          <img src={previews.cniVerso} alt="CNI Verso" />
                        ) : (
                          <span>📄</span>
                        )}
                      </div>
                      <div>
                        <div className="reg-upload-text">Cliquez pour charger le verso</div>
                        <div className="reg-upload-hint">JPG, PNG — Max. 5 Mo</div>
                      </div>
                    </div>
                    <input
                      ref={fileInputRefs.cniVerso}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e, 'cniVerso')}
                    />
                    {errors.cCniVerso && <div className="reg-error">{errors.cCniVerso}</div>}
                  </div>

                  <div className="reg-actions">
                    <button
                      className="reg-btn reg-btn-outline"
                      onClick={() => setFormStep(2)}
                      type="button"
                    >
                      ← Retour
                    </button>
                    <button
                      className="reg-btn reg-btn-primary"
                      onClick={() => nextStep('collecteur', 3)}
                      type="button"
                    >
                      Étape suivante →
                    </button>
                  </div>
                </>
              )}

              {/* Étape 4 - Confirmation */}
              {formStep === 4 && (
                <>
                  <div className="reg-step-header">
                    <div className="reg-step-num">4</div>
                    <div className="reg-step-title">Vérification & Confirmation</div>
                  </div>

                  <div className="reg-recap">
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Email</span>
                      <span className="reg-recap-value">{collecteurForm.email}</span>
                    </div>
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Téléphone</span>
                      <span className="reg-recap-value">{collecteurForm.phone}</span>
                    </div>
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Nom</span>
                      <span className="reg-recap-value">{collecteurForm.nomComplet}</span>
                    </div>
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Type</span>
                      <span className="reg-recap-value">
                        {COLLECTEUR_TYPES[collecteurForm.type]?.label || collecteurForm.type}
                      </span>
                    </div>
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Zone</span>
                      <span className="reg-recap-value">{collecteurForm.zone}</span>
                    </div>
                    <div className="reg-recap-row">
                      <span className="reg-recap-label">Quartiers / Communes</span>
                      <span className="reg-recap-value">
                        {collecteurForm.quartiers} / {collecteurForm.communes}
                      </span>
                    </div>
                  </div>

                  <div
                    className="reg-cgu"
                    onClick={() => setCollecteurForm(prev => ({ ...prev, cgu: !prev.cgu }))}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && setCollecteurForm(prev => ({ ...prev, cgu: !prev.cgu }))}
                  >
                    <div className={`reg-cgu-box ${collecteurForm.cgu ? 'checked' : ''}`}>
                      {collecteurForm.cgu && '✓'}
                    </div>
                    <span className="reg-cgu-text">
                      J'accepte les <a href="#" onClick={(e) => e.preventDefault()}>CGU</a> et la{' '}
                      <a href="#" onClick={(e) => e.preventDefault()}>Politique de Confidentialité</a> d'EcoCollect. *
                    </span>
                  </div>

                  {renderMessage()}

                  <div className="reg-actions">
                    <button
                      className="reg-btn reg-btn-outline"
                      onClick={() => setFormStep(3)}
                      type="button"
                    >
                      ← Retour
                    </button>
                    <button
                      className="reg-btn reg-btn-primary"
                      disabled={isLoading}
                      onClick={submitCollecteur}
                      type="button"
                    >
                      {isLoading ? 'Création en cours...' : '🚀 Créer mon compte →'}
                    </button>
                  </div>
                </>
              )}

              <div className="reg-link">
                Vous avez déjà un compte ? <a href="/login">Se connecter</a>
              </div>
            </div>
          )}

          {/* Écran 3 : Succès */}
          {currentScreen === 3 && (
            <div className="reg-card reg-success-card">
              <div className="reg-success-icon">🎉</div>
              <h1 className="reg-success-title">
                Félicitations{' '}
                {selectedRole === 'producteur'
                  ? producteurForm.nomComplet?.split(' ')[0]
                  : collecteurForm.nomComplet?.split(' ')[0]} !
              </h1>
              <p className="reg-success-desc">
                Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter
                et commencer à utiliser EcoCollect.
              </p>
              <div className="reg-success-actions">
                <button
                  className="reg-btn reg-btn-primary"
                  onClick={() => window.location.href = '/login'}
                  type="button"
                >
                  Se connecter
                </button>
                <button
                  className="reg-btn reg-btn-outline"
                  onClick={() => window.location.href = '/'}
                  type="button"
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ============================================================
// STYLES CSS
// ============================================================

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

  .reg-root {
    font-family: 'Outfit', sans-serif;
    min-height: 100vh;
    background: #f8faf8;
    color: #1a1e1a;
    position: relative;
    overflow-x: hidden;
  }

  .reg-ambient {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
  }

  .reg-ambient-1 {
    width: 600px;
    height: 600px;
    background: #2d8a5e;
    top: -200px;
    right: -200px;
  }

  .reg-ambient-2 {
    width: 500px;
    height: 500px;
    background: #e0a020;
    bottom: -150px;
    left: -150px;
  }

  .reg-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    position: relative;
    z-index: 10;
  }

  .reg-nav img {
    height: 40px;
    border-radius: 8px;
  }

  .reg-nav-back {
    background: none;
    border: 1px solid #d9e0d9;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #5a655a;
    transition: all 0.3s;
  }

  .reg-nav-back:hover {
    background: #f0f3f0;
    border-color: #2d8a5e;
  }

  .reg-page {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    z-index: 10;
  }

  .reg-progress-wrap {
    margin-bottom: 32px;
  }

  .reg-progress-steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
  }

  .reg-progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .reg-step-dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    background: #e8f3e8;
    color: #5a655a;
    border: 2px solid #d9e0d9;
    transition: all 0.3s;
  }

  .reg-step-dot.active {
    background: #2d8a5e;
    color: white;
    border-color: #2d8a5e;
  }

  .reg-step-dot.done {
    background: #2d8a5e;
    color: white;
    border-color: #2d8a5e;
  }

  .reg-step-label {
    font-size: 11px;
    color: #9ca39c;
    font-weight: 500;
  }

  .reg-step-label.active {
    color: #2d8a5e;
    font-weight: 600;
  }

  .reg-step-line {
    width: 40px;
    height: 3px;
    background: #d9e0d9;
    margin: 0 4px;
    margin-bottom: 20px;
    border-radius: 2px;
    transition: background 0.3s;
  }

  .reg-step-line.done {
    background: #2d8a5e;
  }

  .reg-card {
    background: white;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e8f0e8;
  }

  .reg-title {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    text-align: center;
    margin-bottom: 8px;
  }

  .reg-subtitle {
    text-align: center;
    color: #5a655a;
    font-size: 15px;
    margin-bottom: 24px;
  }

  .reg-roles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }

  .reg-role-card {
    position: relative;
    border: 2px solid #d9e0d9;
    border-radius: 16px;
    padding: 24px;
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;
    background: white;
    width: 100%;
  }

  .reg-role-card:hover {
    border-color: #2d8a5e;
    box-shadow: 0 4px 20px -4px rgba(45, 138, 94, 0.15);
    transform: translateY(-2px);
  }

  .reg-role-card.selected {
    border-color: #2d8a5e;
    background: #f0faf4;
  }

  .reg-role-check {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #2d8a5e;
    color: white;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .reg-role-card.selected .reg-role-check {
    display: flex;
  }

  .reg-role-icon {
    font-size: 40px;
    margin-bottom: 8px;
  }

  .reg-role-title {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 8px;
  }

  .reg-role-desc {
    font-size: 13px;
    color: #5a655a;
    line-height: 1.5;
    margin-bottom: 12px;
  }

  .reg-role-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
  }

  .reg-role-tag {
    background: #e8f3e8;
    color: #2d8a5e;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
  }

  .reg-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 12px;
    border: none;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .reg-btn-primary {
    background: #2d8a5e;
    color: white;
    width: 100%;
    justify-content: center;
  }

  .reg-btn-primary:hover:not(:disabled) {
    background: #246e4b;
    transform: translateY(-1px);
  }

  .reg-btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .reg-btn-outline {
    background: transparent;
    border: 1px solid #d9e0d9;
    color: #5a655a;
  }

  .reg-btn-outline:hover {
    background: #f0f3f0;
    border-color: #2d8a5e;
  }

  .reg-btn-gps {
    background: #e8f3e8;
    color: #2d8a5e;
    border: 1px solid #c8e0c8;
    padding: 8px 16px;
    font-size: 13px;
  }

  .reg-btn-gps:hover {
    background: #d8ecd8;
  }

  .reg-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #5a655a;
  }

  .reg-link a {
    color: #2d8a5e;
    font-weight: 600;
    text-decoration: none;
  }

  .reg-link a:hover {
    text-decoration: underline;
  }

  .reg-step-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e8f3e8;
  }

  .reg-step-num {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #2d8a5e;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
  }

  .reg-step-title {
    font-weight: 600;
    font-size: 16px;
  }

  .reg-field {
    margin-bottom: 16px;
  }

  .reg-label {
    display: block;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 6px;
    color: #1a1e1a;
  }

  .reg-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #d9e0d9;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Outfit', sans-serif;
    transition: all 0.3s;
    background: white;
  }

  .reg-input:focus {
    outline: none;
    border-color: #2d8a5e;
    box-shadow: 0 0 0 3px rgba(45, 138, 94, 0.1);
  }

  .reg-error {
    color: #dc2626;
    font-size: 12px;
    margin-top: 4px;
  }

  .reg-hint {
    color: #9ca39c;
    font-size: 12px;
    margin-top: 4px;
  }

  .reg-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .reg-pwd-wrap {
    position: relative;
    display: flex;
  }

  .reg-pwd-wrap input {
    flex: 1;
    padding-right: 40px;
  }

  .reg-pwd-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    padding: 0;
  }

  .reg-pwd-meter {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
  }

  .reg-pwd-bars {
    display: flex;
    gap: 3px;
  }

  .reg-pwd-bar {
    width: 30px;
    height: 4px;
    border-radius: 2px;
    background: #d9e0d9;
    transition: background 0.3s;
  }

  .reg-pwd-label {
    font-size: 12px;
    color: #5a655a;
  }

  .reg-radio-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .reg-radio-item {
    position: relative;
  }

  .reg-radio-item input {
    position: absolute;
    opacity: 0;
  }

  .reg-radio-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px;
    border: 2px solid #d9e0d9;
    border-radius: 12px;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s;
  }

  .reg-radio-item input:checked + .reg-radio-label {
    border-color: #2d8a5e;
    background: #f0faf4;
  }

  .reg-radio-icon {
    font-size: 24px;
    margin-bottom: 4px;
  }

  .reg-radio-title {
    font-weight: 600;
    font-size: 14px;
  }

  .reg-radio-desc {
    font-size: 11px;
    color: #5a655a;
  }

  .reg-actions {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 24px;
  }

  .reg-upload-zone {
    border: 2px dashed #d9e0d9;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .reg-upload-zone:hover {
    border-color: #2d8a5e;
    background: #f8fcf8;
  }

  .reg-upload-preview {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    overflow: hidden;
    background: #e8f3e8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }

  .reg-upload-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .reg-upload-text {
    font-size: 14px;
    font-weight: 500;
    color: #1a1e1a;
  }

  .reg-upload-hint {
    font-size: 12px;
    color: #9ca39c;
  }

  .reg-recap {
    background: #f8faf8;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .reg-recap-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e8f0e8;
  }

  .reg-recap-row:last-child {
    border-bottom: none;
  }

  .reg-recap-label {
    font-weight: 600;
    font-size: 13px;
    color: #5a655a;
  }

  .reg-recap-value {
    font-size: 13px;
    color: #1a1e1a;
    text-align: right;
  }

  .reg-cgu {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 16px 0;
    cursor: pointer;
  }

  .reg-cgu-box {
    width: 20px;
    height: 20px;
    min-width: 20px;
    border: 2px solid #d9e0d9;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }

  .reg-cgu-box.checked {
    background: #2d8a5e;
    border-color: #2d8a5e;
    color: white;
  }

  .reg-cgu-text {
    font-size: 13px;
    color: #5a655a;
    line-height: 1.5;
  }

  .reg-cgu-text a {
    color: #2d8a5e;
    text-decoration: underline;
  }

  .reg-message {
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .reg-message.error {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }

  .reg-message.info {
    background: #eff6ff;
    color: #2563eb;
    border: 1px solid #bfdbfe;
  }

  .reg-message.success {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
  }

  .reg-success-card {
    text-align: center;
    padding: 48px 32px;
  }

  .reg-success-icon {
    font-size: 64px;
    margin-bottom: 16px;
  }

  .reg-success-title {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    margin-bottom: 12px;
  }

  .reg-success-desc {
    color: #5a655a;
    font-size: 15px;
    margin-bottom: 32px;
    line-height: 1.6;
  }

  .reg-success-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  @media (max-width: 640px) {
    .reg-roles {
      grid-template-columns: 1fr;
    }

    .reg-row {
      grid-template-columns: 1fr;
    }

    .reg-radio-group {
      grid-template-columns: 1fr;
    }

    .reg-success-actions {
      flex-direction: column;
    }

    .reg-card {
      padding: 20px;
    }
  }
`;

export default Register;