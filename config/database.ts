import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/uptick', {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;



// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres://username:password@localhost:5432/userdb', {
//   dialect: 'postgres',
//   logging: false 
// });

// module.exports = sequelize;

