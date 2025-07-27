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

export default function App() {
  const [modal, setModal] = useState(null);
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);


  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const openModal = (type) => setModal(type);
  const closeModal = () => setModal(null);
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 font-sans">
        <Routes>
          {/* Landing Page Route */}
          <Route 
            path="/" 
            element={
              <>
                <Header language={language} toggleLanguage={toggleLanguage} />
                <Landing onOpen={openModal} language={language} />
              </>
            } 
          />

          {/* Dashboard Routes - Simplified */}
          <Route 
            path="/supplier-dashboard" 
            element={
              <>
                <SellerDashboard language={language} />
              </>
            } 
          />
          <Route 
            path="/vendor-dashboard" 
            element={
              <>
                <BuyerDashboard language={language} />
              </>
            } 
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Modals */}
        {modal === 'vendor' && <SignupVendor onClose={closeModal} language={language} />}
        {modal === 'supplier' && <SignupSupplier onClose={closeModal} language={language} />}
        {modal === 'login' && <Login onClose={closeModal} language={language} />}
      </div>
    </Router>
  );
}
