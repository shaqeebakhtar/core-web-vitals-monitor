import NewTestModal from '@/components/modals/new-test';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SearchInput from '../../_components/search-input';
import AnalyzeCard, {
  LoadingAnalyzeCard,
} from '../../_components/analyze-card';

const Analyze = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(`/login?next=/projects/${params.slug}/analyze`);
  }

  return (
    <>
      <div className="flex h-28 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Analyze</h1>
            <NewTestModal />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 flex flex-col space-y-4 py-4 pb-20">
        <div className="flex flex-col sm:flex-row w-full items-center justify-end gap-3">
          <SearchInput />
          <Select defaultValue="day">
            <SelectTrigger className="bg-white w-full sm:w-[180px] h-10">
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
          <LoadingAnalyzeCard />
          <AnalyzeCard />
          <AnalyzeCard />
        </div>
      </div>
    </>
  );
};

export default Analyze;
