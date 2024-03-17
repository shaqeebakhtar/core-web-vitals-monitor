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
    orderBy: {
      createdAt: 'desc',
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

type updateMonitorSchema = {
  monitorId: string;
  latestMetrics: string;
  latestScores: string;
  scoresHistory: string;
  metricsHistory: string;
  performanceHistory: string;
  lastFetchedAt: Date;
};

export const updateMonitor = async ({
  monitorId,
  latestMetrics,
  latestScores,
  scoresHistory,
  metricsHistory,
  performanceHistory,
  lastFetchedAt,
}: updateMonitorSchema) => {
  return await db.monitor.update({
    where: { id: monitorId },
    data: {
      latestMetrics,
      latestScores,
      scoresHistory,
      metricsHistory,
      performanceHistory,
      lastFetchedAt,
    },
  });
};

export const getMonitorById = async (monitorId: string) => {
  return await db.monitor.findUnique({
    where: {
      id: monitorId,
    },
  });
};

export const getLatestMetrics = (result: any) => {
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
    metrics[key as string] = {
      score: value.score,
      displayValue: value.displayValue,
      title: value.title,
    };
  });

  return metrics;
};

export const getLatestScores = (result: any) => {
  const scores = {} as any;

  const scoreKeys = [
    'performance',
    'accessibility',
    'best-practices',
    'seo',
    'pwa',
  ];

  scoreKeys.forEach((key) => {
    const value = result.lighthouseResult.categories[key as string];
    scores[key as string] = {
      score: value.score,
      title: value.title,
    };
  });

  return scores;
};

export const getScoresHistory = async (
  result: any,
  prevScoresHistory: string | null
) => {
  // performance score
  const latestPerformance = {
    score: result.lighthouseResult.categories['performance'].score,
    fetchedAt: result.lighthouseResult.fetchTime,
  };

  // accessibility score
  const latestAccessibility = {
    score: result.lighthouseResult.categories['accessibility'].score,
    fetchedAt: result.lighthouseResult.fetchTime,
  };

  // best practices score
  const latestBestPractices = {
    score: result.lighthouseResult.categories['best-practices'].score,
    fetchedAt: result.lighthouseResult.fetchTime,
  };

  // seo score
  const latestSeo = {
    score: result.lighthouseResult.categories['seo'].score,
    fetchedAt: result.lighthouseResult.fetchTime,
  };

  // pwa score
  const latestPwa = {
    score: result.lighthouseResult.categories['pwa'].score,
    fetchedAt: result.lighthouseResult.fetchTime,
  };

  let scoresHistory;

  if (prevScoresHistory === null) {
    scoresHistory = {} as any;

    scoresHistory['performance'] = [latestPerformance];
    scoresHistory['accessibility'] = [latestAccessibility];
    scoresHistory['bestPractices'] = [latestBestPractices];
    scoresHistory['seo'] = [latestSeo];
    scoresHistory['pwa'] = [latestPwa];
  } else {
    scoresHistory = await JSON.parse(prevScoresHistory);

    scoresHistory.performance.push(latestPerformance);
    scoresHistory.accessibility.push(latestAccessibility);
    scoresHistory.bestPractices.push(latestBestPractices);
    scoresHistory.seo.push(latestSeo);
    scoresHistory.pwa.push(latestPwa);
  }

  return scoresHistory;
};

export const getMetricsHistory = async (
  result: any,
  prevMetricsHistory: string | null
) => {
  // fcp score
  const latestFCP = {
    score: result.lighthouseResult.audits['first-contentful-paint'].score,
    displayValue:
      result.lighthouseResult.audits['first-contentful-paint'].displayValue,
    fetchedAt: result.lighthouseResult.fetchTime,
    title: result.lighthouseResult.audits['first-contentful-paint'].title,
  };

  // lcp score
  const latestLCP = {
    score: result.lighthouseResult.audits['largest-contentful-paint'].score,
    displayValue:
      result.lighthouseResult.audits['largest-contentful-paint'].displayValue,
    fetchedAt: result.lighthouseResult.fetchTime,
    title: result.lighthouseResult.audits['largest-contentful-paint'].title,
  };

  // tbt score
  const latestTBT = {
    score: result.lighthouseResult.audits['total-blocking-time'].score,
    displayValue:
      result.lighthouseResult.audits['total-blocking-time'].displayValue,
    fetchedAt: result.lighthouseResult.fetchTime,
    title: result.lighthouseResult.audits['total-blocking-time'].title,
  };

  // cls score
  const latestCLS = {
    score: result.lighthouseResult.audits['cumulative-layout-shift'].score,
    displayValue:
      result.lighthouseResult.audits['cumulative-layout-shift'].displayValue,
    fetchedAt: result.lighthouseResult.fetchTime,
    title: result.lighthouseResult.audits['cumulative-layout-shift'].title,
  };

  // speed index score
  const latestSpeedIndex = {
    score: result.lighthouseResult.audits['speed-index'].score,
    displayValue: result.lighthouseResult.audits['speed-index'].displayValue,
    fetchedAt: result.lighthouseResult.fetchTime,
    title: result.lighthouseResult.audits['speed-index'].title,
  };

  let metricsHistory;

  if (prevMetricsHistory === null) {
    metricsHistory = {} as any;

    metricsHistory['fcp'] = [latestFCP];
    metricsHistory['lcp'] = [latestLCP];
    metricsHistory['cls'] = [latestTBT];
    metricsHistory['cls'] = [latestCLS];
    metricsHistory['speedIndex'] = [latestSpeedIndex];
  } else {
    metricsHistory = await JSON.parse(prevMetricsHistory);

    metricsHistory.fcp.push(latestFCP);
    metricsHistory.lcp.push(latestLCP);
    metricsHistory.cls.push(latestTBT);
    metricsHistory.cls.push(latestCLS);
    metricsHistory.speedIndex.push(latestSpeedIndex);
  }

  return metricsHistory;
};

export const getPerformanceHistory = (performances: any) => {
  const performancesScores = performances.map((item: any) => item.score * 100);

  const performanceHistory = [];

  for (let i = 0; i < Math.max(0, 7 - performancesScores.length); i++) {
    performanceHistory.push(null);
  }

  performanceHistory.push(...performancesScores);

  return performanceHistory;
};
