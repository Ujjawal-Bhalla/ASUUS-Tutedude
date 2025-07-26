// React and its hooks (useState, useEffect) are accessed globally via the CDNs

// Global scope for language functions
let globalUpdateTexts; // To hold the updateTexts function

// Main App component that handles conditional rendering based on login
function App() {
    // State to simulate login status and user role
    const [user, setUser] = React.useState(null); // null means not logged in.
    const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Simplified login state

    // Simulate a successful login for a buyer
    const handleLogin = () => {
        // In a real app, this would involve authentication API calls
        setUser({ name: 'GCommerce Buyer', role: 'buyer', profilePic: 'https://placehold.co/100x100/4F46E5/FFF?text=BC' });
        setIsLoggedIn(true);
        console.log("Buyer logged in (simulated).");
    };

    const handleLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
        console.log("Logged out (simulated).");
    };

    // If not logged in, show a simple login button for demonstration
    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
                <h1 className="text-5xl font-extrabold mb-4 text-gray-900">GCommerce</h1>
                <p className="text-2xl mb-8 text-gray-600">Buyer Portal</p>
                <button
                    onClick={handleLogin}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                >
                    Simulate Buyer Login
                </button>
            </div>
        );
    }

    // If logged in as a buyer, render the BuyerDashboard
    return <BuyerDashboard user={user} handleLogout={handleLogout} />;
}

// Buyer Dashboard Component
function BuyerDashboard({ user, handleLogout }) {
    const [items, setItems] = React.useState([]);
    const [sortBy, setSortBy] = React.useState('relevance');
    const [area, setArea] = React.useState('all');
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [showProfileSidebar, setShowProfileSidebar] = React.useState(false);
    const [productSearchQuery, setProductSearchQuery] = React.useState('');
    const [sellerSearchQuery, setSellerSearchQuery] = React.useState('');
    const [cartItems, setCartItems] = React.useState([]); // State for items in cart
    const [isCartOpen, setIsCartOpen] = React.useState(false); // State for cart visibility

    // Dummy categories for horizontal scroll
    const categories = [
        { id: 'all', en: 'All Categories', hi: 'सभी श्रेणियाँ' },
        { id: 'electronics', en: 'Electronics', hi: 'इलेक्ट्रॉनिक्स' },
        { id: 'fashion', en: 'Fashion', hi: 'फैशन' },
        { id: 'home', en: 'Home & Decor', hi: 'घर और सजावट' },
        { id: 'books', en: 'Books', hi: 'किताबें' },
        { id: 'sports', en: 'Sports & Outdoors', hi: 'खेल और आउटडोर' },
        { id: 'food', en: 'Food & Groceries', hi: 'खाद्य और किराने का सामान' },
        { id: 'automotive', en: 'Automotive', hi: 'ऑटोमोटिव' },
    ];

    // Placeholder for fetching items and deal of the day
    React.useEffect(() => {
        const fetchItems = () => {
            console.log("Fetching items for buyer (simulated).");
            // This would be an API call to load available items
            setItems([
                {
                    id: 1,
                    name: 'Gourmet Coffee Beans',
                    price: '750', // Storing as number for easier calculation
                    image: 'https://placehold.co/300x200/4F46E5/FFF?text=Coffee+Beans',
                    description: 'Premium Arabica beans, ethically sourced.',
                    area: 'North',
                    category: 'food',
                    sellerName: 'Bean Bliss Co.'
                },
                {
                    id: 2,
                    name: 'Wireless Earbuds',
                    price: '2999',
                    image: 'https://placehold.co/300x200/3B82F6/FFF?text=Earbuds',
                    description: 'Crystal clear sound, noise cancelling.',
                    area: 'South',
                    category: 'electronics',
                    sellerName: 'SoundWave Tech'
                },
                {
                    id: 3,
                    name: 'Handcrafted Ceramic Mug',
                    price: '450',
                    image: 'https://placehold.co/300x200/10B981/FFF?text=Ceramic+Mug',
                    description: 'Unique design, perfect for daily use.',
                    area: 'East',
                    category: 'home',
                    sellerName: 'Clay Creations'
                },
                {
                    id: 4,
                    name: 'Leather Wallet',
                    price: '1200',
                    image: 'https://placehold.co/300x200/EF4444/FFF?text=Wallet',
                    description: 'Genuine leather, slim and stylish.',
                    area: 'West',
                    category: 'fashion',
                    sellerName: 'Fine Leather Goods'
                },
                {
                    id: 5,
                    name: 'Smart Fitness Tracker',
                    price: '3500',
                    image: 'https://placehold.co/300x200/F97316/FFF?text=Tracker',
                    description: 'Monitor steps, heart rate, and sleep.',
                    area: 'North',
                    category: 'electronics',
                    sellerName: 'HealthTech Innovations'
                },
                {
                    id: 6,
                    name: 'Organic Green Tea',
                    price: '300',
                    image: 'https://placehold.co/300x200/22C55E/FFF?text=Green+Tea',
                    description: 'Pure and refreshing, packed with antioxidants.',
                    area: 'South',
                    category: 'food',
                    sellerName: 'Nature\'s Brew'
                },
                 {
                    id: 7,
                    name: 'Designer T-Shirt',
                    price: '800',
                    image: 'https://placehold.co/300x200/8B5CF6/FFF?text=T-Shirt',
                    description: 'Comfortable cotton, unique graphic print.',
                    area: 'East',
                    category: 'fashion',
                    sellerName: 'Chic Threads'
                },
                {
                    id: 8,
                    name: 'Portable Bluetooth Speaker',
                    price: '1800',
                    image: 'https://placehold.co/300x200/EC4899/FFF?text=Speaker',
                    description: 'Compact size, powerful sound, 10-hour battery.',
                    area: 'West',
                    category: 'electronics',
                    sellerName: 'Audio Blasters'
                }
            ]);
        };
        fetchItems();
    }, []); // Run once on component mount

    const handleSortChange = (e) => {
        const newSortBy = e.target.value;
        setSortBy(newSortBy);
        console.log("Sorting by:", newSortBy);
    };

    const handleAreaChange = (e) => {
        const newArea = e.target.value;
        setArea(newArea);
        console.log("Filtering by area:", newArea);
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        console.log("Selected category:", categoryId);
    };

    const handleProductSearch = (e) => {
        setProductSearchQuery(e.target.value);
        console.log("Product search:", e.target.value);
    };

    const handleSellerSearch = (e) => {
        setSellerSearchQuery(e.target.value);
        console.log("Seller search:", e.target.value);
    };

    const handleAddToCart = (itemToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...itemToAdd, quantity: 1 }];
            }
        });
        setIsCartOpen(true); // Open cart when item is added
        console.log("Added to cart:", itemToAdd.name);
    };

    const handleUpdateCartItemQuantity = (itemId, change) => {
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(0, item.quantity + change) } // Ensure quantity doesn't go below 0
                    : item
            ).filter(item => item.quantity > 0); // Remove if quantity becomes 0
        });
        console.log(`Updated quantity for item ${itemId} by ${change}`);
    };

    const handleRemoveFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        console.log(`Removed item ${itemId} from cart`);
    };

    const filteredItems = items
        .filter(item => {
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            const matchesProductSearch = productSearchQuery === '' ||
                                         item.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
                                         item.description.toLowerCase().includes(productSearchQuery.toLowerCase());
            const matchesSellerSearch = sellerSearchQuery === '' ||
                                        item.sellerName.toLowerCase().includes(sellerSearchQuery.toLowerCase());
            const matchesArea = area === 'all' || item.area.toLowerCase() === area.toLowerCase();
            return matchesCategory && matchesProductSearch && matchesSellerSearch && matchesArea;
        })
        .sort((a, b) => {
            if (sortBy === 'price-asc') {
                return parseFloat(a.price) - parseFloat(b.price);
            }
            if (sortBy === 'price-desc') {
                return parseFloat(b.price) - parseFloat(a.price);
            }
            return 0; // Default or 'relevance'
        });

    const dealOfTheDay = {
        name: 'Special Edition Smartwatch',
        price: '4999',
        originalPrice: '7999',
        discount: '37%',
        image: 'https://placehold.co/600x400/8B5CF6/FFF?text=Deal+of+Day+Smartwatch',
        description: 'Limited time offer! Get the latest smartwatch with advanced features.',
        en_tag: 'Limited Stock! Grab it now!',
        hi_tag: 'सीमित स्टॉक! अभी खरीदें!',
    };

    return (
        <div className="buyer-dashboard-page">
            {/* Header with profile pic */}
            <header className="dashboard-header">
                <h1 className="dashboard-title">
                    <span className="site-logo">GCommerce</span>
                    <span className="welcome-text" data-en="Buyer Portal" data-hi="क्रेता पोर्टल">Buyer Portal</span>
                </h1>
                <div className="profile-icon-container" onClick={() => setShowProfileSidebar(true)}>
                    <img src={user.profilePic || "https://placehold.co/100x100/4F46E5/FFF?text=P"} alt="Profile" className="profile-pic" />
                    <span className="profile-name">{user.name}</span>
                </div>
            </header>

            {/* Main content area */}
            <main className="dashboard-content">
                {/* Deal of the Day Section */}
                <section className="deal-of-the-day-section">
                    <h2 data-en="Deal of the Day" data-hi="आज का सौदा">Deal of the Day</h2>
                    <div className="deal-card">
                        <img src={dealOfTheDay.image} alt={dealOfTheDay.name} className="deal-image" />
                        <div className="deal-details">
                            <h3 className="deal-name">{dealOfTheDay.name}</h3>
                            <p className="deal-price"><span className="current-price">₹{dealOfTheDay.price}</span> <span className="original-price">₹{dealOfTheDay.originalPrice}</span></p>
                            <p className="deal-discount" data-en="Save " data-hi="बचत करें ">Save {dealOfTheDay.discount}</p>
                            <p className="deal-description">{dealOfTheDay.description}</p>
                            <p className="deal-tag" data-en={dealOfTheDay.en_tag} data-hi={dealOfTheDay.hi_tag}>{dealOfTheDay.en_tag}</p>
                            <button className="buy-now-btn" data-en="Buy Now" data-hi="अभी खरीदें">Buy Now</button>
                        </div>
                    </div>
                </section>

                {/* Filtering and Sorting Section */}
                <section className="filter-sort-section">
                    <div className="filter-group">
                        <label htmlFor="sortBy" data-en="Sort By:" data-hi="सॉर्ट करें:">Sort By:</label>
                        <select id="sortBy" value={sortBy} onChange={handleSortChange} className="filter-select">
                            <option value="relevance" data-en="Relevance" data-hi="प्रासंगिकता">Relevance</option>
                            <option value="price-asc" data-en="Price: Low to High" data-hi="कीमत: कम से ज्यादा">Price: Low to High</option>
                            <option value="price-desc" data-en="Price: High to Low" data-hi="कीमत: ज्यादा से कम">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="area" data-en="Area Nearby:" data-hi="आस-पास का क्षेत्र:">Area Nearby:</label>
                        <select id="area" value={area} onChange={handleAreaChange} className="filter-select">
                            <option value="all" data-en="All Areas" data-hi="सभी क्षेत्र">All Areas</option>
                            <option value="North" data-en="North" data-hi="उत्तर">North</option>
                            <option value="South" data-en="South" data-hi="दक्षिण">South</option>
                            <option value="East" data-hi="पूर्व">East</option>
                            <option value="West" data-hi="पश्चिम">West</option>
                        </select>
                    </div>

                    {/* Search Bars */}
                    <div className="search-bar-group">
                        <input
                            type="text"
                            placeholder="Search products..."
                            data-en-placeholder="Search products..."
                            data-hi-placeholder="उत्पाद खोजें..."
                            className="search-input"
                            value={productSearchQuery}
                            onChange={handleProductSearch}
                        />
                         <input
                            type="text"
                            placeholder="Search sellers or their items..."
                            data-en-placeholder="Search sellers or their items..."
                            data-hi-placeholder="विक्रेताओं या उनके आइटम खोजें..."
                            className="search-input"
                            value={sellerSearchQuery}
                            onChange={handleSellerSearch}
                        />
                    </div>

                    {/* Categories with horizontal scroll */}
                    <div className="categories-scroll-container">
                        <div className="categories-wrapper">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`category-tag ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => handleCategorySelect(cat.id)}
                                    data-en={cat.en}
                                    data-hi={cat.hi}
                                >
                                    {globalUpdateTexts && document.body.getAttribute('data-lang') === 'hi' ? cat.hi : cat.en}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Item Listing Grid */}
                <section className="item-listing-section">
                    <h2 data-en="Explore Products" data-hi="उत्पाद खोजें">Explore Products</h2>
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <p data-en="No items found matching your criteria." data-hi="आपके मानदंडों से मेल खाने वाला कोई आइटम नहीं मिला।">
                                No items found matching your criteria.
                            </p>
                        </div>
                    ) : (
                        <div className="item-grid">
                            {filteredItems.map(item => (
                                <ItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* Profile Sidebar */}
            <ProfileSidebar
                user={user}
                isOpen={showProfileSidebar}
                onClose={() => setShowProfileSidebar(false)}
                onLogout={handleLogout}
            />

            {/* Cart Component */}
            <Cart
                cartItems={cartItems}
                isCartOpen={isCartOpen}
                toggleCart={() => setIsCartOpen(prev => !prev)}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateCartItemQuantity}
            />
        </div>
    );
}

// Item Card Component
function ItemCard({ item, onAddToCart }) {
    return (
        <div className="item-card">
            <img src={item.image || "https://placehold.co/300x200/cccccc/333333?text=No+Image"} alt={item.name} className="item-image" />
            <h3 className="item-name">{item.name}</h3>
            <p className="item-price">₹{item.price} <span className="seller-info" data-en="by " data-hi="द्वारा ">by {item.sellerName}</span></p>
            <p className="item-description">{item.description}</p>
            <button onClick={() => onAddToCart(item)} className="add-to-cart-btn" data-en="Add to Cart" data-hi="कार्ट में जोड़ें">Add to Cart</button>
        </div>
    );
}

// Profile Sidebar Component (Re-used and adapted for Buyer)
function ProfileSidebar({ user, isOpen, onClose, onLogout }) {
    React.useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => { // Cleanup function
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        document.body.setAttribute('data-lang', newLang);
        if (globalUpdateTexts) {
            globalUpdateTexts(newLang);
        }
    };

    // Determine current language to set the select value
    const currentLang = document.body.getAttribute('data-lang') || 'en';

    return (
        <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <aside className={`sidebar-content ${isOpen ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
                <button className="sidebar-close-btn" onClick={onClose}>&times;</button>
                <div className="profile-info">
                    <img src={user.profilePic || "https://placehold.co/100x100/4F46E5/FFF?text=P"} alt="Profile" className="sidebar-profile-pic" />
                    <h3 className="profile-username" data-en="Hello, " data-hi="नमस्ते, ">Hello, {user.name}</h3>
                    <p className="profile-role" data-en="Role: Buyer" data-hi="भूमिका: क्रेता">Role: Buyer</p>
                </div>
                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        <li><a href="#" className="nav-item" data-en="My Orders" data-hi="मेरे आदेश">My Orders</a></li>
                        <li><a href="#" className="nav-item" data-en="Wishlist" data-hi="पसंद सूची">Wishlist</a></li>
                        <li><a href="#" className="nav-item" data-en="My Addresses" data-hi="मेरे पते">My Addresses</a></li>
                        <li><a href="#" className="nav-item" data-en="Payment Methods" data-hi="भुगतान के तरीके">Payment Methods</a></li>
                        <li>
                            <div className="nav-item flex items-center justify-between">
                                <span data-en="Settings" data-hi="सेटिंग्स">Settings</span>
                                <select onChange={handleLanguageChange} value={currentLang}
                                    className="ml-2 p-1 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                                    <option value="en" data-en="English" data-hi="अंग्रेज़ी">English</option>
                                    <option value="hi" data-en="Hindi" data-hi="हिंदी">Hindi</option>
                                </select>
                            </div>
                        </li>
                    </ul>
                </nav>
                <button onClick={onLogout} className="logout-button" data-en="Logout" data-hi="लॉग आउट">
                    Logout
                </button>
            </aside>
        </div>
    );
}

// Cart Component (New)
function Cart({ cartItems, isCartOpen, toggleCart, onRemoveItem, onUpdateQuantity }) {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0).toFixed(2);

    const handleCheckout = () => {
        console.log("Proceeding to checkout with items:", cartItems, "Total:", totalAmount);
        // Placeholder for actual checkout logic (e.g., API call, navigation)
        // For now, clear cart after simulated checkout
        // setCartItems([]); // This would be passed down from parent
        // setIsCartOpen(false);
    };

    return (
        <div className={`cart-container ${isCartOpen ? 'expanded' : ''}`}>
            <div className="cart-header" onClick={toggleCart}>
                <span className="cart-icon">🛒</span>
                <span className="cart-summary" data-en="Total Items: " data-hi="कुल आइटम: ">Total Items: {totalItems}</span>
                <span className="cart-total-amount">₹{totalAmount}</span>
                <span className="cart-toggle-arrow">{isCartOpen ? '▲' : '▼'}</span>
            </div>

            {isCartOpen && (
                <div className="cart-details">
                    <h3 data-en="Your Cart" data-hi="आपका कार्ट">Your Cart</h3>
                    {cartItems.length === 0 ? (
                        <p className="empty-cart-message" data-en="Your cart is empty." data-hi="आपका कार्ट खाली है।">Your cart is empty.</p>
                    ) : (
                        <ul className="cart-item-list">
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-info">
                                        <span className="cart-item-name">{item.name}</span>
                                        <span className="cart-item-price">₹{item.price}</span>
                                    </div>
                                    <div className="cart-item-quantity-control">
                                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="quantity-btn">-</button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="quantity-btn">+</button>
                                        <button onClick={() => onRemoveItem(item.id)} className="remove-item-btn">&times;</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button onClick={handleCheckout} className="checkout-btn" data-en="Proceed to Checkout" data-hi="भुगतान के लिए आगे बढ़ें">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}


// Language Toggle Logic (moved to a separate function for clarity, can be reused)
function setupLanguageToggle() {
    // This function sets up the initial language and provides the updateTexts function globally.
    const body = document.body;
    const translatableElements = document.querySelectorAll('[data-en], [data-hi]');
    const translatablePlaceholders = document.querySelectorAll('[data-en-placeholder], [data-hi-placeholder]');

    const updateTexts = (lang) => {
        translatableElements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        translatablePlaceholders.forEach(element => {
            const placeholderText = element.getAttribute(`data-${lang}-placeholder`);
            if (placeholderText) {
                element.placeholder = placeholderText;
            }
        });
        // No direct button text update here anymore as it's handled by React in the sidebar select
    };

    // Set initial language based on the body's data-lang attribute
    updateTexts(body.getAttribute('data-lang'));

    // Expose updateTexts globally so React components can call it
    globalUpdateTexts = updateTexts;
}

// Call the language setup function once the DOM is ready
document.addEventListener('DOMContentLoaded', setupLanguageToggle);
