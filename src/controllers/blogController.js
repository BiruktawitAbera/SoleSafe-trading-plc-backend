// src/controllers/blogController.js
const Blog = require('../models/Blog');

// @desc    Create Blog
// @route   POST /api/blog
// @access  Private
const createBlog = async (req, res) => {
  try {
    const { title, slug, shortDescription, content, featuredImage, status, tags, category } = req.body;
    
    const blog = await Blog.create({
      title,
      slug,
      shortDescription,
      content,
      featuredImage,
      status,
      tags,
      category,
      author: req.admin._id
    });

    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get All Blogs
// @route   GET /api/blog
// @access  Private
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Single Blog
// @route   GET /api/blog/:id
// @access  Private
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Blog
// @route   PUT /api/blog/:id
// @access  Private
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Blog updated successfully',
      blog: updatedBlog
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Blog
// @route   DELETE /api/blog/:id
// @access  Private
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
};