'use client';
import Image from 'next/image';
import AnalyzeCard, {
  AnalyzeCardSkeleton,
  LoadingAnalyzeCard,
} from './analyze-card';
import { Analysis } from '@prisma/client';

type AnalyzeCardsGridProps = {
  analyses: Analysis[];
  isLoading: boolean;
};

const AnalyzeCardsGrid = ({ analyses, isLoading }: AnalyzeCardsGridProps) => {
  return (
    <>
      {isLoading ? (
        <AnalyzeCardsGridSkeleton />
      ) : analyses?.length === 0 ? (
        <div className="mb-12 flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12 space-y-8">
          <h2 className="text-xl font-semibold text-gray-700">
            No analysis found.
          </h2>
          <Image
            src={'/images/laziness.png'}
            width={300}
            height={300}
            alt="No links found"
          />
        </div>
      ) : (
        !isLoading &&
        analyses && (
          <div className="grid grid-cols-1 gap-4">
            {analyses?.map((analysis: any) =>
              analysis.isAnalysing ? (
                <LoadingAnalyzeCard key={analysis.id} analysis={analysis} />
              ) : (
                <AnalyzeCard key={analysis.id} analysis={analysis} />
              )
            )}
          </div>
        )
      )}
    </>
  );
};

export default AnalyzeCardsGrid;

export const AnalyzeCardsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[...Array(4)].map((_, i) => (
        <AnalyzeCardSkeleton key={i} />
      ))}
    </div>
  );
};
