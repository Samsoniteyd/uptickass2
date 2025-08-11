import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../service/auth.service';
import { sendResponse } from '../utils/apiResponse';
import { registerSchema, loginSchema } from '../validations/auth.validation';
import { ApiError } from '../utils/apiError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    const user = await registerUser(req.body);
    sendResponse(res, 201, true, 'User registered successfully', user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    // Set cookie
    res.cookie('token', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    sendResponse(res, 200, true, 'User logged in successfully', { user, token });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  logoutUser();
  res.clearCookie('token');
  sendResponse(res, 200, true, 'User logged out successfully');
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getCurrentUser(req.user?.id);
    sendResponse(res, 200, true, 'Current user retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};