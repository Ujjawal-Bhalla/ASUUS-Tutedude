// src/components/Header.jsx
import React from 'react';
import { Globe } from 'lucide-react';

export default function Header({ language, toggleLanguage }) {
  return (
    <header className="bg-white/90 backdrop-blur-sm py-6 shadow-lg flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
        Ventrest
      </h1>
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 text-base text-gray-600 hover:text-indigo-600 transition-colors duration-300"
      >
        <Globe className="w-5 h-5" />
        {language === 'hi' ? 'भाषा बदलें' : 'Change Language'}
      </button>
    </header>
  );
}
