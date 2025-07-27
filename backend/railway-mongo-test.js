require('dotenv').config();

console.log('=== Railway MongoDB Debug ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'NOT SET');
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'NOT SET');

if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI;
  console.log('\n=== Connection String Analysis ===');
  console.log('Full URI length:', uri.length);
  console.log('Contains username:', uri.includes('ventrest-user'));
  console.log('Contains password:', uri.includes('sonaaman1'));
  console.log('Contains database:', uri.includes('/ventrest'));
  console.log('Contains cluster:', uri.includes('cluster0.ko0lrud.mongodb.net'));
  
  // Check for special characters in password
  const passwordMatch = uri.match(/\/\/([^:]+):([^@]+)@/);
  if (passwordMatch) {
    console.log('Username found:', passwordMatch[1]);
    console.log('Password length:', passwordMatch[2].length);
    console.log('Password contains special chars:', /[^a-zA-Z0-9]/.test(passwordMatch[2]));
  }
}

console.log('\n=== Testing Connection ===');

const mongoose = require('mongoose');

const testRailwayConnection = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not set in Railway');
      return;
    }

    console.log('Attempting Railway connection...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 30000,
    });

    console.log('✅ Railway MongoDB Connected!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);

    await mongoose.connection.close();
    console.log('✅ Connection closed');

  } catch (error) {
    console.error('❌ Railway Connection Failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('CodeName:', error.codeName);
    
    if (error.errorResponse) {
      console.error('Atlas Error:', error.errorResponse);
    }
  }
};

testRailwayConnection(); 