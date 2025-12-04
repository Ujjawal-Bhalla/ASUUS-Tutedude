# 📚 Complete Project Guide - ASUUS Tutedude

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Configuration](#configuration)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Frontend Architecture](#frontend-architecture)
9. [Authentication & Authorization](#authentication--authorization)
10. [Features & Functionality](#features--functionality)
11. [Development Workflow](#development-workflow)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)

---

## Project Overview

**ASUUS Tutedude** (formerly Ventrest) is a B2B marketplace platform connecting **Vendors** (street food vendors) with **Suppliers** (raw materials suppliers). The platform enables vendors to browse, search, and order raw materials from multiple suppliers, while suppliers can manage their product catalogs and fulfill orders.

### Key Features
- **Dual Role System**: Separate dashboards for Vendors (Buyers) and Suppliers (Sellers)
- **Product Management**: Suppliers can add, update, and manage their product catalogs
- **Order Management**: Complete order lifecycle from creation to delivery
- **Search & Filters**: Advanced search with category, price range, and supplier filters
- **Analytics**: Dashboard analytics for both vendors and suppliers
- **Bilingual Support**: English and Hindi language support
- **Responsive Design**: Mobile-first responsive UI

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.16.5
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.2
- **Environment Variables**: dotenv 17.2.1
- **CORS**: cors 2.8.5

### Frontend
- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Routing**: React Router DOM 7.7.1
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.525.0
- **Language**: JavaScript (ES6+)

### Development Tools
- **Backend Dev Server**: nodemon 3.1.10
- **Linting**: ESLint 9.30.1
- **PostCSS**: 8.5.6
- **Autoprefixer**: 10.4.21

---

## Project Structure

```
ASUUS-Tutedude/
├── backend/                    # Backend API server
│   ├── controllers/           # Request handlers
│   │   └── authController.js  # Authentication logic
│   ├── middleware/            # Express middleware
│   │   └── auth.js           # JWT authentication middleware
│   ├── models/               # MongoDB schemas
│   │   ├── User.js          # User model (Vendor/Supplier)
│   │   ├── Product.js       # Product model
│   │   └── Order.js         # Order model
│   ├── routes/              # API route handlers
│   │   ├── auth.js         # Authentication routes
│   │   ├── products.js     # Product CRUD routes
│   │   ├── orders.js       # Order management routes
│   │   └── analytics.js    # Analytics routes
│   ├── mongo.js            # MongoDB connection handler
│   ├── server.js           # Express server entry point
│   ├── package.json        # Backend dependencies
│   └── env-example.txt     # Environment variables template
│
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── temp/           # Product images
│   │   └── vite.svg        # Vite logo
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── landing/   # Landing page components
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── SignupVendor.jsx
│   │   │   │   └── SignupSupplier.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── BuyerDashboard.jsx  # Vendor dashboard
│   │   │   └── SellerDashboard.jsx # Supplier dashboard
│   │   ├── services/       # API service layer
│   │   │   └── api.js     # API client
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── postcss.config.js  # PostCSS configuration
│
├── docs/                    # Documentation
│   └── archive/            # Archived documentation files
│
├── LOGIN_CREDENTIALS.txt   # Test account credentials
├── PRODUCT_IMAGES_LIST.txt # Product inventory list
├── LICENSE                 # Project license
├── README.md              # Quick start guide
└── GUIDE.md              # This comprehensive guide
```

---

## Setup & Installation

### Prerequisites
- **Node.js**: Version 18 or higher
- **MongoDB**: Version 4.4 or higher (local or Atlas)
- **npm**: Comes with Node.js

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd ASUUS-Tutedude
```

### Step 2: Backend Setup
```bash
cd backend
npm install
cp env-example.txt .env
# Edit .env with your configuration (see Configuration section)
npm start        # Production mode
# OR
npm run dev      # Development mode with auto-reload
```

### Step 3: Frontend Setup
```bash
cd frontend
npm install
# Create .env file (see Configuration section)
npm run dev      # Development server (default: http://localhost:5173)
```

### Step 4: MongoDB Setup

#### Option A: Local MongoDB
```bash
# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongod

# macOS
brew install mongodb-community
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Add to backend `.env` file

---

## Configuration

### Backend Environment Variables (`backend/.env`)

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/ventrest
# OR for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ventrest

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:8080
```

### Frontend Environment Variables (`frontend/.env`)

```env
# Backend API URL
VITE_API_URL=http://localhost:8000
```

**Note**: Default ports are:
- Backend: `8000`
- Frontend: `8080`

These can be changed if ports are in use.

---

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  role: Enum ['vendor', 'supplier'] (required),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  profilePic: String (default placeholder),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  supplier: ObjectId (ref: User, required),
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: Enum ['street-food', 'beverages', 'snacks', 'desserts', 'ingredients'],
  stock: Number (required, min: 0),
  unit: Enum ['kg', 'g', 'l', 'ml', 'piece', 'pack'],
  image: String (default placeholder),
  status: Enum ['active', 'inactive', 'out-of-stock'] (default: 'active'),
  rating: Number (default: 0, min: 0, max: 5),
  reviewCount: Number (default: 0),
  minOrderQuantity: Number (default: 1),
  bulkDiscount: {
    enabled: Boolean,
    tiers: [{ minQuantity: Number, discountPercentage: Number }]
  },
  tags: [String],
  isFeatured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  vendor: ObjectId (ref: User, required),
  supplier: ObjectId (ref: User, required),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number,
    total: Number
  }],
  totalAmount: Number (required),
  status: Enum ['pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled'],
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  notes: String,
  rating: Number,
  review: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "vendor",  // or "supplier"
  "phone": "1234567890",
  "address": { ... }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt-token-here"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products (Public)
```http
GET /api/products?category=ingredients&minPrice=0&maxPrice=1000&search=rice
```

#### Get Supplier's Products (Protected)
```http
GET /api/products/my-products
Authorization: Bearer <token>
```

#### Create Product (Supplier Only)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Premium Basmati Rice",
  "description": "High-quality long-grain rice",
  "price": 120,
  "category": "ingredients",
  "stock": 500,
  "unit": "kg",
  "image": "/temp/rice.jpg"
}
```

#### Update Product (Supplier Only)
```http
PUT /api/products/:id
Authorization: Bearer <token>
```

#### Delete Product (Supplier Only)
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Order Endpoints

#### Get My Orders (Vendor)
```http
GET /api/orders/my-orders
Authorization: Bearer <token>
```

#### Get Supplier Orders (Supplier)
```http
GET /api/orders/supplier-orders
Authorization: Bearer <token>
```

#### Create Order (Vendor Only)
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    { "productId": "product-id", "quantity": 5 }
  ],
  "supplierId": "supplier-id",
  "deliveryAddress": { ... },
  "notes": "Please deliver before 5 PM"
}
```

#### Update Order Status (Supplier Only)
```http
PUT /api/orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed"  // pending, confirmed, preparing, shipped, delivered, cancelled
}
```

### Analytics Endpoints

#### Get Vendor Analytics
```http
GET /api/analytics/vendor
Authorization: Bearer <token>
```

#### Get Supplier Analytics
```http
GET /api/analytics/supplier
Authorization: Bearer <token>
```

### Health Check
```http
GET /health
```

---

## Frontend Architecture

### Component Structure

#### Landing Page (`Landing.jsx`)
- Entry point for unauthenticated users
- Login/Signup modals
- Language toggle (English/Hindi)

#### Buyer Dashboard (`BuyerDashboard.jsx`)
- **Features**:
  - Product browsing with search and filters
  - Shopping cart management
  - Order placement
  - Order history
  - Analytics dashboard
- **Filters**:
  - Category filter
  - Price range slider
  - Search bar
  - Sort options (price, name, rating, recent)

#### Seller Dashboard (`SellerDashboard.jsx`)
- **Features**:
  - Product management (CRUD)
  - Order management
  - Analytics dashboard
  - Stock management

### State Management
- React Hooks (`useState`, `useEffect`)
- Context API for global state (user, language)
- Local storage for authentication tokens

### API Service Layer
Located in `frontend/src/services/api.js`:
- Centralized API calls
- Automatic token injection
- Error handling
- Response transformation

### Routing
- React Router DOM with HashRouter
- Protected routes based on authentication
- Role-based redirects (vendor → buyer dashboard, supplier → seller dashboard)

---

## Authentication & Authorization

### Authentication Flow
1. User registers/logs in via `/api/auth/register` or `/api/auth/login`
2. Backend validates credentials and returns JWT token
3. Frontend stores token in `localStorage`
4. Token is sent in `Authorization: Bearer <token>` header for protected routes

### Authorization
- **Middleware**: `backend/middleware/auth.js`
- **Protected Routes**: Require valid JWT token
- **Role-Based Access**:
  - Vendors can only create orders
  - Suppliers can only manage products and update order status

### Password Security
- Passwords hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Password comparison using `comparePassword` method

---

## Features & Functionality

### Vendor Features
1. **Product Browsing**
   - View all active products
   - Search by name, description, supplier
   - Filter by category, price range
   - Sort by price, name, rating, date

2. **Shopping Cart**
   - Add/remove products
   - Update quantities
   - View cart total

3. **Order Management**
   - Place orders from cart
   - View order history
   - Track order status
   - Add reviews and ratings

4. **Analytics**
   - Total orders
   - Total spent
   - Order status breakdown

### Supplier Features
1. **Product Management**
   - Add new products
   - Update product details
   - Manage stock levels
   - Delete products
   - Set product status (active/inactive/out-of-stock)

2. **Order Management**
   - View incoming orders
   - Update order status
   - Track order history

3. **Analytics**
   - Total products
   - Total orders
   - Revenue statistics
   - Order status breakdown

---

## Development Workflow

### Running Development Servers

#### Backend
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

#### Frontend
```bash
cd frontend
npm run dev  # Vite dev server with HMR
```

### Code Structure Guidelines
- **Backend**: Follow Express.js best practices
- **Frontend**: Component-based architecture
- **Naming**: Use descriptive names, camelCase for variables/functions
- **Comments**: Document complex logic

### Testing
- Manual testing recommended
- Test all user flows:
  - Registration/Login
  - Product browsing
  - Order creation
  - Order status updates

---

## Deployment

### Backend Deployment (Railway/Render/Heroku)

1. **Prepare Environment Variables**
   ```env
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<strong-random-secret>
   PORT=<assigned-port>
   NODE_ENV=production
   CORS_ORIGIN=<your-frontend-url>
   ```

2. **Deploy Steps**
   - Connect GitHub repository
   - Set root directory to `backend/`
   - Add environment variables
   - Deploy

### Frontend Deployment (Vercel/Netlify)

1. **Prepare Environment Variables**
   ```env
   VITE_API_URL=<your-backend-api-url>
   ```

2. **Deploy Steps**
   - Connect GitHub repository
   - Set root directory to `frontend/`
   - Build command: `npm run build`
   - Output directory: `dist/`
   - Add environment variables
   - Deploy

### Production Checklist
- [ ] Update CORS_ORIGIN to production frontend URL
- [ ] Use strong JWT_SECRET
- [ ] Enable MongoDB authentication
- [ ] Set NODE_ENV=production
- [ ] Test all API endpoints
- [ ] Verify image paths work in production

---

## Troubleshooting

### Common Issues

#### MongoDB Connection Failed
**Problem**: Backend can't connect to MongoDB
**Solutions**:
- Verify MongoDB is running: `sudo systemctl status mongod`
- Check MONGODB_URI in `.env`
- For Atlas: Verify IP whitelist and credentials
- Check firewall settings

#### CORS Errors
**Problem**: Frontend can't access backend API
**Solutions**:
- Verify CORS_ORIGIN in backend `.env` matches frontend URL
- Check backend is running
- Verify API URL in frontend `.env`

#### Images Not Loading
**Problem**: Product images show broken links
**Solutions**:
- Verify images exist in `frontend/public/temp/`
- Check image paths in database (should start with `/temp/`)
- Ensure images are in `public/` folder (not `src/`)

#### Authentication Issues
**Problem**: Login fails or token invalid
**Solutions**:
- Check JWT_SECRET is set correctly
- Verify token in localStorage
- Check token expiration (default: 30 days)
- Clear localStorage and login again

#### Port Already in Use
**Problem**: Port 8000 or 8080 already in use
**Solutions**:
- Change PORT in backend `.env`
- Update VITE_API_URL in frontend `.env`
- Or kill process using the port:
  ```bash
  lsof -ti:8000 | xargs kill -9
  ```

### Debug Mode
Enable detailed logging:
- Backend: Check console logs in terminal
- Frontend: Open browser DevTools → Console
- Network: Check Network tab for API requests

---

## Additional Resources

### Test Credentials
See `LOGIN_CREDENTIALS.txt` for test account credentials.

### Product Images
Product images are stored in `frontend/public/temp/` and referenced as `/temp/filename.ext` in the database.

### Archived Documentation
Old documentation files are archived in `docs/archive/` for reference.

---

## Support & Contribution

### Getting Help
- Check this guide first
- Review error messages in console
- Check archived documentation in `docs/archive/`

### Contributing
1. Follow existing code style
2. Test your changes thoroughly
3. Update documentation if needed
4. Submit pull requests with clear descriptions

---

**Last Updated**: December 2024
**Version**: 1.0.0

