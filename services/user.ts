import { db } from '@/db';
import { registerSchemaType } from '@/schemas/register';

export const getUserByEmail = async (email: string) => {
  return await db.user.findFirst({
    where: {
      email,
    },
  });
};

export const createUser = async ({ email, password }: registerSchemaType) => {
  return await db.user.create({
    data: {
      email,
      password,
    },
  });
};
