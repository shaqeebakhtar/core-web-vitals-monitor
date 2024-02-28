import { Clock } from 'lucide-react';
import Link from 'next/link';
import FormFactorIcon from './form-factor-icon';
import MetricIcon from './metric-icon';
import ScoreGauge from './score-gauge';
import { Sparkline } from '@/components/charts/sparkline';

const MonitorCard = () => {
  return (
    <div className="border shadow hover:shadow-md rounded-lg bg-white">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div>
          <div className="flex max-w-fit items-center gap-x-2">
            <p className="max-w-[160px] truncate font-medium sm:max-w-[180px] md:max-w-[200px] xl:max-w-[300px]">
              Portfolio Landing page
            </p>
            <FormFactorIcon factor="mobile" />
            <div className="hidden lg:inline-flex py-0.5 px-1 rounded border space-x-1  items-center bg-gray-100">
              <Clock className="w-3 h-3 text-gray-700" />
              <p className="text-xs text-gray-700 font-medium tracking-wide">
                Daily
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <p className="whitespace-nowrap text-sm text-gray-500">Jan 13</p>
            <p>•</p>
            <Link
              href={'/'}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-[180px] truncate text-sm text-gray-700 underline-offset-2 hover:underline md:max-w-[260px] xl:max-w-[400px]"
            >
              https://lucide.dev/icons/?search=phone
            </Link>
          </div>
        </div>
        <ScoreGauge score={96} />
      </div>
      <Sparkline
        className="h-20"
        data={[null, null, null, 55, 47, 91, 78]}
        fillOpacity={0.2}
        color="#2563eb"
        strokeWidth={1.5}
      />
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

export default MonitorCard;
