// src/pages/Landing.jsx
import React, { useState } from 'react';
import { UserPlus, Store } from 'lucide-react';
import SignupBuyer from '../components/landing/SignupBuyer';
import SignupSeller from '../components/landing/SignupSeller';
import Login from '../components/landing/Login';

export default function Landing({ language }) {
const [showBuyerSignup, setShowBuyerSignup] = useState(false);
const [showSellerSignup, setShowSellerSignup] = useState(false);
const [showLogin, setShowLogin] = useState(false);

return ( <div
   className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 text-center overflow-hidden"
 > <img
     src="/assets/bg-texture.svg"
     alt="background"
     className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm -z-10"
   />

  <h1 className="text-5xl font-extrabold mb-8 text-gray-800">
    {language === 'hi' ? 'सड़क भोजन में नई क्रांति!' : 'Street Food Revolution!'}
  </h1>

  <p className="text-xl mb-10 max-w-2xl text-gray-700">
    {language === 'hi'
      ? 'सड़क भोजन व्यवसायों को विश्वसनीय आपूर्तिकर्ताओं से जोड़ने वाला एक मंच'
      : 'Connecting Street Food Businesses with Trusted Suppliers'}
  </p>

  <div className="flex flex-wrap justify-center gap-8">
    <div className="flex flex-col items-center bg-white border rounded-xl p-8 shadow-lg w-64 transition-transform transform hover:scale-105">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <UserPlus className="text-blue-500" size={42} />
      </div>
      <button
        onClick={() => setShowBuyerSignup(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded text-lg"
      >
        {language === 'hi' ? 'विक्रेता पंजीकरण' : 'Vendor Signup'}
      </button>
    </div>

    <div className="flex flex-col items-center bg-white border rounded-xl p-8 shadow-lg w-64 transition-transform transform hover:scale-105">
      <div className="bg-green-100 p-4 rounded-full mb-4">
        <Store className="text-green-500" size={42} />
      </div>
      <button
        onClick={() => setShowSellerSignup(true)}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded text-lg"
      >
        {language === 'hi' ? 'आपूर्तिकर्ता पंजीकरण' : 'Supplier Signup'}
      </button>
    </div>
  </div>

  <div className="mt-10">
    <p className="text-gray-700 text-base">
      {language === 'hi' ? 'पहले से ही खाता है? ' : 'Already have an account?'}
      <button
        onClick={() => setShowLogin(true)}
        className="text-blue-600 hover:underline font-medium ml-1"
      >
        {language === 'hi' ? 'यहाँ लॉगिन करें' : 'Login here'}
      </button>
    </p>
  </div>

  {showBuyerSignup && (
    <SignupBuyer
      onClose={() => setShowBuyerSignup(false)}
      language={language}
    />
  )}

  {showSellerSignup && (
    <SignupSeller
      onClose={() => setShowSellerSignup(false)}
      language={language}
    />
  )}

  {showLogin && (
    <Login onClose={() => setShowLogin(false)} language={language} />
  )}
</div>


);
}
