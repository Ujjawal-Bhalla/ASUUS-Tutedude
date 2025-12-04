# 🚀 Quick Start Guide

## ✅ Current Status

- ✅ **Backend Server**: Running on `http://localhost:3000`
- ✅ **MongoDB**: Connected to local MongoDB at `mongodb://localhost:27017/ventrest`
- ✅ **Frontend**: Configured to connect to backend at `http://localhost:3000`

## 🎯 Everything is Ready!

Your backend is now fully configured to use **local MongoDB only**. No Atlas needed!

## 📋 What's Working

1. **MongoDB Connection**: ✅ Connected to local MongoDB
2. **API Endpoints**: ✅ All routes are active
3. **Authentication**: ✅ Register/Login working
4. **Database**: ✅ Data is being stored locally

## 🧪 Test the API

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "password": "test123",
    "role": "vendor",
    "phone": "1234567890"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "test123"
  }'
```

### Check Health
```bash
curl http://localhost:3000/health
```

## 🔍 View Database

```bash
# Connect to MongoDB
mongosh ventrest

# View users
db.users.find().pretty()

# View products
db.products.find().pretty()

# View orders
db.orders.find().pretty()
```

## 🛠️ Management Commands

### Start/Stop MongoDB
```bash
# Check status
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Stop MongoDB
sudo systemctl stop mongod

# Restart MongoDB
sudo systemctl restart mongod
```

### Start/Stop Backend
```bash
cd backend

# Start
npm start

# Development (with auto-reload)
npm run dev
```

## 📝 Configuration

All configuration is in `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/ventrest
JWT_SECRET=ventrest-jwt-secret-key-2024-hackathon
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 🎉 You're All Set!

The backend is now:
- ✅ Using local MongoDB (no cloud needed)
- ✅ Fully functional
- ✅ Ready for development
- ✅ Connected to frontend

Just make sure:
1. MongoDB is running: `sudo systemctl status mongod`
2. Backend is running: `cd backend && npm start`
3. Frontend is running: `cd frontend && npm run dev`

Then test registration/login from the frontend!

