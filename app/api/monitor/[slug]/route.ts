import { authOptions } from '@/lib/auth/options';
import { getAllMonitorsByProjectId } from '@/services/monitor';
import { getProjectBySlug } from '@/services/project';
import { getServerSession } from 'next-auth';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      {
        message: 'Unauthorized: Login required!',
      },
      { status: 401 }
    );
  }

  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return Response.json({ message: 'Project not found!' }, { status: 404 });
  }

  const monitors = await getAllMonitorsByProjectId(project.id);

  return Response.json(monitors, { status: 200 });
};
