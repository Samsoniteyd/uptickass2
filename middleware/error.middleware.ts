import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/apiError';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  logger.error(`Error: ${err.message}`);
  console.error(err.stack);

  return res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  });
};