import { onboardingSchema } from '@/schemas/onboarding';
import {
  createProject,
  getProjectBySlug,
  getProjectByUserId,
} from '@/services/project';

export const POST = async (req: Request) => {
  const body = await req.json();

  const validatedFields = onboardingSchema.safeParse(body);

  if (!validatedFields.success) {
    return Response.json({ message: 'Invalid fields!' }, { status: 400 });
  }

  const { name, slug } = validatedFields.data;

  const slugExists = await getProjectBySlug(slug);

  if (slugExists) {
    return Response.json({ message: 'Slug is already taken' }, { status: 400 });
  }

  const projectExists = await getProjectByUserId();

  if (projectExists) {
    return Response.json(
      { message: 'Cannot create more than 1 project' },
      { status: 403 }
    );
  }

  const newProject = await createProject({ name, slug });

  return Response.json({ projectId: newProject.id }, { status: 200 });
};
