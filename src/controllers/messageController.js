// src/controllers/messageController.js
const Message = require('../models/Message');

// @desc    Create Message (Contact Form)
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message, appointmentDate, appointmentTime, hasAppointment } = req.body;
    
    const newMessage = await Message.create({
      name,
      email,
      phone,
      subject,
      message,
      appointmentDate,
      appointmentTime,
      hasAppointment: hasAppointment || false,
      status: 'New'
    });

    res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get All Messages
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Single Message
// @route   GET /api/messages/:id
// @access  Private
const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Message Status
// @route   PUT /api/messages/:id
// @access  Private
const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.status = status || message.status;
    await message.save();

    res.json({
      message: 'Message updated successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.deleteOne();
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getMessage,
  updateMessageStatus,
  deleteMessage
};