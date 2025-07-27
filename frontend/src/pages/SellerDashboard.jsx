// src/pages/SellerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Settings, 
  LogOut, 
  User, 
  Package, 
  TrendingUp, 
  DollarSign,
  Edit,
  Trash2,
  Eye,
  Globe,
  Bell,
  ShoppingCart
} from 'lucide-react';

export default function SellerDashboard({ language }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Get user data from localStorage
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  // Mock categories
  const categories = [
    { id: 'all', name: language === 'hi' ? 'सभी श्रेणियाँ' : 'All Categories' },
    { id: 'street-food', name: language === 'hi' ? 'स्ट्रीट फूड' : 'Street Food' },
    { id: 'beverages', name: language === 'hi' ? 'पेय पदार्थ' : 'Beverages' },
    { id: 'snacks', name: language === 'hi' ? 'स्नैक्स' : 'Snacks' },
    { id: 'desserts', name: language === 'hi' ? 'मिठाई' : 'Desserts' }
  ];

  // Mock products data
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: language === 'hi' ? 'मसाला दोसा' : 'Masala Dosa',
        price: 120,
        category: 'street-food',
        image: 'https://placehold.co/300x200/FF6B6B/FFF?text=Masala+Dosa',
        description: language === 'hi' ? 'क्रिस्पी दोसा मसाला आलू के साथ' : 'Crispy dosa with spiced potato filling',
        stock: 25,
        status: 'active'
      },
      {
        id: 2,
        name: language === 'hi' ? 'चाय' : 'Chai',
        price: 15,
        category: 'beverages',
        image: 'https://placehold.co/300x200/4ECDC4/FFF?text=Chai',
        description: language === 'hi' ? 'गरम मसाला चाय' : 'Hot spiced tea',
        stock: 50,
        status: 'active'
      },
      {
        id: 3,
        name: language === 'hi' ? 'समोसा' : 'Samosa',
        price: 20,
        category: 'snacks',
        image: 'https://placehold.co/300x200/45B7D1/FFF?text=Samosa',
        description: language === 'hi' ? 'क्रिस्पी समोसा मसाला आलू के साथ' : 'Crispy samosa with spiced potato',
        stock: 30,
        status: 'active'
      }
    ]);
  }, [language]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
    setShowAddModal(false);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Show loading if user data is not loaded yet
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                <ShoppingCart className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {language === 'hi' ? 'वेंटरेस्ट सप्लायर डैशबोर्ड' : 'Ventrest Supplier Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'hi' ? 'अपने उत्पादों का प्रबंधन करें' : 'Manage your products'}
                </p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Globe className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile */}
              <button 
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img 
                  src={user.profilePic} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </button>

              {/* Logout */}
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === 'hi' ? 'लॉगआउट' : 'Logout'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'hi' ? 'कुल उत्पाद' : 'Total Products'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'hi' ? 'सक्रिय उत्पाद' : 'Active Products'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'hi' ? 'कुल बिक्री' : 'Total Sales'}
                </p>
                <p className="text-2xl font-bold text-gray-900">₹2,450</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'hi' ? 'आज के ऑर्डर' : 'Today\'s Orders'}
                </p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Filters and Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="recent">{language === 'hi' ? 'हाल ही में' : 'Recent'}</option>
              <option value="name">{language === 'hi' ? 'नाम' : 'Name'}</option>
              <option value="price">{language === 'hi' ? 'कीमत' : 'Price'}</option>
            </select>
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{language === 'hi' ? 'उत्पाद जोड़ें' : 'Add Product'}</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-1 bg-white/80 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">₹{product.price}</span>
                  <span className="text-sm text-gray-500">
                    {language === 'hi' ? 'स्टॉक:' : 'Stock:'} {product.stock}
                  </span>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status === 'active' 
                      ? (language === 'hi' ? 'सक्रिय' : 'Active')
                      : (language === 'hi' ? 'निष्क्रिय' : 'Inactive')
                    }
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    {language === 'hi' ? 'देखें' : 'View'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No products found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'hi' 
                ? 'अपना पहला उत्पाद जोड़ने के लिए ऊपर दिए गए बटन पर क्लिक करें'
                : 'Click the button above to add your first product'
              }
            </p>
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
          language={language}
        />
      )}

      {/* Profile Sidebar */}
      {showProfile && (
        <ProfileSidebar 
          user={user}
          onClose={() => setShowProfile(false)}
          language={language}
        />
      )}
    </div>
  );
}

// Add Product Modal Component
function AddProductModal({ onClose, onAdd, language }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'street-food',
    description: '',
    stock: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      status: 'active'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-center">
            {language === 'hi' ? 'नया उत्पाद जोड़ें' : 'Add New Product'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'hi' ? 'उत्पाद का नाम' : 'Product Name'}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'hi' ? 'कीमत' : 'Price'}
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'hi' ? 'स्टॉक' : 'Stock'}
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'hi' ? 'श्रेणी' : 'Category'}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="street-food">{language === 'hi' ? 'स्ट्रीट फूड' : 'Street Food'}</option>
              <option value="beverages">{language === 'hi' ? 'पेय पदार्थ' : 'Beverages'}</option>
              <option value="snacks">{language === 'hi' ? 'स्नैक्स' : 'Snacks'}</option>
              <option value="desserts">{language === 'hi' ? 'मिठाई' : 'Desserts'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'hi' ? 'विवरण' : 'Description'}
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'hi' ? 'छवि URL' : 'Image URL'}
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {language === 'hi' ? 'उत्पाद जोड़ें' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Profile Sidebar Component
function ProfileSidebar({ user, onClose, language }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-center">
            {language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}
          </h2>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <img src={user.profilePic} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mt-2">
              {language === 'hi' ? 'सप्लायर' : 'Supplier'}
            </span>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{language === 'hi' ? 'प्रोफ़ाइल संपादित करें' : 'Edit Profile'}</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{language === 'hi' ? 'सेटिंग्स' : 'Settings'}</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{language === 'hi' ? 'भाषा बदलें' : 'Change Language'}</span>
            </button>
            
            <hr className="my-4" />
            
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-100 transition-colors text-red-600">
              <LogOut className="w-5 h-5" />
              <span>{language === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 