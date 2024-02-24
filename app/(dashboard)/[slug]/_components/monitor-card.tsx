import { Clock, Laptop2, Smartphone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ScoreGauge from './score-gauge';
import MetricIcon from './metric-icon';

const MonitorCard = () => {
  return (
    <div className="border shadow hover:shadow-md rounded-lg bg-white">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div>
          <div className="flex max-w-fit items-center gap-x-2">
            <p className="max-w-[160px] truncate font-semibold sm:max-w-[180px] md:max-w-[200px] xl:max-w-[300px]">
              Portfolio Landing page
            </p>
            <div className="py-0.5 px-1 rounded border space-x-1 inline-flex items-center bg-gray-200">
              {/* <Smartphone className="w-3 h-3 text-gray-700" />
              <p className="text-xs text-gray-700 font-medium tracking-wide">
                Mob
              </p> */}
              <Laptop2 className="w-3 h-3 text-gray-700" />
              <p className="text-xs text-gray-700 font-medium tracking-wide">
                Desk
              </p>
            </div>
            <div className="hidden lg:inline-flex py-0.5 px-1 rounded border space-x-1  items-center bg-gray-200">
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
