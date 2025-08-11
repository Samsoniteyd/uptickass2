import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';
import config from '../config/env';
import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new ApiError(401, 'You are not logged in! Please log in to get access.');
    }

    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new ApiError(401, 'The user belonging to this token no longer exists.');
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};