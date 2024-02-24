import { Smartphone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ScoreGauge from './score-gauge';
import MetricIcon from './metric-icon';

const MonitorCard = () => {
  return (
    <div className="border shadow hover:shadow-md rounded-lg bg-white">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div>
          <div className="flex max-w-fit flex-wrap items-center gap-x-2">
            <p className="max-w-[140px] truncate text-sm font-semibold sm:max-w-[300px]md:max-w-[360px] xl:max-w-[500px]">
              Portfolio
            </p>
            <Smartphone className="w-3.5 h-3.5 text-gray-500" />
            <p className="text-xs text-gray-500 font-medium tracking-wide">
              Daily
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <p className="whitespace-nowrap text-sm text-gray-500">Jan 13</p>
            <p>•</p>
            <Link
              href={'/'}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-[140px] truncate text-sm text-gray-700 underline-offset-2 hover:underline sm:max-w-[300px] md:max-w-[360px] xl:max-w-[420px]"
            >
              https://lucide.dev/icons/?search=phone
            </Link>
          </div>
        </div>
        <ScoreGauge score={50} />
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
            <p className="text-sm text-gray-700 font-medium">TBT</p>
          </div>
          <p className="text-sm text-gray-500">320 ms</p>
        </div>
        <div className="flex-1 flex items-center justify-between p-3">
          <div className="space-x-1.5 flex items-center">
            <MetricIcon icon={'fail'} />
            <p className="text-sm text-gray-700 font-medium">CLS</p>
          </div>
          <p className="text-sm text-gray-500">0.29 s</p>
        </div>
      </div>
    </div>
  );
};

export default MonitorCard;