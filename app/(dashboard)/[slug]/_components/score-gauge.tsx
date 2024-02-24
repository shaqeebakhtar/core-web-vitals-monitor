import React from 'react';

type ScoreGaugeProps = {
  score: number;
};

const ScoreGauge = ({ score }: ScoreGaugeProps) => {
  const color = score >= 90 ? 'green' : score < 50 ? 'red' : 'orange';

  return (
    <div
      className={`rounded-full w-12 h-12 bg-${color}-400/20 p-3 inline-flex items-center justify-center`}
    >
      <p className={`text-2xl text-center font-semibold text-${color}-400`}>
        {score}
      </p>
    </div>
  );
};

export default ScoreGauge;
