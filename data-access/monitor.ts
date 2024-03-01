import { monitorSchemaType } from '@/schemas/monitor';

export const newMonitor = async ({
  name,
  url,
  device,
  schedule,
}: monitorSchemaType) => {
  const res = await fetch('/api/pagespeed/monitor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      url,
      device,
      schedule,
    }),
  });

  return res.json();
};
