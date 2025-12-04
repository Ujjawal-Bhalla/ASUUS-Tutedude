// App.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/landing/Header';
import Landing from './pages/Landing';
import SellerDashboard from './pages/SellerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import SignupVendor from './components/landing/SignupVendor';
import SignupSupplier from './components/landing/SignupSupplier';
import Login from './components/landing/Login';
import apiService from './services/api';

// Redirect component that uses useEffect to prevent render loops
const Redirect = ({ to, replace = true }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, to, replace]);
  return null;
};

// Landing Page Component - moved outside to prevent recreation
const LandingPage = ({ user, language, openModal, toggleLanguage, handleLogout, notificationCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = React.useRef(false);

  useEffect(() => {
    // Only redirect once and only if we're on the root path
    // Check both pathname and hash for HashRouter compatibility
    const currentPath = location.pathname || window.location.hash.replace('#', '') || '/';
    
    if (user && (currentPath === '/' || currentPath === '') && !hasRedirected.current) {
      hasRedirected.current = true;
      // Normalize role names (should already be migrated, but just in case)
      const role = user.role === 'seller' ? 'supplier' : (user.role === 'buyer' ? 'vendor' : user.role);
      const dashboardPath = role === 'supplier' ? '/supplier-dashboard' : '/vendor-dashboard';
      
      console.log('LandingPage: Redirecting user with role', role, 'to', dashboardPath);
      
      // Use window.location.hash for HashRouter to ensure it works properly
      window.location.hash = dashboardPath;
    }
  }, [user, location.pathname, navigate]);

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
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
  );
};

// Protected Route Component - moved outside to prevent recreation
const ProtectedRoute = ({ children, allowedRoles, user, loading }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasRedirected = React.useRef(false);

  useEffect(() => {
    if (!loading && !hasRedirected.current) {
      // Normalize role for comparison
      const userRole = user?.role === 'seller' ? 'supplier' : (user?.role === 'buyer' ? 'vendor' : user?.role);
      
      if (!user) {
        if (location.pathname !== '/') {
          hasRedirected.current = true;
          navigate('/', { replace: true });
        }
      } else if (allowedRoles && !allowedRoles.includes(userRole)) {
        if (location.pathname !== '/') {
          hasRedirected.current = true;
          navigate('/', { replace: true });
        }
      }
    }
  }, [loading, user, allowedRoles, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default function App() {
  console.log('App component rendering');
  const [modal, setModal] = useState(null);
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    console.log('App useEffect running');
    const initializeApp = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        
        console.log('Initializing app, savedUser:', savedUser ? 'exists' : 'none');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          
          // Migrate old role names to new ones
          if (userData.role === 'seller') {
            userData.role = 'supplier';
            localStorage.setItem('user', JSON.stringify(userData));
          } else if (userData.role === 'buyer') {
            userData.role = 'vendor';
            localStorage.setItem('user', JSON.stringify(userData));
          }
          
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
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Memoize callbacks to prevent unnecessary re-renders
  const openModal = useCallback((type) => setModal(type), []);
  const closeModal = useCallback(() => setModal(null), []);
  const toggleLanguage = useCallback(() => setLanguage((prev) => (prev === 'en' ? 'hi' : 'en')), []);

  const handleLogin = useCallback((userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    apiService.setToken(token);
    setModal(null);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setNotificationCount(0);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    apiService.clearToken();
  }, []);

  const updateNotificationCount = useCallback((count) => {
    setNotificationCount(count);
  }, []);

  console.log('App render - loading:', loading, 'user:', user);
  
  if (loading) {
    console.log('Rendering loading screen');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Ventrest...</p>
        </div>
      </div>
    );
  }

  console.log('Rendering main app with Router');

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 font-sans">
        <Routes>
          {/* Landing Page Route */}
          <Route 
            path="/" 
            element={
              <LandingPage 
                user={user}
                language={language}
                openModal={openModal}
                toggleLanguage={toggleLanguage}
                handleLogout={handleLogout}
                notificationCount={notificationCount}
              />
            }
          />

          {/* Protected Dashboard Routes */}
          <Route 
            path="/supplier-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['supplier']} user={user} loading={loading}>
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
              <ProtectedRoute allowedRoles={['vendor']} user={user} loading={loading}>
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
