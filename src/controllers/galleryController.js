// src/controllers/galleryController.js
const Gallery = require('../models/Gallery');

// @desc    Create Gallery Item
// @route   POST /api/gallery
// @access  Private
const createGallery = async (req, res) => {
  try {
    const { title, image, category, description } = req.body;
    
    const gallery = await Gallery.create({
      title,
      image,
      category,
      description,
      uploadedBy: req.admin._id
    });

    res.status(201).json({
      message: 'Gallery image uploaded successfully',
      gallery
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get All Gallery Items
// @route   GET /api/gallery
// @access  Private
const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().populate('uploadedBy', 'name email').sort({ createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Single Gallery Item
// @route   GET /api/gallery/:id
// @access  Private
const getGalleryItem = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id).populate('uploadedBy', 'name email');
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Gallery Item
// @route   PUT /api/gallery/:id
// @access  Private
const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Gallery updated successfully',
      gallery: updatedGallery
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Gallery Item
// @route   DELETE /api/gallery/:id
// @access  Private
const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    await gallery.deleteOne();
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGallery,
  getGallery,
  getGalleryItem,
  updateGallery,
  deleteGallery
};