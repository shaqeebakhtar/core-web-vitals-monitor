'use client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Calendar, Laptop2, Smartphone } from 'lucide-react';
import Link from 'next/link';
import PerformanceChart from './performance-chart';
import PerformanceMetricsChart from './performance-metrics-chart';
import AccessibilityChart from './accessibility-chart';
import BestPracticesChart from './best-practices-chart';
import SeoChart from './seo-chart';
import PwaChart from './pwa-chart';
import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMonitorReport } from '@/data-access/monitor';
import { formatDistance } from 'date-fns';

const MonitorReportClient = () => {
  const params = useParams() as {
    slug: string;
    id: string;
  };

  const {
    data: monitor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['monitor', params.id],
    queryFn: () => getMonitorReport(params.slug, params.id),
  });

  if (error) {
    notFound();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="flex h-28 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild size={'icon'} variant={'outline'}>
                <Link href={`/projects/${params.slug}`}>
                  <span className="sr-only">Go back</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <h1 className="text-2xl">{monitor.name}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 flex flex-col space-y-4 py-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="space-y-0 p-4 border rounded-md bg-white">
            <p className="text-sm text-gray-500">Showing monitor for URL</p>
            <Link
              href={monitor.url}
              target="_blank"
              className="underline-offset-2 hover:underline"
            >
              <p className="font-medium truncate max-w-fit">{monitor.url}</p>
            </Link>
          </div>
          <div className="space-y-0 p-4 border rounded-md bg-white">
            <p className="text-sm text-gray-500">Device</p>
            {monitor.device === 'mobile' ? (
              <div className="flex items-center space-x-1">
                <Smartphone className="w-4 h-4" />
                <p className="font-medium">Mobile</p>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Laptop2 className="w-4 h-4" />
                <p className="font-medium">Desktop</p>
              </div>
            )}
          </div>
          <div className="space-y-0 p-4 border rounded-md bg-white">
            <p className="text-sm text-gray-500">Last Monitored at</p>
            <p className="font-medium truncate max-w-fit">
              {formatDistance(monitor.lastFetchedAt, new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-3">
          <Select defaultValue="day">
            <SelectTrigger className="bg-white w-[180px] h-10">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <SelectValue placeholder="Duration" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hour">Last hour</SelectItem>
              <SelectItem value="day">Last 24 hour</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem disabled value="quater">
                Last 3 months
              </SelectItem>
              <SelectItem disabled value="all">
                All time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <PerformanceChart />
        <PerformanceMetricsChart />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AccessibilityChart />
          <BestPracticesChart />
          <SeoChart />
          <PwaChart />
        </div>
      </div>
    </main>
  );
};

export default MonitorReportClient;
