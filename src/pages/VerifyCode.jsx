// // VerifyCode.js
// import { useState, useEffect } from 'react';
// import { Key, ArrowLeft, CheckCircle, Mail } from 'lucide-react';
// import logo from '../assets/logo.jpeg';

// const VerifyCode = () => {
//   const [code, setCode] = useState(['', '', '', '', '', '']);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
//   const [email, setEmail] = useState('');

//   // ANCIENNE API : const API_URL = 'https://ecobackend-7tuh.vercel.app';


// // const API_URL = 'http://localhost:3000';
// const API_URL = 'https://ecocollect.cm/api';
//   useEffect(() => {
//     const storedEmail = sessionStorage.getItem('reset_email');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     } else {
//       window.location.href = '/forgot-password';
//     }
//   }, []);

//   const handleCodeChange = (index, value) => {
//     if (value.length > 1) {
//       const digits = value.replace(/\D/g, '').split('');
//       const newCode = [...code];
//       digits.forEach((digit, i) => {
//         if (index + i < 6) newCode[index + i] = digit;
//       });
//       setCode(newCode);
//       const nextIndex = Math.min(index + digits.length, 5);
//       document.getElementById(`code-${nextIndex}`)?.focus();
//     } else {
//       const newCode = [...code];
//       newCode[index] = value.replace(/\D/g, '');
//       setCode(newCode);
//       if (value && index < 5) {
//         document.getElementById(`code-${index + 1}`)?.focus();
//       }
//     }
//     if (errors.code) setErrors({});
//     if (serverMessage.text) setServerMessage({ type: '', text: '' });
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !code[index] && index > 0) {
//       document.getElementById(`code-${index - 1}`)?.focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
//     if (pastedData.length >= 6) {
//       const digits = pastedData.slice(0, 6).split('');
//       setCode(digits);
//       document.getElementById('code-5')?.focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const fullCode = code.join('');
    
//     if (fullCode.length !== 6) {
//       setErrors({ code: 'Veuillez entrer les 6 chiffres du code' });
//       return;
//     }

//     setIsLoading(true);
//     setServerMessage({ type: 'info', text: 'Vérification du code...' });

//     try {
//       const response = await fetch(`${API_URL}/api/auth/verifier-code-reinitialisation`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, code: fullCode })
//       });

//       const data = await response.json();

//       if (data.success) {
//         setServerMessage({ type: 'success', text: 'Code valide ! Redirection...' });
//         sessionStorage.setItem('reset_code', fullCode);
//         setTimeout(() => window.location.href = '/reset-password', 1500);
//       } else {
//         throw new Error(data.message || 'Code invalide');
//       }
//     } catch (error) {
//       setServerMessage({ type: 'error', text: error.message || 'Code invalide ou expiré' });
//       setCode(['', '', '', '', '', '']);
//       document.getElementById('code-0')?.focus();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendCode = async () => {
//     setIsLoading(true);
//     setServerMessage({ type: 'info', text: 'Renvoi du code...' });

//     try {
//       const response = await fetch(`${API_URL}/api/auth/demande-reinitialisation-mdp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       });

//       const data = await response.json();

//       if (data.success) {
//         setServerMessage({ type: 'success', text: 'Nouveau code envoyé !' });
//         setCode(['', '', '', '', '', '']);
//         document.getElementById('code-0')?.focus();
//       } else {
//         throw new Error(data.message || 'Erreur lors du renvoi');
//       }
//     } catch (error) {
//       setServerMessage({ type: 'error', text: error.message });
//     } finally {
//       setIsLoading(false);
//     }
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

//     .email-display {
//       text-align: center;
//       color: var(--muted-foreground);
//       margin-bottom: 2rem;
//       font-size: 0.95rem;
//     }

//     .email-display strong {
//       color: var(--foreground);
//       font-weight: 600;
//     }

//     .code-input-group {
//       display: flex;
//       justify-content: space-between;
//       gap: 0.5rem;
//       margin: 1.5rem 0;
//     }

//     .code-input {
//       width: 3rem;
//       height: 3.5rem;
//       text-align: center;
//       font-size: 1.5rem;
//       font-weight: 600;
//       font-family: 'Courier New', monospace;
//       border: 2px solid var(--border);
//       border-radius: var(--radius);
//       background: var(--muted);
//       color: var(--foreground);
//       transition: all 0.2s var(--ease);
//       outline: none;
//     }

//     .code-input:focus {
//       border-color: var(--primary);
//       box-shadow: 0 0 0 3px rgba(45, 138, 94, 0.1);
//     }

//     .code-input.error {
//       border-color: var(--destructive);
//     }

//     .timer {
//       text-align: center;
//       font-size: 0.9rem;
//       color: var(--muted-foreground);
//       margin-bottom: 1.5rem;
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

//     .btn.secondary {
//       background: transparent;
//       color: var(--muted-foreground);
//       border: 2px solid var(--border);
//       box-shadow: none;
//     }

//     .btn.secondary:hover:not(:disabled) {
//       background: var(--muted);
//       color: var(--foreground);
//       transform: none;
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

//     .button-group {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       margin-top: 1.5rem;
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
//           <em>Vérification du code</em>
//         </h1>

//         <div className="email-display">
//           <Mail size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
//           Code envoyé à <strong>{email}</strong>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="code-input-group" onPaste={handlePaste}>
//             {code.map((digit, index) => (
//               <input
//                 key={index}
//                 id={`code-${index}`}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleCodeChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 className={`code-input ${errors.code ? 'error' : ''}`}
//               />
//             ))}
//           </div>
//           {errors.code && <div className="error-text" style={{ textAlign: 'center' }}>{errors.code}</div>}

//           <div className="timer">
//             <i className="far fa-clock"></i> Code valide 15 minutes
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

//           <div className="button-group">
//             <button type="submit" className="btn" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <div className="spinner"></div>
//                   Vérification...
//                 </>
//               ) : (
//                 <>
//                   <CheckCircle size={18} />
//                   Vérifier le code
//                 </>
//               )}
//             </button>

//             <button type="button" className="btn secondary" onClick={handleResendCode} disabled={isLoading}>
//               Renvoyer le code
//             </button>
//           </div>
//         </form>

//         <div className="links">
//           <a href="/forgot-password" className="back-link">
//             <ArrowLeft size={16} />
//             Modifier mon email
//           </a>
//         </div>

//         <div className="help-box">
//           <h3>Vous ne recevez pas le code ?</h3>
//           <ul>
//             <li><span>•</span> Vérifiez vos spams / courriers indésirables</li>
//             <li><span>•</span> Attendez 2 minutes avant de renvoyer</li>
//             <li><span>•</span> Vérifiez que votre email est correct</li>
//             <li><span>•</span> Contactez le support si le problème persiste</li>
//           </ul>
//         </div>
//       </div>

//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
//     </>
//   );
// };

// export default VerifyCode;



import React, { useState, useEffect, useCallback } from 'react';
import { Key, ArrowLeft, CheckCircle, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// const API_URL = 'https://ecocollect.cm';

const API_URL = ''; 

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('reset_email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      window.location.href = '/forgot-password';
    }
  }, []);

  const handleCodeChange = useCallback((index, value) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').split('');
      const newCode = [...code];
      digits.forEach((digit, i) => {
        if (index + i < 6) newCode[index + i] = digit;
      });
      setCode(newCode);
      const nextIndex = Math.min(index + digits.length, 5);
      document.getElementById(`code-${nextIndex}`)?.focus();
    } else {
      const newCode = [...code];
      newCode[index] = value.replace(/\D/g, '');
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
    if (errors.code) setErrors({});
    if (serverMessage.text) setServerMessage({ type: '', text: '' });
  }, [code, errors, serverMessage]);

  const handleKeyDown = useCallback((index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  }, [code]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text/plain')
      .replace(/\D/g, '');
    if (pastedData.length >= 6) {
      const digits = pastedData.slice(0, 6).split('');
      setCode(digits);
      document.getElementById('code-5')?.focus();
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const fullCode = code.join('');

    if (fullCode.length !== 6) {
      setErrors({ code: 'Veuillez entrer les 6 chiffres du code' });
      return;
    }

    setIsLoading(true);
    setServerMessage({ type: 'info', text: 'Vérification du code...' });

    try {
      const response = await fetch(
        `${API_URL}/api/auth/verifier-code-reinitialisation`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code: fullCode }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setServerMessage({
          type: 'success',
          text: 'Code valide ! Redirection...',
        });
        sessionStorage.setItem('reset_code', fullCode);
        setTimeout(() => (window.location.href = '/reset-password'), 1500);
      } else {
        throw new Error(data.message || 'Code invalide');
      }
    } catch (error) {
      setServerMessage({
        type: 'error',
        text: error.message || 'Code invalide ou expiré',
      });
      setCode(['', '', '', '', '', '']);
      document.getElementById('code-0')?.focus();
    } finally {
      setIsLoading(false);
    }
  }, [code, email]);

  const handleResendCode = useCallback(async () => {
    setIsLoading(true);
    setServerMessage({ type: 'info', text: 'Renvoi du code...' });

    try {
      const response = await fetch(
        `${API_URL}/api/auth/demande-reinitialisation-mdp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setServerMessage({
          type: 'success',
          text: 'Nouveau code envoyé !',
        });
        setCode(['', '', '', '', '', '']);
        document.getElementById('code-0')?.focus();
      } else {
        throw new Error(data.message || 'Erreur lors du renvoi');
      }
    } catch (error) {
      setServerMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  }, [email]);

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
              <Key className="w-10 h-10 text-green-600" />
            </div>
          </Link>

          {/* Title */}
          <h1 className="text-center font-serif text-3xl font-semibold text-gray-900 mb-2">
            Vérification du code
          </h1>

          {/* Email Display */}
          <div className="text-center text-gray-600 text-sm mb-8 flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-green-600" />
            <span>
              Code envoyé à <strong className="text-gray-900">{email}</strong>
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code Input Group */}
            <div onPaste={handlePaste} className="space-y-4">
              <div className="flex justify-between gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-14 text-2xl font-bold text-center rounded-lg border-2 transition-all outline-none ${
                      errors.code
                        ? 'border-red-500 bg-red-50'
                        : 'border-green-100 bg-green-50 focus:border-green-600 focus:shadow-sm focus:shadow-green-200'
                    }`}
                  />
                ))}
              </div>
              {errors.code && (
                <p className="text-red-600 text-xs font-medium text-center">
                  {errors.code}
                </p>
              )}
            </div>

            {/* Timer Info */}
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <Clock className="w-4 h-4 text-green-600" />
              <span>Code valide 15 minutes</span>
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
              className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-full transition-all transform hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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
                  <span>Vérification...</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Vérifier le code</span>
                </span>
              )}
            </button>

            {/* Resend Button */}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
              className="w-full py-3 bg-white hover:bg-gray-50 text-green-600 font-bold rounded-full transition-all border-2 border-green-200 hover:border-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Renvoyer le code
            </button>
          </form>

          {/* Links */}
          <div className="mt-8 text-center">
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Modifier mon email</span>
            </Link>
          </div>

          {/* Help Box */}
          <div className="mt-8 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Vous ne recevez pas le code ?
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Vérifiez vos spams / courriers indésirables</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Attendez 2 minutes avant de renvoyer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Vérifiez que votre email est correct</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Contactez le support si le problème persiste</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;