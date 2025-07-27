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
  Truck,
  BarChart3,
  Calendar,
  TrendingDown,
  Users,
  Plus,
  Minus
} from 'lucide-react';
import apiService from '../services/api';

export default function BuyerDashboard({ language }) {
  const navigate = useNavigate();
  

  
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedArea, setSelectedArea] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [loading, setLoading] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showCart, setShowCart] = useState(false);

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

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, analyticsData, ordersData] = await Promise.all([
          apiService.getProducts(),
          apiService.getVendorAnalytics(),
          apiService.getMyOrders()
        ]);
        
        setProducts(productsData);
        setAnalytics(analyticsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to mock data if API fails
        setProducts([
          {
            _id: 1,
            name: language === 'hi' ? 'मसाला दोसा' : 'Masala Dosa',
            price: 120,
            category: 'street-food',
            area: 'downtown',
            image: 'https://placehold.co/300x200/FF6B6B/FFF?text=Masala+Dosa',
            description: language === 'hi' ? 'क्रिस्पी दोसा मसाला आलू के साथ' : 'Crispy dosa with spiced potato filling',
            rating: 4.5,
            reviewCount: 128,
            deliveryTime: '20-30 min',
            supplier: { name: 'Spice Corner' },
            supplierRating: 4.8
          },
          {
            _id: 2,
            name: language === 'hi' ? 'चाय' : 'Chai',
            price: 15,
            category: 'beverages',
            area: 'university',
            image: 'https://placehold.co/300x200/4ECDC4/FFF?text=Chai',
            description: language === 'hi' ? 'गरम मसाला चाय' : 'Hot spiced tea',
            rating: 4.2,
            reviewCount: 89,
            deliveryTime: '10-15 min',
            supplier: { name: 'Tea House' },
            supplierRating: 4.6
          },
          {
            _id: 3,
            name: language === 'hi' ? 'समोसा' : 'Samosa',
            price: 20,
            category: 'snacks',
            area: 'suburbs',
            image: 'https://placehold.co/300x200/45B7D1/FFF?text=Samosa',
            description: language === 'hi' ? 'क्रिस्पी समोसा मसाला आलू के साथ' : 'Crispy samosa with spiced potato',
            rating: 4.7,
            reviewCount: 156,
            deliveryTime: '15-25 min',
            supplier: { name: 'Snack Street' },
            supplierRating: 4.9
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [user, language]);

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
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item._id === productId 
        ? { ...item, quantity }
        : item
    ));
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.filter(item => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const createOrder = async () => {
    if (cart.length === 0) return;
    
    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
        supplierId: cart[0].supplier._id, // Assuming all items from same supplier
        deliveryAddress: user.address,
        notes: 'Order from Ventrest'
      };
      
      await apiService.createOrder(orderData);
      setCart([]);
      alert('Order created successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    }
  };

  // Show loading if user data is not loaded yet or data is loading
  if (!user || loading) {
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

            {/* Analytics Button */}
            <button 
              onClick={() => setShowAnalytics(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'hi' ? 'विश्लेषण' : 'Analytics'}
              </span>
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setShowCart(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'hi' ? 'कार्ट' : 'Cart'}
              </span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
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
                <p className="text-2xl font-bold text-gray-900">₹{analytics?.totalSpent || 0}</p>
              </div>
              <Truck className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'hi' ? 'कुल ऑर्डर' : 'Total Orders'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{analytics?.totalOrders || 0}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
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

      {/* Analytics Modal */}
      {showAnalytics && (
        <AnalyticsModal 
          analytics={analytics}
          orders={orders}
          onClose={() => setShowAnalytics(false)}
          language={language}
        />
      )}

      {/* Cart Modal */}
      {showCart && (
        <CartModal 
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCreateOrder={createOrder}
          language={language}
        />
      )}
    </div>
  );
}

// Cart Modal Component
function CartModal({ cart, onClose, onUpdateQuantity, onRemoveItem, onCreateOrder, language }) {
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white rounded-t-2xl sticky top-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-center">
            {language === 'hi' ? 'शॉपिंग कार्ट' : 'Shopping Cart'}
          </h2>
        </div>

        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'hi' ? 'कार्ट खाली है' : 'Cart is empty'}
              </h3>
              <p className="text-gray-600">
                {language === 'hi' 
                  ? 'कुछ उत्पाद जोड़ने के लिए ब्राउज़ करें'
                  : 'Browse to add some products'
                }
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                      <button
                        onClick={() => onRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        {language === 'hi' ? 'हटाएं' : 'Remove'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    {language === 'hi' ? 'कुल:' : 'Total:'}
                  </span>
                  <span className="text-2xl font-bold text-indigo-600">₹{totalAmount}</span>
                </div>
                <button
                  onClick={onCreateOrder}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {language === 'hi' ? 'ऑर्डर करें' : 'Place Order'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Analytics Modal Component
function AnalyticsModal({ analytics, orders, onClose, language }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return language === 'hi' ? 'लंबित' : 'Pending';
      case 'confirmed': return language === 'hi' ? 'पुष्टि' : 'Confirmed';
      case 'preparing': return language === 'hi' ? 'तैयारी' : 'Preparing';
      case 'shipped': return language === 'hi' ? 'भेजा गया' : 'Shipped';
      case 'delivered': return language === 'hi' ? 'पहुंचाया' : 'Delivered';
      case 'cancelled': return language === 'hi' ? 'रद्द' : 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white rounded-t-2xl sticky top-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-center">
            {language === 'hi' ? 'खरीदारी विश्लेषण' : 'Purchase Analytics'}
          </h2>
        </div>

        <div className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Spent</p>
                  <p className="text-2xl font-bold">₹{analytics?.totalSpent || 0}</p>
                </div>
                <DollarSign className="w-8 h-8 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Orders</p>
                  <p className="text-2xl font-bold">{analytics?.totalOrders || 0}</p>
                </div>
                <ShoppingCart className="w-8 h-8 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">This Month</p>
                  <p className="text-2xl font-bold">₹{analytics?.thisMonthSpent || 0}</p>
                </div>
                <Calendar className="w-8 h-8 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">This Month Orders</p>
                  <p className="text-2xl font-bold">{analytics?.thisMonthOrders || 0}</p>
                </div>
                <Package className="w-8 h-8 opacity-80" />
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'hi' ? 'हाल के ऑर्डर' : 'Recent Orders'}
            </h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'hi' ? 'ऑर्डर' : 'Order'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'hi' ? 'आपूर्तिकर्ता' : 'Supplier'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'hi' ? 'राशि' : 'Amount'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'hi' ? 'स्थिति' : 'Status'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'hi' ? 'तारीख' : 'Date'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.slice(0, 10).map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order._id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.supplier?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{order.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          {analytics?.categoryBreakdown && analytics.categoryBreakdown.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'hi' ? 'श्रेणी अनुसार खर्च' : 'Spending by Category'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analytics.categoryBreakdown.map((category, index) => (
                  <div key={category._id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 capitalize">{category._id}</h4>
                      <span className="text-sm text-gray-500">#{index + 1}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        {language === 'hi' ? 'खर्च:' : 'Spent:'} ₹{category.total}
                      </p>
                      <p className="text-sm text-gray-600">
                        {language === 'hi' ? 'आइटम:' : 'Items:'} {category.count}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, onAddToCart, onAddToWishlist, language }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onAddToWishlist(product);
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
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{product.deliveryTime || '20-30 min'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{product.supplier?.name || 'Supplier'}</span>
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