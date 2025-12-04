# Ventrest Backend API

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy the example env file and update it:
```bash
cp env-example.txt .env
```

Edit `.env` and set:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secret key for JWT tokens
- `PORT` - Server port (default: 3000)

### 3. Set Up MongoDB

**Option A: MongoDB Atlas (Recommended)**
1. Create account at https://cloud.mongodb.com
2. Create a free M0 cluster
3. Configure Network Access (allow 0.0.0.0/0)
4. Create database user
5. Get connection string and update `.env`

**Option B: Local MongoDB**
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Update .env:
MONGODB_URI=mongodb://localhost:27017/ventrest
```

### 4. Test MongoDB Connection
```bash
node test-mongo-connection.js
```

### 5. Start Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/my-products` - Get supplier's products (protected)
- `POST /api/products` - Create product (protected, supplier only)
- `PUT /api/products/:id` - Update product (protected, supplier only)
- `DELETE /api/products/:id` - Delete product (protected, supplier only)

### Orders
- `GET /api/orders/my-orders` - Get vendor's orders (protected)
- `GET /api/orders/supplier-orders` - Get supplier's orders (protected)
- `POST /api/orders` - Create order (protected, vendor only)
- `PUT /api/orders/:id/status` - Update order status (protected, supplier only)

### Analytics
- `GET /api/analytics/vendor` - Get vendor analytics (protected)
- `GET /api/analytics/supplier` - Get supplier analytics (protected)

### Health Check
- `GET /health` - Server health status
- `GET /test-mongo` - MongoDB connection test

## 🔐 Authentication

Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## 🛠️ Troubleshooting

### MongoDB Connection Issues

1. **Check Network Access:**
   - MongoDB Atlas: Allow 0.0.0.0/0 in Network Access
   - Local: Ensure MongoDB is running

2. **Verify Connection String:**
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database`
   - Check username/password are correct
   - Ensure database name exists

3. **Test Connection:**
   ```bash
   node test-mongo-connection.js
   ```

### Server Issues

- Check if port 3000 is available
- Verify all environment variables are set
- Check server logs for errors

## 📝 Environment Variables

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ventrest
JWT_SECRET=your-secret-key-here
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 🧪 Testing

Test the API with curl:
```bash
# Health check
curl http://localhost:3000/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","role":"vendor"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

