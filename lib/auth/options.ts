import { db } from '@/db';
import { createUser, getUserByEmail } from '@/services/user';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { hash } from '../hash';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'login',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await getUserByEmail(credentials?.email as string);

        const hashedPassword = await hash(credentials?.password as string);

        if (!user || user.password !== hashedPassword) {
          return null;
        }

        return user;
      },
    }),
    CredentialsProvider({
      id: 'register',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const userExists = await getUserByEmail(credentials?.email as string);

        if (userExists) {
          throw new Error('Email already in use');
        }

        const hashedPassword = await hash(credentials?.password as string);

        const user = await createUser({
          email: credentials?.email as string,
          password: hashedPassword,
        });

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    jwt: async ({ token }) => {
      const user = await getUserByEmail(token?.email as string);

      if (user) {
        token.id = user.id;
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  debug: process.env.ENVIRONMENT === 'development',
};
