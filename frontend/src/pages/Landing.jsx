// src/pages/Landing.jsx
import React, { useState } from 'react';
import { UserPlus, Store, ArrowRight, CheckCircle, Star, Users, Truck } from 'lucide-react';
import SignupVendor from '../components/landing/SignupVendor';
import SignupSupplier from '../components/landing/SignupSupplier';
import Login from '../components/landing/Login';

export default function Landing({ onOpen, language }) {

  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: language === 'hi' ? 'विश्वसनीय आपूर्तिकर्ता' : 'Trusted Suppliers',
      description: language === 'hi' ? 'सत्यापित और विश्वसनीय आपूर्तिकर्ताओं से जुड़ें' : 'Connect with verified and reliable suppliers'
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: language === 'hi' ? 'तेज़ डिलीवरी' : 'Fast Delivery',
      description: language === 'hi' ? 'समय पर और कुशल डिलीवरी सेवाएं' : 'Timely and efficient delivery services'
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: language === 'hi' ? 'गुणवत्ता आश्वासन' : 'Quality Assurance',
      description: language === 'hi' ? 'उच्च गुणवत्ता वाले उत्पादों की गारंटी' : 'Guaranteed high-quality products'
    }
  ];

  // Handle successful registration - show login modal
  const handleRegistrationSuccess = () => {
    setShowLogin(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Hero Section - More Compact */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Main Heading - Reduced spacing */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {language === 'hi' ? 'वेंटरेस्ट' : 'Ventrest'}
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
            {language === 'hi' ? 'सड़क भोजन में नई क्रांति!' : 'Street Food Revolution!'}
          </p>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'hi'
              ? 'सड़क भोजन व्यवसायों को विश्वसनीय आपूर्तिकर्ताओं से जोड़ने वाला एक अभिनव मंच'
              : 'An innovative platform connecting street food businesses with trusted suppliers'}
          </p>
        </div>

        {/* CTA Cards - More Compact */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-4xl">
          {/* Vendor Card */}
          <div className="flex-1 group">
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <UserPlus className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {language === 'hi' ? 'स्ट्रीट फूड वेंडर' : 'Street Food Vendor'}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {language === 'hi' 
                  ? 'अपने व्यवसाय को बढ़ाएं और गुणवत्तापूर्ण आपूर्तिकर्ताओं से जुड़ें'
                  : 'Grow your business and connect with quality suppliers'
                }
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpen('vendor');
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-base transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {language === 'hi' ? 'वेंडर पंजीकरण' : 'Vendor Registration'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Supplier Card */}
          <div className="flex-1 group">
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Store className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {language === 'hi' ? 'आपूर्तिकर्ता' : 'Supplier'}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {language === 'hi'
                  ? 'अपने उत्पादों को नए ग्राहकों तक पहुंचाएं और बिक्री बढ़ाएं'
                  : 'Reach new customers and increase sales with your products'
                }
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpen('supplier');
                }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl text-base transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {language === 'hi' ? 'आपूर्तिकर्ता पंजीकरण' : 'Supplier Registration'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Login Section - Right below registration cards */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-6 max-w-md">
          <p className="text-gray-700 text-base mb-3">
            {language === 'hi' ? 'पहले से ही खाता है?' : 'Already have an account?'}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpen('login');
            }}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-xl text-base transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <CheckCircle className="w-4 h-4" />
            {language === 'hi' ? 'यहाँ लॉगिन करें' : 'Login Here'}
          </button>
        </div>

        {/* Features Section - More Compact */}
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'hi' ? 'क्यों वेंटरेस्ट चुनें?' : 'Why Choose Ventrest?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/80 transition-all duration-300">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals are now handled in App.jsx */}
    </div>
  );
}
