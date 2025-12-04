# MongoDB Setup Guide

## Current Status
The backend is configured to connect to MongoDB Atlas, but the connection is currently failing.

## Options to Fix MongoDB Connection

### Option 1: Fix MongoDB Atlas Connection (Recommended for Production)

1. **Check MongoDB Atlas Dashboard:**
   - Go to https://cloud.mongodb.com
   - Verify your cluster is running (not paused)
   - Check Network Access - should allow `0.0.0.0/0` (all IPs) or your server IP
   - Verify database user credentials

2. **Update Connection String:**
   - In MongoDB Atlas, go to "Connect" → "Connect your application"
   - Copy the connection string
   - Update `.env` file with correct credentials:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ventrest?retryWrites=true&w=majority
   ```

### Option 2: Use Local MongoDB (For Development)

1. **Install MongoDB locally:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb
   
   # macOS
   brew install mongodb-community
   
   # Or use Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Start MongoDB:**
   ```bash
   # Linux
   sudo systemctl start mongod
   
   # macOS
   brew services start mongodb-community
   ```

3. **Update .env:**
   ```
   MONGODB_URI=mongodb://localhost:27017/ventrest
   ```

### Option 3: Use MongoDB Atlas Free Tier (Recommended)

1. **Create Free Account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Create free M0 cluster

2. **Configure Network Access:**
   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (allow all) or your specific IP

3. **Create Database User:**
   - Go to Database Access
   - Create user with read/write permissions

4. **Get Connection String:**
   - Go to Connect → Connect your application
   - Copy connection string
   - Update `.env` file

## Testing Connection

```bash
cd backend
node test-mongo-connection.js
```

## Current Configuration

The server is configured to:
- ✅ Start even if MongoDB connection fails (development mode)
- ✅ Try local MongoDB as fallback
- ✅ Provide helpful error messages
- ✅ Handle connection errors gracefully

## Next Steps

1. Choose one of the options above
2. Update `.env` file with correct MongoDB URI
3. Restart the backend server
4. Test the connection


