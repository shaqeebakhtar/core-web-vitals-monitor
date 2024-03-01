import { db } from '@/db';
import { monitorSchemaType } from '@/schemas/monitor';

interface createMonitor extends monitorSchemaType {
  userId: string;
}

export const getAllMonitorsByUserId = async (userId: string) => {
  return await db.monitor.findMany({
    where: {
      userId,
    },
  });
};

export const createMonitor = async ({
  name,
  url,
  device,
  schedule,
  userId,
}: createMonitor) => {
  return await db.monitor.create({
    data: {
      name,
      url,
      device,
      schedule,
      userId,
    },
  });
};
