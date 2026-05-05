// services/producteurService.js
import api from './api';

class ProducteurService {
  constructor() {
    // Ne pas mettre de baseURL car les routes sont directement sous /api
  }

  // ==================== AUTH ====================
  async inscription(formData) {
    const response = await api.post('/auth/producteur/inscription', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async connexion(identifiant, motDePasse) {
    const response = await api.post('/auth/producteur/connexion', {
      identifiant,
      motDePasse
    });
    return response.data;
  }

  // ==================== PROFIL ====================
  async getProfil() {
    const response = await api.get('/producteur/profil');
    return response.data;
  }

  async updateProfil(data) {
    const response = await api.put('/producteur/profil', data);
    return response.data;
  }

  async updateProfilWithPhoto(formData) {
    const response = await api.put('/producteur/profil', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  // ==================== DÉCLARATIONS ====================
  async creerDeclaration(data) {
    const response = await api.post('/api/declarations', data);
    return response.data;
  }

  async getMesDeclarations(statut = null) {
    const params = statut ? { statut } : {};
    const response = await api.get('/api/declarations', { params });
    return response.data;
  }

  async getDeclarationDetails(declarationId) {
    const response = await api.get(`/api/declarations/${declarationId}`);
    return response.data;
  }

  async suivreDeclaration(declarationId) {
    const response = await api.get(`/api/declarations/${declarationId}/suivre`);
    return response.data;
  }

  async annulerDeclaration(declarationId) {
    const response = await api.put(`/declarations/${declarationId}/annuler`);
    return response.data;
  }
   async creerDeclarationAnnexe(data) {
    const response = await api.post('/api/auth/declaration-annexe', data);
    return response.data;
  }

  // ==================== DASHBOARD ====================
  async getDashboard() {
    const response = await api.get('/producteur/tableau-bord');
    return response.data;
  }

  async getStatistiques(periode = null) {
    const params = periode ? { periode } : {};
    const response = await api.get('/producteur/statistiques', { params });
    return response.data;
  }

  // ==================== NOTIFICATIONS ====================
  async getNotifications() {
    const response = await api.get('/notifications');
    return response.data;
  }

  async marquerNotificationLue(notificationId) {
    const response = await api.put(`/notifications/${notificationId}/lire`);
    return response.data;
  }

  async marquerToutesNotificationsLues() {
    const response = await api.put('/notifications/lire-toutes');
    return response.data;
  }

  // ==================== RÉCOMPENSES ====================
  async getRecompenses() {
    const response = await api.get('/producteur/recompenses');
    return response.data;
  }

  async getPoints() {
    const response = await api.get('/producteur/points');
    return response.data;
  }

  // ==================== COLLECTES ====================
  async getCollectesEnCours() {
    const response = await api.get('/producteur/collectes/en-cours');
    return response.data;
  }

  async getHistoriqueCollectes() {
    const response = await api.get('/producteur/collectes/historique');
    return response.data;
  }

  // ==================== MOT DE PASSE ====================
  async changerMotDePasse(data) {
    const response = await api.put('/producteur/mot-de-passe', data);
    return response.data;
  }

  async demanderReinitialisationMotDePasse(email) {
    const response = await api.post('/auth/producteur/mot-de-passe/oublie', { email });
    return response.data;
  }

  async reinitialiserMotDePasse(token, nouveauMotDePasse) {
    const response = await api.post('/auth/producteur/mot-de-passe/reinitialiser', {
      token,
      nouveauMotDePasse
    });
    return response.data;
  }

  // ==================== TYPES DE DÉCHETS ====================
  async getTypesDechet() {
    const response = await api.get('/types-dechet');
    return response.data;
  }

  async getModesCollecte() {
    const response = await api.get('/modes-collecte');
    return response.data;
  }

  // ==================== UTILITAIRES ====================
  formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatShortDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatTime(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTypeLabel(type) {
    const labels = {
      'plastique_pet': 'Plastique PET',
      'plastique_pehd': 'Plastique PEHD',
      'papier_carton': 'Papier/Carton',
      'metal': 'Métal',
      'verre': 'Verre',
      'organique': 'Organique',
      'electronique': 'Déchets électroniques',
      'textile': 'Textile',
      'dangereux': 'Déchets dangereux'
    };
    return labels[type] || type || 'Non spécifié';
  }

  getModeCollecteLabel(mode) {
    const labels = {
      'collecte_domicile': 'Collecte à domicile',
      'depot_volontaire': 'Dépôt volontaire',
      'point_collecte': 'Point de collecte'
    };
    return labels[mode] || mode || 'Non spécifié';
  }

  getStatusBadge(statut) {
    const badges = {
      'en_attente': { color: 'bg-yellow-100 text-yellow-800', icon: '⏳', label: 'En attente' },
      'en_attente_affectation': { color: 'bg-yellow-100 text-yellow-800', icon: '⏳', label: 'En attente' },
      'en_attente_collecte': { color: 'bg-yellow-100 text-yellow-800', icon: '⏳', label: 'En attente' },
      'affecte': { color: 'bg-blue-100 text-blue-800', icon: '👨‍💼', label: 'Affecté' },
      'affectee': { color: 'bg-blue-100 text-blue-800', icon: '👨‍💼', label: 'Affectée' },
      'programme': { color: 'bg-purple-100 text-purple-800', icon: '📅', label: 'Programmé' },
      'programmee': { color: 'bg-purple-100 text-purple-800', icon: '📅', label: 'Programmée' },
      'scheduled': { color: 'bg-purple-100 text-purple-800', icon: '📅', label: 'Programmée' },
      'en_cours': { color: 'bg-orange-100 text-orange-800', icon: '🚚', label: 'En cours' },
      'assigned': { color: 'bg-blue-100 text-blue-800', icon: '👨‍💼', label: 'En cours' },
      'termine': { color: 'bg-green-100 text-green-800', icon: '✅', label: 'Terminé' },
      'terminee': { color: 'bg-green-100 text-green-800', icon: '✅', label: 'Terminée' },
      'validee': { color: 'bg-green-100 text-green-800', icon: '✅', label: 'Validée' },
      'annule': { color: 'bg-red-100 text-red-800', icon: '❌', label: 'Annulé' },
      'annulee': { color: 'bg-red-100 text-red-800', icon: '❌', label: 'Annulée' }
    };
    return badges[statut] || { color: 'bg-gray-100 text-gray-800', icon: '📝', label: statut || 'Inconnu' };
  }

  getPointsIcon(points) {
    if (points >= 1000) return '🏆';
    if (points >= 500) return '⭐';
    if (points >= 100) return '🌟';
    return '✨';
  }

  // Calcul des statistiques à partir des données
  calculerStatistiques(declarations) {
    if (!declarations || !Array.isArray(declarations)) {
      return {
        totalDeclarations: 0,
        totalCollectes: 0,
        totalPoints: 0,
        totalPoids: 0,
        tauxReussite: 0,
        parType: {},
        parMois: {}
      };
    }

    const totalDeclarations = declarations.length;
    const collectesTerminees = declarations.filter(d => 
      d.statut === 'termine' || d.statut === 'terminee' || d.statut === 'validee'
    );
    const totalCollectes = collectesTerminees.length;
    const totalPoints = collectesTerminees.reduce((sum, d) => sum + (parseInt(d.points) || 0), 0);
    const totalPoids = collectesTerminees.reduce((sum, d) => sum + (parseFloat(d.quantite) || 0), 0);
    const tauxReussite = totalDeclarations > 0 ? (totalCollectes / totalDeclarations) * 100 : 0;

    const parType = {};
    declarations.forEach(d => {
      const type = d.type_dechet;
      if (!parType[type]) {
        parType[type] = { count: 0, poids: 0, points: 0 };
      }
      parType[type].count++;
      parType[type].poids += parseFloat(d.quantite) || 0;
      parType[type].points += parseInt(d.points) || 0;
    });

    const parMois = {};
    declarations.forEach(d => {
      const date = new Date(d.date_declaration);
      const mois = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!parMois[mois]) {
        parMois[mois] = { count: 0, poids: 0 };
      }
      parMois[mois].count++;
      parMois[mois].poids += parseFloat(d.quantite) || 0;
    });

    return {
      totalDeclarations,
      totalCollectes,
      totalPoints,
      totalPoids,
      tauxReussite: Math.round(tauxReussite),
      parType,
      parMois
    };
  }
}

export default new ProducteurService();