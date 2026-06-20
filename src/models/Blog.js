// src/models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Mining', 'Equipment', 'Projects', 'Company News', 'Construction', 'General'],
    default: 'General'
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);