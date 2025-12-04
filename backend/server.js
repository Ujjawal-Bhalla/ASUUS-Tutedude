require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./mongo");

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const analyticsRoutes = require("./routes/analytics");

const app = express();

// Define PORT before using it
const PORT = process.env.PORT || 3000;

// Connect to MongoDB with error handling
const initializeServer = async () => {
  try {
    // Debug environment variables
    console.log('=== Railway Environment Debug ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('PORT:', process.env.PORT);
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'NOT SET');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'NOT SET');
    
    if (process.env.MONGODB_URI) {
      const uri = process.env.MONGODB_URI;
      console.log('MongoDB URI length:', uri.length);
      console.log('Contains username:', uri.includes('ventrest-user'));
      console.log('Contains database:', uri.includes('/ventrest'));
    }
    
    const dbConnection = await connectDB();
    if (dbConnection) {
      console.log('✅ MongoDB connected successfully');
    } else {
      console.warn('⚠️  MongoDB connection failed - server starting without database');
      console.warn('💡 Some features may not work until MongoDB is connected');
    }
    
    // Start server (even if MongoDB connection failed in development)
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🌐 API available at http://localhost:${PORT}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
      if (!dbConnection) {
        console.warn('⚠️  Note: Database not connected - API endpoints may fail');
      }
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('🔄 Received SIGTERM, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('🔄 Received SIGINT, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });
    
  } catch (error) {
    console.error('Failed to initialize server:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName
    });
    
    // In production, keep the server running even if MongoDB fails
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
    
    // Start server without MongoDB in production
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`⚠️ Server running on port ${PORT} (MongoDB connection failed)`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('🔄 Received SIGTERM, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('🔄 Received SIGINT, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });
  }
};

initializeServer();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check route for Railway
app.get("/health", (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Hello from GCommerce backend!");
});

// Test MongoDB connection
app.get('/test-mongo', async (req, res) => {
  try {
    res.json({ 
      message: 'MongoDB connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('MongoDB error:', err);
    res.status(500).json({ error: 'MongoDB connection failed', details: err.message });
  }
});

// Server startup is now handled in initializeServer()