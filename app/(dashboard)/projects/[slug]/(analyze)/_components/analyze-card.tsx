import { Skeleton } from '@/components/ui/skeleton';
import { Analysis } from '@prisma/client';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import FormFactorIcon from '../../_components/form-factor-icon';
import MetricIcon from '../../_components/metric-icon';
import ScoreGauge from '../../_components/score-gauge';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

type AnalyzeCardProps = {
  analysis: Analysis;
};

const AnalyzeCard = ({ analysis }: AnalyzeCardProps) => {
  const { slug } = useParams() as { slug?: string };
  const router = useRouter();

  const [metrics, setMetrics] = useState(JSON.parse(analysis.metrics));
  const [scores, setScores] = useState(JSON.parse(analysis.scores));

  return (
    <div
      className="border shadow hover:shadow-md rounded-lg bg-white cursor-pointer"
      onClick={() =>
        router.push(`/projects/${slug}/analysis/report/${analysis.id}`)
      }
    >
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div>
          <div className="flex max-w-fit items-center gap-x-2">
            <Link
              href={analysis.url}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-[260px] truncate font-medium underline-offset-2 hover:underline sm:max-w-[460px] md:max-w-[540px] xl:max-w-[640px]"
            >
              {analysis.url}
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <p className="whitespace-nowrap text-sm text-gray-500">
              {formatDistance(analysis.fetchedAt, new Date(), {
                addSuffix: true,
              })}
            </p>
            <p>•</p>
            <FormFactorIcon factor={analysis.device} />
          </div>
        </div>
        <ScoreGauge score={scores.performance.score * 100} />
      </div>
      <div className="border-t border-t-gray-200 flex divide-x divide-gray-200">
        <div className="flex-1 flex items-center justify-between p-3">
          <div className="space-x-1.5 flex items-center">
            <MetricIcon
              score={metrics['largest-contentful-paint'].score * 100}
            />
            <p className="text-sm text-gray-700 font-medium">LCP</p>
          </div>
          <p className="text-sm text-gray-500">
            {metrics['largest-contentful-paint'].displayValue}
          </p>
        </div>
        <div className="flex-1 flex items-center justify-between p-3">
          <div className="space-x-1.5 flex items-center">
            <MetricIcon score={metrics['first-contentful-paint'].score * 100} />
            <p className="text-sm text-gray-700 font-medium">FCP</p>
          </div>
          <p className="text-sm text-gray-500">
            {metrics['first-contentful-paint'].displayValue}
          </p>
        </div>
        <div className="flex-1 flex items-center justify-between p-3">
          <div className="space-x-1.5 flex items-center">
            <MetricIcon
              score={metrics['cumulative-layout-shift'].score * 100}
            />
            <p className="text-sm text-gray-700 font-medium">CLS</p>
          </div>
          <p className="text-sm text-gray-500">
            {metrics['cumulative-layout-shift'].displayValue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeCard;

export const AnalyzeCardSkeleton = () => {
  return (
    <>
      <div className="border shadow hover:shadow-md rounded-lg bg-white pointer-events-none overflow-hidden">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="space-y-1">
            <div className="flex max-w-fit items-center gap-x-2">
              <Skeleton className="h-5 w-80" />
            </div>
            <div className="flex items-center space-x-1">
              <Skeleton className="w-12 h-4" />
              <p className="text-gray-200">•</p>
              <Skeleton className="w-10 h-4" />
            </div>
          </div>
          <Skeleton className="rounded-full w-12 h-12" />
        </div>
        <div className="border-t border-t-gray-200 flex divide-x divide-gray-200">
          <div className="flex-1 flex items-center justify-between p-3">
            <div className="space-x-1.5 flex items-center">
              <Skeleton className="rounded-full w-2 h-2" />
              <p className="text-sm text-gray-400 font-medium">LCP</p>
            </div>
            <Skeleton className="w-14 h-4" />
          </div>
          <div className="flex-1 flex items-center justify-between p-3">
            <div className="space-x-1.5 flex items-center">
              <Skeleton className="rounded-full w-2 h-2" />
              <p className="text-sm text-gray-400 font-medium">FCP</p>
            </div>
            <Skeleton className="w-14 h-4" />
          </div>
          <div className="flex-1 flex items-center justify-between p-3">
            <div className="space-x-1.5 flex items-center">
              <Skeleton className="rounded-full w-2 h-2" />
              <p className="text-sm text-gray-400 font-medium">CLS</p>
            </div>
            <Skeleton className="w-14 h-4" />
          </div>
        </div>
      </div>
    </>
  );
};

type LoadingAnalyzeCardProps = {
  analysis: {
    values: {
      url: string;
      device: 'mobile' | 'desktop';
    };
    id: string;
    isAnalysing: boolean;
    fetchedAt: Date;
  };
};

export const LoadingAnalyzeCard = ({ analysis }: LoadingAnalyzeCardProps) => {
  return (
    <>
      <div className="border shadow hover:shadow-md rounded-lg bg-white pointer-events-none overflow-hidden">
        <div className="w-full">
          <div className="h-1 w-full bg-blue-100 overflow-hidden">
            <div className="animate-infinite-progress w-full h-full bg-blue-600 origin-[0%_50%]"></div>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div>
            <div className="flex max-w-fit items-center gap-x-2">
              <p className="max-w-[260px] truncate font-medium underline-offset-2 hover:underline sm:max-w-[460px] md:max-w-[540px] xl:max-w-[640px] text-gray-400">
                {analysis.values.url}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="whitespace-nowrap text-sm text-gray-400">
                {formatDistance(analysis.fetchedAt, new Date(), {
                  addSuffix: true,
                })}
              </p>
              <p>•</p>
              <FormFactorIcon
                factor={analysis.values.device}
                className="opacity-50"
              />
            </div>
          </div>
          <Skeleton className="rounded-full w-12 h-12" />
        </div>
        <div className="border-t border-t-gray-200 flex divide-x divide-gray-200">
          <div className="flex-1 flex items-center justify-between p-3">
            <div className="space-x-1.5 flex items-center">
              <Skeleton className="rounded-full w-2 h-2" />
              <p className="text-sm text-gray-400 font-medium">LCP</p>
            </div>
            <Skeleton className="w-14 h-4" />
          </div>
          <div className="flex-1 flex items-center justify-between p-3">
            <div className="space-x-1.5 flex items-center">
              <Skeleton className="rounded-full w-2 h-2" />
              <p className="text-sm text-gray-400 font-medium">FID</p>
            </div>
            <Skeleton className="w-14 h-4" />
          </div>
          <div className="flex-1 flex items-center justify-between p-3">
            <div className="space-x-1.5 flex items-center">
              <Skeleton className="rounded-full w-2 h-2" />
              <p className="text-sm text-gray-400 font-medium">CLS</p>
            </div>
            <Skeleton className="w-14 h-4" />
          </div>
        </div>
      </div>
    </>
  );
};
