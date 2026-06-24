// src/models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    // Remove unique: true if you don't need unique slugs
    // unique: true,  // <-- Comment this out or remove it
    trim: true,
    lowercase: true
  },
  shortDescription: {
    type: String,
    default: ''
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
  },
  views: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: 'General'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);