require('dotenv').config(); 
const mongoose = require('mongoose');

const db = process.env.DB_URL;

if (!db) {
  console.error('DB_URL is undefined. Please check your .env file.');
  process.exit(1);
}

console.log("MongoDB URL loaded:", db);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('===> Database connected successfully ');
  } catch (error) {
    console.error('==> Database connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

module.exports = connectDB;
