require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const Groq = require('groq-sdk');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// PostgreSQL Connection (Neon DB)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Initialize Groq AI SDK
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

// ==========================================
// 1. DATABASE & CMS ROUTES
// ==========================================

// GET: Fetch published articles for the blog feed
app.get('/api/articles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    res.json({ success: true, articles: result.rows });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST: Publish a new article from CMS dashboard
app.post('/api/articles', async (req, res) => {
  try {
    const { title, category, author, tags, image_url, content } = req.body;
    
    const query = `
      INSERT INTO articles (title, category, author, tags, image_url, content, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
      RETURNING *;
    `;
    const values = [title, category, author, tags, image_url, content];
    
    const result = await pool.query(query, values);
    res.status(201).json({ 
      success: true, 
      message: "Article published successfully!", 
      article: result.rows[0] 
    });
  } catch (err) {
    console.error("Error saving article:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 2. AI GENERATION ENDPOINTS
// ==========================================

// POST: Generate article draft using Groq (Llama 3.3)
app.post('/api/generate-groq', async (req, res) => {
  if (!groq) {
    return res.status(500).json({ success: false, error: "GROQ_API_KEY is not configured in .env" });
  }

  try {
    const { topic } = req.body;
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert electrical engineer writing technical, highly detailed blog posts for Volt-Tech Enterprise.'
        },
        {
          role: 'user',
          content: `Write a technical article on: ${topic}`
        }
      ],
      model: 'llama-3.3-70b-versatile',
    });

    res.json({ success: true, text: completion.choices[0].message.content });
  } catch (err) {
    console.error("Groq AI Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST: Generate article draft using Gemini API
app.post('/api/generate-gemini', async (req, res) => {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    return res.status(500).json({ success: false, error: "GEMINI_API_KEY is not configured in .env" });
  }

  try {
    const { topic } = req.body;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Write an industrial electrical article on: ${topic}` }] }]
      })
    });

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    
    res.json({ success: true, text: generatedText });
  } catch (err) {
    console.error("Gemini AI Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Catch-all route to serve dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`⚡ Volt-Tech Server running on port ${PORT}`);
});
