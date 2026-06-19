// src/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  color: {
    type: String,
    enum: ['blue', 'green', 'purple', 'orange', 'red', 'indigo'],
    default: 'blue'
  },
  description: {
    type: String,
    trim: true
  },
  imageCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);