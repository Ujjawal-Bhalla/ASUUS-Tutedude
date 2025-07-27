require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./mongo");

// Import routes
const authRoutes = require("./routes/auth");

const app = express();

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
    
    await connectDB();
    
    // Server startup moved to initializeServer function
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
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT} (MongoDB connection failed)`);
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

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/auth', authRoutes);

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});