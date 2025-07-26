// src/components/Header.jsx
import React from 'react';
import { Globe } from 'lucide-react';

export default function Header({ language, toggleLanguage }) {
  return (
    <header className="bg-white py-6 shadow-md flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-2">Ventrest</h1>
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 text-base text-gray-600 hover:text-blue-600"
      >
        <Globe className="w-5 h-5" />
        {language === 'hi' ? 'भाषा बदलें' : 'Change Language'}
      </button>
    </header>
  );
}
