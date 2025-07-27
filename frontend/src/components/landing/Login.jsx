// src/components/landing/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, X, Loader2, LogIn, Eye, EyeOff } from 'lucide-react';

export default function Login({ onClose, language }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'hi' ? 'वैध ईमेल दर्ज करें' : 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = language === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // First, try to authenticate with real database
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          // Real user from database
          localStorage.setItem('user', JSON.stringify(data.data.user));
          localStorage.setItem('token', data.data.token);
          
          // Navigate based on real user role
          window.location.href = data.data.user.role === 'vendor' ? '/#/vendor-dashboard' : '/#/supplier-dashboard';
          return;
        } else {
          // Database authentication failed
          setErrors(prev => ({ ...prev, general: data.message }));
          return;
        }
      } catch (backendError) {
        console.log('Backend not available, using hackathon mode');
        
        // Fallback to hackathon logic
        let userRole = 'vendor'; // default
        
        // If email contains 'supplier', they're a supplier
        if (formData.email.toLowerCase().includes('supplier')) {
          userRole = 'supplier';
        }
        
        // Create hackathon user object
        const user = {
          name: userRole === 'supplier' ? 'Ventrest Supplier' : 'Ventrest Vendor',
          email: formData.email,
          role: userRole,
          profilePic: userRole === 'supplier' 
            ? 'https://placehold.co/100x100/4F46E5/FFF?text=VS' 
            : 'https://placehold.co/100x100/4F46E5/FFF?text=VV'
        };
        
        // Store hackathon user data
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', 'hackathon-token-' + Date.now());
        
        // Navigate based on role
        window.location.href = userRole === 'vendor' ? '/#/vendor-dashboard' : '/#/supplier-dashboard';
      }
      
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        general: language === 'hi' 
          ? 'लॉगिन में त्रुटि। कृपया पुनः प्रयास करें।' 
          : 'Login error. Please try again.' 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] relative overflow-hidden flex flex-col">
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-center">
            {language === 'hi' ? 'लॉग इन करें' : 'Login'}
          </h2>
          <p className="text-purple-100 text-center mt-2">
            {language === 'hi' ? 'अपने खाते में लॉगिन करें' : 'Sign in to your account'}
          </p>
        </div>

        {/* Form - Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'hi' ? 'ईमेल' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={language === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'hi' ? 'पासवर्ड' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={language === 'hi' ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{errors.general}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="ml-2">{language === 'hi' ? 'लॉगिन कर रहे हैं...' : 'Logging in...'}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span className="ml-2">{language === 'hi' ? 'लॉगिन करें' : 'Login'}</span>
                </>
              )}
            </button>

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">
                {language === 'hi' ? 'हैकाथॉन लॉगिन' : 'Hackathon Login'}
              </h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Vendor:</strong> any-email@any.com (password: anything)</p>
                <p><strong>Supplier:</strong> supplier@any.com (password: anything)</p>
                <p className="text-blue-600 mt-2">
                  <strong>Tip:</strong> {language === 'hi' 
                    ? 'ईमेल में "supplier" शब्द जोड़ें सप्लायर के लिए'
                    : 'Add "supplier" in email for supplier access'
                  }
                </p>
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="text-xs text-gray-500 text-center mt-4">
              <p>Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Esc</kbd> to close</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
