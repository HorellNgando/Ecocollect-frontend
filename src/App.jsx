import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import DeclareWaste from './pages/DeclareWaste'
import CollectionTracking from './pages/CollectionTracking'
import TrackingList from './pages/TrackingList'
import History from './pages/History'
import DeclarationDetails from './pages/DeclarationDetails'
import Rewards from './pages/Rewards'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
// routes 
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/declare" element={<DeclareWaste />} />
          <Route path="/tracking/:id" element={<CollectionTracking />} />
          <Route path="/tracking" element={<TrackingList />} />
          <Route path="/history" element={<History />} />
          <Route path="/declaration/:id" element={<DeclarationDetails />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
