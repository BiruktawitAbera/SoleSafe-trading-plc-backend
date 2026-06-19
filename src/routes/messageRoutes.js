// src/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');
const {
  createMessage,
  getMessages,
  getMessage,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/messageController');

// Public route for contact form
router.post('/', createMessage);

// Protected routes
router.use(protect);
router.get('/', getMessages);
router.get('/:id', getMessage);
router.put('/:id', checkRole('Administrator', 'Editor'), updateMessageStatus);
router.delete('/:id', checkRole('Administrator'), deleteMessage);

module.exports = router;