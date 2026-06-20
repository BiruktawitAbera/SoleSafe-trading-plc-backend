// src/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware - Increase payload limits
app.use(cors());
app.use(express.json({ limit: '50mb' }));  // Increase JSON payload limit
app.use(express.urlencoded({ extended: true, limit: '50mb' }));  // Increase URL-encoded payload limit

// Routes
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));

// Home route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Sole Safe Trading PLC API',
    version: '1.0.0',
    endpoints: {
      admins: '/api/admins',
      blog: '/api/blog',
      gallery: '/api/gallery',
      categories: '/api/categories',
      messages: '/api/messages',
      settings: '/api/settings'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle specific errors
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ 
      message: 'Image too large. Please upload a smaller image (max 10MB).' 
    });
  }
  
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: err.message 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
});