import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/env';
import connectDB from './config/database';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';
import logger from './utils/logger';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: config.nodeEnv === 'development' ? 'http://localhost:3000' : 'your-production-url',
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;