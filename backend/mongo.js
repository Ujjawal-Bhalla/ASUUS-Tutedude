const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is provided
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is required for production');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection options for better reliability
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      // Removed deprecated options
      // bufferMaxEntries: 0, // DEPRECATED
      // useNewUrlParser: true, // DEPRECATED
      // useUnifiedTopology: true, // DEPRECATED
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit immediately in production, let the app handle it
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB; 