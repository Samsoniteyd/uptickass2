import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_app',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  cookieExpiresIn: parseInt(process.env.COOKIE_EXPIRES_IN || '1') || 1,
  nodeEnv: process.env.NODE_ENV || 'development',
  // jwExpiresIn: string | number;
};

export default config;