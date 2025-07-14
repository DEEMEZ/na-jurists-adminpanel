// types/index.ts
// Update your types/index.ts
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
  emailVerified: boolean;
  verificationToken?: string; // Add this line
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserWithPassword extends IUser {
  password: string;
}

// Auth session types
export interface ISessionUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
}

export interface ISession {
  user: ISessionUser;
  expires: string;
}

// OTP and password reset types
export interface IOTP {
  id: string;
  email: string;
  otp: string;
  type: 'verification' | 'password-reset';
  expiresAt: Date;
  createdAt: Date;
}

export interface IPasswordResetToken {
  id: string;
  email: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// API response types
export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}


// Case management types
export interface IAttachment {
  url: string;
  name: string;
  size: number;
  type: string;
}

export interface ICase {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  attachments: IAttachment[];
  createdBy: string | IUser;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard stats
export interface IDashboardStats {
  totalCases: number;
  recentCases: ICase[];
  userActivity?: IUserActivity[];
}

export interface IUserActivity {
  userId: string;
  action: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}