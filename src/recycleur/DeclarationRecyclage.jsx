// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import DashboardLayout from '../../Layouts/LayoutDashboard';
// // import recycleurService from '../../services/recycleurService';
// // import { FiUpload, FiFileText, FiPackage, FiInfo, FiAlertCircle, FiFile } from 'react-icons/fi';
// // import toast from 'react-hot-toast';

// // // ✅ FIX 1 : styles ET keyframe injectés UNE SEULE FOIS dans <head>, hors du composant.
// // // Mettre <style> dans le return() ou dans le corps du composant corrompt l'arbre
// // // de fibres React → insertBefore crash à chaque re-render.
// // if (typeof document !== 'undefined' && !document.getElementById('_decl-styles')) {
// //   const el = document.createElement('style');
// //   el.id = '_decl-styles';
// //   el.textContent = `
// //     @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
// //     .declaration-container { max-width: 800px; margin: 0 auto; padding: 1.5rem; }
// //     .declaration-card { background: white; border-radius: 1rem; padding: 2rem; border: 1px solid #d9e0d9; }
// //     .declaration-title { font-size: 1.5rem; font-weight: 700; color: #1a1e1a; margin-bottom: 2rem; }
// //     .stock-info-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem; }
// //     .stock-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem; }
// //     .stock-item { background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; text-align: center; }
// //     .stock-item .type { font-size: 0.9rem; opacity: 0.9; margin-bottom: 0.5rem; }
// //     .stock-item .quantity { font-size: 1.3rem; font-weight: bold; }
// //     .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
// //     .form-group { margin-bottom: 1.5rem; }
// //     .form-group.full-width { grid-column: span 2; }
// //     .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #1a1e1a; }
// //     .form-group label span { color: #dc2626; margin-left: 0.25rem; }
// //     .form-group select, .form-group input, .form-group textarea { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #d9e0d9; border-radius: 0.75rem; font-size: 0.95rem; transition: all 0.2s; box-sizing: border-box; }
// //     .form-group select:focus, .form-group input:focus { border-color: #2d8a5e; outline: none; box-shadow: 0 0 0 3px rgba(45,138,94,0.1); }
// //     .form-group select:disabled, .form-group input:disabled { background: #f8faf8; cursor: not-allowed; }
// //     .stock-disponible { margin-top: 0.5rem; padding: 0.5rem; background: #e8f3e8; border-radius: 0.5rem; font-size: 0.9rem; color: #2d8a5e; display: flex; align-items: center; gap: 0.5rem; }
// //     .stock-error { margin-top: 0.5rem; padding: 0.5rem; background: #fee2e2; border-radius: 0.5rem; font-size: 0.9rem; color: #dc2626; display: flex; align-items: center; gap: 0.5rem; }
// //     .file-upload { border: 2px dashed #d9e0d9; border-radius: 0.75rem; padding: 2rem; text-align: center; cursor: pointer; transition: all 0.3s; }
// //     .file-upload:hover { border-color: #2d8a5e; background: #e8f3e8; }
// //     .file-upload p { color: #5a655a; margin: 0.5rem 0; }
// //     .file-upload small { color: #9aa69a; font-size: 0.8rem; }
// //     .certificat-preview { margin-top: 1rem; padding: 1rem; background: #f8faf8; border-radius: 0.75rem; display: flex; align-items: center; gap: 1rem; }
// //     .certificat-preview img { width: 50px; height: 50px; object-fit: cover; border-radius: 0.5rem; }
// //     .form-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #d9e0d9; }
// //     .btn-primary { background: #2d8a5e; color: white; border: none; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s; }
// //     .btn-primary:hover:not(:disabled) { background: #1e5e3f; transform: translateY(-2px); }
// //     .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
// //     .btn-secondary { background: #f8faf8; color: #1a1e1a; border: 1.5px solid #d9e0d9; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s; }
// //     .btn-secondary:hover { background: #e8f3e8; }
// //     .info-box { background: #e8f3e8; border-radius: 0.75rem; padding: 1rem; margin-bottom: 1.5rem; color: #1a1e1a; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem; }
// //     .decl-spinner { display: inline-block; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; width: 18px; height: 18px; animation: spin 1s linear infinite; flex-shrink: 0; }
// //     .decl-spinner-gray { display: block; border: 2px solid #f3f3f3; border-top: 2px solid #2d8a5e; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; margin: 0 auto; }
// //     @media (max-width: 768px) {
// //       .form-grid { grid-template-columns: 1fr; }
// //       .form-group.full-width { grid-column: span 1; }
// //       .form-actions { flex-direction: column; }
// //       .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
// //     }
// //   `;
// //   document.head.appendChild(el);
// // }



// // // ✅ FIX 2 : constantes hors du composant — pas de recréation à chaque render.
// // const TYPES_DECHET = [
// //   { value: 'plastique_pet',  label: 'Plastique PET' },
// //   { value: 'plastique_pehd', label: 'Plastique PEHD' },
// //   { value: 'papier_carton',  label: 'Papier/Carton' },
// //   { value: 'metal',          label: 'Métal' },
// //   { value: 'verre',          label: 'Verre' },
// //   { value: 'organique',      label: 'Organique' },
// // ];

// // const TYPE_LABELS = {
// //   plastique_pet:  'Plastique PET',
// //   plastique_pehd: 'Plastique PEHD',
// //   papier_carton:  'Papier/Carton',
// //   metal:          'Métal',
// //   verre:          'Verre',
// //   organique:      'Organique',
// // };

// // const getTypeLabel = (type) => TYPE_LABELS[type] || type;


// // const CertificatPreview = ({ preview, fichier }) => {
// //   if (!preview) return null;
// //   return (
// //     <div className="certificat-preview">
// //       {preview.startsWith('data:image') ? (
// //         <img src={preview} alt="Aperçu du certificat" />
// //       ) : (
// //         <FiFile size={36} color="#2d8a5e" />
// //       )}
// //       <div>
// //         <strong>{fichier?.name}</strong>
// //         <p style={{ fontSize: '0.8rem', color: '#5a655a', margin: 0 }}>
// //           {fichier ? (fichier.size / 1024).toFixed(0) : 0} KB
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // const BoutonSoumettre = ({ submitting, stockError }) => (
// //   <button
// //     type="submit"
// //     className="btn-primary"
// //     disabled={submitting || !!stockError}
// //   >
// //     {submitting ? (
// //       <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //         <span className="decl-spinner" />
// //         Envoi en cours...
// //       </span>
// //     ) : (
// //       <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //         <FiFileText size={16} />
// //         Déclarer le recyclage
// //       </span>
// //     )}
// //   </button>
// // );

// // // ============================================================
// // const DeclarationRecyclage = () => {
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     demandeId: '',
// //     typeDechet: '',
// //     quantite: '',
// //     dateRecyclage: new Date().toISOString().split('T')[0],
// //     certificat: null,
// //   });

// //   const [demandes,         setDemandes]         = useState([]);
// //   const [monStock,         setMonStock]          = useState([]);
// //   const [stockDisponible,  setStockDisponible]   = useState(0);
// //   const [loading,          setLoading]           = useState(false);
// //   const [submitting,       setSubmitting]        = useState(false);
// //   const [certificatPreview,setCertificatPreview] = useState(null);
// //   const [user,             setUser]              = useState(null);
// //   const [stockError,       setStockError]        = useState('');

// //   useEffect(() => {
// //     const userData = JSON.parse(localStorage.getItem('ecocollect_user') || 'null');
// //     setUser(userData);
// //     loadInitialData();
// //   }, []);

// //   const loadInitialData = async () => {
// //     try {
// //       setLoading(true);
// //       const demandesData = await recycleurService.getMesDemandes('realisee');
// //       setDemandes(demandesData.demandes || []);
// //       await loadMonStock();
// //     } catch (error) {
// //       console.error('Erreur chargement données:', error);
// //       toast.error('Erreur lors du chargement des données');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadMonStock = async () => {
// //     try {
// //       const data = await recycleurService.getMonStock();
// //       if (data.success) setMonStock(data.stocks || []);
// //     } catch (error) {
// //       console.error('Erreur chargement stock:', error);
// //       toast.error('Erreur lors du chargement de votre stock');
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));

// //     if (name === 'typeDechet') {
// //       const stock = monStock.find(s => s.type_dechet === value);
// //       const dispo = stock ? parseFloat(stock.quantite_disponible) : 0;
// //       setStockDisponible(dispo);
// //       const qty = parseFloat(formData.quantite);
// //       setStockError(qty && qty > dispo
// //         ? `Stock insuffisant. Vous avez ${dispo.toFixed(2)} kg disponibles.`
// //         : '');
// //     }

// //     if (name === 'quantite' && formData.typeDechet) {
// //       const stock = monStock.find(s => s.type_dechet === formData.typeDechet);
// //       const dispo = stock ? parseFloat(stock.quantite_disponible) : 0;
// //       setStockError(parseFloat(value) > dispo
// //         ? `Stock insuffisant. Vous avez ${dispo.toFixed(2)} kg disponibles.`
// //         : '');
// //     }
// //   };

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (file.size > 5 * 1024 * 1024) {
// //       toast.error('Le fichier ne doit pas dépasser 5MB');
// //       return;
// //     }
// //     const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
// //     if (!allowed.includes(file.type)) {
// //       toast.error('Format non supporté. Utilisez PDF, JPEG ou PNG');
// //       return;
// //     }

// //     setFormData(prev => ({ ...prev, certificat: file }));

// //     if (file.type.startsWith('image/')) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => setCertificatPreview(reader.result);
// //       reader.readAsDataURL(file);
// //     } else {
// //       setCertificatPreview('pdf');
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.typeDechet)                          { toast.error('Veuillez sélectionner un type de déchet'); return; }
// //     if (!formData.quantite || parseFloat(formData.quantite) <= 0) { toast.error('Veuillez entrer une quantité valide'); return; }
// //     if (!formData.dateRecyclage)                       { toast.error('Veuillez sélectionner une date'); return; }

// //     const quantiteValue = parseFloat(formData.quantite);
// //     if (quantiteValue > stockDisponible) {
// //       toast.error(`Stock insuffisant. Vous avez ${stockDisponible.toFixed(2)} kg disponibles.`);
// //       return;
// //     }

// //     const fd = new FormData();
// //     fd.append('typeDechet',    formData.typeDechet);
// //     fd.append('quantite',      quantiteValue.toString());
// //     fd.append('dateRecyclage', formData.dateRecyclage);
// //     if (formData.demandeId)  fd.append('demandeId',  formData.demandeId);
// //     if (formData.certificat) fd.append('certificat', formData.certificat);

// //     try {
// //       setSubmitting(true);
// //       const response = await recycleurService.declarerRecyclageWithCertificat(fd);
// //       if (response.success) {
// //         toast.success('✅ Déclaration de recyclage enregistrée avec succès !');
// //         if (response.stock_restant) toast.success(`Stock restant: ${response.stock_restant} kg`);
// //         navigate('/recycleur/declarations');
// //       }
// //     } catch (error) {
// //       console.error('Erreur déclaration:', error);
// //       toast.error(error.response?.data?.message || 'Erreur lors de la déclaration');
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // ── Écran de chargement ──────────────────────────────────────────────────
// //   if (loading) {
// //     return (
// //       <DashboardLayout title="Déclaration de recyclage" user={user}>
// //         <div style={{ textAlign: 'center', padding: '3rem' }}>
// //           <span className="decl-spinner-gray" />
// //           <p style={{ marginTop: '1rem', color: '#5a655a' }}>Chargement de vos données...</p>
// //         </div>
// //       </DashboardLayout>
// //     );
// //   }

// //   return (
// //     <DashboardLayout title="Déclaration de recyclage" user={user}>
// //       <div className="declaration-container">
// //         <div className="declaration-card">
// //           <h2 className="declaration-title">Déclarer des volumes recyclés</h2>

// //           <div className="info-box">
// //             <FiInfo size={20} color="#2d8a5e" />
// //             <span>
// //               Déclarez les volumes que vous avez effectivement recyclés.
// //               Cette information sera déduite de votre stock disponible.
// //             </span>
// //           </div>

// //           {/* Stock disponible */}
// //           {monStock.length > 0 && (
// //             <div className="stock-info-card">
// //               <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
// //                 <span style={{ display: 'inline-flex' }}><FiPackage /></span>
// //                 Votre stock disponible
// //               </h3>
// //               <div className="stock-grid">
// //                 {monStock.map(stock => (
// //                   <div key={stock.id} className="stock-item">
// //                     <div className="type">{getTypeLabel(stock.type_dechet)}</div>
// //                     <div className="quantity">{parseFloat(stock.quantite_disponible).toFixed(1)} kg</div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit}>
// //             <div className="form-grid">

// //               {/* Demande liée — optionnel */}
// //               <div className="form-group full-width">
// //                 <label>Lié à une demande (optionnel)</label>
// //                 <select
// //                   name="demandeId"
// //                   value={formData.demandeId}
// //                   onChange={handleInputChange}
// //                   disabled={loading}
// //                 >
// //                   <option value="">Sélectionnez une demande</option>
// //                   {demandes.map(d => (
// //                     <option key={d.id} value={d.id}>
// //                       #{d.id?.substring(0, 8)} — {recycleurService.getTypeLabel(d.type_dechet)} ({parseFloat(d.quantite_demandee).toFixed(1)} kg)
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Type de déchet */}
// //               <div className="form-group">
// //                 <label>Type de déchet <span>*</span></label>
// //                 <select
// //                   name="typeDechet"
// //                   value={formData.typeDechet}
// //                   onChange={handleInputChange}
// //                   required
// //                 >
// //                   <option value="">Sélectionnez</option>
// //                   {TYPES_DECHET.map(t => (
// //                     <option key={t.value} value={t.value}>{t.label}</option>
// //                   ))}
// //                 </select>
// //                 {formData.typeDechet && (
// //                   <div className="stock-disponible">
// //                     <FiPackage size={16} />
// //                     Stock disponible : <strong>{stockDisponible.toFixed(2)} kg</strong>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Quantité */}
// //               <div className="form-group">
// //                 <label>Quantité recyclée (kg) <span>*</span></label>
// //                 <input
// //                   type="number"
// //                   name="quantite"
// //                   value={formData.quantite}
// //                   onChange={handleInputChange}
// //                   min="0.1"
// //                   max={stockDisponible || undefined}
// //                   step="0.1"
// //                   placeholder="Ex: 100"
// //                   required
// //                 />
// //                 {stockError && (
// //                   <div className="stock-error">
// //                     <FiAlertCircle size={16} />
// //                     {stockError}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Date */}
// //               <div className="form-group">
// //                 <label>Date de recyclage <span>*</span></label>
// //                 <input
// //                   type="date"
// //                   name="dateRecyclage"
// //                   value={formData.dateRecyclage}
// //                   onChange={handleInputChange}
// //                   max={new Date().toISOString().split('T')[0]}
// //                   required
// //                 />
// //               </div>

// //               {/* Certificat */}
// //               <div className="form-group full-width">
// //                 <label>Certificat / Justificatif (optionnel)</label>
// //                 <div
// //                   className="file-upload"
// //                   onClick={() => document.getElementById('certificat-input').click()}
// //                 >
// //                   <FiUpload size={28} color="#2d8a5e" />
// //                   <p>Cliquez pour télécharger un fichier</p>
// //                   <small>PDF, JPEG, PNG — Max 5MB</small>
// //                 </div>
// //                 <input
// //                   type="file"
// //                   id="certificat-input"
// //                   name="certificat"
// //                   accept=".pdf,image/*"
// //                   onChange={handleFileChange}
// //                   style={{ display: 'none' }}
// //                 />
// //                 {/* ✅ Composant dédié — pas de ternaire imbriqué inline */}
// //                 <CertificatPreview preview={certificatPreview} fichier={formData.certificat} />
// //               </div>

// //             </div>

// //             {/* Récapitulatif */}
// //             {formData.typeDechet && formData.quantite && !stockError && (
// //               <div className="info-box" style={{ marginTop: '1rem', marginBottom: 0 }}>
// //                 <FiInfo size={20} color="#2d8a5e" />
// //                 <span>
// //                   Après cette déclaration, il vous restera{' '}
// //                   <strong>
// //                     {(stockDisponible - parseFloat(formData.quantite || 0)).toFixed(2)} kg
// //                   </strong>{' '}
// //                   de {getTypeLabel(formData.typeDechet)}.
// //                 </span>
// //               </div>
// //             )}

// //             {/* Actions */}
// //             <div className="form-actions">
// //               <button
// //                 type="button"
// //                 className="btn-secondary"
// //                 onClick={() => navigate('/recycleur/declarations')}
// //               >
// //                 Annuler
// //               </button>
// //               {/* ✅ Composant dédié — ternaire isolé du flux de rendu parent */}
// //               <BoutonSoumettre submitting={submitting} stockError={stockError} />
// //             </div>

// //           </form>
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   );
// // };

// // export default DeclarationRecyclage;


// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DashboardLayout from '../../Layouts/LayoutDashboard';
// import recycleurService from '../../services/recycleurService';
// import { FiUpload, FiFileText, FiPackage, FiInfo, FiAlertCircle, FiFile } from 'react-icons/fi';
// import toast from 'react-hot-toast';

// // Styles injectés une seule fois via useEffect (hors rendu)
// const injectStyles = () => {
//   if (!document.getElementById('_decl-styles')) {
//     const el = document.createElement('style');
//     el.id = '_decl-styles';
//     el.textContent = `
//       @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//       .declaration-container { max-width: 800px; margin: 0 auto; padding: 1.5rem; }
//       .declaration-card { background: white; border-radius: 1rem; padding: 2rem; border: 1px solid #d9e0d9; }
//       .declaration-title { font-size: 1.5rem; font-weight: 700; color: #1a1e1a; margin-bottom: 2rem; }
//       .stock-info-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem; }
//       .stock-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem; }
//       .stock-item { background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; text-align: center; }
//       .stock-item .type { font-size: 0.9rem; opacity: 0.9; margin-bottom: 0.5rem; }
//       .stock-item .quantity { font-size: 1.3rem; font-weight: bold; }
//       .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
//       .form-group { margin-bottom: 1.5rem; }
//       .form-group.full-width { grid-column: span 2; }
//       .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #1a1e1a; }
//       .form-group label span { color: #dc2626; margin-left: 0.25rem; }
//       .form-group select, .form-group input, .form-group textarea { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #d9e0d9; border-radius: 0.75rem; font-size: 0.95rem; transition: all 0.2s; box-sizing: border-box; }
//       .form-group select:focus, .form-group input:focus { border-color: #2d8a5e; outline: none; box-shadow: 0 0 0 3px rgba(45,138,94,0.1); }
//       .form-group select:disabled, .form-group input:disabled { background: #f8faf8; cursor: not-allowed; }
//       .stock-disponible { margin-top: 0.5rem; padding: 0.5rem; background: #e8f3e8; border-radius: 0.5rem; font-size: 0.9rem; color: #2d8a5e; display: flex; align-items: center; gap: 0.5rem; }
//       .stock-error { margin-top: 0.5rem; padding: 0.5rem; background: #fee2e2; border-radius: 0.5rem; font-size: 0.9rem; color: #dc2626; display: flex; align-items: center; gap: 0.5rem; }
//       .file-upload { border: 2px dashed #d9e0d9; border-radius: 0.75rem; padding: 2rem; text-align: center; cursor: pointer; transition: all 0.3s; }
//       .file-upload:hover { border-color: #2d8a5e; background: #e8f3e8; }
//       .file-upload p { color: #5a655a; margin: 0.5rem 0; }
//       .file-upload small { color: #9aa69a; font-size: 0.8rem; }
//       .certificat-preview { margin-top: 1rem; padding: 1rem; background: #f8faf8; border-radius: 0.75rem; display: flex; align-items: center; gap: 1rem; }
//       .certificat-preview img { width: 50px; height: 50px; object-fit: cover; border-radius: 0.5rem; }
//       .form-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #d9e0d9; }
//       .btn-primary { background: #2d8a5e; color: white; border: none; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s; }
//       .btn-primary:hover:not(:disabled) { background: #1e5e3f; transform: translateY(-2px); }
//       .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
//       .btn-secondary { background: #f8faf8; color: #1a1e1a; border: 1.5px solid #d9e0d9; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s; }
//       .btn-secondary:hover { background: #e8f3e8; }
//       .info-box { background: #e8f3e8; border-radius: 0.75rem; padding: 1rem; margin-bottom: 1.5rem; color: #1a1e1a; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem; }
//       .decl-spinner { display: inline-block; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; width: 18px; height: 18px; animation: spin 1s linear infinite; flex-shrink: 0; }
//       .decl-spinner-gray { display: block; border: 2px solid #f3f3f3; border-top: 2px solid #2d8a5e; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; margin: 0 auto; }
//       @media (max-width: 768px) {
//         .form-grid { grid-template-columns: 1fr; }
//         .form-group.full-width { grid-column: span 1; }
//         .form-actions { flex-direction: column; }
//         .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
//       }
//     `;
//     document.head.appendChild(el);
//   }
// };

// // Constantes
// const TYPES_DECHET = [
//   { value: 'plastique_pet',  label: 'Plastique PET' },
//   { value: 'plastique_pehd', label: 'Plastique PEHD' },
//   { value: 'papier_carton',  label: 'Papier/Carton' },
//   { value: 'metal',          label: 'Métal' },
//   { value: 'verre',          label: 'Verre' },
//   { value: 'organique',      label: 'Organique' },
// ];

// const TYPE_LABELS = {
//   plastique_pet:  'Plastique PET',
//   plastique_pehd: 'Plastique PEHD',
//   papier_carton:  'Papier/Carton',
//   metal:          'Métal',
//   verre:          'Verre',
//   organique:      'Organique',
// };

// const getTypeLabel = (type) => TYPE_LABELS[type] || type;

// // Composant CertificatPreview stabilisé
// const CertificatPreview = ({ preview, fichier }) => {
//   if (!preview) return null;
//   return (
//     <div className="certificat-preview">
//       {preview.startsWith('data:image') ? (
//         <img src={preview} alt="Aperçu du certificat" />
//       ) : (
//         <FiFile size={36} color="#2d8a5e" />
//       )}
//       <div>
//         <strong>{fichier?.name}</strong>
//         <p style={{ fontSize: '0.8rem', color: '#5a655a', margin: 0 }}>
//           {fichier ? (fichier.size / 1024).toFixed(0) : 0} KB
//         </p>
//       </div>
//     </div>
//   );
// };

// // Bouton soumettre avec structure stable
// const BoutonSoumettre = ({ submitting, stockError }) => (
//   <button
//     type="submit"
//     className="btn-primary"
//     disabled={submitting || !!stockError}
//   >
//     <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
//       {submitting ? (
//         <span className="decl-spinner" />
//       ) : (
//         <FiFileText size={16} />
//       )}
//       {submitting ? 'Envoi en cours...' : 'Déclarer le recyclage'}
//     </span>
//   </button>
// );

// // Composant principal
// const DeclarationRecyclage = () => {
//   const navigate = useNavigate();

//   // Réf pour l'input file
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     demandeId: '',
//     typeDechet: '',
//     quantite: '',
//     dateRecyclage: new Date().toISOString().split('T')[0],
//     certificat: null,
//   });

//   const [demandes,         setDemandes]         = useState([]);
//   const [monStock,         setMonStock]          = useState([]);
//   const [stockDisponible,  setStockDisponible]   = useState(0);
//   const [loading,          setLoading]           = useState(false);
//   const [submitting,       setSubmitting]        = useState(false);
//   const [certificatPreview,setCertificatPreview] = useState(null);
//   const [user,             setUser]              = useState(null);
//   const [stockError,       setStockError]        = useState('');

//   // Injection des styles une seule fois
//   useEffect(() => {
//     injectStyles();
//   }, []);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('ecocollect_user') || 'null');
//     setUser(userData);
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     try {
//       setLoading(true);
//       const demandesData = await recycleurService.getMesDemandes('realisee');
//       setDemandes(demandesData.demandes || []);
//       await loadMonStock();
//     } catch (error) {
//       console.error('Erreur chargement données:', error);
//       toast.error('Erreur lors du chargement des données');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMonStock = async () => {
//     try {
//       const data = await recycleurService.getMonStock();
//       if (data.success) setMonStock(data.stocks || []);
//     } catch (error) {
//       console.error('Erreur chargement stock:', error);
//       toast.error('Erreur lors du chargement de votre stock');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     if (name === 'typeDechet') {
//       const stock = monStock.find(s => s.type_dechet === value);
//       const dispo = stock ? parseFloat(stock.quantite_disponible) : 0;
//       setStockDisponible(dispo);
//       const qty = parseFloat(formData.quantite);
//       setStockError(qty && qty > dispo
//         ? `Stock insuffisant. Vous avez ${dispo.toFixed(2)} kg disponibles.`
//         : '');
//     }

//     if (name === 'quantite' && formData.typeDechet) {
//       const stock = monStock.find(s => s.type_dechet === formData.typeDechet);
//       const dispo = stock ? parseFloat(stock.quantite_disponible) : 0;
//       setStockError(parseFloat(value) > dispo
//         ? `Stock insuffisant. Vous avez ${dispo.toFixed(2)} kg disponibles.`
//         : '');
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('Le fichier ne doit pas dépasser 5MB');
//       return;
//     }
//     const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
//     if (!allowed.includes(file.type)) {
//       toast.error('Format non supporté. Utilisez PDF, JPEG ou PNG');
//       return;
//     }

//     setFormData(prev => ({ ...prev, certificat: file }));

//     if (file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onloadend = () => setCertificatPreview(reader.result);
//       reader.readAsDataURL(file);
//     } else {
//       setCertificatPreview('pdf');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.typeDechet)                          { toast.error('Veuillez sélectionner un type de déchet'); return; }
//     if (!formData.quantite || parseFloat(formData.quantite) <= 0) { toast.error('Veuillez entrer une quantité valide'); return; }
//     if (!formData.dateRecyclage)                       { toast.error('Veuillez sélectionner une date'); return; }

//     const quantiteValue = parseFloat(formData.quantite);
//     if (quantiteValue > stockDisponible) {
//       toast.error(`Stock insuffisant. Vous avez ${stockDisponible.toFixed(2)} kg disponibles.`);
//       return;
//     }

//     const fd = new FormData();
//     fd.append('typeDechet',    formData.typeDechet);
//     fd.append('quantite',      quantiteValue.toString());
//     fd.append('dateRecyclage', formData.dateRecyclage);
//     if (formData.demandeId)  fd.append('demandeId',  formData.demandeId);
//     if (formData.certificat) fd.append('certificat', formData.certificat);

//     try {
//       setSubmitting(true);
//       const response = await recycleurService.declarerRecyclageWithCertificat(fd);
//       if (response.success) {
//         toast.success('✅ Déclaration de recyclage enregistrée avec succès !');
//         if (response.stock_restant) toast.success(`Stock restant: ${response.stock_restant} kg`);
//         navigate('/recycleur/declarations');
//       }
//     } catch (error) {
//       console.error('Erreur déclaration:', error);
//       toast.error(error.response?.data?.message || 'Erreur lors de la déclaration');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <DashboardLayout title="Déclaration de recyclage" user={user}>
//         <div style={{ textAlign: 'center', padding: '3rem' }}>
//           <span className="decl-spinner-gray" />
//           <p style={{ marginTop: '1rem', color: '#5a655a' }}>Chargement de vos données...</p>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout title="Déclaration de recyclage" user={user}>
//       <div className="declaration-container">
//         <div className="declaration-card">
//           <h2 className="declaration-title">Déclarer des volumes recyclés</h2>

//           <div className="info-box">
//             <FiInfo size={20} color="#2d8a5e" />
//             <span>
//               Déclarez les volumes que vous avez effectivement recyclés.
//               Cette information sera déduite de votre stock disponible.
//             </span>
//           </div>

//           {monStock.length > 0 && (
//             <div className="stock-info-card">
//               <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                 <span style={{ display: 'inline-flex' }}><FiPackage /></span>
//                 Votre stock disponible
//               </h3>
//               <div className="stock-grid">
//                 {monStock.map(stock => (
//                   <div key={stock.id} className="stock-item">
//                     <div className="type">{getTypeLabel(stock.type_dechet)}</div>
//                     <div className="quantity">{parseFloat(stock.quantite_disponible).toFixed(1)} kg</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="form-grid">
//               <div className="form-group full-width">
//                 <label>Lié à une demande (optionnel)</label>
//                 <select
//                   name="demandeId"
//                   value={formData.demandeId}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 >
//                   <option value="">Sélectionnez une demande</option>
//                   {demandes.map(d => (
//                     <option key={d.id} value={d.id}>
//                       #{d.id?.substring(0, 8)} — {recycleurService.getTypeLabel(d.type_dechet)} ({parseFloat(d.quantite_demandee).toFixed(1)} kg)
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Type de déchet <span>*</span></label>
//                 <select
//                   name="typeDechet"
//                   value={formData.typeDechet}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="">Sélectionnez</option>
//                   {TYPES_DECHET.map(t => (
//                     <option key={t.value} value={t.value}>{t.label}</option>
//                   ))}
//                 </select>
//                 {formData.typeDechet && (
//                   <div className="stock-disponible">
//                     <FiPackage size={16} />
//                     Stock disponible : <strong>{stockDisponible.toFixed(2)} kg</strong>
//                   </div>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label>Quantité recyclée (kg) <span>*</span></label>
//                 <input
//                   type="number"
//                   name="quantite"
//                   value={formData.quantite}
//                   onChange={handleInputChange}
//                   min="0.1"
//                   max={stockDisponible || undefined}
//                   step="0.1"
//                   placeholder="Ex: 100"
//                   required
//                 />
//                 {stockError && (
//                   <div className="stock-error">
//                     <FiAlertCircle size={16} />
//                     {stockError}
//                   </div>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label>Date de recyclage <span>*</span></label>
//                 <input
//                   type="date"
//                   name="dateRecyclage"
//                   value={formData.dateRecyclage}
//                   onChange={handleInputChange}
//                   max={new Date().toISOString().split('T')[0]}
//                   required
//                 />
//               </div>

//               <div className="form-group full-width">
//                 <label>Certificat / Justificatif (optionnel)</label>
//                 <div
//                   className="file-upload"
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   <FiUpload size={28} color="#2d8a5e" />
//                   <p>Cliquez pour télécharger un fichier</p>
//                   <small>PDF, JPEG, PNG — Max 5MB</small>
//                 </div>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   accept=".pdf,image/*"
//                   onChange={handleFileChange}
//                   style={{ display: 'none' }}
//                 />
//                 <CertificatPreview preview={certificatPreview} fichier={formData.certificat} />
//               </div>
//             </div>

//             {formData.typeDechet && formData.quantite && !stockError && (
//               <div className="info-box" style={{ marginTop: '1rem', marginBottom: 0 }}>
//                 <FiInfo size={20} color="#2d8a5e" />
//                 <span>
//                   Après cette déclaration, il vous restera{' '}
//                   <strong>
//                     {(stockDisponible - parseFloat(formData.quantite || 0)).toFixed(2)} kg
//                   </strong>{' '}
//                   de {getTypeLabel(formData.typeDechet)}.
//                 </span>
//               </div>
//             )}

//             <div className="form-actions">
//               <button
//                 type="button"
//                 className="btn-secondary"
//                 onClick={() => navigate('/recycleur/declarations')}
//               >
//                 Annuler
//               </button>
//               <BoutonSoumettre submitting={submitting} stockError={stockError} />
//             </div>
//           </form>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default DeclarationRecyclage;



import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/LayoutDashboard';
import recycleurService from '../../services/recycleurService';
import { FiUpload, FiFileText, FiPackage, FiInfo, FiAlertCircle, FiFile } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Injection des styles (inchangée)
const injectStyles = () => {
  if (!document.getElementById('_decl-styles')) {
    const el = document.createElement('style');
    el.id = '_decl-styles';
    el.textContent = `
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      .declaration-container { max-width: 800px; margin: 0 auto; padding: 1.5rem; }
      .declaration-card { background: white; border-radius: 1rem; padding: 2rem; border: 1px solid #d9e0d9; }
      .declaration-title { font-size: 1.5rem; font-weight: 700; color: #1a1e1a; margin-bottom: 2rem; }
      .stock-info-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem; }
      .stock-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem; }
      .stock-item { background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; text-align: center; }
      .stock-item .type { font-size: 0.9rem; opacity: 0.9; margin-bottom: 0.5rem; }
      .stock-item .quantity { font-size: 1.3rem; font-weight: bold; }
      .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
      .form-group { margin-bottom: 1.5rem; }
      .form-group.full-width { grid-column: span 2; }
      .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #1a1e1a; }
      .form-group label span { color: #dc2626; margin-left: 0.25rem; }
      .form-group select, .form-group input, .form-group textarea { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #d9e0d9; border-radius: 0.75rem; font-size: 0.95rem; transition: all 0.2s; box-sizing: border-box; }
      .form-group select:focus, .form-group input:focus { border-color: #2d8a5e; outline: none; box-shadow: 0 0 0 3px rgba(45,138,94,0.1); }
      .form-group select:disabled, .form-group input:disabled { background: #f8faf8; cursor: not-allowed; }
      .stock-disponible { margin-top: 0.5rem; padding: 0.5rem; background: #e8f3e8; border-radius: 0.5rem; font-size: 0.9rem; color: #2d8a5e; display: flex; align-items: center; gap: 0.5rem; }
      .stock-error { margin-top: 0.5rem; padding: 0.5rem; background: #fee2e2; border-radius: 0.5rem; font-size: 0.9rem; color: #dc2626; display: flex; align-items: center; gap: 0.5rem; }
      .file-upload { border: 2px dashed #d9e0d9; border-radius: 0.75rem; padding: 2rem; text-align: center; cursor: pointer; transition: all 0.3s; }
      .file-upload:hover { border-color: #2d8a5e; background: #e8f3e8; }
      .file-upload p { color: #5a655a; margin: 0.5rem 0; }
      .file-upload small { color: #9aa69a; font-size: 0.8rem; }
      .certificat-preview { margin-top: 1rem; padding: 1rem; background: #f8faf8; border-radius: 0.75rem; display: flex; align-items: center; gap: 1rem; }
      .certificat-preview img { width: 50px; height: 50px; object-fit: cover; border-radius: 0.5rem; }
      .form-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #d9e0d9; }
      .btn-primary { background: #2d8a5e; color: white; border: none; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s; }
      .btn-primary:hover:not(:disabled) { background: #1e5e3f; transform: translateY(-2px); }
      .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
      .btn-secondary { background: #f8faf8; color: #1a1e1a; border: 1.5px solid #d9e0d9; padding: 0.75rem 2rem; border-radius: 100px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s; }
      .btn-secondary:hover { background: #e8f3e8; }
      .info-box { background: #e8f3e8; border-radius: 0.75rem; padding: 1rem; margin-bottom: 1.5rem; color: #1a1e1a; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem; }
      .decl-spinner { display: inline-block; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; width: 18px; height: 18px; animation: spin 1s linear infinite; flex-shrink: 0; }
      .decl-spinner-gray { display: block; border: 2px solid #f3f3f3; border-top: 2px solid #2d8a5e; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; margin: 0 auto; }
      @media (max-width: 768px) {
        .form-grid { grid-template-columns: 1fr; }
        .form-group.full-width { grid-column: span 1; }
        .form-actions { flex-direction: column; }
        .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
      }
    `;
    document.head.appendChild(el);
  }
};

// Constantes (inchangées)
const TYPES_DECHET = [
  { value: 'plastique_pet',  label: 'Plastique PET' },
  { value: 'plastique_pehd', label: 'Plastique PEHD' },
  { value: 'papier_carton',  label: 'Papier/Carton' },
  { value: 'metal',          label: 'Métal' },
  { value: 'verre',          label: 'Verre' },
  { value: 'organique',      label: 'Organique' },
];

const TYPE_LABELS = {
  plastique_pet:  'Plastique PET',
  plastique_pehd: 'Plastique PEHD',
  papier_carton:  'Papier/Carton',
  metal:          'Métal',
  verre:          'Verre',
  organique:      'Organique',
};

const getTypeLabel = (type) => TYPE_LABELS[type] || type;

// Composant CertificatPreview (inchangé)
const CertificatPreview = ({ preview, fichier }) => {
  if (!preview) return null;
  return (
    <div className="certificat-preview">
      {preview.startsWith('data:image') ? (
        <img src={preview} alt="Aperçu du certificat" />
      ) : (
        <FiFile size={36} color="#2d8a5e" />
      )}
      <div>
        <strong>{fichier?.name}</strong>
        <p style={{ fontSize: '0.8rem', color: '#5a655a', margin: 0 }}>
          {fichier ? (fichier.size / 1024).toFixed(0) : 0} KB
        </p>
      </div>
    </div>
  );
};

// ✅ Bouton soumettre avec structure invariante
const BoutonSoumettre = ({ submitting, stockError }) => {
  // Structure stable : un span conteneur avec toujours deux enfants :
  // 1. un élément qui affiche soit le spinner soit l'icône (masqué en fonction de submitting)
  // 2. le texte (qui change dynamiquement)
  return (
    <button
      type="submit"
      className="btn-primary"
      disabled={submitting || !!stockError}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Élément pour l'icône/spinner : toujours présent, on alterne via display */}
        <span style={{ display: submitting ? 'inline-flex' : 'none' }} className="decl-spinner" />
        <span style={{ display: submitting ? 'none' : 'inline-flex' }}>
          <FiFileText size={16} />
        </span>
        {/* Texte du bouton */}
        <span>{submitting ? 'Envoi en cours...' : 'Déclarer le recyclage'}</span>
      </span>
    </button>
  );
};

// Composant principal
const DeclarationRecyclage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    demandeId: '',
    typeDechet: '',
    quantite: '',
    dateRecyclage: new Date().toISOString().split('T')[0],
    certificat: null,
  });

  const [demandes,         setDemandes]         = useState([]);
  const [monStock,         setMonStock]          = useState([]);
  const [stockDisponible,  setStockDisponible]   = useState(0);
  const [loading,          setLoading]           = useState(false);
  const [submitting,       setSubmitting]        = useState(false);
  const [certificatPreview,setCertificatPreview] = useState(null);
  const [user,             setUser]              = useState(null);
  const [stockError,       setStockError]        = useState('');

  // Injection des styles
  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ecocollect_user') || 'null');
    setUser(userData);
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const demandesData = await recycleurService.getMesDemandes('realisee');
      setDemandes(demandesData.demandes || []);
      await loadMonStock();
    } catch (error) {
      console.error('Erreur chargement données:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const loadMonStock = async () => {
    try {
      const data = await recycleurService.getMonStock();
      if (data.success) setMonStock(data.stocks || []);
    } catch (error) {
      console.error('Erreur chargement stock:', error);
      toast.error('Erreur lors du chargement de votre stock');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'typeDechet') {
      const stock = monStock.find(s => s.type_dechet === value);
      const dispo = stock ? parseFloat(stock.quantite_disponible) : 0;
      setStockDisponible(dispo);
      const qty = parseFloat(formData.quantite);
      setStockError(qty && qty > dispo
        ? `Stock insuffisant. Vous avez ${dispo.toFixed(2)} kg disponibles.`
        : '');
    }

    if (name === 'quantite' && formData.typeDechet) {
      const stock = monStock.find(s => s.type_dechet === formData.typeDechet);
      const dispo = stock ? parseFloat(stock.quantite_disponible) : 0;
      setStockError(parseFloat(value) > dispo
        ? `Stock insuffisant. Vous avez ${dispo.toFixed(2)} kg disponibles.`
        : '');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Le fichier ne doit pas dépasser 5MB');
      return;
    }
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowed.includes(file.type)) {
      toast.error('Format non supporté. Utilisez PDF, JPEG ou PNG');
      return;
    }

    setFormData(prev => ({ ...prev, certificat: file }));

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setCertificatPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setCertificatPreview('pdf');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.typeDechet) {
      toast.error('Veuillez sélectionner un type de déchet');
      return;
    }
    if (!formData.quantite || parseFloat(formData.quantite) <= 0) {
      toast.error('Veuillez entrer une quantité valide');
      return;
    }
    if (!formData.dateRecyclage) {
      toast.error('Veuillez sélectionner une date');
      return;
    }

    const quantiteValue = parseFloat(formData.quantite);
    if (quantiteValue > stockDisponible) {
      toast.error(`Stock insuffisant. Vous avez ${stockDisponible.toFixed(2)} kg disponibles.`);
      return;
    }

    const fd = new FormData();
    fd.append('typeDechet',    formData.typeDechet);
    fd.append('quantite',      quantiteValue.toString());
    fd.append('dateRecyclage', formData.dateRecyclage);
    if (formData.demandeId)  fd.append('demandeId',  formData.demandeId);
    if (formData.certificat) fd.append('certificat', formData.certificat);

    try {
      setSubmitting(true);
      const response = await recycleurService.declarerRecyclageWithCertificat(fd);
      if (response.success) {
        toast.success('✅ Déclaration de recyclage enregistrée avec succès !');
        if (response.stock_restant) toast.success(`Stock restant: ${response.stock_restant} kg`);
        navigate('/recycleur/declarations');
      }
    } catch (error) {
      console.error('Erreur déclaration:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la déclaration');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Déclaration de recyclage" user={user}>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <span className="decl-spinner-gray" />
          <p style={{ marginTop: '1rem', color: '#5a655a' }}>Chargement de vos données...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Déclaration de recyclage" user={user}>
      <div className="declaration-container">
        <div className="declaration-card">
          <h2 className="declaration-title">Déclarer des volumes recyclés</h2>

          <div className="info-box">
            <FiInfo size={20} color="#2d8a5e" />
            <span>
              Déclarez les volumes que vous avez effectivement recyclés.
              Cette information sera déduite de votre stock disponible.
            </span>
          </div>

          {monStock.length > 0 && (
            <div className="stock-info-card">
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex' }}><FiPackage /></span>
                Votre stock disponible
              </h3>
              <div className="stock-grid">
                {monStock.map(stock => (
                  <div key={stock.id} className="stock-item">
                    <div className="type">{getTypeLabel(stock.type_dechet)}</div>
                    <div className="quantity">{parseFloat(stock.quantite_disponible).toFixed(1)} kg</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Lié à une demande (optionnel)</label>
                <select
                  name="demandeId"
                  value={formData.demandeId}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="">Sélectionnez une demande</option>
                  {demandes.map(d => (
                    <option key={d.id} value={d.id}>
                      #{d.id?.substring(0, 8)} — {recycleurService.getTypeLabel(d.type_dechet)} ({parseFloat(d.quantite_demandee).toFixed(1)} kg)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Type de déchet <span>*</span></label>
                <select
                  name="typeDechet"
                  value={formData.typeDechet}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionnez</option>
                  {TYPES_DECHET.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                {formData.typeDechet && (
                  <div className="stock-disponible">
                    <FiPackage size={16} />
                    Stock disponible : <strong>{stockDisponible.toFixed(2)} kg</strong>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Quantité recyclée (kg) <span>*</span></label>
                <input
                  type="number"
                  name="quantite"
                  value={formData.quantite}
                  onChange={handleInputChange}
                  min="0.1"
                  max={stockDisponible || undefined}
                  step="0.1"
                  placeholder="Ex: 100"
                  required
                />
                {stockError && (
                  <div className="stock-error">
                    <FiAlertCircle size={16} />
                    {stockError}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Date de recyclage <span>*</span></label>
                <input
                  type="date"
                  name="dateRecyclage"
                  value={formData.dateRecyclage}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Certificat / Justificatif (optionnel)</label>
                <div
                  className="file-upload"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiUpload size={28} color="#2d8a5e" />
                  <p>Cliquez pour télécharger un fichier</p>
                  <small>PDF, JPEG, PNG — Max 5MB</small>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <CertificatPreview preview={certificatPreview} fichier={formData.certificat} />
              </div>
            </div>

            {formData.typeDechet && formData.quantite && !stockError && (
              <div className="info-box" style={{ marginTop: '1rem', marginBottom: 0 }}>
                <FiInfo size={20} color="#2d8a5e" />
                <span>
                  Après cette déclaration, il vous restera{' '}
                  <strong>
                    {(stockDisponible - parseFloat(formData.quantite || 0)).toFixed(2)} kg
                  </strong>{' '}
                  de {getTypeLabel(formData.typeDechet)}.
                </span>
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/recycleur/declarations')}
              >
                Annuler
              </button>
              <BoutonSoumettre submitting={submitting} stockError={stockError} />
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeclarationRecyclage;