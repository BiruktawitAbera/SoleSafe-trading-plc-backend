// src/seed.js
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Check if admin exists
    const adminExists = await Admin.findOne({ email: 'admin@solesafe.com' });
    if (!adminExists) {
      await Admin.create({
        name: 'Super Admin',
        email: 'admin@solesafe.com',
        password: 'admin123',
        role: 'Administrator',
        status: 'Active'
      });
      console.log('✅ Super Admin created successfully!');
      console.log('📧 Email: admin@solesafe.com');
      console.log('🔑 Password: admin123');
    } else {
      console.log('⚠️ Super Admin already exists');
      console.log('📧 Email: admin@solesafe.com');
      console.log('🔑 Password: admin123');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();