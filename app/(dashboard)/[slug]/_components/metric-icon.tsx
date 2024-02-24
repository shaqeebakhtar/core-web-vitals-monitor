import React from 'react';

type MetricIconProps = {
  icon: 'pass' | 'average' | 'fail';
};

const MetricIcon = ({ icon }: MetricIconProps) => {
  return icon === 'pass' ? (
    <div className="w-2 h-2 rounded-full bg-green-400 inline-block"></div>
  ) : icon === 'average' ? (
    <div className="w-2 h-2 bg-orange-400 inline-block"></div>
  ) : (
    <div
      className="inline-block w-0 h-0 
border-l-[6px] border-l-transparent
border-b-[8px] border-b-red-400
border-r-[6px] border-r-transparent"
    ></div>
  );
};

export default MetricIcon;
