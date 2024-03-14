import { newAnalysisSchemaType } from '@/schemas/new-analysis';

export const newAnalysis = async ({ url, device }: newAnalysisSchemaType) => {
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

export const getAllAnalyses = async (slug: string) => {
  const res = await fetch(`/api/analyze/${slug}`);

  if (res.status === 401) {
    throw new Error('Unauthorized: Login required!');
  } else if (res.status === 404) {
    throw new Error('Not found');
  }

  return res.json();
};
