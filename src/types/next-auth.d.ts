import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: 'admin' | 'superadmin';
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: 'admin' | 'superadmin';
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'admin' | 'superadmin';
  }
}