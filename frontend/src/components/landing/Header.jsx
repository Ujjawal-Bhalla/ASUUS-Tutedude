// src/components/Header.jsx
import React from 'react';
import { Globe, LogOut, Bell, User, ShoppingCart, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ 
  language, 
  toggleLanguage, 
  onOpen, 
  user, 
  onLogout, 
  notificationCount = 0 
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const getDashboardUrl = () => {
    if (!user) return '/';
    return user.role === 'supplier' ? '/supplier-dashboard' : '/vendor-dashboard';
  };

  const getRoleDisplayName = () => {
    if (!user) return '';
    return user.role === 'supplier' ? 'Supplier' : 'Vendor';
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm py-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <h1 
              className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate('/')}
            >
              Ventrest
            </h1>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            >
              <Globe className="w-4 h-4" />
              {language === 'hi' ? 'भाषा' : 'Language'}
            </button>
          </div>

          {/* Navigation and User Section */}
          <div className="flex items-center space-x-4">
            {user && (
              // Authenticated User Navigation
              <>
                {/* Notifications */}
                {user.role === 'supplier' && notificationCount > 0 && (
                  <div className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  </div>
                )}

                {/* User Info */}
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user.name}</span>
                  <span className="text-gray-500">({getRoleDisplayName()})</span>
                </div>

                {/* Dashboard Navigation */}
                <button
                  onClick={() => navigate(getDashboardUrl())}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  <BarChart3 className="w-4 h-4" />
                  {language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  {language === 'hi' ? 'लॉगआउट' : 'Logout'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
