import { db } from '@/db';
import { getUserByEmail } from '@/services/user';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { AuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { hash } from '../hash';

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db, mysqlTable) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await getUserByEmail(credentials?.email as string);

        const hashedPassword = await hash(credentials?.password as string);

        if (!user) {
          return null;
        }

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
