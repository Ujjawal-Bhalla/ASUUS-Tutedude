// App.jsx
import React, { useState } from 'react';
import Header from './components/landing/Header';
import Landing from './pages/Landing';
import SignupBuyer from './components/landing/SignupBuyer';
import SignupSeller from './components/landing/SignupSeller';
import Login from './components/landing/Login';

export default function App() {
  const [modal, setModal] = useState(null); // 'buyer' | 'seller' | 'login' | null
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'

  const openModal = (type) => setModal(type);
  const closeModal = () => setModal(null);
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 font-sans">
      <Header language={language} toggleLanguage={toggleLanguage} />
      <Landing onOpen={openModal} language={language} />

      {modal === 'buyer' && <SignupBuyer onClose={closeModal} language={language} />}
      {modal === 'seller' && <SignupSeller onClose={closeModal} language={language} />}
      {modal === 'login' && <Login onClose={closeModal} language={language} />}
    </div>
  );
}
