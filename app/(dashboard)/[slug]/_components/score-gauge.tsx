import { cn } from '@/lib/utils';
import React from 'react';

type ScoreGaugeProps = {
  score: number;
};

const ScoreGauge = ({ score }: ScoreGaugeProps) => {
  return (
    <div
      className={cn(
        'rounded-full w-12 h-12 p-3 inline-flex items-center justify-center',
        score >= 90
          ? 'bg-green-400/20'
          : score < 50
          ? 'bg-red-400/20'
          : 'bg-orange-400/20'
      )}
    >
      <p
        className={cn(
          'text-2xl text-center font-semibold',
          score >= 90
            ? 'text-green-400'
            : score < 50
            ? 'text-red-400'
            : 'text-orange-400'
        )}
      >
        {score}
      </p>
    </div>
  );
};

export default ScoreGauge;
