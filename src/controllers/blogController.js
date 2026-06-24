const Blog = require('../models/Blog');

// Helper function to generate slug
const generateSlug = (title) => {
  if (!title) return 'untitled-post';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Helper function to generate unique slug with timestamp
const generateUniqueSlug = (title) => {
  const baseSlug = generateSlug(title);
  const timestamp = Date.now().toString().slice(-8);
  return `${baseSlug}-${timestamp}`;
};

// @desc    Create Blog
// @route   POST /api/blog
// @access  Private
const createBlog = async (req, res) => {
  try {
    const { title, shortDescription, content, featuredImage, status, category } = req.body;
    
    // Generate unique slug with timestamp
    let slug = generateUniqueSlug(title);
    
    // Check if slug already exists (very unlikely with timestamp, but just in case)
    let existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      // If it exists, add random number to make it unique
      const randomNum = Math.random().toString(36).substr(2, 3);
      slug = `${generateSlug(title)}-${Date.now().toString().slice(-8)}-${randomNum}`;
    }

    const blog = await Blog.create({
      title,
      slug,
      shortDescription,
      content,
      featuredImage,
      status,
      category,
      author: req.admin._id
    });

    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      // Retry with a completely different slug
      try {
        const { title, shortDescription, content, featuredImage, status, category } = req.body;
        const newSlug = `${generateSlug(title)}-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substr(2, 4)}`;
        
        const blog = await Blog.create({
          title,
          slug: newSlug,
          shortDescription,
          content,
          featuredImage,
          status,
          category,
          author: req.admin._id
        });
        
        return res.status(201).json({
          message: 'Blog created successfully',
          blog
        });
      } catch (retryError) {
        console.error('Retry error:', retryError);
        return res.status(500).json({ 
          message: 'Failed to create blog post. Please try again with a different title.' 
        });
      }
    }
    
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

    // If title is being updated, generate new slug
    if (req.body.title && req.body.title !== blog.title) {
      const newSlug = generateUniqueSlug(req.body.title);
      req.body.slug = newSlug;
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
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'A blog with a similar title already exists. Please use a different title.' 
      });
    }
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