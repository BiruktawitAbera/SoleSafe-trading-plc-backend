// src/routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');
const {
  createGallery,
  getGallery,
  getGalleryItem,
  updateGallery,
  deleteGallery
} = require('../controllers/galleryController');

// All routes are protected
router.use(protect);

router.post('/', checkRole('Administrator', 'Editor'), createGallery);
router.get('/', getGallery);
router.get('/:id', getGalleryItem);
router.put('/:id', checkRole('Administrator', 'Editor'), updateGallery);
router.delete('/:id', checkRole('Administrator'), deleteGallery);

module.exports = router;