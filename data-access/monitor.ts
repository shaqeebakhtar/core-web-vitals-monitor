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

export const getAllMonitors = async () => {
  const res = await fetch('/api/pagespeed/monitor');

  if (res.status === 401) {
    throw new Error('Unauthorized: Login required!');
  }

  return res.json();
};
