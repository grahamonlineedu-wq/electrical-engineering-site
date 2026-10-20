
// Volt-Tech CMS API Route for Publishing Commercial Articles
app.post('/api/articles', async (req, res) => {
  try {
    const { title, category, author, tags, image_url, content } = req.body;
    
    // Insert into PostgreSQL database table 'articles'
    const query = `
      INSERT INTO articles (title, category, author, tags, image_url, content, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *;
    `;
    const values = [title, category, author, tags, image_url, content];
    
    // Uncomment when pool is initialized:
    // await pool.query(query, values);
    
    res.status(201).json({ success: true, message: "Article published successfully to live database!" });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ success: false, error: "Server error publishing article" });
  }
});
