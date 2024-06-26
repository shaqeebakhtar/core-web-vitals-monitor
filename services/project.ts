import { db } from '@/db';
import { authOptions } from '@/lib/auth/options';
import { onboardingSchemaType } from '@/schemas/onboarding';
import { getServerSession } from 'next-auth';

export const getProjectBySlug = async (slug: string) => {
  const session = await getServerSession(authOptions);

  return await db.project.findUnique({
    where: {
      slug,
      userId: session?.user.id as string,
    },
  });
};

export const getProjectByUserId = async () => {
  const session = await getServerSession(authOptions);

  const project = await db.project.findUnique({
    where: {
      userId: session?.user.id as string,
    },
  });

  return project;
};

export const createProject = async ({ name, slug }: onboardingSchemaType) => {
  const session = await getServerSession(authOptions);

  try {
    return await db.project.create({
      data: {
        name,
        slug,
        userId: session?.user.id as string,
      },
    });
  } catch (error) {
    throw new Error('Failed to create your project.');
  }
};
