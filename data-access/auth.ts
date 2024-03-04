import { onboardingSchemaType } from '@/schemas/onboarding';
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

  if (res.status === 400) {
    throw new Error('Email already in use');
  } else if (!res.ok) {
    throw new Error('Failed to create account');
  }

  return await res.json();
};

export const onboarding = async ({ name, slug }: onboardingSchemaType) => {
  const res = await fetch('/api/auth/onboarding', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      slug,
    }),
  });

  if (res.status === 400) {
    throw new Error('Slug is already taken');
  } else if (res.status === 403) {
    throw new Error('Cannot create more than 1 project');
  } else if (!res.ok) {
    throw new Error('Failed to create your project.');
  }

  return await res.json();
};
