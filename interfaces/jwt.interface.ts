import { Document } from 'mongoose';

export interface JwtPayload {
  id: string;
}

export interface JwtOptions {
  expiresIn: string | number;
}