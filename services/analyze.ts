import { newAnalysisSchemaType } from '@/schemas/new-analysis';
import { getProjectByUserId } from './project';
import { db } from '@/db';

interface createAnalysisProps extends newAnalysisSchemaType {
  metrics: string;
  scores: string;
  fetchedAt: Date;
}

export const createAnalysis = async ({
  url,
  device,
  metrics,
  scores,
  fetchedAt,
}: createAnalysisProps) => {
  const project = await getProjectByUserId();
  try {
    return await db.analysis.create({
      data: {
        url,
        device,
        metrics,
        scores,
        projectId: project?.id as string,
        fetchedAt,
      },
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to create new analysis');
  }
};

export const getAnalysiData = (result: any) => {
  const metrics = {} as any;

  const metricKeys = [
    'cumulative-layout-shift',
    'first-contentful-paint',
    'largest-contentful-paint',
    'total-blocking-time',
    'speed-index',
  ];

  metricKeys.forEach((key) => {
    const value = result.lighthouseResult.audits[key as string];
    metrics[key as string] = value;
  });

  const scores = result.lighthouseResult.categories;

  const fetchedAt = result.analysisUTCTimestamp;

  return { metrics, scores, fetchedAt };
};

export const getAllAnalysesByProjectId = async (projectId: string) => {
  return await db.analysis.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
