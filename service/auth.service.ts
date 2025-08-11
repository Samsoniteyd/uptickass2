import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { ApiError } from '../utils/apiError';
import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config/env';
import { JwtPayload } from '../interfaces/jwt.interface';


export const registerUser = async (userData: IUser): Promise<IUser> => {
  if (await User.findOne({ email: userData.email })) {
    throw new ApiError(400, 'Email already exists');
  }

  const user = await User.create(userData);
  return user;
};

export const loginUser = async (email: string, password: string): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

 const payload: JwtPayload = {
    id: user._id.toString()
  };

  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn as string | number
  };

  const token = jwt.sign(
    payload,
    config.jwtSecret, 
    options
  );

  return { user, token };
};

export const logoutUser = (): void => {
};

export const getCurrentUser = async (userId: string): Promise<IUser | null> => {
  return User.findById(userId);
};