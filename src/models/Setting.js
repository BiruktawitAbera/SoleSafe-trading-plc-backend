// src/models/Setting.js
const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'Sole Safe Trading PLC'
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: 'Aleltu, Ethiopia'
  },
  facebook: {
    type: String,
    default: ''
  },
  telegram: {
    type: String,
    default: ''
  },
  whatsapp: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    default: '/logo.jpg'
  },
  heroImage: {
    type: String,
    default: '/hero.jpg'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);