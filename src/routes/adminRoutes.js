// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');
const {
  registerAdmin,
  loginAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin
} = require('../controllers/adminController');

// Public routes
router.post('/login', loginAdmin);

// Protected routes
router.use(protect);
router.post('/register', checkRole('Administrator'), registerAdmin);
router.get('/', checkRole('Administrator'), getAdmins);
router.get('/:id', checkRole('Administrator'), getAdmin);
router.put('/:id', checkRole('Administrator'), updateAdmin);
router.delete('/:id', checkRole('Administrator'), deleteAdmin);

module.exports = router;