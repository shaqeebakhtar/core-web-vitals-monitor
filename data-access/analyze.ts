import { newTestSchemaType } from '@/schemas/new-test';

export const newTest = async ({ url, device }: newTestSchemaType) => {
  const res = await fetch('/api/pagespeed/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device,
    }),
  });

  return res.json();
};
