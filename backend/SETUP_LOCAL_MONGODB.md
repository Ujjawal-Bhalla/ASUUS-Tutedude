# Local MongoDB Setup Guide

## Quick Setup

The backend is now configured to use **local MongoDB only** (no Atlas needed).

## Installation Options

### Option 1: Docker (Easiest - Recommended)

```bash
# Start MongoDB in Docker
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb-data:/data/db \
  mongo:latest

# Check if it's running
docker ps | grep mongo

# Stop MongoDB (when needed)
docker stop mongodb

# Start MongoDB again
docker start mongodb
```

### Option 2: Install MongoDB Locally

#### Ubuntu/Debian:
```bash
# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

#### macOS:
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Check status
brew services list | grep mongodb
```

#### Windows:
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install and follow the setup wizard
3. MongoDB will start automatically as a service

## Verify MongoDB is Running

```bash
# Test connection
mongosh --eval "db.version()"

# Or using Docker
docker exec -it mongodb mongosh --eval "db.version()"

# Should output MongoDB version
```

## Configuration

The backend is already configured to use:
```
MONGODB_URI=mongodb://localhost:27017/ventrest
```

This is set in `backend/.env` file.

## Start the Backend

```bash
cd backend
npm start
```

You should see:
```
✅ MongoDB Connected Successfully!
📍 Host: localhost
📊 Database: ventrest
```

## Troubleshooting

### MongoDB not starting

**Docker:**
```bash
# Check logs
docker logs mongodb

# Restart container
docker restart mongodb
```

**Local Installation:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod  # Linux
brew services list | grep mongodb  # macOS

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log  # Linux
tail -f /usr/local/var/log/mongodb/mongo.log  # macOS
```

### Port 27017 already in use

```bash
# Find what's using the port
sudo lsof -i :27017  # Linux/macOS
netstat -ano | findstr :27017  # Windows

# Kill the process or use a different port
```

### Connection refused

1. Ensure MongoDB is running
2. Check firewall settings
3. Verify port 27017 is accessible
4. Try: `mongosh mongodb://localhost:27017`

## Database Management

### Access MongoDB Shell

```bash
# Direct connection
mongosh

# Or with Docker
docker exec -it mongodb mongosh

# Use ventrest database
use ventrest

# List collections
show collections

# View users
db.users.find().pretty()
```

### Reset Database (Clear all data)

```bash
# Using mongosh
mongosh ventrest --eval "db.dropDatabase()"

# Or with Docker
docker exec -it mongodb mongosh ventrest --eval "db.dropDatabase()"
```

## Next Steps

Once MongoDB is running:
1. Start the backend: `cd backend && npm start`
2. Test the connection: `curl http://localhost:3000/health`
3. Test registration: Use the frontend or API
4. Check database: `mongosh ventrest --eval "db.users.find()"`

## Production Note

For production deployment, you can still use MongoDB Atlas by:
1. Setting `MONGODB_URI` in your production environment
2. The code will automatically use the provided URI

