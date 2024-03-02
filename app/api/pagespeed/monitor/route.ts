import { authOptions } from '@/lib/auth/options';
import { monitorSchema } from '@/schemas/monitor';
import { createMonitor, getAllMonitorsByUserId } from '@/services/monitor';
import { getServerSession } from 'next-auth';

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      {
        message: 'Unauthorized: Login required!',
      },
      { status: 401 }
    );
  }

  const body = await req.json();

  const validatedFields = monitorSchema.safeParse(body);

  if (!validatedFields.success) {
    return Response.json({ message: 'Invalid fields!' }, { status: 400 });
  }

  const { name, url, device, schedule } = validatedFields.data;

  const monitor = await createMonitor({
    name,
    url,
    device,
    schedule,
    userId: session?.user.id as string,
  });

  return Response.json({ monitorId: monitor.id }, { status: 200 });
};

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      {
        message: 'Unauthorized: Login required!',
      },
      { status: 401 }
    );
  }

  const monitors = await getAllMonitorsByUserId(session?.user.id as string);

  return Response.json({ monitors }, { status: 200 });
};
