// test-connection.js
const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  console.log('🔄 Testing local MongoDB connection...');
  
  // Use the connection string from your .env file
  const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/solesafe';
  
  console.log('📡 Connection string:', connectionString.replace(/:.+@/, ':****@'));
  
  try {
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      family: 4, // Force IPv4
    });
    
    console.log('✅ Successfully connected to local MongoDB!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('🔢 Port:', mongoose.connection.port);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.length > 0) {
      console.log('📁 Existing collections:', collections.map(c => c.name).join(', '));
    } else {
      console.log('📁 No collections found yet (this is normal for a new database)');
    }
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is installed');
    console.log('2. Start MongoDB service: net start MongoDB');
    console.log('3. Check if data folder exists: C:\\data\\db');
    console.log('4. Verify your .env file has: MONGODB_URI=mongodb://localhost:27017/solesafe');
    process.exit(1);
  }
};

testConnection();