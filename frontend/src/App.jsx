// App.jsx
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/landing/Header';
import Landing from './pages/Landing';
import SellerDashboard from './pages/SellerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import SignupVendor from './components/landing/SignupVendor';
import SignupSupplier from './components/landing/SignupSupplier';
import Login from './components/landing/Login';
import apiService from './services/api';

export default function App() {
  console.log('App component rendering');
  
  const [modal, setModal] = useState(null);
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          
          // Set token for API calls
          apiService.setToken(savedToken);
          
          // Fetch notification count based on user role
          if (userData.role === 'supplier') {
            try {
              const orders = await apiService.getSupplierOrders();
              const pendingOrders = orders.filter(order => order.status === 'pending');
              setNotificationCount(pendingOrders.length);
            } catch (error) {
              console.error('Error fetching notifications:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const openModal = (type) => setModal(type);
  const closeModal = () => setModal(null);
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    apiService.setToken(token);
    closeModal();
  };

  const handleLogout = () => {
    setUser(null);
    setNotificationCount(0);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    apiService.clearToken();
  };

  const updateNotificationCount = (count) => {
    setNotificationCount(count);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Ventrest...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 font-sans">
        <Routes>
          {/* Landing Page Route */}
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to={user.role === 'supplier' ? '/supplier-dashboard' : '/vendor-dashboard'} replace />
              ) : (
                <>
                  <Header 
                    language={language} 
                    toggleLanguage={toggleLanguage}
                    onOpen={openModal}
                    user={user}
                    onLogout={handleLogout}
                    notificationCount={notificationCount}
                  />
                  <Landing onOpen={openModal} language={language} />
                </>
              )
            } 
          />

          {/* Protected Dashboard Routes */}
          <Route 
            path="/supplier-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['supplier']}>
                <SellerDashboard 
                  language={language} 
                  user={user}
                  onLogout={handleLogout}
                  notificationCount={notificationCount}
                  updateNotificationCount={updateNotificationCount}
                />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/vendor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <BuyerDashboard 
                  language={language} 
                  user={user}
                  onLogout={handleLogout}
                  notificationCount={notificationCount}
                  updateNotificationCount={updateNotificationCount}
                />
              </ProtectedRoute>
            } 
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Modals */}
        {modal === 'vendor' && (
          <SignupVendor 
            onClose={closeModal} 
            language={language}
            onLogin={handleLogin}
          />
        )}
        {modal === 'supplier' && (
          <SignupSupplier 
            onClose={closeModal} 
            language={language}
            onLogin={handleLogin}
          />
        )}
        {modal === 'login' && (
          <Login 
            onClose={closeModal} 
            language={language}
            onLogin={handleLogin}
          />
        )}
      </div>
    </Router>
  );
}
