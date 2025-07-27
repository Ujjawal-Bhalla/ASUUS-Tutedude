// src/pages/BuyerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Heart, 
  Star, 
  MapPin, 
  Clock, 
  User, 
  LogOut,
  Globe,
  Bell,
  Package,
  Truck
} from 'lucide-react';

export default function BuyerDashboard({ language }) {
  const navigate = useNavigate();
  

  
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedArea, setSelectedArea] = useState('all');
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

  // Mock areas
  const areas = [
    { id: 'all', name: language === 'hi' ? 'सभी क्षेत्र' : 'All Areas' },
    { id: 'downtown', name: language === 'hi' ? 'शहर का केंद्र' : 'Downtown' },
    { id: 'suburbs', name: language === 'hi' ? 'उपनगर' : 'Suburbs' },
    { id: 'university', name: language === 'hi' ? 'विश्वविद्यालय क्षेत्र' : 'University Area' }
  ];

  // Mock products data
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: language === 'hi' ? 'मसाला दोसा' : 'Masala Dosa',
        price: 120,
        category: 'street-food',
        area: 'downtown',
        image: 'https://placehold.co/300x200/FF6B6B/FFF?text=Masala+Dosa',
        description: language === 'hi' ? 'क्रिस्पी दोसा मसाला आलू के साथ' : 'Crispy dosa with spiced potato filling',
        rating: 4.5,
        reviews: 128,
        deliveryTime: '20-30 min',
        vendor: 'Spice Corner',
        vendorRating: 4.8
      },
      {
        id: 2,
        name: language === 'hi' ? 'चाय' : 'Chai',
        price: 15,
        category: 'beverages',
        area: 'university',
        image: 'https://placehold.co/300x200/4ECDC4/FFF?text=Chai',
        description: language === 'hi' ? 'गरम मसाला चाय' : 'Hot spiced tea',
        rating: 4.2,
        reviews: 89,
        deliveryTime: '10-15 min',
        vendor: 'Tea House',
        vendorRating: 4.6
      },
      {
        id: 3,
        name: language === 'hi' ? 'समोसा' : 'Samosa',
        price: 20,
        category: 'snacks',
        area: 'suburbs',
        image: 'https://placehold.co/300x200/45B7D1/FFF?text=Samosa',
        description: language === 'hi' ? 'क्रिस्पी समोसा मसाला आलू के साथ' : 'Crispy samosa with spiced potato',
        rating: 4.7,
        reviews: 156,
        deliveryTime: '15-25 min',
        vendor: 'Snack Street',
        vendorRating: 4.9
      }
    ]);
  }, [language]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesArea = selectedArea === 'all' || product.area === selectedArea;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesArea && matchesPrice;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Show loading if user data is not loaded yet
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Optional: Log user role for debugging
  console.log('Vendor dashboard - User role:', user.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                <Package className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {language === 'hi' ? 'वेंटरेस्ट वेंडर पोर्टल' : 'Ventrest Vendor Portal'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'hi' ? 'सर्वोत्तम स्ट्रीट फूड खोजें' : 'Discover the best street food'}
                </p>
              </div>
            </div>

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
                  {language === 'hi' ? 'कार्ट में आइटम' : 'Items in Cart'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{cart.length}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'hi' ? 'कुल खर्च' : 'Total Spent'}
                </p>
                <p className="text-2xl font-bold text-gray-900">₹1,250</p>
              </div>
              <Truck className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'hi' ? 'पिछले ऑर्डर' : 'Recent Orders'}
                </p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
              language={language}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No products found'}
            </h3>
            <p className="text-gray-600">
              {language === 'hi' 
                ? 'अपनी खोज मापदंड बदलने का प्रयास करें'
                : 'Try changing your search criteria'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, onAddToCart, language }) {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        
        {/* Favorite Button */}
        <button 
          onClick={handleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-red-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
          <div className="text-right">
            <span className="text-lg font-bold text-indigo-600">₹{product.price}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{product.deliveryTime}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{product.vendor}</span>
          </div>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          {language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
} 