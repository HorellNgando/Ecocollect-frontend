import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, Leaf, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.jpeg';


const API_URL = '';

const STORAGE_KEYS = {
  TOKEN: 'ecocollect_token',
  USER: 'ecocollect_user',
  ROLE: 'ecocollect_role',
  REMEMBER: 'ecocollect_remember',
};

const ROLE_CONFIG = {
  admin: {
    page: '/admin',
    userField: 'utilisateur',
    roleType: 'admin',
  },
  superviseur: {
    page: '/superviseur',
    userField: 'utilisateur',
    roleType: 'superviseur',
  },
  gestionnaire: {
    page: '/gestionnaire',
    userField: 'utilisateur',
    roleType: 'gestionnaire',
  },
  collecteur: {
    page: '/collecteur',
    userField: 'utilisateur',
    roleType: 'collecteur',
  },
  producteur: {
    page: '/producteur',
    userField: 'utilisateur',
    roleType: 'producteur',
  },
  recycleur: {
    page: '/recycleur',
    userField: 'utilisateur',
    roleType: 'recycleur',
  },
  sponsor: {
    page: '/sponsor',
    userField: 'utilisateur',
    roleType: 'sponsor',
  },
  ong: {
    page: '/ong',
    userField: 'utilisateur',
    roleType: 'ong',
  },
};

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const Login = () => {
  const [formData, setFormData] = useState({
    identifiant: '',
    motDePasse: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [debugInfo, setDebugInfo] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);
    if (token && role && ROLE_CONFIG[role]) {
      window.location.href = ROLE_CONFIG[role].page;
    }
  }, []);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  }, [errors, message]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.identifiant.trim()) {
      newErrors.identifiant = "L'email ou le téléphone est requis";
    } else if (
      formData.identifiant.includes('@') &&
      !isValidEmail(formData.identifiant)
    ) {
      newErrors.identifiant = "L'email n'est pas valide";
    }
    if (!formData.motDePasse) {
      newErrors.motDePasse = 'Le mot de passe est requis';
    } else if (formData.motDePasse.length < 6) {
      newErrors.motDePasse =
        'Le mot de passe doit contenir au moins 6 caractères';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const saveAuthData = useCallback(
    (token, user, role) => {
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
    },
    [formData.rememberMe]
  );

  const extractAuthData = useCallback((data, role) => {
    let token =
      data.token ||
      data.accessToken ||
      data.access_token ||
      data.jwt ||
      data.data?.token ||
      null;
    let user =
      data.utilisateur ||
      data.user ||
      data.data?.utilisateur ||
      data[role] ||
      null;
    if (!user && typeof data === 'object' && data.id && data.email) {
      user = data;
    }
    return { token, user };
  }, []);

  // const attemptLogin = useCallback(
  //   async (identifiant, motDePasse) => {
  //     const url = `${API_URL}/api/auth/connexion`;
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //       body: JSON.stringify({ identifiant, motDePasse }),
  //     });

  //     const responseText = await response.text();
  //     let data;
  //     try {
  //       data = JSON.parse(responseText);
  //     } catch {
  //       throw new Error('Réponse invalide du serveur');
  //     }

  //     if (response.ok) {
  //       const { token, user } = extractAuthData(
  //         data,
  //         data.utilisateur?.type || 'unknown'
  //       );
  //       if (token && user) {
  //         const role = user.type || user.role || data.utilisateur?.type || 'producteur';
  //         if (saveAuthData(token, user, role)) {
  //           return { success: true, role, user, token };
  //         }
  //         throw new Error('Erreur lors de la sauvegarde des données');
  //       }
  //       throw new Error("Données d'authentification incomplètes");
  //     }
  //     throw new Error(data.message || 'Erreur de connexion');
  //   },
  //   [extractAuthData, saveAuthData]
  // );

  const attemptLogin = useCallback(async (identifiant, motDePasse) => {
  const url = `${API_URL}/api/auth/connexion`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ identifiant, motDePasse }),
  });
  const responseText = await response.text();
  let data;
  try { data = JSON.parse(responseText); } catch { throw new Error('Réponse invalide'); }

  if (response.ok) {
    // Extraction simplifiée
    let token = data.token || null;
    const user = data.utilisateur || data.user || null;

    // Nettoyage du token (supprime espaces, retours ligne)
    if (token) token = token.trim();

    console.log('Token extrait (admin) :', token);
    console.log('Longueur token :', token?.length);

    if (token && user) {
      const role = user.type || user.role || 'producteur';
      if (saveAuthData(token, user, role)) {
        return { success: true, role, user, token };
      }
      throw new Error('Erreur sauvegarde');
    }
    throw new Error("Données d'authentification incomplètes");
  }
  throw new Error(data.message || 'Erreur de connexion');
}, [extractAuthData, saveAuthData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsLoading(true);
      setMessage({ type: 'info', text: 'Connexion en cours...' });
      setDebugInfo(null);

      try {
        const result = await attemptLogin(
          formData.identifiant,
          formData.motDePasse
        );
        if (result.success) {
          const config = ROLE_CONFIG[result.role] || ROLE_CONFIG.producteur;
          setMessage({
            type: 'success',
            text: `Connexion réussie ! Bienvenue ${
              result.user.nomComplet || result.user.email
            } !`,
          });
          setTimeout(() => {
            window.location.href = config.page;
          }, 1500);
        }
      } catch (error) {
        setDebugInfo({
          error: error.message,
          identifiant: formData.identifiant,
          timestamp: new Date().toISOString(),
        });
        setMessage({
          type: 'error',
          text:
            error.message ||
            'Identifiants incorrects ou compte non trouvé.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm, attemptLogin]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse, rgba(45, 138, 94, 0.03) 0%, transparent 70%)',
        }}
      />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse, rgba(45, 138, 94, 0.02) 0%, transparent 70%)',
        }}
      />

      {/* Main container */}
      <div className="relative z-10 w-full max-w-[450px] mx-auto px-4">
        <div className="bg-white rounded-[1.75rem] border border-green-100 shadow-lg p-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
  <img src={logo} alt="EcoCollect Logo" className="h-[70px] w-auto rounded-[15px]" />
  <a href="/" className="text-xl font-bold text-green-700">
    
  </a>
</div>

          {/* Title */}
          <h1 className="text-center font-serif text-3xl font-semibold text-gray-900 mb-8 flex items-center justify-center gap-2">
            <span>Se connecter</span>
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Phone Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email ou Téléphone
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="identifiant"
                  value={formData.identifiant}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="Entrez votre email ou téléphone"
                  className={`w-full px-4 py-3 pl-10 rounded-xl bg-green-50 border-2 transition-all outline-none ${
                    errors.identifiant
                      ? 'border-red-500'
                      : 'border-green-100 focus:border-green-600 focus:shadow-sm focus:shadow-green-200'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              {errors.identifiant && (
                <p className="text-red-600 text-xs mt-1 font-medium">
                  {errors.identifiant}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="motDePasse"
                  value={formData.motDePasse}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="Entrez votre mot de passe"
                  className={`w-full px-4 py-3 pl-10 rounded-xl bg-green-50 border-2 transition-all outline-none ${
                    errors.motDePasse
                      ? 'border-red-500'
                      : 'border-green-100 focus:border-green-600 focus:shadow-sm focus:shadow-green-200'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={
                    showPassword
                      ? 'Masquer le mot de passe'
                      : 'Afficher le mot de passe'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.motDePasse && (
                <p className="text-red-600 text-xs mt-1 font-medium">
                  {errors.motDePasse}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded accent-green-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700">Se souvenir de moi</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm font-semibold text-green-600 hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Message Alert */}
            {message.text && (
              <div
                className={`p-4 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : message.type === 'error'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}
              >
                {message.text}
              </div>
            )}

            

            {/* Submit Button - FIXED: Use stable container span */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-6 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-full transition-all transform hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Connexion en cours...</span>
                </span>
              ) : (
                <span>Se connecter</span>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-8 space-y-3 text-center">
            <p className="text-gray-600 text-sm">
              Pas encore de compte ?{' '}
              <a href="/register" className="font-semibold text-green-600 hover:underline">
                S'inscrire
              </a>
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;





// import React, { useState, useEffect, useCallback } from 'react';
// import { Eye, EyeOff, Leaf, ArrowLeft } from 'lucide-react';
// import logo from '../assets/logo.jpeg';

// // const API_URL = 'https://ecocollect.cm';

// const API_URL = 'http://localhost:3000'; 


// const STORAGE_KEYS = {
//   TOKEN: 'ecocollect_token',
//   USER: 'ecocollect_user',
//   ROLE: 'ecocollect_role',
//   REMEMBER: 'ecocollect_remember',
// };

// // Configuration des routes de connexion par rôle
// const ROLE_CONFIGS = [
//   {
//     role: 'admin',
//     page: '/admin',
//     url: `${API_URL}/api/admin/connexion`,
//     userField: 'utilisateur',
//     emailField: 'email',
//     bodyFormat: (identifiant, motDePasse) => ({ email: identifiant, motDePasse })
//   },
//   {
//     role: 'superviseur',
//     page: '/superviseur',
//     url: `${API_URL}/api/superviseurs/connexion`,
//     userField: 'superviseur',
//     emailField: 'identifiant',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   {
//     role: 'gestionnaire',
//     page: '/gestionnaire',
//     url: `${API_URL}/api/gestionnaires/connexion`,
//     userField: 'utilisateur',
//     emailField: 'identifiant',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   {
//     role: 'collecteur',
//     page: '/collecteur',
//     url: `${API_URL}/api/collecteurs/connexion`,
//     userField: 'collecteur',
//     emailField: 'identifiant',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   {
//     role: 'producteur',
//     page: '/producteur',
//     url: `${API_URL}/api/auth/connexion`,
//     userField: 'producteur',
//     emailField: 'identifiant',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   {
//     role: 'recycleur',
//     page: '/recycleur',
//     url: `${API_URL}/api/recycleurs/connexion`,
//     userField: 'recycleur',
//     emailField: 'identifiant',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   {
//     role: 'sponsor',
//     page: '/sponsor',
//     url: `${API_URL}/api/sponsors/connexion`,
//     userField: 'sponsor',
//     emailField: 'identifiant',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   },
//   {
//     role: 'ong',
//     page: '/ong',
//     url: `${API_URL}/api/ongs/connexion`,
//     userField: 'ong',
//     emailField: 'identifiant',
//     bodyFormat: (identifiant, motDePasse) => ({ identifiant, motDePasse })
//   }
// ];

// const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// const Login = () => {
//   const [formData, setFormData] = useState({
//     identifiant: '',
//     motDePasse: '',
//     rememberMe: false,
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [debugInfo, setDebugInfo] = useState(null);

//   // Vérifier si déjà connecté
//   useEffect(() => {
//     const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
//     const role = localStorage.getItem(STORAGE_KEYS.ROLE);
//     const config = ROLE_CONFIGS.find(c => c.role === role);
//     if (token && role && config) {
//       window.location.href = config.page;
//     }
//   }, []);

//   // Effacer le message après 5 secondes
//   useEffect(() => {
//     if (message.text) {
//       const timer = setTimeout(() => setMessage({ type: '', text: '' }), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   const handleInputChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//     if (message.text) {
//       setMessage({ type: '', text: '' });
//     }
//   }, [errors, message]);

//   const validateForm = useCallback(() => {
//     const newErrors = {};
//     if (!formData.identifiant.trim()) {
//       newErrors.identifiant = "L'email ou le téléphone est requis";
//     } else if (
//       formData.identifiant.includes('@') &&
//       !isValidEmail(formData.identifiant)
//     ) {
//       newErrors.identifiant = "L'email n'est pas valide";
//     }
//     if (!formData.motDePasse) {
//       newErrors.motDePasse = 'Le mot de passe est requis';
//     } else if (formData.motDePasse.length < 6) {
//       newErrors.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData]);

//   const saveAuthData = useCallback(
//     (token, user, role) => {
//       try {
//         localStorage.setItem(STORAGE_KEYS.TOKEN, token);
//         localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
//         localStorage.setItem(STORAGE_KEYS.ROLE, role);
//         if (formData.rememberMe) {
//           localStorage.setItem(STORAGE_KEYS.REMEMBER, 'true');
//         } else {
//           localStorage.removeItem(STORAGE_KEYS.REMEMBER);
//         }
//         return true;
//       } catch {
//         return false;
//       }
//     },
//     [formData.rememberMe]
//   );

//   // Extraction générique des données d'authentification selon la configuration du rôle
//   const extractAuthData = useCallback((data, config) => {
//     let token =
//       data.token ||
//       data.accessToken ||
//       data.access_token ||
//       data.jwt ||
//       data.data?.token ||
//       null;
//     let user =
//       data[config.userField] ||
//       data.user ||
//       data.data?.utilisateur ||
//       data.data?.[config.userField] ||
//       null;
//     // Si toujours pas d'utilisateur, on prend l'objet entier s'il contient id et email
//     if (!user && typeof data === 'object' && data.id && data.email) {
//       user = data;
//     }
//     return { token, user };
//   }, []);

//   // Tentative de connexion sur toutes les routes, une par une
//   const attemptAllRoutes = useCallback(async (identifiant, motDePasse) => {
//     let lastError = null;

//     for (const config of ROLE_CONFIGS) {
//       try {
//         const url = config.url;
//         const body = config.bodyFormat(identifiant, motDePasse);

//         const response = await fetch(url, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//           },
//           body: JSON.stringify(body),
//         });

//         const responseText = await response.text();
//         let data;
//         try {
//           data = JSON.parse(responseText);
//         } catch {
//           // Réponse invalide, on continue
//           continue;
//         }

//         if (response.ok) {
//           const { token, user } = extractAuthData(data, config);
//           if (token && user) {
//             // On utilise le rôle défini dans la configuration
//             const role = config.role;
//             if (saveAuthData(token, user, role)) {
//               return { success: true, role, user, token, config };
//             }
//           }
//         }
//       } catch (error) {
//         console.error(`Erreur sur la route ${config.role} :`, error);
//         lastError = error;
//         // Continue vers la prochaine route
//       }
//     }

//     // Si on arrive ici, aucune route n'a fonctionné
//     throw lastError || new Error('Erreur de connexion n\'a fonctionné. Vérifiez vos identifiants.');
//   }, [extractAuthData, saveAuthData]);

//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();
//       if (!validateForm()) return;

//       setIsLoading(true);
//       setMessage({ type: 'info', text: 'Tentative de connexion...' });
//       setDebugInfo(null);

//       try {
//         const result = await attemptAllRoutes(formData.identifiant, formData.motDePasse);
//         if (result.success) {
//           setMessage({
//             type: 'success',
//             text: `Connexion réussie ! Bienvenue ${
//               result.user.nomComplet || result.user.email || result.user.nom || ''
//             } !`,
//           });
//           setTimeout(() => {
//             window.location.href = result.config.page;
//           }, 1500);
//         }
//       } catch (error) {
//         setDebugInfo({
//           error: error.message,
//           identifiant: formData.identifiant,
//           timestamp: new Date().toISOString(),
//         });
//         setMessage({
//           type: 'error',
//           text: error.message || 'Identifiants incorrects ou aucun compte trouvé.',
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [formData, validateForm, attemptAllRoutes]
//   );

  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center relative overflow-hidden">
//       {/* Ambient background blobs */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none z-0"
//         style={{
//           background:
//             'radial-gradient(ellipse, rgba(45, 138, 94, 0.03) 0%, transparent 70%)',
//         }}
//       />
//       <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none z-0"
//         style={{
//           background:
//             'radial-gradient(ellipse, rgba(45, 138, 94, 0.02) 0%, transparent 70%)',
//         }}
//       />

//       {/* Main container */}
//       <div className="relative z-10 w-full max-w-[450px] mx-auto px-4">
//         <div className="bg-white rounded-[1.75rem] border border-green-100 shadow-lg p-10">
//           {/* Logo */}
//           <div className="flex items-center justify-center gap-3 mb-8">
//   <img src={logo} alt="EcoCollect Logo" className="h-[70px] w-auto rounded-[15px]" />
//   <a href="/" className="text-xl font-bold text-green-700">
    
//   </a>
// </div>

//           {/* Title */}
//           <h1 className="text-center font-serif text-3xl font-semibold text-gray-900 mb-8 flex items-center justify-center gap-2">
//             <span>se connecter</span>
//           </h1>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email/Phone Input */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">
//                 Email
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="identifiant"
//                   value={formData.identifiant}
//                   onChange={handleInputChange}
//                   disabled={isLoading}
//                   placeholder="Entrez votre email ou téléphone"
//                   className={`w-full px-4 py-3 pl-10 rounded-xl bg-green-50 border-2 transition-all outline-none ${
//                     errors.identifiant
//                       ? 'border-red-500'
//                       : 'border-green-100 focus:border-green-600 focus:shadow-sm focus:shadow-green-200'
//                   } disabled:opacity-70 disabled:cursor-not-allowed`}
//                 />
//                 <svg
//                   className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               {errors.identifiant && (
//                 <p className="text-red-600 text-xs mt-1 font-medium">
//                   {errors.identifiant}
//                 </p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">
//                 Mot de passe
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="motDePasse"
//                   value={formData.motDePasse}
//                   onChange={handleInputChange}
//                   disabled={isLoading}
//                   placeholder="Entrez votre mot de passe"
//                   className={`w-full px-4 py-3 pl-10 rounded-xl bg-green-50 border-2 transition-all outline-none ${
//                     errors.motDePasse
//                       ? 'border-red-500'
//                       : 'border-green-100 focus:border-green-600 focus:shadow-sm focus:shadow-green-200'
//                   } disabled:opacity-70 disabled:cursor-not-allowed`}
//                 />
//                 <svg
//                   className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                   />
//                 </svg>
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   disabled={isLoading}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   aria-label={
//                     showPassword
//                       ? 'Masquer le mot de passe'
//                       : 'Afficher le mot de passe'
//                   }
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//               {errors.motDePasse && (
//                 <p className="text-red-600 text-xs mt-1 font-medium">
//                   {errors.motDePasse}
//                 </p>
//               )}
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 rounded accent-green-600 cursor-pointer"
//                 />
//                 <span className="text-sm text-gray-700">Se souvenir de moi</span>
//               </label>
//               <a
//                 href="/forgot-password"
//                 className="text-sm font-semibold text-green-600 hover:underline"
//               >
//                 Mot de passe oublié ?
//               </a>
//             </div>

//             {/* Message Alert */}
//             {message.text && (
//               <div
//                 className={`p-4 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
//                   message.type === 'success'
//                     ? 'bg-green-100 text-green-800 border border-green-300'
//                     : message.type === 'error'
//                       ? 'bg-red-100 text-red-800 border border-red-300'
//                       : 'bg-blue-100 text-blue-800 border border-blue-300'
//                 }`}
//               >
//                 {message.text}
//               </div>
//             )}

//             {/* Submit Button - FIXED: Use stable container span */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-3 mt-6 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-full transition-all transform hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
//             >
//               {isLoading ? (
//                 <span className="inline-flex items-center gap-2">
//                   <svg
//                     className="animate-spin h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   <span>Connexion en cours...</span>
//                 </span>
//               ) : (
//                 <span>Se connecter</span>
//               )}
//             </button>
//           </form>

//           {/* Links */}
//           <div className="mt-8 space-y-3 text-center">
//             <p className="text-gray-600 text-sm">
//               Pas encore de compte ?{' '}
//               <a href="/register" className="font-semibold text-green-600 hover:underline">
//                 S'inscrire
//               </a>
//             </p>
//             <a
//               href="/"
//               className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 text-sm transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span>Retour à l'accueil</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;