

import React, { useState, useRef, useEffect, useCallback } from 'react';
import logo from '../assets/logo.jpeg';

// ============================================================
// CONSTANTES & UTILITAIRES
// ============================================================

const API_URL = '';

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


  // VALIDATIONS
 

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


const submitCollecteur = useCallback(async () => {
  if (!collecteurForm.cgu) {
    setMessage({ type: 'error', text: 'Vous devez accepter les conditions générales d\'utilisation' });
    return;
  }

  setIsLoading(true);
  setMessage({ type: 'info', text: 'Création de votre compte en cours...' });

  try {
    const formData = new FormData();
    
   
    formData.append('email', collecteurForm.email.trim());
    formData.append('telephone', collecteurForm.phone.trim());
    formData.append('motDePasse', collecteurForm.password);
    formData.append('typeCollecteur', collecteurForm.type);
    formData.append('nomComplet', collecteurForm.nomComplet.trim());
    formData.append('zoneInterventionNom', collecteurForm.zone.trim()); 
    formData.append('cguAcceptees', collecteurForm.cgu);
    
    
    if (collecteurForm.identite) {
      formData.append('numeroIdentite', collecteurForm.identite.trim()); 
    }
    if (collecteurForm.quartiers) {
      formData.append('quartiersHabituels', collecteurForm.quartiers.trim()); 
    }
    if (collecteurForm.communes) {
      formData.append('communesIntervention', collecteurForm.communes.trim()); 
    }
    
    if (collecteurForm.photo) {
  formData.append('photoProfil', collecteurForm.photo);
  }
  if (collecteurForm.photoCniRecto) {
  formData.append('photoCniRecto', collecteurForm.photoCniRecto);
  }
  if (collecteurForm.photoCniVerso) {
   formData.append('photoCniVerso', collecteurForm.photoCniVerso);
  }

    const response = await fetch(`${API_URL}/api/collecteurs/inscription`, {
      method: 'POST',
      body: formData  
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
                      <label className="reg-label">Téléphone *</label>
                      <input
                        className="reg-input"
                        type="tel"
                        placeholder="+237 XX XX XX XX"
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
                        placeholder="+237 XX XX XX XX"
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