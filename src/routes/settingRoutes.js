// src/routes/settingRoutes.js
const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');
const {
  getSettings,
  updateSettings
} = require('../controllers/settingController');

// All routes are protected
router.use(protect);

router.get('/', getSettings);
router.put('/', checkRole('Administrator'), updateSettings);

module.exports = router;