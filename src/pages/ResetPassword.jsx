// // ResetPassword.js
// import { useState, useEffect } from 'react';
// import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
// import logo from '../assets/logo.jpeg';

// const ResetPassword = () => {
//   const [formData, setFormData] = useState({
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
//   const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '–' });

 
// // const API_URL = 'http://localhost:3000';
// const API_URL = 'https://ecocollect.cm/api';
//   useEffect(() => {
//     const storedEmail = sessionStorage.getItem('reset_email');
//     const storedCode = sessionStorage.getItem('reset_code');
//     if (!storedEmail || !storedCode) {
//       window.location.href = '/forgot-password';
//     }
//   }, []);

//   const checkPasswordStrength = (password) => {
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

//     setPasswordStrength({ score, label });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     if (name === 'newPassword') {
//       checkPasswordStrength(value);
//     }

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//     if (serverMessage.text) {
//       setServerMessage({ type: '', text: '' });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.newPassword) {
//       newErrors.newPassword = 'Le nouveau mot de passe est requis';
//     } else if (formData.newPassword.length < 6) {
//       newErrors.newPassword = 'Minimum 6 caractères';
//     }

//     if (formData.newPassword !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     setServerMessage({ type: 'info', text: 'Réinitialisation en cours...' });

//     try {
//       const email = sessionStorage.getItem('reset_email');
//       const code = sessionStorage.getItem('reset_code');

//       const response = await fetch(`${API_URL}/api/auth/reinitialiser-mdp-code`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email,
//           code,
//           nouveauMotDePasse: formData.newPassword
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         setServerMessage({ type: 'success', text: 'Mot de passe réinitialisé !' });
//         sessionStorage.removeItem('reset_email');
//         sessionStorage.removeItem('reset_code');
//         setTimeout(() => window.location.href = '/login', 2000);
//       } else {
//         throw new Error(data.message || 'Erreur lors de la réinitialisation');
//       }
//     } catch (error) {
//       setServerMessage({ type: 'error', text: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStrengthColor = () => {
//     if (passwordStrength.score <= 1) return '#dc2626';
//     if (passwordStrength.score === 2) return '#e0a020';
//     if (passwordStrength.score >= 3) return '#2d8a5e';
//     return '#d9e0d9';
//   };

//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

//     * { margin: 0; padding: 0; box-sizing: border-box; }

//     :root {
//       --background: #f8faf8;
//       --foreground: #1a1e1a;
//       --card: #ffffff;
//       --primary: #2d8a5e;
//       --secondary: #e8f3e8;
//       --secondary-foreground: #1a5c3a;
//       --muted: #f0f3f0;
//       --muted-foreground: #5a655a;
//       --destructive: #dc2626;
//       --border: #d9e0d9;
//       --ring: #2d8a5e;
//       --radius: 0.75rem;
//       --radius-xl: 1.75rem;
//       --shadow-lg: 0 10px 40px -8px rgba(0, 0, 0, 0.08);
      
//       --ff-head: 'DM Serif Display', Georgia, serif;
//       --ff-body: 'Outfit', sans-serif;
//       --ease: cubic-bezier(.4,0,.2,1);
//       --spring: cubic-bezier(.34,1.56,.64,1);
//     }

//     body {
//       font-family: var(--ff-body);
//       background: var(--background);
//       color: var(--foreground);
//       min-height: 100vh;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 1rem;
//       position: relative;
//     }

//     body::before {
//       content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
//       background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
//       opacity: .015;
//     }

//     .ambient {
//       position: fixed; pointer-events: none; z-index: 0;
//       border-radius: 50%; filter: blur(100px);
//     }

//     .ambient-1 { 
//       width: 600px; height: 400px; top: 0; left: 50%; transform: translateX(-50%);
//       background: radial-gradient(ellipse, rgba(45,138,94,0.03) 0%, transparent 70%); 
//     }

//     .ambient-2 { 
//       width: 400px; height: 300px; bottom: 10%; right: 5%;
//       background: radial-gradient(ellipse, rgba(45,138,94,0.02) 0%, transparent 70%); 
//     }

//     .auth-container {
//       max-width: 450px;
//       width: 100%;
//       background: var(--card);
//       border-radius: var(--radius-xl);
//       padding: 2.5rem;
//       border: 1px solid var(--border);
//       box-shadow: var(--shadow-lg);
//       animation: fadeIn 0.5s var(--spring) both;
//       position: relative;
//       z-index: 1;
//     }

//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(24px); }
//       to { opacity: 1; transform: translateY(0); }
//     }

//     .logo {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       margin-bottom: 2rem;
//     }

//     .logo-img {
//       height: 70px;
//       width: auto;
//       border-radius: 15px;
//       transition: transform 0.3s var(--spring);
//     }

//     .logo-img:hover {
//       transform: scale(1.05);
//     }

//     h1 {
//       font-family: var(--ff-head);
//       text-align: center;
//       margin-bottom: 1rem;
//       font-size: 2rem;
//       color: var(--foreground);
//     }

//     h1 em {
//       color: var(--primary);
//       font-style: italic;
//     }

//     .subtitle {
//       text-align: center;
//       color: var(--muted-foreground);
//       margin-bottom: 2rem;
//       line-height: 1.6;
//     }

//     .form-group {
//       margin-bottom: 1.5rem;
//     }

//     label {
//       display: block;
//       margin-bottom: 0.5rem;
//       font-size: 0.9rem;
//       font-weight: 600;
//       color: var(--foreground);
//     }

//     label svg {
//       color: var(--primary);
//       margin-right: 0.5rem;
//       vertical-align: middle;
//     }

//     .input-wrap {
//       position: relative;
//     }

//     .input-icon {
//       position: absolute;
//       left: 1rem;
//       top: 50%;
//       transform: translateY(-50%);
//       color: var(--muted-foreground);
//     }

//     input {
//       width: 100%;
//       padding: 0.9rem 1rem 0.9rem 2.5rem;
//       border-radius: var(--radius);
//       background: var(--muted);
//       border: 1.5px solid var(--border);
//       color: var(--foreground);
//       font-size: 0.95rem;
//       font-family: var(--ff-body);
//       transition: all 0.2s var(--ease);
//       outline: none;
//     }

//     input:focus {
//       border-color: var(--ring);
//       box-shadow: 0 0 0 3px rgba(45, 138, 94, 0.1);
//     }

//     input.error {
//       border-color: var(--destructive);
//     }

//     .toggle-password {
//       position: absolute;
//       right: 1rem;
//       top: 50%;
//       transform: translateY(-50%);
//       background: none;
//       border: none;
//       cursor: pointer;
//       color: var(--muted-foreground);
//       font-size: 1.1rem;
//       display: flex;
//       align-items: center;
//     }

//     .toggle-password:hover {
//       color: var(--primary);
//     }

//     .error-text {
//       color: var(--destructive);
//       font-size: 0.75rem;
//       margin-top: 0.25rem;
//     }

//     .password-strength {
//       margin-top: 0.5rem;
//     }

//     .strength-bar {
//       height: 4px;
//       background: var(--muted);
//       border-radius: 100px;
//       overflow: hidden;
//       margin-bottom: 0.25rem;
//     }

//     .strength-fill {
//       height: 100%;
//       transition: width 0.3s;
//     }

//     .strength-label {
//       font-size: 0.75rem;
//       color: var(--muted-foreground);
//     }

//     .btn {
//       width: 100%;
//       padding: 1rem;
//       border: none;
//       border-radius: 100px;
//       cursor: pointer;
//       font-family: var(--ff-body);
//       font-weight: 700;
//       font-size: 1rem;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       gap: 0.75rem;
//       transition: all 0.3s var(--spring);
//       background: var(--primary);
//       color: white;
//       box-shadow: 0 4px 15px rgba(45, 138, 94, 0.2);
//     }

//     .btn:hover:not(:disabled) {
//       transform: translateY(-3px);
//       box-shadow: 0 8px 25px rgba(45, 138, 94, 0.3);
//     }

//     .btn:disabled {
//       opacity: 0.6;
//       cursor: not-allowed;
//     }

//     .spinner {
//       width: 1.2rem;
//       height: 1.2rem;
//       border: 2px solid rgba(255, 255, 255, 0.3);
//       border-radius: 50%;
//       border-top-color: white;
//       animation: spin 0.8s linear infinite;
//     }

//     @keyframes spin {
//       to { transform: rotate(360deg); }
//     }

//     .message {
//       padding: 1rem;
//       margin-top: 1rem;
//       border-radius: var(--radius);
//       font-size: 0.9rem;
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//     }

//     .message.success {
//       background: var(--secondary);
//       color: var(--secondary-foreground);
//       border: 1px solid var(--primary);
//     }

//     .message.error {
//       background: rgba(220, 38, 38, 0.1);
//       color: var(--destructive);
//       border: 1px solid var(--destructive);
//     }

//     .message.info {
//       background: rgba(45, 138, 94, 0.05);
//       color: var(--primary);
//       border: 1px solid var(--primary);
//     }

//     .links {
//       text-align: center;
//       margin-top: 1.5rem;
//     }

//     .back-link {
//       display: inline-flex;
//       align-items: center;
//       gap: 0.5rem;
//       color: var(--muted-foreground);
//       text-decoration: none;
//       font-size: 0.9rem;
//     }

//     .back-link:hover {
//       color: var(--primary);
//       transform: translateX(-3px);
//     }

//     .help-box {
//       margin-top: 2rem;
//       padding: 1rem;
//       background: var(--muted);
//       border-radius: var(--radius);
//       border: 1px solid var(--border);
//     }

//     .help-box h3 {
//       font-size: 0.9rem;
//       margin-bottom: 0.5rem;
//       color: var(--foreground);
//     }

//     .help-box ul {
//       list-style: none;
//       font-size: 0.8rem;
//       color: var(--muted-foreground);
//     }

//     .help-box li {
//       margin-bottom: 0.25rem;
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//     }
//   `;

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="ambient ambient-1"></div>
//       <div className="ambient ambient-2"></div>

//       <div className="auth-container">
//         <a href="/" className="logo">
//           <img src={logo} alt="EcoCollect" className="logo-img" />
//         </a>

//         <h1>
//           <em>Nouveau mot de passe</em>
//         </h1>

//         <p className="subtitle">
//           Choisissez un nouveau mot de passe sécurisé
//         </p>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>
//               <Lock size={16} />
//               Nouveau mot de passe
//             </label>
//             <div className="input-wrap">
//               <Lock className="input-icon" size={18} />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="newPassword"
//                 value={formData.newPassword}
//                 onChange={handleInputChange}
//                 className={errors.newPassword ? 'error' : ''}
//                 placeholder="••••••••"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//             {errors.newPassword && <div className="error-text">{errors.newPassword}</div>}
            
//             <div className="password-strength">
//               <div className="strength-bar">
//                 <div 
//                   className="strength-fill" 
//                   style={{ 
//                     width: `${passwordStrength.score * 25}%`,
//                     backgroundColor: getStrengthColor()
//                   }}
//                 ></div>
//               </div>
//               <span className="strength-label">
//                 Force du mot de passe : {passwordStrength.label}
//               </span>
//             </div>
//           </div>

//           <div className="form-group">
//             <label>
//               <Lock size={16} />
//               Confirmer le mot de passe
//             </label>
//             <div className="input-wrap">
//               <Lock className="input-icon" size={18} />
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 className={errors.confirmPassword ? 'error' : ''}
//                 placeholder="••••••••"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//             {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
//           </div>

//           {serverMessage.text && (
//             <div className={`message ${serverMessage.type}`}>
//               <i className={`fas ${
//                 serverMessage.type === 'success' ? 'fa-check-circle' :
//                 serverMessage.type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'
//               }`}></i>
//               {serverMessage.text}
//             </div>
//           )}

//           <button type="submit" className="btn" disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <div className="spinner"></div>
//                 Réinitialisation...
//               </>
//             ) : (
//               <>
//                 <CheckCircle size={18} />
//                 Valider le nouveau mot de passe
//               </>
//             )}
//           </button>
//         </form>

//         <div className="links">
//           <a href="/login" className="back-link">
//             <ArrowLeft size={16} />
//             Retour à la connexion
//           </a>
//         </div>

//         <div className="help-box">
//           <h3>Conseils de sécurité :</h3>
//           <ul>
//             <li><span>•</span> Utilisez un mélange de lettres, chiffres et symboles</li>
//             <li><span>•</span> Évitez les informations personnelles évidentes</li>
//             <li><span>•</span> Ne réutilisez pas d'anciens mots de passe</li>
//           </ul>
//         </div>
//       </div>

//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
//     </>
//   );
// };

// export default ResetPassword;


import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// const API_URL = 'https://ecocollect.cm';

const API_URL = ''; 

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '–',
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('reset_email');
    const storedCode = sessionStorage.getItem('reset_code');
    if (!storedEmail || !storedCode) {
      window.location.href = '/forgot-password';
    }
  }, []);

  const checkPasswordStrength = useCallback((password) => {
    let score = 0;
    let label = 'Faible';

    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score === 0) label = '–';
    else if (score <= 1) label = 'Faible';
    else if (score === 2) label = 'Moyen';
    else if (score === 3) label = 'Bon';
    else if (score === 4) label = 'Fort';

    setPasswordStrength({ score, label });
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === 'newPassword') {
        checkPasswordStrength(value);
      }

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
      if (serverMessage.text) {
        setServerMessage({ type: '', text: '' });
      }
    },
    [errors, serverMessage, checkPasswordStrength]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'Le nouveau mot de passe est requis';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Minimum 6 caractères';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsLoading(true);
      setServerMessage({ type: 'info', text: 'Réinitialisation en cours...' });

      try {
        const email = sessionStorage.getItem('reset_email');
        const code = sessionStorage.getItem('reset_code');

        const response = await fetch(
          `${API_URL}/api/auth/reinitialiser-mdp-code`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              code,
              nouveauMotDePasse: formData.newPassword,
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          setServerMessage({
            type: 'success',
            text: 'Mot de passe réinitialisé !',
          });
          sessionStorage.removeItem('reset_email');
          sessionStorage.removeItem('reset_code');
          setTimeout(() => (window.location.href = '/login'), 2000);
        } else {
          throw new Error(
            data.message || 'Erreur lors de la réinitialisation'
          );
        }
      } catch (error) {
        setServerMessage({ type: 'error', text: error.message });
      } finally {
        setIsLoading(false);
      }
    },
    [validateForm, formData.newPassword]
  );

  const getStrengthColor = () => {
    if (passwordStrength.score <= 1) return 'bg-red-500';
    if (passwordStrength.score === 2) return 'bg-yellow-500';
    if (passwordStrength.score >= 3) return 'bg-green-600';
    return 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center relative overflow-hidden">
      {/* Ambient background blobs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse, rgba(45, 138, 94, 0.03) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse, rgba(45, 138, 94, 0.02) 0%, transparent 70%)',
        }}
      />

      {/* Main container */}
      <div className="relative z-10 w-full max-w-[450px] mx-auto px-4">
        <div className="bg-white rounded-[1.75rem] border border-green-100 shadow-lg p-10">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center justify-center w-[70px] h-[70px] bg-green-100 rounded-[15px]">
              <Lock className="w-10 h-10 text-green-600" />
            </div>
          </Link>

          {/* Title */}
          <h1 className="text-center font-serif text-3xl font-semibold text-gray-900 mb-2">
            Nouveau mot de passe
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 text-sm mb-8">
            Choisissez un nouveau mot de passe sécurisé
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pl-10 rounded-xl bg-green-50 border-2 transition-all outline-none ${
                    errors.newPassword
                      ? 'border-red-500'
                      : 'border-green-100 focus:border-green-600 focus:shadow-sm focus:shadow-green-200'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-600 text-xs mt-1 font-medium">
                  {errors.newPassword}
                </p>
              )}

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="mt-3">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i < passwordStrength.score
                            ? getStrengthColor()
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5">
                    Force du mot de passe :{' '}
                    <span
                      className={`font-semibold ${
                        passwordStrength.score <= 1
                          ? 'text-red-600'
                          : passwordStrength.score === 2
                            ? 'text-yellow-600'
                            : 'text-green-600'
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pl-10 rounded-xl bg-green-50 border-2 transition-all outline-none ${
                    errors.confirmPassword
                      ? 'border-red-500'
                      : 'border-green-100 focus:border-green-600 focus:shadow-sm focus:shadow-green-200'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1 font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Message Alert */}
            {serverMessage.text && (
              <div
                className={`p-4 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
                  serverMessage.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : serverMessage.type === 'error'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}
              >
                {serverMessage.text}
              </div>
            )}

            {/* Submit Button - Stabilized */}
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
                  <span>Réinitialisation...</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Valider le nouveau mot de passe</span>
                </span>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à la connexion</span>
            </Link>
          </div>

          {/* Help Box */}
          <div className="mt-8 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Conseils de sécurité :
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>
                  Utilisez un mélange de lettres, chiffres et symboles
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Évitez les informations personnelles évidentes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Ne réutilisez pas d'anciens mots de passe</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;