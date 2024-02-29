import { Button } from '@/components/ui/button';
import { ActivitySquare } from 'lucide-react';
import MonitorCard from '../_components/monitor-card';
import SearchInput from '../_components/search-input';

const Monitors = () => {
  return (
    <>
      <div className="flex h-28 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Monitors</h1>
            <Button>
              <ActivitySquare className="w-4 h-4 mr-2" />
              Create monitor
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 flex flex-col space-y-4 py-4">
        <div className="flex h-10 w-full justify-end">
          <SearchInput />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MonitorCard />
          <MonitorCard />
          <MonitorCard />
        </div>
      </div>
    </>
  );
};

export default Monitors;
