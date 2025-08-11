import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId; // Explicitly define _id type
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt?: Date;
  updatedAt?: Date;
}