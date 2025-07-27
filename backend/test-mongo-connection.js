require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'NOT SET');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is missing');
      return;
    }

    // Parse the connection string to check components
    const uri = process.env.MONGODB_URI;
    console.log('Connection string components:');
    console.log('- Protocol:', uri.startsWith('mongodb+srv://') ? 'mongodb+srv' : 'mongodb');
    console.log('- Username:', uri.match(/\/\/([^:]+):/)?.[1] || 'Not found');
    console.log('- Database:', uri.match(/\/([^?]+)\?/)?.[1] || 'Not found');
    console.log('- Cluster:', uri.match(/@([^.]+)/)?.[1] || 'Not found');

    console.log('\nAttempting to connect...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 30000,
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    console.log('Ready State:', conn.connection.readyState);

    // Test creating a collection
    const testCollection = conn.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    console.log('✅ Database write test successful');

    await mongoose.connection.close();
    console.log('✅ Connection closed successfully');

  } catch (error) {
    console.error('❌ MongoDB Connection Failed:');
    console.error('Error Type:', error.constructor.name);
    console.error('Error Message:', error.message);
    console.error('Error Code:', error.code);
    console.error('Error CodeName:', error.codeName);
    
    if (error.errorResponse) {
      console.error('Atlas Error Response:', error.errorResponse);
    }
    
    console.error('\nTroubleshooting Tips:');
    console.error('1. Check if username/password are correct in Atlas');
    console.error('2. Verify Network Access allows 0.0.0.0/0');
    console.error('3. Ensure database user has proper permissions');
    console.error('4. Check if database name exists');
  }
};

testConnection(); 