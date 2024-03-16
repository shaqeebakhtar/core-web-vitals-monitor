import { authOptions } from '@/lib/auth/options';
import { monitorSchema } from '@/schemas/monitor';
import {
  createMonitor,
  getLatestMetrics,
  getLatestScores,
  getMetricsHistory,
  getMonitorById,
  getScoresHistory,
  updateMonitor,
} from '@/services/monitor';
import { getPagespeedResult } from '@/services/pagespeed';
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
  });

  return Response.json({ monitorId: monitor.id }, { status: 200 });
};

export const PATCH = async (req: Request) => {
  const body = await req.json();
  const { monitorId, url, device } = body;

  const monitor = await getMonitorById(monitorId);

  if (!monitor) {
    return Response.json(
      {
        message: 'No monitoring found',
      },
      { status: 404 }
    );
  }

  const pagespeedResult = await getPagespeedResult({ url, device });

  const latestMetrics = getLatestMetrics(pagespeedResult);

  const latestScores = getLatestScores(pagespeedResult);

  const scoresHistory = await getScoresHistory(
    pagespeedResult,
    monitor.scoresHistory
  );

  const metricsHistory = await getMetricsHistory(
    pagespeedResult,
    monitor.metricsHistory
  );

  updateMonitor({
    monitorId,
    latestMetrics: JSON.stringify(latestMetrics),
    latestScores: JSON.stringify(latestScores),
    scoresHistory: JSON.stringify(scoresHistory),
    metricsHistory: JSON.stringify(metricsHistory),
    lastFetchedAt: pagespeedResult.lighthouseResult.fetchTime,
  });

  return Response.json(
    {
      latestMetrics,
      latestScores,
      scoresHistory,
      metricsHistory,
    },
    { status: 200 }
  );
};
