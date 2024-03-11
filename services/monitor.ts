import { db } from '@/db';
import { monitorSchemaType } from '@/schemas/monitor';
import { getProjectByUserId } from './project';

interface createMonitor extends monitorSchemaType {
  projectId: string;
}

export const getAllMonitorsByProjectId = async (projectId: string) => {
  return await db.monitor.findMany({
    where: {
      projectId,
    },
  });
};

export const createMonitor = async ({
  name,
  url,
  device,
  schedule,
}: monitorSchemaType) => {
  const project = await getProjectByUserId();

  try {
    return await db.monitor.create({
      data: {
        name,
        url,
        device,
        schedule,
        projectId: project?.id as string,
      },
    });
  } catch (error) {
    throw new Error('Failed to create monitor');
  }
};
