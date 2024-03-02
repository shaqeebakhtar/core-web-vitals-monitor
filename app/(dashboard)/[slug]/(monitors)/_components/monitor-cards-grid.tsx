'use client';
import NewMonitorModal from '@/components/modals/new-monitor';
import { getAllMonitors } from '@/data-access/monitor';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import MonitorCard, { MonitorCardSkeleton } from './monitor-card';
import { Monitor } from '@prisma/client';

const MonitorCardsGrid = () => {
  const monitorsQuery = useQuery({
    queryKey: ['monitors'],
    queryFn: getAllMonitors,
  });

  return (
    <>
      {monitorsQuery.isLoading ? (
        <MonitorCardsGridSkeleton />
      ) : monitorsQuery.data?.monitors.length === 0 ? (
        <div className="mb-12 flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12 space-y-8">
          <h2 className="text-xl font-semibold text-gray-700">
            No monitors found.
          </h2>
          <Image
            src={'/images/laziness.png'}
            width={300}
            height={300}
            alt="No links found"
          />
          <NewMonitorModal />
        </div>
      ) : (
        !monitorsQuery.isLoading &&
        monitorsQuery.data?.monitors && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {monitorsQuery.data.monitors.map((monitor: Monitor) => (
              <MonitorCard key={monitor.id} monitor={monitor} />
            ))}
          </div>
        )
      )}
    </>
  );
};

export default MonitorCardsGrid;

export const MonitorCardsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <MonitorCardSkeleton key={i} />
      ))}
    </div>
  );
};
