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

  if (res.status === 401) {
    throw new Error('You need to be logged in');
  } else if (res.status === 400) {
    throw new Error('Please recheck if all the fields are valid');
  } else if (!res.ok) {
    throw new Error('Failed to create monitor');
  }

  return await res.json();
};

export const getAllMonitors = async (slug: string) => {
  const res = await fetch(`/api/monitor/${slug}`);

  if (res.status === 401) {
    throw new Error('Unauthorized: Login required!');
  } else if (res.status === 404) {
    throw new Error('Not found');
  }

  return res.json();
};

export const getMonitorReport = async (slug: string, monitorId: string) => {
  const res = await fetch(`/api/monitor/${slug}/${monitorId}`);

  if (res.status === 401) {
    throw new Error('Unauthorized: Login required!');
  } else if (res.status === 404) {
    throw new Error('Not found');
  }

  return res.json();
};
