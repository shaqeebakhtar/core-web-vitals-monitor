import { authOptions } from '@/lib/auth/options';
import { getMonitorByMonitorId } from '@/services/monitor';
import { getProjectBySlug } from '@/services/project';
import { getServerSession } from 'next-auth';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string; monitorId: string } }
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

  const monitor = await getMonitorByMonitorId(params.monitorId);

  if (!monitor) {
    return Response.json(
      { message: 'No monitoring not found!' },
      { status: 404 }
    );
  }

  return Response.json(monitor, { status: 200 });
};
