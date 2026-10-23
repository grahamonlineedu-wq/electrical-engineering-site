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

// POST: Publish a manual article from CMS dashboard
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
// 2. AUTONOMOUS AI AGENT & PUBLISHER
// ==========================================

// POST: Autonomous AI Post Generator & Auto-Publisher
app.post('/api/ai/auto-publish', async (req, res) => {
  if (!groq) {
    return res.status(500).json({ success: false, error: "GROQ_API_KEY is not configured in environment variables" });
  }

  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ success: false, error: "Topic is required" });
    }

    const systemPrompt = `
You are an expert electrical engineering content automation agent for Volt-Tech Enterprise. 
Given a topic, generate a complete, highly professional technical blog post.
You MUST output your response strictly as a valid JSON object with no markdown code blocks, using this exact structure:
{
  "title": "Engaging and professional article title",
  "category": "Substation", 
  "author": "Engr. Ebenezer Ukpo",
  "tags": "transformers, electrical, industrial, maintenance",
  "image_url": "https://evernewtransformer.com/wp-content/uploads/2026/06/Oil-Immersed-Power-Transformer-Complete-Guide-for-Industrial-and-Utility-Applications.webp",
  "content": "Full, detailed technical article body with multiple paragraphs explaining engineering concepts and concluding with Volt-Tech services."
}
Category must be one of: Transformers, Control Panels, Substation, Safety.
`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate post for topic: ${topic}` }
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: "json_object" }
    });

    const aiData = JSON.parse(completion.choices[0].message.content);

    // Insert AI-generated post directly into Neon PostgreSQL database
    const query = `
      INSERT INTO articles (title, category, author, tags, image_url, content, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
      RETURNING *;
    `;
    const values = [aiData.title, aiData.category, aiData.author, aiData.tags, aiData.image_url, aiData.content];
    const dbResult = await pool.query(query, values);

    res.json({ 
      success: true, 
      message: "AI Agent successfully generated and auto-published post!", 
      article: dbResult.rows[0] 
    });

  } catch (err) {
    console.error("AI Auto-Publish Error:", err);
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
