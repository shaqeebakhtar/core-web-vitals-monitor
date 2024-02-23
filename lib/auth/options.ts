import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { AuthOptions } from 'next-auth';
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { Adapter } from 'next-auth/adapters';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { hash } from '../hash';

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db, mysqlTable) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials?.email as string),
        });

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
};
