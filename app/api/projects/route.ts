import { authOptions } from '@/lib/auth/options';
import { getProjectByUserId } from '@/services/project';
import { getServerSession } from 'next-auth';

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      {
        message: 'Unauthorized: Login required!',
      },
      { status: 401 }
    );
  }

  const project = await getProjectByUserId();

  return Response.json(project, { status: 200 });
};
