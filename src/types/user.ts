// src/types/user.ts
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'superadmin';
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type UserInput = Omit<IUser, 'createdAt' | 'updatedAt'>;