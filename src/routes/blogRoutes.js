// src/routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// All routes are protected
router.use(protect);

router.post('/', checkRole('Administrator', 'Editor', 'Contributor'), createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlog);
router.put('/:id', checkRole('Administrator', 'Editor'), updateBlog);
router.delete('/:id', checkRole('Administrator'), deleteBlog);

module.exports = router;