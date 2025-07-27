require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// Test DB
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Postgres error:', err);
    res.status(500).json({ error: 'DB connection failed', details: err.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});