import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Calendar, Smartphone } from 'lucide-react';
import Link from 'next/link';
import AccessibilityChart from '../../_components/accessibility-chart';
import BestPracticesChart from '../../_components/best-practices-chart';
import PerformanceChart from '../../_components/performance-chart';
import PerformanceMetricsChart from '../../_components/performance-metrics-chart';
import PwaChart from '../../_components/pwa-chart';
import SeoChart from '../../_components/seo-chart';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const MonitorReport = async ({
  params,
}: {
  params: { slug: string; id: string };
}) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(`/login?next=/${params.slug}/monitors/${params.id}`);
  }

  return (
    <main>
      <div className="flex h-28 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild size={'icon'} variant={'outline'}>
                <Link href={`/${params.slug}`}>
                  <span className="sr-only">Go back</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <h1 className="text-2xl">Monitor Name</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 flex flex-col space-y-4 py-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="space-y-0 p-4 border rounded-md bg-white">
            <p className="text-sm text-gray-500">Showing monitor for URL</p>
            <p className="font-medium truncate max-w-fit">
              https://example.com/slug/
            </p>
          </div>
          <div className="space-y-0 p-4 border rounded-md bg-white">
            <p className="text-sm text-gray-500">Device</p>
            <div className="flex items-center space-x-1">
              <Smartphone className="w-4 h-4" />
              <p className="font-medium">Mobile</p>
            </div>
          </div>
          <div className="space-y-0 p-4 border rounded-md bg-white">
            <p className="text-sm text-gray-500">Last Monitored at</p>
            <p className="font-medium truncate max-w-fit">
              Feb 29, 2024, 2:28:38 AM
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

export default MonitorReport;
