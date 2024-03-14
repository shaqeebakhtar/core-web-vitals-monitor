import React from 'react';

type MetricIconProps = {
  score: number;
};

const MetricIcon = ({ score }: MetricIconProps) => {
  return score >= 90 ? (
    <div className="w-2 h-2 rounded-full bg-green-400 inline-block"></div>
  ) : score < 50 ? (
    <div
      className="inline-block w-0 h-0 
border-l-[6px] border-l-transparent
border-b-[8px] border-b-red-400
border-r-[6px] border-r-transparent"
    ></div>
  ) : (
    <div className="w-2 h-2 bg-orange-400 inline-block"></div>
  );
};

export default MetricIcon;
