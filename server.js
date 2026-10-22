const express = require('express');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Neon PostgreSQL using your DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from the root directory
app.use(express.static(path.join(__dirname)));

// ================= API ROUTES =================

// 1. Test Database Connection Endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Get Equipment Products (For Main Site & CMS Catalog)
app.get('/api/products', async (req, res) => {
  try {
    // If you haven't created the table yet, this gracefully returns sample data
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    // Fallback mock data if table doesn't exist yet
    res.json([
      { id: 1, name: 'Industrial Transformer 50KVA', price: '450,000', category: 'Transformers' },
      { id: 2, name: 'Automatic Transfer Switch (ATS)', price: '120,000', category: 'Control Panels' }
    ]);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Volt-Tech Enterprise server running live on port ${PORT}`);
});

// Volt-Tech CMS API Route - Publish New Article
app.post('/api/articles', async (req, res) => {
  try {
    const { title, category, author, tags, image_url, content } = req.body;
    
    const query = `
      INSERT INTO articles (title, category, author, tags, image_url, content, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *;
    `;
    const values = [title, category, author, tags, image_url, content];
    
    const result = await pool.query(query, values);
    
    res.status(201).json({ success: true, message: "Article published successfully to live database!", article: result.rows[0] });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Volt-Tech CMS API Route - Fetch Published Articles for Frontend
app.get('/api/articles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    res.json({ success: true, articles: result.rows });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
