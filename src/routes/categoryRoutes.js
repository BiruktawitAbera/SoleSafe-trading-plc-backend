// src/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// All routes are protected
router.use(protect);

router.post('/', checkRole('Administrator', 'Editor'), createCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.put('/:id', checkRole('Administrator', 'Editor'), updateCategory);
router.delete('/:id', checkRole('Administrator'), deleteCategory);

module.exports = router;