require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./mongo");

// Import routes
const authRoutes = require("./routes/auth");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
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