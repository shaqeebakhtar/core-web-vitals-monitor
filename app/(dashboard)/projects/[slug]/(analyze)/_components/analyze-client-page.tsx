'use client';
import NewAnalysisModal from '@/components/modals/new-analysis';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllAnalyses } from '@/data-access/analyze';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchInput from '../../_components/search-input';
import AnalyzeCardsGrid from './analyze-cards-grid';

const AnalyzeClientPage = () => {
  const { slug } = useParams() as { slug: string };

  const {
    data: analyses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['analyses'],
    queryFn: () => getAllAnalyses(slug),
  });

  if (error) {
    notFound();
  }

  const [optimisticAnalyses, setOptimisticAnalysis] = useState(analyses || []);

  useEffect(() => {
    setOptimisticAnalysis(analyses);
  }, [analyses]);

  return (
    <>
      <div className="flex h-28 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Analyze</h1>
            <NewAnalysisModal setOptimisticAnalysis={setOptimisticAnalysis} />
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
          <AnalyzeCardsGrid
            analyses={optimisticAnalyses}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default AnalyzeClientPage;
