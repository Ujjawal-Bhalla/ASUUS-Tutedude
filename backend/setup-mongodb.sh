#!/bin/bash

# MongoDB Setup Script for Ventrest Backend

echo "🔧 MongoDB Setup for Ventrest Backend"
echo "======================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Creating .env from env-example.txt..."
    cp env-example.txt .env
    echo "✅ .env file created. Please update it with your MongoDB credentials."
    exit 1
fi

echo "✅ .env file found"
echo ""

# Check MongoDB connection
echo "🔄 Testing MongoDB connection..."
node test-mongo-connection.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ MongoDB connection successful!"
    echo "🚀 You can now start the server with: npm start"
else
    echo ""
    echo "❌ MongoDB connection failed"
    echo ""
    echo "💡 Options to fix:"
    echo "1. Fix MongoDB Atlas connection (see MONGODB_SETUP.md)"
    echo "2. Install and start local MongoDB"
    echo "3. Update MONGODB_URI in .env file"
    echo ""
    echo "📖 See MONGODB_SETUP.md for detailed instructions"
fi

