import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Wallet, TrendingUp, DollarSign, Calendar, CheckCircle,
  ArrowUpRight, ArrowDownRight, Download, Filter, Search,
  Star, Clock, AlertCircle, Award, Target, Activity,
  CreditCard, Banknote, PiggyBank, Receipt
} from 'lucide-react'
import Layout from '../../components/Layout'

const WalletCollector = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('all')

  const [walletData, setWalletData] = useState({
    currentBalance: 285000,
    totalEarnings: 1250000,
    thisMonthEarnings: 45000,
    lastMonthEarnings: 38000,
    pendingEarnings: 12000,
    averageEarnings: 2850,
    totalMissions: 47,
    successRate: 95,
    rating: 4.8,
    bestMonth: 'Juin 2024',
    bestMonthEarnings: 62000
  })

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'earning',
      missionId: '#145',
      missionTitle: 'Restaurant Le Gourmet',
      amount: 2500,
      status: 'completed',
      date: '2024-06-15',
      time: '14:30',
      paymentMethod: 'wallet',
      wasteType: 'Organiques',
      quantity: '25 kg',
      producerRating: 4.5
    },
    {
      id: 2,
      type: 'earning',
      missionId: '#144',
      missionTitle: 'Supermarket Eko',
      amount: 4000,
      status: 'completed',
      date: '2024-06-15',
      time: '11:15',
      paymentMethod: 'wallet',
      wasteType: 'Plastiques',
      quantity: '40 kg',
      producerRating: 4.8
    },
    {
      id: 3,
      type: 'earning',
      missionId: '#143',
      missionTitle: 'Hotel Atlantic',
      amount: 6000,
      status: 'completed',
      date: '2024-06-14',
      time: '16:45',
      paymentMethod: 'wallet',
      wasteType: 'Mixtes',
      quantity: '60 kg',
      producerRating: 4.2
    },
    {
      id: 4,
      type: 'pending',
      missionId: '#142',
      missionTitle: 'Boulangerie Paul',
      amount: 1800,
      status: 'pending',
      date: '2024-06-14',
      time: '09:30',
      paymentMethod: 'wallet',
      wasteType: 'Organiques',
      quantity: '18 kg',
      producerRating: 4.9,
      estimatedPayment: '2024-06-16'
    },
    {
      id: 5,
      type: 'withdrawal',
      amount: 50000,
      status: 'completed',
      date: '2024-06-10',
      time: '10:00',
      paymentMethod: 'bank_transfer',
      reference: 'TRF-2024-06-001'
    },
    {
      id: 6,
      type: 'bonus',
      amount: 5000,
      status: 'completed',
      date: '2024-06-01',
      time: '00:00',
      paymentMethod: 'wallet',
      description: 'Bonus mensuel - Mai 2024',
      reason: 'Excellence service'
    }
  ])

  const tabs = [
    { id: 'all', label: 'Tout', count: transactions.length },
    { id: 'earnings', label: 'Gains', count: transactions.filter(t => t.type === 'earning').length },
    { id: 'pending', label: 'En attente', count: transactions.filter(t => t.status === 'pending').length },
    { id: 'withdrawals', label: 'Retraits', count: transactions.filter(t => t.type === 'withdrawal').length },
    { id: 'bonuses', label: 'Bonus', count: transactions.filter(t => t.type === 'bonus').length }
  ]

  const dateFilters = [
    { id: 'all', label: 'Toutes les périodes' },
    { id: 'today', label: "Aujourd'hui" },
    { id: 'week', label: 'Cette semaine' },
    { id: 'month', label: 'Ce mois' },
    { id: 'year', label: 'Cette année' }
  ]

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'earning': return <DollarSign className="h-5 w-5" />
      case 'withdrawal': return <ArrowUpRight className="h-5 w-5" />
      case 'bonus': return <Award className="h-5 w-5" />
      default: return <Receipt className="h-5 w-5" />
    }
  }

  const getTransactionColor = (type, status) => {
    if (type === 'withdrawal') return status === 'completed' ? 'text-red-600 bg-red-50' : 'text-yellow-600 bg-yellow-50'
    if (type === 'bonus') return 'text-purple-600 bg-purple-50'
    if (status === 'pending') return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'failed': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Terminé'
      case 'pending': return 'En attente'
      case 'failed': return 'Échoué'
      default: return status
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'earnings' && transaction.type === 'earning') ||
      (activeTab === 'pending' && transaction.status === 'pending') ||
      (activeTab === 'withdrawals' && transaction.type === 'withdrawal') ||
      (activeTab === 'bonuses' && transaction.type === 'bonus')
    
    const matchesSearch = transaction.missionTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.missionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  const monthlyStats = [
    { month: 'Jan', earnings: 35000 },
    { month: 'Fév', earnings: 42000 },
    { month: 'Mar', earnings: 38000 },
    { month: 'Avr', earnings: 45000 },
    { month: 'Mai', earnings: 52000 },
    { month: 'Juin', earnings: 45000 }
  ]

  const handleWithdraw = () => {
    // Logique de retrait
    console.log('Withdraw requested')
  }

  const TransactionCard = ({ transaction }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getTransactionColor(transaction.type, transaction.status)}`}>
            {getTransactionIcon(transaction.type)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {transaction.missionTitle || transaction.description || 'Retrait'}
            </h3>
            {transaction.missionId && (
              <p className="text-sm text-gray-600">{transaction.missionId}</p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <p className={`text-lg font-bold ${
            transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
          }`}>
            {transaction.type === 'withdrawal' ? '-' : '+'}
            {transaction.amount.toLocaleString()} FCFA
          </p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
            {getStatusLabel(transaction.status)}
          </span>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          {transaction.wasteType && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Target className="h-4 w-4" />
              {transaction.wasteType} • {transaction.quantity}
            </div>
          )}
          {transaction.producerRating && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="h-4 w-4" />
              Note: {transaction.producerRating}/5
            </div>
          )}
          {transaction.paymentMethod && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CreditCard className="h-4 w-4" />
              {transaction.paymentMethod === 'wallet' ? 'Portefeuille' : 'Virement bancaire'}
            </div>
          )}
        </div>
        
        <div className="space-y-2 text-right">
          <div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
            <Calendar className="h-4 w-4" />
            {transaction.date}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
            <Clock className="h-4 w-4" />
            {transaction.time}
          </div>
          {transaction.estimatedPayment && (
            <div className="text-sm text-yellow-600">
              Paiement estimé: {transaction.estimatedPayment}
            </div>
          )}
        </div>
      </div>

      {/* Reference */}
      {transaction.reference && (
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600">
            Référence: <span className="font-mono text-gray-900">{transaction.reference}</span>
          </p>
        </div>
      )}
    </div>
  )

  return (
    <Layout
      pageTitle="Mes gains"
      currentPage="wallet"
      userRole="collector"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Wallet className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-lg">
                Solde actuel
              </span>
            </div>
            <p className="text-3xl font-bold mb-2">{walletData.currentBalance.toLocaleString()} FCFA</p>
            <p className="text-blue-100 text-sm">Disponible pour retrait</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                Ce mois
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{walletData.thisMonthEarnings.toLocaleString()} FCFA</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
              <span>+{((walletData.thisMonthEarnings - walletData.lastMonthEarnings) / walletData.lastMonthEarnings * 100).toFixed(1)}% vs mois dernier</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">
                En attente
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{walletData.totalEarnings.toLocaleString()} FCFA</p>
            <p className="text-sm text-gray-600">Gains en cours de validation</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                {walletData.totalMissions}
              </span>
            </div>
            <p className="text-sm text-gray-600">Total missions</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                {walletData.averageEarnings.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">Gain moyen/mission</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">
                {walletData.successRate}%
              </span>
            </div>
            <p className="text-sm text-gray-600">Taux de réussite</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-bold text-gray-900">
                {walletData.rating}/5
              </span>
            </div>
            <p className="text-sm text-gray-600">Note moyenne</p>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Historique des transactions</h3>
                <p className="text-gray-600">Suivez tous vos gains et retraits</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="all">Toutes les dates</option>
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Receipt className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune transaction trouvée</h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Essayez une autre recherche' : 'Aucune transaction ne correspond à ce filtre'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default WalletCollector
