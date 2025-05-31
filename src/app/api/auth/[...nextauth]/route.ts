import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { IUser, UserInput } from '../../../../types/user';

const users: IUser[] = [
  {
    name: 'Admin',
    email: 'admin@najurists.com',
    password: 'securepassword123',
    role: 'admin' as 'admin' | 'superadmin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        ) as IUser | undefined;

        if (user) {
          return {
            id: user.email,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as 'admin' | 'superadmin';
      }
      return session;
    },
  },
});