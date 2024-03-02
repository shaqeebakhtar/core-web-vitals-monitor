import NewMonitorModal from '@/components/modals/new-monitor';
import SearchInput from '../_components/search-input';
import MonitorCardsGrid from './_components/monitor-cards-grid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monitors | Core Web Vitals Monitor',
};

const Monitors = () => {
  return (
    <>
      <div className="flex h-28 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Monitors</h1>
            <NewMonitorModal />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 flex flex-col space-y-4 py-4">
        <div className="flex h-10 w-full justify-end">
          <SearchInput />
        </div>
        <MonitorCardsGrid />
      </div>
    </>
  );
};

export default Monitors;
