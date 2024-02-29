import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import FormFactorIcon from './form-factor-icon';
import MetricIcon from './metric-icon';
import ScoreGauge from './score-gauge';

const AnalyzeCard = () => {
  return (
    <div className="border shadow hover:shadow-md rounded-lg bg-white">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div>
          <div className="flex max-w-fit items-center gap-x-2">
            <Link
              href={'/'}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-[260px] truncate font-medium underline-offset-2 hover:underline sm:max-w-[460px] md:max-w-[540px] xl:max-w-[640px]"
            >
              https://lucide.dev/icons/?search=phone
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <p className="whitespace-nowrap text-sm text-gray-500">Jan 13</p>
            <p>•</p>
            <FormFactorIcon factor="desktop" />
          </div>
        </div>
        <ScoreGauge score={55} />
      </div>
      <div className="border-t border-t-gray-200 flex divide-x divide-gray-200">
        <div className="flex-1 flex items-center justify-between p-3">
          <div className="space-x-1.5 flex items-center">
            <MetricIcon icon={'pass'} />
            <p className="text-sm text-gray-700 font-medium">LCP</p>
          </div>
          <p className="text-sm text-gray-500">880 ms</p>
        </div>
        <div className="flex-1 flex items-center justify-between p-3">
          <div className="space-x-1.5 flex items-center">
            <MetricIcon icon={'average'} />
            <p className="text-sm text-gray-700 font-medium">FID</p>
          </div>
          <p className="text-sm text-gray-500">320 ms</p>
        </div>
        <div className="flex-1 flex items-center justify-between p-3">
          <div className="space-x-1.5 flex items-center">
            <MetricIcon icon={'fail'} />
            <p className="text-sm text-gray-700 font-medium">CLS</p>
          </div>
          <p className="text-sm text-gray-500">0.29</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeCard;

export const LoadingAnalyzeCard = () => {
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
                https://lucide.dev/icons/?search=phone
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="whitespace-nowrap text-sm text-gray-400">Jan 13</p>
              <p>•</p>
              <FormFactorIcon factor="desktop" className="opacity-50" />
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
