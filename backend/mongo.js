const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Default to local MongoDB for development
    const defaultLocalURI = 'mongodb://localhost:27017/ventrest';
    
    // Use MONGODB_URI from env, or default to local
    const mongoURI = process.env.MONGODB_URI || defaultLocalURI;
    
    console.log('🔄 Connecting to MongoDB...');
    console.log(`📡 URI: ${mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@')}`); // Hide password in logs
    
    const conn = await mongoose.connect(mongoURI, {
      // Connection options optimized for local MongoDB
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000, // Faster timeout for local
      socketTimeoutMS: 45000,
      connectTimeoutMS: 5000,
    });
    
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔌 Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    });
    
    return conn;
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
    });
    
    // Provide helpful setup instructions
    console.error('\n💡 To fix this:');
    console.error('1. Install MongoDB locally:');
    console.error('   - Ubuntu/Debian: sudo apt-get install mongodb');
    console.error('   - macOS: brew install mongodb-community');
    console.error('   - Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest');
    console.error('');
    console.error('2. Start MongoDB:');
    console.error('   - Linux: sudo systemctl start mongod');
    console.error('   - macOS: brew services start mongodb-community');
    console.error('   - Docker: docker start mongodb');
    console.error('');
    console.error('3. Verify MongoDB is running:');
    console.error('   - Check: mongosh --eval "db.version()"');
    console.error('   - Or: docker ps | grep mongo');
    
    // In development, allow server to start but warn
    if (process.env.NODE_ENV === 'development') {
      console.warn('\n⚠️  Server will start but database operations will fail');
      console.warn('💡 Start MongoDB to enable full functionality');
      return null;
    }
    
    // In production, throw the error
    throw error;
  }
};

module.exports = connectDB; 