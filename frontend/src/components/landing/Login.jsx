// src/components/Login.jsx
import React, { useState } from 'react';

export default function Login({ onClose, language }) {
  const [otpRequested, setOtpRequested] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
          {language === 'hi' ? 'लॉग इन करें' : 'Login'}
        </h2>

        <form className="flex flex-col gap-4">
          {!otpRequested ? (
            <>
              <input
                type="text"
                placeholder={language === 'hi' ? 'उपयोगकर्ता नाम' : 'Username'}
                className="border rounded px-4 py-2"
              />

              <input
                type="password"
                placeholder={language === 'hi' ? 'पासवर्ड' : 'Password'}
                className="border rounded px-4 py-2"
              />

              <input
                type="text"
                placeholder={language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
                className="border rounded px-4 py-2"
              />

              <button
                type="button"
                className="bg-yellow-500 text-white rounded px-4 py-2 hover:bg-yellow-600"
                onClick={() => setOtpRequested(true)}
              >
                {language === 'hi' ? 'ओटीपी भेजें' : 'Send OTP'}
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder={language === 'hi' ? 'ओटीपी दर्ज करें' : 'Enter OTP'}
                className="border rounded px-4 py-2"
              />
              <button
                type="button"
                className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
              >
                {language === 'hi' ? 'ओटीपी सत्यापित करें' : 'Verify OTP'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
