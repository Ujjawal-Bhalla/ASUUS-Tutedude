# 🚨 Railway Deployment Fix Guide

## Current Issue: 502 Error
Your Railway deployment is failing because environment variables are not set.

## 🔧 Fix Steps:

### 1. Railway Environment Variables
Go to your Railway dashboard and add these environment variables:

```env
MONGODB_URI=mongodb+srv://ventrest-user:sonaaman1@cluster0.ko0lrud.mongodb.net/ventrest?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=ventrest-jwt-secret-key-2024-hackathon
PORT=3000
NODE_ENV=production
```

### 2. Railway Project Settings
- **Root Directory**: `backend/`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 3. Check Railway Logs
In Railway dashboard, check the deployment logs for specific error messages.

### 4. Redeploy
After setting environment variables, trigger a new deployment.

## 🧪 Test Commands:
```bash
# Test health check
curl https://asuus-tutedude-production.up.railway.app/

# Test MongoDB connection
curl https://asuus-tutedude-production.up.railway.app/test-mongo
```

## 📋 Expected Results:
- Health check should return: `"Hello from GCommerce backend!"`
- MongoDB test should return: `{"message":"MongoDB connection successful","timestamp":"..."}`

## 🚨 Common Issues:
1. **Missing MONGODB_URI** - Causes connection failure
2. **Missing JWT_SECRET** - Causes authentication failure
3. **Wrong root directory** - Causes build failure
4. **Port binding issues** - Railway uses PORT env var

## ✅ Success Indicators:
- Railway deployment shows "Deployed" status
- Health check returns 200 OK
- MongoDB test returns success message 