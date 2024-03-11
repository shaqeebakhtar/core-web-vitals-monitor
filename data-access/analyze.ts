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
