import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, MonitorSmartphone } from 'lucide-react';
import AnalyzeCard from '../_components/analyze-card';

const Analyze = () => {
  return (
    <>
      <div className="flex h-28 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Analyze</h1>
            <Button>
              <MonitorSmartphone className="w-4 h-4 mr-2" />
              New test
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 flex flex-col space-y-4 py-4 pb-12">
        <div className="flex h-10 w-full justify-end">
          <Select defaultValue="day">
            <SelectTrigger className="bg-white w-[200px]">
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
        <div className="grid grid-cols-1 gap-4">
          <AnalyzeCard />
          <AnalyzeCard />
          <AnalyzeCard />
          <AnalyzeCard />
          <AnalyzeCard />
          <AnalyzeCard />
          <AnalyzeCard />
          <AnalyzeCard />
        </div>
      </div>
    </>
  );
};

export default Analyze;
