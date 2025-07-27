// src/components/landing/Login.jsx
import React, { useState } from 'react';
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
      // Check if using demo credentials
      const isDemoEmail = formData.email.includes('demo.com');
      
      if (isDemoEmail) {
        // Use demo logic for demo credentials
        let userRole = 'buyer'; // default
        
        // Demo logic: if email contains 'vendor' or 'seller', redirect to seller dashboard
        if (formData.email.toLowerCase().includes('vendor') || formData.email.toLowerCase().includes('seller')) {
          userRole = 'seller';
        }
        
        // Simulate successful login
        const mockUser = {
          name: userRole === 'seller' ? 'Ventrest Vendor' : 'Ventrest Buyer',
          email: formData.email,
          role: userRole,
          profilePic: userRole === 'seller' 
            ? 'https://placehold.co/100x100/4F46E5/FFF?text=VV' 
            : 'https://placehold.co/100x100/4F46E5/FFF?text=VB'
        };
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-token-' + Date.now());
        
        // Force a page reload to update the user state
        window.location.href = userRole === 'buyer' ? '/#/buyer-dashboard' : '/#/seller-dashboard';
        return;
      }
      
      // Try to connect to backend for real credentials
      try {
        const response = await fetch('https://asuus-tutedude-production.up.railway.app/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          // Store user data from database
          localStorage.setItem('user', JSON.stringify(data.data.user));
          localStorage.setItem('token', data.data.token);
          
          // Force a page reload to update the user state
          window.location.href = data.data.user.role === 'buyer' ? '/#/buyer-dashboard' : '/#/seller-dashboard';
          return;
        } else {
          setErrors(prev => ({ ...prev, general: data.message }));
          return;
        }
      } catch (backendError) {
        console.error('Backend connection failed:', backendError);
        // Fallback to demo logic if backend is not available
        let userRole = 'buyer'; // default
        
        if (formData.email.toLowerCase().includes('vendor') || formData.email.toLowerCase().includes('seller')) {
          userRole = 'seller';
        }
        
        const mockUser = {
          name: userRole === 'seller' ? 'Ventrest Vendor' : 'Ventrest Buyer',
          email: formData.email,
          role: userRole,
          profilePic: userRole === 'seller' 
            ? 'https://placehold.co/100x100/4F46E5/FFF?text=VV' 
            : 'https://placehold.co/100x100/4F46E5/FFF?text=VB'
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-token-' + Date.now());
        
        // Force a page reload to update the user state
        window.location.href = userRole === 'buyer' ? '/#/buyer-dashboard' : '/#/seller-dashboard';
      }
      
    } catch (error) {
      console.error('Login error:', error);
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
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

        {/* Form */}
        <div className="p-6">
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
                  {language === 'hi' ? 'लॉगिन कर रहे हैं...' : 'Logging in...'}
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  {language === 'hi' ? 'लॉगिन करें' : 'Login'}
                </>
              )}
            </button>

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">
                {language === 'hi' ? 'डेमो क्रेडेंशियल्स' : 'Demo Credentials'}
              </h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Vendor/Supplier:</strong> vendor@demo.com / password123</p>
                <p><strong>Buyer:</strong> buyer@demo.com / password123</p>
                <p className="text-blue-600 mt-2">
                  <strong>Tip:</strong> {language === 'hi' 
                    ? 'वेंडर या सेलर के लिए ईमेल में "vendor" या "seller" शब्द जोड़ें'
                    : 'Add "vendor" or "seller" in email for vendor/supplier access'
                  }
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
