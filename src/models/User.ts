// src/models/User.ts
import { Schema, model } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'superadmin'], default: 'admin' },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);

export default User;