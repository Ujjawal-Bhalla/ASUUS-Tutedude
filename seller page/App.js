// React and its hooks (useState, useEffect) are accessed globally via the CDNs

// Global scope for language functions
let globalUpdateTexts; // To hold the updateTexts function


// Main App component that handles conditional rendering based on login
function App() {
    // State to simulate login status and user role
    const [user, setUser] = React.useState(null); // null means not logged in. Could be { name: 'GCommerce Vendor', role: 'seller', profilePic: 'https://placehold.co/100x100/4F46E5/FFF?text=GC' }
    const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Simplified login state

    // Simulate a successful login for a seller
    const handleLogin = () => {
        // In a real app, this would involve authentication API calls
        // For now, just set a dummy seller user with a GCommerce-like profile pic
        setUser({ name: 'GCommerce Vendor', role: 'seller', profilePic: 'https://placehold.co/100x100/4F46E5/FFF?text=GC' });
        setIsLoggedIn(true);
        console.log("Seller logged in (simulated).");
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
                <p className="text-2xl mb-8 text-gray-600">Seller Portal</p>
                <button
                    onClick={handleLogin}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                >
                    Simulate Seller Login
                </button>
            </div>
        );
    }

    // If logged in as a seller, render the SellerDashboard
    return <SellerDashboard user={user} handleLogout={handleLogout} />;
}

// Seller Dashboard Component
function SellerDashboard({ user, handleLogout }) {
    const [items, setItems] = React.useState([]);
    const [showAddItemModal, setShowAddItemModal] = React.useState(false);
    const [showProfileSidebar, setShowProfileSidebar] = React.useState(false);

    // Function to add a new item (placeholder for backend interaction)
    const handleAddItem = (newItem) => {
        console.log("Adding new item (simulated):", newItem);
        // In a real app, this would send data to a backend API
        // For now, update local state directly
        setItems(prevItems => [...prevItems, { id: Date.now(), ...newItem }]);
        setShowAddItemModal(false); // Close the modal after adding
    };

    // Placeholder for fetching existing items on component mount (if any)
    React.useEffect(() => {
        const fetchItems = () => {
            console.log("Fetching existing items (simulated).");
            // This would be an API call to load seller's items
            // For now, let's start with an empty array or some dummy data
            // setItems([]);
            // Example if you wanted to start with some data:
            // setItems([
            //     { id: 1, name: 'Product A', price: '₹1200', description: 'High-quality electronic device' },
            //     { id: 2, name: 'Service B', price: '₹500', description: 'Expert consultation service' }
            // ]);
        };
        fetchItems();
    }, []); // Run once on component mount

    // The '+' button is now always fixed to the bottom right
    const plusButtonClass = 'fixed bottom-8 right-8 w-16 h-16 text-3xl';

    return (
        <div className="seller-dashboard-page">
            {/* Header with profile pic */}
            <header className="dashboard-header">
                <h1 className="dashboard-title">
                    <span className="site-logo">GCommerce</span>
                    <span className="welcome-text" data-en="Seller Dashboard" data-hi="विक्रेता डैशबोर्ड">Seller Dashboard</span>
                </h1>
                <div className="profile-icon-container" onClick={() => setShowProfileSidebar(true)}>
                    <img src={user.profilePic || "https://placehold.co/100x100/4F46E5/FFF?text=P"} alt="Profile" className="profile-pic" />
                    <span className="profile-name">{user.name}</span>
                </div>
            </header>

            {/* Main content area */}
            <main className="dashboard-content">
                {items.length === 0 ? (
                    <div className="empty-state">
                        <p data-en="No items listed yet. Click the '+' to add your first item!" data-hi="अभी तक कोई आइटम सूचीबद्ध नहीं है। अपना पहला आइटम जोड़ने के लिए '+' पर क्लिक करें!">
                            No items listed yet. Click the '+' to add your first item!
                        </p>
                    </div>
                ) : (
                    <div className="item-list-container">
                        <h2 className="item-list-heading" data-en="Your Listed Items" data-hi="आपके सूचीबद्ध आइटम">Your Listed Items</h2>
                        <div className="item-grid">
                            {items.map(item => (
                                <div key={item.id} className="item-card">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="item-image" />
                                    )}
                                    <h3 className="item-name">{item.name}</h3>
                                    <p className="item-price" data-en="Price:" data-hi="कीमत:">Price: {item.price}</p>
                                    <p className="item-description">{item.description}</p>
                                    {/* Add buttons for Edit/Delete later if needed */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add Item Button */}
                <button
                    className={`add-item-btn ${plusButtonClass}`}
                    onClick={() => setShowAddItemModal(true)}
                    title="Add New Item"
                >
                    +
                </button>
            </main>

            {/* Add Item Modal */}
            {showAddItemModal && (
                <AddItemModal onClose={() => setShowAddItemModal(false)} onAddItem={handleAddItem} />
            )}

            {/* Profile Sidebar */}
            <ProfileSidebar
                user={user}
                isOpen={showProfileSidebar}
                onClose={() => setShowProfileSidebar(false)}
                onLogout={handleLogout}
            />
        </div>
    );
}

// Add Item Modal Component
function AddItemModal({ onClose, onAddItem }) {
    const [itemName, setItemName] = React.useState('');
    const [itemPrice, setItemPrice] = React.useState('');
    const [itemDescription, setItemDescription] = React.useState('');
    const [itemImage, setItemImage] = React.useState(null); // State to store the image file or data URL

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Simulate reading the file for display as a data URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setItemImage(reader.result); // Stores the base64 data URL
            };
            reader.readAsDataURL(file);
        } else {
            setItemImage(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemName && itemPrice) {
            onAddItem({
                name: itemName,
                price: itemPrice,
                description: itemDescription,
                image: itemImage // Include the image data
            });
            // Reset form fields after submission
            setItemName('');
            setItemPrice('');
            setItemDescription('');
            setItemImage(null); // Clear image input
        } else {
            console.warn("Item name and price are required!");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <h2 className="modal-title" data-en="List New Item" data-hi="नया आइटम सूचीबद्ध करें">List New Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="itemName" data-en="Item Name:" data-hi="आइटम का नाम:">Item Name:</label>
                        <input
                            type="text"
                            id="itemName"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="form-input"
                            data-en-placeholder="e.g., Laptop, Consulting"
                            data-hi-placeholder="उदाहरण के लिए, लैपटॉप, परामर्श"
                            placeholder="e.g., Laptop, Consulting"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemPrice" data-en="Price (₹):" data-hi="कीमत (₹):">Price (₹):</label>
                        <input
                            type="text" // Using text to allow for '₹' symbol
                            id="itemPrice"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            className="form-input"
                            data-en-placeholder="e.g., 999"
                            data-hi-placeholder="उदाहरण के लिए, 999"
                            placeholder="e.g., 999"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemDescription" data-en="Description:" data-hi="विवरण:">Description:</label>
                        <textarea
                            id="itemDescription"
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                            className="form-input h-24"
                            data-en-placeholder="Brief description of the item..."
                            data-hi-placeholder="आइटम का संक्षिप्त विवरण..."
                            placeholder="Brief description of the item..."
                        ></textarea>
                    </div>
                    {/* New: Image Upload Field */}
                    <div className="form-group">
                        <label htmlFor="itemImage" data-en="Product Image:" data-hi="उत्पाद छवि:">Product Image:</label>
                        <input
                            type="file"
                            id="itemImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-input file:mr-4 file:py-2 file:px-4
                                       file:rounded-full file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-indigo-50 file:text-indigo-700
                                       hover:file:bg-indigo-100"
                        />
                        {itemImage && (
                            <div className="mt-2 text-center">
                                <img src={itemImage} alt="Preview" className="max-h-32 mx-auto rounded-md shadow" />
                                <p className="text-sm text-gray-500 mt-1" data-en="Image Preview" data-hi="छवि पूर्वावलोकन">Image Preview</p>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="submit-button" data-en="Add Item" data-hi="आइटem जोड़ें">Add Item</button>
                </form>
            </div>
        </div>
    );
}

// Profile Sidebar Component
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
                    <p className="profile-role" data-en="Role: Seller" data-hi="भूमिका: विक्रेता">Role: Seller</p>
                </div>
                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        <li><a href="#" className="nav-item" data-en="My Profile" data-hi="मेरी प्रोफाइल">My Profile</a></li>
                        <li><a href="#" className="nav-item" data-en="Transactions" data-hi="लेन-देन">Transactions</a></li>
                        <li><a href="#" className="nav-item" data-en="Orders" data-hi="आदेश">Orders</a></li>
                        <li><a href="#" className="nav-item" data-en="Reports" data-hi="रिपोर्ट्स">Reports</a></li>
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
