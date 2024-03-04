import { registerSchemaType } from '@/schemas/register';

export const register = async ({ email, password }: registerSchemaType) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create account');
  }

  return await res.json();
};
